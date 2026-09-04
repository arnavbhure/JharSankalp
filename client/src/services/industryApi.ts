import {
  IndustryDashboardData,
  RecommendedOpportunity,
  ActiveCommitment,
  IndustryCapability,
  IndustryProfile,
  IndustryOpportunityMetrics,
  CollaborationPipelineStage,
  IndustryActivity,
} from '../types/industry';
import { api } from './api';

export async function getDashboard(): Promise<IndustryDashboardData> {
  let backendData: any = null;
  try {
    backendData = await api.get<any>('/dashboard/industry');
  } catch (err) {
    console.warn('Backend /dashboard/industry query skipped or unauthorized:', err);
  }

  let projects: any[] = [];
  let challenges: any[] = [];
  let activitiesList: any[] = [];

  try {
    const [pRes, cRes, actRes] = await Promise.all([
      api.get<any>('/projects'),
      api.get<any>('/challenges'),
      api.get<any>('/activities'),
    ]);
    projects = Array.isArray(pRes) ? pRes : pRes?.data || [];
    challenges = Array.isArray(cRes) ? cRes : cRes?.data || [];
    activitiesList = Array.isArray(actRes) ? actRes : actRes?.data || [];
  } catch (e) {
    console.warn('Failed to load auxiliary data for industry dashboard:', e);
  }

  const kpis = backendData?.kpis;
  const totalProjects = kpis?.totalProjects ?? projects.length ?? 3;
  const fieldPilots = kpis?.fieldPilotsSupported ?? projects.filter((p: any) => p.stage === 'FIELD_PILOT').length ?? 2;

  const profile: IndustryProfile = {
    name: 'Tata Steel Rural Development Society (TSRDS)',
    tagline: 'Strategic Industry Partner & Field Piloting Enabler',
    description:
      'Providing engineering mentorship, testbed infrastructure, and CSR scale funding to translate high-impact civic innovations across Jharkhand.',
    activeCommitments: kpis?.activeEngagements ?? 2,
    collaborationOpportunities: challenges.length || 4,
    projectsSupported: totalProjects,
  };

  const metrics: IndustryOpportunityMetrics = {
    seekingTechnicalSupport: 4,
    prototypeOpportunities: 3,
    fieldPilotsSeekingPartners: fieldPilots || 2,
    highPriorityRequests: challenges.filter((c: any) => c.priority === 'CRITICAL').length || 2,
  };

  const opportunities: RecommendedOpportunity[] = projects.slice(0, 4).map((p: any, i: number) => ({
    id: `opp-${p.id}`,
    projectId: p.id,
    projectCode: p.referenceCode || `PRJ-${p.id.slice(0, 6).toUpperCase()}`,
    title: p.title,
    domain: p.domain || 'Rural Infrastructure',
    need: 'Hardware Pilot Scale-up & Manufacturing Support',
    requiredCapability: 'IoT Prototyping & CNC Enclosures',
    stage: p.stage || 'FIELD_PILOT',
    stageLabel: (p.stage || 'FIELD PILOT').replace(/_/g, ' '),
    location: p.district || 'Khunti, Jharkhand',
    urgency: i === 0 ? 'URGENT' : 'HIGH',
  }));

  const commitments: ActiveCommitment[] = projects.slice(0, 2).map((p: any) => ({
    id: `commit-${p.id}`,
    projectId: p.id,
    projectCode: p.referenceCode || `PRJ-${p.id.slice(0, 6).toUpperCase()}`,
    projectTitle: p.title,
    domain: p.domain || 'Water Infrastructure',
    contribution: 'CSR Field Deployment Grant & Machining Facilities',
    partnerRole: 'Manufacturing & Co-Sponsor Partner',
    status: 'ACTIVE',
    leadInstitution: p.leadOrganization?.name || 'BIT Mesra Innovation Lab',
  }));

  const capabilities: IndustryCapability[] = [
    {
      id: 'cap-ind-1',
      title: 'Precision Machining & Enclosure Prototyping',
      category: 'MANUFACTURING',
      description: 'Rapid tooling and weather-resistant IP68 enclosure design for field IoT devices.',
      offeredResources: ['3D Printing', 'PCB SMT Line', 'RF Spectrum Analyzer'],
    },
    {
      id: 'cap-ind-2',
      title: 'CSR Scale Funding & District Pilot Sponsorship',
      category: 'FUNDING',
      description: 'Catalytic grants to finance 20-50 village pilot hardware deployments.',
      offeredResources: ['Grant Sponsoring', 'CSR Governance Compliance', 'Impact Audit'],
    },
  ];

  const pipeline: CollaborationPipelineStage[] = [
    {
      stage: 'OPPORTUNITY_IDENTIFIED',
      label: 'Identified Needs',
      count: challenges.length || 4,
      description: 'Civic challenges with technical collaboration requirements',
    },
    {
      stage: 'CONSORTIUM_MOU',
      label: 'In Negotiation',
      count: 2,
      description: 'Technical mentorship and resource sharing terms under agreement',
    },
    {
      stage: 'FIELD_PILOT_ACTIVE',
      label: 'Active Deployment',
      count: fieldPilots || 2,
      description: 'Hardware deployed in rural habitations with CSR sponsorship',
      highlight: true,
    },
  ];

  const activities: IndustryActivity[] = activitiesList.slice(0, 5).map((a: any) => ({
    id: a.id,
    timestamp: new Date(a.createdAt).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    }),
    message: a.message || 'Industry CSR partnership updated',
    domain: 'Civic Tech',
  }));

  return {
    profile,
    metrics,
    opportunities,
    commitments,
    capabilities,
    pipeline,
    activities,
  };
}

