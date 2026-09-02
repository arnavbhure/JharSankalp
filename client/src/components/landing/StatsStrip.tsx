import { Users, UserCheck, Lightbulb, Handshake } from 'lucide-react';

export function StatsStrip() {
  const stats = [
    {
      number: '250+',
      label: 'Challenges',
      icon: Users,
      iconBg: 'bg-[#EBF5ED] text-[#163D2B]',
    },
    {
      number: '1.2K+',
      label: 'Problem Solvers',
      icon: UserCheck,
      iconBg: 'bg-[#FEF6E9] text-[#F5A623]',
    },
    {
      number: '320+',
      label: 'Solutions',
      icon: Lightbulb,
      iconBg: 'bg-[#EAF5F8] text-[#0D9488]',
    },
    {
      number: '50+',
      label: 'Partners',
      icon: Handshake,
      iconBg: 'bg-[#FFF1EE] text-[#FA7E61]',
    },
  ];

  return (
    <div className="relative -mt-8 z-30 mx-auto max-w-5xl px-4 sm:px-6">
      <div className="rounded-2xl border border-neutral-200/90 bg-white p-4 sm:p-6 shadow-lg">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3.5 pt-4 lg:pt-0 ${
                  idx > 0 ? 'lg:pl-6' : ''
                }`}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${stat.iconBg}`}
                >
                  <Icon className="h-6 w-6 stroke-[2]" />
                </div>
                <div className="text-left">
                  <div className="text-[1.75rem] font-extrabold font-mono text-neutral-900 leading-none">
                    {stat.number}
                  </div>
                  <div className="text-[13px] font-semibold text-neutral-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
