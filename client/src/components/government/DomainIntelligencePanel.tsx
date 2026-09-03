import { Link } from 'react-router-dom';
import { DomainAnalytics } from '../../types/government';
import { Layers, Droplets, AlertOctagon, Sprout } from 'lucide-react';

interface DomainIntelligencePanelProps {
  analytics: DomainAnalytics[];
}

export function DomainIntelligencePanel({ analytics }: DomainIntelligencePanelProps) {
  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-xs text-left space-y-6">
      <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#4C1E4F]">
            <Layers className="h-4 w-4 text-[#FA7E61]" />
            <span>SECTORAL DEMAND BREAKDOWN</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Societal Domain Intelligence
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl">
            Distribution of citizen problem statements, priority concentrations, and university R&D
            focus across Jharkhand.
          </p>
        </div>

        <span className="text-[11px] font-mono text-[#6B5845] bg-[#FAF9F5] px-3 py-1 rounded-full border border-[#EEEAE1]">
          7 KEY FOCUS AREAS
        </span>
      </div>

      {/* ── 3 Key Insight Callouts ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <Link
          to={`/challenges?domain=${encodeURIComponent('Water Management')}`}
          className="p-4 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] hover:border-[#0284C7] transition-all space-y-1.5 group block"
        >
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase text-[#0284C7]">
            <Droplets className="h-4 w-4" />
            <span>WATER & SANITATION</span>
          </div>
          <div className="text-[14px] font-bold text-[#1D2522] group-hover:text-[#0284C7] transition-colors">
            Highest Volume of Reported Challenges →
          </div>
          <p className="text-[12px] text-[#6B5845] leading-snug">
            Represents 27.4% of total state intake; widespread handpump mechanical failure in rural
            tribal blocks.
          </p>
        </Link>

        <Link
          to={`/challenges?domain=${encodeURIComponent('Mining Safety')}`}
          className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FECDD3] hover:border-[#DC2626] transition-all space-y-1.5 group block"
        >
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase text-[#DC2626]">
            <AlertOctagon className="h-4 w-4" />
            <span>MINING SAFETY</span>
          </div>
          <div className="text-[14px] font-bold text-[#1D2522] group-hover:text-[#DC2626] transition-colors">
            Highest Priority Concentration →
          </div>
          <p className="text-[12px] text-[#6B5845] leading-snug">
            78% of challenges classified as Critical/Life-Safety risk; strata subsidence and legacy
            fires in Dhanbad.
          </p>
        </Link>

        <Link
          to={`/challenges?domain=${encodeURIComponent('Agriculture')}`}
          className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] hover:border-[#15803D] transition-all space-y-1.5 group block"
        >
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase text-[#15803D]">
            <Sprout className="h-4 w-4" />
            <span>AGRICULTURE</span>
          </div>
          <div className="text-[14px] font-bold text-[#1D2522] group-hover:text-[#15803D] transition-colors">
            Highest University Participation →
          </div>
          <p className="text-[12px] text-[#6B5845] leading-snug">
            4 research institutions engaged; active soil acidity testing and solar cold storage
            interventions.
          </p>
        </Link>
      </div>

      {/* ── Domain Proportional Distribution Bars ── */}
      <div className="space-y-4 pt-2">
        <div className="text-[11px] font-mono uppercase font-bold text-[#6B5845]">
          Sectoral Challenge Volume & Active Consortia
        </div>

        <div className="space-y-3">
          {analytics.map((item) => (
            <Link
              key={item.domain}
              to={`/challenges?domain=${encodeURIComponent(item.domain)}`}
              className="p-3.5 rounded-xl border border-[#EEEAE1] bg-[#FAF9F5] hover:bg-white hover:border-[#4C1E4F] transition-all space-y-2 block group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[13px]">
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-3 w-3 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <strong className="text-[#1D2522] group-hover:text-[#4C1E4F] font-bold font-sans transition-colors">
                    {item.domain}
                  </strong>
                  <span className="text-[11px] font-mono text-[#6B5845]">({item.percentage}%)</span>
                </div>

                <div className="flex items-center gap-3 text-[11.5px] font-mono">
                  <span className="text-[#1D2522] font-bold">
                    {item.challengesCount} Challenges
                  </span>
                  <span>·</span>
                  <span className="text-[#15803D] font-bold">
                    {item.activeProjectsCount} Active Projects
                  </span>
                  <span>·</span>
                  <span className="text-[#6B5845]">{item.priorityConcentration}</span>
                </div>
              </div>

              {/* Progress Track */}
              <div className="h-2 w-full bg-[#EEEAE1] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${item.percentage * 2.8}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
