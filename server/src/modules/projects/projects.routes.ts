import { Router } from 'express';
import { prisma } from '../../config/database.js';
import { sendSuccess, sendError } from '../../utils/response.js';
import { validate } from '../../middleware/validate.js';
import { createProjectSchema, updateProjectSchema } from './projects.schemas.js';

const router = Router();

/**
 * GET /api/projects
 * Retrieve projects with optional domain, district, stage, and status filtering.
 */
router.get('/', async (req, res, next) => {
  try {
    const { domain, district, stage, status, search } = req.query;

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

    if (status && typeof status === 'string' && status !== 'All Statuses') {
      whereClause.status = status;
    }

    if (search && typeof search === 'string' && search.trim() !== '') {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { referenceCode: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      include: {
        challenge: {
          select: {
            id: true,
            publicId: true,
            title: true,
            domain: true,
            district: true,
          },
        },
        idea: {
          select: {
            id: true,
            title: true,
            domain: true,
          },
        },
        leadOrganization: {
          select: {
            id: true,
            name: true,
            type: true,
            logoUrl: true,
          },
        },
        participants: {
          include: {
            organization: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
        milestones: {
          orderBy: { dueDate: 'asc' },
        },
        impactMetrics: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    sendSuccess(res, projects, 200, req);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/projects/:id
 * Retrieve a single project by ID or referenceCode (e.g. PRJ-2026-0012).
 */
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id as string;

    const project = await prisma.project.findFirst({
      where: {
        OR: [{ id }, { referenceCode: id }],
      },
      include: {
        challenge: {
          include: {
            district: true,
            submittedBy: {
              select: { id: true, name: true, role: true },
            },
          },
        },
        idea: {
          include: {
            submittedBy: {
              select: { id: true, name: true, role: true },
            },
          },
        },
        leadOrganization: true,
        participants: {
          include: {
            organization: true,
          },
        },
        milestones: {
          orderBy: { dueDate: 'asc' },
        },
        impactMetrics: true,
      },
    });

    if (!project) {
      sendError(res, 404, 'NOT_FOUND', `Project '${id}' not found`, undefined, req);
      return;
    }

    sendSuccess(res, project, 200, req);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/projects
 * Create a new project.
 */
router.post('/', validate({ body: createProjectSchema }), async (req, res, next) => {
  try {
    const data = req.body;

    // Generate reference code if not supplied
    let referenceCode = data.referenceCode;
    if (!referenceCode) {
      const year = new Date().getFullYear();
      const count = await prisma.project.count();
      referenceCode = `PRJ-${year}-${String(count + 1).padStart(4, '0')}`;
    }

    const project = await prisma.project.create({
      data: {
        ...data,
        referenceCode,
      },
      include: {
        challenge: true,
        idea: true,
        leadOrganization: true,
      },
    });

    // Log activity
    await prisma.activity.create({
      data: {
        type: 'PROJECT_STARTED',
        message: `Project ${project.referenceCode} (${project.title}) initiated`,
        projectId: project.id,
        challengeId: project.challengeId,
        organizationId: project.leadOrganizationId,
      },
    });

    sendSuccess(res, project, 201, req);
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /api/projects/:id
 * Update project details (stage, status, impact summary, etc.).
 */
router.patch('/:id', validate({ body: updateProjectSchema }), async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const data = req.body;

    const existing = await prisma.project.findFirst({
      where: { OR: [{ id }, { referenceCode: id }] },
    });

    if (!existing) {
      sendError(res, 404, 'NOT_FOUND', `Project '${id}' not found`, undefined, req);
      return;
    }

    const updated = await prisma.project.update({
      where: { id: existing.id },
      data,
      include: {
        challenge: true,
        idea: true,
        leadOrganization: true,
        milestones: true,
        impactMetrics: true,
      },
    });

    if (data.stage && data.stage !== existing.stage) {
      await prisma.activity.create({
        data: {
          type: 'STATUS_CHANGED',
          message: `Project ${updated.referenceCode} advanced to stage ${data.stage}`,
          projectId: updated.id,
          challengeId: updated.challengeId,
          organizationId: updated.leadOrganizationId,
        },
      });
    }

    sendSuccess(res, updated, 200, req);
  } catch (error) {
    next(error);
  }
});

export default router;
