import {
  ChallengeAnalysis,
  ChallengeInput,
  ChallengeInputSchema,
} from '../schemas/challengeAnalysis.schema.js';
import { buildChallengeAnalysisGraph } from '../graphs/challengeAnalysis.graph.js';

const graph = buildChallengeAnalysisGraph();

/**
 * Service function to analyze a challenge through the LangGraph intelligence pipeline.
 */
export async function analyzeChallenge(input: ChallengeInput): Promise<ChallengeAnalysis> {
  // 1. Validate Input
  const validatedInput = ChallengeInputSchema.parse(input);

  // 2. Invoke LangGraph workflow
  const result = await graph.invoke({
    title: validatedInput.title,
    description: validatedInput.description,
    district: validatedInput.district,
    location: validatedInput.location,
    affectedPopulation: validatedInput.affectedPopulation,
  });

  if (!result.analysis) {
    throw new Error('AI Analysis pipeline did not generate an analysis output.');
  }

  return result.analysis;
}
