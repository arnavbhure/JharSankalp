import { Sparkles, Check, AlertCircle, CheckCircle2 } from 'lucide-react';
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
    <div className="rounded-2xl border-2 border-[#123B2A]/20 bg-[#F2FBF5] p-5 sm:p-6 text-left space-y-4 shadow-xs transition-all animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-[#123B2A]/15 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#123B2A] text-[#F5A623]">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-[#123B2A] block">
              JHARSANKALP ASSIST
            </span>
            <span className="text-[13px] font-bold text-[#1D2522]">
              We&apos;re helping structure your challenge.
            </span>
          </div>
        </div>

        {isApplied ? (
          <span className="inline-flex items-center gap-1 text-[12px] font-mono font-bold text-[#15803D] bg-white px-2.5 py-1 rounded-md border border-[#BBF7D0]">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Applied
          </span>
        ) : (
          <span className="text-[11px] font-mono text-[#6B5845] bg-white/70 px-2 py-0.5 rounded border border-[#123B2A]/10">
            Automated Draft Aid
          </span>
        )}
      </div>

      {/* Suggestion Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Suggested Focus Area */}
        <div className="p-3 rounded-xl bg-white border border-[#123B2A]/15 space-y-1">
          <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] block">
            Possible Focus Area
          </span>
          <div className="text-[14px] font-bold text-[#123B2A] leading-tight">
            {suggestion.suggestedCategory}
          </div>
        </div>

        {/* Related Themes */}
        <div className="p-3 rounded-xl bg-white border border-[#123B2A]/15 space-y-1 sm:col-span-2">
          <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] block">
            Related Cross-Cutting Themes
          </span>
          <div className="text-[13.5px] font-semibold text-[#1D2522] leading-tight">
            {suggestion.relatedThemes.join(' · ')}
          </div>
        </div>
      </div>

      {/* Potential Duplicates Notice */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-white/80 border border-[#123B2A]/10 text-[12.5px] text-[#6B5845] flex-wrap gap-2">
        <span className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-[#F5A623] shrink-0" />
          <span>
            <strong className="text-[#1D2522] font-semibold">
              {suggestion.potentialDuplicatesCount} similar challenges
            </strong>{' '}
            found in neighboring blocks. Submitting will link your ground observation to this ongoing cluster.
          </span>
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-1 flex-wrap gap-3">
        <span className="text-[11.5px] text-[#6B5845]">
          Suggestions are recommendations. You maintain complete control to edit at any step.
        </span>

        <div className="flex items-center gap-2.5">
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="px-3 py-1.5 rounded-lg text-[12.5px] font-medium text-[#6B5845] hover:text-[#1D2522] cursor-pointer"
            >
              Review Manually
            </button>
          )}

          <button
            type="button"
            onClick={() => onApply(suggestion)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
          >
            <Check className="h-3.5 w-3.5 text-[#F5A623]" />
            <span>{isApplied ? 'Update Suggestions' : 'Use Suggestions'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
