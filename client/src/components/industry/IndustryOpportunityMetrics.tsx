import { IndustryOpportunityMetrics as MetricsType } from '../../types/industry';
import { Wrench, Sparkles, Rocket, AlertTriangle } from 'lucide-react';

interface IndustryOpportunityMetricsProps {
  metrics: MetricsType;
}

export function IndustryOpportunityMetrics({ metrics }: IndustryOpportunityMetricsProps) {
  const cards = [
    {
      label: 'Seeking Technical Support',
      value: metrics.seekingTechnicalSupport,
      subtext: 'Engineering & hardware fabrication calls',
      icon: Wrench,
      accent: 'text-[#4C1E4F]',
      border: 'border-[#4C1E4F]/25',
      badge: 'Technical Demand',
    },
    {
      label: 'Prototype Opportunities',
      value: metrics.prototypeOpportunities,
      subtext: 'Laboratory bench trials ready for tooling',
      icon: Sparkles,
      accent: 'text-[#B45309]',
      border: 'border-[#FDE68A]',
      badge: 'R&D Phase',
    },
    {
      label: 'Field Pilots Seeking Partners',
      value: metrics.fieldPilotsSeekingPartners,
      subtext: 'Live community deployments across Jharkhand',
      icon: Rocket,
      accent: 'text-[#15803D]',
      border: 'border-[#BBF7D0]',
      bg: 'bg-[#F0FDF4]',
      badge: 'High Impact',
      highlight: true,
    },
    {
      label: 'High-Priority Requests',
      value: metrics.highPriorityRequests,
      subtext: 'Fast-track state innovation RFPs',
      icon: AlertTriangle,
      accent: 'text-[#FA7E61]',
      border: 'border-[#FA7E61]/30',
      badge: 'Critical Pipeline',
    },
  ];

  return (
    <section className="space-y-4 text-left">
      <div className="flex items-center justify-between text-[11px] font-mono tracking-wider uppercase text-[#6B5845] border-b border-[#EEEAE1] pb-2">
        <span className="font-bold text-[#1D2522]">INDUSTRY DEMAND TELEMETRY</span>
        <span className="bg-[#FAF9F5] px-2.5 py-0.5 rounded border border-[#EEEAE1]">
          MARKET COLLABORATION
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`p-5 rounded-2xl border ${card.border} ${card.bg || 'bg-white'} shadow-2xs hover:shadow-xs transition-all space-y-3 flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  card.highlight ? 'bg-[#15803D] text-white' : 'bg-[#FAF9F5] text-[#6B5845]'
                }`}>
                  {card.badge}
                </span>
                <Icon className={`h-4 w-4 ${card.accent}`} />
              </div>

              <div className="space-y-1">
                <div className={`text-[2.2rem] sm:text-[2.6rem] font-extrabold font-mono tracking-tight leading-none ${card.accent}`}>
                  {card.value}
                </div>
                <div className="text-[14px] font-bold text-[#1D2522] leading-snug">
                  {card.label}
                </div>
              </div>

              <div className="text-[11.5px] text-[#6B5845] font-mono pt-1 border-t border-[#EEEAE1]/80">
                {card.subtext}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
