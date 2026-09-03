import { api } from '../api';

export interface ChallengeAnalysisRequest {
  title: string;
  description: string;
  district?: string;
  location?: string;
  affectedPopulation?: number;
}

export interface ChallengeAnalysisResponse {
  summary: string;
  domain: string;
  subDomain: string | null;
  suggestedPriority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  priorityReason: string;
  problemType: string;
  affectedStakeholders: string[];
  possibleRootCauses: string[];
  suggestedApproach: string[];
  requiredExpertise: string[];
  estimatedImpactLevel: 'LOCAL' | 'DISTRICT' | 'STATE';
  confidence: number;
  needsHumanReview: boolean;
}

export async function requestChallengeAnalysis(
  payload: ChallengeAnalysisRequest
): Promise<ChallengeAnalysisResponse> {
  return await api.post<ChallengeAnalysisResponse>('/ai/analyze-challenge', payload);
}
