import { ExecutiveMetrics } from '../../types/government';
import { Target, Activity, Lightbulb, Rocket, Building2, Briefcase } from 'lucide-react';

interface ExecutiveMetricsCardsProps {
  metrics: ExecutiveMetrics;
}

export function ExecutiveMetricsCards({ metrics }: ExecutiveMetricsCardsProps) {
  const primaryCards = [
    {
      label: 'Challenges Submitted',
      value: metrics.challengesSubmitted.toLocaleString(),
      subtext: 'Across 24 districts of Jharkhand',
      icon: Target,
      accent: 'text-[#1D2522]',
      border: 'border-[#EEEAE1]',
      bg: 'bg-white',
      badge: 'Demand Layer',
    },
    {
      label: 'Under Evaluation / Active',
      value: metrics.underEvaluation.toLocaleString(),
      subtext: 'Triage, AI analysis & validation',
      icon: Activity,
      accent: 'text-[#FA7E61]',
      border: 'border-[#FA7E61]/30',
      bg: 'bg-white',
      badge: 'Triage Queue',
    },
    {
      label: 'Ideas & Solution Proposals',
      value: metrics.ideasProposals.toLocaleString(),
      subtext: 'Academic & grassroots hypotheses',
      icon: Lightbulb,
      accent: 'text-[#B45309]',
      border: 'border-[#FDE68A]',
      bg: 'bg-white',
      badge: 'Ideation Layer',
    },
  ];

  const executionCards = [
    {
      label: 'Active Projects',
      value: metrics.activeProjects.toLocaleString(),
      subtext: 'Multi-sector consortia in field',
      icon: Rocket,
      accent: 'text-[#15803D]',
      border: 'border-[#BBF7D0]',
      bg: 'bg-[#F0FDF4]',
      badge: 'Ground Execution',
      highlight: true,
    },
    {
      label: 'Participating Institutions',
      value: metrics.participatingInstitutions.toLocaleString(),
      subtext: 'Universities & technical centers',
      icon: Building2,
      accent: 'text-[#4C1E4F]',
      border: 'border-[#4C1E4F]/25',
      bg: 'bg-white',
      badge: 'Academic Base',
    },
    {
      label: 'Industry & Innovation Partners',
      value: metrics.industryPartners.toLocaleString(),
      subtext: 'MSMEs, hardware fab & testbeds',
      icon: Briefcase,
      accent: 'text-[#6B5845]',
      border: 'border-[#EEEAE1]',
      bg: 'bg-white',
      badge: 'Ecosystem Sponsoring',
    },
  ];

  return (
    <section className="space-y-4 text-left">
      <div className="flex items-center justify-between text-[11px] font-mono tracking-wider uppercase text-[#6B5845] border-b border-[#EEEAE1] pb-2">
        <span className="font-bold text-[#1D2522]">EXECUTIVE ECOSYSTEM METRICS</span>
        <span className="bg-[#FAF9F5] px-2.5 py-0.5 rounded border border-[#EEEAE1]">
          DEMO STATE TELEMETRY
        </span>
      </div>

      {/* ── 2 Row Grouped Layout with Dividers ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
        {/* Demand & Triage Block (3 cols) */}
        {primaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`sm:col-span-1 lg:col-span-2 p-5 rounded-2xl border ${card.border} ${card.bg} shadow-2xs hover:shadow-xs transition-all space-y-3 flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF9F5] text-[#6B5845]">
                  {card.badge}
                </span>
                <Icon className={`h-4 w-4 ${card.accent}`} />
              </div>

              <div className="space-y-1">
                <div
                  className={`text-[2.2rem] sm:text-[2.6rem] font-extrabold font-mono tracking-tight leading-none ${card.accent}`}
                >
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

        {/* Execution & Consortia Block (3 cols) */}
        {executionCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`sm:col-span-1 lg:col-span-2 p-5 rounded-2xl border ${card.border} ${card.bg} shadow-2xs hover:shadow-xs transition-all space-y-3 flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    card.highlight ? 'bg-[#15803D] text-white' : 'bg-[#FAF9F5] text-[#4C1E4F]'
                  }`}
                >
                  {card.badge}
                </span>
                <Icon className={`h-4 w-4 ${card.accent}`} />
              </div>

              <div className="space-y-1">
                <div
                  className={`text-[2.2rem] sm:text-[2.6rem] font-extrabold font-mono tracking-tight leading-none ${card.accent}`}
                >
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
