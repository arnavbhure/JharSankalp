import { ProjectDetail } from '../../types/projectDetail';
import { Building2, Users, GraduationCap, Award } from 'lucide-react';

interface ProjectTeamProps {
  project: ProjectDetail;
}

export function ProjectTeam({ project }: ProjectTeamProps) {
  return (
    <section id="team" className="scroll-mt-32 space-y-6 text-left">
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-8">
        <div className="space-y-1 border-b border-[#EEEAE1] pb-4">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <Users className="h-4 w-4 text-[#F5A623]" />
            <span>CONSORTIUM ROSTER</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            The people and institutions building this
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl leading-relaxed">
            A cross-sector coalition uniting engineering faculty, student fellows, district administrators, and local community water samitis.
          </p>
        </div>

        {/* ── Lead Institution Spotlight ── */}
        <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-[#123B2A] text-white flex items-center justify-center shrink-0 shadow-xs">
              <GraduationCap className="h-6 w-6 text-[#F5A623]" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h4 className="text-[1.15rem] font-extrabold text-[#1D2522] font-sans">
                  {project.leadInstitution}
                </h4>
                <span className="text-[10.5px] font-mono font-bold bg-[#123B2A] text-white px-2 py-0.5 rounded">
                  LEAD RESEARCH INSTITUTION
                </span>
              </div>
              <p className="text-[13px] text-[#6B5845]">
                Anchor Academic Partner · Engineering, Firmware & Sensor Telemetry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[12px] font-mono text-[#15803D] bg-white px-3 py-1.5 rounded-xl border border-[#BBF7D0] shrink-0 self-start sm:self-auto">
            <Award className="h-3.5 w-3.5" />
            <span>Charter Signatory</span>
          </div>
        </div>

        {/* ── Key Project Team Members ── */}
        <div className="space-y-3">
          <h4 className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            CORE PROJECT TEAM
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {project.team.map((member) => (
              <div
                key={member.id}
                className="p-4 rounded-2xl border border-[#EEEAE1] bg-white hover:border-[#123B2A]/40 transition-colors space-y-2 text-left shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] text-[#123B2A] font-mono font-bold text-[12px] flex items-center justify-center shrink-0">
                    {member.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-[13.5px] font-bold text-[#1D2522] truncate">
                      {member.name}
                    </h5>
                    <span className="text-[11px] font-mono text-[#123B2A] font-semibold block truncate">
                      {member.role}
                    </span>
                  </div>
                </div>

                <div className="text-[12px] text-[#6B5845] space-y-0.5 pt-1 border-t border-[#EEEAE1]/60">
                  <div className="truncate">{member.title}</div>
                  <div className="text-[11px] font-mono text-[#6B5845]">
                    Specialty: {member.specialty}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Partner Organizations Stack ── */}
        <div className="space-y-3 pt-2">
          <h4 className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            PARTNER ORGANIZATIONS
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {project.partners.map((partner) => (
              <div
                key={partner.id}
                className="p-4 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] space-y-2 text-left"
              >
                <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#6B5845]">
                  <span className="font-bold text-[#123B2A]">{partner.type}</span>
                  {partner.lead && (
                    <span className="text-[#F5A623] font-bold">● Lead</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[#123B2A] shrink-0" />
                  <h5 className="text-[13.5px] font-bold text-[#1D2522] leading-tight">
                    {partner.name}
                  </h5>
                </div>

                {partner.role && (
                  <p className="text-[11.5px] text-[#6B5845] leading-snug">
                    {partner.role}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
