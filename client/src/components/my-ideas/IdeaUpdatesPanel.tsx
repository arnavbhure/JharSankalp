import { useNavigate } from 'react-router-dom';
import { Bell, ArrowRight, Radio } from 'lucide-react';

interface UpdateItem {
  id: string;
  text: string;
  time: string;
  link?: string;
}

interface IdeaUpdatesPanelProps {
  updates: UpdateItem[];
}

export function IdeaUpdatesPanel({ updates }: IdeaUpdatesPanelProps) {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 shadow-2xs space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <Bell className="h-3.5 w-3.5 text-[#F5A623]" />
          <span>UPDATES FOR YOU</span>
        </div>
        <span className="flex h-2 w-2 rounded-full bg-[#15803D]" />
      </div>

      <div className="space-y-3">
        {updates.map((up) => (
          <div
            key={up.id}
            onClick={() => up.link && navigate(up.link)}
            className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] hover:border-[#123B2A]/40 transition-colors cursor-pointer space-y-1 group"
          >
            <div className="flex items-center justify-between text-[10.5px] font-mono text-[#6B5845]">
              <span className="flex items-center gap-1 text-[#123B2A] font-semibold">
                <Radio className="h-2.5 w-2.5 text-[#F5A623]" />
                Notice
              </span>
              <span>{up.time}</span>
            </div>
            <p className="text-[13px] text-[#1D2522] leading-snug group-hover:text-[#123B2A] transition-colors">
              {up.text}
            </p>
          </div>
        ))}
      </div>

      <div className="pt-1 text-center">
        <button
          type="button"
          onClick={() => navigate('/my-ideas')}
          className="inline-flex items-center gap-1 text-[12.5px] font-bold text-[#123B2A] hover:underline cursor-pointer"
        >
          <span>View All Updates</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
