import { CheckCircle2, Clock } from 'lucide-react';
import { ChallengeDetailData } from '../../types/challengeDetail';

interface LifecycleProgressProps {
  challenge: ChallengeDetailData;
}

export function LifecycleProgress({ challenge }: LifecycleProgressProps) {
  const currentStage = challenge.lifecycleStages.find((s) => s.status === 'current');

  return (
    <section id="lifecycle-progress" className="py-12 sm:py-16 border-b border-[#EEEAE1] text-left">
      <div className="space-y-1 mb-8">
        <div className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#123B2A] font-bold">
          <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
          SIX-STAGE CIVIC IMPACT LOOP
        </div>
        <h2 className="text-[1.85rem] sm:text-[2.25rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Project Progress & Roadmap
        </h2>
        <p className="text-[14px] text-[#6B5845] max-w-xl">
          Track the transition from raw citizen report to validated state-wide public policy intervention.
        </p>
      </div>

      {/* ── Connected 6-Stage Lifecycle Flow Bar ── */}
      <div className="rounded-2xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-8">
        {/* Current Stage Highlight Header */}
        <div className="p-4 rounded-xl bg-[#F8F6F1] border border-[#EEEAE1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-mono uppercase font-bold text-[#6B5845] tracking-wider block">
              CURRENT STAGE
            </span>
            <div className="text-[1.25rem] font-extrabold text-[#123B2A] font-sans mt-0.5">
              {currentStage?.label || 'Research & Solution Exploration'}
            </div>
          </div>

          <div className="flex items-center gap-2 text-[12px] font-mono text-[#B45309] bg-[#FEF6E9] px-3 py-1 rounded-md border border-[#F8CCA5] font-bold self-start sm:self-auto">
            <Clock className="h-3.5 w-3.5 animate-spin" />
            <span>Active Milestone: Sensor Benchmarking</span>
          </div>
        </div>

        {/* 6 Stages Track */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {challenge.lifecycleStages.map((stage, idx) => {
            const isCompleted = stage.status === 'completed';
            const isCurrent = stage.status === 'current';

            return (
              <div
                key={stage.stage}
                className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all ${
                  isCurrent
                    ? 'border-[#123B2A] bg-[#123B2A]/5 ring-2 ring-[#123B2A]/20 shadow-xs'
                    : isCompleted
                    ? 'border-[#BBF7D0] bg-[#F0FDF4]'
                    : 'border-[#EEEAE1] bg-[#FAF9F5] opacity-70'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-[#6B5845]">
                      0{idx + 1}
                    </span>

                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-[#15803D]">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Done</span>
                      </span>
                    ) : isCurrent ? (
                      <span className="flex items-center gap-1 text-[10.5px] font-mono font-bold px-2 py-0.5 rounded bg-[#123B2A] text-white">
                        Current
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-[#6B5845]/60">
                        Upcoming
                      </span>
                    )}
                  </div>

                  <div className="text-[15px] font-bold text-[#1D2522] leading-tight pt-1">
                    {stage.stage}
                  </div>
                </div>

                <p className="text-[12px] text-[#6B5845] leading-relaxed line-clamp-3">
                  {stage.summary}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
