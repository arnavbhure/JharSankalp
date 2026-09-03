import { useState } from 'react';
import { ProjectDetail, ProjectMilestone } from '../../types/projectDetail';
import {
  Calendar,
  CheckCircle2,
  Radio,
  Clock,
  ChevronDown,
  ChevronUp,
  FileText,
  User,
} from 'lucide-react';

interface ProjectRoadmapProps {
  project: ProjectDetail;
}

export function ProjectRoadmap({ project }: ProjectRoadmapProps) {
  const [expandedId, setExpandedId] = useState<string | null>('ms-4'); // Default open current field pilot

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getMilestoneBadge = (status: ProjectMilestone['status']) => {
    switch (status) {
      case 'COMPLETED':
        return {
          icon: <CheckCircle2 className="h-4 w-4 text-[#15803D]" />,
          badge: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
          label: 'Completed',
        };
      case 'IN_PROGRESS':
        return {
          icon: <Radio className="h-4 w-4 text-[#F5A623] animate-pulse" />,
          badge: 'bg-[#FFFDF9] text-[#B45309] border-[#FDE68A]',
          label: 'In Progress',
        };
      case 'UPCOMING':
        return {
          icon: <Clock className="h-4 w-4 text-[#0284C7]" />,
          badge: 'bg-[#F0F9FF] text-[#0369A1] border-[#BAE6FD]',
          label: 'Upcoming',
        };
      case 'PLANNED':
      default:
        return {
          icon: <Clock className="h-4 w-4 text-[#6B5845]" />,
          badge: 'bg-[#FAF9F5] text-[#6B5845] border-[#EEEAE1]',
          label: 'Planned',
        };
    }
  };

  const completedCount = project.milestones.filter((m) => m.status === 'COMPLETED').length;
  const totalCount = project.milestones.length;
  const milestoneProgressPct = Math.round((completedCount / (totalCount || 1)) * 100);

  return (
    <section id="roadmap" className="scroll-mt-32 space-y-6 text-left">
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="space-y-3 border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#4C1E4F]">
              <Calendar className="h-4 w-4 text-[#FA7E61]" />
              <span>PROJECT MILESTONES & PHASES</span>
            </div>
            <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              Structured Milestone Execution
            </h3>
            <p className="text-[13.5px] text-[#6B5845] max-w-2xl leading-relaxed">
              Phased delivery structure from community problem validation to field deployment.
            </p>
          </div>

          <div className="space-y-1.5 sm:text-right shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F5] border border-[#EEEAE1] text-[12.5px] font-mono font-bold text-[#1D2522]">
              <span className="h-2 w-2 rounded-full bg-[#15803D]" />
              <span>
                {completedCount} of {totalCount} milestones completed
              </span>
            </div>
            <div className="h-1.5 w-44 bg-[#EEEAE1] rounded-full overflow-hidden ml-auto">
              <div
                className="h-full bg-gradient-to-r from-[#4C1E4F] to-[#15803D] rounded-full"
                style={{ width: `${milestoneProgressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* ── Chronological Milestone Track ── */}
        <div className="space-y-3">
          {project.milestones.map((ms) => {
            const isExpanded = expandedId === ms.id;
            const badge = getMilestoneBadge(ms.status);

            return (
              <div
                key={ms.id}
                className={`rounded-2xl border transition-all ${
                  ms.status === 'IN_PROGRESS'
                    ? 'border-2 border-[#123B2A] bg-[#FFFDF9] shadow-xs'
                    : 'border-[#EEEAE1] bg-white hover:border-[#123B2A]/40'
                }`}
              >
                {/* Collapsed Header Bar */}
                <div
                  onClick={() => toggleExpand(ms.id)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="shrink-0">{badge.icon}</div>

                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2 text-[11px] font-mono text-[#6B5845] flex-wrap">
                        <span className="font-bold text-[#123B2A]">{ms.phase}</span>
                        <span>·</span>
                        <span>{ms.period}</span>
                      </div>

                      <h4 className="text-[14.5px] sm:text-[15.5px] font-bold text-[#1D2522] truncate">
                        {ms.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`text-[10.5px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md border ${badge.badge}`}
                    >
                      {badge.label}
                    </span>

                    <button
                      type="button"
                      className="text-[#6B5845] hover:text-[#1D2522] p-1 cursor-pointer"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#EEEAE1]/80 space-y-3 text-[13px] text-[#6B5845] bg-[#FAF9F5]/40 animate-in fade-in duration-150">
                    <p className="leading-relaxed text-[#1D2522]">{ms.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="space-y-1">
                        <span className="text-[10.5px] font-mono font-bold uppercase text-[#123B2A] flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          Deliverables Produced:
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 text-[12px] text-[#1D2522]">
                          {ms.deliverables.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10.5px] font-mono font-bold uppercase text-[#123B2A] flex items-center gap-1">
                          <User className="h-3 w-3" />
                          Responsible Owner:
                        </span>
                        <div className="text-[12px] font-semibold text-[#1D2522]">{ms.owner}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
