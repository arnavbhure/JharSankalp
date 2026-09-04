import { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { BrandMark } from '../components/common/BrandMark';
import { GlobalSearchModal } from '../components/common/GlobalSearchModal';
import { useAuth } from '../hooks/useAuth';
import {
  GraduationCap,
  FolderKanban,
  Users,
  ChevronDown,
  ExternalLink,
  Search,
  BookOpen,
} from 'lucide-react';
import { cn } from '../lib/utils';

export function UniversityLayout() {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowSearch((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { label: 'R&D Center', href: '/university/dashboard', icon: GraduationCap },
    { label: 'Challenges Pool', href: '/challenges', icon: BookOpen, external: false },
    { label: 'Consortia Projects', href: '/projects', icon: FolderKanban, external: false },
    { label: 'Academic Network', href: '/collaborations', icon: Users, external: false },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F1] flex flex-col text-[#1D2522]">
      {/* ── University Institutional Top Bar ── */}
      <header className="sticky top-0 z-50 border-b border-[#EEEAE1] bg-white shadow-xs select-none">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left Brand Identity with Institutional Focus */}
            <div className="flex items-center gap-3.5">
              <Link to="/university/dashboard" className="flex items-center gap-3 group">
                <BrandMark size="sm" variant="forest" />
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[1.15rem] font-extrabold text-[#123B2A] tracking-tight leading-none group-hover:text-[#1F5A3D] transition-colors font-sans">
                      JharSankalp
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase bg-[#123B2A] text-[#F5A623] px-2 py-0.5 rounded">
                      ACADEMIC & R&D PORTAL
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#6B5845] tracking-wider uppercase mt-1">
                    State University Research & Innovation Network · Jharkhand
                  </span>
                </div>
              </Link>
            </div>

            {/* Right Actions & Researcher Profile */}
            <div className="flex items-center gap-3">
              {/* Global Search Trigger */}
              <button
                type="button"
                onClick={() => setShowSearch(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#EEEAE1] bg-[#FAF9F5] text-[#1D2522] hover:bg-white hover:border-[#123B2A] transition-colors shadow-xs cursor-pointer"
                title="Search research initiatives (Ctrl+K)"
              >
                <Search className="h-4 w-4 text-[#123B2A]" />
              </button>

              {/* Public Platform Link */}
              <Link
                to="/"
                className="hidden md:inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#6B5845] hover:text-[#123B2A] transition-colors"
              >
                <span>Public Portal</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>

              {/* Authenticated University Profile Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 rounded-lg border border-[#EEEAE1] bg-[#FAF9F5] px-3 py-1.5 text-[12.5px] font-semibold text-[#1D2522] hover:bg-white transition-colors shadow-xs cursor-pointer"
                >
                  <div className="h-6 w-6 rounded-full bg-[#123B2A] text-white flex items-center justify-center text-[11px] font-bold">
                    {user?.name ? user.name[0] : 'U'}
                  </div>
                  <span className="font-bold text-[#123B2A] hidden sm:inline">
                    {user?.name || 'Academic Lead'}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-[#6B5845]" />
                </button>

                {showProfileMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowProfileMenu(false)}
                    />
                    <div className="absolute right-0 top-full mt-1.5 z-50 w-64 rounded-xl border border-[#EEEAE1] bg-white p-3 shadow-lg text-left">
                      <div className="border-b border-[#EEEAE1] pb-2 mb-2">
                        <div className="font-bold text-[13px] text-[#1D2522]">{user?.name}</div>
                        <div className="text-[11.5px] text-neutral-500 font-mono truncate">{user?.email}</div>
                        <div className="mt-1 inline-block text-[10px] font-mono font-bold uppercase bg-[#123B2A]/10 text-[#123B2A] px-2 py-0.5 rounded">
                          {user?.role || 'UNIVERSITY RESEARCHER'}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Link
                          to="/university/dashboard"
                          onClick={() => setShowProfileMenu(false)}
                          className="block px-2.5 py-1.5 text-[12.5px] font-semibold text-[#123B2A] hover:bg-[#FAF9F5] rounded-md transition-colors"
                        >
                          University R&D Portal
                        </Link>
                        <Link
                          to="/"
                          onClick={() => setShowProfileMenu(false)}
                          className="block px-2.5 py-1.5 text-[12.5px] text-neutral-700 hover:bg-[#FAF9F5] rounded-md transition-colors"
                        >
                          Public Platform ↗
                        </Link>
                        <div className="border-t border-[#EEEAE1] pt-1 mt-1">
                          <button
                            type="button"
                            onClick={async () => {
                              setShowProfileMenu(false);
                              await logout();
                              navigate('/login');
                            }}
                            className="w-full text-left px-2.5 py-1.5 text-[12.5px] font-semibold text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
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
                        : 'text-[#6B5845] hover:text-[#1D2522] hover:bg-[#FAF9F5]',
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

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </div>
  );
}
