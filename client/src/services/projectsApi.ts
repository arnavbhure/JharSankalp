import {
  Project,
  ProjectActivityItem,
  PortfolioMetrics,
  PortfolioStats,
  ProjectFiltersState,
  ProjectStage,
  ProjectStatus,
} from '../types/projects';
import { ProjectDetail, ExpressInterestFormData } from '../types/projectDetail';
import { SEEDED_PROJECTS, PORTFOLIO_METRICS, PROJECT_ACTIVITIES } from '../data/projectsData';
import { buildProjectDetail } from '../data/projectDetailsData';
import { api } from './api';

export { SEEDED_PROJECTS };
export const SEED_PROJECTS: Project[] = SEEDED_PROJECTS;

export const PORTFOLIO_STATS: PortfolioStats = {
  activeProjects: PORTFOLIO_METRICS.activeProjects,
  universitiesInvolved: PORTFOLIO_METRICS.universitiesEngaged,
  partnerOrganizations: PORTFOLIO_METRICS.partnersCount,
  projectsInFieldPilot: 4,
  peopleImpacted: 32000,
  districtsWithPilots: PORTFOLIO_METRICS.districtsReached,
};

export async function getProjects(filters?: Partial<ProjectFiltersState>): Promise<Project[]> {
  try {
    const params = new URLSearchParams();
    if (
      filters?.domain &&
      filters.domain !== 'All Domains' &&
      filters.domain !== 'All Focus Areas'
    ) {
      params.set('domain', filters.domain);
    }
    if (filters?.district && filters.district !== 'All Districts') {
      params.set('district', filters.district);
    }
    if (filters?.stage && filters.stage !== 'ALL' && filters.stage !== 'ALL PROJECTS') {
      params.set('stage', filters.stage);
    }
    if (filters?.search && filters.search.trim()) {
      params.set('search', filters.search.trim());
    }

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const rawProjects = await api.get<any>(`/projects${queryString}`);
    const dbProjects = Array.isArray(rawProjects) ? rawProjects : rawProjects?.data || [];

    return dbProjects.map((p: any) => {
      const canonical =
        SEEDED_PROJECTS.find(
          (cp) =>
            cp.projectCode.toLowerCase() === (p.referenceCode || '').toLowerCase() ||
            cp.id === p.id,
        ) || SEEDED_PROJECTS[0];

      const totalMilestones = p.milestones?.length || canonical.milestoneProgress.total;
      const completedMilestones =
        p.milestones?.filter((m: any) => m.status === 'COMPLETED').length ??
        canonical.milestoneProgress.completed;
      const firstMetric = p.impactMetrics?.[0];

      return {
        ...canonical,
        id: p.id,
        projectCode: p.referenceCode || canonical.projectCode,
        title: p.title || canonical.title,
        description: p.description || canonical.description,
        summary: p.impactSummary || canonical.summary,
        stage: (p.stage || canonical.stage) as ProjectStage,
        status: (p.status || canonical.status) as ProjectStatus,
        domain: p.domain || canonical.domain,
        district: p.district || canonical.district,
        block: p.block || canonical.block,
        beneficiaries: p.affectedPopulation || canonical.beneficiaries,
        potentialBeneficiaries: p.affectedPopulation || canonical.potentialBeneficiaries,
        impactMetric: firstMetric
          ? `${firstMetric.currentValue} ${firstMetric.unit}`
          : canonical.impactMetric,
        milestoneProgress: {
          completed: completedMilestones,
          total: totalMilestones,
        },
        progressPercentage: Math.round(
          (completedMilestones / Math.max(totalMilestones, 1)) * 100,
        ),
      };
    });
  } catch (error) {
    console.warn('Backend /projects API error:', error);
    throw error;
  }
}

export async function getFeaturedProject(): Promise<Project | null> {
  try {
    const list = await getProjects();
    if (list && list.length > 0) {
      return list.find((p) => p.featured) || list[0];
    }
  } catch {
    // fallback
  }
  return null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const targetId = id.toLowerCase().trim();

  try {
    const p = await api.get<any>(`/projects/${encodeURIComponent(targetId)}`);
    if (p) {
      const canonical =
        SEEDED_PROJECTS.find(
          (cp) =>
            cp.projectCode.toLowerCase() === (p.referenceCode || '').toLowerCase() ||
            cp.id === p.id,
        ) || SEEDED_PROJECTS[0];

      const totalMilestones = p.milestones?.length || canonical.milestoneProgress.total;
      const completedMilestones =
        p.milestones?.filter((m: any) => m.status === 'COMPLETED').length ??
        canonical.milestoneProgress.completed;
      const firstMetric = p.impactMetrics?.[0];

      return {
        ...canonical,
        id: p.id,
        projectCode: p.referenceCode || canonical.projectCode,
        title: p.title || canonical.title,
        description: p.description || canonical.description,
        summary: p.impactSummary || canonical.summary,
        stage: (p.stage || canonical.stage) as ProjectStage,
        status: (p.status || canonical.status) as ProjectStatus,
        domain: p.domain || canonical.domain,
        district: p.district || canonical.district,
        block: p.block || canonical.block,
        beneficiaries: p.affectedPopulation || canonical.beneficiaries,
        potentialBeneficiaries: p.affectedPopulation || canonical.potentialBeneficiaries,
        impactMetric: firstMetric
          ? `${firstMetric.currentValue} ${firstMetric.unit}`
          : canonical.impactMetric,
        milestoneProgress: {
          completed: completedMilestones,
          total: totalMilestones,
        },
        progressPercentage: Math.round((completedMilestones / Math.max(totalMilestones, 1)) * 100),
      };
    }
  } catch (error) {
    console.warn(`Backend /projects/${id} fetch failed:`, error);
    return null;
  }

  return null;
}

