import { z } from 'zod';

export const createProjectSchema = z.object({
  referenceCode: z.string().min(3).optional(),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  challengeId: z.string().uuid().optional().nullable(),
  ideaId: z.string().uuid().optional().nullable(),
  leadOrganizationId: z.string().uuid().optional().nullable(),
  domain: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  block: z.string().optional().nullable(),
  stage: z
    .enum([
      'FORMATION',
      'RESEARCH_DESIGN',
      'PROTOTYPE',
      'LAB_TESTING',
      'FIELD_PILOT',
      'IMPLEMENTATION',
      'IMPACT_VERIFICATION',
      'SCALE',
    ])
    .default('FORMATION'),
  status: z.enum(['ACTIVE', 'ON_HOLD', 'COMPLETED', 'DELAYED', 'CANCELLED']).default('ACTIVE'),
  startDate: z.string().datetime().optional().nullable(),
  expectedEndDate: z.string().datetime().optional().nullable(),
  affectedPopulation: z.number().int().nonnegative().optional().nullable(),
  locationDisplay: z.string().optional().nullable(),
  impactSummary: z.string().optional().nullable(),
});

export const updateProjectSchema = createProjectSchema.partial();
