import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { DashboardRole } from '../../types/dashboard';
import {
  LayoutDashboard,
  Zap,
  Lightbulb,
  CheckCircle2,
  Users,
  Bell,
  Award,
  Settings,
  LogOut,
  X,
  GraduationCap,
  Sparkles,
  Shield,
} from 'lucide-react';

interface DashboardSidebarProps {
  currentRole: DashboardRole;
  userName: string;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function DashboardSidebar({
  currentRole,
  userName,
  isOpenMobile = false,
  onCloseMobile,
}: DashboardSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  // Generate role-specific navigation links strictly tailored to authenticated user role
  const getNavLinks = (role: DashboardRole) => {
    switch (role) {
      case 'institution':
        return {
          main: [
            { label: 'R&D Overview', path: '/dashboard', icon: LayoutDashboard },
            { label: 'Research Ideas', path: '/dashboard/ideas', icon: Lightbulb },
            { label: 'Field Projects', path: '/dashboard/projects', icon: CheckCircle2 },
            { label: 'Developed Solutions', path: '/dashboard/solutions', icon: Award },
            { label: 'Academic Consortia', path: '/dashboard/collaborations', icon: Users },
            { label: 'University Portal', path: '/university/dashboard', icon: GraduationCap },
          ],
          personal: [
            { label: 'Notifications', path: '/dashboard/notifications', icon: Bell, badge: 2 },
            { label: 'Institutional Impact', path: '/dashboard/impact', icon: Award },
            { label: 'Settings', path: '/dashboard/settings', icon: Settings },
          ],
        };

      case 'expert':
        return {
          main: [
            { label: 'Industry Overview', path: '/dashboard', icon: LayoutDashboard },
            { label: 'Sponsored Projects', path: '/dashboard/projects', icon: CheckCircle2 },
            { label: 'Verified Solutions', path: '/dashboard/solutions', icon: Award },
            { label: 'Partnership Network', path: '/dashboard/collaborations', icon: Users },
            { label: 'Industry Portal', path: '/industry/dashboard', icon: Sparkles },
          ],
          personal: [
            { label: 'Notifications', path: '/dashboard/notifications', icon: Bell, badge: 2 },
            { label: 'CSR Impact', path: '/dashboard/impact', icon: Award },
            { label: 'Settings', path: '/dashboard/settings', icon: Settings },
          ],
        };

      case 'admin':
        return {
          main: [
            { label: 'Directorate Overview', path: '/dashboard', icon: LayoutDashboard },
            { label: 'Civic Challenges', path: '/dashboard/challenges', icon: Zap },
            { label: 'Sanctioned Projects', path: '/dashboard/projects', icon: CheckCircle2 },
            { label: 'State Impact Registry', path: '/dashboard/impact', icon: Award },
            { label: 'Official Command Center', path: '/government/dashboard', icon: Shield },
          ],
          personal: [
            { label: 'Notifications', path: '/dashboard/notifications', icon: Bell, badge: 2 },
            { label: 'Administrative Settings', path: '/dashboard/settings', icon: Settings },
          ],
        };

      case 'citizen':
      default:
        return {
          main: [
            { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
            { label: 'My Challenges', path: '/dashboard/challenges', icon: Zap },
            { label: 'My Ideas', path: '/dashboard/ideas', icon: Lightbulb },
            { label: 'Community Solutions', path: '/dashboard/solutions', icon: Award },
            { label: 'Collaborations', path: '/dashboard/collaborations', icon: Users },
          ],
          personal: [
            { label: 'Notifications', path: '/dashboard/notifications', icon: Bell, badge: 2 },
            { label: 'My Impact', path: '/dashboard/impact', icon: Award },
            { label: 'Settings', path: '/dashboard/settings', icon: Settings },
          ],
        };
    }
  };

  const navLinks = getNavLinks(currentRole);

  const roleDisplayNames: Record<DashboardRole, string> = {
    citizen: 'Citizen Innovator',
    institution: 'University R&D Cell',
    expert: 'Industry / CSR Partner',
    admin: 'State Directorate',
  };

  return (
    <>
      {/* ── Mobile Overlay Backdrop ── */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* ── Sidebar Container ── */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[252px] bg-[#123B2A] text-white flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        } border-r border-[#1E5A3A]/60 select-none text-left`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto scrollbar-none p-5 space-y-7">
          {/* Top Logo & Close for Mobile */}
          <div className="flex items-center justify-between pt-1">
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="h-10 w-10 rounded-2xl bg-[#F7F5F0] text-[#123B2A] flex items-center justify-center font-extrabold text-xl shadow-xs group-hover:scale-105 transition-transform">
                झ
              </div>
              <div className="space-y-0.5">
                <span className="font-extrabold text-[1.15rem] tracking-tight font-sans text-white block leading-none">
                  JharSankalp
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#F5A623] block">
                  CIVIC INNOVATION OS
                </span>
              </div>
            </div>

            {onCloseMobile && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="lg:hidden text-white/70 hover:text-white p-1"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* MAIN Navigation Section */}
          <div className="space-y-1.5">
            <div className="px-3 text-[10.5px] font-mono font-bold uppercase tracking-widest text-[#F7F5F0]/50">
              MAIN
            </div>
            <nav className="space-y-0.5">
              {navLinks.main.map((link) => {
                const Icon = link.icon;
                const isActive =
                  link.path === '/dashboard'
                    ? location.pathname === '/dashboard'
                    : location.pathname === link.path ||
                      location.pathname.startsWith(link.path + '/');

                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => {
                      navigate(link.path);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#1E5A3A] text-white font-bold shadow-2xs'
                        : 'text-[#F7F5F0]/80 hover:text-white hover:bg-[#1E5A3A]/50'
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 stroke-[2] ${
                        isActive ? 'text-[#F5A623]' : 'text-[#F7F5F0]/70'
                      }`}
                    />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* PERSONAL Navigation Section */}
          <div className="space-y-1.5">
            <div className="px-3 text-[10.5px] font-mono font-bold uppercase tracking-widest text-[#F7F5F0]/50">
              PERSONAL
            </div>
            <nav className="space-y-0.5">
              {navLinks.personal.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;

                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => {
                      navigate(link.path);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#1E5A3A] text-white font-bold shadow-2xs'
                        : 'text-[#F7F5F0]/80 hover:text-white hover:bg-[#1E5A3A]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 stroke-[2] text-[#F7F5F0]/70" />
                      <span>{link.label}</span>
                    </div>

                    {link.badge && (
                      <span className="h-5 w-5 rounded-full bg-[#BE123C] text-white text-[10px] font-mono font-bold flex items-center justify-center">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Public Portal Exit Shortcut */}
        <div className="px-4 pb-1">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11.5px] font-mono font-semibold text-[#F7F5F0]/70 hover:text-white hover:bg-[#1E5A3A]/40 border border-[#1E5A3A]/40 transition-all cursor-pointer"
          >
            <span>Exit to Public Portal</span>
            <span>↗</span>
          </button>
        </div>

        {/* Bottom User Profile Strip */}
        <div className="p-4 border-t border-[#1E5A3A]/70 m-3 rounded-2xl bg-[#174632]/70 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-9 w-9 rounded-xl bg-[#F5A623] text-[#123B2A] font-mono font-extrabold text-[13px] flex items-center justify-center shrink-0 shadow-xs">
              {userName.substring(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 space-y-0.5">
              <span className="text-[13px] font-bold text-white block truncate leading-tight">
                {userName}
              </span>
              <span className="text-[10px] font-mono text-[#F5A623] block uppercase truncate">
                {roleDisplayNames[currentRole]}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={async () => {
              await logout();
              navigate('/login');
            }}
            className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-[#1E5A3A] transition-colors cursor-pointer"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>
    </>
  );
}
