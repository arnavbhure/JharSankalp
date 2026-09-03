import { api } from '../api';

export interface SolutionQueryParams {
  domain?: string;
  district?: string;
  stage?: string;
}

export async function fetchSolutions(params?: SolutionQueryParams) {
  try {
    const query = new URLSearchParams();
    if (params?.domain && params.domain !== 'All Focus Areas') query.set('domain', params.domain);
    if (params?.district && params.district !== 'All Districts') query.set('district', params.district);
    if (params?.stage && params.stage !== 'All Stages') query.set('stage', params.stage);

    const queryString = query.toString();
    const endpoint = queryString ? `/solutions?${queryString}` : '/solutions';
    return await api.get<any[]>(endpoint);
  } catch (error) {
    console.warn('Backend API unavailable, fallback will be used:', error);
    return null;
  }
}

export async function fetchSolutionById(id: string) {
  try {
    return await api.get<any>(`/solutions/${id}`);
  } catch (error) {
    console.warn(`Solution API failed for ${id}:`, error);
    return null;
  }
}