export async function getPortfolioStats(): Promise<PortfolioStats> {
  try {
    const overview = await api.get<any>('/dashboard/overview');
    if (overview) {
      return {
        activeProjects: overview.projectCount || PORTFOLIO_METRICS.activeProjects,
        universitiesInvolved: 8,
        partnerOrganizations: 14,
        projectsInFieldPilot: 4,
        peopleImpacted: overview.peopleReached || 32000,
        districtsWithPilots: overview.activeDistricts || PORTFOLIO_METRICS.districtsReached,
      };
    }
  } catch (error) {
    console.warn('Backend overview stats unreachable, using fallback:', error);
  }
  return PORTFOLIO_STATS;
}

export async function getProjectActivity(): Promise<ProjectActivityItem[]> {
  try {
    const activities = await api.get<any[]>('/activities');
    if (Array.isArray(activities) && activities.length > 0) {
      return activities.map((act) => ({
        id: act.id,
        projectId: act.projectId || 'PRJ-2026-0012',
        projectTitle: act.message.split(' — ')[0] || 'Ecosystem Project',
        activity: act.message,
        stage: 'FIELD_PILOT' as ProjectStage,
        stageLabel: 'FIELD PILOT',
        timestamp: new Date(act.createdAt).toLocaleDateString('en-IN', {
          month: 'short',
          day: 'numeric',
        }),
      }));
    }
  } catch (error) {
    console.warn('Backend activities unreachable, using fallback:', error);
  }
  return PROJECT_ACTIVITIES;
}

export async function getPortfolioActivity(): Promise<any[]> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return PROJECT_ACTIVITIES.map((a) => ({
    id: a.id,
    timestamp: a.timestamp,
    title: a.projectTitle,
    description: a.activity,
    projectTitle: a.projectTitle,
    type: 'pilot',
  }));
}

export async function getCollaborationOpportunities(): Promise<
  Array<{ project: Project; need: string }>
> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return [
    {
      project: SEEDED_PROJECTS[0],
      need: 'IoT Manufacturing Partner for 150 Solar Telemetry Collars',
    },
    {
      project: SEEDED_PROJECTS[1],
      need: 'Satellite InSAR Calibration & High-Resolution Subsurface Modeling',
    },
    {
      project: SEEDED_PROJECTS[2],
      need: 'Mobile Spectrometer Chamber Precision Miniaturization',
    },
  ];
}

export async function getProjectMetrics(): Promise<PortfolioMetrics> {
  try {
    const ov = await api.get<any>('/dashboard/overview');
    if (ov) {
      return {
        ...PORTFOLIO_METRICS,
        activeProjects: ov.projectCount || PORTFOLIO_METRICS.activeProjects,
        districtsReached: ov.activeDistricts || PORTFOLIO_METRICS.districtsReached,
        peopleImpacted: ov.peopleReached ? `${ov.peopleReached.toLocaleString()}+` : PORTFOLIO_METRICS.peopleImpacted,
      };
    }
  } catch (err) {
    console.warn('Failed to load portfolio metrics from overview:', err);
  }
  return PORTFOLIO_METRICS;
}

export async function getProjectMapData(): Promise<
  Array<{
    id: string;
    projectCode: string;
    title: string;
    domain: string;
    district: string;
    stage: ProjectStage;
    stageLabel: string;
    beneficiaries?: number;
    coordinates: { x: number; y: number };
  }>
> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return SEEDED_PROJECTS.map((p) => ({
    id: p.id,
    projectCode: p.projectCode,
    title: p.title,
    domain: p.domain,
    district: p.district,
    stage: p.stage,
    stageLabel: p.stageLabel,
    beneficiaries: p.beneficiaries,
    coordinates: p.coordinates,
  }));
}

/**
 * Returns rich ProjectDetail for /projects/:projectId
 */
export async function getProjectDetail(id: string): Promise<ProjectDetail | null> {
  const base = await getProjectById(id);
  if (!base) return null;
  return buildProjectDetail(base);
}

export async function expressInterest(
  projectId: string,
  _formData: ExpressInterestFormData,
): Promise<{ success: boolean; referenceNumber: string }> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return {
    success: true,
    referenceNumber: `EXP-${projectId.replace('PRJ-', '')}-${Math.floor(1000 + Math.random() * 9000)}`,
  };
}

export const projectApi = {
  getProjects,
  getProjectById,
  getFeaturedProject,
  getPortfolioStats,
  getProjectActivity,
  getPortfolioActivity,
  getCollaborationOpportunities,
  getProjectMetrics,
  getProjectMapData,
  getProjectDetail,
  expressInterest,
};
