export type AffectedGroup =
  | 'Residents'
  | 'Farmers'
  | 'Students'
  | 'Women'
  | 'Children'
  | 'Elderly Citizens'
  | 'Persons with Disabilities'
  | 'Workers'
  | 'Small Businesses'
  | 'Entire Community'
  | 'Other';

export type NoticeTimeframe =
  | 'Recently'
  | 'A few months ago'
  | 'More than a year ago'
  | 'It has existed for several years';

export type EstimatedAffectedPopulation =
  | 'Less than 50'
  | '50 – 500'
  | '500 – 2,000'
  | '2,000 – 10,000'
  | 'More than 10,000'
  | 'Not sure';

export type ProblemFrequency =
  | 'One-time issue'
  | 'Occasional'
  | 'Frequent'
  | 'Daily / Ongoing';

export type SeverityLevel =
  | 'Needs attention'
  | 'Important'
  | 'Urgent'
  | 'Critical'
  | 'Not sure';

export type PreviousAttempts = 'Yes' | 'No' | "I'm not sure";

export interface EvidenceFile {
  id: string;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  uploadedAt: string;
}

export interface AIAssistSuggestion {
  suggestedCategory: string;
  relatedThemes: string[];
  potentialDuplicatesCount: number;
  suggestedPriority: string;
  analysisSummary: string;
  detectedKeywords: string[];
}

export interface ChallengeFormState {
  // Step 1: The Problem
  title: string;
  description: string;
  affectedGroups: AffectedGroup[];
  firstNoticed: NoticeTimeframe | '';

  // Step 2: Location
  district: string;
  block: string;
  villageOrWard: string;
  landmark: string;
  coordinates: { lat: number; lng: number } | null;

  // Step 3: Evidence
  evidenceFiles: EvidenceFile[];
  evidenceContext: string;

  // Step 4: Impact & Context
  estimatedPeople: EstimatedAffectedPopulation | '';
  frequency: ProblemFrequency | '';
  severity: SeverityLevel | '';
  hasPreviousAttempts: PreviousAttempts | '';
  previousAttemptsDetail: string;

  // Step 5: Review & Assist
  aiSuggestions: AIAssistSuggestion | null;
  declarationAccepted: boolean;
}

export interface SubmissionResponse {
  referenceId: string;
  submissionDate: string;
  status: 'Submitted' | 'Being Reviewed';
  title: string;
  district: string;
  category: string;
}
