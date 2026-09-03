import {
  IdeaSubmissionFormData,
  IdeaSubmissionResult,
  SelectedChallenge,
} from '../types/ideaSubmission';
import { fetchChallenges } from './api/challenges';

const DRAFT_STORAGE_KEY = 'jharsankalp_idea_draft_v1';
const SUBMITTED_STORAGE_KEY = 'jharsankalp_submitted_ideas_v1';

export const SEED_CHALLENGES: SelectedChallenge[] = [
  {
    id: 'JS-2026-00024',
    title: 'Frequent Breakdown of Drinking Water Handpumps in Murhu Block',
    category: 'Water Management',
    district: 'Khunti',
    block: 'Murhu',
    priority: 'High',
    affectedPopulation: '2,000+ Residents',
  },
  {
    id: 'JS-2026-00019',
    title: 'Post-Harvest Storage & Soil Degradation in Tribal Belts',
    category: 'Agriculture',
    district: 'Gumla',
    block: 'Bishunpur',
    priority: 'High',
    affectedPopulation: '3,200+ Farmers',
  },
  {
    id: 'JS-2024-00003',
    title: 'Early Detection of Ground Subsidence & Mine Inundation in Jharia',
    category: 'Mining Safety',
    district: 'Dhanbad',
    block: 'Jharia',
    priority: 'Critical',
    affectedPopulation: '1,200+ Residents',
  },
];

export async function searchChallenges(
  query: string,
  filters?: { domain?: string; district?: string; priority?: string }
): Promise<SelectedChallenge[]> {
  try {
    const rawChallenges = await fetchChallenges({
      domain: filters?.domain,
      district: filters?.district,
    });

    let results: SelectedChallenge[] = (rawChallenges || []).map((c) => ({
      id: c.id,
      title: c.title,
      category: c.category,
      district: c.district,
      block: c.block,
      priority:
        c.impactLevel === 'Critical'
          ? 'Critical'
          : c.impactLevel === 'High Impact'
          ? 'High'
          : 'Medium',
      affectedPopulation:
        c.metrics?.find(
          (m) =>
            m.label.toLowerCase().includes('population') ||
            m.label.toLowerCase().includes('affected')
        )?.value || '2,000+ Residents',
    }));

    if (results.length === 0) {
      results = [...SEED_CHALLENGES];
    }

    if (query && query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.district.toLowerCase().includes(q) ||
          (c.block && c.block.toLowerCase().includes(q)) ||
          c.id.toLowerCase().includes(q)
      );
    }

    if (filters?.priority && filters.priority !== 'All Priorities') {
      results = results.filter(
        (c) => c.priority.toLowerCase() === filters.priority!.toLowerCase()
      );
    }

    return results;
  } catch (error) {
    console.warn('Unable to query challenges API in idea submission:', error);
    return SEED_CHALLENGES;
  }
}

export function saveDraft(data: Partial<IdeaSubmissionFormData>): void {
  try {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save idea draft', err);
  }
}

export function loadDraft(): Partial<IdeaSubmissionFormData> | null {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear idea draft', err);
  }
}

export async function submitIdea(
  data: IdeaSubmissionFormData
): Promise<IdeaSubmissionResult> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const referenceId = `JS-IDEA-${new Date().getFullYear()}-${String(
    Math.floor(1000 + Math.random() * 9000)
  )}`;

  const result: IdeaSubmissionResult = {
    referenceId,
    title: data.title,
    challengeTitle: data.challenge?.title || 'Grassroots Innovation',
    submittedDate: new Date().toISOString(),
    status: 'SUBMITTED_FOR_REVIEW',
  };

  try {
    const existingRaw = localStorage.getItem(SUBMITTED_STORAGE_KEY);
    const existingList: IdeaSubmissionResult[] = existingRaw
      ? JSON.parse(existingRaw)
      : [];
    existingList.unshift(result);
    localStorage.setItem(SUBMITTED_STORAGE_KEY, JSON.stringify(existingList));
  } catch (err) {
    console.error('Failed to persist submitted idea', err);
  }

  clearDraft();
  return result;
}

export function getSubmittedIdeas(): IdeaSubmissionResult[] {
  try {
    const raw = localStorage.getItem(SUBMITTED_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const getMySubmittedIdeas = getSubmittedIdeas;
