import { useEffect, useState } from 'react';
import { AffectedGroup, ChallengeFormState, NoticeTimeframe, AIAssistSuggestion } from '../../types/submission';
import { AIAssistPanel } from './AIAssistPanel';
import { analyzeDescription } from '../../services/challengeSubmissionApi';
import { Users, Clock, AlertCircle } from 'lucide-react';

interface ProblemStepProps {
  formData: ChallengeFormState;
  onChange: (updates: Partial<ChallengeFormState>) => void;
  errors?: Record<string, string>;
}

const AFFECTED_OPTIONS: AffectedGroup[] = [
  'Residents',
  'Farmers',
  'Students',
  'Women',
  'Children',
  'Elderly Citizens',
  'Persons with Disabilities',
  'Workers',
  'Small Businesses',
  'Entire Community',
  'Other',
];

const TIMEFRAME_OPTIONS: NoticeTimeframe[] = [
  'Recently',
  'A few months ago',
  'More than a year ago',
  'It has existed for several years',
];

export function ProblemStep({ formData, onChange, errors = {} }: ProblemStepProps) {
  const [localSuggestion, setLocalSuggestion] = useState<AIAssistSuggestion | null>(
    formData.aiSuggestions
  );
  const [isApplied, setIsApplied] = useState(Boolean(formData.aiSuggestions));

  // Trigger AI assistant when description has enough length
  useEffect(() => {
    let active = true;

    if (formData.description.trim().length >= 25) {
      const timer = setTimeout(async () => {
        const res = await analyzeDescription(formData.description);
        if (active && res) {
          setLocalSuggestion(res);
        }
      }, 500);

      return () => {
        active = false;
        clearTimeout(timer);
      };
    } else {
      setLocalSuggestion(null);
    }
  }, [formData.description]);

  const toggleAffectedGroup = (group: AffectedGroup) => {
    const current = [...formData.affectedGroups];
    const idx = current.indexOf(group);
    if (idx >= 0) {
      current.splice(idx, 1);
    } else {
      current.push(group);
    }
    onChange({ affectedGroups: current });
  };

  const handleApplyAISuggestions = (sug: AIAssistSuggestion) => {
    onChange({ aiSuggestions: sug });
    setIsApplied(true);
  };

  return (
    <div className="space-y-8 text-left max-w-2xl mx-auto">
      {/* Step Header */}
      <div className="space-y-1.5 border-b border-[#EEEAE1] pb-5">
        <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          What problem are you facing or observing?
        </h2>
        <p className="text-[14.5px] text-[#6B5845] leading-relaxed">
          Describe the situation in your own words. You don&apos;t need technical language or administrative terminology.
        </p>
      </div>

      {/* Field 1: Challenge Title */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A] flex items-center gap-1.5">
            <span>Give the problem a short title</span>
            <span className="text-[#BE123C]">*</span>
          </label>
        </div>

        <input
          type="text"
          value={formData.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Example: Frequent breakdown of drinking water pumps in our village"
          className={`w-full h-12 px-4 rounded-xl border bg-white text-[15px] text-[#1D2522] placeholder:text-[#6B5845]/50 shadow-2xs focus:outline-none transition-all ${
            errors.title
              ? 'border-[#BE123C] ring-1 ring-[#BE123C]'
              : 'border-[#EEEAE1] focus:border-[#123B2A] focus:ring-1 focus:ring-[#123B2A]'
          }`}
        />
        {errors.title && (
          <p className="text-[12px] font-medium text-[#BE123C] flex items-center gap-1">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{errors.title}</span>
          </p>
        )}
      </div>

      {/* Field 2: Problem Description */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A] flex items-center gap-1.5">
            <span>What is happening?</span>
            <span className="text-[#BE123C]">*</span>
          </label>
          <span className="text-[11.5px] font-mono text-[#6B5845]">
            {formData.description.length} characters (min 20 recommended)
          </span>
        </div>

        <textarea
          rows={5}
          value={formData.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Describe the problem, how often it occurs, and what makes it difficult for the community. For example: During summer months, 4 out of 5 handpumps in our ward run dry, forcing women and elderly residents to walk 3 km..."
          className={`w-full p-4 rounded-xl border bg-white text-[14.5px] text-[#1D2522] placeholder:text-[#6B5845]/50 shadow-2xs focus:outline-none leading-relaxed transition-all ${
            errors.description
              ? 'border-[#BE123C] ring-1 ring-[#BE123C]'
              : 'border-[#EEEAE1] focus:border-[#123B2A] focus:ring-1 focus:ring-[#123B2A]'
          }`}
        />
        {errors.description && (
          <p className="text-[12px] font-medium text-[#BE123C] flex items-center gap-1">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{errors.description}</span>
          </p>
        )}
      </div>

      {/* Real-Time AI Assistance Panel */}
      {localSuggestion && (
        <AIAssistPanel
          suggestion={localSuggestion}
          onApply={handleApplyAISuggestions}
          isApplied={isApplied}
        />
      )}

      {/* Field 3: Who is affected? Structured multi-select chips */}
      <div className="space-y-3 pt-2">
        <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A] flex items-center gap-1.5">
          <Users className="h-4 w-4 text-[#F5A623]" />
          <span>Who is affected? (Select all that apply)</span>
        </label>

        <div className="flex flex-wrap gap-2">
          {AFFECTED_OPTIONS.map((opt) => {
            const isSelected = formData.affectedGroups.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleAffectedGroup(opt)}
                className={`px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all cursor-pointer shadow-2xs ${
                  isSelected
                    ? 'bg-[#123B2A] text-white border border-[#123B2A]'
                    : 'bg-white text-[#1D2522] border border-[#EEEAE1] hover:bg-[#FAF9F5]'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Field 4: When did you first notice this problem? */}
      <div className="space-y-3 pt-2">
        <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A] flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-[#F5A623]" />
          <span>When did you first notice this problem?</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {TIMEFRAME_OPTIONS.map((timeframe) => {
            const isSelected = formData.firstNoticed === timeframe;
            return (
              <button
                key={timeframe}
                type="button"
                onClick={() => onChange({ firstNoticed: timeframe })}
                className={`p-3 rounded-xl text-[13px] font-semibold text-left transition-all cursor-pointer shadow-2xs flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#123B2A] text-white border border-[#123B2A]'
                    : 'bg-white text-[#1D2522] border border-[#EEEAE1] hover:bg-[#FAF9F5]'
                }`}
              >
                <span>{timeframe}</span>
                <span
                  className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-white bg-[#F5A623]' : 'border-[#EEEAE1]'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
