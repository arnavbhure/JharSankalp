import {
  IndustryDashboardData,
  RecommendedOpportunity,
  ActiveCommitment,
  IndustryCapability,
} from '../types/industry';
import {
  INDUSTRY_DASHBOARD_DATA,
  RECOMMENDED_OPPORTUNITIES,
  ACTIVE_COMMITMENTS,
  INDUSTRY_CAPABILITIES,
} from '../data/industryData';

export async function getDashboard(): Promise<IndustryDashboardData> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return INDUSTRY_DASHBOARD_DATA;
}

export async function getOpportunities(): Promise<RecommendedOpportunity[]> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return RECOMMENDED_OPPORTUNITIES;
}

export async function getCommitments(): Promise<ActiveCommitment[]> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return ACTIVE_COMMITMENTS;
}

export async function getCapabilities(): Promise<IndustryCapability[]> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return INDUSTRY_CAPABILITIES;
}

export const industryApi = {
  getDashboard,
  getOpportunities,
  getCommitments,
  getCapabilities,
};
