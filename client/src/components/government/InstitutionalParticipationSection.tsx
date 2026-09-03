import { Link } from 'react-router-dom';
import { InstitutionMetric, IndustryPartnerMetric } from '../../types/government';
import { Building2, GraduationCap, Briefcase } from 'lucide-react';

interface InstitutionalParticipationSectionProps {
  universities: InstitutionMetric[];
  industry: IndustryPartnerMetric[];
}

export function InstitutionalParticipationSection({
  universities,
  industry,
}: InstitutionalParticipationSectionProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'HIGH_ACTIVITY':
        return 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]';
      case 'ACTIVE':
        return 'bg-[#FAF9F5] text-[#4C1E4F] border-[#4C1E4F]/30';
      case 'MODERATE':
        return 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]';
      case 'EMERGING':
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-xs text-left space-y-8">
      {/* ── Section Header ── */}
      <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#4C1E4F]">
            <Building2 className="h-4 w-4 text-[#FA7E61]" />
            <span>ECOSYSTEM CAPACITY AUDIT</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Institutional & Industrial Participation
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl">
            Audit of academic commitment, research fellows deployed, and industry co-sponsorship
            across higher education institutions.
          </p>
        </div>

        <span className="text-[11px] font-mono text-[#6B5845] bg-[#FAF9F5] px-3 py-1 rounded-full border border-[#EEEAE1]">
          8 UNIVERSITIES · 14 PARTNERS
        </span>
      </div>

      {/* ── 1. Universities & Technical Institutes Roster ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-[12px] font-mono uppercase font-bold text-[#1D2522]">
          <span className="flex items-center gap-2 text-[#4C1E4F]">
            <GraduationCap className="h-4 w-4 text-[#FA7E61]" />
            Higher & Technical Education Institutions
          </span>
          <span className="text-[#6B5845] text-[11px]">Academic Engagement Index</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {universities.map((inst) => (
            <div
              key={inst.id}
              className="p-4 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] hover:bg-white hover:border-[#B5A886] transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#6B5845]">
                    {inst.type === 'TECHNICAL_INSTITUTE' ? 'Tech Institute' : 'University'}
                  </span>

                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(
                      inst.status,
                    )}`}
                  >
                    ● {inst.statusLabel}
                  </span>
                </div>

                <h4 className="text-[13.5px] font-bold text-[#1D2522] leading-snug line-clamp-2">
                  {inst.name}
                </h4>
              </div>

              {/* Institution Sub-Metrics */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#EEEAE1] text-[11.5px] font-mono">
                <div>
                  <span className="text-[#6B5845] text-[10px] block">Assigned</span>
                  <strong className="text-[#1D2522]">{inst.challengesAssigned} Challenges</strong>
                </div>
                <div>
                  <span className="text-[#6B5845] text-[10px] block">Teams</span>
                  <strong className="text-[#4C1E4F]">{inst.activeTeams} Sprints</strong>
                </div>
                <div>
                  <span className="text-[#6B5845] text-[10px] block">Projects</span>
                  <strong className="text-[#15803D]">{inst.projectsCount} Active</strong>
                </div>
                <div>
                  <span className="text-[#6B5845] text-[10px] block">Outputs</span>
                  <strong className="text-[#B45309]">{inst.researchOutputs} Papers/IP</strong>
                </div>
              </div>

              {inst.name.includes('BIT Mesra') && (
                <div className="pt-2 border-t border-[#EEEAE1]">
                  <Link
                    to="/university/dashboard"
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#4C1E4F] hover:text-[#FA7E61]"
                  >
                    <span>Open Campus Workspace →</span>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. Industry & Innovation Partners ── */}
      <div className="space-y-4 pt-2 border-t border-[#EEEAE1]">
        <div className="flex items-center justify-between text-[12px] font-mono uppercase font-bold text-[#1D2522]">
          <span className="flex items-center gap-2 text-[#123B2A]">
            <Briefcase className="h-4 w-4 text-[#F5A623]" />
            Industry & Technical Mentorship Support (14 Partners)
          </span>
          <span className="text-[#6B5845] text-[11px]">Prototyping & Commercialization</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {industry.map((ind) => (
            <div
              key={ind.category}
              className="p-4 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] space-y-2 text-left"
            >
              <div className="flex items-center justify-between">
                <span className="text-[12.5px] font-bold text-[#1D2522] leading-tight">
                  {ind.category}
                </span>
                <span className="h-6 w-6 rounded-full bg-[#123B2A] text-white flex items-center justify-center text-[11px] font-mono font-bold shrink-0">
                  {ind.count}
                </span>
              </div>

              <p className="text-[12px] text-[#6B5845] leading-snug">{ind.description}</p>

              <div className="pt-2 border-t border-[#EEEAE1] space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#6B5845] font-bold block">
                  Lead Partners:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {ind.leadPartners.map((lp) => (
                    <span
                      key={lp}
                      className="text-[10.5px] font-mono bg-white px-2 py-0.5 rounded border border-[#EEEAE1] text-[#1D2522]"
                    >
                      {lp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
