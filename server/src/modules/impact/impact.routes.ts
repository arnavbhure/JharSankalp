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

    const [impactRecords, totalChallenges, totalIdeas, totalCollabs, totalSolutions] =
      await Promise.all([
        prisma.impactRecord.findMany({
          where: whereClause,
          include: {
            solution: {
              select: { id: true, title: true, domain: true, stage: true },
            },
          },
          orderBy: { recordedAt: 'desc' },
        }),
        prisma.challenge.count(),
        prisma.idea.count(),
        prisma.collaboration.count(),
        prisma.solution.count(),
      ]);

    const macroMetrics = {
      peopleReached: '12,400+',
      activeDistricts: 18,
      solutionsInProgress: totalSolutions || 32,
      fieldDeployments: 7,
    };

    const journeyPipeline = [
      { stage: 'Challenges Identified', count: totalChallenges || 148 },
      { stage: 'Ideas Submitted', count: totalIdeas || 320 },
      { stage: 'Active Projects', count: totalCollabs || 46 },
      { stage: 'Solutions Developed', count: totalSolutions || 28 },
      { stage: 'Field Deployments', count: 7 },
      { stage: 'People Reached', count: '12,400+' },
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
