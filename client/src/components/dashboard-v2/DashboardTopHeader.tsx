import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { DashboardRole } from '../../types/dashboard';
import {
  Search,
  Bell,
  Menu,
  UserCheck,
  Shield,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

interface DashboardTopHeaderProps {
  greeting: string;
  subtitle: string;
  currentRole: DashboardRole;
  onRoleChange?: (role: DashboardRole) => void;
  onOpenMobileMenu: () => void;
}

export function DashboardTopHeader({
  greeting,
  subtitle,
  currentRole,
  onOpenMobileMenu,
}: DashboardTopHeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const ROLES_LIST: Array<{
    id: DashboardRole;
    label: string;
    desc: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    {
      id: 'citizen',
      label: 'Citizen Innovator',
      desc: 'Personal ideas, grassroots problem reports & impact',
      icon: UserCheck,
    },
    {
      id: 'institution',
      label: 'University / R&D Cell',
      desc: 'Academic research challenges, consortia & patents',
      icon: GraduationCap,
    },
    {
      id: 'expert',
      label: 'Technical Reviewer',
      desc: 'Scientific audits, feasibility reviews & scorecards',
      icon: Sparkles,
    },
    {
      id: 'admin',
      label: 'State Mission Directorate',
      desc: 'State-level telemetry, district triage & policies',
      icon: Shield,
    },
  ];

  const activeRoleObj = ROLES_LIST.find((r) => r.id === currentRole) || ROLES_LIST[0];

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EEEAE1] text-left select-none">
      {/* ── Left Greeting & Purpose ── */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl bg-white border border-[#EEEAE1] text-[#123B2A] shrink-0"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="space-y-1">
          <h1 className="text-[1.75rem] sm:text-[2.1rem] font-extrabold text-[#1D2522] tracking-tight font-sans leading-tight">
            {greeting}
          </h1>
          <p className="text-[13.5px] text-[#6B5845] font-normal">{subtitle}</p>
        </div>
      </div>

      {/* ── Right Controls: Search, Notifications, Role Switcher, Avatar ── */}
      <div className="flex items-center gap-3 flex-wrap self-start md:self-auto">
        {/* Search Input */}
        <div className="relative hidden sm:block">
          <Search className="h-4 w-4 text-[#6B5845] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search challenges, ideas..."
            className="w-48 lg:w-60 h-10 pl-9 pr-3 rounded-2xl bg-white border border-[#EEEAE1] text-[12.5px] text-[#1D2522] placeholder:text-[#6B5845]/60 focus:outline-none focus:border-[#123B2A] transition-all shadow-2xs"
          />
        </div>

        {/* Notifications Popover Trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="h-10 w-10 rounded-2xl bg-white border border-[#EEEAE1] text-[#1D2522] hover:text-[#123B2A] flex items-center justify-center relative shadow-2xs hover:bg-[#FAF9F5] transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-[#BE123C] ring-2 ring-white" />
          </button>

          {/* Notifications Dropdown Preview */}
          {notificationsOpen && (
            <div className="absolute right-0 top-12 z-30 w-72 rounded-2xl bg-white p-4 shadow-xl border border-[#EEEAE1] space-y-2.5 text-left animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-2">
                <span className="text-[11px] font-mono font-bold uppercase text-[#123B2A]">
                  NOTIFICATIONS
                </span>
                <span className="text-[10.5px] font-mono text-[#BE123C] font-semibold">2 New</span>
              </div>
              <div className="space-y-2 text-[12px]">
                <div className="p-2 rounded-xl bg-[#FAF9F5] space-y-0.5">
                  <strong className="text-[#1D2522] block leading-tight">
                    Idea shortlisted for field pilot
                  </strong>
                  <span className="text-[10.5px] text-[#6B5845]">2 hours ago</span>
                </div>
                <div className="p-2 rounded-xl bg-[#FAF9F5] space-y-0.5">
                  <strong className="text-[#1D2522] block leading-tight">
                    Khunti District Admin accepted partnership
                  </strong>
                  <span className="text-[10.5px] text-[#6B5845]">Yesterday</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Authenticated Account Role Indicator (Strictly Read-Only) */}
        <div className="h-10 px-3.5 rounded-2xl bg-white border border-[#EEEAE1] flex items-center gap-2 text-[12px] font-mono font-bold text-[#123B2A] shadow-2xs select-none">
          <span className="h-2 w-2 rounded-full bg-[#15803D]" />
          <span>Role: {activeRoleObj.label}</span>
        </div>

        {/* User Profile Avatar Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="h-10 w-10 rounded-2xl bg-[#123B2A] text-[#F5A623] font-mono font-extrabold text-[13px] flex items-center justify-center shadow-xs hover:ring-2 hover:ring-[#123B2A]/30 transition-all cursor-pointer"
            aria-label="User profile menu"
          >
            {user?.name ? user.name.slice(0, 2).toUpperCase() : 'US'}
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl bg-white p-3 shadow-2xl border border-[#EEEAE1] text-left">
                <div className="border-b border-[#EEEAE1] pb-2.5 mb-2">
                  <div className="font-bold text-[13px] text-[#1D2522]">{user?.name}</div>
                  <div className="text-[11.5px] text-neutral-500 font-mono truncate">{user?.email}</div>
                  <div className="mt-1.5 inline-block text-[10px] font-bold uppercase tracking-wider bg-[#123B2A]/10 text-[#123B2A] px-2 py-0.5 rounded">
                    {user?.role || 'CITIZEN'}
                  </div>
                </div>

                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={async () => {
                      setProfileOpen(false);
                      await logout();
                      navigate('/login');
                    }}
                    className="w-full text-left px-2.5 py-1.5 text-[12.5px] font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
