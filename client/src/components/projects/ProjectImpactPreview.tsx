import { PortfolioMetrics } from '../../types/projects';
import {
  ArrowRight,
  Sparkles,
  Activity,
  Globe2,
  BookOpen,
  Lightbulb,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectImpactPreviewProps {
  metrics: PortfolioMetrics;
}

export function ProjectImpactPreview({ metrics }: ProjectImpactPreviewProps) {
  const cards = [
    {
      category: 'PEOPLE',
      metric: metrics.impactCategories.people,
      label: 'Potential Beneficiaries',
      subtext: 'Direct household coverage in tribal & rural blocks',
      icon: Globe2,
      accent: 'text-[#FA7E61]',
    },
    {
      category: 'COMMUNITIES',
      metric: metrics.impactCategories.communities.toString(),
      label: 'Active Field Locations',
      subtext: 'Villages, wards, and mining settlements with active sensors',
      icon: Activity,
      accent: 'text-[#F5A623]',
    },
    {
      category: 'INNOVATION',
      metric: metrics.impactCategories.innovation.toString(),
      label: 'Technologies in Pilot',
      subtext: 'Hardware prototypes deployed in live conditions',
      icon: Lightbulb,
      accent: 'text-[#FEE1C7]',
    },
    {
      category: 'KNOWLEDGE',
      metric: metrics.impactCategories.knowledge.toString(),
      label: 'Research Outputs',
      subtext: 'Peer-reviewed evaluations & open dataset benchmarks',
      icon: BookOpen,
      accent: 'text-[#B5A886]',
    },
    {
      category: 'ECONOMIC',
      metric: metrics.impactCategories.economic.toString(),
      label: 'Startup / Transfer Opps',
      subtext: 'Commercialization & MSME manufacturing licenses',
      icon: TrendingUp,
      accent: 'text-[#15803D]',
    },
  ];

  return (
    <section
      id="project-impact"
      className="bg-[#4C1E4F] text-white py-16 sm:py-20 relative overflow-hidden border-b border-[#3A143D] text-left"
    >
      {/* Topographic Background Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] pattern-topography"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/15 pb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#FA7E61] font-bold">
              <Sparkles className="h-4 w-4" />
              <span>OUTCOME-BASED INNOVATION</span>
            </div>
            <h2 className="text-[2.2rem] sm:text-[3rem] font-extrabold text-white tracking-tight leading-tight font-sans">
              Progress matters. <br />
              <span className="text-[#FEE1C7]">Impact matters more.</span>
            </h2>
            <p className="text-[15px] sm:text-[17px] text-[#FEE1C7]/80 leading-relaxed font-normal">
              JharSankalp tracks whether projects create meaningful improvements beyond prototypes
              and presentations.
            </p>
          </div>

          <div className="space-y-2 shrink-0">
            <div className="text-[10px] font-mono text-[#FEE1C7]/60 uppercase tracking-widest text-right">
              PROTOTYPE EVALUATION METRICS · DEMO PORTFOLIO DATA
            </div>
            <Link
              to="/impact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#FA7E61] hover:bg-[#e86c4f] text-white px-6 py-3.5 text-[14px] font-bold shadow-md transition-all active:scale-[0.98]"
            >
              <span>Explore Impact Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* ── 5 Impact Metric Pillars ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.category}
                className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 transition-all space-y-3 backdrop-blur-xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#FEE1C7]/70">
                      {card.category}
                    </span>
                    <Icon className={`h-4 w-4 ${card.accent}`} />
                  </div>

                  <div
                    className={`text-[2.2rem] sm:text-[2.6rem] font-extrabold leading-none font-sans ${card.accent}`}
                  >
                    {card.metric}
                  </div>

                  <div className="text-[14px] font-bold text-white leading-snug">{card.label}</div>
                </div>

                <div className="text-[11.5px] text-[#FEE1C7]/60 font-mono leading-relaxed pt-2 border-t border-white/10">
                  {card.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
