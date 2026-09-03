import { DashboardActivityItem } from '../../types/dashboard';
import {
  Sparkles,
  MessageSquare,
  Award,
  Rocket,
  CheckCircle2,
} from 'lucide-react';

interface RecentActivitySectionProps {
  activities: DashboardActivityItem[];
}

export function RecentActivitySection({
  activities,
}: RecentActivitySectionProps) {
  const getActivityIcon = (type: DashboardActivityItem['type']) => {
    switch (type) {
      case 'shortlist':
        return <Sparkles className="h-3.5 w-3.5 text-[#15803D]" />;
      case 'comment':
        return <MessageSquare className="h-3.5 w-3.5 text-[#0284C7]" />;
      case 'badge':
        return <Award className="h-3.5 w-3.5 text-[#F5A623]" />;
      case 'pilot':
        return <Rocket className="h-3.5 w-3.5 text-[#7E22CE]" />;
      case 'evaluation':
      default:
        return <CheckCircle2 className="h-3.5 w-3.5 text-[#123B2A]" />;
    }
  };

  return (
    <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-7 shadow-2xs space-y-4 text-left">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          CHRONOLOGICAL DISPATCH
        </span>
        <span className="text-[11px] font-mono text-[#6B5845]">
          Live Updates
        </span>
      </div>

      <h2 className="text-[1.35rem] sm:text-[1.5rem] font-extrabold text-[#1D2522] font-sans">
        Recent Activity
      </h2>

      {/* Timeline Items */}
      <div className="space-y-3.5 pt-1">
        {activities.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-2xl hover:bg-[#FAF9F5] transition-colors -mx-2"
          >
            <div className="h-8 w-8 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              {getActivityIcon(item.type)}
            </div>

            <div className="space-y-0.5 min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13px] font-bold text-[#1D2522] leading-snug">
                  {item.title}
                </span>
                <span className="text-[10.5px] font-mono text-[#6B5845] shrink-0">
                  {item.timestamp}
                </span>
              </div>

              <p className="text-[12px] text-[#6B5845] truncate">
                {item.target}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
