import { Router } from 'express';
import { analyzeChallenge } from '../../services/ai/aiAnalysisService.js';
import { sendSuccess, sendError } from '../../utils/response.js';

const router = Router();

/**
 * POST /api/ai/analyze-challenge
 * Analyzes a civic challenge submission with AI-assisted problem structuring.
 */
router.post('/analyze-challenge', async (req, res, next) => {
  try {
    const { title, description, district, affectedPopulation } = req.body;

    if (!title || typeof title !== 'string' || title.trim().length < 3) {
      sendError(
        res,
        400,
        'INVALID_INPUT',
        'Challenge title must be at least 3 characters long',
        undefined,
        req,
      );
      return;
    }

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      sendError(
        res,
        400,
        'INVALID_INPUT',
        'Challenge description must be at least 10 characters long',
        undefined,
        req,
      );
      return;
    }

    const analysis = await analyzeChallenge({
      title: title.trim(),
      description: description.trim(),
      district: typeof district === 'string' ? district.trim() : undefined,
      affectedPopulation: typeof affectedPopulation === 'number' ? affectedPopulation : undefined,
    });

    sendSuccess(res, analysis, 200, req);
  } catch (error) {
    next(error);
  }
});

export default router;
