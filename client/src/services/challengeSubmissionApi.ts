import { ChallengeFormState, AIAssistSuggestion, SubmissionResponse } from '../types/submission';
import { requestChallengeAnalysis } from './api/ai';

const LOCAL_STORAGE_KEY = 'jharsankalp_challenge_draft_v1';

/**
 * Executes structured challenge intelligence analysis through LangChain / OpenRouter API.
 */
export async function analyzeDescription(
  text: string,
  title?: string,
  district?: string,
  affectedPopulation?: number
): Promise<AIAssistSuggestion | null> {
  if (!text || text.trim().length < 15) {
    return null;
  }

  try {
    const res = await requestChallengeAnalysis({
      title: title && title.trim().length >= 3 ? title : 'Community Challenge Report',
      description: text.trim(),
      district,
      affectedPopulation,
    });

    if (res) {
      return {
        suggestedCategory: res.domain,
        subDomain: res.subDomain,
        relatedThemes: res.suggestedApproach,
        potentialDuplicatesCount: 0,
        suggestedPriority: res.suggestedPriority,
        priorityReason: res.priorityReason,
        analysisSummary: res.summary,
        detectedKeywords: res.requiredExpertise,
        affectedStakeholders: res.affectedStakeholders,
        possibleRootCauses: res.possibleRootCauses,
        suggestedApproach: res.suggestedApproach,
        requiredExpertise: res.requiredExpertise,
        estimatedImpactLevel: res.estimatedImpactLevel,
        confidence: res.confidence,
        needsHumanReview: res.needsHumanReview,
      };
    }
  } catch (err) {
    console.warn('Backend AI analysis endpoint unavailable, using local heuristic:', err);
  }

  const lower = text.toLowerCase();
  let category = 'Water Management';
  let themes = ['Rural Water Infrastructure', 'LoRaWAN Telemetry'];
  let priority = 'HIGH';

  if (lower.includes('crop') || lower.includes('soil') || lower.includes('farmer')) {
    category = 'Agriculture';
    themes = ['Soil Health Monitoring', 'Agronomy'];
    priority = 'HIGH';
  } else if (lower.includes('mine') || lower.includes('subsidence')) {
    category = 'Mining Safety';
    themes = ['Mine Subsidence Early Warning', 'InSAR Geophysics'];
    priority = 'CRITICAL';
  } else if (lower.includes('school') || lower.includes('student')) {
    category = 'Education';
    themes = ['Vernacular Primary EdTech', 'Offline Mesh'];
    priority = 'MEDIUM';
  }

  return {
    suggestedCategory: category,
    relatedThemes: themes,
    potentialDuplicatesCount: 1,
    suggestedPriority: priority,
    analysisSummary: `Heuristic classification: ${category} issue identified in local district.`,
    detectedKeywords: themes,
  };
}

/**
 * Submit structured challenge to the backend platform.
 * Replaceable with POST /api/challenges.
 */
export async function submitChallenge(
  formData: ChallengeFormState
): Promise<SubmissionResponse> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const referenceId = `JS-2026-${randomNum}`;

  // Clear local draft upon successful submission
  clearDraftLocal();

  return {
    referenceId,
    submissionDate: new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    status: 'Submitted',
    title: formData.title || 'Untitled Community Challenge',
    district: formData.district || 'Jharkhand',
    category: formData.aiSuggestions?.suggestedCategory || 'Civic Innovation',
  };
}

/**
 * Local Draft Storage Helpers
 */
export function saveDraftLocal(data: Partial<ChallengeFormState>): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save draft in localStorage', err);
  }
}

export function loadDraftLocal(): Partial<ChallengeFormState> | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearDraftLocal(): void {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch {
    // Ignore error
  }
}
