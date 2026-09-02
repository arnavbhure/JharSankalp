import { Router } from 'express';
import type { HealthStatus } from '@jharsankalp/shared';
import { prisma } from '../../config/database.js';
import { sendSuccess } from '../../utils/response.js';

const router = Router();
const startTime = Date.now();

/**
 * GET /api/v1/health
 * Returns server health status including database connectivity.
 */
router.get('/', async (req, res, next) => {
  try {
    // Check database connectivity
    let dbStatus: 'connected' | 'disconnected' = 'disconnected';
    try {
      await prisma.$queryRaw`SELECT 1`;
      dbStatus = 'connected';
    } catch {
      dbStatus = 'disconnected';
    }

    const status: HealthStatus = {
      status: dbStatus === 'connected' ? 'healthy' : 'degraded',
      version: '0.1.0',
      uptime: Math.floor((Date.now() - startTime) / 1000),
      timestamp: new Date().toISOString(),
      services: {
        database: dbStatus,
      },
    };

    sendSuccess(res, status, 200, req);
  } catch (error) {
    next(error);
  }
});

export default router;
