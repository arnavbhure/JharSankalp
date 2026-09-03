import { api } from '../api';

export interface ChallengeQueryParams {
  domain?: string;
  district?: string;
  status?: string;
}

export async function fetchChallenges(params?: ChallengeQueryParams) {
  try {
    const query = new URLSearchParams();
    if (params?.domain && params.domain !== 'All Focus Areas') query.set('domain', params.domain);
    if (params?.district && params.district !== 'All Districts') query.set('district', params.district);
    if (params?.status && params.status !== 'All Statuses') query.set('status', params.status);

    const queryString = query.toString();
    const endpoint = queryString ? `/challenges?${queryString}` : '/challenges';
    return await api.get<any[]>(endpoint);
  } catch (error) {
    console.warn('Backend API unavailable, fallback will be used:', error);
    return null;
  }
}

export async function fetchChallengeById(id: string) {
  try {
    return await api.get<any>(`/challenges/${id}`);
  } catch (error) {
    console.warn(`Challenge API failed for ${id}:`, error);
    return null;
  }
}
