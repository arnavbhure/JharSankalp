import { Users, UserCheck, Lightbulb, Handshake } from 'lucide-react';

export function StatsStrip() {
  const stats = [
    {
      number: '250+',
      label: 'Challenges',
      icon: Users,
      iconBg: 'bg-[#123B2A]/10 text-[#123B2A]',
    },
    {
      number: '1.2K+',
      label: 'Problem Solvers',
      icon: UserCheck,
      iconBg: 'bg-[#F5A623]/15 text-[#9E6200]',
    },
    {
      number: '320+',
      label: 'Solutions',
      icon: Lightbulb,
      iconBg: 'bg-[#1F5A3D]/10 text-[#1F5A3D]',
    },
    {
      number: '50+',
      label: 'Partners',
      icon: Handshake,
      iconBg: 'bg-[#6B5845]/10 text-[#6B5845]',
    },
  ];

  return (
    <div className="relative -mt-7 z-30 mx-auto max-w-5xl px-4 sm:px-6">
      <div className="rounded-xl border border-[#EEEAE1] bg-white p-4 sm:p-5 shadow-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-[#EEEAE1]">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3.5 pt-4 lg:pt-0 ${idx > 0 ? 'lg:pl-6' : ''}`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${stat.iconBg}`}
                >
                  <Icon className="h-5 w-5 stroke-[2]" />
                </div>
                <div className="text-left">
                  <div className="text-[1.65rem] font-extrabold font-mono text-[#1D2522] leading-none tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-[12.5px] font-medium text-[#6B5845] mt-1">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
