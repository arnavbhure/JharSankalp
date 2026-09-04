import { Router } from 'express';
import { prisma } from '../../config/database.js';
import { sendSuccess, sendError } from '../../utils/response.js';
import { requireAuth } from '../../middleware/auth.js';
import { RoleGroups } from '../../middleware/authorize.js';
import type { AppRequest } from '../../types/request.js';

const router = Router();

/**
 * GET /api/ideas/my
 * Retrieve all ideas submitted by the currently authenticated user.
 */
router.get('/my', requireAuth, async (req: AppRequest, res, next) => {
  try {
    const ideas = await prisma.idea.findMany({
      where: { submittedById: req.userId },
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

    let idea = null;
    try {
      idea = await prisma.idea.findUnique({
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
    } catch {
      // id wasn't a direct match or valid UUID
    }

    if (!idea) {
      const cleanSearch = id.replace(/[_-]/g, ' ').trim();
      idea = await prisma.idea.findFirst({
        where: {
          OR: [
            { id },
            { title: { contains: cleanSearch, mode: 'insensitive' } },
            { domain: { contains: cleanSearch, mode: 'insensitive' } },
          ],
        },
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
    }

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
router.post('/', requireAuth, async (req: AppRequest, res, next) => {
  try {
    const { title, description, domain, district, trlLevel, relatedChallengeId } = req.body;

    if (!title || !description) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Title and description are required', undefined, req);
      return;
    }

    const submitterId = req.userId;
    if (!submitterId) {
      sendError(
        res,
        401,
        'UNAUTHORIZED',
        'Authentication required to submit an idea',
        undefined,
        req,
      );
      return;
    }

    const idea = await prisma.idea.create({
      data: {
        title: title.trim(),
        description: description.trim(),
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
router.patch('/:id', requireAuth, async (req: AppRequest, res, next) => {
  try {
    const id = req.params.id as string;
    const body = req.body;

    const existing = await prisma.idea.findUnique({ where: { id } });
    if (!existing) {
      sendError(res, 404, 'NOT_FOUND', `Idea '${id}' not found`, undefined, req);
      return;
    }

    const isGovOrAdmin = req.userRole && RoleGroups.GOVERNMENT.includes(req.userRole.toUpperCase());
    const isOwner = existing.submittedById === req.userId;

    if (!isGovOrAdmin && !isOwner) {
      sendError(
        res,
        403,
        'FORBIDDEN',
        'You do not have permission to modify this solution idea.',
        undefined,
        req,
      );
      return;
    }

    const safeData: Record<string, unknown> = {};

    // Status can only be altered by Government/Admin, or set to WITHDRAWN by the author
    if (body.status !== undefined) {
      if (isGovOrAdmin) {
        safeData.status = body.status;
      } else if (isOwner && body.status === 'WITHDRAWN') {
        safeData.status = 'WITHDRAWN';
      } else {
        sendError(
          res,
          403,
          'FORBIDDEN',
          'Only authorized reviewers can advance solution idea status.',
          undefined,
          req,
        );
        return;
      }
    }

    // Content fields either government or owner can update
    if (isGovOrAdmin || isOwner) {
      if (body.title !== undefined) safeData.title = String(body.title).trim();
      if (body.description !== undefined) safeData.description = String(body.description).trim();
      if (body.domain !== undefined) safeData.domain = body.domain;
      if (body.district !== undefined) safeData.district = body.district;
      if (Array.isArray(body.tags)) safeData.tags = body.tags.map(String).slice(0, 10);
    }

    const updated = await prisma.idea.update({
      where: { id },
      data: safeData,
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
