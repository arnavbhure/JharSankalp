import { Router } from 'express';
import { prisma } from '../../config/database.js';
import { sendSuccess, sendError } from '../../utils/response.js';

const router = Router();

/**
 * GET /api/challenges
 * Retrieve challenges with optional domain and district filtering.
 */
router.get('/', async (req, res, next) => {
  try {
    const { domain, district, status } = req.query;

    const whereClause: Record<string, unknown> = {};

    if (domain && typeof domain === 'string' && domain !== 'All Focus Areas') {
      whereClause.domain = { equals: domain, mode: 'insensitive' };
    }

    if (status && typeof status === 'string' && status !== 'All Statuses') {
      whereClause.status = status;
    }

    if (district && typeof district === 'string' && district !== 'All Districts') {
      whereClause.district = {
        name: { equals: district, mode: 'insensitive' },
      };
    }

    const challenges = await prisma.challenge.findMany({
      where: whereClause,
      include: {
        district: true,
        submittedBy: {
          select: { id: true, name: true, role: true, avatarUrl: true },
        },
        organization: {
          select: { id: true, name: true, type: true },
        },
        _count: {
          select: { ideas: true, collaborations: true, solutions: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    sendSuccess(res, challenges, 200, req);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/challenges/:id
 * Retrieve a single challenge by ID or publicId.
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const challenge = await prisma.challenge.findFirst({
      where: {
        OR: [{ id }, { publicId: id }, { challengeCode: id }],
      },
      include: {
        district: true,
        submittedBy: {
          select: { id: true, name: true, role: true, avatarUrl: true, bio: true },
        },
        organization: true,
        evidence: true,
        ideas: {
          include: {
            submittedBy: { select: { id: true, name: true, role: true } },
          },
        },
        collaborations: {
          include: {
            members: true,
          },
        },
        solutions: true,
      },
    });

    if (!challenge) {
      sendError(res, 404, 'NOT_FOUND', `Challenge '${id}' not found`, undefined, req);
      return;
    }

    sendSuccess(res, challenge, 200, req);
  } catch (error) {
    next(error);
  }
});

export default router;
