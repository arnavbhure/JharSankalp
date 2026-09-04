import { api } from '../api';
import { CommunityIdea, IdeaStatus, IdeaStage } from '../../types/ideas';

export interface IdeaQueryParams {
  domain?: string;
  district?: string;
  status?: string;
}

export function mapDbIdeaToUi(dbItem: any): CommunityIdea {
  let status: IdeaStatus = 'Community Supported';
  if (dbItem.status === 'IN_COLLABORATION') status = 'In Development';
  else if (dbItem.status === 'IMPLEMENTED') status = 'Implemented';
  else if (dbItem.status === 'UNDER_REVIEW') status = 'Under Review';
  else if (dbItem.status === 'DRAFT') status = 'New';

  return {
    id: dbItem.id,
    title: dbItem.title,
    description: dbItem.description,
    focusArea: dbItem.domain || 'Water Management',
    district: dbItem.district || 'Khunti',
    author: dbItem.authorName || dbItem.submittedBy?.name || 'Civic Innovator',
    supportersCount: dbItem.supportersCount || 95,
    contributorsCount: dbItem.collaboratorsCount || dbItem._count?.collaborations || 5,
    status,
    submittedDate: dbItem.createdAt
      ? new Date(dbItem.createdAt).toISOString().split('T')[0]
      : '2026-02-18',
    isSupported: false,
    linkedChallenge: dbItem.challenge?.title || undefined,
    linkedChallengeId: dbItem.challenge?.publicId || dbItem.relatedChallengeId || undefined,
  };
}

export async function fetchIdeas(params?: IdeaQueryParams): Promise<CommunityIdea[]> {
  const query = new URLSearchParams();
  if (params?.domain && params.domain !== 'All Focus Areas') query.set('domain', params.domain);
  if (params?.district && params.district !== 'All Districts')
    query.set('district', params.district);
  if (params?.status && params.status !== 'All Statuses') query.set('status', params.status);

  const queryString = query.toString();
  const endpoint = queryString ? `/ideas?${queryString}` : '/ideas';
  const rawList = await api.get<any>(endpoint);
  const list = Array.isArray(rawList) ? rawList : rawList?.data || [];
  return list.map(mapDbIdeaToUi);
}

export async function fetchIdeaById(id: string): Promise<any | null> {
  const res = await api.get<any>(`/ideas/${id}`);
  return (res as any)?.data || res;
}

export async function createIdea(data: {
  title: string;
  description: string;
  domain?: string;
  district?: string;
  trlLevel?: number;
  relatedChallengeId?: string;
}): Promise<any> {
  const res = await api.post<any>('/ideas', data);
  return (res as any)?.data || res;
}

import { IdeaDetail } from '../../types/ideaDetail';

