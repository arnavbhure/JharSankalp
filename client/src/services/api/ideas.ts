import { api } from '../api';
import { CommunityIdea, IdeaStatus } from '../../types/ideas';

export interface IdeaQueryParams {
  domain?: string;
  district?: string;
  status?: string;
}

export function mapDbIdeaToUi(dbItem: any): CommunityIdea {
  let status: IdeaStatus = 'Community Supported';
  if (dbItem.status === 'IN_COLLABORATION') status = 'In Development';
  else if (dbItem.status === 'IMPLEMENTED') status = 'Implemented';
  else if (dbItem.status === 'UNDER_REVIEW') status = 'Under Review';
  else if (dbItem.status === 'DRAFT') status = 'New';

  return {
    id: dbItem.id,
    title: dbItem.title,
    description: dbItem.description,
    focusArea: dbItem.domain || 'Water Management',
    district: dbItem.district || 'Khunti',
    author: dbItem.authorName || dbItem.submittedBy?.name || 'Civic Innovator',
    supportersCount: dbItem.supportersCount || 95,
    contributorsCount: dbItem.collaboratorsCount || dbItem._count?.collaborations || 5,
    status,
    submittedDate: dbItem.createdAt
      ? new Date(dbItem.createdAt).toISOString().split('T')[0]
      : '2026-02-18',
    isSupported: false,
    linkedChallenge: dbItem.challenge?.title || undefined,
    linkedChallengeId: dbItem.challenge?.publicId || dbItem.relatedChallengeId || undefined,
  };
}

export async function fetchIdeas(params?: IdeaQueryParams): Promise<CommunityIdea[]> {
  const query = new URLSearchParams();
  if (params?.domain && params.domain !== 'All Focus Areas') query.set('domain', params.domain);
  if (params?.district && params.district !== 'All Districts') query.set('district', params.district);
  if (params?.status && params.status !== 'All Statuses') query.set('status', params.status);

  const queryString = query.toString();
  const endpoint = queryString ? `/ideas?${queryString}` : '/ideas';
  const rawList = await api.get<any[]>(endpoint);
  return (rawList || []).map(mapDbIdeaToUi);
}

export async function fetchIdeaById(id: string): Promise<any | null> {
  return await api.get<any>(`/ideas/${id}`);
}
