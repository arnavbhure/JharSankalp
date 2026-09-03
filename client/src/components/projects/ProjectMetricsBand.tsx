import { PortfolioMetrics } from '../../types/projects';

interface ProjectMetricsBandProps {
  metrics: PortfolioMetrics;
}

export function ProjectMetricsBand({ metrics }: ProjectMetricsBandProps) {
  const items = [
    {
      value: metrics.activeProjects.toString(),
      label: 'Active Projects',
      detail: 'Across 6 Innovation Stages',
    },
    {
      value: metrics.universitiesEngaged.toString(),
      label: 'Universities Engaged',
      detail: 'BIT Mesra, IIT ISM, BAU, NIT',
    },
    {
      value: metrics.partnersCount.toString(),
      label: 'Industry & Partners',
      detail: 'Startups, MSMEs & Labs',
    },
    {
      value: metrics.districtsReached.toString(),
      label: 'Districts Reached',
      detail: 'Ground Field Deployments',
    },
    {
      value: metrics.peopleImpacted,
      label: 'People Potentially Impacted',
      detail: 'Verified Community Beneficiaries',
      highlight: true,
    },
  ];

  return (
    <section className="bg-[#4C1E4F] text-white border-y border-[#3A143D] relative overflow-hidden py-10 sm:py-12 text-left">
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#FA7E61]/10 blur-3xl pointer-events-none"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
        {/* Subtle Prototype Label */}
        <div className="flex items-center justify-between text-[10.5px] font-mono tracking-widest uppercase text-[#FEE1C7]/70 border-b border-white/10 pb-3">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FA7E61]" />
            JHARSANKALP PORTFOLIO METRICS AT A GLANCE
          </span>
          <span className="bg-white/10 px-2.5 py-0.5 rounded text-[10px]">
            DEMO PORTFOLIO DATA
          </span>
        </div>

        {/* Large Editorial Metrics in Horizontal Structure */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-0 lg:divide-x lg:divide-white/15 pt-2">
          {items.map((item, idx) => (
            <div
              key={item.label}
              className={`space-y-1.5 ${
                idx !== 0 ? 'lg:pl-8' : ''
              } ${idx !== items.length - 1 ? 'lg:pr-8' : ''}`}
            >
              <div
                className={`text-[2.6rem] sm:text-[3.2rem] font-extrabold tracking-tight font-sans leading-none ${
                  item.highlight ? 'text-[#FA7E61]' : 'text-white'
                }`}
              >
                {item.value}
              </div>

              <div className="text-[14px] sm:text-[15px] font-bold text-[#FEE1C7] leading-snug">
                {item.label}
              </div>

              <div className="text-[11.5px] font-mono text-[#FEE1C7]/60 leading-tight">
                {item.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
