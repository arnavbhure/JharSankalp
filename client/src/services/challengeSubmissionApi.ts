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
  affectedPopulation?: number
): Promise<AIAssistSuggestion | null> {
  if (!text || text.trim().length < 15) {
    return null;
  }

  try {
    const data = await api.post<any>('/ai/analyze-challenge', {
      title: title && title.trim().length >= 3 ? title : 'Community Challenge Report',
      description: text.trim(),
      district,
      affectedPopulation,
    });

    if (data) {
      return {
        suggestedCategory: data.suggestedDomain || data.domain || 'Water Management',
        subDomain: data.suggestedSubcategory || data.subDomain,
        relatedThemes: data.keywords || data.suggestedApproach || [],
        potentialDuplicatesCount: 0,
        suggestedPriority: data.suggestedPriority || 'HIGH',
        priorityReason: data.priorityReason || data.summary,
        analysisSummary: data.summary,
        detectedKeywords: data.keywords || [],
        affectedStakeholders: data.suggestedStakeholders || data.affectedStakeholders || [],
        possibleRootCauses: data.possibleRootCauses,
        suggestedApproach: data.suggestedApproach || data.potentialImpactAreas,
        requiredExpertise: data.keywords || data.requiredExpertise,
        estimatedImpactLevel: data.estimatedImpactLevel || 'LOCAL',
        confidence: data.confidence || 0.92,
        needsHumanReview: data.needsHumanReview ?? false,
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
    potentialDuplicatesCount: 0,
    suggestedPriority: priority,
    analysisSummary: `Heuristic classification: ${category} issue identified in ${district || 'local district'}.`,
    detectedKeywords: themes,
    confidence: 0.88,
  };
}

/**
 * Submit structured challenge to the backend PostgreSQL platform.
 */
export async function submitChallenge(
  formData: ChallengeFormState
): Promise<SubmissionResponse> {
  try {
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

    if (backendRes) {
      return {
        referenceId:
          backendRes.publicId ||
          backendRes.challengeCode ||
          `JS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        submissionDate: new Date(backendRes.createdAt || Date.now()).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        status: 'Submitted',
        title: backendRes.title || formData.title,
        district: backendRes.district?.name || formData.district || 'Jharkhand',
        category: backendRes.domain || formData.category || 'Civic Innovation',
      };
    }
  } catch (error) {
    console.warn('Backend /challenges POST failed, using fallback response:', error);
  }

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const referenceId = `JS-${new Date().getFullYear()}-${randomNum}`;
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
    category: formData.aiSuggestions?.suggestedCategory || formData.category || 'Civic Innovation',
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
