import {
  MyIdeaItem,
  ContributorRequest,
  IdeaActivityItem,
  ProjectReadinessCriteria,
  ContributorOverviewStats,
} from '../types/myIdeas';
import { apiClient } from '../lib/apiClient';

export async function getMyIdeas(filterTab = 'All'): Promise<MyIdeaItem[]> {
  try {
    const dbIdeas = await apiClient.get<any[]>('/ideas/my');
    if (Array.isArray(dbIdeas)) {
      const all: MyIdeaItem[] = dbIdeas.map((item) => {
        let status: MyIdeaItem['status'] = 'UNDER_REVIEW';
        if (item.status === 'PUBLISHED' || item.status === 'VALIDATED') {
          status = 'PUBLISHED';
        } else if (item.status === 'ACTIVE' || item.status === 'ACTIVE_COLLABORATION') {
          status = 'ACTIVE_COLLABORATION';
        } else if (item.status === 'PROJECT_FORMATION' || item.status === 'MATCHING') {
          status = 'PROJECT_FORMATION';
        } else if (item.status === 'PROJECT_ACTIVE') {
          status = 'PROJECT_ACTIVE';
        } else if (item.status === 'COMPLETED' || item.status === 'RESOLVED') {
          status = 'COMPLETED';
        }

        return {
          id: item.id,
          referenceId: `IDEA-${item.id.slice(0, 8).toUpperCase()}`,
          title: item.title,
          category: item.domain || item.challenge?.domain || 'Civic Innovation',
          district: item.district || item.challenge?.district?.name || 'Jharkhand',
          block: '',
          challengeId: item.challenge?.publicId || 'JS-2026-00024',
          challengeTitle: item.challenge?.title || 'Civic Problem',
          submittedAt: new Date(item.createdAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          stage: 'PROTOTYPE',
          status,
          statusLabel: status.replace(/_/g, ' '),
          contributorCount: item._count?.collaborations || 0,
          collaborationRequests: 0,
          openNeeds: 1,
        };
      });

      if (filterTab === 'Under Review') {
        return all.filter((i) => i.status === 'UNDER_REVIEW');
      }
      if (filterTab === 'Published') {
        return all.filter((i) => i.status === 'PUBLISHED');
      }
      if (filterTab === 'Collaborating') {
        return all.filter((i) => i.status === 'ACTIVE_COLLABORATION');
      }
      if (filterTab === 'Project Formation') {
        return all.filter((i) => i.status === 'PROJECT_FORMATION');
      }
      if (filterTab === 'Completed') {
        return all.filter((i) => i.status === 'COMPLETED' || i.status === 'PROJECT_ACTIVE');
      }

      return all;
    }
  } catch (err) {
    console.warn('Failed to fetch personal ideas from API:', err);
  }

  return [];
}

let inMemoryRequests: ContributorRequest[] = [
  {
    id: 'req-1',
    ideaId: 'IDEA-2026-0001',
    ideaTitle: 'Low-Cost IoT Monitoring for Rural Water Pumps',
    contributor: {
      name: 'Ravi Kumar',
      role: 'Student · BIT Sindri',
      organization: 'BIT Sindri IoT Lab',
      avatarInitials: 'RK',
    },
    contributionType: 'Embedded Systems Development',
    message:
      'I have 2 years of experience with ESP32 and SX1276 LoRa transceivers in Jharkhand. I would love to write firmware for the India Mark II pump vibration sensor collar.',
    status: 'PENDING',
    createdAt: '2 hours ago',
  },
  {
    id: 'req-2',
    ideaId: 'IDEA-2026-0003',
    ideaTitle: 'AI-Based Ground Movement Risk Prediction System',
    contributor: {
      name: 'Jharkhand Rural Innovation Lab',
      role: 'Research Organization',
      organization: 'Kolhan Field Network',
      avatarInitials: 'JR',
    },
    contributionType: 'Field Testing Partnership',
    message:
      'We can coordinate borehole sensor placements and drone photogrammetry flights in Jharia abandoned mining wards with local district authorities.',
    status: 'PENDING',
    createdAt: 'Yesterday',
  },
];

export async function getContributorStats(): Promise<ContributorOverviewStats> {
  const ideas = await getMyIdeas();
  return {
    ideasSubmitted: ideas.length,
    underReview: ideas.filter((i) => i.status === 'UNDER_REVIEW').length,
    openForCollaboration: ideas.filter(
      (i) => i.status === 'ACTIVE_COLLABORATION' || i.status === 'PUBLISHED',
    ).length,
    movingTowardProjectFormation: ideas.filter((i) => i.status === 'PROJECT_FORMATION').length,
  };
}

export async function getContributionRequests(): Promise<ContributorRequest[]> {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return inMemoryRequests;
}

export async function respondToContributionRequest(
  requestId: string,
  action: 'ACCEPTED' | 'DECLINED',
): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  inMemoryRequests = inMemoryRequests.map((req) => {
    if (req.id === requestId) {
      return { ...req, status: action };
    }
    return req;
  });

  return true;
}

export async function respondToActionRequired(
  _ideaId: string,
  _replyText: string,
): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return true;
}

export async function getIdeaActivities(): Promise<IdeaActivityItem[]> {
  try {
    const raw = await apiClient.get<any[]>('/activities');
    const activities = Array.isArray(raw) ? raw : (raw as any)?.data || [];
    if (activities.length > 0) {
      return activities.slice(0, 6).map((act: any) => ({
        id: act.id,
        timestamp: new Date(act.createdAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
        }),
        title: act.type?.replace(/_/g, ' ') || 'Activity Recorded',
        description: act.message,
        ideaTitle: 'Civic Innovation Idea',
        type: 'request',
      }));
    }
  } catch (err) {
    console.warn('Failed to load real activities for my ideas:', err);
  }
  return [];
}

export async function getIdeaUpdates(): Promise<
  Array<{ id: string; text: string; time: string; link?: string }>
> {
  try {
    const raw = await apiClient.get<any[]>('/activities');
    const activities = Array.isArray(raw) ? raw : (raw as any)?.data || [];
    if (activities.length > 0) {
      return activities.slice(0, 4).map((act: any) => ({
        id: act.id,
        text: act.message,
        time: new Date(act.createdAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
        }),
        link: '/my-ideas',
      }));
    }
  } catch (err) {
    console.warn('Failed to load idea updates from /activities:', err);
  }
  return [];
}

export async function getProjectReadiness(_ideaId: string): Promise<ProjectReadinessCriteria[]> {
  await new Promise((resolve) => setTimeout(resolve, 60));
  return [
    {
      id: 'pr-1',
      criterion: 'Clear problem connection',
      met: true,
      note: 'Anchored to Challenge JS-2026-00024 with 2,000+ residents verified.',
    },
    {
      id: 'pr-2',
      criterion: 'Defined solution approach',
      met: true,
      note: 'Piezoelectric vibration transducer and LoRa mesh architecture drafted.',
    },
    {
      id: 'pr-3',
      criterion: 'Active contributors squad',
      met: true,
      note: '6 multidisciplinary members across hardware, telemetry, and community.',
    },
    {
      id: 'pr-4',
      criterion: 'Development stage identified',
      met: true,
      note: 'Prototype stage validated in laboratory bench cycles.',
    },
    {
      id: 'pr-5',
      criterion: 'Institution or faculty mentor needed',
      met: false,
      note: 'Seeking formal endorsement from Birsa Agricultural University or NIT Jamshedpur.',
    },
  ];
}
