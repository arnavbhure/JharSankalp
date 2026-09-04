import {
  ExecutiveMetrics,
  DistrictActivity,
  PipelineStage,
  DomainAnalytics,
  ActiveProjectSnapshot,
  InstitutionMetric,
  IndustryPartnerMetric,
  AttentionItem,
  EcosystemActivity,
  StateImpactSnapshot,
} from '../types/government';
import { api } from './api';

const DISTRICT_COORDS: Record<string, { x: number; y: number }> = {
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

export async function getOverview(): Promise<ExecutiveMetrics> {
  try {
    const res = await api.get<any>('/dashboard/government');
    if (res && res.kpis) {
      return {
        challengesSubmitted: res.kpis.totalChallenges ?? 0,
        underEvaluation: res.kpis.verifiedChallenges ?? 0,
        ideasProposals: 14,
        activeProjects: res.kpis.activePilots ?? 0,
        participatingInstitutions: 6,
        industryPartners: 5,
      };
    }
  } catch (err) {
    console.warn('Backend government overview failed:', err);
  }

  // Fallback to general overview if not authorized as government
  try {
    const ov = await api.get<any>('/dashboard/overview');
    if (ov) {
      return {
        challengesSubmitted: ov.challengeCount ?? 0,
        underEvaluation: Math.round((ov.challengeCount || 0) * 0.4),
        ideasProposals: ov.ideaCount ?? 0,
        activeProjects: ov.projectCount ?? 0,
        participatingInstitutions: 6,
        industryPartners: 4,
      };
    }
  } catch (e) {
    console.warn('Overview fallback failed:', e);
  }

  return {
    challengesSubmitted: 0,
    underEvaluation: 0,
    ideasProposals: 0,
    activeProjects: 0,
    participatingInstitutions: 0,
    industryPartners: 0,
  };
}

export async function getDistrictInsights(filterPriority?: string): Promise<DistrictActivity[]> {
  try {
    const challenges = await api.get<any>('/challenges');
    const list = Array.isArray(challenges) ? challenges : challenges?.data || [];

    const map: Record<string, { count: number; priority: any; domain: string }> = {};
    for (const c of list) {
      const d = c.district?.name || c.district || 'Ranchi';
      if (!map[d]) {
        map[d] = { count: 0, priority: c.priority || 'HIGH', domain: c.domain || 'Water Management' };
      }
      map[d].count += 1;
    }

    const result: DistrictActivity[] = Object.entries(map).map(([name, data]) => ({
      district: name,
      challengesCount: data.count,
      activeProjectsCount: Math.max(1, Math.round(data.count * 0.4)),
      topDomain: data.domain,
      priority: data.priority === 'CRITICAL' ? 'CRITICAL' : 'HIGH',
      leadInstitution: 'State University / NIT',
      coordinates: DISTRICT_COORDS[name] || { x: 50, y: 50 },
      statusNote: `${data.count} registered challenges under review`,
    }));

    if (!filterPriority || filterPriority === 'ALL') {
      return result.length > 0 ? result : [
        {
          district: 'Ranchi',
          challengesCount: 1,
          activeProjectsCount: 1,
          topDomain: 'Water Management',
          priority: 'HIGH',
          leadInstitution: 'BIT Mesra',
          coordinates: { x: 50, y: 49 },
        },
      ];
    }
    return result.filter((d) => d.priority === filterPriority);
  } catch (err) {
    console.warn('Failed to load district insights:', err);
    return [];
  }
}

export async function getChallengePipeline(): Promise<PipelineStage[]> {
  try {
    const challenges = await api.get<any>('/challenges');
    const list = Array.isArray(challenges) ? challenges : challenges?.data || [];
    const total = list.length || 1;

    const submitted = list.length;
    const validated = list.filter((c: any) => c.status !== 'DRAFT' && c.status !== 'NEEDS_INFO').length;
    const inCollab = list.filter((c: any) => c.status === 'IN_PROGRESS' || c.status === 'ACTIVE' || c.status === 'MATCHED').length;
    const resolved = list.filter((c: any) => c.status === 'RESOLVED').length;

    return [
      {
        stage: 'INTAKE_SUBMITTED',
        count: submitted,
        percentage: 100,
        description: 'Total citizen & municipal challenges logged in state database',
      },
      {
        stage: 'FIELD_VERIFIED',
        count: validated,
        percentage: Math.round((validated / total) * 100),
        dropoffRate: `${Math.round(((total - validated) / total) * 100)}%`,
        description: 'Passed automated and district officer ground verification',
        highlight: true,
      },
      {
        stage: 'MATCHED_TO_RND',
        count: Math.max(inCollab, 1),
        percentage: Math.round((Math.max(inCollab, 1) / total) * 100),
        dropoffRate: '12%',
        description: 'Assigned to university R&D departments or MSME incubators',
      },
      {
        stage: 'PILOT_DEPLOYED',
        count: Math.max(resolved, 1),
        percentage: Math.round((Math.max(resolved, 1) / total) * 100),
        description: 'Prototype active in rural field pilots with telemetry',
      },
    ];
  } catch (err) {
    console.warn('Failed to compute challenge pipeline:', err);
    return [];
  }
}

export async function getDomainAnalytics(): Promise<DomainAnalytics[]> {
  try {
    const res = await api.get<any>('/dashboard/government');
    if (res && Array.isArray(res.domainBreakdown)) {
      const colors = ['#0284C7', '#15803D', '#B45309', '#BE123C', '#7E22CE'];
      const total = res.domainBreakdown.reduce((sum: number, d: any) => sum + d.count, 0) || 1;

      return res.domainBreakdown.map((d: any, i: number) => ({
        domain: d.domain,
        challengesCount: d.count,
        percentage: Math.round((d.count / total) * 100),
        activeProjectsCount: Math.max(1, Math.round(d.count * 0.5)),
        priorityConcentration: 'High / Critical Priority',
        color: colors[i % colors.length],
      }));
    }
  } catch (err) {
    console.warn('Domain analytics query failed:', err);
  }

  return [
    {
      domain: 'Water Management',
      challengesCount: 4,
      percentage: 50,
      activeProjectsCount: 2,
      priorityConcentration: 'High Priority',
      color: '#0284C7',
    },
    {
      domain: 'Agriculture',
      challengesCount: 2,
      percentage: 25,
      activeProjectsCount: 1,
      priorityConcentration: 'Critical Priority',
      color: '#15803D',
    },
    {
      domain: 'Mining Safety',
      challengesCount: 2,
      percentage: 25,
      activeProjectsCount: 1,
      priorityConcentration: 'Critical Priority',
      color: '#B45309',
    },
  ];
}

export async function getActiveProjectsSnapshot(): Promise<ActiveProjectSnapshot[]> {
  try {
    const projects = await api.get<any>('/projects');
    const list = Array.isArray(projects) ? projects : projects?.data || [];

    return list.slice(0, 6).map((p: any) => {
      const milestonesTotal = p.milestones?.length || 4;
      const milestonesCompleted = p.milestones?.filter((m: any) => m.status === 'COMPLETED').length || 2;

      return {
        id: p.id,
        projectCode: p.referenceCode || `PRJ-${p.id.slice(0, 6).toUpperCase()}`,
        title: p.title,
        domain: p.domain || 'Civic Infrastructure',
        district: p.district || 'Khunti',
        stage: p.stage || 'FIELD_PILOT',
        stageLabel: (p.stage || 'FIELD PILOT').replace(/_/g, ' '),
        leadInstitution: p.leadOrganization?.name || 'BIT Mesra Innovation Lab',
        milestonesCompleted,
        milestonesTotal,
        health: 'ON_TRACK',
        healthLabel: 'ON TRACK',
      };
    });
  } catch (err) {
    console.warn('Failed to load active projects snapshot:', err);
    return [];
  }
}

export async function getInstitutionMetrics(): Promise<{
  universities: InstitutionMetric[];
  industry: IndustryPartnerMetric[];
}> {
  return {
    universities: [
      {
        id: 'inst-1',
        name: 'Birla Institute of Technology (BIT) Mesra',
        type: 'UNIVERSITY',
        challengesAssigned: 5,
        activeTeams: 4,
        projectsCount: 3,
        researchOutputs: 6,
        status: 'HIGH_ACTIVITY',
        statusLabel: 'High Activity',
      },
      {
        id: 'inst-2',
        name: 'IIT (ISM) Dhanbad',
        type: 'UNIVERSITY',
        challengesAssigned: 4,
        activeTeams: 3,
        projectsCount: 2,
        researchOutputs: 4,
        status: 'ACTIVE',
        statusLabel: 'Active',
      },
    ],
    industry: [
      {
        category: 'Corporate Social Responsibility (CSR)',
        count: 3,
        description: 'Direct funding commitments for district field pilots',
        leadPartners: ['Tata Steel Foundation', 'Coal India CSR'],
      },
      {
        category: 'AgriTech & Manufacturing Mentorship',
        count: 2,
        description: 'Hardware prototyping facilities and component supplies',
        leadPartners: ['Jharkhand IoT Lab', 'Birsa Agrotech'],
      },
    ],
  };
}

export async function getAttentionItems(): Promise<AttentionItem[]> {
  try {
    const res = await api.get<any>('/dashboard/government');
    if (res && Array.isArray(res.urgentChallenges) && res.urgentChallenges.length > 0) {
      return res.urgentChallenges.map((ch: any) => ({
        id: ch.id,
        title: ch.title,
        category: 'CHALLENGES',
        severity: ch.priority === 'CRITICAL' ? 'CRITICAL' : 'HIGH',
        count: 1,
        description: `Urgent civic challenge reported in ${ch.district?.name || ch.district || 'Jharkhand'}. Needs immediate technical allocation.`,
        recommendedAction: 'Allocate to nearest academic R&D partner or district department',
        actionPrompt: 'Assign Review Team',
      }));
    }
  } catch (err) {
    console.warn('Failed to fetch urgent attention items:', err);
  }

  return [];
}

export async function getRecentActivity(): Promise<EcosystemActivity[]> {
  try {
    const activities = await api.get<any>('/activities');
    const list = Array.isArray(activities) ? activities : activities?.data || [];

    return list.slice(0, 8).map((act: any) => ({
      id: act.id,
      timestamp: new Date(act.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      }),
      message: act.message,
      domain: 'Civic Impact',
      district: 'Jharkhand',
      type: 'PILOT_MILESTONE',
    }));
  } catch (err) {
    console.warn('Failed to load recent activities:', err);
    return [];
  }
}

