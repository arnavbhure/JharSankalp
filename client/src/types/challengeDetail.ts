import { ChallengeCategory } from './challenges';

export interface EvidenceItem {
  year: string;
  dateStr: string;
  observation: string;
  sourceType: string;
  verified: boolean;
  docketId?: string;
}

export interface SolutionApproach {
  number: string;
  title: string;
  description: string;
  status: 'Under Discussion' | 'Research Needed';
  feasibilityNotes: string;
  potentialPartners: string[];
}

export interface StakeholderPartner {
  name: string;
  role: string;
  organizationType: 'University' | 'Industry' | 'Community' | 'Government';
  leadContact?: string;
  contributionArea: string;
}

export interface StakeholderCategory {
  categoryName: string;
  description: string;
  partners: StakeholderPartner[];
}

export interface LifecycleStageItem {
  stage: 'Identify' | 'Validate' | 'Research' | 'Build' | 'Pilot' | 'Impact';
  status: 'completed' | 'current' | 'upcoming';
  label: string;
  summary: string;
  completedDate?: string;
}

export interface ChallengeDetailData {
  id: string;
  title: string;
  category: ChallengeCategory;
  district: string;
  subLocation: string;
  locationCoordinates: {
    lat: number;
    lon: number;
    formatted: string;
    zoneName: string;
  };
  status: string;
  impactPriority: string;
  summary: string;
  problem: {
    background: string;
    currentSituation: string;
    whyExistingApproachesNotEnough: string;
  };
  profile: {
    district: string;
    focusArea: ChallengeCategory;
    primaryStakeholders: string[];
    dateSubmitted: string;
    adminDepartment: string;
    trackingId: string;
  };
  impactMetrics: {
    affectedResidents: string;
    highRiskLocations: string;
    communitiesInvolved: string;
    statement: string;
  };
  evidenceTimeline: EvidenceItem[];
  solutionApproaches: SolutionApproach[];
  stakeholders: StakeholderCategory[];
  lifecycleStages: LifecycleStageItem[];
  stats: {
    collaboratorsCount: number;
    ideasCount: number;
    followersCount: number;
  };
  relatedChallengeIds: string[];
  evidenceFiles?: Array<{
    id: string;
    type: string;
    url: string;
    filename: string;
    mimeType: string;
    sizeBytes?: number;
    metadata?: any;
    createdAt?: string;
  }>;
}
