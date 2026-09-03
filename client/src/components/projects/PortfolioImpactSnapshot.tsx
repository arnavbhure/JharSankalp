import { PortfolioStats } from '../../types/projects';
import { Target, CheckCircle2, Sparkles, Building2, MapPin, Users, Rocket } from 'lucide-react';

interface PortfolioImpactSnapshotProps {
  stats: PortfolioStats;
}

export function PortfolioImpactSnapshot({ stats }: PortfolioImpactSnapshotProps) {
  return (
    <section className="rounded-3xl bg-[#1B112C] text-white p-8 sm:p-12 lg:p-14 shadow-xl border border-[#382657] text-left relative overflow-hidden">
      {/* Background Geodetic Lines */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(#F5A62315_1.5px,transparent_1.5px)] bg-[size:24px_24px] pointer-events-none"
      />

      <div className="space-y-8 relative z-10">
        <div className="space-y-2 border-b border-[#382657] pb-6">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#FFD8A8]">
            <Target className="h-4 w-4 text-[#F43F5E]" />
            <span>MEASURABLE SOCIETAL TRANSFORMATION</span>
          </div>

          <h3 className="text-[2rem] sm:text-[2.6rem] font-extrabold text-white tracking-tight font-sans">
            What the portfolio is working toward
          </h3>

          <p className="text-[15px] sm:text-[16px] text-[#DDD6FE] max-w-2xl leading-relaxed">
            Transitioning academic IP and grassroots prototypes into scalable district deployments across public water, education, mining, and healthcare.
          </p>
        </div>

        {/* 5 Prominent Cumulative Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-2xl bg-[#281943] border border-[#48336E] space-y-1">
            <Users className="h-4 w-4 text-[#F5A623]" />
            <div className="text-[1.8rem] sm:text-[2.2rem] font-extrabold font-mono text-[#FDE68A] leading-tight">
              {stats.peopleImpacted.toLocaleString()}+
            </div>
            <div className="text-[11.5px] font-medium text-[#DDD6FE]">
              Potential Citizens Reached
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#281943] border border-[#48336E] space-y-1">
            <Building2 className="h-4 w-4 text-[#F5A623]" />
            <div className="text-[1.8rem] sm:text-[2.2rem] font-extrabold font-mono text-white leading-tight">
              {stats.universitiesInvolved}
            </div>
            <div className="text-[11.5px] font-medium text-[#DDD6FE]">
              Higher Education Institutions
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#281943] border border-[#48336E] space-y-1">
            <Sparkles className="h-4 w-4 text-[#F5A623]" />
            <div className="text-[1.8rem] sm:text-[2.2rem] font-extrabold font-mono text-white leading-tight">
              {stats.partnerOrganizations}
            </div>
            <div className="text-[11.5px] font-medium text-[#DDD6FE]">
              Industry & Delivery Partners
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#281943] border border-[#48336E] space-y-1">
            <Rocket className="h-4 w-4 text-[#F5A623]" />
            <div className="text-[1.8rem] sm:text-[2.2rem] font-extrabold font-mono text-white leading-tight">
              {stats.activeProjects}
            </div>
            <div className="text-[11.5px] font-medium text-[#DDD6FE]">
              Active Innovation Projects
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#281943] border border-[#48336E] space-y-1 col-span-2 sm:col-span-1">
            <MapPin className="h-4 w-4 text-[#F43F5E]" />
            <div className="text-[1.8rem] sm:text-[2.2rem] font-extrabold font-mono text-[#F43F5E] leading-tight">
              0{stats.districtsWithPilots}
            </div>
            <div className="text-[11.5px] font-medium text-[#DDD6FE]">
              Districts with Field Pilots
            </div>
          </div>
        </div>

        {/* ── Impact Creed Statement ── */}
        <div className="pt-4 border-t border-[#382657] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <blockquote className="space-y-1 max-w-3xl">
            <p className="text-[15.5px] sm:text-[17.5px] font-serif italic text-[#FFD8A8] leading-relaxed">
              &ldquo;The value of innovation is not measured by how many ideas are generated. It is measured by how many solutions reach people.&rdquo;
            </p>
            <footer className="text-[11.5px] font-mono uppercase tracking-widest text-[#DDD6FE]/70">
              JharSankalp Core Innovation Axiom
            </footer>
          </blockquote>

          <div className="shrink-0 flex items-center gap-2 text-[12px] font-mono text-[#BBF7D0] bg-[#15803D]/20 px-3.5 py-1.5 rounded-xl border border-[#15803D]/40">
            <CheckCircle2 className="h-4 w-4 text-[#4ADE80]" />
            <span>Audited & Field Verified</span>
          </div>
        </div>
      </div>
    </section>
  );
}
