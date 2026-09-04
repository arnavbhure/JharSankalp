import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/database.js';
import { env } from '../../config/env.js';
import { sendSuccess, sendError } from '../../utils/response.js';
import { requireAuth } from '../../middleware/auth.js';
import { sendBrevoOtpEmail } from '../../services/email/brevoService.js';
import type { AppRequest } from '../../types/request.js';

const router = Router();

const COOKIE_NAME = 'token';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

const isProduction = env.NODE_ENV === 'production';

function setAuthCookie(res: any, token: string) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

function clearAuthCookie(res: any) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
  });
}

/**
 * Generate a 6-digit numeric OTP string
 */
function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const ALLOWED_SIGNUP_ROLES = ['CITIZEN', 'UNIVERSITY', 'INDUSTRY', 'GOVERNMENT'];
const FORBIDDEN_ADMIN_ROLES = [
  'ADMIN',
  'SUPER_ADMIN',
  'STATE_ADMIN',
  'GOVERNMENT_OFFICER',
  'DISTRICT_OFFICER',
  'UNIVERSITY_ADMIN',
];

function sanitizeSignupRole(roleInput?: unknown): string {
  if (!roleInput || typeof roleInput !== 'string') {
    return 'CITIZEN';
  }
  const cleanRole = roleInput.trim().toUpperCase();
  if (FORBIDDEN_ADMIN_ROLES.includes(cleanRole) || cleanRole.includes('ADMIN')) {
    throw new Error('ROLE_FORBIDDEN');
  }
  if (!ALLOWED_SIGNUP_ROLES.includes(cleanRole)) {
    return 'CITIZEN';
  }
  return cleanRole;
}

/**
 * POST /api/auth/signup
 * Register a new user account with email OTP verification.
 */
router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, name, role, district, phone } = req.body;

    if (!email || !password || !name) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Name, email, and password are required', undefined, req);
      return;
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Please enter a valid email address', undefined, req);
      return;
    }

    const passwordStr = String(password);
    if (passwordStr.length < 8) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Password must be at least 8 characters long', undefined, req);
      return;
    }

    if (passwordStr.length > 72) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Password must not exceed 72 characters', undefined, req);
      return;
    }

    // Sanitize and enforce permitted roles
    let assignedRole = 'CITIZEN';
    try {
      assignedRole = sanitizeSignupRole(role);
    } catch {
      sendError(
        res,
        403,
        'FORBIDDEN_ROLE',
        'Administrative or privileged roles cannot be self-registered. Please select a standard stakeholder role.',
        undefined,
        req,
      );
      return;
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      if (existing.isEmailVerified) {
        sendError(res, 409, 'USER_EXISTS', 'An account with this email address already exists. Please sign in.', undefined, req);
        return;
      }

      // Prevent OTP resend flooding on unverified registration attempts (60s cooldown)
      if (existing.otpLastSentAt) {
        const elapsedMs = Date.now() - existing.otpLastSentAt.getTime();
        if (elapsedMs < 60_000) {
          const remainingSec = Math.ceil((60_000 - elapsedMs) / 1000);
          sendError(
            res,
            429,
            'RATE_LIMITED',
            `A verification code was recently dispatched. Please wait ${remainingSec} seconds before requesting a new code.`,
            undefined,
            req,
          );
          return;
        }
      }

      // If user exists but is not verified, refresh OTP and allow them to verify
      const otp = generateOtp();
      const otpHash = await bcrypt.hash(otp, 10);
      const passwordHash = await bcrypt.hash(passwordStr, 10);

      await prisma.user.update({
        where: { id: existing.id },
        data: {
          name: name.trim(),
          passwordHash,
          role: assignedRole,
          district: district ? String(district).trim() : existing.district,
          phone: phone ? String(phone).trim() : existing.phone,
          otpHash,
          otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
          otpAttempts: 0,
          otpLastSentAt: new Date(),
        },
      });

      await sendBrevoOtpEmail({
        toEmail: normalizedEmail,
        recipientName: name.trim(),
        otp,
        purpose: 'registration',
      });

      sendSuccess(
        res,
        {
          requiresVerification: true,
          email: normalizedEmail,
          message: 'Account registration updated. A verification code has been sent to your email.',
        },
        200,
        req,
      );
      return;
    }

    // Hash password & generate OTP
    const passwordHash = await bcrypt.hash(passwordStr, 10);
    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);

    const newUser = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        name: name.trim(),
        role: assignedRole,
        district: district ? String(district).trim() : undefined,
        phone: phone ? String(phone).trim() : undefined,
        isEmailVerified: false,
        otpHash,
        otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        otpAttempts: 0,
        otpLastSentAt: new Date(),
      },
    });

    // Send OTP via Brevo
    await sendBrevoOtpEmail({
      toEmail: normalizedEmail,
      recipientName: newUser.name,
      otp,
      purpose: 'registration',
    });

    sendSuccess(
      res,
      {
        requiresVerification: true,
        email: normalizedEmail,
        message: 'Account created. Please enter the 6-digit verification code sent to your email.',
      },
      201,
      req,
    );
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/auth/verify-otp
 * Verify the 6-digit OTP, mark email as verified, and issue HttpOnly JWT session cookie.
 */
