import { ProjectActivityItem } from '../../types/projects';
import { Radio, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectActivityFeedProps {
  activities: ProjectActivityItem[];
}

export function ProjectActivityFeed({ activities }: ProjectActivityFeedProps) {
  return (
    <section className="border-b border-[#EEEAE1] bg-white py-14 sm:py-18 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#15803D] font-bold">
              <Radio className="h-4 w-4 animate-pulse text-[#15803D]" />
              <span>LIVE SPRINT PULSE</span>
            </div>
            <h2 className="text-[2rem] sm:text-[2.5rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              What is happening now
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#6B5845]">
              Real-time progress, telemetry milestone completions, and partnership updates across
              Jharkhand.
            </p>
          </div>
        </div>

        {/* ── Activity Items Vertical Stream ── */}
        <div className="divide-y divide-[#EEEAE1] border-y border-[#EEEAE1]">
          {activities.map((act) => (
            <div
              key={act.id}
              className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-[#FAF9F5]/70 -mx-4 px-4 sm:-mx-6 sm:px-6 transition-colors"
            >
              {/* Left: Timestamp pill + Project info */}
              <div className="flex items-start sm:items-center gap-4">
                <span className="shrink-0 text-[11px] font-mono font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-[#4C1E4F] text-[#FEE1C7] min-w-[90px] text-center">
                  {act.timestamp}
                </span>

                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <Link
                      to={`/projects/${act.projectId}`}
                      className="text-[14.5px] sm:text-[15px] font-bold text-[#1D2522] group-hover:text-[#4C1E4F] transition-colors font-sans hover:underline"
                    >
                      {act.projectTitle}
                    </Link>

                    <span className="text-[10.5px] font-mono px-2 py-0.5 rounded-full border border-[#EEEAE1] bg-white text-[#6B5845]">
                      {act.stageLabel}
                    </span>
                  </div>

                  <p className="text-[13.5px] text-[#6B5845] leading-relaxed">{act.activity}</p>
                </div>
              </div>

              {/* Right: Quick Action Link */}
              <Link
                to={`/projects/${act.projectId}`}
                className="inline-flex items-center gap-1 text-[12px] font-mono font-bold text-[#4C1E4F] hover:text-[#FA7E61] shrink-0 self-start sm:self-auto"
              >
                <span>Inspect Update</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
