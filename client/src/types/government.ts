export interface ExecutiveMetrics {
  challengesSubmitted: number;
  underEvaluation: number;
  ideasProposals: number;
  activeProjects: number;
  participatingInstitutions: number;
  industryPartners: number;
}

export type PriorityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface DistrictActivity {
  district: string;
  challengesCount: number;
  activeProjectsCount: number;
  topDomain: string;
  priority: PriorityLevel;
  leadInstitution: string;
  coordinates: { x: number; y: number };
  statusNote?: string;
}

export interface PipelineStage {
  stage: string;
  count: number;
  percentage: number;
  dropoffRate?: string;
  description: string;
  highlight?: boolean;
}

export interface DomainAnalytics {
  domain: string;
  challengesCount: number;
  percentage: number;
  activeProjectsCount: number;
  priorityConcentration: string; // e.g. "68% High / Critical"
  highlightInsight?: string; // e.g. "Highest volume of reported challenges"
  color: string;
}

export interface ActiveProjectSnapshot {
  id: string;
  projectCode: string;
  title: string;
  domain: string;
  district: string;
  stage: string;
  stageLabel: string;
  leadInstitution: string;
  milestonesCompleted: number;
  milestonesTotal: number;
  health: 'ON_TRACK' | 'NEEDS_ATTENTION' | 'DELAYED';
  healthLabel: string;
}

export interface InstitutionMetric {
  id: string;
  name: string;
  type: 'UNIVERSITY' | 'RESEARCH_ORG' | 'TECHNICAL_INSTITUTE';
  challengesAssigned: number;
  activeTeams: number;
  projectsCount: number;
  researchOutputs: number;
  status: 'HIGH_ACTIVITY' | 'ACTIVE' | 'MODERATE' | 'EMERGING';
  statusLabel: string;
}

export interface IndustryPartnerMetric {
  category: string;
  count: number;
  description: string;
  leadPartners: string[];
}

export interface AttentionItem {
  id: string;
  title: string;
  category: 'CHALLENGES' | 'PROJECTS' | 'PILOTS' | 'DISTRICTS';
  severity: 'CRITICAL' | 'HIGH' | 'WARNING';
  count: number;
  description: string;
  recommendedAction: string;
  actionPrompt: string;
}

export interface EcosystemActivity {
  id: string;
  timestamp: string;
  message: string;
  domain: string;
  district: string;
  type:
    | 'CHALLENGE_VALIDATED'
    | 'TEAM_FORMED'
    | 'PARTNER_JOINED'
    | 'PILOT_MILESTONE'
    | 'GRANT_ALLOCATED';
}

export interface StateImpactSnapshot {
  potentialBeneficiaries: string;
  activeFieldLocations: number;
  researchOutputs: number;
  startupTransferOpps: number;
  projectsInVerification: number;
}
