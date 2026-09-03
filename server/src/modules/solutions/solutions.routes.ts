import { Router } from 'express';
import { prisma } from '../../config/database.js';
import { sendSuccess, sendError } from '../../utils/response.js';

const router = Router();

/**
 * GET /api/solutions
 * Retrieve solutions with optional domain, district, and stage filtering.
 */
router.get('/', async (req, res, next) => {
  try {
    const { domain, district, stage } = req.query;

    const whereClause: Record<string, unknown> = {};

    if (domain && typeof domain === 'string' && domain !== 'All Focus Areas') {
      whereClause.domain = { equals: domain, mode: 'insensitive' };
    }

    if (district && typeof district === 'string' && district !== 'All Districts') {
      whereClause.district = { equals: district, mode: 'insensitive' };
    }

    if (stage && typeof stage === 'string' && stage !== 'All Stages') {
      whereClause.stage = { equals: stage, mode: 'insensitive' };
    }

    const solutions = await prisma.solution.findMany({
      where: whereClause,
      include: {
        challenge: {
          select: { id: true, publicId: true, title: true, domain: true },
        },
        collaboration: {
          select: { id: true, title: true, status: true },
        },
        impactRecords: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    sendSuccess(res, solutions, 200, req);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/solutions/:id
 * Retrieve a single solution by ID.
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const solution = await prisma.solution.findUnique({
      where: { id },
      include: {
        challenge: true,
        collaboration: {
          include: {
            members: true,
          },
        },
        impactRecords: true,
      },
    });

    if (!solution) {
      sendError(res, 404, 'NOT_FOUND', `Solution '${id}' not found`, undefined, req);
      return;
    }

    sendSuccess(res, solution, 200, req);
  } catch (error) {
    next(error);
  }
});

export default router;
