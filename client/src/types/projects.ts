export type ProjectStage =
  | 'DISCOVERY'
  | 'DESIGN'
  | 'PROTOTYPE'
  | 'FIELD_PILOT'
  | 'IMPACT_VERIFICATION'
  | 'SCALING';

export type ProjectHealth = 'ON_TRACK' | 'AT_RISK' | 'NEEDS_ATTENTION';

export type PartnerType =
  | 'UNIVERSITY'
  | 'INDUSTRY'
  | 'GOVERNMENT'
  | 'STARTUP'
  | 'RESEARCH_ORG'
  | 'COMMUNITY_ORG';

export interface ProjectPartner {
  id: string;
  name: string;
  type: PartnerType;
  role?: string;
  lead?: boolean;
}

export interface CollaborationNeed {
  id: string;
  type: string;
  description?: string;
  status: 'OPEN' | 'IN_DISCUSSION' | 'FULFILLED';
}

export interface Project {
  id: string;
  projectCode: string;
  title: string;
  summary: string;
  domain: string;
  relatedChallengeId: string;
  relatedChallengeTitle: string;
  relatedIdeaId?: string;
  district: string;
  location: string;
  stage: ProjectStage;
  stageLabel: string;
  health: ProjectHealth;
  healthLabel: string;
  partners: ProjectPartner[];
  potentialBeneficiaries: number;
  collaborationNeeds?: CollaborationNeed[];
  progressPercentage: number;
  startedAt: string;
  featured?: boolean;
  coordinates: { x: number; y: number }; // percentage coordinates on Jharkhand map
  leadInstitution: string;
  impactMetric: string;
  imageUrl?: string;
}

export interface PortfolioStats {
  activeProjects: number;
  universitiesInvolved: number;
  partnerOrganizations: number;
  projectsInFieldPilot: number;
  peopleImpacted: number;
  districtsWithPilots: number;
}

export interface PortfolioActivityItem {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  projectCode?: string;
  projectTitle?: string;
  type: 'pilot' | 'partner' | 'verification' | 'prototype' | 'formation';
}

export interface ProjectFiltersState {
  search: string;
  domain: string;
  district: string;
  stage: string;
  institution: string;
  opportunity: string;
}
