import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { cn } from '../../lib/utils';

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isCitizen } = useAuth();
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isChallenges = location.pathname === '/challenges';
  const isChallengeDetail = location.pathname.startsWith('/challenges/');
  const isReport = location.pathname === '/report-challenge' || location.pathname === '/report';
  const isMyChallenges = location.pathname === '/my-challenges';
  const isIdeas = location.pathname === '/ideas';
  const isIdeaDetail = location.pathname.startsWith('/ideas/');
  const isPublicExploration =
    isLanding ||
    isChallenges ||
    isChallengeDetail ||
    isReport ||
    isMyChallenges ||
    isIdeas ||
    isIdeaDetail;

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col text-neutral-900">
      {/* Institutional Top Header */}
      <Header
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        showMenuButton={!isCitizen}
      />

      {/* Body Layout */}
      <div className="flex flex-1 w-full">
        {/* Role-Specific Sidebar: Hidden for citizens and on public exploration pages */}
        {!isCitizen && !isPublicExploration && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        {/* Main Content Area */}
        <main
          className={cn(
            'flex-1 min-w-0 transition-all duration-200',
            isCitizen ? 'pb-20 lg:pb-8' : 'pb-8',
          )}
        >
          {isPublicExploration ? (
            <Outlet />
          ) : (
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          )}
        </main>
      </div>

      {/* Citizen Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}
