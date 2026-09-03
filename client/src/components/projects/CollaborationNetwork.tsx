import { Users, GraduationCap, Building2, Landmark, Rocket, HeartHandshake } from 'lucide-react';

export function CollaborationNetwork() {
  const roles = [
    {
      title: 'Faculty Mentors',
      icon: GraduationCap,
      description: 'Senior professors guiding hardware architecture & scientific validation.',
      color: 'bg-[#4C1E4F] text-white',
    },
    {
      title: 'Student Researchers',
      icon: Users,
      description: 'Postgraduates & engineering scholars conducting telemetry diagnostics.',
      color: 'bg-[#123B2A] text-white',
    },
    {
      title: 'Industry Engineers',
      icon: Building2,
      description: 'Commercial IoT & electronics specialists ensuring field-grade ruggedness.',
      color: 'bg-[#FA7E61] text-white',
    },
    {
      title: 'Community Partners',
      icon: HeartHandshake,
      description: 'Jal Sahiyas, Krishi Mitras, and Gram Sabhas providing ground truth.',
      color: 'bg-[#B5A886] text-white',
    },
    {
      title: 'Government Departments',
      icon: Landmark,
      description: 'BDOs, PHED, and District Officers providing operational mandate.',
      color: 'bg-[#1D2522] text-white',
    },
    {
      title: 'Startups & MSMEs',
      icon: Rocket,
      description: 'Local prototyping firms fabricating brackets, solar frames & enclosures.',
      color: 'bg-[#4C1E4F]/80 text-[#FEE1C7]',
    },
  ];

  return (
    <section className="border-b border-[#EEEAE1] bg-[#FAF9F5] py-14 sm:py-20 text-left relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Header */}
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#4C1E4F] font-bold">
            <span className="h-2 w-2 rounded-full bg-[#FA7E61]" />
            MULTI-SECTOR COLLABORATION MODEL
          </div>
          <h2 className="text-[2.2rem] sm:text-[2.8rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Built by ecosystems, not individuals.
          </h2>
          <p className="text-[15px] sm:text-[17px] text-[#6B5845] leading-relaxed">
            Societal challenges require deep multi-disciplinary capability. JharSankalp connects community needs with university research, startup agility, and administrative mandate.
          </p>
        </div>

        {/* ── Structural Flow Diagram ── */}
        <div className="rounded-3xl bg-white border border-[#EEEAE1] p-6 sm:p-10 shadow-xs space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center">
            {/* Step 1 */}
            <div className="p-3.5 rounded-2xl bg-[#F8F6F1] border border-[#EEEAE1] space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#FA7E61] uppercase tracking-wider block">
                01 ORIGIN
              </span>
              <div className="text-[13.5px] font-extrabold text-[#1D2522]">
                COMMUNITY
              </div>
              <div className="text-[11px] text-[#6B5845] font-mono">
                Grassroots Ground Truth
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-3.5 rounded-2xl bg-[#F8F6F1] border border-[#EEEAE1] space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#4C1E4F] uppercase tracking-wider block">
                02 DEFINITION
              </span>
              <div className="text-[13.5px] font-extrabold text-[#1D2522]">
                CHALLENGE CONTEXT
              </div>
              <div className="text-[11px] text-[#6B5845] font-mono">
                Root-Cause Isolation
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-3.5 rounded-2xl bg-[#4C1E4F] text-white space-y-1 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-[#FEE1C7] uppercase tracking-wider block">
                03 DISCIPLINE
              </span>
              <div className="text-[13.5px] font-extrabold text-white">
                UNIVERSITY ↔ INDUSTRY
              </div>
              <div className="text-[11px] text-[#FEE1C7]/80 font-mono">
                R&D Meets Engineering
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-3.5 rounded-2xl bg-[#F8F6F1] border border-[#EEEAE1] space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#123B2A] uppercase tracking-wider block">
                04 SPRINT
              </span>
              <div className="text-[13.5px] font-extrabold text-[#1D2522]">
                PROJECT TEAM
              </div>
              <div className="text-[11px] text-[#6B5845] font-mono">
                Milestone Execution
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-3.5 rounded-2xl bg-[#FA7E61] text-white space-y-1 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-[#1D2522] uppercase tracking-wider block">
                05 DEPLOYMENT
              </span>
              <div className="text-[13.5px] font-extrabold text-white">
                FIELD PILOT
              </div>
              <div className="text-[11px] text-white/90 font-mono">
                District Validation
              </div>
            </div>

            {/* Step 6 */}
            <div className="p-3.5 rounded-2xl bg-[#15803D] text-white space-y-1 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-[#FEE1C7] uppercase tracking-wider block">
                06 SUSTAINABILITY
              </span>
              <div className="text-[13.5px] font-extrabold text-white">
                VERIFIED IMPACT
              </div>
              <div className="text-[11px] text-white/90 font-mono">
                Policy & Scale
              </div>
            </div>
          </div>

          {/* ── Real Project Roles Grid ── */}
          <div className="pt-4 border-t border-[#EEEAE1]">
            <div className="text-[12px] font-mono uppercase font-bold text-[#6B5845] mb-4">
              Participating Role Functions in Active Project Consortia
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {roles.map((r) => {
                const Icon = r.icon;
                return (
                  <div
                    key={r.title}
                    className="p-4 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] hover:bg-white hover:border-[#B5A886]/60 transition-all flex items-start gap-3.5"
                  >
                    <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center ${r.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-[14px] font-bold text-[#1D2522]">
                        {r.title}
                      </div>
                      <div className="text-[12.5px] text-[#6B5845] leading-relaxed">
                        {r.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
