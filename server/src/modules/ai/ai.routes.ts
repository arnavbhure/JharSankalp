import { Router } from 'express';
import { analyzeChallenge } from '../../services/ai/aiAnalysisService.js';
import { sendSuccess, sendError } from '../../utils/response.js';

const router = Router();

/**
 * POST /api/ai/analyze-challenge
 * Analyzes a civic challenge submission with AI-assisted problem structuring.
 */
router.post('/analyze-challenge', async (req, res) => {
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

    if (title.trim().length > 300) {
      sendError(
        res,
        400,
        'INVALID_INPUT',
        'Challenge title must not exceed 300 characters',
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

    if (description.trim().length > 5000) {
      sendError(
        res,
        400,
        'INVALID_INPUT',
        'Challenge description must not exceed 5000 characters',
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
  } catch (error: any) {
    console.error('AI analysis endpoint error:', error?.message || error);
    sendError(
      res,
      502,
      'AI_SERVICE_ERROR',
      'AI analysis service is temporarily unavailable. Please try again or select category manually.',
      undefined,
      req,
    );
  }
});

export default router;
