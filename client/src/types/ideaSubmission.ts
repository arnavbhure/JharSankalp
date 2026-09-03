export type IdeaStageType =
  'CONCEPT' | 'RESEARCH' | 'PROTOTYPE' | 'TESTING' | 'PILOT' | 'IMPLEMENTED';

export interface SelectedChallenge {
  id: string;
  title: string;
  category: string;
  district: string;
  block?: string;
  priority: 'Critical' | 'High' | 'Medium';
  affectedPopulation: string;
}

export interface SupportingMaterial {
  id: string;
  name: string;
  type:
    | 'Research'
    | 'Prototype Link'
    | 'Presentation'
    | 'Document'
    | 'Image'
    | 'Video'
    | 'Other Reference';
  url?: string;
  fileSize?: string;
}

export interface IdeaSubmissionFormData {
  // Step 1: Challenge
  challenge: SelectedChallenge | null;

  // Step 2: The Idea
  title: string;
  summary: string;
  coreIdea: string;
  whyThisHelps: string;

  // Step 3: The Approach
  problemGap: string;
  proposedApproach: string;
  expectedOutcome: string;

  // Step 4: Idea Readiness
  stage: IdeaStageType;
  supportingMaterials: SupportingMaterial[];

  // Step 5: Collaboration Needs
  collaborationNeeds: string[];
  additionalContext: string;
  contributorRole: string;
  organization?: string;
  contributorName?: string;
  contributorContact?: string;
}

export interface IdeaSubmissionResult {
  referenceId: string;
  title: string;
  challengeTitle: string;
  submittedDate: string;
  status: 'SUBMITTED_FOR_REVIEW';
}
