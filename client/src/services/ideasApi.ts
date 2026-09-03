import { IdeaItem, IdeaFilterState, IdeaStatsData } from '../types/ideas';
import { IDEAS_DATA, IDEAS_STATS } from '../data/ideasData';
import { api } from './api';

let inMemoryIdeas = [...IDEAS_DATA];

export async function getIdeas(filters?: Partial<IdeaFilterState>): Promise<IdeaItem[]> {
  try {
    const rawList = await api.get<any[]>('/ideas');
    if (rawList && rawList.length > 0) {
      let results: IdeaItem[] = rawList.map((db) => ({
        id: db.id,
        title: db.title,
        summary: db.description,
        category: db.domain || 'Water Management',
        district: db.district || 'Khunti',
        challengeId: db.challenge?.publicId || 'JS-2026-00024',
        challengeTitle: db.challenge?.title || 'Community Water Reliability',
        stage: 'PROTOTYPE',
        collaborationStatus: 'OPEN',
        statusLabel: 'OPEN FOR CONTRIBUTORS',
        submittedDate: db.createdAt
          ? new Date(db.createdAt).toISOString().split('T')[0]
          : '2026-02-18',
        likesCount: db.supportersCount || 120,
        contributors: [
          {
            id: db.submittedBy?.id || 'u-lead',
            name: db.authorName || db.submittedBy?.name || 'Civic Lead',
            role: db.authorRole || db.submittedBy?.role || 'Lead Proposer',
            avatarInitials: (db.authorName || 'CL')
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase(),
          },
        ],
        needs: [],
      }));

      if (filters) {
        if (filters.search && filters.search.trim()) {
          const q = filters.search.toLowerCase();
          results = results.filter(
            (i) =>
              i.title.toLowerCase().includes(q) ||
              i.summary.toLowerCase().includes(q) ||
              i.category.toLowerCase().includes(q) ||
              i.district.toLowerCase().includes(q),
          );
        }
        if (filters.category && filters.category !== 'All Focus Areas') {
          results = results.filter(
            (i) => i.category.toLowerCase() === filters.category!.toLowerCase(),
          );
        }
        if (filters.district && filters.district !== 'All Districts') {
          results = results.filter(
            (i) => i.district.toLowerCase() === filters.district!.toLowerCase(),
          );
        }
      }

      return results;
    }
  } catch (err) {
    console.warn('Backend ideas unreachable, using memory store:', err);
  }

  let results = [...inMemoryIdeas];
  if (filters) {
    if (filters.search && filters.search.trim()) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.summary.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          i.district.toLowerCase().includes(q),
      );
    }
    if (filters.category && filters.category !== 'All Focus Areas') {
      results = results.filter((i) => i.category.toLowerCase() === filters.category!.toLowerCase());
    }
    if (filters.district && filters.district !== 'All Districts') {
      results = results.filter((i) => i.district.toLowerCase() === filters.district!.toLowerCase());
    }
  }
  return results;
}

export async function getFeaturedIdea(): Promise<IdeaItem> {
  const all = await getIdeas();
  return all[0] || inMemoryIdeas[0];
}

export async function getIdeaById(id: string): Promise<IdeaItem | null> {
  try {
    const raw = await api.get<any>(`/ideas/${id}`);
    if (raw && raw.id) {
      return {
        id: raw.id,
        title: raw.title,
        summary: raw.description,
        category: raw.domain || 'Water Management',
        district: raw.district || 'Khunti',
        challengeId: raw.challenge?.publicId || 'JS-2026-00024',
        challengeTitle: raw.challenge?.title || 'Community Water Reliability',
        stage: 'PROTOTYPE',
        collaborationStatus: 'OPEN',
        statusLabel: 'OPEN FOR CONTRIBUTORS',
        submittedDate: raw.createdAt
          ? new Date(raw.createdAt).toISOString().split('T')[0]
          : '2026-02-18',
        likesCount: raw.supportersCount || 120,
        contributors: [
          {
            id: raw.submittedBy?.id || 'u-lead',
            name: raw.authorName || raw.submittedBy?.name || 'Civic Lead',
            role: raw.authorRole || raw.submittedBy?.role || 'Lead Proposer',
            avatarInitials: (raw.authorName || 'CL')
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase(),
          },
        ],
        needs: [],
      };
    }
  } catch (err) {
    console.warn(`Unable to fetch idea ${id} from API:`, err);
  }

  const idea = inMemoryIdeas.find((i) => i.id === id);
  return idea || null;
}

export async function getIdeasStats(): Promise<IdeaStatsData> {
  try {
    const overview = await api.get<any>('/dashboard/overview');
    if (overview) {
      return {
        totalIdeas: overview.ideaCount || IDEAS_STATS.totalIdeas,
        activeCollaborations: overview.collaborationCount || IDEAS_STATS.activeCollaborations,
        prototypesInDevelopment: overview.solutionCount || IDEAS_STATS.prototypesInDevelopment,
        fieldPilots: 4,
      };
    }
  } catch (err) {
    console.warn('Unable to query stats overview from API:', err);
  }
  return { ...IDEAS_STATS };
}

export async function submitIdea(newIdea: Partial<IdeaItem>): Promise<IdeaItem> {
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
  applicant: { name: string; role: string; message: string },
): Promise<boolean> {
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
