import { Check } from 'lucide-react';

interface SubmissionProgressProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (stepNumber: number) => void;
  canNavigateToStep: (stepNumber: number) => boolean;
}

const STEPS = [
  { num: 1, title: 'Describe Problem', subtitle: 'What is happening' },
  { num: 2, title: 'Location & Impact', subtitle: 'Where & who is affected' },
  { num: 3, title: 'Evidence & Context', subtitle: 'Photos & background' },
  { num: 4, title: 'Review & Submit', subtitle: 'AI assist & confirm' },
];

export function SubmissionProgress({
  currentStep,
  totalSteps,
  onStepClick,
  canNavigateToStep,
}: SubmissionProgressProps) {
  const currentStepData = STEPS[currentStep - 1] || STEPS[0];
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full text-left">
      {/* ── MOBILE COMPACT PROGRESS BAR ── */}
      <div className="md:hidden space-y-2 pb-4 border-b border-[#EEEAE1]">
        <div className="flex items-center justify-between text-[11.5px] font-mono">
          <span className="font-bold text-[#123B2A] tracking-wider uppercase">
            STEP {currentStep} OF {totalSteps} · {currentStepData.title}
          </span>
          <span className="text-[#6B5845]">{Math.round(progressPercentage)}% Complete</span>
        </div>

        {/* Progress Fill Bar */}
        <div className="h-2 w-full rounded-full bg-[#EEEAE1] overflow-hidden">
          <div
            className="h-full bg-[#123B2A] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* ── DESKTOP HORIZONTAL CONNECTED PROGRESS INDICATOR ── */}
      <div className="hidden md:block">
        <div className="relative flex items-center justify-between">
          {/* Background Connecting Line */}
          <div className="absolute left-8 right-8 top-5 h-[2px] bg-[#EEEAE1] -z-0" />

          {/* Active Connecting Fill Line */}
          <div
            className="absolute left-8 top-5 h-[2px] bg-[#123B2A] -z-0 transition-all duration-300"
            style={{
              width: `calc(${((currentStep - 1) / (totalSteps - 1)) * 100}% - 16px)`,
            }}
          />

          {STEPS.map((step) => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            const isClickable = canNavigateToStep(step.num);

            return (
              <button
                key={step.num}
                type="button"
                disabled={!isClickable}
                onClick={() => onStepClick(step.num)}
                className={`relative z-10 flex flex-col items-center group transition-all text-center focus:outline-none ${
                  isClickable ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                {/* Node Circle */}
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-mono font-bold transition-all duration-200 ${
                    isCompleted
                      ? 'bg-[#123B2A] text-white ring-4 ring-[#F8F6F1]'
                      : isCurrent
                        ? 'bg-[#123B2A] text-white ring-4 ring-[#123B2A]/20 scale-105 shadow-xs'
                        : 'bg-white text-[#6B5845] border-2 border-[#EEEAE1] group-hover:border-[#6B5845]/40'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 stroke-[3]" />
                  ) : (
                    <span>0{step.num}</span>
                  )}
                </div>

                {/* Node Label */}
                <div className="mt-2 space-y-0.5">
                  <div
                    className={`text-[13px] font-bold leading-tight font-sans transition-colors ${
                      isCurrent
                        ? 'text-[#123B2A]'
                        : isCompleted
                          ? 'text-[#1D2522]'
                          : 'text-[#6B5845]/70'
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-[11px] text-[#6B5845]/70 hidden lg:block font-medium">
                    {step.subtitle}
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
