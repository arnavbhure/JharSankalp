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
          select: { collaborations: true, projects: true },
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
        projects: {
          include: {
            leadOrganization: true,
            milestones: true,
            impactMetrics: true,
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

/**
 * POST /api/ideas
 * Submit a new idea.
 */
router.post('/', async (req, res, next) => {
  try {
    const {
      title,
      description,
      domain,
      district,
      trlLevel,
      submittedById,
      relatedChallengeId,
    } = req.body;

    if (!title || !description) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Title and description are required', undefined, req);
      return;
    }

    let submitterId = submittedById;
    if (!submitterId) {
      const defaultUser = await prisma.user.findFirst({ where: { role: 'UNIVERSITY' } });
      submitterId = defaultUser?.id || (await prisma.user.findFirst())?.id;
    }

    if (!submitterId) {
      sendError(res, 400, 'USER_REQUIRED', 'Valid submitter required', undefined, req);
      return;
    }

    const idea = await prisma.idea.create({
      data: {
        title,
        description,
        domain: domain || 'General',
        district: district || undefined,
        tags: trlLevel ? [`TRL-${trlLevel}`] : [],
        status: 'SUBMITTED',
        submittedById: submitterId,
        relatedChallengeId: relatedChallengeId || undefined,
      },
      include: {
        submittedBy: { select: { id: true, name: true, role: true } },
        challenge: true,
      },
    });

    await prisma.activity.create({
      data: {
        type: 'IDEA_SUBMITTED',
        message: `New solution approach proposed: "${idea.title}"`,
        ideaId: idea.id,
        challengeId: idea.relatedChallengeId || undefined,
        userId: submitterId,
      },
    });

    sendSuccess(res, idea, 201, req);
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /api/ideas/:id
 * Update idea status or details.
 */
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const existing = await prisma.idea.findUnique({ where: { id } });
    if (!existing) {
      sendError(res, 404, 'NOT_FOUND', `Idea '${id}' not found`, undefined, req);
      return;
    }

    const updated = await prisma.idea.update({
      where: { id },
      data: body,
      include: {
        submittedBy: { select: { id: true, name: true, role: true } },
        challenge: true,
      },
    });

    sendSuccess(res, updated, 200, req);
  } catch (error) {
    next(error);
  }
});

export default router;
