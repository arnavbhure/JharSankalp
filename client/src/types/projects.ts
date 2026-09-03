export type ProjectStage =
  | 'FORMATION'
  | 'RESEARCH_DESIGN'
  | 'PROTOTYPE'
  | 'FIELD_PILOT'
  | 'IMPLEMENTATION'
  | 'IMPACT_VERIFICATION';

export type ProjectStatus =
  | 'ACTIVE'
  | 'ON_HOLD'
  | 'COMPLETED'
  | 'ARCHIVED';

export type ProjectHealth = 'ON_TRACK' | 'AT_RISK' | 'NEEDS_ATTENTION';

export type PartnerType =
  | 'UNIVERSITY'
  | 'INDUSTRY'
  | 'STARTUP'
  | 'GOVERNMENT'
  | 'COMMUNITY'
  | 'RESEARCH_ORGANIZATION'
  | 'RESEARCH_ORG'
  | 'COMMUNITY_ORG';

export interface ProjectPartner {
  id: string;
  name: string;
  type: PartnerType;
  role: string;
  lead?: boolean;
}

export interface MilestoneProgress {
  completed: number;
  total: number;
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
  description: string;
  oneLineDescription: string;
  summary?: string;

  challengeId?: string;
  challengeTitle?: string;
  relatedChallengeId?: string;
  relatedChallengeTitle?: string;
  ideaId?: string;
  relatedIdeaId?: string;

  domain: string;

  district: string;
  block?: string;
  location: string;
  locationDisplay: string;

  stage: ProjectStage;
  stageLabel: string;
  status: ProjectStatus;
  health: ProjectHealth;
  healthLabel: string;

  partners: ProjectPartner[];

  beneficiaries?: number;
  potentialBeneficiaries: number;
  impactMetric: string;

  milestoneProgress: MilestoneProgress;
  progressPercentage: number;
  collaborationNeeds?: CollaborationNeed[];

  coordinates: { x: number; y: number }; // Percentage for interactive SVG map

  featured?: boolean;
  leadInstitution: string;
  createdAt: string;
  startedAt: string;
  imageUrl?: string;
}

export interface ProjectActivityItem {
  id: string;
  timestamp: string; // e.g., "TODAY", "YESTERDAY", "2 DAYS AGO", "4 DAYS AGO"
  projectTitle: string;
  projectId: string;
  activity: string;
  stage: ProjectStage;
  stageLabel: string;
}

export interface PortfolioStats {
  activeProjects: number;
  universitiesInvolved: number;
  partnerOrganizations: number;
  projectsInFieldPilot: number;
  peopleImpacted: number;
  districtsWithPilots: number;
}

export interface PortfolioMetrics {
  activeProjects: number;
  universitiesEngaged: number;
  partnersCount: number;
  districtsReached: number;
  peopleImpacted: string; // e.g. "32,000+"
  impactCategories: {
    people: string;
    communities: number;
    innovation: number;
    knowledge: number;
    economic: number;
  };
}

export interface ProjectFiltersState {
  search: string;
  domain: string;
  district: string;
  stage: string;
  institution: string;
  impactArea?: string;
  opportunity?: string;
}

export interface StageCount {
  stage: ProjectStage;
  stepNumber: string;
  label: string;
  count: number;
}

export interface PortfolioActivityItem {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  projectCode?: string;
  projectTitle?: string;
  type?: 'pilot' | 'partner' | 'verification' | 'prototype' | 'formation';
}
