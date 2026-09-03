import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '@jharsankalp/shared';
import { useAuthStore } from '../../stores/authStore';
import { BrandMark } from '../common/BrandMark';
import { GlobalSearchModal } from '../common/GlobalSearchModal';
import { Menu, X, ChevronDown, Check, Search, PlusCircle, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState, useEffect } from 'react';
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
  const { user } = useAuth();
  const setDemoRole = useAuthStore((s) => s.setDemoRole);
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

  const demoRoles: UserRole[] = [
    UserRole.CITIZEN,
    UserRole.GOVERNMENT_OFFICER,
    UserRole.UNIVERSITY_ADMIN,
    UserRole.FACULTY,
    UserRole.INDUSTRY,
    UserRole.SUPER_ADMIN,
  ];

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

          <Link to="/" className="flex items-center gap-3 group">
            <BrandMark size="sm" variant="forest" />
            <div className="flex flex-col text-left">
              <span className="text-[1.15rem] font-extrabold text-[#123B2A] tracking-tight leading-none group-hover:text-[#1F5A3D] transition-colors font-sans">
                JharSankalp
              </span>
              <span className="text-[10px] font-semibold text-[#6B5845] tracking-wider uppercase mt-1">
                Ideas · Collaboration · Impact
              </span>
            </div>
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

          {/* Dedicated Workspace Shortcut */}
          <button
            onClick={() => navigate(getDashboardPath())}
            className="hidden md:inline-flex items-center justify-center rounded-lg border border-[#123B2A] bg-white px-3.5 py-1.5 text-[12.5px] font-bold text-[#123B2A] shadow-2xs hover:bg-[#FAF9F5] active:scale-[0.98] transition-all cursor-pointer"
          >
            {getDashboardLabel()}
          </button>

          {/* Login / Sign Up Button */}
          <button
            onClick={() => navigate('/login')}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#123B2A] px-4 py-1.5 text-[13px] font-bold text-white shadow-2xs hover:bg-[#0D2B1E] active:scale-[0.98] transition-all cursor-pointer"
          >
            Login
          </button>

          {/* Demo Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
              className="flex items-center gap-1.5 rounded-lg border border-[#EEEAE1] bg-white px-3 py-1.5 text-caption font-semibold text-[#1D2522] hover:bg-[#F8F6F1] transition-colors shadow-2xs cursor-pointer"
              aria-expanded={showRoleSwitcher}
              aria-haspopup="true"
            >
              <span className="text-[#6B5845] hidden md:inline">Role:</span>
              <span className="font-bold text-[#123B2A]">
                {user ? ROLE_LABELS[user.role] : 'Guest'}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-[#6B5845]" />
            </button>

            {showRoleSwitcher && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowRoleSwitcher(false)} />
                <div className="absolute right-0 top-full mt-1.5 z-50 w-60 rounded-xl border border-[#EEEAE1] bg-white py-1.5 shadow-lg">
                  <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#6B5845] border-b border-[#EEEAE1] mb-1 text-left">
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
                          if (role === UserRole.GOVERNMENT_OFFICER) {
                            navigate('/government/dashboard');
                          } else if (
                            role === UserRole.UNIVERSITY_ADMIN ||
                            role === UserRole.FACULTY
                          ) {
                            navigate('/university/dashboard');
                          } else if (role === UserRole.INDUSTRY) {
                            navigate('/industry/dashboard');
                          } else if (role === UserRole.CITIZEN) {
                            navigate('/dashboard');
                          }
                        }}
                        className={cn(
                          'flex items-center justify-between w-full px-3 py-2 text-left text-[13px] hover:bg-[#FAF9F5] transition-colors cursor-pointer',
                          isSelected ? 'text-[#123B2A] font-bold bg-[#FAF9F5]' : 'text-[#1D2522]',
                        )}
                      >
                        <span>{ROLE_LABELS[role]}</span>
                        {isSelected && <Check className="h-3.5 w-3.5 text-[#123B2A]" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
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