export function mapDbIdeaToDetail(db: any): IdeaDetail {
  const authorName = db.submittedBy?.name || db.authorName || 'Civic Innovator';
  const role = db.submittedBy?.role || 'Innovator';
  const challenge = db.challenge;

  const stage: IdeaStage = 
    db.status === 'IMPLEMENTED' ? 'IMPLEMENTED' :
    db.status === 'IN_COLLABORATION' ? 'PILOT' :
    db.status === 'APPROVED' ? 'PROTOTYPE' : 'RESEARCH';

  const stageLabels: Record<string, string> = {
    RESEARCH: 'RESEARCH & DESIGN',
    PROTOTYPE: 'PROTOTYPE DEVELOPMENT',
    PILOT: 'FIELD PILOT',
    IMPLEMENTED: 'FULL IMPLEMENTATION',
  };

  return {
    id: db.id,
    referenceId: (db.id || '').substring(0, 8).toUpperCase(),
    title: db.title || 'Community Idea',
    summary: db.description || '',
    category: db.domain || 'General Innovation',
    district: db.district || challenge?.district?.name || 'Jharkhand',
    block: challenge?.block || 'Field Location',
    stage,
    stageLabel: stageLabels[stage] || 'ACTIVE DEVELOPMENT',
    currentFocus: `Developing and field testing core mechanisms for ${db.domain || 'community improvement'} in ${db.district || 'Jharkhand'}.`,
    nextMilestone: `Field validation and community trial review in ${db.district || 'district'}.`,
    submittedDate: db.createdAt ? new Date(db.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent',
    likesCount: db.supportersCount || 12,
    parentChallenge: {
      id: challenge?.id || 'CHALLENGE-GENERAL',
      title: challenge?.title || 'Community Challenge Alignment',
      description: challenge?.description || 'Grassroots innovation aligned with rural development goals.',
      district: db.district || challenge?.district?.name || 'Jharkhand',
      affectedPopulation: challenge?.affectedPopulation ? `${challenge.affectedPopulation.toLocaleString()}+ Residents` : 'Local Community',
      domain: challenge?.domain || db.domain || 'Civic Technology',
      priority: (challenge?.priority as any) || 'High',
    },
    proposedApproach: {
      problem: challenge?.description?.slice(0, 180) || 'Local challenges require localized, sustainable technological and procedural interventions.',
      approach: db.description || 'Community driven problem-solving method.',
      expectedOutcome: 'Direct service continuity, rapid local response, and transparent community feedback.',
    },
    workflowSteps: [
      {
        stepNumber: '01',
        title: 'Community Needs Sensing',
        description: 'Real-time observation and problem reporting by residents and ground workers.',
        technicalDetail: 'Field data ingestion and contextual validation.',
      },
      {
        stepNumber: '02',
        title: 'Prototype Fabrication',
        description: 'Iterative hardware/software assembly using locally serviceable components.',
        technicalDetail: 'Low-cost rapid prototyping with open standards.',
      },
      {
        stepNumber: '03',
        title: 'Field Deployment & Feedback',
        description: 'Piloting within target blocks with continuous operational monitoring.',
        technicalDetail: 'Telemetry and stakeholder impact logs.',
      },
    ],
    milestones: (db.projects?.[0]?.milestones || []).map((m: any) => ({
      dateLabel: m.targetDate ? new Date(m.targetDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : 'Milestone',
      title: m.title,
      description: m.description || m.status,
    })).concat(
      db.projects?.[0]?.milestones?.length ? [] : [
        {
          dateLabel: 'Phase 1',
          title: 'Proposal & Initial Feasibility',
          description: 'Problem statement verified by local district and technical review team.',
        },
        {
          dateLabel: 'Phase 2',
          title: 'Partner Onboarding',
          description: 'Engaging academic and CSR partners for pilot funding and testing resources.',
        },
      ]
    ),
    contributors: [
      {
        id: db.submittedBy?.id || 'contributor-1',
        name: authorName,
        title: role,
        institution: db.submittedBy?.organization?.name || 'Jharkhand Civic Network',
        role: 'Lead Proposer',
        avatarInitials: authorName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase(),
      },
      ...(db.collaborations?.[0]?.members || []).map((m: any) => ({
        id: m.id || m.userId,
        name: m.user?.name || 'Collaborator',
        title: m.role || 'Contributor',
        institution: m.user?.organization?.name,
        role: m.role || 'Member',
        avatarInitials: (m.user?.name || 'CO').slice(0, 2).toUpperCase(),
      })),
    ],
    collaborationNeeds: [
      {
        id: 'need-1',
        category: 'Field Testing',
        title: 'District Pilot Validation',
        description: 'Seeking field deployment assistance and testing in local conditions.',
        status: 'OPEN',
        priority: 'HIGH',
      },
      {
        id: 'need-2',
        category: 'Engineering',
        title: 'Technical Refinement',
        description: 'Component optimization and durability testing.',
        status: 'SEEKING PARTNER',
        priority: 'SUPPORTING',
      },
    ],
    relatedIdeas: [],
  };
}
