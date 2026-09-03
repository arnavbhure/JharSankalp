import { DistrictImpact } from '../../types/impact';
import { DistrictImpactMap } from './DistrictImpactMap';

interface ImpactOverviewProps {
  districts: DistrictImpact[];
}

const LIFECYCLE_STAGES_STATS = [
  {
    name: 'Research',
    count: 12,
    percent: 26,
    color: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
  },
  {
    name: 'Prototype',
    count: 18,
    percent: 39,
    color: 'bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]',
  },
  {
    name: 'Testing',
    count: 14,
    percent: 30,
    color: 'bg-[#FAF5FF] text-[#7E22CE] border-[#E9D5FF]',
  },
  {
    name: 'Field Pilot',
    count: 7,
    percent: 15,
    color: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
  },
  { name: 'Deployment', count: 4, percent: 9, color: 'bg-[#123B2A] text-white border-[#123B2A]' },
  { name: 'Scaling', count: 2, percent: 4, color: 'bg-[#F5A623] text-[#123B2A] border-[#F5A623]' },
];

const DOMAIN_DISTRIBUTION = [
  { domain: 'Water Management', count: 12, reach: '4,800', barWidth: '85%' },
  { domain: 'Agriculture', count: 8, reach: '3,200', barWidth: '68%' },
  { domain: 'Healthcare', count: 5, reach: '2,100', barWidth: '45%' },
  { domain: 'Education', count: 4, reach: '1,700', barWidth: '38%' },
  { domain: 'Mining Safety', count: 3, reach: '600', barWidth: '25%' },
  { domain: 'Environment', count: 6, reach: 'Communities', barWidth: '50%' },
];

export function ImpactOverview({ districts }: ImpactOverviewProps) {
  return (
    <section id="analytics-overview" className="space-y-6 text-left">
      <div className="space-y-1">
        <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          DATA ANALYTICS
        </span>
        <h2 className="text-[1.5rem] sm:text-[1.8rem] font-bold text-[#1D2522]">
          Jharkhand Impact Overview
        </h2>
        <p className="text-[13.5px] text-[#6B5845] max-w-xl leading-relaxed">
          Comprehensive telemetry tracking societal challenges, geographic reach, and solution
          readiness across the state.
        </p>
      </div>

      {/* A. District Reach Map & Selector */}
      <DistrictImpactMap districts={districts} />

      {/* B & C: Domain Distribution & Solution Lifecycle */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Domain Impact Distribution (6 Cols) */}
        <div className="lg:col-span-6 rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                DOMAINS
              </span>
              <h4 className="text-[1.15rem] font-bold text-[#1D2522]">
                Domain Impact Distribution
              </h4>
            </div>
            <span className="text-[11px] font-mono text-[#6B5845]">By Projects & Reach</span>
          </div>

          <div className="space-y-3 pt-1">
            {DOMAIN_DISTRIBUTION.map((item) => (
              <div key={item.domain} className="space-y-1.5">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-semibold text-[#1D2522]">{item.domain}</span>
                  <span className="font-mono text-[#6B5845]">
                    {item.count} projects · {item.reach} reached
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#FAF9F5] border border-[#EEEAE1] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#123B2A] transition-all duration-500"
                    style={{ width: item.barWidth }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Solution Lifecycle Distribution (6 Cols) */}
        <div className="lg:col-span-6 rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                MATURITY
              </span>
              <h4 className="text-[1.15rem] font-bold text-[#1D2522]">
                Solution Lifecycle Distribution
              </h4>
            </div>
            <span className="text-[11px] font-mono text-[#15803D] font-bold">
              32 Active Solutions
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
            {LIFECYCLE_STAGES_STATS.map((s) => (
              <div key={s.name} className={`p-3 rounded-2xl border text-left space-y-1 ${s.color}`}>
                <span className="text-[10.5px] font-mono font-bold uppercase block opacity-80">
                  {s.name}
                </span>
                <div className="text-[1.4rem] font-mono font-extrabold leading-tight">
                  {s.count}
                </div>
                <span className="text-[10px] font-mono block opacity-75">
                  {s.percent}% of pipeline
                </span>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] text-[12px] text-[#6B5845] leading-relaxed">
            <strong className="text-[#123B2A] font-bold block pb-0.5">
              Pipeline Velocity Note:
            </strong>
            4 solutions moved from Prototyping to Field Pilot in Q1 2026 with support from state
            academic labs and district CSR partners.
          </div>
        </div>
      </div>
    </section>
  );
}
