export type SolutionStage =
  'Research' | 'Prototype' | 'Testing' | 'Field Pilot' | 'Deployment' | 'Scaling';

export interface MilestoneItem {
  name: string;
  date: string;
  completed: boolean;
}

export interface SolutionItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  focusArea: string;
  district: string;
  stage: SolutionStage;
  technologyType: string;
  technologyTags: string[];
  progress: number;
  impactSummary: string;
  impactMetrics: string[];
  challengeId: string;
  challengeTitle: string;
  collaborationId?: string;
  collaborationTitle?: string;
  leadPartners: string[];
  milestones: MilestoneItem[];
  nextMilestone: string;
  image?: string;
}

export interface DeploymentStory {
  id: string;
  title: string;
  district: string;
  communitiesReached: string;
  currentStatus: string;
  metric: string;
  focusArea: string;
  description: string;
}
