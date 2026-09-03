import { IdeaActivityItem } from '../../types/myIdeas';
import { Clock, CheckCircle2, UserPlus, Eye, Send, Sparkles } from 'lucide-react';

interface IdeaActivityTimelineProps {
  activities: IdeaActivityItem[];
}

export function IdeaActivityTimeline({ activities }: IdeaActivityTimelineProps) {
  const getIcon = (type: IdeaActivityItem['type']) => {
    switch (type) {
      case 'request':
        return <UserPlus className="h-3.5 w-3.5 text-[#123B2A]" />;
      case 'view':
        return <Eye className="h-3.5 w-3.5 text-[#0284C7]" />;
      case 'publish':
        return <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />;
      case 'review':
        return <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" />;
      case 'submission':
      default:
        return <Send className="h-3.5 w-3.5 text-[#7E22CE]" />;
    }
  };

  return (
    <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 shadow-2xs space-y-5 text-left">
      <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <Clock className="h-3.5 w-3.5 text-[#F5A623]" />
          <span>RECENT COLLABORATION ACTIVITY</span>
        </div>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-[#EEEAE1]">
        {activities.map((act) => (
          <div key={act.id} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-6 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white border border-[#EEEAE1] shadow-2xs">
              {getIcon(act.type)}
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
                {act.timestamp}
              </span>
              <h4 className="text-[13.5px] font-bold text-[#1D2522]">
                {act.title}
              </h4>
              <p className="text-[12.5px] text-[#6B5845] leading-relaxed">
                {act.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
