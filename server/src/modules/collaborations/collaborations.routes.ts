import { Router } from 'express';
import { prisma } from '../../config/database.js';
import { sendSuccess, sendError } from '../../utils/response.js';

const router = Router();

/**
 * GET /api/collaborations
 * Retrieve collaborative projects with optional filtering.
 */
router.get('/', async (req, res, next) => {
  try {
    const { domain, district, status, stage } = req.query;

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

    if (stage && typeof stage === 'string' && stage !== 'All Stages') {
      whereClause.stage = { equals: stage, mode: 'insensitive' };
    }

    const collaborations = await prisma.collaboration.findMany({
      where: whereClause,
      include: {
        challenge: {
          select: { id: true, publicId: true, title: true, domain: true },
        },
        idea: {
          select: { id: true, title: true },
        },
        members: {
          select: {
            id: true,
            memberName: true,
            role: true,
            institution: true,
            avatarUrl: true,
          },
        },
        solutions: {
          select: { id: true, title: true, stage: true, progressPercentage: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    sendSuccess(res, collaborations, 200, req);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/collaborations/:id
 * Retrieve a single collaboration by ID.
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const collaboration = await prisma.collaboration.findUnique({
      where: { id },
      include: {
        challenge: true,
        idea: true,
        members: true,
        solutions: {
          include: {
            impactRecords: true,
          },
        },
      },
    });

    if (!collaboration) {
      sendError(res, 404, 'NOT_FOUND', `Collaboration '${id}' not found`, undefined, req);
      return;
    }

    sendSuccess(res, collaboration, 200, req);
  } catch (error) {
    next(error);
  }
});

export default router;
