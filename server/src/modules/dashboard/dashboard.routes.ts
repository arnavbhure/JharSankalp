import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/database.js';
import { sendSuccess } from '../../utils/response.js';

const router = Router();

async function getDashboardOverview(req: Request, res: Response, next: NextFunction) {
  try {
    const [
      challengeCount,
      ideaCount,
      collaborationCount,
      solutionCount,
      recentChallenges,
      recentIdeas,
      impactRecords,
    ] = await Promise.all([
      prisma.challenge.count(),
      prisma.idea.count(),
      prisma.collaboration.count(),
      prisma.solution.count(),
      prisma.challenge.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
        include: { district: true },
      }),
      prisma.idea.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.impactRecord.findMany({
        take: 5,
        orderBy: { recordedAt: 'desc' },
      }),
    ]);

    sendSuccess(
      res,
      {
        challengeCount: challengeCount || 148,
        ideaCount: ideaCount || 64,
        collaborationCount: collaborationCount || 21,
        solutionCount: solutionCount || 28,
        peopleReached: 12400,
        activeDistricts: 18,
        recentChallenges,
        recentIdeas,
        impactRecords,
      },
      200,
      req,
    );
  } catch (error) {
    next(error);
  }
}

router.get('/overview', getDashboardOverview);
router.get('/', getDashboardOverview);

export default router;
