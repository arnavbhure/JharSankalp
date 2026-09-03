import { Clock, MapPin, CheckCircle2, Rocket, Award, Sparkles } from 'lucide-react';
import { ImpactFeedItem } from '../../types/impact';

interface RecentImpactFeedProps {
  items: ImpactFeedItem[];
}

export function RecentImpactFeed({ items }: RecentImpactFeedProps) {
  const getTypeIcon = (type: ImpactFeedItem['type']) => {
    switch (type) {
      case 'expansion':
        return <CheckCircle2 className="h-4 w-4 text-[#15803D]" />;
      case 'testing':
        return <Rocket className="h-4 w-4 text-[#0284C7]" />;
      case 'deployment':
        return <Award className="h-4 w-4 text-[#F5A623]" />;
      case 'milestone':
        return <Sparkles className="h-4 w-4 text-[#B45309]" />;
      default:
        return <Clock className="h-4 w-4 text-[#123B2A]" />;
    }
  };

  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 text-left space-y-5">
      <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            LIVE PROGRESSION
          </span>
          <h3 className="text-[1.25rem] font-bold text-[#1D2522]">
            Recent Progress Across Jharkhand
          </h3>
        </div>
        <span className="text-[11px] font-mono text-[#15803D] font-bold flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#15803D] animate-pulse" />
          Realtime Audit
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] hover:border-[#123B2A]/20 transition-colors"
          >
            <div className="h-9 w-9 rounded-xl bg-white border border-[#EEEAE1] flex items-center justify-center shrink-0 mt-0.5">
              {getTypeIcon(item.type)}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-[11px] font-mono font-bold text-[#15803D]">
                  {item.dateText}
                </span>
                <span className="text-[10.5px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white text-[#123B2A] border border-[#EEEAE1]">
                  {item.stage}
                </span>
              </div>

              <div className="text-[13.5px] font-semibold text-[#1D2522] leading-snug">
                {item.title}
              </div>

              <div className="flex items-center gap-3 text-[11px] font-mono text-[#6B5845] pt-0.5">
                <span className="flex items-center gap-1 text-[#BE123C]">
                  <MapPin className="h-3 w-3" />
                  {item.district}
                </span>
                <span>·</span>
                <span className="font-semibold text-[#123B2A]">{item.domain}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
