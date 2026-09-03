import { supabase, EVIDENCE_BUCKET } from '../lib/supabase';
import { EvidenceFile } from '../types/submission';

// Allowed MIME types and extensions
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const ALLOWED_DOCUMENT_TYPES = ['application/pdf'];

export const ALLOWED_MIME_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOCUMENT_TYPES];

export const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.pdf'];

// 25MB maximum per file (matches UI specification)
export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates file type and size.
 */
export function validateEvidenceFile(file: File): ValidationResult {
  // Check extension as well as MIME type for browser compatibility
  const ext = '.' + file.name.split('.').pop()?.toLowerCase();
  const isExtensionAllowed = ALLOWED_EXTENSIONS.includes(ext);
  const isMimeAllowed = ALLOWED_MIME_TYPES.includes(file.type.toLowerCase());

  if (!isExtensionAllowed && !isMimeAllowed) {
    return {
      valid: false,
      error: `Unsupported file type "${file.name}". Only JPG, PNG, WEBP images and PDF documents are allowed.`,
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File "${file.name}" is ${sizeMb}MB, which exceeds the 25MB limit. Please choose a smaller file.`,
    };
  }

  return { valid: true };
}

/**
 * Sanitizes a filename to safe characters only.
 */
function sanitizeFileName(filename: string): string {
  const parts = filename.split('.');
  const extension = parts.length > 1 ? '.' + parts.pop()?.toLowerCase() : '';
  const base = parts.join('.').replace(/[^a-zA-Z0-9_-]/g, '_');
  return `${base}${extension}`;
}

/**
 * Generates a unique, hierarchical storage path:
 * {userId}/{submissionId}/{timestamp}_{sanitizedFilename}
 */
export function generateStoragePath(
  userId: string | undefined,
  submissionId: string | undefined,
  filename: string,
): string {
  const userSegment = userId ? userId.replace(/[^a-zA-Z0-9_-]/g, '') : 'citizen';
  const subSegment = submissionId
    ? submissionId.replace(/[^a-zA-Z0-9_-]/g, '')
    : `sub_${Date.now()}`;
  const safeName = sanitizeFileName(filename);
  return `${userSegment}/${subSegment}/${Date.now()}_${safeName}`;
}

export interface UploadOptions {
  userId?: string;
  submissionId?: string;
}

/**
 * Uploads a single validated file to Supabase Storage bucket 'challenge-evidence'.
 * Returns an EvidenceFile object with permanent publicUrl and storagePath.
 */
export async function uploadEvidenceToSupabase(
  file: File,
  options: UploadOptions = {},
): Promise<EvidenceFile> {
  // 1. Validation
  const validation = validateEvidenceFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // 2. Generate Safe Path
  const storagePath = generateStoragePath(options.userId, options.submissionId, file.name);

  // 3. Upload File via Supabase Client (Standard publishable key, no service key)
  const { error: uploadError } = await supabase.storage
    .from(EVIDENCE_BUCKET)
    .upload(storagePath, file, {
      contentType: file.type || 'application/octet-stream',
      upsert: false,
      cacheControl: '3600',
    });

  if (uploadError) {
    console.error('Supabase storage upload error:', uploadError);
    throw new Error(`Failed to upload "${file.name}": ${uploadError.message}`);
  }

  // 4. Retrieve Public URL
  const { data: urlData } = supabase.storage.from(EVIDENCE_BUCKET).getPublicUrl(storagePath);

  const publicUrl = urlData.publicUrl;

  return {
    id: `ev-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: file.name,
    size: file.size,
    type: file.type,
    storagePath,
    publicUrl,
    previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : publicUrl,
    uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    uploadStatus: 'uploaded',
  };
}

/**
 * Removes a file from Supabase Storage by its path.
 * Used when a user removes a file before final challenge submission.
 */
export async function deleteEvidenceFromSupabase(storagePath: string): Promise<boolean> {
  if (!storagePath) return false;

  try {
    const { error } = await supabase.storage.from(EVIDENCE_BUCKET).remove([storagePath]);

    if (error) {
      console.warn(`Failed to delete storage file at ${storagePath}:`, error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn(`Exception deleting storage file at ${storagePath}:`, err);
    return false;
  }
}

/**
 * Cleans up orphaned files if a submission fails.
 */
export async function cleanupOrphanedEvidence(storagePaths: string[]): Promise<void> {
  const validPaths = storagePaths.filter(Boolean);
  if (validPaths.length === 0) return;

  try {
    const { error } = await supabase.storage.from(EVIDENCE_BUCKET).remove(validPaths);

    if (error) {
      console.warn('Failed to clean up orphaned evidence files:', error.message);
    }
  } catch (err) {
    console.warn('Exception during orphaned file cleanup:', err);
  }
}
