import { IdeaStage } from './ideas';

export type MyIdeaStatus =
  | 'UNDER_REVIEW'
  | 'PUBLISHED'
  | 'ACTIVE_COLLABORATION'
  | 'PROJECT_FORMATION'
  | 'PROJECT_ACTIVE'
  | 'COMPLETED';

export interface ContributorRequest {
  id: string;
  ideaId: string;
  ideaTitle: string;
  contributor: {
    name: string;
    role: string;
    organization?: string;
    avatarInitials: string;
  };
  contributionType: string;
  message: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  createdAt: string;
}

export interface IdeaActivityItem {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  ideaTitle?: string;
  type: 'request' | 'view' | 'publish' | 'review' | 'submission';
}

export interface ProjectReadinessCriteria {
  id: string;
  criterion: string;
  met: boolean;
  note: string;
}

export interface MyIdeaItem {
  id: string;
  referenceId: string;
  title: string;
  category: string;
  district: string;
  block?: string;
  challengeId: string;
  challengeTitle: string;
  submittedAt: string;
  stage: IdeaStage;
  status: MyIdeaStatus;
  statusLabel: string;
  contributorCount: number;
  collaborationRequests: number;
  openNeeds: number;
  hasActionRequired?: boolean;
  actionMessage?: string;
}

export interface ContributorOverviewStats {
  ideasSubmitted: number;
  underReview: number;
  openForCollaboration: number;
  movingTowardProjectFormation: number;
}
