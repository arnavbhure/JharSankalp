import { Sparkles, Check, CheckCircle2, ShieldAlert, Cpu, Users2, Compass, Activity } from 'lucide-react';
import { AIAssistSuggestion } from '../../types/submission';

interface AIAssistPanelProps {
  suggestion: AIAssistSuggestion;
  onApply: (suggestion: AIAssistSuggestion) => void;
  onDismiss?: () => void;
  isApplied?: boolean;
}

export function AIAssistPanel({
  suggestion,
  onApply,
  onDismiss,
  isApplied = false,
}: AIAssistPanelProps) {
  return (
    <div className="rounded-2xl border-2 border-[#123B2A]/25 bg-[#F2FBF5] p-5 sm:p-6 text-left space-y-4 shadow-sm transition-all animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-[#123B2A]/15 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#123B2A] text-[#F5A623]">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-[#123B2A] block">
              JHARSANKALP AI INTELLIGENCE ENGINE
            </span>
            <span className="text-[13px] font-bold text-[#1D2522]">
              Structured Challenge Classification & Recommendations
            </span>
          </div>
        </div>

        {suggestion.confidence && (
          <span className="text-[11.5px] font-mono font-bold text-[#123B2A] bg-white px-2.5 py-1 rounded-md border border-[#BBF7D0]">
            Confidence: {Math.round(suggestion.confidence * 100)}%
          </span>
        )}
      </div>

      {/* Summary Rationale */}
      {suggestion.analysisSummary && (
        <p className="text-[13px] text-[#3D4C44] leading-relaxed bg-white/70 p-3 rounded-xl border border-[#123B2A]/10">
          {suggestion.analysisSummary}
        </p>
      )}

      {/* Grid of Key Classification Findings */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Domain & Subdomain */}
        <div className="p-3 rounded-xl bg-white border border-[#123B2A]/15 space-y-1">
          <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] flex items-center gap-1">
            <Compass className="h-3 w-3 text-[#123B2A]" />
            Suggested Domain
          </span>
          <div className="text-[14px] font-bold text-[#123B2A] leading-tight">
            {suggestion.suggestedCategory}
          </div>
          {suggestion.subDomain && (
            <div className="text-[11.5px] font-mono text-[#6B5845]">
              ↳ {suggestion.subDomain}
            </div>
          )}
        </div>

        {/* Priority Assessment */}
        <div className="p-3 rounded-xl bg-white border border-[#123B2A]/15 space-y-1">
          <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] flex items-center gap-1">
            <Activity className="h-3 w-3 text-[#BE123C]" />
            Priority Assessment
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[12px] font-mono font-bold px-2 py-0.5 rounded ${
                suggestion.suggestedPriority === 'CRITICAL'
                  ? 'bg-[#FFEBEB] text-[#BE123C] border border-[#FECDD3]'
                  : suggestion.suggestedPriority === 'HIGH'
                  ? 'bg-[#FEF6E9] text-[#B45309] border border-[#FDE68A]'
                  : 'bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]'
              }`}
            >
              {suggestion.suggestedPriority}
            </span>
            {suggestion.estimatedImpactLevel && (
              <span className="text-[11px] font-mono text-[#6B5845]">
                ({suggestion.estimatedImpactLevel} SCALE)
              </span>
            )}
          </div>
          {suggestion.priorityReason && (
            <div className="text-[11.5px] text-[#6B5845] line-clamp-2">
              {suggestion.priorityReason}
            </div>
          )}
        </div>

        {/* Human Review Status */}
        <div className="p-3 rounded-xl bg-white border border-[#123B2A]/15 space-y-1">
          <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] flex items-center gap-1">
            <ShieldAlert className="h-3 w-3 text-[#B45309]" />
            Review Protocol
          </span>
          <div className="text-[13px] font-bold text-[#1D2522]">
            {suggestion.needsHumanReview ? 'Flagged for Human Review' : 'Standard Validation Track'}
          </div>
          <div className="text-[11px] text-[#6B5845]">
            Preserves human verification before state deployment.
          </div>
        </div>
      </div>

      {/* Suggested Innovation Directions */}
      {suggestion.suggestedApproach && suggestion.suggestedApproach.length > 0 && (
        <div className="p-3 rounded-xl bg-white border border-[#123B2A]/15 space-y-1.5">
          <span className="text-[11px] font-mono uppercase font-bold text-[#123B2A] flex items-center gap-1">
            <Cpu className="h-3.5 w-3.5 text-[#15803D]" />
            Suggested Innovation Directions & Technologies
          </span>
          <div className="flex flex-wrap gap-1.5">
            {suggestion.suggestedApproach.map((appr) => (
              <span
                key={appr}
                className="text-[11.5px] font-mono bg-[#FAF9F5] text-[#1D2522] border border-[#EEEAE1] px-2.5 py-0.5 rounded-md"
              >
                ✓ {appr}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Required Expertise & Stakeholders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {suggestion.requiredExpertise && suggestion.requiredExpertise.length > 0 && (
          <div className="p-3 rounded-xl bg-white border border-[#123B2A]/15 space-y-1">
            <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] block">
              Required Disciplines & Expertise
            </span>
            <div className="text-[12.5px] text-[#1D2522] font-medium leading-relaxed">
              {suggestion.requiredExpertise.join(', ')}
            </div>
          </div>
        )}

        {suggestion.affectedStakeholders && suggestion.affectedStakeholders.length > 0 && (
          <div className="p-3 rounded-xl bg-white border border-[#123B2A]/15 space-y-1">
            <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] flex items-center gap-1">
              <Users2 className="h-3 w-3 text-[#6B5845]" />
              Identified Stakeholders
            </span>
            <div className="text-[12.5px] text-[#1D2522] font-medium leading-relaxed">
              {suggestion.affectedStakeholders.join(', ')}
            </div>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-[#123B2A]/15 flex-wrap gap-3">
        <span className="text-[11.5px] text-[#6B5845]">
          AI recommendations do not modify your submission. You retain complete human control.
        </span>

        <div className="flex items-center gap-2.5">
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-[#6B5845] hover:text-[#1D2522] cursor-pointer"
            >
              Dismiss
            </button>
          )}

          <button
            type="button"
            onClick={() => onApply(suggestion)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[12.5px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
          >
            {isApplied ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-[#F5A623]" />
                <span>AI Guidance Applied</span>
              </>
            ) : (
              <>
                <Check className="h-3.5 w-3.5 text-[#F5A623]" />
                <span>Apply Recommendations to Form</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
