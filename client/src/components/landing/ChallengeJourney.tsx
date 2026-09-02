import { Search, Cpu, Users, Wrench, Compass, ShieldCheck } from 'lucide-react';

export function ChallengeJourney() {
  const steps = [
    {
      num: '01',
      title: 'DISCOVER',
      subtitle: 'Citizen & Community',
      desc: 'Problems captured locally via voice, photo, and geolocation from blocks and panchayats.',
      actor: 'Local Citizen / PRI',
      icon: Search,
      accent: 'border-t-brand-purple',
    },
    {
      num: '02',
      title: 'STRUCTURE',
      subtitle: 'AI Intelligence',
      desc: 'AI synthesizes raw intake, flags duplicate incidents, and structures engineering problem briefs.',
      actor: 'AI Analysis Engine',
      icon: Cpu,
      accent: 'border-t-brand-coral',
    },
    {
      num: '03',
      title: 'MATCH',
      subtitle: 'Capability Graph',
      desc: 'Identifies matching university labs, faculty researchers, and industry commitments across the state.',
      actor: 'State Algorithm',
      icon: Compass,
      accent: 'border-t-brand-purple',
    },
    {
      num: '04',
      title: 'BUILD',
      subtitle: 'Consortium & Contract',
      desc: 'HEIs and MSMEs form a multidisciplinary consortium and sign a pre-agreed Impact Contract.',
      actor: 'University + Industry',
      icon: Wrench,
      accent: 'border-t-brand-coral',
    },
    {
      num: '05',
      title: 'PILOT',
      subtitle: 'Ground Deployment',
      desc: 'Hardware and software deployed in target blocks for real-world environmental and social testing.',
      actor: 'Field Pilot Team',
      icon: Users,
      accent: 'border-t-brand-purple',
    },
    {
      num: '06',
      title: 'IMPACT',
      subtitle: 'Verified Outcomes',
      desc: 'Independent measurements compare baseline against target metrics for policy adoption.',
      actor: 'Govt. Verification',
      icon: ShieldCheck,
      accent: 'border-t-status-success',
    },
  ];

  return (
    <section id="how-it-works" className="py-14 border-b border-neutral-200 bg-neutral-50 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b border-neutral-200 pb-5 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-caption font-mono uppercase tracking-widest text-brand-purple font-semibold">
              Closed-Loop Innovation Lifecycle
            </span>
            <h2 className="text-h2 font-bold text-neutral-900 tracking-tight mt-1">
              The Challenge-to-Impact Loop
            </h2>
          </div>
          <p className="max-w-md text-small text-neutral-600 leading-normal">
            From raw community observation to scalable state policy. Every stage is transparent,
            auditable, and grounded in field evidence.
          </p>
        </div>

        {/* ── DESKTOP HORIZONTAL CONNECTED JOURNEY (Hidden on small screens) ── */}
        <div className="hidden lg:block relative">
          {/* Continuous Baseline Track */}
          <div className="absolute top-[42px] left-8 right-8 h-0.5 bg-neutral-200 -z-0" />

          <div className="grid grid-cols-6 gap-3 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={step.num}
                  className={`border-t-[3px] ${step.accent} border-x border-b border-neutral-200 p-3.5 flex flex-col justify-between transition-colors ${
                    isEven ? 'bg-neutral-0' : 'bg-neutral-25'
                  }`}
                >
                  <div>
                    {/* Header with Icon and Sequential Number */}
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                      <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-brand-purple-subtle text-brand-purple">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-caption font-mono font-bold text-neutral-400">
                        {step.num}
                      </span>
                    </div>

                    {/* Step Title & Subtitle */}
                    <div className="mt-3">
                      <h3 className="text-small font-bold text-neutral-900 tracking-tight leading-tight">
                        {step.title}
                      </h3>
                      <div className="text-[11px] font-medium text-brand-purple mt-0.5">
                        {step.subtitle}
                      </div>
                      <p className="text-caption text-neutral-600 mt-2 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Actor Footer */}
                  <div className="mt-4 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                    <span className="text-neutral-400 font-medium">Actor:</span>
                    <span className="font-semibold text-neutral-800">{step.actor}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MOBILE VERTICAL PROGRESSION (Visible on small/tablet screens) ── */}
        <div className="lg:hidden relative pl-6 space-y-4 text-left">
          {/* Vertical Connecting Line */}
          <div className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-neutral-200" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.num} className="relative">
                {/* Numbered Indicator Node */}
                <div className="absolute -left-6 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-purple text-neutral-0 text-[10px] font-mono font-bold">
                  {step.num}
                </div>

                <div className="border border-neutral-200 bg-neutral-0 p-4 rounded-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-brand-purple" />
                      <h3 className="text-body-sm font-bold text-neutral-900">{step.title}</h3>
                    </div>
                    <span className="text-caption font-medium text-brand-purple bg-brand-purple-subtle px-1.5 py-0.5 rounded-sm">
                      {step.subtitle}
                    </span>
                  </div>
                  <p className="text-small text-neutral-600 mt-1.5 leading-normal">
                    {step.desc}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-neutral-100 text-caption text-neutral-500 flex justify-between">
                    <span>Key Actor:</span>
                    <strong className="text-neutral-800">{step.actor}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
