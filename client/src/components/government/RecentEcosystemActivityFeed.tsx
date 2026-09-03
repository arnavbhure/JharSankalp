import { EcosystemActivity } from '../../types/government';
import { Radio, ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecentEcosystemActivityFeedProps {
  activities: EcosystemActivity[];
}

export function RecentEcosystemActivityFeed({ activities }: RecentEcosystemActivityFeedProps) {
  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-xs text-left space-y-6">
      <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#15803D]">
            <Radio className="h-4 w-4 text-[#15803D] animate-pulse" />
            <span>STATE INNOVATION TELEMETRY</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Recent Ecosystem Activity
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl">
            Real-time feed of challenge validations, university team mobilizations, and field
            milestones.
          </p>
        </div>

        <span className="text-[11px] font-mono text-[#15803D] bg-[#F0FDF4] px-3 py-1 rounded-full border border-[#BBF7D0] font-bold">
          LIVE STREAM
        </span>
      </div>

      {/* Vertical Timeline Feed */}
      <div className="divide-y divide-[#EEEAE1]">
        {activities.map((act) => (
          <div
            key={act.id}
            className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-[#FAF9F5]/70 -mx-4 px-4 rounded-xl transition-colors"
          >
            <div className="flex items-start sm:items-center gap-3.5">
              <span className="text-[10.5px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-[#4C1E4F] text-[#FEE1C7] min-w-[85px] text-center shrink-0">
                {act.timestamp}
              </span>

              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[14px] font-bold text-[#1D2522] group-hover:text-[#4C1E4F] transition-colors">
                    {act.message}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-[#6B5845]">
                  <span className="text-[#4C1E4F] font-bold">{act.domain}</span>
                  <span>·</span>
                  <span className="flex items-center gap-0.5">
                    <MapPin className="h-3 w-3 text-[#FA7E61]" />
                    {act.district}
                  </span>
                </div>
              </div>
            </div>

            <Link
              to="/challenges"
              className="inline-flex items-center gap-1 text-[12px] font-mono font-bold text-[#4C1E4F] hover:text-[#FA7E61] shrink-0 self-start sm:self-auto"
            >
              <span>Inspect Queue</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
