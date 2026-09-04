import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '@jharsankalp/shared';
import { GlobalSearchModal } from '../common/GlobalSearchModal';
import { Menu, X, ChevronDown, Search, PlusCircle, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}

const ROLE_LABELS: Record<string, string> = {
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

const getRoleLabel = (role?: string) => {
  if (!role) return 'Innovator';
  return ROLE_LABELS[role] || role;
};

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Challenges', href: '/challenges' },
  { label: 'Ideas', href: '/ideas' },
  { label: 'Projects', href: '/projects' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Collaborations', href: '/collaborations' },
  { label: 'Impact', href: '/impact' },
  { label: 'About Us', href: '/about' },
];

export function Header({}: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile drawer on route transition
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowRoleSwitcher(false);
  }, [location.pathname]);

  // Global search shortcut (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getDashboardPath = () => {
    if (user?.role === UserRole.GOVERNMENT_OFFICER || user?.role === UserRole.STATE_ADMIN) {
      return '/government/dashboard';
    } else if (user?.role === UserRole.UNIVERSITY_ADMIN || user?.role === UserRole.FACULTY) {
      return '/university/dashboard';
    } else if (user?.role === UserRole.INDUSTRY || user?.role === UserRole.STARTUP) {
      return '/industry/dashboard';
    }
    return '/dashboard';
  };

  const getDashboardLabel = () => {
    if (user?.role === UserRole.GOVERNMENT_OFFICER || user?.role === UserRole.STATE_ADMIN) {
      return 'Command Center ↗';
    } else if (user?.role === UserRole.UNIVERSITY_ADMIN || user?.role === UserRole.FACULTY) {
      return 'University Workspace ↗';
    } else if (user?.role === UserRole.INDUSTRY || user?.role === UserRole.STARTUP) {
      return 'Industry Workspace ↗';
    }
    return 'Dashboard ↗';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#EEEAE1] bg-[#F8F6F1] select-none shadow-2xs">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-8">
        {/* Left: Brand Identity & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-[#1D2522] hover:bg-[#EEEAE1] lg:hidden focus-visible:outline-none transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-[#BE123C]" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <Link to="/" className="flex items-center gap-2.5 group py-1">
            <img
              src="/web_logo.png"
              alt="JharSankalp — Societal Challenge-to-Impact Exchange"
              className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-[14px] font-semibold text-[#1D2522]">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'relative py-2 transition-colors hover:text-[#123B2A]',
                  isActive ? 'text-[#123B2A] font-bold' : 'text-[#1D2522]',
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#123B2A] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Search + Action Buttons + Role Switcher */}
        <div className="flex items-center gap-2.5">
          {/* Search Circular Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#EEEAE1] bg-white text-[#1D2522] hover:bg-[#EEEAE1] hover:text-[#123B2A] transition-colors shadow-2xs cursor-pointer"
            aria-label="Search initiatives (Ctrl+K)"
            title="Search initiatives (Ctrl+K)"
          >
            <Search className="h-4 w-4 stroke-[2.2]" />
          </button>

          {/* Quick Problem Report Button (Desktop) */}
          <Link
            to="/report-challenge"
            className="hidden xl:inline-flex items-center gap-1.5 rounded-lg border border-[#123B2A]/25 bg-white px-3 py-1.5 text-[12.5px] font-bold text-[#123B2A] hover:bg-[#FAF9F5] shadow-2xs transition-all"
          >
            <PlusCircle className="h-3.5 w-3.5 text-[#F5A623]" />
            <span>Report Challenge</span>
          </Link>

          {/* Authenticated User or Sign In Button */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(getDashboardPath())}
                className="hidden md:inline-flex items-center justify-center rounded-lg border border-[#123B2A] bg-white px-3.5 py-1.5 text-[12.5px] font-bold text-[#123B2A] shadow-2xs hover:bg-[#FAF9F5] active:scale-[0.98] transition-all cursor-pointer"
              >
                {getDashboardLabel()}
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
                  className="flex items-center gap-2 rounded-lg border border-[#EEEAE1] bg-white px-3 py-1.5 text-[12.5px] font-semibold text-[#1D2522] hover:bg-[#F8F6F1] transition-colors shadow-2xs cursor-pointer"
                  aria-expanded={showRoleSwitcher}
                >
                  <div className="h-6 w-6 rounded-full bg-[#123B2A] text-white flex items-center justify-center text-[11px] font-bold">
                    {user.name ? user.name[0] : 'U'}
                  </div>
                  <span className="font-bold text-[#123B2A] hidden sm:inline">
                    {user.name || 'Account'}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-[#6B5845]" />
                </button>

                {showRoleSwitcher && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowRoleSwitcher(false)}
                    />
                    <div className="absolute right-0 top-full mt-1.5 z-50 w-64 rounded-xl border border-[#EEEAE1] bg-white p-3 shadow-lg text-left">
                      <div className="border-b border-[#EEEAE1] pb-2.5 mb-2">
                        <div className="font-bold text-[13.5px] text-[#1D2522]">{user.name}</div>
                        <div className="text-[11.5px] text-neutral-500 font-mono truncate">{user.email}</div>
                        <div className="mt-1.5 inline-block text-[10.5px] font-bold uppercase tracking-wider bg-[#123B2A]/10 text-[#123B2A] px-2 py-0.5 rounded">
                          {getRoleLabel(user.role)}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Link
                          to={getDashboardPath()}
                          onClick={() => setShowRoleSwitcher(false)}
                          className="block px-2.5 py-1.5 text-[13px] font-semibold text-neutral-800 hover:bg-[#FAF9F5] rounded-md transition-colors"
                        >
                          My Portal Workspace ↗
                        </Link>
                        <Link
                          to="/my-challenges"
                          onClick={() => setShowRoleSwitcher(false)}
                          className="block px-2.5 py-1.5 text-[13px] text-neutral-700 hover:bg-[#FAF9F5] rounded-md transition-colors"
                        >
                          My Challenges
                        </Link>
                        <Link
                          to="/my-ideas"
                          onClick={() => setShowRoleSwitcher(false)}
                          className="block px-2.5 py-1.5 text-[13px] text-neutral-700 hover:bg-[#FAF9F5] rounded-md transition-colors"
                        >
                          My Solution Ideas
                        </Link>

                        <div className="border-t border-[#EEEAE1] pt-1 mt-1">
                          <button
                            type="button"
                            onClick={async () => {
                              setShowRoleSwitcher(false);
                              await logout();
                              navigate('/login');
                            }}
                            className="w-full text-left px-2.5 py-1.5 text-[13px] font-semibold text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center justify-center rounded-lg bg-[#123B2A] px-4 py-2 text-[13px] font-bold text-white shadow-2xs hover:bg-[#0D2B1E] active:scale-[0.98] transition-all cursor-pointer"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EEEAE1] bg-[#F8F6F1] px-4 py-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 text-left">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'px-3 py-2 rounded-lg text-[13.5px] font-medium transition-colors',
                  location.pathname === link.href
                    ? 'bg-[#123B2A] text-white font-bold'
                    : 'text-[#1D2522] hover:bg-[#EEEAE1]',
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#EEEAE1] flex flex-col gap-2.5">
            <Link
              to="/report-challenge"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#123B2A] text-white text-[13.5px] font-bold shadow-xs"
            >
              <PlusCircle className="h-4 w-4 text-[#F5A623]" />
              <span>Report a Challenge</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate(getDashboardPath());
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#123B2A] bg-white text-[#123B2A] text-[13.5px] font-bold"
            >
              <span>{getDashboardLabel()}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/login');
              }}
              className="flex items-center justify-center py-2 text-[13px] font-semibold text-[#6B5845] hover:text-[#123B2A]"
            >
              Sign In to Your Account
            </button>
          </div>
        </div>
      )}

      {/* Global Command / Ecosystem Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
