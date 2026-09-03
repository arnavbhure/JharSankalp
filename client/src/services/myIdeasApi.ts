import {
  MyIdeaItem,
  ContributorRequest,
  IdeaActivityItem,
  ProjectReadinessCriteria,
  ContributorOverviewStats,
} from '../types/myIdeas';
import { getMySubmittedIdeas } from './ideaSubmissionApi';

const SEED_MY_IDEAS: MyIdeaItem[] = [
  {
    id: 'IDEA-2026-0001',
    referenceId: 'IDEA-2026-0042',
    title: 'Low-Cost IoT Monitoring for Rural Water Pumps',
    category: 'Water Management',
    district: 'Khunti',
    block: 'Murhu Block',
    challengeId: 'JS-2026-00024',
    challengeTitle: 'Frequent Breakdown of Drinking Water Pumps in Murhu Block',
    submittedAt: '10 March 2026',
    stage: 'PROTOTYPE',
    status: 'ACTIVE_COLLABORATION',
    statusLabel: 'ACTIVE COLLABORATION',
    contributorCount: 6,
    collaborationRequests: 2,
    openNeeds: 3,
  },
  {
    id: 'IDEA-2026-0003',
    referenceId: 'IDEA-2026-0038',
    title: 'AI-Based Ground Movement Risk Prediction System',
    category: 'Mining Safety',
    district: 'Dhanbad',
    block: 'Jharia Sector',
    challengeId: 'JS-2024-00003',
    challengeTitle: 'Early Detection of Ground Subsidence in Mining Areas',
    submittedAt: '15 February 2026',
    stage: 'RESEARCH',
    status: 'UNDER_REVIEW',
    statusLabel: 'UNDER REVIEW',
    contributorCount: 8,
    collaborationRequests: 1,
    openNeeds: 2,
    hasActionRequired: true,
    actionMessage:
      'A university research team from IIT ISM Dhanbad has requested additional details about your proposed seismic transducer frequency thresholds.',
  },
  {
    id: 'IDEA-2026-0004',
    referenceId: 'IDEA-2026-0029',
    title: 'Offline Digital Learning Kits for Remote Schools',
    category: 'Education',
    district: 'West Singhbhum',
    block: 'Manoharpur Block',
    challengeId: 'JS-2026-00017',
    challengeTitle: 'Poor Mobile Connectivity in Remote Villages',
    submittedAt: '20 January 2026',
    stage: 'TESTING',
    status: 'PUBLISHED',
    statusLabel: 'PUBLISHED',
    contributorCount: 3,
    collaborationRequests: 0,
    openNeeds: 2,
  },
  {
    id: 'IDEA-2026-0006',
    referenceId: 'IDEA-2025-0187',
    title: 'Community Waste Segregation Tracking Platform',
    category: 'Environment',
    district: 'Ranchi',
    block: 'Namkum Ward',
    challengeId: 'JS-2025-00182',
    challengeTitle: 'Unsafe Waste Disposal Near Residential Areas',
    submittedAt: '12 January 2026',
    stage: 'PILOT',
    status: 'PROJECT_FORMATION',
    statusLabel: 'PROJECT FORMATION',
    contributorCount: 8,
    collaborationRequests: 0,
    openNeeds: 1,
  },
];

let inMemoryMyIdeas = [...SEED_MY_IDEAS];

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

