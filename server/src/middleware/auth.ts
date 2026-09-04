import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { errors } from './errorHandler.js';
import type { AppRequest } from '../types/request.js';

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  name?: string;
  iat?: number;
  exp?: number;
}

/**
 * Middleware: Verifies the JWT stored inside the HttpOnly cookie or Authorization header.
 * Attaches userId, userRole, and user payload to the request.
 */
export function requireAuth(req: AppRequest, _res: Response, next: NextFunction): void {
  let token: string | undefined;

  // 1. First preference: HttpOnly cookie 'token'
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // 2. Fallback: Bearer Authorization header
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(errors.unauthorized('Authentication required. Please sign in to access this resource.'));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET, {
      algorithms: ['HS256'],
    }) as JwtPayload;

    if (!decoded || !decoded.userId) {
      return next(errors.unauthorized('Invalid or expired authentication token.'));
    }

    // Attach to request
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      name: decoded.name,
    };

    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return next(errors.unauthorized('Your session has expired. Please sign in again.'));
    }
    return next(errors.unauthorized('Invalid authentication token.'));
  }
}

/**
 * Optional Auth: If a token exists, populates req.user without rejecting unauthenticated requests.
 */
export function optionalAuth(req: AppRequest, _res: Response, next: NextFunction): void {
  let token: string | undefined;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET, {
      algorithms: ['HS256'],
    }) as JwtPayload;
    if (decoded && decoded.userId) {
      req.userId = decoded.userId;
      req.userRole = decoded.role;
      req.user = {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role,
        name: decoded.name,
      };
    }
  } catch {
    // Ignore invalid tokens in optional auth
  }

  next();
}
