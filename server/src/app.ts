import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { requestIdMiddleware } from './middleware/requestId.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import healthRoutes from './modules/health/health.routes.js';
import challengesRoutes from './modules/challenges/challenges.routes.js';
import ideasRoutes from './modules/ideas/ideas.routes.js';
import collaborationsRoutes from './modules/collaborations/collaborations.routes.js';
import solutionsRoutes from './modules/solutions/solutions.routes.js';
import impactRoutes from './modules/impact/impact.routes.js';
import dashboardRoutes from './modules/dashboard/dashboard.routes.js';

const app = express();

// ── Security ─────────────────────────────────────────────────

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN.split(',').map((o) => o.trim()),
    credentials: true,
  }),
);

// ── Rate Limiting ────────────────────────────────────────────

const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMITED',
      message: 'Too many requests, please try again later',
    },
  },
});

app.use('/api', limiter);

// ── Body Parsing ─────────────────────────────────────────────

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

// ── API Routes (mounted for both /api/v1 and /api) ───────────

app.use('/api/v1/health', healthRoutes);
app.use('/api/health', healthRoutes);

app.use('/api/v1/challenges', challengesRoutes);
app.use('/api/challenges', challengesRoutes);

app.use('/api/v1/ideas', ideasRoutes);
app.use('/api/ideas', ideasRoutes);

app.use('/api/v1/collaborations', collaborationsRoutes);
app.use('/api/collaborations', collaborationsRoutes);

app.use('/api/v1/solutions', solutionsRoutes);
app.use('/api/solutions', solutionsRoutes);

app.use('/api/v1/impact', impactRoutes);
app.use('/api/impact', impactRoutes);

app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ── Error Handling ───────────────────────────────────────────

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
