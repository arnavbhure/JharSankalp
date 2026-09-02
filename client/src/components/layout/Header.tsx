import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '@jharsankalp/shared';
import { useAuthStore } from '../../stores/authStore';
import { Bell, Menu, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState } from 'react';

interface HeaderProps {
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}

const ROLE_LABELS: Partial<Record<UserRole, string>> = {
  [UserRole.CITIZEN]: 'Citizen',
  [UserRole.GOVERNMENT_OFFICER]: 'Government Officer',
  [UserRole.DISTRICT_OFFICER]: 'District Officer',
  [UserRole.STATE_ADMIN]: 'State Admin',
  [UserRole.UNIVERSITY_ADMIN]: 'University Admin',
  [UserRole.FACULTY]: 'Faculty',
  [UserRole.STUDENT]: 'Student',
  [UserRole.INDUSTRY]: 'Industry',
  [UserRole.STARTUP]: 'Startup',
  [UserRole.SUPER_ADMIN]: 'Super Admin',
};

export function Header({ onMenuToggle, showMenuButton = true }: HeaderProps) {
  const { user } = useAuth();
  const setDemoRole = useAuthStore((s) => s.setDemoRole);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const demoRoles: UserRole[] = [
    UserRole.CITIZEN,
    UserRole.GOVERNMENT_OFFICER,
    UserRole.DISTRICT_OFFICER,
    UserRole.STATE_ADMIN,
    UserRole.UNIVERSITY_ADMIN,
    UserRole.FACULTY,
    UserRole.STUDENT,
    UserRole.INDUSTRY,
    UserRole.SUPER_ADMIN,
  ];

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center border-b border-ink-200 bg-white px-4">
      {/* Left: Menu + Logo */}
      <div className="flex items-center gap-3">
        {showMenuButton && (
          <button
            onClick={onMenuToggle}
            className="rounded p-1.5 text-ink-500 hover:bg-ink-100 lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white text-sm font-bold">
            JS
          </div>
          <div className="hidden sm:block">
            <span className="text-sm font-semibold text-ink-900">JharSankalp</span>
          </div>
        </div>
      </div>

      {/* Right: Notifications + User */}
      <div className="ml-auto flex items-center gap-2">
        {/* Demo Role Switcher — dev only */}
        <div className="relative">
          <button
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            className="flex items-center gap-1.5 rounded border border-ink-200 px-2.5 py-1.5 text-xs font-medium text-ink-600 hover:bg-ink-50 transition-colors"
          >
            <span className="hidden sm:inline">Role:</span>
            <span className="text-primary-700">{ROLE_LABELS[user?.role as UserRole] || user?.role}</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          {showRoleSwitcher && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowRoleSwitcher(false)} />
              <div className="absolute right-0 top-full mt-1 z-50 w-48 rounded border border-ink-200 bg-white py-1 shadow-md animate-fade-in">
                <div className="px-3 py-1.5 text-2xs font-medium text-ink-400 uppercase tracking-wider">
                  Switch Demo Role
                </div>
                {demoRoles.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setDemoRole(role);
                      setShowRoleSwitcher(false);
                    }}
                    className={cn(
                      'block w-full px-3 py-1.5 text-left text-sm hover:bg-ink-50 transition-colors',
                      user?.role === role ? 'text-primary font-medium bg-primary-50' : 'text-ink-700',
                    )}
                  >
                    {ROLE_LABELS[role] || role}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Notifications */}
        <button
          className="relative rounded p-1.5 text-ink-500 hover:bg-ink-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-danger" />
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-ink-200">
          <div className="h-8 w-8 rounded-full bg-ink-200 flex items-center justify-center text-xs font-medium text-ink-600">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-medium text-ink-800 leading-tight">{user?.name}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
