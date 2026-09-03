import { IdeaStage } from './ideas';

export interface ParentChallengeInfo {
  id: string;
  title: string;
  description: string;
  district: string;
  affectedPopulation: string;
  domain: string;
  priority: 'High' | 'Critical' | 'Important';
}

export interface ApproachTrio {
  problem: string;
  approach: string;
  expectedOutcome: string;
}

export interface WorkflowStep {
  stepNumber: string;
  title: string;
  description: string;
  technicalDetail: string;
}

export interface DevelopmentMilestone {
  dateLabel: string;
  title: string;
  description: string;
}

export interface ContributorDetail {
  id: string;
  name: string;
  title: string;
  institution?: string;
  role: string;
  avatarInitials: string;
}

export interface CollaborationOpportunity {
  id: string;
  category: string;
  title: string;
  description: string;
  status: 'OPEN' | 'SEEKING PARTNER';
  priority: 'HIGH' | 'SUPPORTING';
}

export interface RelatedIdeaCard {
  id: string;
  title: string;
  category: string;
  stage: IdeaStage;
  contributorsCount: number;
}

export interface IdeaDetail {
  id: string;
  referenceId: string;
  title: string;
  summary: string;
  category: string;
  district: string;
  block: string;
  stage: IdeaStage;
  stageLabel: string;
  currentFocus: string;
  nextMilestone: string;
  parentChallenge: ParentChallengeInfo;
  proposedApproach: ApproachTrio;
  workflowSteps: WorkflowStep[];
  milestones: DevelopmentMilestone[];
  contributors: ContributorDetail[];
  collaborationNeeds: CollaborationOpportunity[];
  relatedIdeas: RelatedIdeaCard[];
  coordinates?: { lat: number; lng: number };
  submittedDate: string;
  likesCount: number;
}
