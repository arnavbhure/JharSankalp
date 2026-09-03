import {
  UniversityDashboardData,
  RecommendedChallenge,
  UniversityActiveProject,
  ResearchCapability,
} from '../types/university';
import {
  UNIVERSITY_DASHBOARD_DATA,
  RECOMMENDED_CHALLENGES,
  UNIVERSITY_ACTIVE_PROJECTS,
  RESEARCH_CAPABILITIES,
} from '../data/universityData';
import { api } from './api';

export async function getDashboard(): Promise<UniversityDashboardData> {
  try {
    const res = await api.get<any>('/dashboard/university');
    if (res && res.kpis) {
      return {
        ...UNIVERSITY_DASHBOARD_DATA,
        metrics: {
          ...UNIVERSITY_DASHBOARD_DATA.metrics,
          relevantChallenges: res.kpis.totalIdeasSubmitted ?? UNIVERSITY_DASHBOARD_DATA.metrics.relevantChallenges,
          projectsInProgress: res.kpis.activeCollaborations ?? UNIVERSITY_DASHBOARD_DATA.metrics.projectsInProgress,
        },
      };
    }
  } catch (err) {
    console.warn('Backend university dashboard unreachable, using fallback:', err);
  }
  return UNIVERSITY_DASHBOARD_DATA;
}

export async function getRecommendedChallenges(): Promise<RecommendedChallenge[]> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return RECOMMENDED_CHALLENGES;
}

export async function getProjects(): Promise<UniversityActiveProject[]> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return UNIVERSITY_ACTIVE_PROJECTS;
}

export async function getCapabilities(): Promise<ResearchCapability[]> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return RESEARCH_CAPABILITIES;
}

export const universityApi = {
  getDashboard,
  getRecommendedChallenges,
  getProjects,
  getCapabilities,
};
