import { api } from '../api';

export interface CollaborationQueryParams {
  domain?: string;
  district?: string;
  status?: string;
  stage?: string;
}

export async function fetchCollaborations(params?: CollaborationQueryParams) {
  try {
    const query = new URLSearchParams();
    if (params?.domain && params.domain !== 'All Focus Areas') query.set('domain', params.domain);
    if (params?.district && params.district !== 'All Districts') query.set('district', params.district);
    if (params?.status && params.status !== 'All Statuses') query.set('status', params.status);
    if (params?.stage && params.stage !== 'All Stages') query.set('stage', params.stage);

    const queryString = query.toString();
    const endpoint = queryString ? `/collaborations?${queryString}` : '/collaborations';
    return await api.get<any[]>(endpoint);
  } catch (error) {
    console.warn('Backend API unavailable, fallback will be used:', error);
    return null;
  }
}

export async function fetchCollaborationById(id: string) {
  try {
    return await api.get<any>(`/collaborations/${id}`);
  } catch (error) {
    console.warn(`Collaboration API failed for ${id}:`, error);
    return null;
  }
}
