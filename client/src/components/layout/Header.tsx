import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '@jharsankalp/shared';
import { useAuthStore } from '../../stores/authStore';
import { BrandMark } from '../common/BrandMark';
import { Menu, ChevronDown, Check, Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

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
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === '/';

  const demoRoles: UserRole[] = [
    UserRole.CITIZEN,
    UserRole.GOVERNMENT_OFFICER,
    UserRole.UNIVERSITY_ADMIN,
    UserRole.FACULTY,
    UserRole.INDUSTRY,
    UserRole.SUPER_ADMIN,
  ];

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-neutral-200/80 bg-[#FCFAF6] px-4 sm:px-8 shadow-sm select-none transition-all">
      {/* Left: Brand Identity */}
      <div className="flex items-center gap-3">
        {showMenuButton && !isLandingPage && (
          <button
            onClick={onMenuToggle}
            className="rounded-full p-2 text-neutral-700 hover:bg-neutral-100 lg:hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#163D2B]"
            aria-label="Toggle navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <Link to="/" className="flex items-center gap-3 group">
          {/* Official Sacred Tree Emblem */}
          <BrandMark size="sm" variant="forest" />
          <div className="flex flex-col text-left">
            <span className="text-[1.15rem] font-extrabold text-[#163D2B] tracking-tight leading-none group-hover:text-[#3E7A4A] transition-colors font-sans">
              JharSankalp
            </span>
            <span className="text-[10px] font-semibold text-neutral-500 tracking-wider uppercase mt-1">
              Ideas · Collaboration · Impact
            </span>
          </div>
        </Link>
      </div>

      {/* Center: Balanced Navigation (Exact Structure from Reference) */}
      <nav className="hidden lg:flex items-center space-x-7 text-[14px] font-semibold text-neutral-700">
        <Link
          to="/"
          className={cn(
            'relative py-2 transition-colors hover:text-[#163D2B]',
            isLandingPage ? 'text-[#163D2B] font-bold' : '',
          )}
        >
          Home
          {isLandingPage && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#163D2B] rounded-full" />
          )}
        </Link>

        <a
          href="#challenges-feed"
          className="py-2 transition-colors hover:text-[#163D2B]"
        >
          Challenges
        </a>

        <a
          href="#focus-areas"
          className="py-2 transition-colors hover:text-[#163D2B]"
        >
          Ideas
        </a>

        <a
          href="#how-it-works"
          className="py-2 transition-colors hover:text-[#163D2B]"
        >
          Solutions
        </a>

        <a
          href="#ecosystem"
          className="py-2 transition-colors hover:text-[#163D2B]"
        >
          Collaborators
        </a>

        <a
          href="#impact"
          className="py-2 transition-colors hover:text-[#163D2B]"
        >
          Impact
        </a>

        <a
          href="#about"
          className="py-2 transition-colors hover:text-[#163D2B]"
        >
          About Us
        </a>
      </nav>

      {/* Right: Search + Login/Sign Up Pill + Demo Role Switcher */}
      <div className="flex items-center gap-3">
        {/* Search Circular Icon Button */}
        <button
          onClick={() => {
            const el = document.getElementById('innovation-map');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100 hover:text-[#163D2B] transition-colors shadow-xs"
          aria-label="Search challenges"
        >
          <Search className="h-4 w-4 stroke-[2.2]" />
        </button>

        {/* Login / Sign Up Pill Button */}
        <button
          onClick={() => navigate('/login')}
          className="hidden sm:inline-flex items-center justify-center rounded-pill bg-[#163D2B] px-5 py-2 text-[13px] font-bold text-white shadow-sm hover:bg-[#112E20] active:scale-[0.98] transition-all"
        >
          Login / Sign Up
        </button>

        {/* Demo Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            className="flex items-center gap-1.5 rounded-pill border border-neutral-300 bg-white px-3 py-1.5 text-caption font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors shadow-xs"
            aria-expanded={showRoleSwitcher}
            aria-haspopup="true"
          >
            <span className="text-neutral-400 hidden md:inline">Role:</span>
            <span className="font-bold text-[#163D2B]">
              {user ? ROLE_LABELS[user.role] : 'Guest'}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
          </button>

          {showRoleSwitcher && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowRoleSwitcher(false)} />
              <div className="absolute right-0 top-full mt-1.5 z-50 w-60 rounded-sm border border-neutral-200 bg-white py-1.5 shadow-medium">
                <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-100 mb-1 text-left">
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
                        isSelected ? 'text-[#163D2B] font-bold bg-neutral-100' : 'text-neutral-800',
                      )}
                    >
                      <span>{ROLE_LABELS[role]}</span>
                      {isSelected && <Check className="h-3.5 w-3.5 text-[#163D2B]" />}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
