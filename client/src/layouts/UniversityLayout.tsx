import { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { BrandMark } from '../components/common/BrandMark';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../stores/authStore';
import { UserRole } from '@jharsankalp/shared';
import {
  GraduationCap,
  FileText,
  FolderKanban,
  Users,
  ChevronDown,
  Check,
  ExternalLink,
} from 'lucide-react';
import { cn } from '../lib/utils';

export function UniversityLayout() {
  const { user } = useAuth();
  const setDemoRole = useAuthStore((s) => s.setDemoRole);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Campus Command', href: '/university/dashboard', icon: GraduationCap },
    { label: 'Recommended Challenges', href: '/challenges', icon: FileText },
    { label: 'Projects Portfolio', href: '/projects', icon: FolderKanban },
    { label: 'Ecosystem Consortia', href: '/collaborations', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F1] flex flex-col text-[#1D2522]">
      {/* ── University Institutional Top Bar ── */}
      <header className="sticky top-0 z-50 border-b border-[#EEEAE1] bg-white shadow-xs select-none">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left Brand Identity */}
            <div className="flex items-center gap-3.5">
              <Link to="/university/dashboard" className="flex items-center gap-3 group">
                <BrandMark size="sm" variant="forest" />
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[1.15rem] font-extrabold text-[#123B2A] tracking-tight leading-none group-hover:text-[#1F5A3D] transition-colors font-sans">
                      JharSankalp
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase bg-[#4C1E4F] text-[#FEE1C7] px-2 py-0.5 rounded">
                      UNIVERSITY WORKSPACE
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#6B5845] tracking-wider uppercase mt-1">
                    BIT Mesra Innovation Cell · Academic Research Partner
                  </span>
                </div>
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="hidden md:inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#6B5845] hover:text-[#123B2A] transition-colors"
              >
                <span>Public Portal</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>

              {/* Perspective Role Switcher */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
                  className="flex items-center gap-1.5 rounded-lg border border-[#EEEAE1] bg-[#FAF9F5] px-3 py-1.5 text-[12.5px] font-semibold text-[#1D2522] hover:bg-white transition-colors shadow-xs cursor-pointer"
                >
                  <span className="text-[#6B5845] hidden sm:inline">Role:</span>
                  <span className="font-bold text-[#4C1E4F]">
                    {user?.role === UserRole.UNIVERSITY_ADMIN || user?.role === UserRole.FACULTY
                      ? 'University Admin'
                      : 'Academic Researcher'}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-[#6B5845]" />
                </button>

                {showRoleSwitcher && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowRoleSwitcher(false)}
                    />
                    <div className="absolute right-0 top-full mt-1.5 z-50 w-64 rounded-xl border border-[#EEEAE1] bg-white p-2 shadow-lg text-left">
                      <div className="px-3 py-1.5 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#6B5845] border-b border-[#EEEAE1] mb-1">
                        Switch Perspective
                      </div>

                      {[
                        { role: UserRole.UNIVERSITY_ADMIN, label: 'University Admin (BIT Mesra)', target: '/university/dashboard' },
                        { role: UserRole.INDUSTRY, label: 'Industry Partner', target: '/industry/dashboard' },
                        { role: UserRole.GOVERNMENT_OFFICER, label: 'Government Officer', target: '/government/dashboard' },
                        { role: UserRole.CITIZEN, label: 'Citizen Innovator', target: '/dashboard' },
                      ].map((item) => (
                        <button
                          key={item.role}
                          type="button"
                          onClick={() => {
                            setDemoRole(item.role);
                            setShowRoleSwitcher(false);
                            navigate(item.target);
                          }}
                          className={cn(
                            'w-full flex items-center justify-between px-3 py-2 text-[13px] rounded-lg transition-colors text-left cursor-pointer',
                            user?.role === item.role
                              ? 'bg-[#FAF9F5] font-bold text-[#123B2A]'
                              : 'text-[#1D2522] hover:bg-[#FAF9F5]'
                          )}
                        >
                          <span>{item.label}</span>
                          {user?.role === item.role && (
                            <Check className="h-4 w-4 text-[#123B2A]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ── Sub Navigation Strip ── */}
          <div className="flex items-center gap-2 overflow-x-auto border-t border-[#EEEAE1] py-2 scrollbar-none text-left">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === '/university/dashboard'}
                  className={({ isActive }) =>
                    cn(
                      'inline-flex items-center gap-2 py-1.5 px-3 rounded-lg text-[12.5px] font-semibold transition-all whitespace-nowrap',
                      isActive
                        ? 'bg-[#4C1E4F] text-white font-bold shadow-2xs'
                        : 'text-[#6B5845] hover:text-[#1D2522] hover:bg-[#FAF9F5]'
                    )
                  }
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Outlet */}
      <div className="flex-1 w-full">
        <Outlet />
      </div>
    </div>
  );
}
