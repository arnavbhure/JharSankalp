import { DevelopmentMilestone } from '../../types/ideaDetail';
import { Clock, CheckCircle2 } from 'lucide-react';

interface DevelopmentTimelineProps {
  milestones: DevelopmentMilestone[];
}

export function DevelopmentTimeline({ milestones }: DevelopmentTimelineProps) {
  return (
    <section className="space-y-6 text-left">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <Clock className="h-4 w-4 text-[#F5A623]" />
          <span>SECTION 05 · AUDIT TRAIL</span>
        </div>

        <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Progress so far
        </h2>
        <p className="text-[14px] text-[#6B5845] leading-relaxed max-w-2xl">
          A transparent chronological record of technical experiments, lab reviews, and community
          stakeholder consultations.
        </p>
      </div>

      {/* ── Structured Vertical Timeline ── */}
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs">
        <div className="relative pl-7 space-y-7 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#EEEAE1]">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-7 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white border-2 border-[#123B2A] text-[#123B2A] shadow-2xs group-hover:bg-[#123B2A] group-hover:text-white transition-colors">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>

              {/* Date Header */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A] bg-[#F8F6F1] px-2.5 py-0.5 rounded-md border border-[#EEEAE1]">
                  {m.dateLabel}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-[1.15rem] font-bold text-[#1D2522] font-sans">{m.title}</h3>

              <p className="text-[13.5px] text-[#6B5845] leading-relaxed mt-0.5">{m.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
