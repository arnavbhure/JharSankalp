import { IdeaSubmissionFormData } from '../../types/ideaSubmission';
import { Target, Lightbulb, Cpu, GitBranch, Sparkles, Edit2, Send, ShieldCheck } from 'lucide-react';

interface IdeaReviewProps {
  formData: IdeaSubmissionFormData;
  onEditStep: (step: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function IdeaReview({
  formData,
  onEditStep,
  onSubmit,
  isSubmitting,
}: IdeaReviewProps) {
  return (
    <div className="space-y-6 text-left">
      {/* ── Intro ── */}
      <div className="space-y-1.5 border-b border-[#EEEAE1] pb-4">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <ShieldCheck className="h-4 w-4 text-[#F5A623]" />
          <span>FINAL REVIEW · VERIFICATION</span>
        </div>
        <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Review your idea.
        </h2>
        <p className="text-[14.5px] text-[#6B5845] leading-relaxed max-w-2xl">
          Check your solution dossier before transmitting it to the JharSankalp peer-review and matchmaking network.
        </p>
      </div>

      <div className="space-y-4">
        {/* Section 1 Review: Challenge */}
        <div className="p-5 rounded-2xl border border-[#EEEAE1] bg-white space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
              <Target className="h-3.5 w-3.5 text-[#F5A623]" />
              <span>01 TARGET CHALLENGE</span>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="inline-flex items-center gap-1 text-[12px] font-bold text-[#123B2A] hover:underline cursor-pointer"
            >
              <Edit2 className="h-3 w-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-1">
            <h4 className="text-[15px] font-bold text-[#1D2522]">
              {formData.challenge?.title || 'No Challenge Selected'}
            </h4>
            <p className="text-[12.5px] font-mono text-[#6B5845]">
              {formData.challenge?.category} · {formData.challenge?.district} · {formData.challenge?.priority} Priority
            </p>
          </div>
        </div>

        {/* Section 2 Review: The Idea */}
        <div className="p-5 rounded-2xl border border-[#EEEAE1] bg-white space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
              <Lightbulb className="h-3.5 w-3.5 text-[#F5A623]" />
              <span>02 THE IDEA</span>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="inline-flex items-center gap-1 text-[12px] font-bold text-[#123B2A] hover:underline cursor-pointer"
            >
              <Edit2 className="h-3 w-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-[15px] font-bold text-[#1D2522]">
              {formData.title}
            </h4>
            <p className="text-[13px] text-[#6B5845] leading-relaxed">
              {formData.summary}
            </p>
            {formData.coreIdea && (
              <p className="text-[12.5px] text-[#1D2522]/80 bg-[#FAF9F5] p-3 rounded-xl border border-[#EEEAE1]">
                <strong>Core Concept:</strong> {formData.coreIdea}
              </p>
            )}
          </div>
        </div>

        {/* Section 3 Review: The Approach */}
        <div className="p-5 rounded-2xl border border-[#EEEAE1] bg-white space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
              <Cpu className="h-3.5 w-3.5 text-[#F5A623]" />
              <span>03 THE APPROACH</span>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(3)}
              className="inline-flex items-center gap-1 text-[12px] font-bold text-[#123B2A] hover:underline cursor-pointer"
            >
              <Edit2 className="h-3 w-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px]">
            <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1">
              <span className="font-mono text-[10.5px] font-bold uppercase text-[#123B2A] block">
                PROPOSED APPROACH
              </span>
              <p className="text-[#1D2522]">{formData.proposedApproach}</p>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1">
              <span className="font-mono text-[10.5px] font-bold uppercase text-[#15803D] block">
                EXPECTED OUTCOME
              </span>
              <p className="text-[#1D2522]">{formData.expectedOutcome}</p>
            </div>
          </div>
        </div>

        {/* Section 4 Review: Readiness */}
        <div className="p-5 rounded-2xl border border-[#EEEAE1] bg-white space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
              <GitBranch className="h-3.5 w-3.5 text-[#F5A623]" />
              <span>04 MATURITY LEVEL</span>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(4)}
              className="inline-flex items-center gap-1 text-[12px] font-bold text-[#123B2A] hover:underline cursor-pointer"
            >
              <Edit2 className="h-3 w-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[13px] font-bold text-[#123B2A] bg-[#F8F6F1] px-3 py-1 rounded-md border border-[#EEEAE1]">
              STAGE: {formData.stage}
            </span>
            {formData.supportingMaterials.length > 0 && (
              <span className="text-[12px] text-[#6B5845]">
                {formData.supportingMaterials.length} Supporting Material(s) Attached
              </span>
            )}
          </div>
        </div>

        {/* Section 5 Review: Collaboration & Identity */}
        <div className="p-5 rounded-2xl border border-[#EEEAE1] bg-white space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
              <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
              <span>05 COLLABORATION & IDENTITY</span>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(5)}
              className="inline-flex items-center gap-1 text-[12px] font-bold text-[#123B2A] hover:underline cursor-pointer"
            >
              <Edit2 className="h-3 w-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-2">
            <div>
              <span className="text-[11px] font-mono text-[#6B5845] block uppercase mb-1">
                Requested Capabilities:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {formData.collaborationNeeds.length > 0 ? (
                  formData.collaborationNeeds.map((need) => (
                    <span
                      key={need}
                      className="px-2.5 py-1 rounded-md bg-[#FAF9F5] border border-[#EEEAE1] text-[11.5px] font-semibold text-[#123B2A]"
                    >
                      {need}
                    </span>
                  ))
                ) : (
                  <span className="text-[12px] text-[#6B5845]">
                    Open to general contributions
                  </span>
                )}
              </div>
            </div>

            <div className="text-[12px] text-[#6B5845] pt-1 border-t border-[#EEEAE1]">
              Submitter Role: <strong className="text-[#1D2522]">{formData.contributorRole}</strong>
              {formData.organization ? ` · ${formData.organization}` : ''}
            </div>
          </div>
        </div>
      </div>

      {/* ── Submission Footer ── */}
      <div className="p-6 rounded-3xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-4">
        <p className="text-[13px] text-[#6B5845] leading-relaxed">
          Your idea will be reviewed and connected to the relevant challenge ecosystem before being published for collaboration. This ensures problem alignment and prevents redundant duplicate projects.
        </p>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[15px] font-bold shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60"
        >
          <Send className="h-4 w-4 text-[#F5A623]" />
          <span>{isSubmitting ? 'Transmitting Idea Dossier...' : 'Submit Idea for Review →'}</span>
        </button>
      </div>
    </div>
  );
}
