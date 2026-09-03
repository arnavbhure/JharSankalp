import { Check } from 'lucide-react';

interface SubmissionProgressProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  maxStepAllowed: number;
}

const STEPS = [
  { step: 1, number: '01', title: 'Challenge' },
  { step: 2, number: '02', title: 'The Idea' },
  { step: 3, number: '03', title: 'Approach' },
  { step: 4, number: '04', title: 'Readiness' },
  { step: 5, number: '05', title: 'Collaboration' },
];

export function SubmissionProgress({
  currentStep,
  onStepClick,
  maxStepAllowed,
}: SubmissionProgressProps) {
  return (
    <div className="w-full border-b border-[#EEEAE1] bg-white py-4 text-left">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {STEPS.map((s, idx) => {
            const isCompleted = s.step < currentStep;
            const isCurrent = s.step === currentStep;
            const isClickable = s.step <= maxStepAllowed;

            return (
              <div key={s.step} className="flex items-center flex-1 min-w-[110px] sm:min-w-0">
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick(s.step)}
                  className={`flex items-center gap-2.5 transition-all text-left group ${
                    isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-mono font-bold transition-all shrink-0 ${
                      isCurrent
                        ? 'bg-[#123B2A] text-[#F5A623] ring-4 ring-[#123B2A]/10 shadow-xs'
                        : isCompleted
                        ? 'bg-[#15803D] text-white shadow-2xs'
                        : 'bg-[#FAF9F5] text-[#6B5845] border border-[#EEEAE1]'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4 stroke-[3]" />
                    ) : (
                      <span>{s.number}</span>
                    )}
                  </div>

                  <div className="hidden sm:block space-y-0.5 min-w-0">
                    <span
                      className={`text-[12px] font-bold block truncate ${
                        isCurrent
                          ? 'text-[#123B2A]'
                          : isCompleted
                          ? 'text-[#1D2522]'
                          : 'text-[#6B5845]'
                      }`}
                    >
                      {s.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#6B5845] block">
                      {isCurrent ? 'Active' : isCompleted ? 'Completed' : 'Upcoming'}
                    </span>
                  </div>
                </button>

                {idx < STEPS.length - 1 && (
                  <div
                    className={`hidden sm:block h-[1.5px] flex-1 mx-3 transition-colors ${
                      idx < currentStep - 1 ? 'bg-[#15803D]' : 'bg-[#EEEAE1]'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