const SEED_ACTIVITIES: IdeaActivityItem[] = [
  {
    id: 'act-1',
    timestamp: 'TODAY',
    title: 'New Contribution Request',
    description: 'Ravi Kumar requested to contribute embedded systems expertise.',
    ideaTitle: 'Low-Cost IoT Monitoring for Rural Water Pumps',
    type: 'request',
  },
  {
    id: 'act-2',
    timestamp: 'YESTERDAY',
    title: 'Institutional Inspection',
    description: 'Your idea dossier was reviewed by BIT Sindri Innovation Centre.',
    ideaTitle: 'Low-Cost IoT Monitoring for Rural Water Pumps',
    type: 'view',
  },
  {
    id: 'act-3',
    timestamp: '3 DAYS AGO',
    title: 'Idea Published for Collaboration',
    description:
      'Passed initial triage and opened for student & research contributor applications.',
    ideaTitle: 'Low-Cost IoT Monitoring for Rural Water Pumps',
    type: 'publish',
  },
  {
    id: 'act-4',
    timestamp: '6 DAYS AGO',
    title: 'Peer Review Completed',
    description: 'Field feasibility verified by District Jal Samiti technical panel.',
    ideaTitle: 'Low-Cost IoT Monitoring for Rural Water Pumps',
    type: 'review',
  },
  {
    id: 'act-5',
    timestamp: '8 DAYS AGO',
    title: 'Idea Docket Registered',
    description: 'Idea submitted and anchored to Challenge JS-2026-00024.',
    ideaTitle: 'Low-Cost IoT Monitoring for Rural Water Pumps',
    type: 'submission',
  },
];

export async function getMyIdeas(filterTab = 'All'): Promise<MyIdeaItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Merge with locally submitted ideas
  const localList = getMySubmittedIdeas();
  const transformedLocal: MyIdeaItem[] = localList.map((item: any) => ({
    id: item.referenceId,
    referenceId: item.referenceId,
    title: item.title,
    category: item.formData?.challenge?.category || 'Civic Innovation',
    district: item.formData?.challenge?.district || 'Ranchi',
    block: item.formData?.challenge?.block || '',
    challengeId: item.formData?.challenge?.id || 'JS-GEN',
    challengeTitle: item.challengeTitle,
    submittedAt: item.submittedDate || 'Recently',
    stage: item.formData?.stage || 'CONCEPT',
    status: 'UNDER_REVIEW',
    statusLabel: 'UNDER REVIEW',
    contributorCount: 1,
    collaborationRequests: 0,
    openNeeds: (item.formData?.collaborationNeeds || []).length || 2,
  }));

  // Combine de-duplicated by ID
  const all = [...inMemoryMyIdeas];
  transformedLocal.forEach((loc) => {
    if (!all.some((i) => i.id === loc.id)) {
      all.unshift(loc);
    }
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

  if (action === 'ACCEPTED') {
    // Increment contributor count on matching idea
    const target = inMemoryRequests.find((r) => r.id === requestId);
    if (target) {
      inMemoryMyIdeas = inMemoryMyIdeas.map((idea) => {
        if (idea.id === target.ideaId) {
          return {
            ...idea,
            contributorCount: idea.contributorCount + 1,
            collaborationRequests: Math.max(0, idea.collaborationRequests - 1),
          };
        }
        return idea;
      });
    }
  }

  return true;
}

export async function respondToActionRequired(
  ideaId: string,
  _replyText: string,
): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  inMemoryMyIdeas = inMemoryMyIdeas.map((idea) => {
    if (idea.id === ideaId) {
      return { ...idea, hasActionRequired: false, actionMessage: undefined };
    }
    return idea;
  });
  return true;
}

export async function getIdeaActivities(): Promise<IdeaActivityItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 60));
  return SEED_ACTIVITIES;
}

export async function getIdeaUpdates(): Promise<
  Array<{ id: string; text: string; time: string; link?: string }>
> {
  await new Promise((resolve) => setTimeout(resolve, 60));
  return [
    {
      id: 'up-1',
      text: 'Your idea received a new contribution request from Ravi Kumar.',
      time: '2 hours ago',
      link: '/my-ideas',
    },
    {
      id: 'up-2',
      text: 'BIT Sindri Innovation Centre viewed your IoT water pump docket.',
      time: 'Yesterday',
      link: '/ideas/IDEA-2026-0001',
    },
    {
      id: 'up-3',
      text: 'Your idea is now published for cross-disciplinary collaboration.',
      time: '3 days ago',
      link: '/ideas/IDEA-2026-0001',
    },
  ];
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
