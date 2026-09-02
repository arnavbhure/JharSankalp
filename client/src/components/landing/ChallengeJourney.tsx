import { Search, Cpu, Compass, Wrench, Users, ShieldCheck } from 'lucide-react';

export function ChallengeJourney() {
  const steps = [
    {
      num: '01',
      title: 'DISCOVER',
      subtitle: 'Citizen & Community',
      desc: 'Problems captured locally via voice, photo, and geolocation from blocks and panchayats.',
      actor: 'Local Citizen / PRI',
      icon: Search,
      bg: 'bg-brand-apricot',
      text: 'text-neutral-900',
      iconBg: 'bg-brand-purple text-brand-apricot',
      badgeClass: 'bg-brand-purple/10 text-brand-purple border-brand-purple/20 font-bold',
    },
    {
      num: '02',
      title: 'STRUCTURE',
      subtitle: 'AI Intelligence',
      desc: 'AI synthesizes raw intake, flags duplicate incidents, and structures engineering problem briefs.',
      actor: 'AI Analysis Engine',
      icon: Cpu,
      bg: 'bg-brand-purple',
      text: 'text-neutral-0',
      iconBg: 'bg-brand-coral text-white',
      badgeClass: 'bg-brand-coral/20 text-brand-coral border-brand-coral/30 font-bold',
    },
    {
      num: '03',
      title: 'MATCH',
      subtitle: 'Capability Graph',
      desc: 'Matches challenge needs with certified university labs, faculty expertise, and corporate resources.',
      actor: 'State Algorithm',
      icon: Compass,
      bg: 'bg-brand-khaki',
      text: 'text-neutral-900',
      iconBg: 'bg-neutral-900 text-brand-khaki',
      badgeClass: 'bg-neutral-900/15 text-neutral-900 border-neutral-900/20 font-bold',
    },
    {
      num: '04',
      title: 'BUILD',
      subtitle: 'Consortium & Contract',
      desc: 'HEIs and MSMEs form a collaborative consortium and sign a binding Impact Contract.',
      actor: 'University + Industry',
      icon: Wrench,
      bg: 'bg-brand-coral',
      text: 'text-white',
      iconBg: 'bg-white text-brand-coral',
      badgeClass: 'bg-white/20 text-white border-white/30 font-bold',
    },
    {
      num: '05',
      title: 'PILOT',
      subtitle: 'Ground Deployment',
      desc: 'Hardware and software deployed in target blocks for real-world environmental and social testing.',
      actor: 'Field Pilot Team',
      icon: Users,
      bg: 'bg-emerald-700',
      text: 'text-white',
      iconBg: 'bg-white text-emerald-800',
      badgeClass: 'bg-white/20 text-white border-white/30 font-bold',
    },
    {
      num: '06',
      title: 'IMPACT',
      subtitle: 'Verified Outcomes',
      desc: 'Independent measurements compare baseline against target metrics for policy adoption.',
      actor: 'Govt. Verification',
      icon: ShieldCheck,
      bg: 'bg-brand-purple-hover',
      text: 'text-neutral-0',
      iconBg: 'bg-brand-apricot text-brand-purple',
      badgeClass: 'bg-brand-apricot/20 text-brand-apricot border-brand-apricot/30 font-bold',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 border-b border-neutral-200 bg-neutral-50 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b border-neutral-200 pb-5 mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-brand-purple font-bold">
              <span className="h-2 w-2 rounded-full bg-brand-coral" />
              Closed-Loop Innovation Lifecycle
            </span>
            <h2 className="text-h2 sm:text-[2.25rem] font-bold text-neutral-900 tracking-tight mt-1">
              The Challenge-to-Impact Loop
            </h2>
          </div>
          <p className="max-w-md text-small text-neutral-600 leading-normal">
            From raw community observation to scalable state policy. Every stage is transparent,
            auditable, and grounded in field evidence.
          </p>
        </div>

        {/* ── DESKTOP HORIZONTAL CONNECTED JOURNEY ── */}
        <div className="hidden xl:block relative">
          {/* Continuous Connected Pipe Track */}
          <div className="absolute top-1/2 left-4 right-4 h-1.5 bg-gradient-to-r from-brand-apricot via-brand-purple via-brand-coral to-emerald-600 -translate-y-1/2 z-0 rounded-full opacity-60" />

          <div className="grid grid-cols-6 gap-3 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isShifted = idx % 2 === 1;

              return (
                <div
                  key={step.num}
                  className={`p-4 rounded-sm border-2 border-neutral-200 shadow-medium flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                    step.bg
                  } ${step.text} ${isShifted ? 'translate-y-3' : '-translate-y-2'}`}
                >
                  <div>
                    {/* Header with Icon and Stage Number */}
                    <div className="flex items-center justify-between pb-3 border-b border-current/20">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-sm shadow-sm ${step.iconBg}`}>
                        <Icon className="h-5 w-5 stroke-[2.2]" />
                      </div>
                      <span className="text-body font-mono font-extrabold tracking-tight opacity-90">
                        {step.num}
                      </span>
                    </div>

                    {/* Step Title & Subtitle */}
                    <div className="mt-3">
                      <h3 className="text-body-sm font-extrabold tracking-tight leading-tight uppercase">
                        {step.title}
                      </h3>
                      <div className="text-[11px] font-bold mt-0.5 opacity-90">
                        {step.subtitle}
                      </div>
                      <p className="text-caption mt-2 leading-relaxed opacity-85 line-clamp-4">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Actor Pill Badge */}
                  <div className="mt-4 pt-2.5 border-t border-current/20 flex items-center justify-between">
                    <span className={`text-[10px] px-2 py-0.5 rounded-pill border uppercase tracking-wider ${step.badgeClass}`}>
                      {step.actor}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── TABLET / MOBILE PROGRESSION ── */}
        <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.num}
                className={`p-5 rounded-sm border-2 border-neutral-200 shadow-subtle flex flex-col justify-between space-y-3 ${step.bg} ${step.text}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-sm shadow-sm ${step.iconBg}`}>
                      <Icon className="h-4.5 w-4.5 stroke-[2]" />
                    </div>
                    <div>
                      <span className="text-caption font-mono font-extrabold opacity-80">{step.num}</span>
                      <h3 className="text-body-sm font-bold leading-tight">{step.title}</h3>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-pill border uppercase tracking-wider ${step.badgeClass}`}>
                    {step.actor}
                  </span>
                </div>

                <p className="text-small opacity-90 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
