import { ProjectHealth, ProjectStage } from './projects';

export type WorkspaceTabId =
  | 'overview'
  | 'roadmap'
  | 'work'
  | 'team'
  | 'deliverables'
  | 'documents'
  | 'updates'
  | 'impact';

export type UserRole =
  | 'project_lead'
  | 'faculty_mentor'
  | 'researcher'
  | 'student_contributor'
  | 'industry_partner'
  | 'government_partner'
  | 'viewer';

export interface WorkspaceContext {
  projectId: string;
  projectCode: string;
  title: string;
  domain: string;
  location: string;
  stage: ProjectStage;
  stageLabel: string;
  health: ProjectHealth;
  healthLabel: string;
  progressPercentage: number;
  leadInstitution: string;
  currentUserRole: UserRole;
  currentUserName: string;
}

export type WorkStatus =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'IN_REVIEW'
  | 'COMPLETED'
  | 'BLOCKED';

export interface WorkItemComment {
  id: string;
  authorName: string;
  authorRole: string;
  content: string;
  createdAt: string;
}

export interface WorkItem {
  id: string;
  workstreamId: string;
  title: string;
  description: string;
  status: WorkStatus;
  progress: number;
  ownerName: string;
  ownerRole: string;
  dueDate: string;
  deliverablesCount?: number;
  comments: WorkItemComment[];
}

export type WorkstreamStatus = 'ACTIVE' | 'IN_REVIEW' | 'COMPLETED' | 'PAUSED';

export interface WorkspaceWorkstream {
  id: string;
  title: string;
  description: string;
  status: WorkstreamStatus;
  progressText: string;
  metric: string;
  items: WorkItem[];
}

export type MilestoneStatus =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'UNDER_REVIEW'
  | 'COMPLETED'
  | 'BLOCKED'
  | 'UPCOMING'
  | 'PLANNED';

export interface WorkspaceMilestone {
  id: string;
  phase: string;
  period: string;
  title: string;
  description: string;
  status: MilestoneStatus;
  progress: number;
  startDate: string;
  targetDate: string;
  deliverables: string[];
  owner: string;
}

export type DeliverableStatus =
  | 'DRAFT'
  | 'IN_PROGRESS'
  | 'UNDER_REVIEW'
  | 'REVISION_REQUIRED'
  | 'APPROVED'
  | 'COMPLETED';

export interface DeliverableComment {
  id: string;
  author: string;
  role: string;
  text: string;
  date: string;
}

export interface WorkspaceDeliverable {
  id: string;
  title: string;
  description: string;
  milestoneTitle: string;
  owner: string;
  status: DeliverableStatus;
  lastUpdated: string;
  version: string;
  documentLink?: string;
  comments: DeliverableComment[];
}

export type TeamRoleCategory =
  | 'LEADERSHIP'
  | 'RESEARCH_DEV'
  | 'FIELD_IMPLEMENTATION'
  | 'PARTNER_CONTRIBUTORS';

export interface WorkspaceTeamMember {
  id: string;
  name: string;
  roleCategory: TeamRoleCategory;
  roleTitle: string;
  institution: string;
  areaOfContribution: string;
  currentWorkload: 'Normal' | 'High' | 'Light';
  avatarInitials: string;
}

export type DocumentCategory =
  | 'Research'
  | 'Technical'
  | 'Field Operations'
  | 'Reports'
  | 'Data'
  | 'Administration';

export interface WorkspaceDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  type: 'PDF' | 'Technical Document' | 'Dataset';
  uploadedBy: string;
  uploadDate: string;
  size: string;
}

export type UpdateType =
  | 'progress'
  | 'field_observation'
  | 'decision'
  | 'issue'
  | 'announcement';

export interface WorkspaceUpdate {
  id: string;
  type: UpdateType;
  title: string;
  content: string;
  authorName: string;
  authorRole: string;
  createdAt: string;
  resolved?: boolean;
  commentsCount?: number;
}

export interface EvidenceRecord {
  id: string;
  source: string;
  date: string;
  collectedBy: string;
  verificationStatus: 'VERIFIED' | 'PRELIMINARY' | 'AUDIT_PENDING';
  notes: string;
}

export interface ImpactIndicator {
  id: string;
  title: string;
  metricType: 'Pump Downtime' | 'Response Time' | 'Water Points' | 'Community Beneficiaries';
  baseline: string;
  current: string;
  target: string;
  evidence: EvidenceRecord[];
}

export interface PriorityItem {
  id: string;
  level: 'HIGH_PRIORITY' | 'REVIEW_REQUIRED' | 'UPCOMING';
  title: string;
  owner: string;
  dueDate: string;
  actionText?: string;
}

export interface WorkspaceActivityEvent {
  id: string;
  author: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface WorkspaceData {
  context: WorkspaceContext;
  priorities: PriorityItem[];
  recentActivities: WorkspaceActivityEvent[];
  workstreams: WorkspaceWorkstream[];
  milestones: WorkspaceMilestone[];
  deliverables: WorkspaceDeliverable[];
  teamMembers: WorkspaceTeamMember[];
  documents: WorkspaceDocument[];
  updates: WorkspaceUpdate[];
  impactIndicators: ImpactIndicator[];
}
