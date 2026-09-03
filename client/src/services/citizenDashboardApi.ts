import {
  UserChallenge,
  ActivityItem,
  CitizenNotification,
  DashboardStats,
  CitizenLifecycleStage,
} from '../types/citizenDashboard';

const DEMO_CHALLENGES: UserChallenge[] = [
  {
    id: 'JS-2026-00024',
    referenceId: 'JS-2026-00024',
    title: 'Frequent Breakdown of Drinking Water Pumps in Murhu Block',
    category: 'Water Management',
    district: 'Khunti',
    block: 'Murhu Block',
    submittedDate: '12 March 2026',
    status: 'UNDER_REVIEW',
    statusLabel: 'UNDER REVIEW',
    currentStage: 'Review',
    collaboratorsCount: 3,
    ideasCount: 2,
    description:
      'During dry months, 4 out of 5 handpumps in Ward 3 and 4 run dry or suffer valve mechanical failures, forcing over 400 households to rely on unverified open pit wells.',
    actionRequired: {
      id: 'req-01',
      question:
        'Could you provide additional information about how frequently the pumps stop working and approximately how many households are affected?',
      requestedAt: '2 days ago',
      responded: false,
      reviewerRole: 'Jharkhand Water Security Working Group',
    },
  },
  {
    id: 'JS-2026-00017',
    referenceId: 'JS-2026-00017',
    title: 'Poor Mobile Connectivity in Remote Villages',
    category: 'Digital Infrastructure',
    district: 'West Singhbhum',
    block: 'Manoharpur Block',
    submittedDate: '24 February 2026',
    status: 'MATCHED',
    statusLabel: 'MATCHED WITH INSTITUTION',
    currentStage: 'Match',
    collaboratorsCount: 8,
    ideasCount: 5,
    description:
      'Fiber optic and cellular towers stop 18 km before forest hamlets, disrupting remote health emergency calls and student digital curriculum access.',
  },
  {
    id: 'JS-2025-00182',
    referenceId: 'JS-2025-00182',
    title: 'Unsafe Waste Disposal Near Residential Areas',
    category: 'Environment',
    district: 'Ranchi',
    block: 'Namkum Block',
    submittedDate: '10 December 2025',
    status: 'SOLUTION_IN_PROGRESS',
    statusLabel: 'SOLUTION IN PROGRESS',
    currentStage: 'Solution',
    collaboratorsCount: 15,
    ideasCount: 9,
    description:
      'Unsegregated municipal trash dumping along the Subarnarekha river embankment creates recurring air toxic smoke from spontaneous combustion and ground seepage.',
  },
];

const DEMO_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    timeframeLabel: 'TODAY',
    dateStr: '14 March 2026',
    text: 'Your challenge was reviewed by the Jharkhand Innovation Team and tagged for rural water infrastructure priority.',
    challengeId: 'JS-2026-00024',
    challengeTitle: 'Frequent Breakdown of Drinking Water Pumps',
    type: 'review',
  },
  {
    id: 'act-2',
    timeframeLabel: '2 DAYS AGO',
    dateStr: '12 March 2026',
    text: 'Additional information was requested for your water infrastructure challenge regarding pump failure frequency.',
    challengeId: 'JS-2026-00024',
    challengeTitle: 'Frequent Breakdown of Drinking Water Pumps',
    type: 'request',
  },
  {
    id: 'act-3',
    timeframeLabel: '6 DAYS AGO',
    dateStr: '8 March 2026',
    text: 'Your challenge was categorized under Water Management and matched with the Ranchi Regional Water Desk.',
    challengeId: 'JS-2026-00024',
    challengeTitle: 'Frequent Breakdown of Drinking Water Pumps',
    type: 'categorization',
  },
  {
    id: 'act-4',
    timeframeLabel: '12 DAYS AGO',
    dateStr: '2 March 2026',
    text: 'Challenge submitted successfully and registered under tracking dossier JS-2026-00024.',
    challengeId: 'JS-2026-00024',
    challengeTitle: 'Frequent Breakdown of Drinking Water Pumps',
    type: 'submission',
  },
];

const DEMO_NOTIFICATIONS: CitizenNotification[] = [
  {
    id: 'notif-1',
    title: 'Institution matching has started for "Poor Mobile Connectivity in Remote Villages"',
    timeAgo: '2 hours ago',
    read: false,
    challengeId: 'JS-2026-00017',
  },
  {
    id: 'notif-2',
    title:
      'Your additional field observation details have been forwarded to the technical review team.',
    timeAgo: 'Yesterday',
    read: true,
    challengeId: 'JS-2026-00024',
  },
];

import { api } from './api';

// In-memory store for dynamic response updates during session
let inMemoryChallenges = [...DEMO_CHALLENGES];

export async function getUserChallenges(): Promise<UserChallenge[]> {
  try {
    const dbChallenges = await api.get<any[]>('/challenges');
    if (Array.isArray(dbChallenges) && dbChallenges.length > 0) {
      const mapped: UserChallenge[] = dbChallenges.map((ch) => {
        let stage: CitizenLifecycleStage = 'Submitted';
        let statusLabel = 'SUBMITTED';

        if (ch.status === 'UNDER_REVIEW') {
          stage = 'Review';
          statusLabel = 'UNDER REVIEW';
        } else if (ch.status === 'VALIDATED' || ch.status === 'MATCHED') {
          stage = 'Match';
          statusLabel = 'VALIDATED';
        } else if (
          ch.status === 'ACTIVE' ||
          ch.status === 'IN_PROGRESS' ||
          ch.status === 'SOLUTION_IN_PROGRESS'
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

      const existingRefs = new Set(mapped.map((m) => m.referenceId));
      const filteredDemo = inMemoryChallenges.filter((d) => !existingRefs.has(d.referenceId));

      return [...mapped, ...filteredDemo];
    }
  } catch (err) {
    console.warn('Backend challenges unreachable, using local demo data:', err);
  }

  return [...inMemoryChallenges];
}

export async function getDashboardStats(): Promise<DashboardStats> {
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
    actionRequired: challenges.filter((c) => c.actionRequired && !c.actionRequired.responded)
      .length,
  };
}

export async function getRecentActivity(): Promise<ActivityItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [...DEMO_ACTIVITIES];
}

export async function getNotifications(): Promise<CitizenNotification[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [...DEMO_NOTIFICATIONS];
}

export async function submitReviewerResponse(
  challengeId: string,
  responseText: string,
): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 350));
  inMemoryChallenges = inMemoryChallenges.map((c) => {
    if (c.id === challengeId && c.actionRequired) {
      return {
        ...c,
        actionRequired: {
          ...c.actionRequired,
          responded: true,
          responseText,
        },
      };
    }
    return c;
  });
  return true;
}
