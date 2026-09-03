import { api } from '../api';

export interface ImpactQueryParams {
  domain?: string;
  district?: string;
}

export async function fetchImpactAnalytics(params?: ImpactQueryParams) {
  try {
    const query = new URLSearchParams();
    if (params?.domain && params.domain !== 'All Focus Areas') query.set('domain', params.domain);
    if (params?.district && params.district !== 'All Districts') query.set('district', params.district);

    const queryString = query.toString();
    const endpoint = queryString ? `/impact?${queryString}` : '/impact';
    return await api.get<{
      macroMetrics: Record<string, unknown>;
      journeyPipeline: any[];
      records: any[];
    }>(endpoint);
  } catch (error) {
    console.warn('Impact API unavailable, fallback will be used:', error);
    return null;
  }
}
