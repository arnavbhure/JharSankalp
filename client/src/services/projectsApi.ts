import {
  Project,
  ProjectActivityItem,
  PortfolioMetrics,
  PortfolioStats,
  ProjectFiltersState,
  ProjectStage,
} from '../types/projects';
import { ProjectDetail, ExpressInterestFormData } from '../types/projectDetail';
import {
  SEEDED_PROJECTS,
  PORTFOLIO_METRICS,
  PROJECT_ACTIVITIES,
} from '../data/projectsData';
import { buildProjectDetail } from '../data/projectDetailsData';

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
  await new Promise((resolve) => setTimeout(resolve, 80));

  let results = [...SEEDED_PROJECTS];

  if (!filters) return results;

  // Search filter
  if (filters.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.oneLineDescription.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        (p.block && p.block.toLowerCase().includes(q)) ||
        p.leadInstitution.toLowerCase().includes(q)
    );
  }

  // Domain filter
  if (filters.domain && filters.domain !== 'All Domains' && filters.domain !== 'All Focus Areas') {
    results = results.filter(
      (p) => p.domain.toLowerCase() === filters.domain!.toLowerCase()
    );
  }

  // District filter
  if (filters.district && filters.district !== 'All Districts') {
    results = results.filter(
      (p) => p.district.toLowerCase() === filters.district!.toLowerCase()
    );
  }

  // Stage filter
  if (filters.stage && filters.stage !== 'ALL' && filters.stage !== 'ALL PROJECTS') {
    results = results.filter((p) => p.stage === (filters.stage as ProjectStage));
  }

  // Institution filter
  if (filters.institution && filters.institution !== 'All Institutions') {
    results = results.filter(
      (p) =>
        p.leadInstitution.toLowerCase().includes(filters.institution!.toLowerCase()) ||
        p.partners.some((partner) =>
          partner.name.toLowerCase().includes(filters.institution!.toLowerCase())
        )
    );
  }

  return results;
}

export async function getFeaturedProject(): Promise<Project> {
  return SEEDED_PROJECTS.find((p) => p.featured) || SEEDED_PROJECTS[0];
}

export async function getProjectById(id: string): Promise<Project | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const targetId = id.toLowerCase().trim();
  const found = SEEDED_PROJECTS.find(
    (p) => p.id.toLowerCase() === targetId || p.projectCode.toLowerCase() === targetId
  );
  return found || null;
}

export async function getPortfolioStats(): Promise<PortfolioStats> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return PORTFOLIO_STATS;
}

export async function getProjectActivity(): Promise<ProjectActivityItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 40));
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

export async function getCollaborationOpportunities(): Promise<Array<{ project: Project; need: string }>> {
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
  await new Promise((resolve) => setTimeout(resolve, 40));
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
  await new Promise((resolve) => setTimeout(resolve, 80));
  const targetId = id.toLowerCase().trim();
  const base = SEEDED_PROJECTS.find(
    (p) => p.id.toLowerCase() === targetId || p.projectCode.toLowerCase() === targetId
  );
  if (!base) return null;
  return buildProjectDetail(base);
}

export async function expressInterest(
  projectId: string,
  _formData: ExpressInterestFormData
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
