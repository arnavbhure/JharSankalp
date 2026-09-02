import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { requestIdMiddleware } from './middleware/requestId.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import healthRoutes from './modules/health/health.routes.js';

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
      skip: (req) => req.url === '/api/v1/health',
    }),
  );
}

// ── API Routes ───────────────────────────────────────────────

app.use('/api/v1/health', healthRoutes);

// Future module routes will be mounted here:
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/challenges', challengeRoutes);
// app.use('/api/v1/ai', aiRoutes);
// app.use('/api/v1/universities', universityRoutes);
// app.use('/api/v1/industries', industryRoutes);
// app.use('/api/v1/commitments', commitmentRoutes);
// app.use('/api/v1/consortiums', consortiumRoutes);
// app.use('/api/v1/projects', projectRoutes);
// app.use('/api/v1/missions', missionRoutes);
// app.use('/api/v1/analytics', analyticsRoutes);

// ── Error Handling ───────────────────────────────────────────

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
