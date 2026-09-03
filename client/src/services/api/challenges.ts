import { api } from '../api';
import { ChallengeItem, ChallengeCategory, ChallengeStatusType, ImpactLevel } from '../../types/challenges';

export interface ChallengeQueryParams {
  domain?: string;
  district?: string;
  status?: string;
}

const DISTRICT_COORDINATES: Record<string, { x: number; y: number }> = {
  Khunti: { x: 48, y: 58 },
  Ranchi: { x: 50, y: 49 },
  Dhanbad: { x: 74, y: 44 },
  Gumla: { x: 32, y: 56 },
  'West Singhbhum': { x: 55, y: 78 },
  Dumka: { x: 80, y: 32 },
  Latehar: { x: 35, y: 40 },
  Hazaribagh: { x: 52, y: 38 },
  Bokaro: { x: 68, y: 48 },
  Deoghar: { x: 72, y: 28 },
};

export function mapDbChallengeToUi(dbItem: any): ChallengeItem {
  const publicId = dbItem.publicId || dbItem.challengeCode || dbItem.id;
  const category = (dbItem.domain || 'Water Management') as ChallengeCategory;
  const districtName = dbItem.district?.name || dbItem.district || 'Khunti';
  const block = dbItem.block || '';

  let status: ChallengeStatusType = 'Open for Collaboration';
  if (dbItem.status === 'IN_PROGRESS') status = 'Solution in Development';
  else if (dbItem.status === 'RESOLVED') status = 'Implemented';
  else if (dbItem.status === 'UNDER_REVIEW') status = 'In Discussion';

  let impactLevel: ImpactLevel = 'High Impact';
  if (dbItem.priority === 'CRITICAL') impactLevel = 'Critical';
  else if (dbItem.priority === 'MEDIUM' || dbItem.priority === 'LOW') impactLevel = 'Medium Impact';

  return {
    id: publicId,
    title: dbItem.title,
    description: dbItem.description,
    category,
    district: districtName,
    block,
    locationDisplay: block ? `${block}, ${districtName}` : `${districtName}, Jharkhand`,
    status,
    impactLevel,
    collaboratorsCount: dbItem._count?.collaborations || dbItem.collaborations?.length || 4,
    ideasCount: dbItem._count?.ideas || dbItem.ideas?.length || 2,
    metrics: [
      {
        label: 'Affected Population',
        value: dbItem.affectedPopulation ? `${dbItem.affectedPopulation.toLocaleString()}` : '2,000+',
      },
      { label: 'Priority', value: dbItem.priority || 'High' },
      { label: 'Status', value: dbItem.status || 'Active' },
    ],
    coordinates: DISTRICT_COORDINATES[districtName] || { x: 50, y: 50 },
    dateReported: dbItem.createdAt
      ? new Date(dbItem.createdAt).toISOString().split('T')[0]
      : '2026-02-14',
    featured: publicId === 'JS-2026-00024' || dbItem.priority === 'CRITICAL',
  };
}

export async function fetchChallenges(params?: ChallengeQueryParams): Promise<ChallengeItem[]> {
  const query = new URLSearchParams();
  if (params?.domain && params.domain !== 'All Focus Areas') query.set('domain', params.domain);
  if (params?.district && params.district !== 'All Districts') query.set('district', params.district);
  if (params?.status && params.status !== 'All Statuses') query.set('status', params.status);

  const queryString = query.toString();
  const endpoint = queryString ? `/challenges?${queryString}` : '/challenges';
  const rawList = await api.get<any[]>(endpoint);
  return (rawList || []).map(mapDbChallengeToUi);
}

export async function fetchChallengeById(id: string): Promise<any | null> {
  return await api.get<any>(`/challenges/${id}`);
}
