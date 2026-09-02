import { useState, useRef } from 'react';
import { ChallengeFormState, EvidenceFile } from '../../types/submission';
import { UploadCloud, Image, Video, FileText, Trash2, ShieldAlert, Plus } from 'lucide-react';

interface EvidenceStepProps {
  formData: ChallengeFormState;
  onChange: (updates: Partial<ChallengeFormState>) => void;
}

export function EvidenceStep({ formData, onChange }: EvidenceStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newEvidence: EvidenceFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isImg = file.type.startsWith('image/');
      newEvidence.push({
        id: `ev-${Date.now()}-${i}`,
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl: isImg ? URL.createObjectURL(file) : undefined,
        uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }

    onChange({
      evidenceFiles: [...formData.evidenceFiles, ...newEvidence],
    });
  };

  const removeFile = (id: string) => {
    onChange({
      evidenceFiles: formData.evidenceFiles.filter((f) => f.id !== id),
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
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#F8F6F1] border border-[#EEEAE1] text-[11px] font-mono font-bold text-[#6B5845] uppercase">
          Optional Step
        </div>
        <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Help us understand the situation better.
        </h2>
        <p className="text-[14.5px] text-[#6B5845] leading-relaxed">
          Photos, videos, or survey notes help engineers and reviewers quickly assess the ground conditions. You can skip this step if you don&apos;t have files.
        </p>
      </div>

      {/* Modern Drag & Drop Upload Container */}
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
        className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition-all cursor-pointer ${
          dragOver
            ? 'border-[#123B2A] bg-[#123B2A]/5 scale-[1.01]'
            : 'border-[#EEEAE1] bg-white hover:border-[#123B2A]/50 hover:bg-[#FAF9F5]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="flex flex-col items-center space-y-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8F6F1] text-[#123B2A] border border-[#EEEAE1] shadow-2xs">
            <UploadCloud className="h-7 w-7 stroke-[2]" />
          </div>

          <div className="space-y-1">
            <div className="text-[15px] font-bold text-[#1D2522]">
              Drag and drop files here, or <span className="text-[#123B2A] underline">browse files</span>
            </div>
            <p className="text-[12.5px] text-[#6B5845]">
              Supports photos (JPEG, PNG), short videos (MP4), and documents (PDF) up to 25MB each
            </p>
          </div>

          <div className="flex items-center gap-4 text-[12px] font-mono text-[#6B5845] pt-1">
            <span className="flex items-center gap-1">
              <Image className="h-3.5 w-3.5 text-[#123B2A]" /> Photos
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Video className="h-3.5 w-3.5 text-[#F5A623]" /> Videos
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <FileText className="h-3.5 w-3.5 text-[#6B5845]" /> Documents
            </span>
          </div>
        </div>
      </div>

      {/* Uploaded Files Preview List */}
      {formData.evidenceFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[12.5px] font-mono font-bold text-[#123B2A]">
            <span>ATTACHED EVIDENCE ({formData.evidenceFiles.length})</span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-[#123B2A] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add More</span>
            </button>
          </div>

          <div className="space-y-2">
            {formData.evidenceFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 rounded-xl border border-[#EEEAE1] bg-white shadow-2xs group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {file.previewUrl ? (
                    <img
                      src={file.previewUrl}
                      alt={file.name}
                      className="h-10 w-10 rounded-lg object-cover border border-[#EEEAE1]"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FAF9F5] text-[#123B2A] border border-[#EEEAE1]">
                      <FileText className="h-5 w-5" />
                    </div>
                  )}

                  <div className="min-w-0 text-left">
                    <div className="text-[13.5px] font-bold text-[#1D2522] truncate max-w-xs sm:max-w-md">
                      {file.name}
                    </div>
                    <div className="text-[11.5px] font-mono text-[#6B5845]">
                      {formatFileSize(file.size)} · Uploaded {file.uploadedAt}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  className="p-1.5 rounded-lg text-[#6B5845] hover:text-[#BE123C] hover:bg-[#FEF0F4] transition-colors cursor-pointer shrink-0 ml-2"
                  aria-label="Remove attachment"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evidence Context Textarea */}
      <div className="space-y-2">
        <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          Tell us what this evidence shows (Optional)
        </label>
        <textarea
          rows={3}
          value={formData.evidenceContext}
          onChange={(e) => onChange({ evidenceContext: e.target.value })}
          placeholder="For example: The first image shows cracked pump foundation in Ward 3; the document is the written representation submitted to block development officer..."
          className="w-full p-4 rounded-xl border border-[#EEEAE1] bg-white text-[14px] text-[#1D2522] placeholder:text-[#6B5845]/50 shadow-2xs focus:outline-none focus:border-[#123B2A] focus:ring-1 focus:ring-[#123B2A] transition-all leading-relaxed"
        />
      </div>

      {/* Privacy Guidance Note */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] text-[12.5px] text-[#6B5845] leading-relaxed">
        <ShieldAlert className="h-4 w-4 text-[#B45309] shrink-0 mt-0.5" />
        <span>
          <strong>Privacy Note:</strong> Avoid uploading documents containing sensitive personal identity numbers (such as Aadhaar, bank passbooks, or private medical records) unless strictly necessary for validating the challenge.
        </span>
      </div>
    </div>
  );
}
