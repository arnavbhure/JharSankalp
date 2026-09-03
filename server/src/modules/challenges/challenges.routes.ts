import { Router } from 'express';
import { prisma } from '../../config/database.js';
import { sendSuccess, sendError } from '../../utils/response.js';

const router = Router();

/**
 * GET /api/challenges
 * Retrieve challenges with optional domain and district filtering.
 */
router.get('/', async (req, res, next) => {
  try {
    const { domain, district, status, submittedById } = req.query;

    const whereClause: Record<string, unknown> = {};

    if (domain && typeof domain === 'string' && domain !== 'All Focus Areas') {
      whereClause.domain = { equals: domain, mode: 'insensitive' };
    }

    if (status && typeof status === 'string' && status !== 'All Statuses') {
      whereClause.status = status;
    }

    if (submittedById && typeof submittedById === 'string') {
      whereClause.submittedById = submittedById;
    }

    if (district && typeof district === 'string' && district !== 'All Districts') {
      whereClause.district = {
        name: { equals: district, mode: 'insensitive' },
      };
    }

    const challenges = await prisma.challenge.findMany({
      where: whereClause,
      include: {
        district: true,
        evidence: true,
        submittedBy: {
          select: { id: true, name: true, role: true, avatarUrl: true },
        },
        organization: {
          select: { id: true, name: true, type: true },
        },
        _count: {
          select: { ideas: true, collaborations: true, solutions: true, projects: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    sendSuccess(res, challenges, 200, req);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/challenges/:id
 * Retrieve a single challenge by ID or publicId.
 */
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id as string;

    const challenge = await prisma.challenge.findFirst({
      where: {
        OR: [{ id }, { publicId: id }, { challengeCode: id }],
      },
      include: {
        district: true,
        organization: true,
        evidence: true,
        ideas: {
          include: {
            submittedBy: { select: { id: true, name: true, role: true } },
          },
        },
        collaborations: {
          include: {
            members: true,
          },
        },
        solutions: true,
        projects: {
          include: {
            leadOrganization: true,
            milestones: true,
            impactMetrics: true,
          },
        },
      },
    });

    if (!challenge) {
      sendError(res, 404, 'NOT_FOUND', `Challenge '${id}' not found`, undefined, req);
      return;
    }

    sendSuccess(res, challenge, 200, req);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/challenges
 * Create a new challenge from citizen or institution submission.
 */
router.post('/', async (req, res, next) => {
  try {
    const {
      title,
      description,
      domain,
      subdomain,
      district,
      districtId,
      block,
      villageOrWard,
      panchayatOrUlb,
      affectedPopulation,
      severity,
      urgency,
      priority,
      submittedById,
      organizationId,
      sourceType,
      evidenceFiles,
      aiSuggestions,
    } = req.body;

    if (!title || !description) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Title and description are required', undefined, req);
      return;
    }

    // Default to citizen user if none provided
    let submitterId = submittedById;
    if (!submitterId) {
      const defaultUser = await prisma.user.findFirst();
      submitterId = defaultUser?.id;
    }

    if (!submitterId) {
      sendError(res, 400, 'USER_REQUIRED', 'Valid user is required to submit a challenge', undefined, req);
      return;
    }

    // Resolve District ID by name if not passed as UUID
    let targetDistrictId = districtId;
    if (!targetDistrictId && district && typeof district === 'string' && district !== 'All Districts') {
      const matched = await prisma.district.findFirst({
        where: { name: { equals: district.trim(), mode: 'insensitive' } },
      });
      targetDistrictId = matched?.id;
    }

    // Parse population numbers
    let populationNumber: number | undefined = undefined;
    if (typeof affectedPopulation === 'number') {
      populationNumber = affectedPopulation;
    } else if (typeof affectedPopulation === 'string' && affectedPopulation.trim()) {
      const match = affectedPopulation.match(/(\d[\d,]*)/);
      if (match) {
        populationNumber = parseInt(match[1].replace(/,/g, ''), 10);
      }
    }

    // Map urgency/severity to standard priority
    let finalPriority = priority || 'MEDIUM';
    if (!priority && (severity || urgency)) {
      const s = (severity || urgency || '').toLowerCase();
      if (s.includes('urgent') || s.includes('critical') || s.includes('serious')) {
        finalPriority = 'CRITICAL';
      } else if (s.includes('important') || s.includes('high')) {
        finalPriority = 'HIGH';
      } else {
        finalPriority = 'MEDIUM';
      }
    }

    const year = new Date().getFullYear();
    const count = await prisma.challenge.count();
    const publicId = `JS-${year}-${String(count + 1).padStart(5, '0')}`;

    const finalDomain =
      domain && domain !== 'Not sure — Help me identify it'
        ? domain
        : aiSuggestions?.suggestedCategory || aiSuggestions?.suggestedDomain || 'General';

    const finalSubdomain =
      subdomain || aiSuggestions?.subDomain || aiSuggestions?.suggestedSubcategory || undefined;

    const challenge = await prisma.challenge.create({
      data: {
        publicId,
        challengeCode: publicId,
        title: title.trim(),
        description: description.trim(),
        domain: finalDomain,
        subdomain: finalSubdomain,
        districtId: targetDistrictId || undefined,
        block: block ? block.trim() : undefined,
        panchayatOrUlb: (villageOrWard || panchayatOrUlb || '').trim() || undefined,
        affectedPopulation: populationNumber,
        severity: severity ? String(severity) : undefined,
        urgency: urgency ? String(urgency) : undefined,
        priority: finalPriority,
        status: 'SUBMITTED',
        sourceType: sourceType || 'CITIZEN',
        submittedById: submitterId,
        organizationId: organizationId || undefined,
        aiAnalysis: aiSuggestions ? aiSuggestions : undefined,
        aiAnalyzedAt: aiSuggestions ? new Date() : undefined,
        aiModelVersion: 'JharSankalp-v1.0',
      },
      include: {
        district: true,
        evidence: true,
        submittedBy: {
          select: { id: true, name: true, role: true },
        },
      },
    });

    // Handle evidence files metadata from Supabase Storage
    if (Array.isArray(evidenceFiles) && evidenceFiles.length > 0) {
      for (const f of evidenceFiles) {
        await prisma.challengeEvidence.create({
          data: {
            challengeId: challenge.id,
            type: f.type?.includes('image')
              ? 'IMAGE'
              : f.type?.includes('video')
              ? 'VIDEO'
              : 'DOCUMENT',
            url:
              f.publicUrl ||
              f.url ||
              f.previewUrl ||
              `/uploads/evidence/${encodeURIComponent(f.name || 'file')}`,
            filename: f.name || 'evidence-file',
            mimeType: f.type || 'application/octet-stream',
            sizeBytes: f.size || 1024,
            metadata: {
              storagePath: f.storagePath || null,
              bucket: 'challenge-evidence',
              uploadedAt: f.uploadedAt || new Date().toISOString(),
              size: f.size || null,
            },
            isPublic: true,
          },
        });
      }
    }

    // Record activity
    await prisma.activity.create({
      data: {
        type: 'CHALLENGE_CREATED',
        message: `New challenge logged: ${challenge.publicId} — ${challenge.title}`,
        challengeId: challenge.id,
        userId: submitterId,
        organizationId: organizationId || undefined,
      },
    });

    sendSuccess(res, challenge, 201, req);
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /api/challenges/:id
 * Update challenge status, priority, or details (e.g. Government review).
 */
router.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const body = req.body;

    const existing = await prisma.challenge.findFirst({
      where: { OR: [{ id }, { publicId: id }, { challengeCode: id }] },
    });

    if (!existing) {
      sendError(res, 404, 'NOT_FOUND', `Challenge '${id}' not found`, undefined, req);
      return;
    }

    const updated = await prisma.challenge.update({
      where: { id: existing.id },
      data: body,
      include: {
        district: true,
        evidence: true,
        submittedBy: {
          select: { id: true, name: true, role: true },
        },
      },
    });

    if (body.status && body.status !== existing.status) {
      await prisma.activity.create({
        data: {
          type: 'STATUS_CHANGED',
          message: `Challenge ${updated.publicId} status changed to ${body.status}`,
          challengeId: updated.id,
        },
      });
    }

    sendSuccess(res, updated, 200, req);
  } catch (error) {
    next(error);
  }
});

export default router;
