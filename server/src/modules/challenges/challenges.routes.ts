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
          select: { ideas: true, collaborations: true, solutions: true, projects: true },
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
        projects: {
          include: {
            leadOrganization: true,
            milestones: true,
            impactMetrics: true,
          },
        },
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

/**
 * POST /api/challenges
 * Create a new challenge.
 */
router.post('/', async (req, res, next) => {
  try {
    const {
      title,
      description,
      domain,
      subdomain,
      districtId,
      block,
      panchayatOrUlb,
      affectedPopulation,
      priority,
      submittedById,
      organizationId,
      sourceType,
    } = req.body;

    if (!title || !description) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Title and description are required', undefined, req);
      return;
    }

    // Default to citizen user if none provided
    let submitterId = submittedById;
    if (!submitterId) {
      const defaultUser = await prisma.user.findFirst();
      submitterId = defaultUser?.id;
    }

    if (!submitterId) {
      sendError(res, 400, 'USER_REQUIRED', 'Valid user is required to submit a challenge', undefined, req);
      return;
    }

    const year = new Date().getFullYear();
    const count = await prisma.challenge.count();
    const publicId = `JS-${year}-${String(count + 1).padStart(5, '0')}`;

    const challenge = await prisma.challenge.create({
      data: {
        publicId,
        challengeCode: publicId,
        title,
        description,
        domain: domain || 'General',
        subdomain,
        districtId: districtId || undefined,
        block,
        panchayatOrUlb,
        affectedPopulation: affectedPopulation ? Number(affectedPopulation) : undefined,
        priority: priority || 'MEDIUM',
        status: 'SUBMITTED',
        sourceType: sourceType || 'CITIZEN',
        submittedById: submitterId,
        organizationId: organizationId || undefined,
      },
      include: {
        district: true,
        submittedBy: {
          select: { id: true, name: true, role: true },
        },
      },
    });

    // Record activity
    await prisma.activity.create({
      data: {
        type: 'CHALLENGE_CREATED',
        message: `New challenge logged: ${challenge.publicId} — ${challenge.title}`,
        challengeId: challenge.id,
        userId: submitterId,
        organizationId: organizationId || undefined,
      },
    });

    sendSuccess(res, challenge, 201, req);
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /api/challenges/:id
 * Update challenge status, priority, or details.
 */
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const existing = await prisma.challenge.findFirst({
      where: { OR: [{ id }, { publicId: id }, { challengeCode: id }] },
    });

    if (!existing) {
      sendError(res, 404, 'NOT_FOUND', `Challenge '${id}' not found`, undefined, req);
      return;
    }

    const updated = await prisma.challenge.update({
      where: { id: existing.id },
      data: body,
      include: {
        district: true,
        submittedBy: {
          select: { id: true, name: true, role: true },
        },
      },
    });

    if (body.status && body.status !== existing.status) {
      await prisma.activity.create({
        data: {
          type: 'STATUS_CHANGED',
          message: `Challenge ${updated.publicId} status changed to ${body.status}`,
          challengeId: updated.id,
        },
      });
    }

    sendSuccess(res, updated, 200, req);
  } catch (error) {
    next(error);
  }
});

export default router;
