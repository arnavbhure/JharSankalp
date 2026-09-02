import { ChallengeFormState } from '../../types/submission';
import { Edit2, Sparkles, MapPin, Users, FileText, CheckSquare, Square, AlertCircle } from 'lucide-react';

interface ReviewStepProps {
  formData: ChallengeFormState;
  onEditStep: (stepNumber: number) => void;
  onDeclarationChange: (accepted: boolean) => void;
  onSubmit: () => void;
  submitting: boolean;
  error?: string;
}

export function ReviewStep({
  formData,
  onEditStep,
  onDeclarationChange,
  onSubmit,
  submitting,
  error,
}: ReviewStepProps) {
  return (
    <div className="space-y-8 text-left max-w-2xl mx-auto">
      {/* Step Header */}
      <div className="space-y-1.5 border-b border-[#EEEAE1] pb-5">
        <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Review before submitting
        </h2>
        <p className="text-[14.5px] text-[#6B5845] leading-relaxed">
          Please check the summary below. You can edit any section before final submission to the JharSankalp review board.
        </p>
      </div>

      {/* ── 1. The Problem Card ── */}
      <div className="rounded-2xl border border-[#EEEAE1] bg-white p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <FileText className="h-4 w-4 text-[#F5A623]" />
            <span>01 · THE PROBLEM</span>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="text-[12.5px] font-bold text-[#123B2A] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <Edit2 className="h-3 w-3" />
            <span>Edit</span>
          </button>
        </div>

        <div className="space-y-2">
          <div className="text-[1.15rem] font-bold text-[#1D2522] font-sans">
            {formData.title || <span className="text-[#6B5845] italic">No title provided</span>}
          </div>
          <p className="text-[13.5px] text-[#1D2522]/85 leading-relaxed whitespace-pre-line bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EEEAE1]">
            {formData.description || <span className="text-[#6B5845] italic">No description entered</span>}
          </p>
        </div>

        {formData.firstNoticed && (
          <div className="text-[12px] text-[#6B5845]">
            <strong className="text-[#1D2522]">First noticed:</strong> {formData.firstNoticed}
          </div>
        )}
      </div>

      {/* ── 2. Location Card ── */}
      <div className="rounded-2xl border border-[#EEEAE1] bg-white p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <MapPin className="h-4 w-4 text-[#F5A623]" />
            <span>02 · LOCATION</span>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="text-[12.5px] font-bold text-[#123B2A] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <Edit2 className="h-3 w-3" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[13px]">
          <div>
            <span className="text-[11px] font-mono text-[#6B5845] block">District</span>
            <strong className="text-[#1D2522] font-bold text-[14px]">
              {formData.district || '—'}
            </strong>
          </div>
          <div>
            <span className="text-[11px] font-mono text-[#6B5845] block">Block / Sub-div</span>
            <strong className="text-[#1D2522] font-bold text-[14px]">
              {formData.block || '—'}
            </strong>
          </div>
          <div>
            <span className="text-[11px] font-mono text-[#6B5845] block">Village / Ward</span>
            <strong className="text-[#1D2522] font-bold text-[14px]">
              {formData.villageOrWard || '—'}
            </strong>
          </div>
        </div>

        {formData.landmark && (
          <div className="text-[12px] text-[#6B5845]">
            <strong className="text-[#1D2522]">Specific Landmark:</strong> {formData.landmark}
          </div>
        )}
      </div>

      {/* ── 3. People Affected & Impact Card ── */}
      <div className="rounded-2xl border border-[#EEEAE1] bg-white p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <Users className="h-4 w-4 text-[#F5A623]" />
            <span>03 · PEOPLE AFFECTED & IMPACT</span>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(4)}
            className="text-[12.5px] font-bold text-[#123B2A] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <Edit2 className="h-3 w-3" />
            <span>Edit</span>
          </button>
        </div>

        <div className="space-y-3">
          {formData.affectedGroups.length > 0 && (
            <div>
              <span className="text-[11px] font-mono text-[#6B5845] block mb-1.5">
                Affected Demographic Groups:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {formData.affectedGroups.map((g) => (
                  <span
                    key={g}
                    className="px-2.5 py-0.5 rounded-md bg-[#F8F6F1] border border-[#EEEAE1] text-[12px] font-semibold text-[#123B2A]"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[13px] pt-1">
            <div>
              <span className="text-[11px] font-mono text-[#6B5845] block">Estimated Scope</span>
              <strong className="text-[#1D2522]">{formData.estimatedPeople || 'Not specified'}</strong>
            </div>
            <div>
              <span className="text-[11px] font-mono text-[#6B5845] block">Frequency</span>
              <strong className="text-[#1D2522]">{formData.frequency || 'Not specified'}</strong>
            </div>
            <div>
              <span className="text-[11px] font-mono text-[#6B5845] block">Urgency / Severity</span>
              <strong className="text-[#B45309]">{formData.severity || 'Not specified'}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. Evidence Card ── */}
      <div className="rounded-2xl border border-[#EEEAE1] bg-white p-6 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <FileText className="h-4 w-4 text-[#F5A623]" />
            <span>04 · SUPPORTING EVIDENCE</span>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(3)}
            className="text-[12.5px] font-bold text-[#123B2A] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <Edit2 className="h-3 w-3" />
            <span>Edit</span>
          </button>
        </div>

        <div className="text-[13px] text-[#6B5845]">
          {formData.evidenceFiles.length > 0 ? (
            <span className="font-semibold text-[#1D2522]">
              {formData.evidenceFiles.length} file(s) attached ({formData.evidenceFiles.map((f) => f.name).join(', ')})
            </span>
          ) : (
            <span className="italic">No files attached (Optional step)</span>
          )}
        </div>

        {formData.evidenceContext && (
          <p className="text-[12.5px] text-[#1D2522]/80 italic pt-1">
            &ldquo;{formData.evidenceContext}&rdquo;
          </p>
        )}
      </div>

      {/* ── 5. AI Suggestions Summary Card ── */}
      {formData.aiSuggestions && (
        <div className="rounded-2xl border border-[#123B2A]/20 bg-[#F2FBF5] p-6 text-left space-y-3">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <Sparkles className="h-4 w-4 text-[#F5A623]" />
            <span>JHARSANKALP ASSIST REVIEW</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[13px]">
            <div>
              <span className="text-[11px] font-mono text-[#6B5845] block">Primary Focus Area</span>
              <strong className="text-[#123B2A] font-bold">
                {formData.aiSuggestions.suggestedCategory}
              </strong>
            </div>
            <div className="sm:col-span-2">
              <span className="text-[11px] font-mono text-[#6B5845] block">Secondary Themes</span>
              <span className="text-[#1D2522] font-medium">
                {formData.aiSuggestions.relatedThemes.join(' · ')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Accuracy Declaration Checkbox */}
      <div className="pt-2">
        <label
          onClick={() => onDeclarationChange(!formData.declarationAccepted)}
          className="flex items-start gap-3 p-4 rounded-xl border border-[#EEEAE1] bg-white cursor-pointer select-none hover:bg-[#FAF9F5] transition-colors"
        >
          <div className="mt-0.5 text-[#123B2A]">
            {formData.declarationAccepted ? (
              <CheckSquare className="h-5 w-5 fill-[#123B2A] text-white" />
            ) : (
              <Square className="h-5 w-5 text-[#6B5845]" />
            )}
          </div>
          <span className="text-[13.5px] text-[#1D2522] leading-snug">
            I confirm that the information provided is accurate to the best of my knowledge and is submitted to support civic improvement in Jharkhand.
          </span>
        </label>
      </div>

      {/* Error Message if any */}
      {error && (
        <div className="p-3.5 rounded-xl bg-[#FEF0F4] border border-[#FDD3D9] text-[13px] text-[#BE123C] flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Submit Action */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!formData.declarationAccepted || submitting}
          className={`w-full py-4 rounded-xl text-[15px] font-extrabold shadow-sm transition-all active:scale-[0.99] flex items-center justify-center gap-2 ${
            formData.declarationAccepted && !submitting
              ? 'bg-[#123B2A] hover:bg-[#0D2B1E] text-white cursor-pointer'
              : 'bg-[#EEEAE1] text-[#6B5845]/60 cursor-not-allowed'
          }`}
        >
          {submitting ? (
            <span>Transmitting Case Docket...</span>
          ) : (
            <span>Submit Challenge for Review →</span>
          )}
        </button>
      </div>
    </div>
  );
}
