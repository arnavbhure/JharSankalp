import { PortfolioActivityItem } from '../../types/projects';
import { Clock, Radio, CheckCircle2, UserPlus, Cpu, Rocket } from 'lucide-react';

interface PortfolioActivityTimelineProps {
  activities: PortfolioActivityItem[];
}

export function PortfolioActivityTimeline({ activities }: PortfolioActivityTimelineProps) {
  const getIcon = (type: PortfolioActivityItem['type']) => {
    switch (type) {
      case 'pilot':
        return <Radio className="h-3.5 w-3.5 text-[#15803D]" />;
      case 'verification':
        return <CheckCircle2 className="h-3.5 w-3.5 text-[#0284C7]" />;
      case 'partner':
        return <UserPlus className="h-3.5 w-3.5 text-[#F5A623]" />;
      case 'prototype':
        return <Cpu className="h-3.5 w-3.5 text-[#7E22CE]" />;
      case 'formation':
      default:
        return <Rocket className="h-3.5 w-3.5 text-[#123B2A]" />;
    }
  };

  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-6 text-left">
      <div className="border-b border-[#EEEAE1] pb-3 flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <Clock className="h-4 w-4 text-[#F5A623]" />
            <span>LIVE CONSORTIUM PULSE</span>
          </div>
          <h3 className="text-[1.6rem] sm:text-[1.85rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Portfolio activity
          </h3>
        </div>

        <span className="text-[12px] font-mono text-[#6B5845]">Updated Real-time</span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-[#EEEAE1]">
        {activities.map((item) => (
          <div key={item.id} className="relative group">
            {/* Dot / Icon */}
            <div className="absolute -left-6 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white border border-[#EEEAE1] shadow-2xs">
              {getIcon(item.type)}
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
                  {item.timestamp}
                </span>
                {item.projectTitle && (
                  <>
                    <span className="text-[#6B5845]/40">·</span>
                    <span className="text-[11px] font-mono text-[#123B2A] font-semibold">
                      {item.projectTitle}
                    </span>
                  </>
                )}
              </div>

              <h4 className="text-[14px] font-bold text-[#1D2522]">{item.title}</h4>

              <p className="text-[13px] text-[#6B5845] leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
