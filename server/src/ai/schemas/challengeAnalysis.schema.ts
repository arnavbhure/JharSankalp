import { z } from 'zod';

export const SUPPORTED_DOMAINS = [
  'Agriculture',
  'Education',
  'Healthcare',
  'Water Management',
  'Sanitation',
  'Environment',
  'Energy',
  'Urban Development',
  'Rural Livelihoods',
  'Accessibility',
  'Public Administration',
  'Mining Safety',
  'Infrastructure',
  'Disaster Management',
  'Other',
] as const;

export const PRIORITY_LEVELS = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const;
export const IMPACT_LEVELS = ['LOCAL', 'DISTRICT', 'STATE'] as const;

export const ChallengeAnalysisSchema = z.object({
  summary: z.string().describe('A crisp 1-2 sentence executive summary of the core civic problem.'),
  domain: z
    .enum(SUPPORTED_DOMAINS)
    .describe('The primary operational domain most relevant to this challenge.'),
  subDomain: z
    .string()
    .nullable()
    .describe(
      'Specific sub-discipline (e.g., Rural Water Infrastructure, Soil Health Monitoring).',
    ),
  suggestedPriority: z
    .enum(PRIORITY_LEVELS)
    .describe('Recommended priority level based on public safety, affected scale, and urgency.'),
  priorityReason: z
    .string()
    .describe('Concise rationale explaining the priority score based on risk and scale.'),
  problemType: z
    .string()
    .describe(
      'Category of issue, e.g., Infrastructure Breakdown, Diagnostic Access, Environmental Risk.',
    ),
  affectedStakeholders: z
    .array(z.string())
    .min(1)
    .describe('Key population groups, community workers, or departments affected.'),
  possibleRootCauses: z
    .array(z.string())
    .min(1)
    .describe('Probable underlying systemic, technical, or logistical causes.'),
  suggestedApproach: z
    .array(z.string())
    .min(1)
    .describe(
      'High-level innovation directions (e.g., IoT Telemetry, Vernacular Tech, Mobile Diagnostic).',
    ),
  requiredExpertise: z
    .array(z.string())
    .min(1)
    .describe(
      'Disciplines and institutions needed (e.g., Embedded Electronics, Hydro-geology, Agronomy).',
    ),
  estimatedImpactLevel: z
    .enum(IMPACT_LEVELS)
    .describe('Geographic scope of direct impact: LOCAL (village/block), DISTRICT, or STATE.'),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe('Model confidence score in the analysis between 0 and 1.'),
  needsHumanReview: z
    .boolean()
    .describe(
      'True if information was ambiguous, critical hazard flagged, or detail insufficient.',
    ),
});

export type ChallengeAnalysis = z.infer<typeof ChallengeAnalysisSchema>;

export const ChallengeInputSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  district: z.string().optional(),
  location: z.string().optional(),
  affectedPopulation: z.number().optional(),
});

export type ChallengeInput = z.infer<typeof ChallengeInputSchema>;
