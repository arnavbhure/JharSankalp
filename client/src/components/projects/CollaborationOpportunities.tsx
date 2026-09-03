import { useNavigate } from 'react-router-dom';
import { Project } from '../../types/projects';
import { Handshake, ArrowRight, Sparkles, MapPin, Building2 } from 'lucide-react';

interface CollaborationOpportunitiesProps {
  opportunities: Array<{ project: Project; need: string }>;
}

export function CollaborationOpportunities({ opportunities }: CollaborationOpportunitiesProps) {
  const navigate = useNavigate();

  return (
    <section className="space-y-6 text-left">
      <div className="border-b border-[#EEEAE1] pb-3 space-y-1">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <Handshake className="h-4 w-4 text-[#F5A623]" />
          <span>INDUSTRY & MULTI-DISCIPLINARY VACANCIES</span>
        </div>
        <h3 className="text-[1.75rem] sm:text-[2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Projects looking for partners
        </h3>
        <p className="text-[14px] text-[#6B5845] max-w-2xl leading-relaxed">
          Some projects are ready to move faster with the right industrial manufacturing, geospatial
          analytics, or local community implementation support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {opportunities.slice(0, 3).map(({ project, need }) => (
          <div
            key={project.id}
            className="p-5 sm:p-6 rounded-3xl border border-[#EEEAE1] bg-white hover:border-[#123B2A]/50 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#6B5845]">
                <span className="text-[#123B2A] font-bold bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#EEEAE1]">
                  {project.stageLabel}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-[#BE123C]" />
                  {project.district}
                </span>
              </div>

              <div className="space-y-1">
                <h4
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="text-[1.2rem] font-bold text-[#1D2522] font-sans group-hover:text-[#123B2A] cursor-pointer transition-colors leading-snug"
                >
                  {project.title}
                </h4>
                <div className="text-[12px] text-[#6B5845] flex items-center gap-1">
                  <Building2 className="h-3 w-3 text-[#123B2A]" />
                  <span>Lead: {project.leadInstitution}</span>
                </div>
              </div>

              {/* Vacancy Callout */}
              <div className="p-3 rounded-2xl bg-[#FFFDF9] border border-[#F5A623]/40 space-y-1">
                <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase text-[#B45309]">
                  <Sparkles className="h-3 w-3 text-[#F5A623]" />
                  <span>SEEKING PARTNERSHIP</span>
                </div>
                <p className="text-[13px] font-extrabold text-[#123B2A]">{need}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#EEEAE1]">
              <button
                type="button"
                onClick={() => navigate(`/projects/${project.id}`)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[#123B2A] text-[13px] font-bold transition-all cursor-pointer group-hover:border-[#123B2A]"
              >
                <span>Explore Opportunity</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