router.post('/verify-otp', async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Email and 6-digit OTP code are required', undefined, req);
      return;
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const cleanOtp = String(otp).trim();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      sendError(res, 404, 'NOT_FOUND', 'No account found with this email address.', undefined, req);
      return;
    }

    if (user.isEmailVerified) {
      // Already verified — issue token and proceed
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role, name: user.name },
        env.JWT_SECRET,
        { expiresIn: '7d', algorithm: 'HS256' },
      );
      setAuthCookie(res, token);

      sendSuccess(
        res,
        {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            district: user.district,
            avatarUrl: user.avatarUrl,
            isEmailVerified: true,
          },
          message: 'Email already verified. Successfully signed in.',
        },
        200,
        req,
      );
      return;
    }

    // Check expiration
    if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
      sendError(res, 400, 'OTP_EXPIRED', 'Verification code has expired. Please request a new code.', undefined, req);
      return;
    }

    // Check attempts limit
    if (user.otpAttempts >= 5) {
      sendError(res, 429, 'TOO_MANY_ATTEMPTS', 'Too many failed verification attempts. Please request a fresh code.', undefined, req);
      return;
    }

    // Verify OTP hash
    if (!user.otpHash) {
      sendError(res, 400, 'INVALID_OTP', 'No pending verification code found. Please request a new code.', undefined, req);
      return;
    }

    const isValid = await bcrypt.compare(cleanOtp, user.otpHash);
    if (!isValid) {
      await prisma.user.update({
        where: { id: user.id },
        data: { otpAttempts: { increment: 1 } },
      });
      sendError(res, 400, 'INVALID_OTP', 'Invalid verification code. Please check your email and try again.', undefined, req);
      return;
    }

    // Mark as verified and clear OTP
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        otpHash: null,
        otpExpiresAt: null,
        otpAttempts: 0,
      },
    });

    // Issue JWT stored exclusively in HttpOnly cookie
    const token = jwt.sign(
      { userId: updatedUser.id, email: updatedUser.email, role: updatedUser.role, name: updatedUser.name },
      env.JWT_SECRET,
      { expiresIn: '7d', algorithm: 'HS256' },
    );
    setAuthCookie(res, token);

    sendSuccess(
      res,
      {
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          role: updatedUser.role,
          district: updatedUser.district,
          avatarUrl: updatedUser.avatarUrl,
          isEmailVerified: true,
        },
        message: 'Email verified successfully! Welcome to JharSankalp.',
      },
      200,
      req,
    );
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/auth/resend-otp
 * Resend a fresh 6-digit OTP code with rate-limit cooldown.
 */
