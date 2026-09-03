import { api } from '../api';
import { CollaborationProject, ProjectStage } from '../../types/collaborations';

export interface CollaborationQueryParams {
  domain?: string;
  district?: string;
  status?: string;
  stage?: string;
}

export function mapDbCollabToUi(dbItem: any): CollaborationProject {
  let stage: ProjectStage = 'Pilot Stage';
  const rawStage = (dbItem.stage || '').toLowerCase();
  if (rawStage.includes('research')) stage = 'Research';
  else if (rawStage.includes('proto')) stage = 'Prototyping';
  else if (rawStage.includes('implement') || rawStage.includes('deploy')) stage = 'Implementation';
  else if (rawStage.includes('concept') || rawStage.includes('explor')) stage = 'Exploring';

  const members = dbItem.members || [];
  const avatars = members.map((m: any) =>
    (m.memberName || 'Member')
      .split(' ')
      .map((p: string) => p[0])
      .join('')
      .substring(0, 2)
      .toUpperCase(),
  );

  return {
    id: dbItem.id,
    title: dbItem.title,
    description: dbItem.description,
    focusArea: dbItem.domain || 'Water Management',
    district: dbItem.district || 'Khunti',
    stage,
    teamCount: members.length || 4,
    progress: dbItem.progressPercentage || 68,
    skillsNeeded: dbItem.neededSkills || ['Embedded C', 'LoRaWAN', 'Hydrology'],
    leadOrg: dbItem.leadPartner || dbItem.institutionName || 'Academic Research Lab',
    linkedChallenge: dbItem.challenge?.title || undefined,
    linkedChallengeId: dbItem.challenge?.publicId || dbItem.relatedChallengeId || undefined,
    avatars: avatars.length > 0 ? avatars : ['AV', 'KM', 'RK', 'SO'],
  };
}

export async function fetchCollaborations(
  params?: CollaborationQueryParams,
): Promise<CollaborationProject[]> {
  const query = new URLSearchParams();
  if (params?.domain && params.domain !== 'All Focus Areas') query.set('domain', params.domain);
  if (params?.district && params.district !== 'All Districts')
    query.set('district', params.district);
  if (params?.status && params.status !== 'All Statuses') query.set('status', params.status);
  if (params?.stage && params.stage !== 'All Stages') query.set('stage', params.stage);

  const queryString = query.toString();
  const endpoint = queryString ? `/collaborations?${queryString}` : '/collaborations';
  const rawList = await api.get<any>(endpoint);
  const list = Array.isArray(rawList) ? rawList : rawList?.data || [];
  return list.map(mapDbCollabToUi);
}

export async function fetchCollaborationById(id: string): Promise<any | null> {
  return await api.get<any>(`/collaborations/${id}`);
}
