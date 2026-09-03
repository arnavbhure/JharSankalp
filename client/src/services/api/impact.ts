import { api } from '../api';
import { ImpactFeedItem } from '../../types/impact';

export interface ImpactQueryParams {
  domain?: string;
  district?: string;
}

export interface ImpactAnalyticsResponse {
  macroMetrics: {
    peopleReached: string;
    activeDistricts: number;
    solutionsInProgress: number;
    fieldDeployments: number;
  };
  journeyPipeline: Array<{
    stage: string;
    count: number | string;
  }>;
  records: Array<{
    id: string;
    metricName: string;
    metricValue: string;
    metricUnit?: string;
    district: string;
    domain?: string;
    description?: string;
    recordedAt: string;
    solution?: {
      id: string;
      title: string;
      domain: string;
      stage: string;
    };
  }>;
}

export function mapDbRecordToFeedItem(rec: any, idx: number): ImpactFeedItem {
  const timeLabels = ['Today', 'Yesterday', '3 Days Ago', '1 Week Ago', '2 Weeks Ago'];
  const dateText = timeLabels[idx % timeLabels.length] || 'Recently';

  return {
    id: rec.id,
    dateText,
    title: `${rec.metricName}: ${rec.metricValue} achieved in ${rec.district}`,
    district: rec.district,
    domain: rec.domain || rec.solution?.domain || 'Water Management',
    stage: rec.solution?.stage ? rec.solution.stage.replace('_', ' ') : 'Field Pilot',
    type: idx % 2 === 0 ? 'expansion' : 'deployment',
  };
}

export async function fetchImpactAnalytics(
  params?: ImpactQueryParams
): Promise<ImpactAnalyticsResponse | null> {
  const query = new URLSearchParams();
  if (params?.domain && params.domain !== 'All Focus Areas') query.set('domain', params.domain);
  if (params?.district && params.district !== 'All Districts') query.set('district', params.district);

  const queryString = query.toString();
  const endpoint = queryString ? `/impact?${queryString}` : '/impact';
  return await api.get<ImpactAnalyticsResponse>(endpoint);
}
