import { useState } from 'react';
import { ChallengeFormState, AIAssistSuggestion } from '../../types/submission';
import { analyzeDescription } from '../../services/challengeSubmissionApi';
import {
  Edit2,
  Sparkles,
  FileText,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Compass,
  Activity,
  ShieldCheck,
  ArrowRight,
  Info,
} from 'lucide-react';

interface ReviewStepProps {
  formData: ChallengeFormState;
  onEditStep: (stepNumber: number) => void;
  onDeclarationChange: (accepted: boolean) => void;
  onApplyAISuggestion?: (suggestion: AIAssistSuggestion) => void;
  onSubmit: () => void;
  submitting: boolean;
  error?: string;
}

export function ReviewStep({
  formData,
  onEditStep,
  onDeclarationChange,
  onApplyAISuggestion,
  onSubmit,
  submitting,
  error,
}: ReviewStepProps) {
  const [aiSuggestion, setAiSuggestion] = useState<AIAssistSuggestion | null>(
    formData.aiSuggestions,
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);
  const [isApplied, setIsApplied] = useState(Boolean(formData.aiSuggestions));

  const handleStructureChallenge = async () => {
    if (!formData.description || formData.description.trim().length < 10) {
      setAnalyzeError('Please provide a problem description before requesting AI structuring.');
      return;
    }

    setIsAnalyzing(true);
    setAnalyzeError(null);
    setAiSuggestion(null); // Clear previous suggestion immediately to prevent stale UX
    try {
      const res = await analyzeDescription(
        formData.description,
        formData.title,
        formData.district,
        undefined,
        formData.category !== 'Not sure — Help me identify it' ? formData.category : undefined,
      );
      if (res) {
        setAiSuggestion(res);
        setIsApplied(false);
        if (onApplyAISuggestion) {
          onApplyAISuggestion(res);
        }
      }
    } catch (err: any) {
      setAnalyzeError(err?.message || 'Unable to connect to AI analysis service. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAcceptSuggestion = () => {
    if (aiSuggestion && onApplyAISuggestion) {
      onApplyAISuggestion(aiSuggestion);
    }
    setIsApplied(true);
  };

  const displayDomain =
    formData.category && formData.category !== 'Not sure — Help me identify it'
      ? formData.category
      : aiSuggestion?.suggestedDomain || aiSuggestion?.suggestedCategory || 'To be classified by review board';

  const displayPriority =
    formData.urgency || formData.severity || aiSuggestion?.priority || aiSuggestion?.suggestedPriority || 'Standard';

  return (
    <div className="space-y-8 text-left max-w-2xl mx-auto">
      {/* Step Header */}
      <div className="space-y-1.5 border-b border-[#EEEAE1] pb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#123B2A]/8 text-[#123B2A] text-[11px] font-mono font-bold uppercase tracking-wider">
          STEP 04 OF 04 · REVIEW & SUBMIT
        </div>
        <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Review your challenge
        </h2>
        <p className="text-[14.5px] text-[#6B5845] leading-relaxed">
          Please review the summary below. You can use our AI assistant to help structure your
          problem statement, or edit any details before submitting.
        </p>
      </div>

      {/* ── AI STRUCTURING CALLOUT & PANEL ── */}
      <div className="rounded-2xl border-2 border-[#123B2A]/20 bg-[#F2FBF5] p-5 sm:p-6 text-left space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-[#123B2A]/15 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#123B2A] text-[#F5A623]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-[#123B2A] block">
                JHARSANKALP CIVIC INTELLIGENCE ENGINE
              </span>
              <h3 className="text-[14px] font-bold text-[#1D2522]">
                AI-Assisted Problem Structuring
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStructureChallenge}
            disabled={isAnalyzing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13px] font-bold shadow-xs transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-[#F5A623]" />
                <span>Understanding your challenge...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-[#F5A623]" />
                <span>Help me structure this challenge</span>
              </>
            )}
          </button>
        </div>

        {/* AI Transparency Notice */}
        <div className="flex items-start gap-2 bg-white/70 p-3 rounded-xl border border-[#123B2A]/10 text-[12px] text-[#6B5845]">
          <Info className="h-4 w-4 text-[#123B2A] shrink-0 mt-0.5" />
          <span>
            <strong className="text-[#1D2522]">AI Transparency:</strong> Suggestions assist with
            classification, prioritization, and stakeholder mapping. Real district officers,
            university researchers, and domain experts review and validate all submissions.
          </span>
        </div>

        {analyzeError && (
          <div className="p-3 rounded-xl bg-[#FFF1F2] border border-[#FECDD3] text-[12.5px] text-[#BE123C] flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{analyzeError}</span>
            </div>
            <button
              type="button"
              onClick={handleStructureChallenge}
              className="px-2.5 py-1 rounded-md bg-[#BE123C] text-white text-[11.5px] font-bold hover:bg-[#9F1239] transition-all cursor-pointer shrink-0"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading Skeleton while AI structuring is processing */}
        {isAnalyzing && (
          <div className="space-y-4 pt-1 animate-pulse">
            <div className="h-16 bg-white rounded-xl border border-[#123B2A]/15 p-3.5" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="h-24 bg-white rounded-xl border border-[#123B2A]/15 p-3.5" />
              <div className="h-24 bg-white rounded-xl border border-[#123B2A]/15 p-3.5" />
              <div className="h-24 bg-white rounded-xl border border-[#123B2A]/15 p-3.5" />
            </div>
            <div className="h-16 bg-white rounded-xl border border-[#123B2A]/15 p-3.5" />
          </div>
        )}

        {/* AI Analysis Output Display */}
        {!isAnalyzing && aiSuggestion && (
          <div className="space-y-4 pt-1 animate-in fade-in duration-300">
            {/* Summary Rationale */}
            {(aiSuggestion.summary || aiSuggestion.analysisSummary) && (
              <div className="bg-white p-3.5 rounded-xl border border-[#123B2A]/15 space-y-1">
                <span className="text-[11px] font-mono font-bold uppercase text-[#6B5845] block">
                  Detected Problem Summary
                </span>
                <p className="text-[13.5px] text-[#1D2522] leading-relaxed">
                  {aiSuggestion.summary || aiSuggestion.analysisSummary}
                </p>
              </div>
            )}

            {/* Key Classification Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Domain & Category */}
              <div className="p-3.5 rounded-xl bg-white border border-[#123B2A]/15 space-y-1">
                <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] flex items-center gap-1">
                  <Compass className="h-3 w-3 text-[#123B2A]" />
                  Suggested Domain
                </span>
                <div className="text-[14px] font-bold text-[#123B2A] leading-tight">
                  {aiSuggestion.suggestedDomain || aiSuggestion.suggestedCategory}
                </div>
                {(aiSuggestion.suggestedSubdomain || aiSuggestion.subDomain) && (
                  <div className="text-[11.5px] font-mono text-[#6B5845]">
                    ↳ {aiSuggestion.suggestedSubdomain || aiSuggestion.subDomain}
                  </div>
                )}
                {aiSuggestion.confidence && (
                  <div className="text-[10.5px] font-mono text-[#15803D] pt-0.5">
                    Confidence: {Math.round(aiSuggestion.confidence * 100)}%
                  </div>
                )}
              </div>

              {/* Suggested Priority */}
              <div className="p-3.5 rounded-xl bg-white border border-[#123B2A]/15 space-y-1">
                <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] flex items-center gap-1">
                  <Activity className="h-3 w-3 text-[#BE123C]" />
                  Suggested Priority
                </span>
                <div className="pt-0.5">
                  <span
                    className={`text-[12px] font-mono font-bold px-2 py-0.5 rounded ${
                      (aiSuggestion.priority || aiSuggestion.suggestedPriority)?.toUpperCase() ===
                      'CRITICAL'
                        ? 'bg-[#FFEBEB] text-[#BE123C] border border-[#FECDD3]'
                        : (aiSuggestion.priority || aiSuggestion.suggestedPriority)?.toUpperCase() ===
                            'HIGH'
                          ? 'bg-[#FEF6E9] text-[#B45309] border border-[#FDE68A]'
                          : (aiSuggestion.priority || aiSuggestion.suggestedPriority)?.toUpperCase() ===
                              'LOW'
                            ? 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]'
                            : 'bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]'
                    }`}
                  >
                    {aiSuggestion.priority || aiSuggestion.suggestedPriority}
                  </span>
                </div>
                {aiSuggestion.priorityReason && (
                  <div className="text-[11px] text-[#6B5845] line-clamp-2">
                    {aiSuggestion.priorityReason}
                  </div>
                )}
              </div>

              {/* Review Recommendation */}
              <div className="p-3.5 rounded-xl bg-white border border-[#123B2A]/15 space-y-1">
                <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-[#123B2A]" />
                  Review Protocol
                </span>
                <div className="text-[12px] text-[#1D2522] leading-snug">
                  {aiSuggestion.reviewRecommendation || 'Human Validation: Awaiting district review.'}
                </div>
              </div>
            </div>

            {/* Impact Assessment */}
            {aiSuggestion.impactAssessment && (
              <div className="p-3.5 rounded-xl bg-white border border-[#123B2A]/15 space-y-1">
                <span className="text-[11px] font-mono uppercase font-bold text-[#123B2A] block">
                  Impact Assessment
                </span>
                <p className="text-[12.5px] text-[#3D4C44] leading-relaxed">
                  {aiSuggestion.impactAssessment}
                </p>
              </div>
            )}

            {/* Innovation Directions */}
            {(aiSuggestion.innovationDirections || aiSuggestion.suggestedApproach) &&
              (aiSuggestion.innovationDirections?.length || aiSuggestion.suggestedApproach?.length || 0) >
                0 && (
                <div className="p-3.5 rounded-xl bg-white border border-[#123B2A]/15 space-y-1.5">
                  <span className="text-[11px] font-mono uppercase font-bold text-[#123B2A] block">
                    Suggested Innovation Directions & Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(aiSuggestion.innovationDirections || aiSuggestion.suggestedApproach || []).map(
                      (appr: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-[11.5px] font-mono bg-[#FAF9F5] text-[#1D2522] border border-[#EEEAE1] px-2.5 py-0.5 rounded-md"
                        >
                          ✓ {appr}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              )}

            {/* Accept / Applied Bar */}
            <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
              <span className="text-[11.5px] text-[#6B5845]">
                {isApplied
                  ? 'AI recommendations merged into your challenge docket.'
                  : 'Click below to accept these suggestions before submitting.'}
              </span>
              <button
                type="button"
                onClick={handleAcceptSuggestion}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#123B2A] text-white text-[12px] font-bold shadow-2xs hover:bg-[#0D2B1E] transition-all cursor-pointer"
              >
                {isApplied ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#F5A623]" />
                    <span>Suggestions Accepted</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
                    <span>Accept AI Suggestions</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── SUMMARY DOCKET CARD ── */}
      <div className="rounded-2xl border border-[#EEEAE1] bg-white p-6 shadow-2xs space-y-6">
        <div className="border-b border-[#EEEAE1] pb-3 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase font-bold text-[#6B5845] block">
              YOUR CHALLENGE DOCKET
            </span>
            <h3 className="text-[1.3rem] font-bold text-[#1D2522] font-sans">
              {formData.title || 'Untitled Challenge'}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="text-[12.5px] font-bold text-[#123B2A] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <Edit2 className="h-3.5 w-3.5" />
            <span>Edit</span>
          </button>
        </div>

        {/* Key Metrics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EEEAE1] text-[13px]">
          <div>
            <span className="text-[11px] font-mono text-[#6B5845] block">Domain</span>
            <strong className="text-[#1D2522] block truncate">{displayDomain}</strong>
          </div>
          <div>
            <span className="text-[11px] font-mono text-[#6B5845] block">Location</span>
            <strong className="text-[#1D2522] block truncate">
              {formData.district || 'Jharkhand'} · {formData.block || 'Block'}
            </strong>
          </div>
          <div>
            <span className="text-[11px] font-mono text-[#6B5845] block">Affected</span>
            <strong className="text-[#1D2522] block">
              {formData.estimatedPeople ? `${formData.estimatedPeople} people` : 'Community'}
            </strong>
          </div>
          <div>
            <span className="text-[11px] font-mono text-[#6B5845] block">Urgency</span>
            <strong className="text-[#1D2522] block">{displayPriority}</strong>
          </div>
        </div>

        {/* Problem Description */}
        <div className="space-y-1.5">
          <span className="text-[11.5px] font-mono font-bold uppercase text-[#6B5845] block">
            Your Description
          </span>
          <p className="text-[13.5px] text-[#1D2522]/90 leading-relaxed whitespace-pre-line bg-[#FAF9F5] p-4 rounded-xl border border-[#EEEAE1]">
            {formData.description || 'No description provided'}
          </p>
        </div>

        {/* Affected Groups & Context */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
          <div>
            <span className="text-[11px] font-mono text-[#6B5845] block">Impacted Population</span>
            <div className="font-semibold text-[#1D2522] pt-0.5">
              {formData.affectedGroups && formData.affectedGroups.length > 0
                ? formData.affectedGroups.join(', ')
                : 'General residents'}
            </div>
          </div>
          <div>
            <span className="text-[11px] font-mono text-[#6B5845] block">First Observed</span>
            <div className="font-semibold text-[#1D2522] pt-0.5">
              {formData.firstNoticed || 'Recently'}
            </div>
          </div>
        </div>

        {/* Evidence Attachments */}
        {formData.evidenceFiles && formData.evidenceFiles.length > 0 && (
          <div className="space-y-1.5 pt-2 border-t border-[#EEEAE1]">
            <div className="flex items-center justify-between">
              <span className="text-[11.5px] font-mono font-bold uppercase text-[#6B5845]">
                Attached Evidence ({formData.evidenceFiles.length} files)
              </span>
              <button
                type="button"
                onClick={() => onEditStep(3)}
                className="text-[12px] font-bold text-[#123B2A] hover:underline"
              >
                Change
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.evidenceFiles.map((f) => (
                <a
                  key={f.id}
                  href={f.publicUrl || f.previewUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] font-mono bg-[#FAF9F5] text-[#123B2A] hover:bg-white hover:underline border border-[#EEEAE1] px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 transition-colors"
                  title="View uploaded evidence"
                >
                  <FileText className="h-3 w-3 text-[#123B2A]" />
                  <span>{f.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── DECLARATION & SUBMISSION ACTION ── */}
      <div className="space-y-4 pt-2">
        <label className="flex items-start gap-3 p-4 rounded-xl border border-[#EEEAE1] bg-white cursor-pointer hover:bg-[#FAF9F5] transition-all shadow-2xs">
          <input
            type="checkbox"
            checked={formData.declarationAccepted}
            onChange={(e) => onDeclarationChange(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#123B2A]"
          />
          <div className="text-[12.5px] text-[#1D2522] leading-relaxed">
            I declare that this challenge describes a genuine issue observed in Jharkhand. I
            understand that the information will be processed with AI assistance and reviewed by
            public authorities and research institutions.
          </div>
        </label>

        {error && (
          <p className="text-[12.5px] font-medium text-[#BE123C] flex items-center gap-1.5">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </p>
        )}

        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="w-full py-4 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[15px] font-bold shadow-sm transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin text-[#F5A623]" />
              <span>Submitting challenge to innovation exchange...</span>
            </>
          ) : (
            <>
              <span>Submit Challenge to JharSankalp</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
