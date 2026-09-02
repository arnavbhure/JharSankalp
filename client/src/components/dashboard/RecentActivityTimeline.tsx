import { ActivityItem } from '../../types/citizenDashboard';
import { Clock, CheckCircle2, MessageSquare, Layers, FileCheck } from 'lucide-react';

interface RecentActivityTimelineProps {
  activities: ActivityItem[];
}

export function RecentActivityTimeline({ activities }: RecentActivityTimelineProps) {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'review':
        return <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" />;
      case 'request':
        return <MessageSquare className="h-3.5 w-3.5 text-[#B45309]" />;
      case 'categorization':
        return <Layers className="h-3.5 w-3.5 text-[#123B2A]" />;
      case 'submission':
      default:
        return <FileCheck className="h-3.5 w-3.5 text-[#0284C7]" />;
    }
  };

  return (
    <div className="rounded-2xl border border-[#EEEAE1] bg-white p-5 sm:p-6 text-left shadow-2xs space-y-4">
      <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#123B2A]" />
          <h3 className="text-[14px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            Recent Updates & Audit Trail
          </h3>
        </div>
        <span className="text-[11.5px] font-mono text-[#6B5845]">Live Feed</span>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-[#EEEAE1]">
        {activities.map((act) => (
          <div key={act.id} className="relative group">
            {/* Timeline node */}
            <div className="absolute -left-6 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white border border-[#EEEAE1] shadow-2xs group-hover:border-[#123B2A] transition-colors">
              {getActivityIcon(act.type)}
            </div>

            {/* Timeframe Tag */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold text-[#123B2A] uppercase tracking-wider bg-[#F8F6F1] px-2 py-0.5 rounded border border-[#EEEAE1]">
                {act.timeframeLabel}
              </span>
              <span className="text-[11px] font-mono text-[#6B5845]">
                {act.dateStr}
              </span>
            </div>

            {/* Narrative text */}
            <p className="text-[13px] text-[#1D2522] leading-relaxed font-medium">
              {act.text}
            </p>

            {/* Associated Challenge Link */}
            <div className="text-[11.5px] text-[#6B5845] mt-1">
              Target:{' '}
              <span className="font-semibold text-[#123B2A]">
                {act.challengeTitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
