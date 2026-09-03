import {
  EstimatedAffectedPopulation,
  ProblemFrequency,
  SeverityLevel,
  PreviousAttempts,
  ChallengeFormState,
} from '../../types/submission';
import { Users, Clock, AlertTriangle, RotateCcw } from 'lucide-react';

interface ImpactStepProps {
  formData: ChallengeFormState;
  onChange: (updates: Partial<ChallengeFormState>) => void;
}

const ESTIMATED_POPULATIONS: EstimatedAffectedPopulation[] = [
  'Less than 50',
  '50 – 500',
  '500 – 2,000',
  '2,000 – 10,000',
  'More than 10,000',
  'Not sure',
];

const FREQUENCIES: { value: ProblemFrequency; desc: string }[] = [
  { value: 'One-time issue', desc: 'Occurred once or very rarely' },
  { value: 'Occasional', desc: 'Happens a few times a season or month' },
  { value: 'Frequent', desc: 'Recurring multiple times each week' },
  { value: 'Daily / Ongoing', desc: 'Constant daily burden on residents' },
];

const SEVERITY_LEVELS: { value: SeverityLevel; desc: string }[] = [
  { value: 'Needs attention', desc: 'Noticeable problem, manageable for now' },
  { value: 'Important', desc: 'Substantial burden, needs planned solution' },
  { value: 'Urgent', desc: 'Severe disruption affecting health, water, or safety' },
  { value: 'Critical', desc: 'Immediate risk to lives, property, or essential supply' },
  { value: 'Not sure', desc: 'Requires expert assessment' },
];

const PREVIOUS_ATTEMPTS: PreviousAttempts[] = ['Yes', 'No', "I'm not sure"];

export function ImpactStep({ formData, onChange }: ImpactStepProps) {
  return (
    <div className="space-y-8 text-left max-w-2xl mx-auto">
      {/* Step Header */}
      <div className="space-y-1.5 border-b border-[#EEEAE1] pb-5">
        <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Who is affected and how serious is the problem?
        </h2>
        <p className="text-[14.5px] text-[#6B5845] leading-relaxed">
          You don&apos;t need exact census data. Approximate ranges help district officers and
          universities prioritize response resources.
        </p>
      </div>

      {/* 1. Estimated People Affected */}
      <div className="space-y-3">
        <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A] flex items-center gap-1.5">
          <Users className="h-4 w-4 text-[#F5A623]" />
          <span>Estimated People Affected</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {ESTIMATED_POPULATIONS.map((pop) => {
            const isSelected = formData.estimatedPeople === pop;
            return (
              <button
                key={pop}
                type="button"
                onClick={() => onChange({ estimatedPeople: pop })}
                className={`p-3 rounded-xl text-[13px] font-semibold text-center transition-all cursor-pointer shadow-2xs ${
                  isSelected
                    ? 'bg-[#123B2A] text-white border border-[#123B2A]'
                    : 'bg-white text-[#1D2522] border border-[#EEEAE1] hover:bg-[#FAF9F5]'
                }`}
              >
                {pop}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Frequency of Problem */}
      <div className="space-y-3 pt-2">
        <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A] flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-[#F5A623]" />
          <span>How often does this problem occur?</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {FREQUENCIES.map((freq) => {
            const isSelected = formData.frequency === freq.value;
            return (
              <button
                key={freq.value}
                type="button"
                onClick={() => onChange({ frequency: freq.value })}
                className={`p-3.5 rounded-xl text-left transition-all cursor-pointer shadow-2xs flex flex-col justify-between space-y-1 ${
                  isSelected
                    ? 'bg-[#123B2A] text-white border border-[#123B2A]'
                    : 'bg-white text-[#1D2522] border border-[#EEEAE1] hover:bg-[#FAF9F5]'
                }`}
              >
                <div className="text-[14px] font-bold leading-tight">{freq.value}</div>
                <div className={`text-[12px] ${isSelected ? 'text-white/80' : 'text-[#6B5845]'}`}>
                  {freq.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Severity & Urgency Level */}
      <div className="space-y-3 pt-2">
        <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A] flex items-center gap-1.5">
          <AlertTriangle className="h-4 w-4 text-[#F5A623]" />
          <span>How urgently does this problem need attention?</span>
        </label>

        <div className="space-y-2">
          {SEVERITY_LEVELS.map((sev) => {
            const isSelected = formData.severity === sev.value;
            return (
              <button
                key={sev.value}
                type="button"
                onClick={() => onChange({ severity: sev.value })}
                className={`w-full p-3.5 rounded-xl text-left transition-all cursor-pointer shadow-2xs flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#123B2A] text-white border border-[#123B2A]'
                    : 'bg-white text-[#1D2522] border border-[#EEEAE1] hover:bg-[#FAF9F5]'
                }`}
              >
                <div>
                  <span className="text-[14px] font-bold block">{sev.value}</span>
                  <span
                    className={`text-[12px] ${isSelected ? 'text-white/80' : 'text-[#6B5845]'}`}
                  >
                    {sev.desc}
                  </span>
                </div>

                <span
                  className={`h-4 w-4 rounded-full border-2 shrink-0 ${
                    isSelected ? 'border-white bg-[#F5A623]' : 'border-[#EEEAE1]'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Existing Attempts */}
      <div className="space-y-3 pt-2">
        <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A] flex items-center gap-1.5">
          <RotateCcw className="h-4 w-4 text-[#F5A623]" />
          <span>Has anyone already tried to solve this problem?</span>
        </label>

        <div className="grid grid-cols-3 gap-2.5">
          {PREVIOUS_ATTEMPTS.map((opt) => {
            const isSelected = formData.hasPreviousAttempts === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange({ hasPreviousAttempts: opt })}
                className={`p-3 rounded-xl text-[13px] font-semibold text-center transition-all cursor-pointer shadow-2xs ${
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

        {/* If Yes: Textarea */}
        {formData.hasPreviousAttempts === 'Yes' && (
          <div className="space-y-1.5 pt-2 animate-in fade-in duration-200">
            <label className="text-[12.5px] font-medium text-[#6B5845]">
              What has already been tried and what happened?
            </label>
            <textarea
              rows={3}
              value={formData.previousAttemptsDetail}
              onChange={(e) => onChange({ previousAttemptsDetail: e.target.value })}
              placeholder="e.g. The gram panchayat replaced the pump washer last year, but it failed again in 2 weeks because sand is entering the pipe..."
              className="w-full p-3.5 rounded-xl border border-[#EEEAE1] bg-white text-[14px] text-[#1D2522] placeholder:text-[#6B5845]/50 shadow-2xs focus:outline-none focus:border-[#123B2A] focus:ring-1 focus:ring-[#123B2A] transition-all"
            />
          </div>
        )}
      </div>
    </div>
  );
}
