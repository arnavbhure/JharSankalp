import { WorkspaceData, WorkspaceTabId } from '../../../types/workspace';
import { ProjectHealthIndicator } from '../../projects/ProjectHealthIndicator';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  Sparkles,
  Calendar,
  FileCheck,
  Radio,
} from 'lucide-react';

interface WorkspaceOverviewTabProps {
  data: WorkspaceData;
  onNavigateTab: (tab: WorkspaceTabId) => void;
}

const LIFECYCLE_STAGES = [
  { key: 'DISCOVERY', label: 'Discovery' },
  { key: 'DESIGN', label: 'Design' },
  { key: 'PROTOTYPE', label: 'Prototype' },
  { key: 'FIELD_PILOT', label: 'Field Pilot' },
  { key: 'IMPACT_VERIFICATION', label: 'Verification' },
  { key: 'SCALING', label: 'Scaling' },
];

export function WorkspaceOverviewTab({
  data,
  onNavigateTab,
}: WorkspaceOverviewTabProps) {
  const { context, priorities, recentActivities } = data;
  const currentStageIdx = LIFECYCLE_STAGES.findIndex(
    (s) => s.key === context.stage
  );

  return (
    <div className="space-y-8 text-left">
      {/* ── Top Status Banner with 4 Distinct Operational Metrics ── */}
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EEEAE1] pb-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
              <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
              <span>COMMAND CENTER STATUS</span>
            </div>
            <h2 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              Operational Health & Execution Velocity
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#6B5845] font-semibold">
              PROJECT HEALTH:
            </span>
            <ProjectHealthIndicator health={context.health} label={context.healthLabel} />
          </div>
        </div>

        {/* 4 Structured Metrics (Differentiated, not four identical cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Overall Progress */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border-2 border-[#123B2A] space-y-1">
            <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A] block">
              PROGRESS METER
            </span>
            <div className="text-[2rem] sm:text-[2.3rem] font-extrabold font-mono text-[#123B2A] leading-tight">
              {context.progressPercentage}%
            </div>
            <div className="h-1.5 w-full bg-[#EEEAE1] rounded-full overflow-hidden">
              <div
                style={{ width: `${context.progressPercentage}%` }}
                className="h-full bg-[#123B2A] rounded-full"
              />
            </div>
            <span className="text-[11px] text-[#6B5845] block pt-1">
              Field testing phase active
            </span>
          </div>

          {/* 2. Milestones Completed */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#15803D]">
                MILESTONES
              </span>
              <Calendar className="h-3.5 w-3.5 text-[#15803D]" />
            </div>
            <div className="text-[2rem] sm:text-[2.3rem] font-extrabold font-mono text-[#15803D] leading-tight">
              03 / 06
            </div>
            <span className="text-[11px] text-[#15803D] font-medium block">
              Phase 04 in progress
            </span>
          </div>

          {/* 3. Active Workstreams */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
                WORKSTREAMS
              </span>
              <Layers className="h-3.5 w-3.5 text-[#123B2A]" />
            </div>
            <div className="text-[2rem] sm:text-[2.3rem] font-extrabold font-mono text-[#1D2522] leading-tight">
              03
            </div>
            <span className="text-[11px] text-[#6B5845] block">
              Deploy, Data & Maintenance
            </span>
          </div>

          {/* 4. Deliverables in Review */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#B45309]">
                DELIVERABLES
              </span>
              <FileCheck className="h-3.5 w-3.5 text-[#F5A623]" />
            </div>
            <div className="text-[2rem] sm:text-[2.3rem] font-extrabold font-mono text-[#B45309] leading-tight">
              02
            </div>
            <span className="text-[11px] text-[#B45309] font-medium block">
              Awaiting partner review
            </span>
          </div>
        </div>
      </div>

      {/* ── Two-Column Operational Layout: Priorities + Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: What Needs Attention (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-7 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#BE123C]">
                <AlertTriangle className="h-3.5 w-3.5 text-[#BE123C]" />
                <span>ACTIVE PRIORITIES</span>
              </div>
              <h3 className="text-[1.3rem] font-extrabold text-[#1D2522] font-sans">
                What needs attention
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('work')}
              className="text-[12px] font-bold text-[#123B2A] hover:underline cursor-pointer"
            >
              View Work →
            </button>
          </div>

          {/* Vertical Priority List */}
          <div className="space-y-3">
            {priorities.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] hover:border-[#123B2A]/40 transition-colors space-y-2 text-left"
              >
                <div className="flex items-center justify-between text-[10.5px] font-mono">
                  {item.level === 'HIGH_PRIORITY' ? (
                    <span className="font-bold text-[#BE123C] bg-[#FFF5F5] px-2 py-0.5 rounded border border-[#FECDD3]">
                      HIGH PRIORITY
                    </span>
                  ) : item.level === 'REVIEW_REQUIRED' ? (
                    <span className="font-bold text-[#B45309] bg-[#FFFBEB] px-2 py-0.5 rounded border border-[#FDE68A]">
                      REVIEW REQUIRED
                    </span>
                  ) : (
                    <span className="font-bold text-[#0284C7] bg-[#F0F9FF] px-2 py-0.5 rounded border border-[#BAE6FD]">
                      UPCOMING
                    </span>
                  )}

                  <span className="text-[#6B5845]">Due: {item.dueDate}</span>
                </div>

                <h4 className="text-[13.5px] font-bold text-[#1D2522] leading-snug">
                  {item.title}
                </h4>

                <div className="flex items-center justify-between pt-1 text-[11.5px] text-[#6B5845]">
                  <span>Owner: <strong className="text-[#1D2522]">{item.owner}</strong></span>
                  {item.actionText && (
                    <button
                      type="button"
                      onClick={() => onNavigateTab(item.level === 'REVIEW_REQUIRED' ? 'deliverables' : 'work')}
                      className="text-[#123B2A] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent Workspace Activity Log (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-7 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                <Clock className="h-3.5 w-3.5 text-[#F5A623]" />
                <span>REAL-TIME AUDIT LOG</span>
              </div>
              <h3 className="text-[1.3rem] font-extrabold text-[#1D2522] font-sans">
                Recent workspace activity
              </h3>
            </div>
          </div>

          <div className="space-y-4">
            {recentActivities.map((act) => (
              <div key={act.id} className="flex items-start gap-3 text-left">
                <div className="h-7 w-7 rounded-lg bg-[#FAF9F5] border border-[#EEEAE1] flex items-center justify-center text-[#123B2A] shrink-0 mt-0.5 font-mono font-bold text-[11px]">
                  {act.author.substring(0, 2).toUpperCase()}
                </div>
                <div className="space-y-0.5 min-w-0">
                  <p className="text-[12.5px] text-[#1D2522] leading-snug">
                    <strong className="text-[#1D2522]">{act.author}</strong>{' '}
                    <span className="text-[#6B5845]">{act.action}</span>{' '}
                    <span className="font-semibold text-[#123B2A]">{act.target}</span>
                  </p>
                  <span className="text-[10.5px] font-mono text-[#6B5845] block">
                    {act.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Lifecycle Progression Segment ── */}
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-7 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            INSTITUTIONAL LIFECYCLE STAGE
          </span>
          <span className="text-[11px] font-mono text-[#6B5845]">
            Stage 4 of 6 · Field Pilot Active
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {LIFECYCLE_STAGES.map((s, idx) => {
            const isCompleted = idx < currentStageIdx;
            const isCurrent = idx === currentStageIdx;

            return (
              <div
                key={s.key}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between space-y-1 ${
                  isCurrent
                    ? 'border-2 border-[#123B2A] bg-[#FFFDF9]'
                    : isCompleted
                    ? 'border-[#BBF7D0] bg-[#F0FDF4]'
                    : 'border-[#EEEAE1] bg-[#FAF9F5]/40 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span>0{idx + 1}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" />
                  ) : isCurrent ? (
                    <Radio className="h-3.5 w-3.5 text-[#F5A623] animate-pulse" />
                  ) : (
                    <span>○</span>
                  )}
                </div>
                <span
                  className={`text-[12px] font-bold block ${
                    isCurrent ? 'text-[#123B2A]' : isCompleted ? 'text-[#15803D]' : 'text-[#6B5845]'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
