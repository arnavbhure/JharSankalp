import {
  IdeaSubmissionFormData,
  IdeaSubmissionResult,
  SelectedChallenge,
} from '../types/ideaSubmission';
import { CHALLENGES_DATA } from '../data/challengesData';

const DRAFT_STORAGE_KEY = 'jharsankalp_idea_draft_v1';
const SUBMITTED_STORAGE_KEY = 'jharsankalp_submitted_ideas_v1';

// Formatted challenge records ready for selection
export const SEED_CHALLENGES: SelectedChallenge[] = [
  {
    id: 'JS-2026-00024',
    title: 'Frequent Breakdown of Drinking Water Pumps in Murhu Block',
    category: 'Water Management',
    district: 'Khunti',
    block: 'Murhu Block',
    priority: 'High',
    affectedPopulation: '2,000+ Residents',
  },
  {
    id: 'JS-2024-00002',
    title: 'Post-Harvest Crop Loss Among Small Farmers',
    category: 'Agriculture',
    district: 'Gumla',
    block: 'Bishunpur Block',
    priority: 'Medium',
    affectedPopulation: '1,500+ Farmers',
  },
  {
    id: 'JS-2024-00003',
    title: 'Early Detection of Ground Subsidence in Mining Areas',
    category: 'Mining Safety',
    district: 'Dhanbad',
    block: 'Jharia Coalfield',
    priority: 'Critical',
    affectedPopulation: '8,000+ Residents',
  },
  {
    id: 'JS-2026-00017',
    title: 'Poor Mobile Connectivity in Remote Villages',
    category: 'Digital Infrastructure',
    district: 'West Singhbhum',
    block: 'Manoharpur Block',
    priority: 'High',
    affectedPopulation: '4,200+ Villagers',
  },
  {
    id: 'JS-2025-00182',
    title: 'Unsafe Waste Disposal Near Residential Areas',
    category: 'Environment',
    district: 'Ranchi',
    block: 'Namkum Ward',
    priority: 'Medium',
    affectedPopulation: '12,000+ Urban Residents',
  },
  {
    id: 'JS-2024-00001',
    title: 'Groundwater Fluoride Toxicity in Rural Hamlets',
    category: 'Water Management',
    district: 'Palamu',
    block: 'Satbarwa Block',
    priority: 'Critical',
    affectedPopulation: '3,800+ Villagers',
  },
  ...CHALLENGES_DATA.map((c) => ({
    id: c.id,
    title: c.title,
    category: c.category,
    district: c.district,
    block: c.block,
    priority:
      c.impactLevel === 'Critical'
        ? ('Critical' as const)
        : c.impactLevel === 'High Impact'
        ? ('High' as const)
        : ('Medium' as const),
    affectedPopulation:
      c.metrics?.find(
        (m) =>
          m.label.toLowerCase().includes('population') ||
          m.label.toLowerCase().includes('affected')
      )?.value || '1,000+ Residents',
  })),
];

// De-duplicate by ID
const UNIQUE_CHALLENGES = Array.from(
  new Map(SEED_CHALLENGES.map((item) => [item.id, item])).values()
);

export async function searchChallenges(
  query: string,
  filters?: { domain?: string; district?: string; priority?: string }
): Promise<SelectedChallenge[]> {
  await new Promise((resolve) => setTimeout(resolve, 80));

  let results = [...UNIQUE_CHALLENGES];

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

  if (filters?.domain && filters.domain !== 'All Domains') {
    results = results.filter(
      (c) => c.category.toLowerCase() === filters.domain!.toLowerCase()
    );
  }

  if (filters?.district && filters.district !== 'All Districts') {
    results = results.filter(
      (c) => c.district.toLowerCase() === filters.district!.toLowerCase()
    );
  }

  if (filters?.priority && filters.priority !== 'All Priorities') {
    results = results.filter(
      (c) => c.priority.toLowerCase() === filters.priority!.toLowerCase()
    );
  }

  return results;
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

  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const refId = `IDEA-2026-${randomDigits}`;

  const result: IdeaSubmissionResult = {
    referenceId: refId,
    title: data.title,
    challengeTitle: data.challenge?.title || 'Community Societal Challenge',
    submittedDate: new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    status: 'SUBMITTED_FOR_REVIEW',
  };

  // Save to list of user's submitted ideas in localStorage
  try {
    const existing = JSON.parse(localStorage.getItem(SUBMITTED_STORAGE_KEY) || '[]');
    localStorage.setItem(
      SUBMITTED_STORAGE_KEY,
      JSON.stringify([
        {
          ...result,
          formData: data,
        },
        ...existing,
      ])
    );
    clearDraft();
  } catch (err) {
    console.error('Failed to persist submitted idea', err);
  }

  return result;
}

export function getMySubmittedIdeas() {
  try {
    return JSON.parse(localStorage.getItem(SUBMITTED_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}
