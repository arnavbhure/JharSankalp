import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '@jharsankalp/shared';
import { useAuthStore } from '../../stores/authStore';
import { Bell, Menu, ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState } from 'react';

interface HeaderProps {
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}

const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.CITIZEN]: 'Citizen',
  [UserRole.COMMUNITY]: 'Community',
  [UserRole.GOVERNMENT_OFFICER]: 'Government Officer',
  [UserRole.DISTRICT_OFFICER]: 'District Officer',
  [UserRole.STATE_ADMIN]: 'State Admin',
  [UserRole.UNIVERSITY_ADMIN]: 'University Admin',
  [UserRole.FACULTY]: 'Faculty / Researcher',
  [UserRole.STUDENT]: 'Student',
  [UserRole.INDUSTRY]: 'Industry Partner',
  [UserRole.STARTUP]: 'Startup / MSME',
  [UserRole.MSME]: 'MSME',
  [UserRole.CSR]: 'CSR Organization',
  [UserRole.MENTOR]: 'Mentor',
  [UserRole.FIELD_OFFICER]: 'Field Officer',
  [UserRole.SUPER_ADMIN]: 'Super Admin',
};

export function Header({ onMenuToggle, showMenuButton = true }: HeaderProps) {
  const { user } = useAuth();
  const setDemoRole = useAuthStore((s) => s.setDemoRole);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const demoRoles: UserRole[] = [
    UserRole.CITIZEN,
    UserRole.GOVERNMENT_OFFICER,
    UserRole.UNIVERSITY_ADMIN,
    UserRole.FACULTY,
    UserRole.INDUSTRY,
    UserRole.SUPER_ADMIN,
  ];

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-neutral-200 bg-neutral-0 px-4 sm:px-6">
      {/* Left: Brand Identity */}
      <div className="flex items-center gap-3">
        {showMenuButton && (
          <button
            onClick={onMenuToggle}
            className="rounded-sm p-1.5 text-neutral-600 hover:bg-neutral-100 lg:hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-purple"
            aria-label="Toggle navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div className="flex items-center gap-2.5">
          {/* Official JharSankalp Institutional Mark */}
          <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-brand-purple text-neutral-0 text-caption font-bold tracking-tight">
            JS
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-body font-semibold text-neutral-900 tracking-tight leading-none">
                JharSankalp
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-pill bg-brand-apricot text-[11px] font-semibold text-neutral-900 leading-none">
                Jharkhand
              </span>
            </div>
            <span className="hidden md:block text-[11px] text-neutral-400 leading-tight mt-0.5">
              Societal Challenge-to-Impact Exchange
            </span>
          </div>
        </div>
      </div>

      {/* Right: Role Switcher & User Profile */}
      <div className="flex items-center gap-3">
        {/* Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            className="flex items-center gap-1.5 rounded-sm border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-small text-neutral-800 hover:bg-neutral-100 hover:border-neutral-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-purple"
            aria-expanded={showRoleSwitcher}
            aria-haspopup="true"
          >
            <span className="text-neutral-400 text-caption hidden sm:inline">Role:</span>
            <span className="font-medium text-brand-purple">
              {user ? ROLE_LABELS[user.role] : 'Guest'}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
          </button>

          {showRoleSwitcher && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowRoleSwitcher(false)} />
              <div className="absolute right-0 top-full mt-1.5 z-50 w-56 rounded-sm border border-neutral-200 bg-neutral-0 py-1.5 shadow-medium">
                <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 border-b border-neutral-100 mb-1">
                  Switch User Perspective
                </div>
                {demoRoles.map((role) => {
                  const isSelected = user?.role === role;
                  return (
                    <button
                      key={role}
                      onClick={() => {
                        setDemoRole(role);
                        setShowRoleSwitcher(false);
                      }}
                      className={cn(
                        'flex items-center justify-between w-full px-3 py-1.5 text-left text-small hover:bg-neutral-100 transition-colors',
                        isSelected ? 'text-brand-purple font-semibold bg-brand-purple-subtle' : 'text-neutral-800',
                      )}
                    >
                      <span>{ROLE_LABELS[role]}</span>
                      {isSelected && <Check className="h-3.5 w-3.5 text-brand-purple" />}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Notifications */}
        <button
          className="relative rounded-sm p-1.5 text-neutral-600 hover:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-purple"
          aria-label="View notifications"
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-brand-strawberry" />
        </button>

        {/* User Identity Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-neutral-200">
          <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-neutral-100 border border-neutral-300 text-caption font-semibold text-neutral-800">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="hidden lg:block text-left leading-none">
            <span className="block text-small font-medium text-neutral-900">{user?.name}</span>
            <span className="text-[11px] text-neutral-400">{user?.email}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