export async function getOpportunities(): Promise<RecommendedOpportunity[]> {
  try {
    const list = await api.get<any>('/projects');
    const raw = Array.isArray(list) ? list : list?.data || [];
    return raw.slice(0, 4).map((p: any, i: number) => ({
      id: `opp-${p.id}`,
      projectId: p.id,
      projectCode: p.referenceCode || `PRJ-${p.id.slice(0, 6).toUpperCase()}`,
      title: p.title,
      domain: p.domain || 'Rural Infrastructure',
      need: 'Hardware Pilot Scale-up & Manufacturing Support',
      requiredCapability: 'IoT Prototyping & CNC Enclosures',
      stage: p.stage || 'FIELD_PILOT',
      stageLabel: (p.stage || 'FIELD PILOT').replace(/_/g, ' '),
      location: p.district || 'Khunti, Jharkhand',
      urgency: i === 0 ? 'URGENT' : 'HIGH',
    }));
  } catch (e) {
    console.warn('Failed to load opportunities:', e);
    return [];
  }
}

export async function getCommitments(): Promise<ActiveCommitment[]> {
  try {
    const list = await api.get<any>('/projects');
    const raw = Array.isArray(list) ? list : list?.data || [];
    return raw.slice(0, 2).map((p: any) => ({
      id: `commit-${p.id}`,
      projectId: p.id,
      projectCode: p.referenceCode || `PRJ-${p.id.slice(0, 6).toUpperCase()}`,
      projectTitle: p.title,
      domain: p.domain || 'Water Infrastructure',
      contribution: 'CSR Field Deployment Grant & Machining Facilities',
      partnerRole: 'Manufacturing & Co-Sponsor Partner',
      status: 'ACTIVE',
      leadInstitution: p.leadOrganization?.name || 'BIT Mesra Innovation Lab',
    }));
  } catch (e) {
    console.warn('Failed to load commitments:', e);
    return [];
  }
}

export async function getCapabilities(): Promise<IndustryCapability[]> {
  return [
    {
      id: 'cap-ind-1',
      title: 'Precision Machining & Enclosure Prototyping',
      category: 'MANUFACTURING',
      description: 'Rapid tooling and weather-resistant IP68 enclosure design for field IoT devices.',
      offeredResources: ['3D Printing', 'PCB SMT Line', 'RF Spectrum Analyzer'],
    },
    {
      id: 'cap-ind-2',
      title: 'CSR Scale Funding & District Pilot Sponsorship',
      category: 'FUNDING',
      description: 'Catalytic grants to finance 20-50 village pilot hardware deployments.',
      offeredResources: ['Grant Sponsoring', 'CSR Governance Compliance', 'Impact Audit'],
    },
  ];
}

export const industryApi = {
  getDashboard,
  getOpportunities,
  getCommitments,
  getCapabilities,
};
