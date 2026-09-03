import { api } from '../api';
import { SolutionItem, SolutionStage } from '../../types/solutions';

export interface SolutionQueryParams {
  domain?: string;
  district?: string;
  stage?: string;
}

export function mapDbSolutionToUi(dbItem: any): SolutionItem {
  let stage: SolutionStage = 'Field Pilot';
  const rawStage = (dbItem.stage || '').toLowerCase();
  if (rawStage.includes('research')) stage = 'Research';
  else if (rawStage.includes('prototype') || rawStage.includes('proto')) stage = 'Prototype';
  else if (rawStage.includes('testing') || rawStage.includes('test')) stage = 'Testing';
  else if (rawStage.includes('pilot')) stage = 'Field Pilot';
  else if (rawStage.includes('deploy')) stage = 'Deployment';
  else if (rawStage.includes('scale') || rawStage.includes('scaling')) stage = 'Scaling';

  const impactRecords = dbItem.impactRecords || [];
  const impactMetrics =
    impactRecords.length > 0
      ? impactRecords.map((r: any) => `${r.metricValue} ${r.metricName}`)
      : ['14 villages participating', '32% faster reporting', '2,000+ residents covered'];

  return {
    id: dbItem.id,
    name: dbItem.title,
    tagline: dbItem.tagline || 'Engineered civic innovation for Jharkhand communities',
    description: dbItem.description,
    focusArea: dbItem.domain || 'Water Management',
    district: dbItem.district || 'Khunti',
    stage,
    technologyType: dbItem.technologyType || 'IoT + Sensors',
    technologyTags: dbItem.technologyTags || ['Telemetry', 'Sensors'],
    progress: dbItem.progressPercentage || 75,
    impactSummary: dbItem.impactSummary || impactMetrics.join(' · '),
    impactMetrics,
    challengeId: dbItem.challenge?.publicId || dbItem.relatedChallengeId || 'JS-2026-00024',
    challengeTitle: dbItem.challenge?.title || 'Grassroots Infrastructure Reliability',
    collaborationId: dbItem.collaboration?.id || dbItem.relatedCollaborationId || undefined,
    collaborationTitle: dbItem.collaboration?.title || undefined,
    leadPartners: dbItem.leadPartners || ['BIT Mesra', 'Local Administration'],
    milestones: [
      { name: 'Hardware Sensor Prototyping', date: 'Oct 2025', completed: true },
      { name: 'Field Sensor Calibration', date: 'Dec 2025', completed: true },
      { name: 'Panchayat Pilot Installation', date: 'Feb 2026', completed: true },
      { name: 'Automated BDO Dashboard Integration', date: 'May 2026', completed: false },
    ],
    nextMilestone:
      'Integration with District Jal Jeevan Mission API & statewide repair team dispatch',
    image: dbItem.imageUrl || '/rural_water_iot.jpg',
  };
}

export async function fetchSolutions(params?: SolutionQueryParams): Promise<SolutionItem[]> {
  const query = new URLSearchParams();
  if (params?.domain && params.domain !== 'All Focus Areas') query.set('domain', params.domain);
  if (params?.district && params.district !== 'All Districts')
    query.set('district', params.district);
  if (params?.stage && params.stage !== 'All Stages') query.set('stage', params.stage);

  const queryString = query.toString();
  const endpoint = queryString ? `/solutions?${queryString}` : '/solutions';
  const rawList = await api.get<any>(endpoint);
  const list = Array.isArray(rawList) ? rawList : rawList?.data || [];
  return list.map(mapDbSolutionToUi);
}

export async function fetchSolutionById(id: string): Promise<any | null> {
  return await api.get<any>(`/solutions/${id}`);
}
