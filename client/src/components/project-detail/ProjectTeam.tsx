import { ProjectDetail } from '../../types/projectDetail';
import { Users, Building2, GraduationCap, HeartHandshake, Landmark, Cpu } from 'lucide-react';

interface ProjectTeamProps {
  project: ProjectDetail;
}

export function ProjectTeam({ project }: ProjectTeamProps) {
  const { team, partners } = project;

  // Partner Categories
  const partnerCategories = [
    {
      key: 'COMMUNITY',
      label: 'COMMUNITY & GRASSROOTS',
      icon: HeartHandshake,
      color: 'border-[#FA7E61]/40 bg-[#FFFDF9] text-[#FA7E61]',
    },
    {
      key: 'UNIVERSITY',
      label: 'UNIVERSITY & ACADEMIC',
      icon: GraduationCap,
      color: 'border-[#4C1E4F]/30 bg-[#FAF9F5] text-[#4C1E4F]',
    },
    {
      key: 'INDUSTRY',
      label: 'INDUSTRY & STARTUP',
      icon: Building2,
      color: 'border-[#B5A886]/40 bg-[#FAF9F5] text-[#B5A886]',
    },
    {
      key: 'GOVERNMENT',
      label: 'GOVERNMENT & PUBLIC WORKS',
      icon: Landmark,
      color: 'border-[#123B2A]/30 bg-[#FAF9F5] text-[#123B2A]',
    },
    {
      key: 'RESEARCH_ORG',
      label: 'RESEARCH & TECHNICAL PARTNERS',
      icon: Cpu,
      color: 'border-[#15803D]/30 bg-[#FAF9F5] text-[#15803D]',
    },
  ];

  const getCategoryPartners = (key: string) => {
    return partners.filter((p) => {
      if (key === 'COMMUNITY') return p.type === 'COMMUNITY' || p.type === 'COMMUNITY_ORG';
      if (key === 'UNIVERSITY') return p.type === 'UNIVERSITY';
      if (key === 'INDUSTRY') return p.type === 'INDUSTRY' || p.type === 'STARTUP';
      if (key === 'GOVERNMENT') return p.type === 'GOVERNMENT';
      if (key === 'RESEARCH_ORG') return p.type === 'RESEARCH_ORGANIZATION' || p.type === 'RESEARCH_ORG';
      return false;
    });
  };

  return (
    <section id="team" className="scroll-mt-32 space-y-8 text-left">
      {/* ── SECTION 5: Collaboration & Partners Ecosystem ── */}
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#4C1E4F]">
              <Building2 className="h-4 w-4 text-[#FA7E61]" />
              <span>COLLABORATION & PARTNERS ECOSYSTEM</span>
            </div>
            <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              Stakeholders & Organizations Involved
            </h3>
            <p className="text-[13.5px] text-[#6B5845] max-w-2xl leading-relaxed">
              Consortium model uniting academic institutions, local communities, government departments, and industrial innovators.
            </p>
          </div>

          <span className="text-[10px] font-mono uppercase bg-[#FAF9F5] px-2.5 py-1 rounded-full border border-[#EEEAE1] text-[#6B5845]">
            DEMO / PROTOTYPE CONSORTIUM
          </span>
        </div>

        {/* Grouped Partners Grid */}
        <div className="space-y-6">
          {partnerCategories.map((cat) => {
            const list = getCategoryPartners(cat.key);
            if (list.length === 0) return null;

            const CatIcon = cat.icon;

            return (
              <div key={cat.key} className="space-y-3">
                <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
                  <CatIcon className="h-3.5 w-3.5 text-[#123B2A]" />
                  <span>{cat.label}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {list.map((partner) => (
                    <div
                      key={partner.id}
                      className="p-4 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] hover:bg-white hover:border-[#B5A886] transition-all space-y-2 text-left shadow-2xs"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase">
                        <span className="font-bold text-[#4C1E4F]">{partner.type}</span>
                        {partner.lead && (
                          <span className="text-[#FA7E61] font-bold">● Lead Partner</span>
                        )}
                      </div>

                      <div className="text-[14px] font-bold text-[#1D2522] leading-tight">
                        {partner.name}
                      </div>

                      <div className="text-[12px] text-[#6B5845] leading-snug">
                        {partner.role || 'Consortium Contributor & Technical Reviewer'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── SECTION 6: Project Team Profiles ── */}
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
              <Users className="h-4 w-4 text-[#F5A623]" />
              <span>CORE PROJECT TEAM</span>
            </div>
            <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              Interdisciplinary Investigators & Coordinators
            </h3>
            <p className="text-[13.5px] text-[#6B5845] max-w-2xl leading-relaxed">
              Researchers, field specialists, and student fellows directly engineering and verifying the solution.
            </p>
          </div>

          <span className="text-[12px] font-mono text-[#6B5845]">
            {team.length} Active Key Personnel
          </span>
        </div>

        {/* Compact Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {team.map((member) => (
            <div
              key={member.id}
              className="p-4 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] hover:bg-white hover:border-[#123B2A]/40 transition-all flex items-start gap-3.5 text-left shadow-2xs"
            >
              {/* Avatar Circle */}
              <div className="h-11 w-11 rounded-xl bg-[#123B2A] text-[#F5A623] flex items-center justify-center font-bold text-[13px] font-mono shrink-0 shadow-xs">
                {member.avatarInitials}
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#4C1E4F] text-[#FEE1C7]">
                    {member.role}
                  </span>
                </div>

                <h4 className="text-[14px] font-bold text-[#1D2522] truncate">
                  {member.name}
                </h4>

                <div className="text-[12px] text-[#123B2A] font-medium leading-tight">
                  {member.institution}
                </div>

                <div className="text-[11px] font-mono text-[#6B5845] leading-tight pt-0.5">
                  {member.specialty}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
