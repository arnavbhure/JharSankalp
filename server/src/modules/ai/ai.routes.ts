import { Router } from 'express';
import { analyzeChallenge } from '../../ai/services/challengeAnalysis.service.js';
import { handleAiError } from '../../ai/utils/aiErrorHandler.js';
import { sendSuccess, sendError } from '../../utils/response.js';

const router = Router();

/**
 * POST /api/ai/analyze-challenge
 * Analyzes a civic challenge submission through LangChain + LangGraph structured intelligence.
 */
router.post('/analyze-challenge', async (req, res) => {
  try {
    const { title, description, district, location, affectedPopulation } = req.body;

    if (!title || typeof title !== 'string' || title.trim().length < 3) {
      sendError(res, 400, 'INVALID_INPUT', 'Challenge title must be at least 3 characters long', undefined, req);
      return;
    }

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      sendError(res, 400, 'INVALID_INPUT', 'Challenge description must be at least 10 characters long', undefined, req);
      return;
    }

    const analysis = await analyzeChallenge({
      title: title.trim(),
      description: description.trim(),
      district: typeof district === 'string' ? district.trim() : undefined,
      location: typeof location === 'string' ? location.trim() : undefined,
      affectedPopulation: typeof affectedPopulation === 'number' ? affectedPopulation : undefined,
    });

    sendSuccess(res, analysis, 200, req);
  } catch (error) {
    handleAiError(error, res, req);
  }
});

export default router;
