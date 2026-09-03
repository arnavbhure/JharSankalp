import { ProjectDetail } from '../../types/projectDetail';
import { Check, Sparkles, Radio } from 'lucide-react';

interface ProjectLifecycleProps {
  project: ProjectDetail;
}

const LIFECYCLE_STAGES = [
  { key: 'DISCOVERY', label: 'Discovery' },
  { key: 'DESIGN', label: 'Design' },
  { key: 'PROTOTYPE', label: 'Prototype' },
  { key: 'FIELD_PILOT', label: 'Field Pilot' },
  { key: 'IMPACT_VERIFICATION', label: 'Impact Verification' },
  { key: 'SCALING', label: 'Scaling' },
];

export function ProjectLifecycle({ project }: ProjectLifecycleProps) {
  const currentIdx = LIFECYCLE_STAGES.findIndex((s) => s.key === project.stage);

  return (
    <section id="overview" className="scroll-mt-32 space-y-5 text-left">
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EEEAE1] pb-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
              <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
              <span>PROJECT EXECUTION PROGRESS</span>
            </div>
            <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              Lifecycle Stage & Velocity
            </h3>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-[2.2rem] font-extrabold font-mono text-[#123B2A] leading-none">
              {project.progressPercentage}%
            </span>
            <span className="text-[12px] font-mono font-bold text-[#6B5845]">
              Overall Completion
            </span>
          </div>
        </div>

        {/* 6-Stage Progress Indicator */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {LIFECYCLE_STAGES.map((s, idx) => {
              const isCompleted = idx < currentIdx;
              const isCurrent = idx === currentIdx;

              return (
                <div
                  key={s.key}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all ${
                    isCurrent
                      ? 'border-2 border-[#123B2A] bg-[#FFFDF9] shadow-xs'
                      : isCompleted
                      ? 'border-[#BBF7D0] bg-[#F0FDF4]'
                      : 'border-[#EEEAE1] bg-[#FAF9F5]/60 text-[#6B5845]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase">
                      0{idx + 1}
                    </span>
                    <div
                      className={`h-4 w-4 rounded-full flex items-center justify-center text-[9px] ${
                        isCompleted
                          ? 'bg-[#15803D] text-white'
                          : isCurrent
                          ? 'bg-[#123B2A] text-[#F5A623]'
                          : 'border border-[#EEEAE1]'
                      }`}
                    >
                      {isCompleted ? <Check className="h-2.5 w-2.5 stroke-[3]" /> : isCurrent ? '●' : '○'}
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <span
                      className={`text-[12px] font-bold block ${
                        isCurrent
                          ? 'text-[#123B2A]'
                          : isCompleted
                          ? 'text-[#15803D]'
                          : 'text-[#6B5845]/70'
                      }`}
                    >
                      {s.label}
                    </span>
                    <span className="text-[10px] font-mono text-[#6B5845] uppercase">
                      {isCompleted ? 'Completed' : isCurrent ? 'Active Stage' : 'Pending'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Linear Progress Bar */}
          <div className="h-2 w-full bg-[#EEEAE1] rounded-full overflow-hidden">
            <div
              style={{ width: `${project.progressPercentage}%` }}
              className="h-full bg-gradient-to-r from-[#15803D] to-[#123B2A] rounded-full transition-all duration-700"
            />
          </div>
        </div>

        {/* Current Focus Banner */}
        <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-2.5">
            <Radio className="h-4 w-4 text-[#F5A623] animate-pulse shrink-0" />
            <div className="text-[13px] text-[#1D2522]">
              <span className="font-mono font-bold uppercase text-[#123B2A] mr-2">
                CURRENT FOCUS:
              </span>
              <span>Testing sensor reliability and vibration anomaly triggers across selected rural water points in {project.location}.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
