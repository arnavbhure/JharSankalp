import {
  Sparkles,
  Check,
  CheckCircle2,
  ShieldAlert,
  Cpu,
  Compass,
  Activity,
  Tag,
  FileCheck,
  Globe2,
} from 'lucide-react';
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
  const domain = suggestion.suggestedDomain || suggestion.suggestedCategory;
  const subdomain = suggestion.suggestedSubdomain || suggestion.subDomain;
  const priority = suggestion.priority || suggestion.suggestedPriority || 'Medium';
  const summary = suggestion.summary || suggestion.analysisSummary;
  const priorityReason = suggestion.priorityReason;
  const impact = suggestion.impactAssessment;
  const recommendation = suggestion.reviewRecommendation;
  const innovations =
    suggestion.innovationDirections && suggestion.innovationDirections.length > 0
      ? suggestion.innovationDirections
      : suggestion.suggestedApproach || [];
  const technologies =
    suggestion.technologies && suggestion.technologies.length > 0
      ? suggestion.technologies
      : suggestion.requiredExpertise || [];
  const keywords =
    suggestion.keywords && suggestion.keywords.length > 0
      ? suggestion.keywords
      : suggestion.detectedKeywords || [];

  const normPriority = String(priority).toUpperCase();
  const isCritical = normPriority === 'CRITICAL';
  const isHigh = normPriority === 'HIGH';
  const isLow = normPriority === 'LOW';

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
              JHARSANKALP CIVIC AI ENGINE
            </span>
            <span className="text-[13px] font-bold text-[#1D2522]">
              Dynamic Challenge Intelligence Analysis
            </span>
          </div>
        </div>

        {suggestion.confidence && (
          <span className="text-[11.5px] font-mono font-bold text-[#123B2A] bg-white px-2.5 py-1 rounded-md border border-[#BBF7D0]">
            Confidence: {Math.round(suggestion.confidence * 100)}%
          </span>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <div className="bg-white/80 p-3.5 rounded-xl border border-[#123B2A]/10 space-y-1">
          <span className="text-[10px] font-mono uppercase font-bold text-[#6B5845] block tracking-wide">
            Problem Summary
          </span>
          <p className="text-[13.5px] text-[#1D2522] leading-relaxed font-medium">
            {summary}
          </p>
        </div>
      )}

      {/* Grid of Key Classification Findings */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Domain & Subdomain */}
        <div className="p-3 rounded-xl bg-white border border-[#123B2A]/15 space-y-1">
          <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] flex items-center gap-1">
            <Compass className="h-3 w-3 text-[#123B2A]" />
            Inferred Domain
          </span>
          <div className="text-[14px] font-bold text-[#123B2A] leading-tight">
            {domain}
          </div>
          {subdomain && (
            <div className="text-[11.5px] font-mono text-[#6B5845]">↳ {subdomain}</div>
          )}
        </div>

        {/* Priority Assessment */}
        <div className="p-3 rounded-xl bg-white border border-[#123B2A]/15 space-y-1">
          <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] flex items-center gap-1">
            <Activity className="h-3 w-3 text-[#BE123C]" />
            Severity & Priority
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[12px] font-mono font-bold px-2 py-0.5 rounded ${
                isCritical
                  ? 'bg-[#FFEBEB] text-[#BE123C] border border-[#FECDD3]'
                  : isHigh
                    ? 'bg-[#FEF6E9] text-[#B45309] border border-[#FDE68A]'
                    : isLow
                      ? 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]'
                      : 'bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]'
              }`}
            >
              {priority}
            </span>
          </div>
          {priorityReason && (
            <div className="text-[11.5px] text-[#6B5845] line-clamp-2">
              {priorityReason}
            </div>
          )}
        </div>

        {/* Human Review Recommendation */}
        <div className="p-3 rounded-xl bg-white border border-[#123B2A]/15 space-y-1">
          <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] flex items-center gap-1">
            <ShieldAlert className="h-3 w-3 text-[#B45309]" />
            Review Recommendation
          </span>
          <div className="text-[12px] text-[#1D2522] leading-snug line-clamp-3">
            {recommendation || (suggestion.needsHumanReview ? 'Flagged for Human Review' : 'Standard Validation Track')}
          </div>
        </div>
      </div>

      {/* Impact Assessment */}
      {impact && (
        <div className="p-3 rounded-xl bg-white border border-[#123B2A]/15 space-y-1">
          <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] flex items-center gap-1">
            <Globe2 className="h-3 w-3 text-[#123B2A]" />
            Impact Assessment
          </span>
          <p className="text-[12.5px] text-[#3D4C44] leading-relaxed">
            {impact}
          </p>
        </div>
      )}

      {/* Innovation Directions */}
      {innovations.length > 0 && (
        <div className="p-3 rounded-xl bg-white border border-[#123B2A]/15 space-y-1.5">
          <span className="text-[11px] font-mono uppercase font-bold text-[#123B2A] flex items-center gap-1">
            <Cpu className="h-3.5 w-3.5 text-[#15803D]" />
            Suggested Innovation Directions
          </span>
          <div className="flex flex-wrap gap-1.5">
            {innovations.map((appr, idx) => (
              <span
                key={idx}
                className="text-[11.5px] font-mono bg-[#FAF9F5] text-[#1D2522] border border-[#EEEAE1] px-2.5 py-0.5 rounded-md"
              >
                ✓ {appr}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Technologies & Keywords */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {technologies.length > 0 && (
          <div className="p-3 rounded-xl bg-white border border-[#123B2A]/15 space-y-1.5">
            <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] flex items-center gap-1">
              <FileCheck className="h-3 w-3 text-[#123B2A]" />
              Relevant Technologies & Methods
            </span>
            <div className="flex flex-wrap gap-1">
              {technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono bg-[#F2FBF5] text-[#123B2A] border border-[#BBF7D0] px-2 py-0.5 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {keywords.length > 0 && (
          <div className="p-3 rounded-xl bg-white border border-[#123B2A]/15 space-y-1.5">
            <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] flex items-center gap-1">
              <Tag className="h-3 w-3 text-[#6B5845]" />
              Detected Keywords
            </span>
            <div className="flex flex-wrap gap-1">
              {keywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono bg-[#FAF9F5] text-[#6B5845] border border-[#EEEAE1] px-2 py-0.5 rounded"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-[#123B2A]/15 flex-wrap gap-3">
        <span className="text-[11.5px] text-[#6B5845]">
          AI recommendations do not modify your submission without your approval.
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
