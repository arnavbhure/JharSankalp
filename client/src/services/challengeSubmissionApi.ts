import { ChallengeFormState, AIAssistSuggestion, SubmissionResponse } from '../types/submission';
import { api } from './api';

const LOCAL_STORAGE_KEY = 'jharsankalp_challenge_draft_v1';

/**
 * Executes structured challenge intelligence analysis through backend AI analysis API.
 */
export async function analyzeDescription(
  text: string,
  title?: string,
  district?: string,
  affectedPopulation?: number,
  category?: string,
): Promise<AIAssistSuggestion | null> {
  if (!text || text.trim().length < 15) {
    return null;
  }

  const data = await api.post<any>('/ai/analyze-challenge', {
    title: title && title.trim().length >= 3 ? title.trim() : 'Community Challenge Report',
    description: text.trim(),
    district,
    affectedPopulation,
    category,
  });

  if (!data) {
    throw new Error('AI analysis service returned an empty response.');
  }

  const domain = data.suggestedDomain || data.domain || data.suggestedCategory || 'General';
  const subdomain =
    data.suggestedSubdomain || data.suggestedSubcategory || data.subDomain || 'Civic Issue';
  const priority = data.priority || data.suggestedPriority || 'Medium';
  const summary = data.summary || data.analysisSummary || text.slice(0, 150);
  const priorityReason = data.priorityReason || summary;
  const impactAssessment =
    data.impactAssessment || 'Community impact to be evaluated during administrative review.';
  const reviewRecommendation =
    data.reviewRecommendation ||
    `Submit to ${domain} innovation committee for priority review.`;
  const innovationDirections: string[] =
    Array.isArray(data.innovationDirections) && data.innovationDirections.length > 0
      ? data.innovationDirections
      : Array.isArray(data.suggestedApproach)
        ? data.suggestedApproach
        : [];
  const technologies: string[] =
    Array.isArray(data.technologies) && data.technologies.length > 0
      ? data.technologies
      : Array.isArray(data.requiredExpertise)
        ? data.requiredExpertise
        : [];
  const keywords: string[] =
    Array.isArray(data.keywords) && data.keywords.length > 0
      ? data.keywords
      : Array.isArray(data.detectedKeywords)
        ? data.detectedKeywords
        : [domain];

  return {
    summary,
    suggestedDomain: domain,
    suggestedSubdomain: subdomain,
    priority,
    priorityReason,
    impactAssessment,
    reviewRecommendation,
    innovationDirections,
    technologies,
    keywords,

    // Compatibility fields
    suggestedCategory: domain,
    subDomain: subdomain,
    relatedThemes: keywords,
    potentialDuplicatesCount: 0,
    suggestedPriority: typeof priority === 'string' ? priority.toUpperCase() : 'MEDIUM',
    analysisSummary: summary,
    detectedKeywords: keywords,
    affectedStakeholders:
      data.suggestedStakeholders || data.affectedStakeholders || [`${domain} Department`],
    possibleRootCauses: data.possibleRootCauses,
    suggestedApproach: innovationDirections,
    requiredExpertise: technologies,
    estimatedImpactLevel: data.estimatedImpactLevel || 'LOCAL',
    confidence: typeof data.confidence === 'number' ? data.confidence : 0.92,
    needsHumanReview: data.needsHumanReview ?? (priority === 'Critical' || priority === 'CRITICAL'),
  };
}

/**
 * Submit structured challenge to the backend PostgreSQL platform.
 */
export async function submitChallenge(formData: ChallengeFormState): Promise<SubmissionResponse> {
  const backendRes = await api.post<any>('/challenges', {
    title: formData.title,
    description: formData.description,
    domain:
      formData.category && formData.category !== 'Not sure — Help me identify it'
        ? formData.category
        : formData.aiSuggestions?.suggestedCategory || 'General',
    subdomain: formData.aiSuggestions?.subDomain,
    district: formData.district,
    block: formData.block,
    villageOrWard: formData.villageOrWard,
    affectedPopulation: formData.estimatedPeople,
    urgency: formData.urgency || formData.severity,
    severity: formData.severity,
    evidenceFiles: formData.evidenceFiles,
    aiSuggestions: formData.aiSuggestions,
    sourceType: 'CITIZEN',
  });

  clearDraftLocal();

  if (!backendRes) {
    throw new Error('Failed to record challenge in database.');
  }

  return {
    referenceId:
      backendRes.publicId ||
      backendRes.challengeCode ||
      backendRes.id,
    submissionDate: new Date(backendRes.createdAt || Date.now()).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    status: backendRes.status || 'Submitted',
    title: backendRes.title || formData.title,
    district: backendRes.district?.name || formData.district || 'Jharkhand',
    category: backendRes.domain || formData.category || 'Civic Innovation',
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
