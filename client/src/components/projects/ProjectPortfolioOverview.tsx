import { PortfolioStats } from '../../types/projects';
import { Rocket, GraduationCap, Building2, Radio, Users } from 'lucide-react';

interface ProjectPortfolioOverviewProps {
  stats: PortfolioStats;
}

export function ProjectPortfolioOverview({ stats }: ProjectPortfolioOverviewProps) {
  return (
    <section className="bg-[#1B112C] text-white border-y border-[#382657] py-8 sm:py-10 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#382657] gap-6 sm:gap-0">
          {/* Metric 1 */}
          <div className="sm:pr-8 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#FFD8A8]">
              <Rocket className="h-3.5 w-3.5 text-[#F5A623]" />
              <span>Active Initiatives</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[2.5rem] sm:text-[3rem] font-extrabold font-mono tracking-tight text-white leading-none">
                {stats.activeProjects}
              </span>
              <span className="text-[12.5px] font-semibold text-[#DDD6FE] leading-tight">
                Active Projects
              </span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="sm:px-8 space-y-1.5 pt-4 sm:pt-0">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#FFD8A8]">
              <GraduationCap className="h-3.5 w-3.5 text-[#F5A623]" />
              <span>Academic Labs</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[2.5rem] sm:text-[3rem] font-extrabold font-mono tracking-tight text-white leading-none">
                {stats.universitiesInvolved}
              </span>
              <span className="text-[12.5px] font-semibold text-[#DDD6FE] leading-tight">
                Universities Involved
              </span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="sm:px-8 space-y-1.5 pt-4 sm:pt-0">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#FFD8A8]">
              <Building2 className="h-3.5 w-3.5 text-[#F5A623]" />
              <span>Industry & MSME</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[2.5rem] sm:text-[3rem] font-extrabold font-mono tracking-tight text-white leading-none">
                {stats.partnerOrganizations}
              </span>
              <span className="text-[12.5px] font-semibold text-[#DDD6FE] leading-tight">
                Partner Organizations
              </span>
            </div>
          </div>

          {/* Metric 4 (Accent highlighted) */}
          <div className="sm:px-8 space-y-1.5 pt-4 sm:pt-0">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#F43F5E]">
              <Radio className="h-3.5 w-3.5 text-[#F43F5E] animate-pulse" />
              <span>Ground Testing</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[2.5rem] sm:text-[3rem] font-extrabold font-mono tracking-tight text-[#F43F5E] leading-none">
                0{stats.projectsInFieldPilot}
              </span>
              <span className="text-[12.5px] font-semibold text-[#DDD6FE] leading-tight">
                In Field Pilot
              </span>
            </div>
          </div>

          {/* Metric 5 */}
          <div className="sm:pl-8 space-y-1.5 pt-4 sm:pt-0 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#FFD8A8]">
              <Users className="h-3.5 w-3.5 text-[#F5A623]" />
              <span>Beneficiaries</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[2.5rem] sm:text-[3rem] font-extrabold font-mono tracking-tight text-[#FDE68A] leading-none">
                {stats.peopleImpacted.toLocaleString()}+
              </span>
              <span className="text-[12.5px] font-semibold text-[#DDD6FE] leading-tight">
                People Impacted
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
