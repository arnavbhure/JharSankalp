export function ImpactStats() {
  const stats = [
    {
      number: '24',
      label: 'Administrative Districts',
      detail: 'From Khunti to Sahebganj, connecting urban ULBs and remote Gram Panchayats.',
    },
    {
      number: '15+',
      label: 'Innovation Domains',
      detail: 'Water, Agriculture, Mining Safety, Clean Energy, Healthcare & Rural Livelihoods.',
    },
    {
      number: '4',
      label: 'Ecosystem Forces',
      detail: 'Citizens, State Authorities, Higher Education Institutions, and Industry Partners.',
    },
    {
      number: '1',
      label: 'Shared State Mission',
      detail: 'Zero unverified impact claims. Every solution grounded in measurable baseline data.',
    },
  ];

  return (
    <section className="bg-brand-purple text-neutral-0 border-y border-brand-purple-hover py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
        {/* Editorial Section Lead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-purple-border/40 pb-6 mb-10 gap-4">
          <div>
            <span className="text-caption font-mono uppercase tracking-widest text-brand-apricot font-semibold">
              State-Scale Coordination
            </span>
            <h2 className="text-h1 font-bold text-neutral-0 tracking-tight mt-1">
              Jharkhand&apos;s challenges are connected.
            </h2>
          </div>
          <p className="max-w-md text-small text-brand-apricot/80 leading-relaxed">
            By shifting from isolated departmental grievances to an integrated innovation exchange,
            local observations become capability-matched statewide missions.
          </p>
        </div>

        {/* Large Editorial Metric Columns (Not generic KPI cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="relative space-y-2 text-left">
              {/* Vertical Subtle Khaki Accent Rule */}
              <div className="h-1 w-8 bg-brand-khaki mb-4" />
              <div className="text-[3rem] sm:text-[3.5rem] font-bold text-neutral-0 tracking-tight leading-none font-mono">
                {stat.number}
              </div>
              <h3 className="text-body font-semibold text-brand-apricot tracking-tight">
                {stat.label}
              </h3>
              <p className="text-caption text-neutral-0/70 leading-normal pt-1">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
