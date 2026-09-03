import { GraduationCap, Building2, Cpu, MapPin, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export function ProjectParticipationCTA() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roleCards = [
    {
      role: 'I Represent a University',
      subtext: 'Faculty mentors, academic labs, and student researcher deployment.',
      icon: GraduationCap,
      actionPrompt: 'Register Research Lab',
    },
    {
      role: 'I Represent Industry',
      subtext: 'Commercialization, hardware fabrication, and CSR co-funding.',
      icon: Building2,
      actionPrompt: 'Join as Industry Partner',
    },
    {
      role: 'I Have Technical Expertise',
      subtext: 'Embedded IoT, AI models, remote sensing, and soil science.',
      icon: Cpu,
      actionPrompt: 'Offer Expert Mentorship',
    },
    {
      role: 'I Can Support a Field Pilot',
      subtext: 'Community groups, Jal Sahiyas, and district field administration.',
      icon: MapPin,
      actionPrompt: 'Propose Pilot Location',
    },
  ];

  return (
    <section className="bg-[#FAF9F5] py-16 sm:py-24 text-left border-t border-[#EEEAE1]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#4C1E4F] font-bold">
            <span className="h-2 w-2 rounded-full bg-[#FA7E61]" />
            ECOSYSTEM PARTICIPATION
          </div>
          <h2 className="text-[2.2rem] sm:text-[3rem] font-extrabold text-[#1D2522] tracking-tight leading-tight font-sans">
            A project needs more than a good idea.
          </h2>
          <p className="text-[16px] sm:text-[17.5px] text-[#6B5845] leading-relaxed">
            It needs people who understand the problem, institutions willing to support the work and
            partners capable of bringing solutions into the real world.
          </p>
        </div>

        {/* ── 4 Role-Specific CTAs ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roleCards.map((rc) => {
            const Icon = rc.icon;
            return (
              <div
                key={rc.role}
                className="p-6 rounded-2xl bg-white border border-[#EEEAE1] hover:border-[#4C1E4F] transition-all hover:shadow-md flex flex-col justify-between space-y-6 group text-left"
              >
                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-[#F8F6F1] group-hover:bg-[#4C1E4F] text-[#4C1E4F] group-hover:text-[#FEE1C7] flex items-center justify-center transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-[1.15rem] font-bold text-[#1D2522] leading-snug">
                    {rc.role}
                  </h3>

                  <p className="text-[13px] text-[#6B5845] leading-relaxed">{rc.subtext}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedRole(rc.role)}
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#F8F6F1] group-hover:bg-[#FA7E61] text-[#1D2522] group-hover:text-white text-[12.5px] font-bold transition-colors cursor-pointer"
                >
                  <span>{rc.actionPrompt}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Feedback Modal / Dialogue */}
        {selectedRole && (
          <div className="p-4 rounded-2xl bg-[#4C1E4F] text-white flex items-center justify-between flex-wrap gap-3 animate-in fade-in duration-200">
            <div className="space-y-0.5">
              <span className="text-[11px] font-mono text-[#FA7E61] uppercase font-bold">
                PARTNER ONBOARDING PIPELINE
              </span>
              <div className="text-[14px] font-bold">Connecting as: {selectedRole}</div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[12px] text-[#FEE1C7] font-mono">
                Consortium onboarding will route to active sprints.
              </span>
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[12px] font-mono cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
