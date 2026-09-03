import { Router } from 'express';
import { prisma } from '../../config/database.js';
import { sendSuccess, sendError } from '../../utils/response.js';

const router = Router();

/**
 * GET /api/organizations
 * Retrieve organizations with optional type filtering.
 */
router.get('/', async (req, res, next) => {
  try {
    const { type, district } = req.query;

    const whereClause: Record<string, unknown> = {};

    if (type && typeof type === 'string' && type !== 'All') {
      whereClause.type = type;
    }

    if (district && typeof district === 'string') {
      whereClause.district = { name: { equals: district, mode: 'insensitive' } };
    }

    const organizations = await prisma.organization.findMany({
      where: whereClause,
      include: {
        district: true,
        _count: {
          select: {
            users: true,
            challenges: true,
            ledProjects: true,
            projectParticipations: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    sendSuccess(res, organizations, 200, req);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/organizations/:id
 * Retrieve a single organization by ID.
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const organization = await prisma.organization.findUnique({
      where: { id },
      include: {
        district: true,
        users: {
          select: { id: true, name: true, email: true, role: true, avatarUrl: true, bio: true },
        },
        ledProjects: {
          include: {
            milestones: true,
            impactMetrics: true,
          },
        },
        projectParticipations: {
          include: {
            project: {
              include: {
                leadOrganization: true,
              },
            },
          },
        },
      },
    });

    if (!organization) {
      sendError(res, 404, 'NOT_FOUND', `Organization '${id}' not found`, undefined, req);
      return;
    }

    sendSuccess(res, organization, 200, req);
  } catch (error) {
    next(error);
  }
});

export default router;
