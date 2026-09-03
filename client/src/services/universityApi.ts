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

export async function getDashboard(): Promise<UniversityDashboardData> {
  await new Promise((resolve) => setTimeout(resolve, 40));
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
