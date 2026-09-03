import { Badge, type BadgeVariant } from './Badge';
import {
  ChallengeStatus,
  VerificationStatus,
  ActionTrack,
  ProjectStatus,
} from '@jharsankalp/shared';
import type { ReactNode } from 'react';

interface StatusConfig {
  label: string;
  variant: BadgeVariant;
  dot?: boolean;
}

const challengeStatusConfig: Record<string, StatusConfig> = {
  [ChallengeStatus.DRAFT]: { label: 'Draft', variant: 'neutral', dot: true },
  [ChallengeStatus.SUBMITTED]: { label: 'Submitted', variant: 'purple', dot: true },
  [ChallengeStatus.AI_ANALYZED]: { label: 'AI Analyzed', variant: 'purple', dot: true },
  [ChallengeStatus.UNDER_VALIDATION]: { label: 'Under Validation', variant: 'warning', dot: true },
  [ChallengeStatus.VALIDATED]: { label: 'Validated', variant: 'success', dot: true },
  [ChallengeStatus.ROUTINE_RESOLUTION]: {
    label: 'Routine Resolution',
    variant: 'neutral',
    dot: true,
  },
  [ChallengeStatus.MATCHING]: { label: 'Capability Matching', variant: 'purple', dot: true },
  [ChallengeStatus.CONSORTIUM_FORMED]: { label: 'Consortium Formed', variant: 'khaki', dot: true },
  [ChallengeStatus.IMPACT_CONTRACTED]: {
    label: 'Impact Contracted',
    variant: 'apricot',
    dot: true,
  },
  [ChallengeStatus.PROJECT]: { label: 'Project Active', variant: 'success', dot: true },
  [ChallengeStatus.CLOSED]: { label: 'Closed', variant: 'neutral' },
  [ChallengeStatus.REJECTED]: { label: 'Rejected', variant: 'danger' },
  [ChallengeStatus.MERGED]: { label: 'Merged', variant: 'neutral' },
};

const verificationStatusConfig: Record<string, StatusConfig> = {
  [VerificationStatus.UNVERIFIED]: { label: 'Unverified', variant: 'neutral' },
  [VerificationStatus.AI_REVIEWED]: { label: 'AI Reviewed', variant: 'purple' },
  [VerificationStatus.HUMAN_REVIEWED]: { label: 'Human Reviewed', variant: 'purple' },
  [VerificationStatus.FIELD_VERIFIED]: { label: 'Field Verified', variant: 'success', dot: true },
};

const actionTrackConfig: Record<string, StatusConfig> = {
  [ActionTrack.RESOLVE]: { label: 'Track: Resolve', variant: 'neutral' },
  [ActionTrack.RESEARCH]: { label: 'Track: Research', variant: 'purple' },
  [ActionTrack.INNOVATE]: { label: 'Track: Innovate', variant: 'coral' },
};

const projectStatusConfig: Record<string, StatusConfig> = {
  [ProjectStatus.DRAFT]: { label: 'Draft', variant: 'neutral', dot: true },
  [ProjectStatus.PROPOSAL_SUBMITTED]: { label: 'Proposal Submitted', variant: 'purple', dot: true },
  [ProjectStatus.UNDER_REVIEW]: { label: 'Under Review', variant: 'warning', dot: true },
  [ProjectStatus.APPROVED]: { label: 'Approved', variant: 'success', dot: true },
  [ProjectStatus.PROTOTYPE]: { label: 'Prototype', variant: 'purple', dot: true },
  [ProjectStatus.LAB_TESTING]: { label: 'Lab Testing', variant: 'purple', dot: true },
  [ProjectStatus.FIELD_PILOT]: { label: 'Field Pilot', variant: 'apricot', dot: true },
  [ProjectStatus.IMPACT_VERIFICATION]: {
    label: 'Impact Verification',
    variant: 'apricot',
    dot: true,
  },
  [ProjectStatus.DEPLOYED]: { label: 'Deployed', variant: 'success', dot: true },
  [ProjectStatus.SCALED]: { label: 'Scaled', variant: 'success', dot: true },
  [ProjectStatus.PAUSED]: { label: 'Paused', variant: 'warning' },
  [ProjectStatus.CANCELLED]: { label: 'Cancelled', variant: 'danger' },
  [ProjectStatus.FAILED_PILOT]: { label: 'Failed Pilot', variant: 'danger' },
  [ProjectStatus.NEEDS_REVISION]: { label: 'Needs Revision', variant: 'warning' },
  [ProjectStatus.ARCHIVED]: { label: 'Archived', variant: 'neutral' },
};

export interface StatusBadgeProps {
  type: 'challenge' | 'verification' | 'actionTrack' | 'project';
  value: string;
  className?: string;
}

export function StatusBadge({ type, value, className }: StatusBadgeProps): ReactNode {
  let config: StatusConfig | undefined;

  switch (type) {
    case 'challenge':
      config = challengeStatusConfig[value];
      break;
    case 'verification':
      config = verificationStatusConfig[value];
      break;
    case 'actionTrack':
      config = actionTrackConfig[value];
      break;
    case 'project':
      config = projectStatusConfig[value];
      break;
    default:
      config = { label: value, variant: 'neutral' };
  }

  if (!config) {
    config = { label: value, variant: 'neutral' };
  }

  return (
    <Badge variant={config.variant} dot={config.dot} className={className}>
      {config.label}
    </Badge>
  );
}
