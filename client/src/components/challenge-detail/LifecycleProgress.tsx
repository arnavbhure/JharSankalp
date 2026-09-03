import { CheckCircle2, Clock, Circle } from 'lucide-react';
import { ChallengeDetailData } from '../../types/challengeDetail';

interface LifecycleProgressProps {
  challenge: ChallengeDetailData;
}

interface StandardStage {
  id: string;
  name: string;
  shortDesc: string;
  status: 'completed' | 'current' | 'upcoming';
}

export function LifecycleProgress({ challenge }: LifecycleProgressProps) {
  const st = (challenge.status || 'SUBMITTED').toUpperCase();

  // Determine stage progress
  let currentStageIndex = 2; // Default to 'Under Review' for newly submitted challenges
  if (st === 'SUBMITTED') {
    currentStageIndex = 2; // Submitted & AI Structured done, Under Review is active
  } else if (st === 'UNDER_REVIEW') {
    currentStageIndex = 2;
  } else if (st === 'VALIDATED' || st === 'MATCHED') {
    currentStageIndex = 3; // Institution Matching
  } else if (
    st === 'ACTIVE' ||
    st === 'IN_PROGRESS' ||
    st === 'SOLUTION_IN_PROGRESS' ||
    st === 'IDEATION'
  ) {
    currentStageIndex = 4; // Solution Development
  } else if (st === 'FIELD_PILOT' || st === 'IMPLEMENTATION' || st === 'PILOT') {
    currentStageIndex = 5; // Project Implementation
  } else if (st === 'RESOLVED') {
    currentStageIndex = 6;
  }

  const STAGES: StandardStage[] = [
    {
      id: 'submitted',
      name: 'Submitted',
      shortDesc: 'Challenge received and logged into public state repository.',
      status: currentStageIndex > 0 ? 'completed' : 'current',
    },
    {
      id: 'ai_structured',
      name: 'AI Structured',
      shortDesc: 'Domain, priority, and impact indicators identified by civic engine.',
      status: currentStageIndex > 1 ? 'completed' : 'current',
    },
    {
      id: 'under_review',
      name: 'Under Review',
      shortDesc: 'District authorities & domain desk corroborating ground truth.',
      status:
        currentStageIndex > 2 ? 'completed' : currentStageIndex === 2 ? 'current' : 'upcoming',
    },
    {
      id: 'matching',
      name: 'Institution Matching',
      shortDesc: 'Assigned to university engineering cells and incubators.',
      status:
        currentStageIndex > 3 ? 'completed' : currentStageIndex === 3 ? 'current' : 'upcoming',
    },
    {
      id: 'solution',
      name: 'Solution Development',
      shortDesc: 'Consortium members prototyping feasibility and field hardware.',
      status:
        currentStageIndex > 4 ? 'completed' : currentStageIndex === 4 ? 'current' : 'upcoming',
    },
    {
      id: 'implementation',
      name: 'Project Implementation',
      shortDesc: 'Field deployment, district pilot testing, and impact tracking.',
      status:
        currentStageIndex >= 6 ? 'completed' : currentStageIndex === 5 ? 'current' : 'upcoming',
    },
  ];

  const currentActive = STAGES.find((s) => s.status === 'current') || STAGES[STAGES.length - 1];

  return (
    <section id="lifecycle-progress" className="py-12 sm:py-16 border-b border-[#EEEAE1] text-left">
      <div className="space-y-1 mb-8">
        <div className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#123B2A] font-bold">
          <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
          SIX-STAGE CIVIC IMPACT LOOP
        </div>
        <h2 className="text-[1.85rem] sm:text-[2.25rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Challenge Lifecycle & Progression
        </h2>
        <p className="text-[14px] text-[#6B5845] max-w-xl">
          Full transparency from raw citizen submission to validated state-wide public policy
          intervention.
        </p>
      </div>

      {/* ── Connected 6-Stage Lifecycle Flow Bar ── */}
      <div className="rounded-2xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-8">
        {/* Current Stage Highlight Header */}
        <div className="p-4 rounded-xl bg-[#F8F6F1] border border-[#EEEAE1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-mono uppercase font-bold text-[#6B5845] tracking-wider block">
              CURRENT LIFECYCLE STAGE
            </span>
            <div className="text-[1.25rem] font-extrabold text-[#123B2A] font-sans mt-0.5">
              {currentActive.name}
            </div>
            <div className="text-[12.5px] text-[#6B5845]">{currentActive.shortDesc}</div>
          </div>

          <div className="flex items-center gap-2 text-[12px] font-mono text-[#B45309] bg-[#FEF6E9] px-3 py-1 rounded-md border border-[#F8CCA5] font-bold self-start sm:self-auto">
            <Clock className="h-3.5 w-3.5 animate-spin" />
            <span>Status: {challenge.status || 'Active in Ecosystem'}</span>
          </div>
        </div>

        {/* 6 Stages Track */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {STAGES.map((stage, idx) => {
            const isCompleted = stage.status === 'completed';
            const isCurrent = stage.status === 'current';

            return (
              <div
                key={stage.id}
                className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all ${
                  isCurrent
                    ? 'border-[#123B2A] bg-[#123B2A]/5 ring-2 ring-[#123B2A]/20 shadow-xs'
                    : isCompleted
                      ? 'border-[#BBF7D0] bg-[#F0FDF4]'
                      : 'border-[#EEEAE1] bg-[#FAF9F5] opacity-70'
                }`}
              >
                <div className="space-y-1.5">
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
                      <span className="text-[11px] font-mono text-[#6B5845]/60 flex items-center gap-1">
                        <Circle className="h-2.5 w-2.5" />
                        <span>Pending</span>
                      </span>
                    )}
                  </div>

                  <div className="text-[14px] font-bold text-[#1D2522] leading-tight font-sans">
                    {stage.name}
                  </div>
                </div>

                <p className="text-[11.5px] text-[#6B5845] leading-relaxed line-clamp-3">
                  {stage.shortDesc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
