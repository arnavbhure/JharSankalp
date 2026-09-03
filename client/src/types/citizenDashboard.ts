export type CitizenLifecycleStage = 'Submitted' | 'Review' | 'Match' | 'Collaboration' | 'Solution';

export type CitizenChallengeStatus =
  'UNDER_REVIEW' | 'MATCHED' | 'IN_COLLABORATION' | 'SOLUTION_IN_PROGRESS' | 'COMPLETED';

export interface ReviewerRequest {
  id: string;
  question: string;
  requestedAt: string;
  responded: boolean;
  responseText?: string;
  reviewerRole: string;
}

export interface UserChallenge {
  id: string;
  referenceId: string;
  title: string;
  category: string;
  district: string;
  block: string;
  submittedDate: string;
  status: CitizenChallengeStatus;
  statusLabel: string;
  currentStage: CitizenLifecycleStage;
  actionRequired?: ReviewerRequest;
  collaboratorsCount: number;
  ideasCount: number;
  description: string;
}

export interface ActivityItem {
  id: string;
  timeframeLabel: string; // e.g. "TODAY", "2 DAYS AGO"
  dateStr: string;
  text: string;
  challengeId: string;
  challengeTitle: string;
  type: 'review' | 'request' | 'categorization' | 'submission' | 'match';
}

export interface CitizenNotification {
  id: string;
  title: string;
  timeAgo: string;
  read: boolean;
  challengeId?: string;
}

export interface DashboardStats {
  totalSubmitted: number;
  underReview: number;
  inCollaboration: number;
  actionRequired: number;
}
