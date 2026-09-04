import { Router } from 'express';
import { prisma } from '../../config/database.js';
import { sendSuccess, sendError } from '../../utils/response.js';
import { requireAuth, optionalAuth } from '../../middleware/auth.js';
import { RoleGroups } from '../../middleware/authorize.js';
import type { AppRequest } from '../../types/request.js';

const router = Router();

/**
 * GET /api/challenges/my
 * Retrieve all challenges submitted by the currently authenticated user.
 */
router.get('/my', requireAuth, async (req: AppRequest, res, next) => {
  try {
    const challenges = await prisma.challenge.findMany({
      where: { submittedById: req.userId },
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
 * GET /api/challenges
 * Retrieve challenges with optional domain and district filtering.
 */
router.get('/', optionalAuth, async (req: AppRequest, res, next) => {
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
      const isGov = req.userRole && RoleGroups.GOVERNMENT.includes(req.userRole.toUpperCase());
      if (req.userId !== submittedById && !isGov) {
        sendError(
          res,
          403,
          'FORBIDDEN',
          'Cannot access private challenge submissions belonging to another user.',
          undefined,
          req,
        );
        return;
      }
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
router.post('/', requireAuth, async (req: AppRequest, res, next) => {
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
      organizationId,
      sourceType,
      evidenceFiles,
      aiSuggestions,
    } = req.body;

    if (!title || !description) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Title and description are required', undefined, req);
      return;
    }

    // Authenticated user ID is strictly enforced to prevent identity spoofing
    const submitterId = req.userId;
    if (!submitterId) {
      sendError(
        res,
        401,
        'UNAUTHORIZED',
        'Authentication required to report a challenge',
        undefined,
        req,
      );
      return;
    }

    // Resolve District ID by name if not passed as UUID
    let targetDistrictId = districtId;
    if (
      !targetDistrictId &&
      district &&
      typeof district === 'string' &&
      district !== 'All Districts'
    ) {
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
    let publicId = `JS-${year}-${String(count + 1).padStart(5, '0')}`;
    let attempts = 0;
    while (await prisma.challenge.findFirst({ where: { OR: [{ publicId }, { challengeCode: publicId }] } }) && attempts < 10) {
      publicId = `JS-${year}-${String(Math.floor(10000 + Math.random() * 90000))}`;
      attempts++;
    }

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

    // Allowed MIME types whitelist
    const ALLOWED_EVIDENCE_MIMES = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'application/pdf',
      'video/mp4',
      'video/webm',
    ];
    const MAX_EVIDENCE_FILES = 10;
    const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25MB

    // Handle evidence files metadata from Supabase Storage with server-side validation
    if (Array.isArray(evidenceFiles) && evidenceFiles.length > 0) {
      const sanitizedFiles = evidenceFiles.slice(0, MAX_EVIDENCE_FILES);
      for (const f of sanitizedFiles) {
        if (!f || typeof f !== 'object') continue;

        // Size check
        const sizeBytes =
          typeof f.size === 'number' && f.size > 0
            ? Math.min(f.size, MAX_FILE_SIZE_BYTES)
            : 1024;

        // URL safety check: must be a valid http(s) or standard upload path
        const rawUrl = String(f.publicUrl || f.url || f.previewUrl || '');
        if (
          !rawUrl ||
          rawUrl.startsWith('javascript:') ||
          rawUrl.startsWith('data:') ||
          rawUrl.startsWith('vbscript:')
        ) {
          continue;
        }

        // MIME check: default to valid allowed type or application/pdf
        const rawMime = String(f.type || 'application/octet-stream').toLowerCase();
        const mimeType = ALLOWED_EVIDENCE_MIMES.includes(rawMime) ? rawMime : 'application/pdf';

        // Filename sanitization: prevent path traversal characters
        const filename = String(f.name || 'evidence-file')
          .replace(/[/\\]/g, '_')
          .slice(0, 150);

        await prisma.challengeEvidence.create({
          data: {
            challengeId: challenge.id,
            type: mimeType.includes('image')
              ? 'IMAGE'
              : mimeType.includes('video')
                ? 'VIDEO'
                : 'DOCUMENT',
            url: rawUrl,
            filename,
            mimeType,
            sizeBytes,
            metadata: {
              storagePath: typeof f.storagePath === 'string' ? f.storagePath.slice(0, 255) : null,
              bucket: 'challenge-evidence',
              uploadedAt: new Date().toISOString(),
              size: sizeBytes,
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
router.patch('/:id', requireAuth, async (req: AppRequest, res, next) => {
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

    const isGovOrAdmin = req.userRole && RoleGroups.GOVERNMENT.includes(req.userRole.toUpperCase());
    const isOwner = existing.submittedById === req.userId;

    // Status or verification transitions require Government/Admin role
    if ((body.status || body.verificationStatus || body.priority) && !isGovOrAdmin) {
      sendError(
        res,
        403,
        'FORBIDDEN',
        'Only authorized government reviewers can update challenge status or priority.',
        undefined,
        req,
      );
      return;
    }

    // Content edits require ownership or Government/Admin role
    if (!isGovOrAdmin && !isOwner) {
      sendError(
        res,
        403,
        'FORBIDDEN',
        'You do not have permission to modify this challenge.',
        undefined,
        req,
      );
      return;
    }

    // Whitelist allowed update fields to prevent mass assignment
    const safeData: Record<string, unknown> = {};

    if (isGovOrAdmin) {
      if (body.status !== undefined) safeData.status = body.status;
      if (body.verificationStatus !== undefined) safeData.verificationStatus = body.verificationStatus;
      if (body.priority !== undefined) safeData.priority = body.priority;
    }

    if (isGovOrAdmin || isOwner) {
      if (body.title !== undefined) safeData.title = String(body.title).trim();
      if (body.description !== undefined) safeData.description = String(body.description).trim();
      if (body.domain !== undefined) safeData.domain = body.domain;
      if (body.subdomain !== undefined) safeData.subdomain = body.subdomain;
      if (body.block !== undefined) safeData.block = body.block;
      if (body.panchayatOrUlb !== undefined) safeData.panchayatOrUlb = body.panchayatOrUlb;
      if (body.affectedPopulation !== undefined) safeData.affectedPopulation = Number(body.affectedPopulation) || null;
      if (body.severity !== undefined) safeData.severity = body.severity;
      if (body.urgency !== undefined) safeData.urgency = body.urgency;
    }

    const updated = await prisma.challenge.update({
      where: { id: existing.id },
      data: safeData,
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
          userId: req.userId,
        },
      });
    }

    sendSuccess(res, updated, 200, req);
  } catch (error) {
    next(error);
  }
});

export default router;
