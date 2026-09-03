import { DashboardMetricCard } from '../../types/dashboard';
import {
  Lightbulb,
  Zap,
  Trophy,
  Rocket,
  Building2,
  Clock,
  FileText,
  ShieldCheck,
  Users,
} from 'lucide-react';

interface MetricCardsGroupProps {
  metrics: DashboardMetricCard[];
}

export function MetricCardsGroup({ metrics }: MetricCardsGroupProps) {
  const getIcon = (iconName: string, colorClass: string) => {
    const props = { className: `h-5 w-5 ${colorClass}` };
    switch (iconName) {
      case 'Lightbulb':
        return <Lightbulb {...props} />;
      case 'Zap':
        return <Zap {...props} />;
      case 'Trophy':
        return <Trophy {...props} />;
      case 'Rocket':
        return <Rocket {...props} />;
      case 'Building2':
        return <Building2 {...props} />;
      case 'Clock':
        return <Clock {...props} />;
      case 'FileText':
        return <FileText {...props} />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
      case 'Users':
      default:
        return <Users {...props} />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 h-full">
      {metrics.map((card) => (
        <div
          key={card.id}
          className={`p-5 rounded-3xl border ${card.borderTint} ${card.bgTint} hover:shadow-2xs transition-all flex flex-col justify-between text-left space-y-3 group`}
        >
          {/* Top Row: Icon + Label */}
          <div className="flex items-center justify-between">
            <div className="h-9 w-9 rounded-2xl bg-white/80 border border-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
              {getIcon(card.icon, card.iconColor)}
            </div>

            {card.change && (
              <span className="text-[10.5px] font-mono font-bold text-[#6B5845] bg-white/60 px-2 py-0.5 rounded-md border border-white/60">
                {card.change}
              </span>
            )}
          </div>

          {/* Main Stat & Label */}
          <div className="space-y-0.5">
            <div className="text-[2rem] sm:text-[2.3rem] font-extrabold font-mono text-[#1D2522] leading-none">
              {card.value}
            </div>
            <span className="text-[13px] font-bold text-[#1D2522] block font-sans">
              {card.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
