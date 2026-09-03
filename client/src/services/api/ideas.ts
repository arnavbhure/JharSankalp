import { api } from '../api';

export interface IdeaQueryParams {
  domain?: string;
  district?: string;
  status?: string;
}

export async function fetchIdeas(params?: IdeaQueryParams) {
  try {
    const query = new URLSearchParams();
    if (params?.domain && params.domain !== 'All Focus Areas') query.set('domain', params.domain);
    if (params?.district && params.district !== 'All Districts') query.set('district', params.district);
    if (params?.status && params.status !== 'All Statuses') query.set('status', params.status);

    const queryString = query.toString();
    const endpoint = queryString ? `/ideas?${queryString}` : '/ideas';
    return await api.get<any[]>(endpoint);
  } catch (error) {
    console.warn('Backend API unavailable, fallback will be used:', error);
    return null;
  }
}

export async function fetchIdeaById(id: string) {
  try {
    return await api.get<any>(`/ideas/${id}`);
  } catch (error) {
    console.warn(`Idea API failed for ${id}:`, error);
    return null;
  }
}