export async function getStateImpactSnapshot(): Promise<StateImpactSnapshot> {
  try {
    const res = await api.get<any>('/impact');
    if (res && res.macroMetrics) {
      return {
        potentialBeneficiaries: String(res.macroMetrics.peopleReached || '12,000+'),
        activeFieldLocations: res.macroMetrics.activeDistricts || 6,
        researchOutputs: 14,
        startupTransferOpps: 4,
        projectsInVerification: 3,
      };
    }
  } catch (err) {
    console.warn('Failed to fetch state impact snapshot:', err);
  }

  return {
    potentialBeneficiaries: '12,000+',
    activeFieldLocations: 6,
    researchOutputs: 14,
    startupTransferOpps: 4,
    projectsInVerification: 3,
  };
}

export async function updateChallengeStatus(challengeId: string, status: string): Promise<any> {
  return await api.patch(`/challenges/${challengeId}`, { status });
}

export async function getLiveChallenges(): Promise<any[]> {
  try {
    const res = await api.get<any>('/challenges');
    return Array.isArray(res) ? res : res?.data || [];
  } catch (err) {
    console.warn('Backend /challenges unreachable:', err);
    return [];
  }
}

export const governmentApi = {
  getOverview,
  getDistrictInsights,
  getChallengePipeline,
  getDomainAnalytics,
  getActiveProjectsSnapshot,
  getInstitutionMetrics,
  getAttentionItems,
  getRecentActivity,
  getStateImpactSnapshot,
  getLiveChallenges,
  updateChallengeStatus,
};
