import { useState, useRef } from 'react';
import {
  ChallengeFormState,
  EvidenceFile,
  NoticeTimeframe,
  PreviousAttempts,
} from '../../types/submission';
import {
  uploadEvidenceToSupabase,
  deleteEvidenceFromSupabase,
  validateEvidenceFile,
} from '../../services/evidenceStorageService';
import { useAuth } from '../../hooks/useAuth';
import {
  UploadCloud,
  FileText,
  Trash2,
  Clock,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Cloud,
} from 'lucide-react';

interface EvidenceStepProps {
  formData: ChallengeFormState;
  onChange: (updates: Partial<ChallengeFormState>) => void;
}

const TIMEFRAME_OPTIONS: NoticeTimeframe[] = [
  'Recently',
  'A few months ago',
  'More than a year ago',
  'It has existed for several years',
];

const PREVIOUS_ATTEMPTS: PreviousAttempts[] = ['Yes', 'No', "I'm not sure"];

export function EvidenceStep({ formData, onChange }: EvidenceStepProps) {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [submissionId] = useState<string>(
    () => `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  );

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setGeneralError(null);

    const fileList = Array.from(files);

    for (const file of fileList) {
      // 1. Client-Side Pre-Validation
      const validation = validateEvidenceFile(file);
      if (!validation.valid) {
        setGeneralError(validation.error || 'Invalid file selected.');
        continue;
      }

      // 2. Generate temporary entry with uploading status
      const tempId = `ev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const isImg = file.type.startsWith('image/');

      const pendingFile: EvidenceFile = {
        id: tempId,
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl: isImg ? URL.createObjectURL(file) : undefined,
        uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        uploadStatus: 'uploading',
      };

      // Add to form data immediately to show uploading state
      const currentList = formData.evidenceFiles || [];
      onChange({
        evidenceFiles: [...currentList, pendingFile],
      });

      // 3. Perform Actual Upload to Supabase Storage bucket 'challenge-evidence'
      try {
        const uploadedResult = await uploadEvidenceToSupabase(file, {
          userId: user?.id,
          submissionId,
        });

        // Update with permanent URL and storage path
        onChange({
          evidenceFiles: (formData.evidenceFiles || currentList).map((f) =>
            f.id === tempId ? { ...uploadedResult, previewUrl: pendingFile.previewUrl || uploadedResult.previewUrl } : f
          ),
        });
      } catch (err: any) {
        console.error('Supabase evidence upload failed:', err);
        const errMsg = err?.message || 'Failed to upload to cloud storage';
        setGeneralError(errMsg);

        // Mark this file entry as failed
        onChange({
          evidenceFiles: (formData.evidenceFiles || currentList).map((f) =>
            f.id === tempId ? { ...f, uploadStatus: 'error', errorMessage: errMsg } : f
          ),
        });
      }
    }
  };

  const handleRemoveFile = async (file: EvidenceFile) => {
    // 1. If uploaded to Supabase Storage, delete from bucket
    if (file.storagePath) {
      await deleteEvidenceFromSupabase(file.storagePath);
    }

    // 2. Remove from state
    onChange({
      evidenceFiles: (formData.evidenceFiles || []).filter((f) => f.id !== file.id),
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-8 text-left max-w-2xl mx-auto">
      {/* Step Header */}
      <div className="space-y-1.5 border-b border-[#EEEAE1] pb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#123B2A]/8 text-[#123B2A] text-[11px] font-mono font-bold uppercase tracking-wider">
          STEP 03 OF 04 · OPTIONAL
        </div>
        <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Evidence & Background Context
        </h2>
        <p className="text-[14.5px] text-[#6B5845] leading-relaxed">
          Photos, ground observation notes, or technical documents help engineers and reviewers quickly assess conditions. Files are uploaded directly to our secure state cloud storage.
        </p>
      </div>

      {/* Modern Drag & Drop Upload Container */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A] block">
            Attach Evidence Files (Optional)
          </label>
          <span className="text-[11.5px] font-mono text-[#6B5845]">
            JPG, PNG, WEBP, PDF · Max 25MB
          </span>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`relative rounded-2xl border-2 border-dashed p-7 text-center transition-all cursor-pointer ${
            dragOver
              ? 'border-[#123B2A] bg-[#123B2A]/5 scale-[1.01]'
              : 'border-[#EEEAE1] bg-white hover:border-[#123B2A]/50 hover:bg-[#FAF9F5]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,.pdf"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          <div className="flex flex-col items-center space-y-2.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8F6F1] text-[#123B2A] border border-[#EEEAE1] shadow-2xs">
              <UploadCloud className="h-6 w-6 stroke-[2]" />
            </div>

            <div className="space-y-0.5">
              <div className="text-[14.5px] font-bold text-[#1D2522]">
                Drag and drop files here, or <span className="text-[#123B2A] underline">browse files</span>
              </div>
              <p className="text-[12px] text-[#6B5845]">
                Files upload to the <code className="bg-[#FAF9F5] px-1.5 py-0.5 rounded border border-[#EEEAE1] font-mono text-[11px]">challenge-evidence</code> cloud storage bucket.
              </p>
            </div>
          </div>
        </div>

        {generalError && (
          <div className="p-3 rounded-xl bg-[#FFEBEB] border border-[#FECDD3] text-[#BE123C] text-[12.5px] font-medium flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{generalError}</span>
          </div>
        )}

        {/* Uploaded Files Preview List */}
        {formData.evidenceFiles && formData.evidenceFiles.length > 0 && (
          <div className="space-y-2 pt-2">
            <span className="text-[11.5px] font-mono font-bold text-[#6B5845] uppercase tracking-wider block">
              Attached Files ({formData.evidenceFiles.length})
            </span>
            <div className="space-y-2">
              {formData.evidenceFiles.map((file) => {
                const isImg = file.type.startsWith('image/');
                const isUploading = file.uploadStatus === 'uploading';
                const isError = file.uploadStatus === 'error';

                return (
                  <div
                    key={file.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border bg-white shadow-2xs transition-all ${
                      isError
                        ? 'border-[#FECDD3] bg-[#FFF8F8]'
                        : isUploading
                        ? 'border-[#123B2A]/30 bg-[#FAF9F5]'
                        : 'border-[#EEEAE1]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {isImg && file.previewUrl ? (
                        <img
                          src={file.previewUrl}
                          alt={file.name}
                          className="h-11 w-11 rounded-lg object-cover border border-[#EEEAE1] shrink-0"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F8F6F1] text-[#123B2A] shrink-0">
                          <FileText className="h-5 w-5" />
                        </div>
                      )}

                      <div className="min-w-0 space-y-0.5">
                        <div className="text-[13.5px] font-bold text-[#1D2522] truncate max-w-sm">
                          {file.name}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] font-mono text-[#6B5845] flex-wrap">
                          <span>{formatFileSize(file.size)}</span>
                          <span>·</span>
                          {isUploading ? (
                            <span className="text-[#B45309] font-bold flex items-center gap-1">
                              <Loader2 className="h-3 w-3 animate-spin" />
                              <span>Uploading to Supabase...</span>
                            </span>
                          ) : isError ? (
                            <span className="text-[#BE123C] font-bold">
                              {file.errorMessage || 'Upload failed'}
                            </span>
                          ) : (
                            <span className="text-[#15803D] font-bold flex items-center gap-1">
                              <Cloud className="h-3 w-3 text-[#15803D]" />
                              <CheckCircle2 className="h-3 w-3 text-[#15803D]" />
                              <span>Uploaded to Storage</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(file);
                      }}
                      className="p-2 rounded-lg text-[#6B5845] hover:text-[#BE123C] hover:bg-[#FFEBEB] transition-colors cursor-pointer shrink-0"
                      title="Remove file"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Context Question 1: When did you first notice this issue? ── */}
      <div className="space-y-3 pt-4 border-t border-[#EEEAE1]">
        <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A] flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-[#F5A623]" />
          <span>When did you first notice this issue?</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {TIMEFRAME_OPTIONS.map((timeframe) => {
            const isSelected = formData.firstNoticed === timeframe;
            return (
              <label
                key={timeframe}
                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all shadow-2xs ${
                  isSelected
                    ? 'border-[#123B2A] bg-[#123B2A]/5 ring-1 ring-[#123B2A]'
                    : 'border-[#EEEAE1] bg-white hover:bg-[#FAF9F5]'
                }`}
              >
                <input
                  type="radio"
                  name="firstNoticed"
                  value={timeframe}
                  checked={isSelected}
                  onChange={() => onChange({ firstNoticed: timeframe })}
                  className="h-4 w-4 accent-[#123B2A]"
                />
                <span
                  className={`text-[13.5px] font-semibold ${
                    isSelected ? 'text-[#123B2A]' : 'text-[#1D2522]'
                  }`}
                >
                  {timeframe}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* ── Context Question 2: Has anyone already tried to solve it? ── */}
      <div className="space-y-3 pt-2">
        <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A] flex items-center gap-1.5">
          <RotateCcw className="h-4 w-4 text-[#F5A623]" />
          <span>Has anyone already tried to solve it? (Optional)</span>
        </label>
        <p className="text-[12.5px] text-[#6B5845]">
          Knowing what past efforts took place helps avoid repeating ideas that did not work.
        </p>

        <div className="flex gap-2.5">
          {PREVIOUS_ATTEMPTS.map((opt) => {
            const isSelected = formData.hasPreviousAttempts === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange({ hasPreviousAttempts: opt })}
                className={`px-4 py-2 rounded-xl text-[13px] font-semibold transition-all cursor-pointer shadow-2xs border ${
                  isSelected
                    ? 'bg-[#123B2A] text-white border-[#123B2A]'
                    : 'bg-white text-[#1D2522] border-[#EEEAE1] hover:bg-[#FAF9F5]'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {formData.hasPreviousAttempts === 'Yes' && (
          <div className="space-y-1.5 pt-2">
            <label className="text-[12.5px] font-semibold text-[#1D2522]">
              What was attempted and what happened?
            </label>
            <textarea
              rows={3}
              value={formData.previousAttemptsDetail || ''}
              onChange={(e) => onChange({ previousAttemptsDetail: e.target.value })}
              placeholder="e.g. Block mechanics repaired the pump valve two months ago, but it broke again after two weeks..."
              className="w-full p-3 rounded-xl border border-[#EEEAE1] bg-white text-[13.5px] text-[#1D2522] placeholder:text-[#6B5845]/50 focus:border-[#123B2A] focus:ring-1 focus:ring-[#123B2A] focus:outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}
