import { UniversityActivity } from '../../types/university';
import { Radio, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UniversityActivityFeedProps {
  activities: UniversityActivity[];
}

export function UniversityActivityFeed({ activities }: UniversityActivityFeedProps) {
  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-xs text-left space-y-6">
      <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#4C1E4F]">
            <Radio className="h-4 w-4 text-[#FA7E61] animate-pulse" />
            <span>CAMPUS INNOVATION FEED</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Recent Institutional Activity
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl">
            Live sprint updates, milestone completions, and external partner exchanges involving BIT Mesra teams.
          </p>
        </div>

        <span className="text-[11px] font-mono text-[#4C1E4F] bg-[#FAF9F5] px-3 py-1 rounded-full border border-[#EEEAE1] font-bold">
          LIVE PULSE
        </span>
      </div>

      <div className="divide-y divide-[#EEEAE1]">
        {activities.map((act) => (
          <div
            key={act.id}
            className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-[#FAF9F5]/60 -mx-4 px-4 rounded-xl transition-colors text-left"
          >
            <div className="flex items-start sm:items-center gap-3">
              <span className="text-[10.5px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-[#4C1E4F] text-[#FEE1C7] min-w-[85px] text-center shrink-0">
                {act.timestamp}
              </span>

              <span className="text-[13.5px] text-[#1D2522] group-hover:text-[#4C1E4F] transition-colors leading-snug">
                {act.message}
              </span>
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center gap-1 text-[11.5px] font-mono font-bold text-[#4C1E4F] hover:text-[#FA7E61] shrink-0 self-start sm:self-auto"
            >
              <span>View Details</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
