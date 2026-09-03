import { ContributorDetail } from '../../types/ideaDetail';
import { Users, GraduationCap, Building, Wrench } from 'lucide-react';

interface ContributorListProps {
  contributors: ContributorDetail[];
}

export function ContributorList({ contributors }: ContributorListProps) {
  const getRoleIcon = (role: string) => {
    const lower = role.toLowerCase();
    if (lower.includes('mentor') || lower.includes('faculty')) {
      return <GraduationCap className="h-4 w-4 text-[#0284C7]" />;
    }
    if (lower.includes('partner') || lower.includes('lab') || lower.includes('committee')) {
      return <Building className="h-4 w-4 text-[#15803D]" />;
    }
    return <Wrench className="h-4 w-4 text-[#123B2A]" />;
  };

  return (
    <section id="contributors" className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#EEEAE1] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <Users className="h-4 w-4 text-[#F5A623]" />
            <span>SECTION 06 · MULTIDISCIPLINARY SQUAD</span>
          </div>

          <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            People moving the idea forward
          </h2>
        </div>

        <span className="text-[13px] font-mono text-[#6B5845]">
          <strong className="text-[#1D2522] font-bold">{contributors.length}</strong> Active Contributors
        </span>
      </div>

      {/* ── Editorial Contributor Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contributors.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-2xl border border-[#EEEAE1] bg-white hover:border-[#123B2A]/40 shadow-2xs hover:shadow-xs transition-all space-y-3 flex flex-col justify-between text-left"
          >
            <div className="flex items-start gap-3">
              {/* Avatar Initials */}
              <div className="h-11 w-11 rounded-xl bg-[#123B2A] text-white flex items-center justify-center text-[13px] font-mono font-bold shrink-0 shadow-2xs">
                {c.avatarInitials}
              </div>

              <div className="min-w-0 space-y-0.5">
                <h3 className="text-[14.5px] font-bold text-[#1D2522] truncate leading-snug">
                  {c.name}
                </h3>
                <p className="text-[12.5px] text-[#6B5845] truncate">
                  {c.title}
                </p>
                {c.institution && (
                  <p className="text-[11.5px] font-mono text-[#123B2A] truncate">
                    {c.institution}
                  </p>
                )}
              </div>
            </div>

            {/* Role Badge */}
            <div className="pt-2 border-t border-[#EEEAE1] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#6B5845] uppercase">DOMAIN ROLE:</span>
              <span className="inline-flex items-center gap-1 font-bold text-[#123B2A] bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#EEEAE1]">
                {getRoleIcon(c.role)}
                {c.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
