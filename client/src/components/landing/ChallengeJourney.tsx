import { Eye, MessageSquare, Handshake, Wrench, TrendingUp, ChevronRight } from 'lucide-react';

export function ChallengeJourney() {
  const steps = [
    {
      num: '01',
      title: 'Identify',
      actor: 'Citizens & Panchayats',
      desc: 'Ground-level infrastructural, agricultural, and health bottlenecks are captured through geotagged photos, voice notes, and local PRI observations.',
      icon: Eye,
      accent: '#123B2A',
      accentBg: 'bg-[#123B2A]/10 text-[#123B2A]',
      tagBg: 'bg-[#EEEAE1] text-[#123B2A]',
    },
    {
      num: '02',
      title: 'Discuss',
      actor: 'Community & AI Triage',
      desc: 'Communities deliberate on priority needs, while AI models deduplicate reports, cluster regional patterns, and structure verified problem briefs.',
      icon: MessageSquare,
      accent: '#B45309',
      accentBg: 'bg-[#F5A623]/15 text-[#B45309]',
      tagBg: 'bg-[#FEF6E9] text-[#B45309]',
    },
    {
      num: '03',
      title: 'Collaborate',
      actor: 'Universities & Labs',
      desc: 'The capability graph links validated challenges with certified university research faculties, student innovators, and industrial engineering mentors.',
      icon: Handshake,
      accent: '#1F5A3D',
      accentBg: 'bg-[#1F5A3D]/10 text-[#1F5A3D]',
      tagBg: 'bg-[#EBF3EE] text-[#1F5A3D]',
    },
    {
      num: '04',
      title: 'Build',
      actor: 'Consortium & MSMEs',
      desc: 'Higher Education Institutions partner with MSMEs under formal Impact Contracts, receiving seed funding to manufacture prototypes and run field trials.',
      icon: Wrench,
      accent: '#6B5845',
      accentBg: 'bg-[#6B5845]/10 text-[#6B5845]',
      tagBg: 'bg-[#EEEAE1] text-[#6B5845]',
    },
    {
      num: '05',
      title: 'Scale Impact',
      actor: 'State Government',
      desc: 'Pilot outcome metrics are independently verified by district authorities for statewide procurement, budget allocation, and lasting policy adoption.',
      icon: TrendingUp,
      accent: '#123B2A',
      accentBg: 'bg-[#123B2A] text-white',
      tagBg: 'bg-[#123B2A]/10 text-[#123B2A]',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 border-b border-[#EEEAE1] bg-[#FAF9F5] text-left relative overflow-hidden">
      {/* Subtle background dot matrix */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025] pattern-topography"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="border-b border-[#EEEAE1] pb-6 mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#123B2A] font-bold">
              <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
              INNOVATION LIFECYCLE
            </div>
            <h2 className="text-[2.2rem] sm:text-[2.6rem] font-extrabold text-[#1D2522] tracking-tight mt-1 font-sans">
              From Challenge to Impact
            </h2>
          </div>
          <p className="max-w-md text-[14px] text-[#6B5845] leading-relaxed">
            Every citizen observation moves through a transparent, institutional journey from local identification to verified statewide scaling.
          </p>
        </div>

        {/* ── DESKTOP CONNECTED VISUAL LIFECYCLE (5 Connected Nodes) ── */}
        <div className="hidden lg:block relative pt-4">
          {/* Continuous Journey Connecting Line */}
          <div className="absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-[#EEEAE1] z-0">
            <div className="h-full bg-gradient-to-r from-[#123B2A]/30 via-[#F5A623]/40 to-[#123B2A]/40 w-full" />
          </div>

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.num}
                  className="flex flex-col group transition-transform duration-200 hover:-translate-y-1"
                >
                  {/* Step Node Marker on Line */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative flex items-center justify-center">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-lg border-2 border-white shadow-sm ${step.accentBg} transition-colors group-hover:scale-110`}>
                        <Icon className="h-5 w-5 stroke-[2.2]" />
                      </div>
                      {/* Step Number Tag */}
                      <span className="absolute -top-2 -right-2 px-1.5 py-0.2 rounded bg-white text-[10px] font-mono font-extrabold text-[#1D2522] border border-[#EEEAE1] shadow-2xs">
                        {step.num}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex-1 p-5 rounded-xl border border-[#EEEAE1] bg-white group-hover:border-[#123B2A]/40 group-hover:shadow-sm transition-all flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-[16px] font-bold text-[#1D2522] tracking-tight">
                          {step.title}
                        </h3>
                        {idx < steps.length - 1 && (
                          <ChevronRight className="h-4 w-4 text-[#6B5845]/40" />
                        )}
                      </div>

                      <p className="text-[12.5px] text-[#1D2522]/75 leading-relaxed mt-2">
                        {step.desc}
                      </p>
                    </div>

                    {/* Actor Badge */}
                    <div className="pt-2 border-t border-[#EEEAE1] flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wide uppercase ${step.tagBg}`}>
                        {step.actor}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MOBILE / TABLET STACKED TIMELINE ── */}
        <div className="lg:hidden space-y-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.num}
                className="p-5 rounded-xl border border-[#EEEAE1] bg-white shadow-2xs flex flex-col space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${step.accentBg}`}>
                      <Icon className="h-5 w-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-[#6B5845] block">
                        Step {step.num}
                      </span>
                      <h3 className="text-[15px] font-bold text-[#1D2522] leading-none mt-0.5">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wide uppercase ${step.tagBg}`}>
                    {step.actor}
                  </span>
                </div>

                <p className="text-[13px] text-[#1D2522]/80 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

