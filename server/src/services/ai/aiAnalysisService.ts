import {
  AnalyzeChallengeInput,
  AnalyzeChallengeResult,
  analyzeChallengeMock,
} from './providers/mockProvider.js';
import { analyzeChallengeOpenAI } from './providers/openaiProvider.js';

export type { AnalyzeChallengeInput, AnalyzeChallengeResult };

/**
 * Service facade for civic challenge intelligence analysis.
 * Automatically selects configured AI provider or fallback rule-based analyzer.
 */
export async function analyzeChallenge(
  input: AnalyzeChallengeInput,
): Promise<AnalyzeChallengeResult> {
  const hasApiKey = Boolean(process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY);

  if (hasApiKey) {
    try {
      return await analyzeChallengeOpenAI(input);
    } catch (err) {
      console.warn('AI provider failed, executing deterministic mock analysis:', err);
      return analyzeChallengeMock(input);
    }
  }

  return analyzeChallengeMock(input);
}

export const aiAnalysisService = {
  analyzeChallenge,
};
