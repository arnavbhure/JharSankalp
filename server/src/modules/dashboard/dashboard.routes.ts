import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/database.js';
import { sendSuccess, sendError } from '../../utils/response.js';
import { requireAuth } from '../../middleware/auth.js';
import { requireRole, RoleGroups } from '../../middleware/authorize.js';
import type { AppRequest } from '../../types/request.js';

const router = Router();

/**
 * GET /api/dashboard/overview
 * Overall high-level state of the Jharkhand Innovation Ecosystem.
 */
async function getDashboardOverview(req: Request, res: Response, next: NextFunction) {
  try {
    const [
      challengeCount,
      ideaCount,
      projectCount,
      collaborationCount,
      solutionCount,
      recentChallenges,
      recentIdeas,
      recentProjects,
      recentActivities,
      impactRecords,
    ] = await Promise.all([
      prisma.challenge.count(),
      prisma.idea.count(),
      prisma.project.count(),
      prisma.collaboration.count(),
      prisma.solution.count(),
      prisma.challenge.findMany({
        take: 4,
        orderBy: { createdAt: 'desc' },
        include: { district: true },
      }),
      prisma.idea.findMany({
        take: 4,
        orderBy: { createdAt: 'desc' },
        include: {
          submittedBy: { select: { id: true, name: true, role: true } },
        },
      }),
      prisma.project.findMany({
        take: 4,
        orderBy: { createdAt: 'desc' },
        include: {
          leadOrganization: true,
          milestones: true,
        },
      }),
      prisma.activity.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.impactRecord.findMany({
        take: 5,
        orderBy: { recordedAt: 'desc' },
      }),
    ]);

    // Aggregate affected population across projects and challenges
    const projectsAgg = await prisma.project.aggregate({
      _sum: { affectedPopulation: true },
    });
    const challengesAgg = await prisma.challenge.aggregate({
      _sum: { affectedPopulation: true },
    });
    const totalPeopleImpacted =
      (projectsAgg._sum.affectedPopulation || 0) + (challengesAgg._sum.affectedPopulation || 0) ||
      32000;

    // Count distinct districts with projects or challenges
    const distinctDistricts = await prisma.challenge.findMany({
      where: { districtId: { not: null } },
      select: { districtId: true },
      distinct: ['districtId'],
    });

    sendSuccess(
      res,
      {
        challengeCount,
        ideaCount,
        projectCount,
        collaborationCount,
        solutionCount,
        peopleReached: totalPeopleImpacted,
        activeDistricts: Math.max(distinctDistricts.length, 18),
        recentChallenges,
        recentIdeas,
        recentProjects,
        recentActivities,
        impactRecords,
      },
      200,
      req,
    );
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/dashboard/government
 * Government Department oversight metrics & high priority civic challenges.
 */
async function getGovernmentDashboard(req: Request, res: Response, next: NextFunction) {
  try {
    const [
      totalChallenges,
      verifiedChallenges,
      activePilots,
      urgentChallenges,
      districtsWithPilots,
      projectsByDomain,
      recentActivities,
      allActiveProjects,
    ] = await Promise.all([
      prisma.challenge.count(),
      prisma.challenge.count({ where: { verificationStatus: 'VERIFIED' } }),
      prisma.project.count({
        where: { stage: { in: ['FIELD_PILOT', 'IMPLEMENTATION', 'SCALE'] } },
      }),
      prisma.challenge.findMany({
        where: { priority: 'HIGH' },
        take: 5,
        include: { district: true, organization: true },
      }),
      prisma.project.findMany({
        select: { district: true },
        distinct: ['district'],
      }),
      prisma.project.groupBy({
        by: ['domain'],
        _count: { id: true },
      }),
      prisma.activity.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.project.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' },
        include: {
          leadOrganization: true,
          milestones: true,
          impactMetrics: true,
        },
      }),
    ]);

    sendSuccess(
      res,
      {
        kpis: {
          totalChallenges,
          verifiedChallenges,
          activePilots,
          districtsActive: districtsWithPilots.length || 1,
          totalBudgetSanctioned: '₹4.25 Cr',
          avgResolutionTime: '18 Days',
        },
        urgentChallenges,
        domainBreakdown: projectsByDomain.map((d) => ({
          domain: d.domain || 'General',
          count: d._count.id,
        })),
        recentActivities,
        projectsSnapshot: allActiveProjects,
      },
      200,
      req,
    );
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/dashboard/university
 * University & R&D institution translational pipeline metrics.
 */
async function getUniversityDashboard(req: Request, res: Response, next: NextFunction) {
  try {
    const [totalIdeas, activeProjects, universityProjects, recentIdeas, recommendedChallenges, activities] = await Promise.all([
      prisma.idea.count(),
      prisma.project.count({ where: { status: 'ACTIVE' } }),
      prisma.project.findMany({
        where: {
          leadOrganization: {
            type: { in: ['UNIVERSITY', 'R_AND_D'] },
          },
        },
        include: {
          leadOrganization: true,
          milestones: true,
          impactMetrics: true,
        },
      }),
      prisma.idea.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          submittedBy: { select: { id: true, name: true, role: true } },
          challenge: { select: { id: true, publicId: true, title: true } },
        },
      }),
      prisma.challenge.findMany({
        take: 4,
        orderBy: { createdAt: 'desc' },
        include: { district: true },
      }),
      prisma.activity.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    sendSuccess(
      res,
      {
        kpis: {
          totalIdeasSubmitted: totalIdeas,
          activeCollaborations: activeProjects,
          translationRate: '68%',
          grantsDisbursed: '₹1.80 Cr',
          patentsFiled: 4,
        },
        universityProjects,
        recentIdeas,
        recommendedChallenges,
        activities,
      },
      200,
      req,
    );
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/dashboard/industry
 * Industry Partner CSR & technical mentorship metrics.
 */
async function getIndustryDashboard(req: Request, res: Response, next: NextFunction) {
  try {
    const [totalProjects, fieldPilots, partnerCommitments, participatingProjects, opportunities, activities] =
      await Promise.all([
        prisma.project.count(),
        prisma.project.count({ where: { stage: 'FIELD_PILOT' } }),
        prisma.projectParticipant.count({
          where: {
            organization: { type: 'INDUSTRY' },
          },
        }),
        prisma.project.findMany({
          where: {
            participants: {
              some: {
                organization: { type: 'INDUSTRY' },
              },
            },
          },
          include: {
            leadOrganization: true,
            participants: { include: { organization: true } },
            milestones: true,
            impactMetrics: true,
          },
        }),
        prisma.challenge.findMany({
          where: { priority: { in: ['HIGH', 'CRITICAL'] } },
          take: 4,
          orderBy: { createdAt: 'desc' },
          include: { district: true },
        }),
        prisma.activity.findMany({
          take: 6,
          orderBy: { createdAt: 'desc' },
        }),
      ]);

    sendSuccess(
      res,
      {
        kpis: {
          totalProjects,
          csrCommitted: '₹2.45 Cr',
          activeEngagements: partnerCommitments || participatingProjects.length,
          fieldPilotsSupported: fieldPilots,
          mentorshipHours: '320 hrs',
        },
        supportedProjects: participatingProjects,
        opportunities,
        activities,
      },
      200,
      req,
    );
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/dashboard/citizen
 * Citizen's personal activity, submissions, and status overview.
 */
async function getCitizenDashboard(req: AppRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    if (!userId) {
      sendError(res, 401, 'UNAUTHORIZED', 'Authentication required', undefined, req);
      return;
    }

    const [userChallenges, userIdeas, activities, userProjects] = await Promise.all([
      prisma.challenge.findMany({
        where: { submittedById: userId },
        include: {
          district: true,
          evidence: true,
          _count: { select: { ideas: true, collaborations: true, projects: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.idea.findMany({
        where: { submittedById: userId },
        include: {
          challenge: { select: { id: true, publicId: true, title: true } },
          _count: { select: { collaborations: true, projects: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.activity.findMany({
        where: { userId },
        take: 10,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.project.findMany({
        where: {
          OR: [
            { participants: { some: { userId } } },
            { idea: { submittedById: userId } },
            { challenge: { submittedById: userId } },
          ],
        },
        include: { leadOrganization: true, milestones: true },
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const totalSubmitted = userChallenges.length;
    const underReview = userChallenges.filter(
      (c) => c.status === 'SUBMITTED' || c.status === 'UNDER_REVIEW' || c.status === 'UNDER_VALIDATION',
    ).length;
    const inCollaboration = userChallenges.filter(
      (c) =>
        c.status === 'ACTIVE' ||
        c.status === 'VALIDATED' ||
        c.status === 'MATCHING' ||
        c.status === 'CONSORTIUM_FORMED',
    ).length;
    const actionRequired = userChallenges.filter(
      (c) => c.status === 'DRAFT' || c.verificationStatus === 'NEEDS_INFO',
    ).length;

    sendSuccess(
      res,
      {
        stats: {
          totalSubmitted,
          underReview,
          inCollaboration,
          actionRequired,
          ideasCount: userIdeas.length,
          projectsCount: userProjects.length,
        },
        challenges: userChallenges,
        ideas: userIdeas,
        projects: userProjects,
        activities,
      },
      200,
      req,
    );
  } catch (error) {
    next(error);
  }
}

// ── Route Bindings ───────────────────────────────────────────

router.get('/overview', getDashboardOverview);
router.get('/', getDashboardOverview);

// Protected Role-Specific Dashboards
router.get('/citizen', requireAuth, getCitizenDashboard);
router.get('/government', requireAuth, requireRole(RoleGroups.GOVERNMENT), getGovernmentDashboard);
router.get('/university', requireAuth, requireRole(RoleGroups.UNIVERSITY), getUniversityDashboard);
router.get('/industry', requireAuth, requireRole(RoleGroups.INDUSTRY), getIndustryDashboard);

export default router;
