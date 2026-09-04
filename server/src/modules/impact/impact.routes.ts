import { Router } from 'express';
import { prisma } from '../../config/database.js';
import { sendSuccess } from '../../utils/response.js';

const router = Router();

/**
 * GET /api/impact
 * Retrieve platform-wide verified impact analytics and district distributions.
 */
router.get('/', async (req, res, next) => {
  try {
    const { district, domain } = req.query;

    const whereClause: Record<string, unknown> = {};
    if (district && typeof district === 'string' && district !== 'All Districts') {
      whereClause.district = { equals: district, mode: 'insensitive' };
    }
    if (domain && typeof domain === 'string' && domain !== 'All Focus Areas') {
      whereClause.domain = { equals: domain, mode: 'insensitive' };
    }

    const [
      impactRecords,
      totalChallenges,
      totalIdeas,
      totalCollabs,
      totalSolutions,
      fieldDeploymentsCount,
      projectsAgg,
      challengesAgg,
      distinctDistricts,
    ] = await Promise.all([
      prisma.impactRecord.findMany({
        where: whereClause,
        include: {
          solution: {
            select: { id: true, title: true, domain: true, stage: true },
          },
        },
        orderBy: { recordedAt: 'desc' },
      }),
      prisma.challenge.count({ where: whereClause }),
      prisma.idea.count(),
      prisma.collaboration.count(),
      prisma.solution.count(),
      prisma.project.count({
        where: { stage: { in: ['FIELD_PILOT', 'IMPLEMENTATION', 'SCALE'] } },
      }),
      prisma.project.aggregate({
        _sum: { affectedPopulation: true },
      }),
      prisma.challenge.aggregate({
        _sum: { affectedPopulation: true },
      }),
      prisma.challenge.findMany({
        where: { districtId: { not: null } },
        select: { districtId: true },
        distinct: ['districtId'],
      }),
    ]);

    const totalPeople =
      (projectsAgg._sum.affectedPopulation || 0) + (challengesAgg._sum.affectedPopulation || 0);
    const peopleReachedFormatted =
      totalPeople > 0 ? `${totalPeople.toLocaleString()}+` : '0';

    const macroMetrics = {
      peopleReached: peopleReachedFormatted,
      activeDistricts: distinctDistricts.length || 1,
      solutionsInProgress: totalSolutions,
      fieldDeployments: fieldDeploymentsCount,
    };

    const journeyPipeline = [
      { stage: 'Challenges Identified', count: totalChallenges },
      { stage: 'Ideas Submitted', count: totalIdeas },
      { stage: 'Active Projects', count: totalCollabs },
      { stage: 'Solutions Developed', count: totalSolutions },
      { stage: 'Field Deployments', count: fieldDeploymentsCount },
      { stage: 'People Reached', count: peopleReachedFormatted },
    ];

    sendSuccess(
      res,
      {
        macroMetrics,
        journeyPipeline,
        records: impactRecords,
      },
      200,
      req,
    );
  } catch (error) {
    next(error);
  }
});

export default router;
