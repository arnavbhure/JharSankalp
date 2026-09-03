import { Router } from 'express';
import { prisma } from '../../config/database.js';
import { sendSuccess } from '../../utils/response.js';

const router = Router();

/**
 * GET /api/activities
 * Retrieve latest ecosystem activities feed.
 */
router.get('/', async (req, res, next) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 50);

    const activities = await prisma.activity.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    sendSuccess(res, activities, 200, req);
  } catch (error) {
    next(error);
  }
});

export default router;
