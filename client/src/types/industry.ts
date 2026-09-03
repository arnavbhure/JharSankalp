export interface IndustryProfile {
  name: string;
  tagline: string;
  description: string;
  activeCommitments: number;
  collaborationOpportunities: number;
  projectsSupported: number;
}

export interface IndustryOpportunityMetrics {
  seekingTechnicalSupport: number;
  prototypeOpportunities: number;
  fieldPilotsSeekingPartners: number;
  highPriorityRequests: number;
}

export interface RecommendedOpportunity {
  id: string;
  projectId: string;
  projectCode: string;
  title: string;
  domain: string;
  need: string;
  requiredCapability: string;
  stage: string;
  stageLabel: string;
  location: string;
  urgency: 'URGENT' | 'HIGH' | 'NORMAL';
}

export interface ActiveCommitment {
  id: string;
  projectId: string;
  projectCode: string;
  projectTitle: string;
  domain: string;
  contribution: string;
  partnerRole: string;
  status: 'ACTIVE' | 'IN_DELIVERY' | 'SCHEDULED';
  leadInstitution: string;
}

export interface IndustryCapability {
  id: string;
  title: string;
  category: string;
  description: string;
  offeredResources: string[];
}

export interface CollaborationPipelineStage {
  stage: string;
  label: string;
  count: number;
  description: string;
  highlight?: boolean;
}

export interface IndustryActivity {
  id: string;
  timestamp: string;
  message: string;
  domain: string;
}

export interface IndustryDashboardData {
  profile: IndustryProfile;
  metrics: IndustryOpportunityMetrics;
  opportunities: RecommendedOpportunity[];
  commitments: ActiveCommitment[];
  capabilities: IndustryCapability[];
  pipeline: CollaborationPipelineStage[];
  activities: IndustryActivity[];
}
