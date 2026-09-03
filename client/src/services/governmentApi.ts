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
import {
  EXECUTIVE_METRICS,
  DISTRICT_ACTIVITIES,
  CHALLENGE_PIPELINE,
  DOMAIN_ANALYTICS,
  ACTIVE_PROJECTS_SNAPSHOT,
  INSTITUTION_METRICS,
  INDUSTRY_PARTNER_METRICS,
  ATTENTION_ITEMS,
  ECOSYSTEM_ACTIVITIES,
  STATE_IMPACT_SNAPSHOT,
} from '../data/governmentData';

export async function getOverview(): Promise<ExecutiveMetrics> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return EXECUTIVE_METRICS;
}

export async function getDistrictInsights(filterPriority?: string): Promise<DistrictActivity[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  if (!filterPriority || filterPriority === 'ALL') {
    return DISTRICT_ACTIVITIES;
  }
  return DISTRICT_ACTIVITIES.filter((d) => d.priority === filterPriority);
}

export async function getChallengePipeline(): Promise<PipelineStage[]> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return CHALLENGE_PIPELINE;
}

export async function getDomainAnalytics(): Promise<DomainAnalytics[]> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return DOMAIN_ANALYTICS;
}

export async function getActiveProjectsSnapshot(): Promise<ActiveProjectSnapshot[]> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return ACTIVE_PROJECTS_SNAPSHOT;
}

export async function getInstitutionMetrics(): Promise<{
  universities: InstitutionMetric[];
  industry: IndustryPartnerMetric[];
}> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return {
    universities: INSTITUTION_METRICS,
    industry: INDUSTRY_PARTNER_METRICS,
  };
}

export async function getAttentionItems(): Promise<AttentionItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return ATTENTION_ITEMS;
}

export async function getRecentActivity(): Promise<EcosystemActivity[]> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return ECOSYSTEM_ACTIVITIES;
}

export async function getStateImpactSnapshot(): Promise<StateImpactSnapshot> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return STATE_IMPACT_SNAPSHOT;
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
};