router.post('/resend-otp', async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Email is required', undefined, req);
      return;
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      sendError(res, 404, 'NOT_FOUND', 'No account found with this email address.', undefined, req);
      return;
    }

    if (user.isEmailVerified) {
      sendError(res, 400, 'ALREADY_VERIFIED', 'This account email is already verified. Please sign in.', undefined, req);
      return;
    }

    // Rate limit cooldown (60 seconds)
    if (user.otpLastSentAt) {
      const elapsedMs = Date.now() - user.otpLastSentAt.getTime();
      if (elapsedMs < 60_000) {
        const remainingSec = Math.ceil((60_000 - elapsedMs) / 1000);
        sendError(res, 429, 'RATE_LIMITED', `Please wait ${remainingSec} seconds before requesting a new code.`, undefined, req);
        return;
      }
    }

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        otpHash,
        otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        otpAttempts: 0,
        otpLastSentAt: new Date(),
      },
    });

    await sendBrevoOtpEmail({
      toEmail: normalizedEmail,
      recipientName: user.name,
      otp,
      purpose: 'registration',
    });

    sendSuccess(
      res,
      {
        email: normalizedEmail,
        message: 'A fresh 6-digit verification code has been dispatched to your email.',
      },
      200,
      req,
    );
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/auth/login
 * Authenticate with email & password. Issues JWT exclusively in HttpOnly cookie.
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Email and password are required', undefined, req);
      return;
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      sendError(res, 401, 'INVALID_CREDENTIALS', 'Invalid email or password', undefined, req);
      return;
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      sendError(res, 401, 'INVALID_CREDENTIALS', 'Invalid email or password', undefined, req);
      return;
    }

    // Require email verification
    if (!user.isEmailVerified) {
      const otp = generateOtp();
      const otpHash = await bcrypt.hash(otp, 10);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          otpHash,
          otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
          otpAttempts: 0,
          otpLastSentAt: new Date(),
        },
      });

      await sendBrevoOtpEmail({
        toEmail: normalizedEmail,
        recipientName: user.name,
        otp,
        purpose: 'login',
      });

      sendSuccess(
        res,
        {
          requiresVerification: true,
          email: normalizedEmail,
          message: 'Your email address is not yet verified. A verification code has been sent.',
        },
        200,
        req,
      );
      return;
    }

    // Issue JWT inside HttpOnly cookie
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, name: user.name },
      env.JWT_SECRET,
      { expiresIn: '7d', algorithm: 'HS256' },
    );
    setAuthCookie(res, token);

    sendSuccess(
      res,
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          district: user.district,
          avatarUrl: user.avatarUrl,
          organizationId: user.organizationId,
          isEmailVerified: true,
        },
        message: 'Successfully authenticated.',
      },
      200,
      req,
    );
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/auth/logout
 * Clear the HttpOnly session cookie.
 */
router.post('/logout', (req, res) => {
  clearAuthCookie(res);
  sendSuccess(res, { message: 'Signed out successfully.' }, 200, req);
});

/**
 * GET /api/auth/me
 * Restore authenticated user state from verified HttpOnly cookie on page refresh.
 */
router.get('/me', requireAuth, async (req: AppRequest, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        district: true,
        organizationId: true,
        avatarUrl: true,
        bio: true,
        isEmailVerified: true,
        isActive: true,
        createdAt: true,
        organization: {
          select: {
            id: true,
            name: true,
            type: true,
            isVerified: true,
          },
        },
      },
    });

    if (!user || !user.isActive) {
      clearAuthCookie(res);
      sendError(res, 401, 'UNAUTHORIZED', 'Account session expired or disabled. Please sign in again.', undefined, req);
      return;
    }

    sendSuccess(res, { user }, 200, req);
  } catch (error) {
    next(error);
  }
});

export default router;
