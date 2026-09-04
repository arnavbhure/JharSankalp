import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { requestIdMiddleware } from './middleware/requestId.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import healthRoutes from './modules/health/health.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import challengesRoutes from './modules/challenges/challenges.routes.js';
import ideasRoutes from './modules/ideas/ideas.routes.js';
import collaborationsRoutes from './modules/collaborations/collaborations.routes.js';
import solutionsRoutes from './modules/solutions/solutions.routes.js';
import impactRoutes from './modules/impact/impact.routes.js';
import dashboardRoutes from './modules/dashboard/dashboard.routes.js';
import aiRoutes from './modules/ai/ai.routes.js';
import projectsRoutes from './modules/projects/projects.routes.js';
import organizationsRoutes from './modules/organizations/organizations.routes.js';
import activitiesRoutes from './modules/activities/activities.routes.js';

const app = express();

// ── Security ─────────────────────────────────────────────────

app.use(helmet());
// ── CORS Configuration ───────────────────────────────────────
const defaultAllowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
];

const configuredOrigins: string[] = [];

if (env.FRONTEND_URL) {
  env.FRONTEND_URL.split(',').forEach((url) => {
    const trimmed = url.trim().replace(/\/+$/, '');
    if (trimmed) configuredOrigins.push(trimmed);
  });
}

if (env.CORS_ORIGIN) {
  env.CORS_ORIGIN.split(',').forEach((url) => {
    const trimmed = url.trim().replace(/\/+$/, '');
    if (trimmed) configuredOrigins.push(trimmed);
  });
}

const allAllowedOrigins = Array.from(new Set([...defaultAllowedOrigins, ...configuredOrigins]));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, server-to-server, curl)
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/+$/, '');

      // Explicitly allow configured production and dev domains
      if (allAllowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      // Automatically allow Vercel deployment domains (*.vercel.app)
      if (/^https:\/\/[a-zA-Z0-9-_.]+\.vercel\.app$/.test(normalizedOrigin)) {
        return callback(null, true);
      }

      // In non-production, allow any localhost/127.0.0.1 port
      if (
        env.NODE_ENV !== 'production' &&
        /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(normalizedOrigin)
      ) {
        return callback(null, true);
      }

      console.warn(`[CORS Blocked]: Origin ${origin} is not allowed.`);
      return callback(new Error(`CORS policy does not allow access from origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'X-Request-Id'],
    exposedHeaders: ['Set-Cookie'],
  }),
);

// ── Cookie & Body Parsing ────────────────────────────────────

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Request Middleware ───────────────────────────────────────

app.use(requestIdMiddleware);

// ── Logging ──────────────────────────────────────────────────

if (env.NODE_ENV !== 'test') {
  app.use(
    morgan(':method :url :status :response-time ms - :res[content-length]', {
      skip: (req) => req.url.includes('/health'),
    }),
  );
}

// ── Security Rate Limiting ───────────────────────────────────

const generalLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
  max: env.RATE_LIMIT_MAX || 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMITED',
      message: 'Too many requests. Please try again shortly.',
    },
  },
  skip: (req) => req.url.includes('/health'),
});

const authStrictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // 20 sensitive auth attempts per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMITED',
      message: 'Too many authentication attempts. Please try again in 15 minutes.',
    },
  },
});

const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25, // 25 AI analysis queries per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMITED',
      message: 'Too many AI analysis requests. Please try again later.',
    },
  },
});

// Apply general limiter across all /api routes
app.use('/api', generalLimiter);

// ── API Routes (mounted for both /api/v1 and /api) ───────────

app.use('/api/v1/health', healthRoutes);
app.use('/api/health', healthRoutes);

app.use('/api/v1/auth', authStrictLimiter, authRoutes);
app.use('/api/auth', authStrictLimiter, authRoutes);

app.use('/api/v1/challenges', challengesRoutes);
app.use('/api/challenges', challengesRoutes);

app.use('/api/v1/ideas', ideasRoutes);
app.use('/api/ideas', ideasRoutes);

app.use('/api/v1/projects', projectsRoutes);
app.use('/api/projects', projectsRoutes);

app.use('/api/v1/organizations', organizationsRoutes);
app.use('/api/organizations', organizationsRoutes);

app.use('/api/v1/activities', activitiesRoutes);
app.use('/api/activities', activitiesRoutes);

app.use('/api/v1/collaborations', collaborationsRoutes);
app.use('/api/collaborations', collaborationsRoutes);

app.use('/api/v1/solutions', solutionsRoutes);
app.use('/api/solutions', solutionsRoutes);

app.use('/api/v1/impact', impactRoutes);
app.use('/api/impact', impactRoutes);

app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use('/api/v1/ai', aiLimiter, aiRoutes);
app.use('/api/ai', aiLimiter, aiRoutes);

// ── Error Handling ───────────────────────────────────────────

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
