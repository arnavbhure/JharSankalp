export type IdeaStage =
  | 'CONCEPT'
  | 'RESEARCH'
  | 'PROTOTYPE'
  | 'TESTING'
  | 'PILOT'
  | 'IMPLEMENTED';

export type CollaborationStatus =
  | 'OPEN'
  | 'TEAM_FORMED'
  | 'SEEKING_PARTNERS'
  | 'COMPLETED';

export type RoleCategory =
  | 'Engineering'
  | 'Design'
  | 'Research'
  | 'Field Testing'
  | 'Funding'
  | 'Mentorship';

export interface CollaborationNeed {
  id: string;
  roleCategory: RoleCategory;
  label: string;
  description: string;
}

export interface Contributor {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
  institution?: string;
}

export interface IdeaItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  district: string;
  block?: string;
  challengeId: string;
  challengeTitle: string;
  stage: IdeaStage;
  collaborationStatus: CollaborationStatus;
  statusLabel: string;
  contributors: Contributor[];
  needs: CollaborationNeed[];
  submittedDate: string;
  likesCount: number;
  keyInnovations?: string[];
  isFeatured?: boolean;
}

export interface IdeaFilterState {
  search: string;
  category: string;
  stage: string;
  district: string;
  status: string;
}

export interface IdeaStatsData {
  totalIdeas: number;
  activeCollaborations: number;
  prototypesInDevelopment: number;
  fieldPilots: number;
}

export type IdeaStatus =
  | 'New'
  | 'Community Supported'
  | 'Under Review'
  | 'In Development'
  | 'Implemented';

export interface CommunityIdea {
  id: string;
  title: string;
  description: string;
  focusArea: string;
  district: string;
  author: string;
  supportersCount: number;
  contributorsCount: number;
  status: IdeaStatus;
  submittedDate: string;
  isSupported?: boolean;
  linkedChallenge?: string;
  linkedChallengeId?: string;
}
