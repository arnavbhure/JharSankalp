import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { cn } from '../../lib/utils';

/**
 * Role-aware application shell.
 *
 * - Citizen:     Mobile-first, minimal layout, bottom nav, no sidebar on mobile
 * - Government:  Desktop sidebar layout, data-rich nav
 * - University:  Sidebar with academic sections
 * - Industry:    Sidebar with opportunity/commitment sections
 * - Admin:       Full sidebar
 */
export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isCitizen } = useAuth();

  return (
    <div className="min-h-screen bg-surface-subtle">
      <Header
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        showMenuButton={!isCitizen || false}
      />

      <div className="flex">
        {/* Sidebar — hidden for citizen on mobile, visible for other roles */}
        {!isCitizen && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <main
          className={cn(
            'flex-1 min-h-[calc(100vh-3.5rem)]',
            !isCitizen && 'lg:ml-0',
            isCitizen && 'pb-16 lg:pb-0', // Account for mobile bottom nav
          )}
        >
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile bottom nav for citizens */}
      <MobileNav />
    </div>
  );
}
