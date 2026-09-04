import { useState, useEffect } from 'react';
import { Bell, Check, Loader2, BellOff } from 'lucide-react';
import { api } from '../../services/api';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  category: 'system' | 'reviewer' | 'milestone' | 'team';
  read: boolean;
}

export function DashboardNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    api.get<any[]>('/activities')
      .then((res) => {
        if (!isMounted) return;
        const list = Array.isArray(res) ? res : (res as any)?.data || [];

        const mapped: NotificationItem[] = list.map((act: any, i: number) => {
          let category: NotificationItem['category'] = 'system';
          if (act.type?.includes('VERIF') || act.type?.includes('REVIEW')) category = 'reviewer';
          else if (act.type?.includes('PILOT') || act.type?.includes('MILESTONE')) category = 'milestone';
          else if (act.type?.includes('TEAM') || act.type?.includes('PARTNER')) category = 'team';

          return {
            id: act.id,
            title: act.type?.replace(/_/g, ' ') || 'Ecosystem Notification',
            desc: act.message || 'Civic innovation milestone logged in Jharkhand ledger',
            time: new Date(act.createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
            }),
            category,
            read: i > 2, // First 3 are unread
          };
        });

        setNotifications(mapped);
      })
      .catch((err) => {
        console.warn('Failed to load notifications from activities:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  };

  const filtered = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  return (
    <div className="space-y-6 text-left">
      {/* ── Subheader ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EEEAE1] pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-[12px] font-mono font-bold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-[#123B2A] text-white'
                : 'bg-white text-[#6B5845] border border-[#EEEAE1]'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('unread')}
            className={`px-3 py-1.5 rounded-xl text-[12px] font-mono font-bold transition-all cursor-pointer ${
              filter === 'unread'
                ? 'bg-[#123B2A] text-white'
                : 'bg-white text-[#6B5845] border border-[#EEEAE1]'
            }`}
          >
            Unread ({notifications.filter((n) => !n.read).length})
          </button>
        </div>

        <button
          type="button"
          onClick={markAllRead}
          className="text-[12px] font-bold text-[#123B2A] hover:underline cursor-pointer flex items-center gap-1"
        >
          <Check className="h-3.5 w-3.5 text-[#15803D]" />
          <span>Mark all as read</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center space-y-2">
          <Loader2 className="h-6 w-6 animate-spin text-[#123B2A]" />
          <span className="text-[13px] font-mono text-[#6B5845]">Loading notifications...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white border border-[#EEEAE1] p-8 space-y-3">
          <BellOff className="h-8 w-8 text-[#6B5845] mx-auto opacity-50" />
          <h3 className="text-[1.1rem] font-bold text-[#1D2522]">No notifications right now</h3>
          <p className="text-[13px] text-[#6B5845] max-w-sm mx-auto">
            You are completely caught up with ecosystem alerts and project reviews.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleRead(item.id)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex items-start gap-4 ${
                item.read
                  ? 'bg-white border-[#EEEAE1]'
                  : 'bg-[#FFFDF9] border-2 border-[#123B2A]/40 shadow-xs'
              }`}
            >
              <div className="h-9 w-9 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] flex items-center justify-center shrink-0 mt-0.5">
                <Bell className={`h-4 w-4 ${item.read ? 'text-[#6B5845]' : 'text-[#F5A623]'}`} />
              </div>

              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-[14px] font-bold text-[#1D2522]">{item.title}</h4>
                  <span className="text-[11px] font-mono text-[#6B5845] shrink-0">{item.time}</span>
                </div>
                <p className="text-[13px] text-[#6B5845] leading-relaxed">{item.desc}</p>
              </div>

              {!item.read && <span className="h-2.5 w-2.5 rounded-full bg-[#15803D] shrink-0 mt-2" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
