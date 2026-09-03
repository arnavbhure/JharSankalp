import { CitizenNotification } from '../../types/citizenDashboard';
import { Bell, ArrowRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NotificationPreviewProps {
  notifications: CitizenNotification[];
}

export function NotificationPreview({ notifications }: NotificationPreviewProps) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-[#EEEAE1] bg-white p-5 sm:p-6 text-left shadow-2xs space-y-4">
      <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-[#F5A623]" />
          <h3 className="text-[14px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            Updates For You
          </h3>
        </div>
        <span className="flex h-2 w-2 rounded-full bg-[#BE123C]" />
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => n.challengeId && navigate(`/challenges/${n.challengeId}`)}
            className="p-3 rounded-xl border border-[#EEEAE1] bg-[#FAF9F5] hover:bg-white transition-colors cursor-pointer space-y-1 group"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-[13px] font-semibold text-[#1D2522] leading-snug group-hover:text-[#123B2A] transition-colors">
                {n.title}
              </p>
              {n.challengeId && <ExternalLink className="h-3 w-3 text-[#6B5845] shrink-0 mt-0.5" />}
            </div>
            <span className="text-[11px] font-mono text-[#6B5845] block">{n.timeAgo}</span>
          </div>
        ))}
      </div>

      <div className="pt-1 border-t border-[#EEEAE1]">
        <button
          type="button"
          onClick={() => navigate('/challenges')}
          className="w-full inline-flex items-center justify-center gap-1.5 text-[12.5px] font-bold text-[#123B2A] hover:underline cursor-pointer"
        >
          <span>View All Platform Notices</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
