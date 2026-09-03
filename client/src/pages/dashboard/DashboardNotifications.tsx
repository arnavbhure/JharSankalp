import { useState } from 'react';
import { Bell, Check } from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  category: 'system' | 'reviewer' | 'milestone' | 'team';
  read: boolean;
}

const INITIAL_NOTIFS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Your idea was shortlisted for Murhu Field Pilot',
    desc: 'BIT Mesra and DWSD District evaluation committee approved the acoustic vibration collar proposal for 20 village sites.',
    time: '2 hours ago',
    category: 'reviewer',
    read: false,
  },
  {
    id: 'n-2',
    title: 'Khunti District Admin accepted consortium MOU',
    desc: 'BDO Murhu office authorized field technicians to coordinate with your hardware deployment schedule.',
    time: 'Yesterday',
    category: 'milestone',
    read: false,
  },
  {
    id: 'n-3',
    title: 'New comment on your challenge submission',
    desc: 'Dr. Ramesh Soren posted a review question regarding sensor casing waterproofing against monsoon water inundation.',
    time: '3 days ago',
    category: 'reviewer',
    read: true,
  },
  {
    id: 'n-4',
    title: 'System Security Verification Confirmed',
    desc: 'Your Citizen Innovator identity credentials have been cryptographically verified by Jharkhand e-Governance.',
    time: '1 week ago',
    category: 'system',
    read: true,
  },
];

export function DashboardNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

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

      {/* ── Notifications List ── */}
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
    </div>
  );
}
