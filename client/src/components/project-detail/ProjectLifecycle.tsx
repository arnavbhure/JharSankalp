import { ProjectDetail } from '../../types/projectDetail';
import { Check, Sparkles, Radio, ArrowRight } from 'lucide-react';

interface ProjectLifecycleProps {
  project: ProjectDetail;
}

const LIFECYCLE_STAGES = [
  { key: 'CHALLENGE_IDENTIFIED', label: 'Challenge Identified' },
  { key: 'IDEA_DEVELOPED', label: 'Idea Developed' },
  { key: 'FORMATION', label: 'Project Formation' },
  { key: 'RESEARCH_DESIGN', label: 'Research & Design' },
  { key: 'PROTOTYPE', label: 'Prototype' },
  { key: 'FIELD_PILOT', label: 'Field Pilot' },
  { key: 'IMPLEMENTATION', label: 'Implementation' },
  { key: 'IMPACT_VERIFICATION', label: 'Impact Verification' },
];

export function ProjectLifecycle({ project }: ProjectLifecycleProps) {
  // Map project.stage to index in 8-stage array
  const getStageIndex = (stage: string) => {
    switch (stage) {
      case 'FORMATION':
        return 2;
      case 'RESEARCH_DESIGN':
      case 'DESIGN':
        return 3;
      case 'PROTOTYPE':
        return 4;
      case 'FIELD_PILOT':
        return 5;
      case 'IMPLEMENTATION':
        return 6;
      case 'IMPACT_VERIFICATION':
        return 7;
      default:
        return 5; // Default Field Pilot
    }
  };

  const currentIdx = getStageIndex(project.stage);

  return (
    <section id="overview" className="scroll-mt-32 space-y-5 text-left">
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EEEAE1] pb-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#4C1E4F]">
              <Sparkles className="h-3.5 w-3.5 text-[#FA7E61]" />
              <span>INNOVATION LIFECYCLE TRACKER</span>
            </div>
            <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              From Societal Challenge to Verified Impact
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4C1E4F] text-white text-[12px] font-mono font-bold">
              Current Stage: {project.stageLabel}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[2rem] font-extrabold font-mono text-[#123B2A] leading-none">
                {project.progressPercentage}%
              </span>
              <span className="text-[11.5px] font-mono font-bold text-[#6B5845]">
                Progress
              </span>
            </div>
          </div>
        </div>

        {/* 8-Stage Lifecycle Flow */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {LIFECYCLE_STAGES.map((s, idx) => {
              const isCompleted = idx < currentIdx;
              const isCurrent = idx === currentIdx;

              return (
                <div
                  key={s.key}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all ${
                    isCurrent
                      ? 'border-2 border-[#FA7E61] bg-[#FFFDF9] shadow-md ring-2 ring-[#FA7E61]/20'
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
                          ? 'bg-[#FA7E61] text-white font-bold'
                          : 'border border-[#EEEAE1]'
                      }`}
                    >
                      {isCompleted ? <Check className="h-2.5 w-2.5 stroke-[3]" /> : isCurrent ? '●' : '○'}
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <span
                      className={`text-[12px] font-bold block leading-tight ${
                        isCurrent
                          ? 'text-[#4C1E4F]'
                          : isCompleted
                          ? 'text-[#15803D]'
                          : 'text-[#6B5845]/70'
                      }`}
                    >
                      {s.label}
                    </span>
                    <span className="text-[9.5px] font-mono text-[#6B5845] uppercase">
                      {isCompleted ? 'Done' : isCurrent ? 'Active Now' : 'Upcoming'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Linear Progress Bar */}
          <div className="h-2.5 w-full bg-[#EEEAE1] rounded-full overflow-hidden">
            <div
              style={{ width: `${project.progressPercentage}%` }}
              className="h-full bg-gradient-to-r from-[#4C1E4F] via-[#FA7E61] to-[#15803D] rounded-full transition-all duration-700"
            />
          </div>
        </div>

        {/* Current Focus Banner */}
        <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-2.5">
            <Radio className="h-4 w-4 text-[#FA7E61] animate-pulse shrink-0" />
            <div className="text-[13px] text-[#1D2522]">
              <span className="font-mono font-bold uppercase text-[#4C1E4F] mr-2">
                CURRENT FOCUS ({project.stageLabel}):
              </span>
              <span>Validating field sensors and automated maintenance notifications in {project.location}.</span>
            </div>
          </div>

          <a
            href="#roadmap"
            className="inline-flex items-center gap-1 text-[12px] font-mono font-bold text-[#4C1E4F] hover:text-[#FA7E61] shrink-0"
          >
            <span>View Milestones</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
