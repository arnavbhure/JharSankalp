export type ProjectStage =
  'Exploring' | 'Research' | 'Prototyping' | 'Pilot Stage' | 'Implementation';

export interface CollaborationProject {
  id: string;
  title: string;
  description: string;
  focusArea: string;
  district: string;
  stage: ProjectStage;
  teamCount: number;
  progress: number;
  skillsNeeded: string[];
  isJoined?: boolean;
  leadOrg?: string;
  linkedChallenge?: string;
  linkedChallengeId?: string;
  avatars?: string[];
}

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  project: string;
  time: string;
  type: 'member' | 'milestone' | 'document' | 'testing';
}
