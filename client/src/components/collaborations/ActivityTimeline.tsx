import { Clock, UserCheck, FileText, CheckCircle2, Award } from 'lucide-react';
import { ActivityItem } from '../../types/collaborations';

interface ActivityTimelineProps {
  activities: ActivityItem[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'member':
        return <UserCheck className="h-3.5 w-3.5 text-[#15803D]" />;
      case 'testing':
        return <CheckCircle2 className="h-3.5 w-3.5 text-[#0284C7]" />;
      case 'document':
        return <FileText className="h-3.5 w-3.5 text-[#B45309]" />;
      case 'milestone':
        return <Award className="h-3.5 w-3.5 text-[#F5A623]" />;
      default:
        return <Clock className="h-3.5 w-3.5 text-[#123B2A]" />;
    }
  };

  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 text-left space-y-5">
      <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            LIVE PROGRESSION FEED
          </span>
          <h3 className="text-[1.25rem] font-bold text-[#1D2522]">
            Collaboration Activity
          </h3>
        </div>
        <span className="text-[11px] font-mono text-[#15803D] font-bold flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#15803D] animate-pulse" />
          Realtime Feed
        </span>
      </div>

      <div className="space-y-3">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] hover:border-[#123B2A]/20 transition-colors"
          >
            <div className="h-8 w-8 rounded-xl bg-white border border-[#EEEAE1] flex items-center justify-center shrink-0 mt-0.5">
              {getActivityIcon(act.type)}
            </div>

            <div className="flex-1 space-y-1">
              <div className="text-[13px] text-[#1D2522] leading-snug">
                <strong className="font-bold text-[#123B2A]">{act.actor}</strong>{' '}
                <span className="text-[#6B5845]">{act.action}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#6B5845]">
                <span className="font-semibold text-[#123B2A]">{act.project}</span>
                <span>·</span>
                <span>{act.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
