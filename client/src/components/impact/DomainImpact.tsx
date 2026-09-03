import {
  Droplets,
  Wheat,
  HeartPulse,
  GraduationCap,
  ShieldAlert,
  Trees,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { DomainImpactItem } from '../../types/impact';

interface DomainImpactProps {
  domains: DomainImpactItem[];
}

export function DomainImpact({ domains }: DomainImpactProps) {
  const getDomainIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'water management':
        return <Droplets className="h-5 w-5 text-[#0284C7]" />;
      case 'agriculture':
        return <Wheat className="h-5 w-5 text-[#15803D]" />;
      case 'healthcare':
        return <HeartPulse className="h-5 w-5 text-[#BE123C]" />;
      case 'education':
        return <GraduationCap className="h-5 w-5 text-[#7E22CE]" />;
      case 'mining safety':
        return <ShieldAlert className="h-5 w-5 text-[#B45309]" />;
      case 'environment':
        return <Trees className="h-5 w-5 text-[#15803D]" />;
      default:
        return <CheckCircle2 className="h-5 w-5 text-[#123B2A]" />;
    }
  };

  return (
    <section className="space-y-6 text-left">
      <div className="space-y-1">
        <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          SECTORAL REACH
        </span>
        <h2 className="text-[1.5rem] sm:text-[1.8rem] font-bold text-[#1D2522]">
          Where Innovation Is Making a Difference
        </h2>
        <p className="text-[13.5px] text-[#6B5845] max-w-xl leading-relaxed">
          Cross-cutting societal domains delivering measurable outcomes across tribal and rural Jharkhand.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {domains.map((dom) => (
          <div
            key={dom.id}
            className="rounded-3xl border border-[#EEEAE1] bg-white p-6 shadow-2xs hover:shadow-md hover:border-[#123B2A]/30 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Header: Icon & Domain */}
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] flex items-center justify-center">
                  {getDomainIcon(dom.name)}
                </div>
                <span className="text-[11px] font-mono font-bold text-[#123B2A] bg-[#FAF9F5] px-2.5 py-1 rounded-md border border-[#EEEAE1]">
                  {dom.projectsCount} Projects
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <h3 className="text-[1.2rem] font-bold text-[#1D2522]">
                  {dom.name}
                </h3>
                <p className="text-[13px] text-[#6B5845] leading-relaxed">
                  {dom.description}
                </p>
              </div>

              {/* Highlight Metric Pill */}
              <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1 text-[12px]">
                <span className="text-[10px] font-mono font-bold uppercase text-[#15803D] block">
                  MEASURED COMMUNITY PROGRESS:
                </span>
                <span className="font-bold text-[#1D2522] block">
                  {dom.highlightMetric}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-[#EEEAE1] flex items-center justify-between text-[11.5px] font-mono text-[#6B5845]">
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-[#123B2A]" />
                <span>{dom.peopleReached.toLocaleString()} People Reached</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
