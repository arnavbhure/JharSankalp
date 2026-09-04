import { Router } from 'express';
import { prisma } from '../../config/database.js';
import { sendSuccess, sendError } from '../../utils/response.js';
import { validate } from '../../middleware/validate.js';
import { createProjectSchema, updateProjectSchema } from './projects.schemas.js';
import { requireAuth } from '../../middleware/auth.js';
import { RoleGroups } from '../../middleware/authorize.js';
import type { AppRequest } from '../../types/request.js';

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
 * Create a new project. Requires authentication and stakeholder authorization.
 */
router.post(
  '/',
  requireAuth,
  validate({ body: createProjectSchema }),
  async (req: AppRequest, res, next) => {
    try {
      const data = req.body;
      const userRole = (req.userRole || '').toUpperCase();
      const isGovOrAdmin =
        RoleGroups.GOVERNMENT.includes(userRole) || userRole === 'SUPER_ADMIN';
      const isInstitutional =
        RoleGroups.UNIVERSITY.includes(userRole) || RoleGroups.INDUSTRY.includes(userRole);

      if (!isGovOrAdmin && !isInstitutional) {
        sendError(
          res,
          403,
          'FORBIDDEN',
          'Only institutional researchers, industry partners, or government officers can initiate field projects.',
          undefined,
          req,
        );
        return;
      }

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
          userId: req.userId,
        },
      });

      sendSuccess(res, project, 201, req);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * PATCH /api/projects/:id
 * Update project details. Requires authentication, ownership, or government oversight.
 */
router.patch(
  '/:id',
  requireAuth,
  validate({ body: updateProjectSchema }),
  async (req: AppRequest, res, next) => {
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

      const userRole = (req.userRole || '').toUpperCase();
      const isGovOrAdmin =
        RoleGroups.GOVERNMENT.includes(userRole) || userRole === 'SUPER_ADMIN';

      let isAuthorizedModifier = isGovOrAdmin;
      if (!isAuthorizedModifier && req.userId) {
        const user = await prisma.user.findUnique({
          where: { id: req.userId },
          select: { organizationId: true },
        });
        if (user?.organizationId && existing.leadOrganizationId === user.organizationId) {
          isAuthorizedModifier = true;
        }
        if (!isAuthorizedModifier) {
          const participant = await prisma.projectParticipant.findFirst({
            where: {
              projectId: existing.id,
              OR: [
                { userId: req.userId },
                ...(user?.organizationId ? [{ organizationId: user.organizationId }] : []),
              ],
            },
          });
          if (participant) {
            isAuthorizedModifier = true;
          }
        }
      }

      if (!isAuthorizedModifier) {
        sendError(
          res,
          403,
          'FORBIDDEN',
          'You do not have permission to modify this project.',
          undefined,
          req,
        );
        return;
      }

      // Whitelist safe update fields to prevent mass assignment
      const allowedFields = [
        'title',
        'description',
        'domain',
        'district',
        'block',
        'stage',
        'status',
        'startDate',
        'expectedEndDate',
        'affectedPopulation',
        'locationDisplay',
        'impactSummary',
      ];
      const safeData: Record<string, unknown> = {};
      for (const key of allowedFields) {
        if (data[key] !== undefined) {
          safeData[key] = data[key];
        }
      }

      const updated = await prisma.project.update({
        where: { id: existing.id },
        data: safeData,
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
            userId: req.userId,
          },
        });
      }

      sendSuccess(res, updated, 200, req);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
