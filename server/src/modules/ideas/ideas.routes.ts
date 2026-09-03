import { Router } from 'express';
import { prisma } from '../../config/database.js';
import { sendSuccess, sendError } from '../../utils/response.js';

const router = Router();

/**
 * GET /api/ideas
 * Retrieve ideas with optional domain, district, and status filtering.
 */
router.get('/', async (req, res, next) => {
  try {
    const { domain, district, status } = req.query;

    const whereClause: Record<string, unknown> = {};

    if (domain && typeof domain === 'string' && domain !== 'All Focus Areas') {
      whereClause.domain = { equals: domain, mode: 'insensitive' };
    }

    if (district && typeof district === 'string' && district !== 'All Districts') {
      whereClause.district = { equals: district, mode: 'insensitive' };
    }

    if (status && typeof status === 'string' && status !== 'All Statuses') {
      whereClause.status = status;
    }

    const ideas = await prisma.idea.findMany({
      where: whereClause,
      include: {
        submittedBy: {
          select: { id: true, name: true, role: true, avatarUrl: true },
        },
        challenge: {
          select: { id: true, publicId: true, title: true, domain: true },
        },
        _count: {
          select: { collaborations: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    sendSuccess(res, ideas, 200, req);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/ideas/:id
 * Retrieve a single idea by ID.
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const idea = await prisma.idea.findUnique({
      where: { id },
      include: {
        submittedBy: {
          select: { id: true, name: true, role: true, avatarUrl: true, bio: true },
        },
        challenge: true,
        collaborations: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!idea) {
      sendError(res, 404, 'NOT_FOUND', `Idea '${id}' not found`, undefined, req);
      return;
    }

    sendSuccess(res, idea, 200, req);
  } catch (error) {
    next(error);
  }
});

export default router;
