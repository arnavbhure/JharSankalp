import { useState } from 'react';
import { ChallengeFormState, AIAssistSuggestion } from '../../types/submission';
import { AIAssistPanel } from './AIAssistPanel';
import { analyzeDescription } from '../../services/challengeSubmissionApi';
import {
  AlertCircle,
  Sparkles,
  Loader2,
  Droplets,
  Sprout,
  GraduationCap,
  HeartPulse,
  Trees,
  HardHat,
  Accessibility,
  Coins,
  Building2,
  Zap,
  HelpCircle,
} from 'lucide-react';

interface ProblemStepProps {
  formData: ChallengeFormState;
  onChange: (updates: Partial<ChallengeFormState>) => void;
  errors?: Record<string, string>;
}

interface CategoryOption {
  label: string;
  icon: any;
  desc: string;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    label: 'Not sure — Help me identify it',
    icon: HelpCircle,
    desc: 'Our AI and review board will help classify the domain for you',
  },
  {
    label: 'Water Management',
    icon: Droplets,
    desc: 'Drinking water, wells, hand pumps, drought, water contamination',
  },
  {
    label: 'Agriculture',
    icon: Sprout,
    desc: 'Farming, crops, soil health, seeds, irrigation, fertilizer',
  },
  {
    label: 'Education',
    icon: GraduationCap,
    desc: 'Schools, students, learning materials, vernacular teaching',
  },
  {
    label: 'Healthcare',
    icon: HeartPulse,
    desc: 'Hospitals, clinics, anemia, medicines, maternal care, ASHA workers',
  },
  {
    label: 'Environment',
    icon: Trees,
    desc: 'Forests, pollution, rivers, waste management, wildlife safety',
  },
  {
    label: 'Mining Safety',
    icon: HardHat,
    desc: 'Mine subsidence, ground cracks, coal fires, quarry hazards',
  },
  {
    label: 'Accessibility',
    icon: Accessibility,
    desc: 'Mobility, ramps, disabled-friendly public facilities, assistive tools',
  },
  {
    label: 'Rural Livelihood',
    icon: Coins,
    desc: 'Artisans, lac, tussar silk, forest produce, women self-help groups',
  },
  {
    label: 'Urban Development',
    icon: Building2,
    desc: 'City roads, streetlights, stormwater drainage, municipal garbage',
  },
  {
    label: 'Public Services',
    icon: Zap,
    desc: 'Electricity supply, transformers, ration / PDS, bridges & connectivity',
  },
  {
    label: 'Other',
    icon: HelpCircle,
    desc: 'Any other challenge affecting your village or neighborhood',
  },
];

export function ProblemStep({ formData, onChange, errors = {} }: ProblemStepProps) {
  const [localSuggestion, setLocalSuggestion] = useState<AIAssistSuggestion | null>(
    formData.aiSuggestions
  );
  const [isApplied, setIsApplied] = useState(Boolean(formData.aiSuggestions));
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);

  const selectedCategory = formData.category || 'Not sure — Help me identify it';

  const handleTriggerAI = async () => {
    if (!formData.description || formData.description.trim().length < 15) {
      setAnalyzeError(
        'Please write at least 15 characters in the description before requesting AI feedback.'
      );
      return;
    }

    setIsAnalyzing(true);
    setAnalyzeError(null);
    try {
      const res = await analyzeDescription(
        formData.description,
        formData.title,
        formData.district
      );
      if (res) {
        setLocalSuggestion(res);
        setIsApplied(false);
      }
    } catch (err: any) {
      setAnalyzeError(err?.message || 'Unable to complete AI analysis right now.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApplyAISuggestions = (sug: AIAssistSuggestion) => {
    onChange({
      aiSuggestions: sug,
      category: sug.suggestedCategory,
    });
    setIsApplied(true);
  };

  return (
    <div className="space-y-8 text-left max-w-2xl mx-auto">
      {/* Step Header */}
      <div className="space-y-1.5 border-b border-[#EEEAE1] pb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#123B2A]/8 text-[#123B2A] text-[11px] font-mono font-bold uppercase tracking-wider">
          STEP 01 OF 04
        </div>
        <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Describe the problem you are seeing.
        </h2>
        <p className="text-[14.5px] text-[#6B5845] leading-relaxed">
          You don&apos;t need technical terminology or administrative knowledge. Tell us in simple words what is happening in your area.
        </p>
      </div>

      {/* Field 1: Problem Title */}
      <div className="space-y-2">
        <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A] flex items-center gap-1.5">
          <span>Problem Title</span>
          <span className="text-[#BE123C]">*</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Example: Village hand pumps frequently stop working for several days."
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

      {/* Field 2: Describe what is happening */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A] flex items-center gap-1.5">
            <span>Describe what is happening</span>
            <span className="text-[#BE123C]">*</span>
          </label>
          <span className="text-[11.5px] font-mono text-[#6B5845]">
            {formData.description.length} characters
          </span>
        </div>

        <p className="text-[13px] text-[#6B5845] italic">
          Tell us what the problem is, who is affected, and what happens because of it.
        </p>

        <textarea
          rows={6}
          value={formData.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Example: The hand pumps in our ward break down every few days during summer months. Over 200 families cannot get clean water and women have to walk more than 2 kilometers to the river..."
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

        {/* Optional AI Feedback Trigger */}
        <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
          <button
            type="button"
            onClick={handleTriggerAI}
            disabled={isAnalyzing || formData.description.trim().length < 15}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FAF9F5] hover:bg-[#EEEAE1] text-[#123B2A] border border-[#EEEAE1] text-[12px] font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[#F5A623]" />
                <span>Understanding your challenge...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
                <span>Get early AI feedback</span>
              </>
            )}
          </button>
          <span className="text-[11.5px] text-[#6B5845]">
            Optional: You can also use AI structuring in the review step.
          </span>
        </div>

        {analyzeError && (
          <p className="text-[12px] font-medium text-[#BE123C] flex items-center gap-1 pt-1">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{analyzeError}</span>
          </p>
        )}
      </div>

      {/* Early AI Assistance Panel if triggered */}
      {localSuggestion && (
        <AIAssistPanel
          suggestion={localSuggestion}
          onApply={handleApplyAISuggestions}
          onDismiss={() => setLocalSuggestion(null)}
          isApplied={isApplied}
        />
      )}

      {/* Field 3: Optional Problem Category */}
      <div className="space-y-3 pt-2">
        <div>
          <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A] block">
            Optional Problem Category
          </label>
          <p className="text-[12.5px] text-[#6B5845]">
            Pick what fits best, or choose &ldquo;Not sure&rdquo; and let the platform help.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {CATEGORY_OPTIONS.map((cat) => {
            const isSelected = selectedCategory === cat.label;
            const IconComponent = cat.icon;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => onChange({ category: cat.label })}
                className={`p-3.5 rounded-xl text-left transition-all cursor-pointer flex items-start gap-3 shadow-2xs border ${
                  isSelected
                    ? 'border-[#123B2A] bg-[#123B2A]/5 ring-1 ring-[#123B2A]'
                    : 'border-[#EEEAE1] bg-white hover:bg-[#FAF9F5]'
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    isSelected
                      ? 'bg-[#123B2A] text-white'
                      : 'bg-[#F8F6F1] text-[#6B5845]'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <div
                    className={`text-[13.5px] font-bold leading-tight font-sans ${
                      isSelected ? 'text-[#123B2A]' : 'text-[#1D2522]'
                    }`}
                  >
                    {cat.label}
                  </div>
                  <div className="text-[11.5px] text-[#6B5845] leading-snug">
                    {cat.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
