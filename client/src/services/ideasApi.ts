import { IdeaItem, IdeaFilterState, IdeaStatsData } from '../types/ideas';
import { IDEAS_DATA, IDEAS_STATS } from '../data/ideasData';

let inMemoryIdeas = [...IDEAS_DATA];

export async function getIdeas(filters?: Partial<IdeaFilterState>): Promise<IdeaItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 150));

  let results = [...inMemoryIdeas];

  if (filters) {
    if (filters.search && filters.search.trim()) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.summary.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          i.district.toLowerCase().includes(q) ||
          i.challengeTitle.toLowerCase().includes(q)
      );
    }

    if (filters.category && filters.category !== 'All Focus Areas') {
      results = results.filter((i) => i.category.toLowerCase() === filters.category!.toLowerCase());
    }

    if (filters.stage && filters.stage !== 'All Stages') {
      results = results.filter((i) => i.stage.toLowerCase() === filters.stage!.toLowerCase());
    }

    if (filters.district && filters.district !== 'All Districts') {
      results = results.filter((i) => i.district.toLowerCase() === filters.district!.toLowerCase());
    }

    if (filters.status && filters.status !== 'All Statuses') {
      results = results.filter((i) => {
        if (filters.status === 'Open for Contributors') return i.collaborationStatus === 'OPEN';
        if (filters.status === 'Team Formed') return i.collaborationStatus === 'TEAM_FORMED';
        if (filters.status === 'Seeking Partners') return i.collaborationStatus === 'SEEKING_PARTNERS';
        if (filters.status === 'Completed') return i.collaborationStatus === 'COMPLETED';
        return true;
      });
    }
  }

  return results;
}

export async function getFeaturedIdea(): Promise<IdeaItem> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const featured = inMemoryIdeas.find((i) => i.isFeatured) || inMemoryIdeas[0];
  return featured;
}

export async function getIdeaById(id: string): Promise<IdeaItem | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const idea = inMemoryIdeas.find((i) => i.id === id);
  return idea || null;
}

export async function getIdeasStats(): Promise<IdeaStatsData> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return { ...IDEAS_STATS };
}

export async function submitIdea(newIdea: Partial<IdeaItem>): Promise<IdeaItem> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const created: IdeaItem = {
    id: `IDEA-2026-${randomNum}`,
    title: newIdea.title || 'Untitled Community Innovation',
    summary: newIdea.summary || '',
    category: newIdea.category || 'Civic Innovation',
    district: newIdea.district || 'Ranchi',
    challengeId: newIdea.challengeId || 'JS-2026-00024',
    challengeTitle: newIdea.challengeTitle || 'Rural Water Infrastructure Reliability',
    stage: 'CONCEPT',
    collaborationStatus: 'OPEN',
    statusLabel: 'OPEN FOR CONTRIBUTORS',
    submittedDate: 'Today',
    likesCount: 1,
    contributors: [
      {
        id: 'u-self',
        name: 'You (Author)',
        role: 'Proposer',
        avatarInitials: 'YO',
      },
    ],
    needs: [
      {
        id: `n-${Date.now()}`,
        roleCategory: 'Engineering',
        label: 'Technical Development',
        description: 'Looking for initial prototyping collaborators.',
      },
    ],
  };

  inMemoryIdeas = [created, ...inMemoryIdeas];
  return created;
}

export async function joinIdeaTeam(
  ideaId: string,
  applicant: { name: string; role: string; message: string }
): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 350));

  inMemoryIdeas = inMemoryIdeas.map((idea) => {
    if (idea.id === ideaId) {
      const initials = applicant.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
      return {
        ...idea,
        contributors: [
          ...idea.contributors,
          {
            id: `c-${Date.now()}`,
            name: applicant.name,
            role: applicant.role,
            avatarInitials: initials || 'ME',
          },
        ],
      };
    }
    return idea;
  });

  return true;
}
