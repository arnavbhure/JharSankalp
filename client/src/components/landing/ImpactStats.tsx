import { Compass, Layers, Users, ShieldCheck } from 'lucide-react';

export function ImpactStats() {
  const cards = [
    {
      number: '24',
      label: 'DISTRICTS CONNECTED',
      description:
        'From Khunti to Sahebganj, integrating remote Gram Panchayats with district administrations.',
      bgClass: 'bg-brand-purple-hover text-neutral-0 border-brand-purple-border/60',
      numColor: 'text-brand-apricot',
      icon: Compass,
      tag: 'Statewide Coverage',
      tagClass: 'bg-brand-apricot/20 text-brand-apricot border-brand-apricot/30',
    },
    {
      number: '15+',
      label: 'INNOVATION DOMAINS',
      description:
        'Water resources, agriculture, mining safety, solar microgrids, and rural healthcare.',
      bgClass: 'bg-brand-apricot text-neutral-900 border-brand-apricot-border',
      numColor: 'text-brand-purple',
      icon: Layers,
      tag: 'Capability Graph',
      tagClass: 'bg-brand-purple/15 text-brand-purple border-brand-purple/20 font-bold',
    },
    {
      number: '4',
      label: 'ECOSYSTEM FORCES',
      description:
        'Citizens, State Government, Universities/HEIs, and Industry/MSMEs working in locked consortia.',
      bgClass: 'bg-brand-khaki text-neutral-900 border-brand-khaki-border',
      numColor: 'text-neutral-900',
      icon: Users,
      tag: 'Quadruple Helix',
      tagClass: 'bg-neutral-0/70 text-neutral-900 border-neutral-0/40 font-bold',
    },
    {
      number: '100%',
      label: 'VERIFIED IMPACT',
      description:
        'Zero unverified impact claims. Every solution mathematically benchmarked against baseline field data.',
      bgClass: 'bg-brand-coral text-neutral-0 border-brand-coral-hover',
      numColor: 'text-white',
      icon: ShieldCheck,
      tag: 'Ground Audited',
      tagClass: 'bg-white/20 text-white border-white/30 font-bold',
    },
  ];

  return (
    <section className="bg-brand-purple text-neutral-0 border-y-2 border-brand-purple-hover py-14 lg:py-18 relative overflow-hidden">
      {/* Background Subtle Geometric Grid Accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(#FEE1C7_1.5px,transparent_1.5px)] [background-size:32px_32px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-brand-purple-border/50 pb-6 mb-10 gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-brand-apricot font-bold">
              <span className="h-2 w-2 rounded-full bg-brand-coral" />
              State Innovation Intelligence Dashboard
            </span>
            <h2 className="text-h1 sm:text-[2.75rem] font-bold text-neutral-0 tracking-tight leading-tight">
              Jharkhand&apos;s challenges are connected.
            </h2>
          </div>
          <p className="max-w-md text-small text-brand-apricot/85 leading-relaxed">
            By shifting from isolated departmental grievances to an integrated exchange, local
            societal problems become capability-matched statewide innovation missions.
          </p>
        </div>

        {/* ── Saturated Metric Cards (Inspired by Reference Dashboard) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-sm border-2 shadow-medium flex flex-col justify-between space-y-5 transition-transform hover:-translate-y-1 duration-200 ${card.bgClass}`}
              >
                {/* Top: Icon + Pill Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-neutral-0/20 backdrop-blur-none">
                    <Icon className="h-5 w-5 stroke-[2.2]" />
                  </div>
                  <span
                    className={`text-[11px] font-mono uppercase px-2 py-0.5 rounded-pill border ${card.tagClass}`}
                  >
                    {card.tag}
                  </span>
                </div>

                {/* Center: Large Bold Typography */}
                <div>
                  <div
                    className={`text-[3.25rem] sm:text-[3.75rem] font-extrabold font-mono tracking-tight leading-none ${card.numColor}`}
                  >
                    {card.number}
                  </div>
                  <div className="text-body-sm font-bold tracking-wider uppercase mt-2 opacity-95">
                    {card.label}
                  </div>
                </div>

                {/* Bottom: Contextual Detail */}
                <p className="text-caption leading-relaxed border-t border-current/20 pt-3 opacity-90">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
