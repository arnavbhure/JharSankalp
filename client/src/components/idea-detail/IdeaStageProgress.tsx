import { IdeaStage } from '../../types/ideas';
import { GitBranch, Check, Circle, Target, Milestone } from 'lucide-react';

interface IdeaStageProgressProps {
  currentStage: IdeaStage;
  currentFocus: string;
  nextMilestone: string;
}

const LIFECYCLE_STAGES = [
  { stage: 'CONCEPT', label: 'Concept' },
  { stage: 'RESEARCH', label: 'Research' },
  { stage: 'PROTOTYPE', label: 'Prototype' },
  { stage: 'TESTING', label: 'Testing' },
  { stage: 'PILOT', label: 'Pilot' },
  { stage: 'IMPLEMENTED', label: 'Implementation' },
];

const STAGE_ORDER: Record<IdeaStage, number> = {
  CONCEPT: 0,
  RESEARCH: 1,
  PROTOTYPE: 2,
  TESTING: 3,
  PILOT: 4,
  IMPLEMENTED: 5,
};

export function IdeaStageProgress({
  currentStage,
  currentFocus,
  nextMilestone,
}: IdeaStageProgressProps) {
  const currentIdx = STAGE_ORDER[currentStage] ?? 2;

  return (
    <section id="progress" className="space-y-6 text-left">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <GitBranch className="h-4 w-4 text-[#F5A623]" />
          <span>SECTION 04 · MATURITY & ROADMAP</span>
        </div>

        <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Where the idea stands today
        </h2>
        <p className="text-[14px] text-[#6B5845] leading-relaxed max-w-2xl">
          Track this innovation&apos;s journey from napkin sketch to verified field deployment in
          Jharkhand villages.
        </p>
      </div>

      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-8">
        {/* ── 6-Stage Visual Track ── */}
        <div className="relative py-4">
          {/* Connecting Track Line */}
          <div className="absolute left-6 right-6 top-8 h-[2px] bg-[#EEEAE1] -z-0" />

          {/* Active Fill Line */}
          <div
            className="absolute left-6 top-8 h-[2px] bg-[#123B2A] -z-0 transition-all duration-300"
            style={{ width: `${(currentIdx / (LIFECYCLE_STAGES.length - 1)) * 100}%` }}
          />

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 relative z-10 text-center">
            {LIFECYCLE_STAGES.map((item, idx) => {
              const isCompleted = idx < currentIdx;
              const isCurrent = idx === currentIdx;

              return (
                <div key={item.stage} className="flex flex-col items-center space-y-2">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-mono font-bold transition-all ${
                      isCompleted
                        ? 'bg-[#123B2A] text-white ring-4 ring-white shadow-2xs'
                        : isCurrent
                          ? 'bg-[#F5A623] text-white ring-4 ring-[#F5A623]/25 scale-110 shadow-xs'
                          : 'bg-white text-[#6B5845] border-2 border-[#EEEAE1]'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4 stroke-[3]" />
                    ) : isCurrent ? (
                      <Circle className="h-3 w-3 fill-white" />
                    ) : (
                      <span>0{idx + 1}</span>
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <span
                      className={`text-[12px] font-bold block ${
                        isCurrent
                          ? 'text-[#123B2A]'
                          : isCompleted
                            ? 'text-[#1D2522]'
                            : 'text-[#6B5845]/70'
                      }`}
                    >
                      {item.label}
                    </span>

                    {isCurrent && (
                      <span className="inline-block text-[9.5px] font-mono font-bold px-2 py-0.5 rounded bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                        CURRENT
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Current Focus & Next Milestone Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-[#EEEAE1]">
          {/* Current Focus */}
          <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
              <Target className="h-4 w-4 text-[#F5A623]" />
              <span>CURRENT FOCUS</span>
            </div>
            <p className="text-[14px] text-[#1D2522] leading-relaxed font-medium">{currentFocus}</p>
          </div>

          {/* Next Milestone */}
          <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#15803D]">
              <Milestone className="h-4 w-4" />
              <span>NEXT MILESTONE</span>
            </div>
            <p className="text-[14px] text-[#1D2522] leading-relaxed font-medium">
              {nextMilestone}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
