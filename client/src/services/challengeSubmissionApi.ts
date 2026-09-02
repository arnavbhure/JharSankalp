import { ChallengeFormState, AIAssistSuggestion, SubmissionResponse } from '../types/submission';

const LOCAL_STORAGE_KEY = 'jharsankalp_challenge_draft_v1';

/**
 * Intelligent client-side AI analysis simulation.
 * Structures the raw problem description into themes, categories, and duplicate checks.
 * Easily replaceable with backend POST /api/ai/analyze-challenge.
 */
export async function analyzeDescription(text: string): Promise<AIAssistSuggestion | null> {
  if (!text || text.trim().length < 20) {
    return null;
  }

  // Artificial slight pause to give authentic assistance feel
  await new Promise((resolve) => setTimeout(resolve, 350));

  const lower = text.toLowerCase();

  let category = 'Public Infrastructure';
  let themes = ['Community Welfare', 'Civic Facilities'];
  let priority = 'Important';

  if (
    lower.includes('water') ||
    lower.includes('pump') ||
    lower.includes('borewell') ||
    lower.includes('drinking') ||
    lower.includes('well') ||
    lower.includes('aquifer') ||
    lower.includes('drought')
  ) {
    category = 'Water Management';
    themes = ['Public Infrastructure', 'Rural Development', 'Groundwater Security'];
    priority = 'High';
  } else if (
    lower.includes('crop') ||
    lower.includes('farm') ||
    lower.includes('harvest') ||
    lower.includes('soil') ||
    lower.includes('seed') ||
    lower.includes('grain')
  ) {
    category = 'Agriculture';
    themes = ['Agritech Solutions', 'Smallholder Support', 'Post-Harvest Supply'];
    priority = 'Important';
  } else if (
    lower.includes('mine') ||
    lower.includes('mining') ||
    lower.includes('subsidence') ||
    lower.includes('coal') ||
    lower.includes('quarry') ||
    lower.includes('blast')
  ) {
    category = 'Mining Safety';
    themes = ['Geotechnical Risk', 'Disaster Mitigation', 'Public Safety'];
    priority = 'Critical';
  } else if (
    lower.includes('school') ||
    lower.includes('student') ||
    lower.includes('teacher') ||
    lower.includes('education') ||
    lower.includes('book') ||
    lower.includes('learning')
  ) {
    category = 'Education';
    themes = ['Digital Literacy', 'Vernacular Learning', 'Tribal Education'];
    priority = 'Important';
  } else if (
    lower.includes('health') ||
    lower.includes('doctor') ||
    lower.includes('clinic') ||
    lower.includes('hospital') ||
    lower.includes('medicine') ||
    lower.includes('nurse')
  ) {
    category = 'Healthcare';
    themes = ['Primary Care Access', 'Telemedicine', 'Rural Health Infrastructure'];
    priority = 'High';
  } else if (
    lower.includes('waste') ||
    lower.includes('garbage') ||
    lower.includes('pollution') ||
    lower.includes('dust') ||
    lower.includes('forest') ||
    lower.includes('river')
  ) {
    category = 'Environment';
    themes = ['Urban Waste Ecology', 'Ecosystem Conservation', 'Pollution Control'];
    priority = 'Important';
  }

  const detectedKeywords = lower
    .split(/\s+/)
    .filter((w) => w.length > 4)
    .slice(0, 4);

  return {
    suggestedCategory: category,
    relatedThemes: themes,
    potentialDuplicatesCount: 2,
    suggestedPriority: priority,
    analysisSummary: `Based on your description, this issue primarily concerns ${category} with secondary intersections in ${themes.slice(0, 2).join(' and ')}.`,
    detectedKeywords,
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
