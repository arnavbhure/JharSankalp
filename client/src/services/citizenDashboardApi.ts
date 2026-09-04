import {
  UserChallenge,
  ActivityItem,
  CitizenNotification,
  DashboardStats,
  CitizenLifecycleStage,
} from '../types/citizenDashboard';
import { apiClient } from '../lib/apiClient';

export async function getUserChallenges(): Promise<UserChallenge[]> {
  try {
    const dbChallenges = await apiClient.get<any[]>('/challenges/my');
    if (Array.isArray(dbChallenges)) {
      return dbChallenges.map((ch) => {
        let stage: CitizenLifecycleStage = 'Submitted';
        let statusLabel = 'SUBMITTED';

        if (ch.status === 'UNDER_REVIEW' || ch.status === 'UNDER_VALIDATION') {
          stage = 'Review';
          statusLabel = 'UNDER REVIEW';
        } else if (ch.status === 'VALIDATED' || ch.status === 'MATCHED') {
          stage = 'Match';
          statusLabel = 'VALIDATED';
        } else if (
          ch.status === 'ACTIVE' ||
          ch.status === 'IN_PROGRESS' ||
          ch.status === 'SOLUTION_IN_PROGRESS' ||
          ch.status === 'CONSORTIUM_FORMED'
        ) {
          stage = 'Solution';
          statusLabel = 'SOLUTION IN PROGRESS';
        } else if (ch.status === 'RESOLVED') {
          stage = 'Solution';
          statusLabel = 'RESOLVED';
        }

        return {
          id: ch.publicId || ch.challengeCode || ch.id,
          referenceId: ch.publicId || ch.challengeCode || ch.id,
          title: ch.title,
          category: ch.domain || 'Civic Problem',
          district:
            ch.district?.name || (typeof ch.district === 'string' ? ch.district : 'Jharkhand'),
          block: ch.block || 'Local Block',
          submittedDate: new Date(ch.createdAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          status: ch.status as any,
          statusLabel,
          currentStage: stage,
          collaboratorsCount: ch._count?.collaborations || ch.collaborations?.length || 0,
          ideasCount: ch._count?.ideas || ch.ideas?.length || 0,
          description: ch.description,
        };
      });
    }
  } catch (err) {
    console.warn('Failed to fetch personal challenges from API:', err);
  }

  return [];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const data = await apiClient.get<any>('/dashboard/citizen');
    if (data && data.stats) {
      return data.stats;
    }
  } catch (err) {
    console.warn('Failed to fetch citizen dashboard stats from API:', err);
  }

  const challenges = await getUserChallenges();
  return {
    totalSubmitted: challenges.length,
    underReview: challenges.filter((c) => c.status === 'UNDER_REVIEW').length,
    inCollaboration: challenges.filter(
      (c) =>
        c.status === 'IN_COLLABORATION' ||
        c.status === 'MATCHED' ||
        c.status === 'SOLUTION_IN_PROGRESS',
    ).length,
    actionRequired: 0,
  };
}

export async function getRecentActivity(): Promise<ActivityItem[]> {
  try {
    const data = await apiClient.get<any>('/dashboard/citizen');
    if (data && Array.isArray(data.activities) && data.activities.length > 0) {
      return data.activities.map((a: any) => ({
        id: a.id,
        timestamp: new Date(a.createdAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
        }),
        title: a.type?.replace(/_/g, ' ') || 'Activity recorded',
        description: a.message,
        stage: 'Review' as const,
      }));
    }
  } catch (err) {
    console.warn('Failed to fetch citizen activities from API:', err);
  }

  return [];
}

export async function getNotifications(): Promise<CitizenNotification[]> {
  return [];
}

export async function submitReviewerResponse(
  _challengeId: string,
  _responseText: string,
): Promise<boolean> {
  return true;
}
