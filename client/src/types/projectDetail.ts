import { Project } from './projects';

export interface ProjectMember {
  id: string;
  name: string;
  role: string;
  title: string;
  specialty: string;
  institution: string;
  avatarInitials: string;
}

export interface ProjectMilestone {
  id: string;
  phase: string;
  period: string;
  title: string;
  description: string;
  deliverables: string[];
  owner: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING' | 'PLANNED';
}

export interface Workstream {
  id: string;
  title: string;
  description: string;
  progress: string;
  status: string;
  metric: string;
}

export interface Deliverable {
  id: string;
  title: string;
  owner: string;
  status: 'COMPLETED' | 'IN_REVIEW' | 'UPCOMING';
  date: string;
}

export interface FieldImplementationData {
  district: string;
  block: string;
  targetPoints: number;
  installedPoints: number;
  progressPercentage: number;
  communityPartners: number;
  telemetryNotes: string;
}

export interface ProjectDocument {
  id: string;
  title: string;
  type: 'PDF' | 'Technical Document' | 'Dataset';
  date: string;
  size: string;
}

export interface SuccessCriterion {
  label: string;
  baseline: string;
  target: string;
}

export interface ProjectImpactData {
  currentOutputs: Array<{ label: string; value: string | number; desc: string }>;
  targetOutcomes: Array<{ label: string; value: string; desc: string }>;
  evidenceStatus: {
    baselineData: 'COLLECTED' | 'IN_PROGRESS' | 'PENDING';
    pilotData: 'COLLECTED' | 'IN_PROGRESS' | 'PENDING';
    impactValidation: 'COLLECTED' | 'IN_PROGRESS' | 'PENDING';
  };
}

export interface ProjectActivity {
  id: string;
  timestamp: string;
  title: string;
  description: string;
}

export interface ExpressInterestFormData {
  applicantName: string;
  organization: string;
  role: string;
  contributionArea: string;
  message: string;
  contact: string;
}

export interface ProjectDetail extends Project {
  description: string;
  challenge: {
    id: string;
    title: string;
    location: string;
  };
  idea?: {
    id: string;
    title: string;
  };
  mission: {
    problem: string;
    approach: string;
    expectedOutcome: string;
  };
  successCriteria: SuccessCriterion[];
  team: ProjectMember[];
  milestones: ProjectMilestone[];
  workstreams: Workstream[];
  deliverables: Deliverable[];
  fieldImplementation: FieldImplementationData;
  documents: ProjectDocument[];
  impact: ProjectImpactData;
  activity: ProjectActivity[];
}
