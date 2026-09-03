import { IdeaStage } from '../../types/ideas';

interface IdeaStageIndicatorProps {
  currentStage: IdeaStage;
}

const STAGES: { stage: IdeaStage; label: string }[] = [
  { stage: 'CONCEPT', label: 'Concept' },
  { stage: 'RESEARCH', label: 'Research' },
  { stage: 'PROTOTYPE', label: 'Prototype' },
  { stage: 'TESTING', label: 'Testing' },
  { stage: 'PILOT', label: 'Pilot' },
  { stage: 'IMPLEMENTED', label: 'Impact' },
];

const STAGE_INDEX: Record<IdeaStage, number> = {
  CONCEPT: 0,
  RESEARCH: 1,
  PROTOTYPE: 2,
  TESTING: 3,
  PILOT: 4,
  IMPLEMENTED: 5,
};

export function IdeaStageIndicator({ currentStage }: IdeaStageIndicatorProps) {
  const activeIdx = STAGE_INDEX[currentStage] ?? 0;

  return (
    <div className="w-full space-y-1.5 text-left">
      <div className="flex items-center justify-between text-[10.5px] font-mono">
        <span className="text-[#6B5845] font-semibold">Development Stage:</span>
        <span className="font-bold text-[#123B2A] uppercase tracking-wider">{currentStage}</span>
      </div>

      {/* Stage Dots Track */}
      <div className="relative flex items-center justify-between">
        {/* Background Connecting Line */}
        <div className="absolute left-1 right-1 top-1.5 h-[1.5px] bg-[#EEEAE1] -z-0" />

        {STAGES.map((st, i) => {
          const isCompleted = i < activeIdx;
          const isCurrent = i === activeIdx;

          return (
            <div key={st.stage} className="relative z-10 flex flex-col items-center group/dot">
              <div
                className={`h-3 w-3 rounded-full transition-all duration-200 ${
                  isCurrent
                    ? 'bg-[#123B2A] ring-4 ring-[#123B2A]/20 scale-125'
                    : isCompleted
                      ? 'bg-[#15803D] ring-2 ring-white'
                      : 'bg-white border border-[#EEEAE1]'
                }`}
              />
              <span
                className={`mt-1 text-[9px] font-mono hidden sm:block ${
                  isCurrent
                    ? 'font-bold text-[#123B2A]'
                    : isCompleted
                      ? 'text-[#1D2522]'
                      : 'text-[#6B5845]/60'
                }`}
              >
                {st.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
