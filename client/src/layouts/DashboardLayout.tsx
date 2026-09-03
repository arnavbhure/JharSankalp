import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { DashboardRole } from '../types/dashboard';
import { DashboardSidebar } from '../components/dashboard-v2/DashboardSidebar';
import { DashboardTopHeader } from '../components/dashboard-v2/DashboardTopHeader';

export interface DashboardOutletContext {
  currentRole: DashboardRole;
  userName: string;
  onRoleChange: (role: DashboardRole) => void;
}

const ROLE_USER_NAMES: Record<DashboardRole, string> = {
  citizen: 'Arnav',
  institution: 'BIT Mesra Innovation Cell',
  expert: 'Dr. Ramesh Soren',
  admin: 'Mission Directorate',
};

const ROLE_GREETINGS: Record<DashboardRole, { greeting: string; subtitle: string }> = {
  citizen: {
    greeting: 'Good evening, Arnav 👋',
    subtitle: "See how your ideas are creating change across Jharkhand.",
  },
  institution: {
    greeting: 'Welcome back, BIT Mesra 🏛️',
    subtitle: 'Institutional innovation portfolio & university-district consortia.',
  },
  expert: {
    greeting: 'Good evening, Dr. Soren 🔬',
    subtitle: 'Technical review queue & scientific impact assessments.',
  },
  admin: {
    greeting: 'State Directorate Overview 🇮🇳',
    subtitle: 'Jharkhand 24-district civic innovation & governance telemetry.',
  },
};

export function DashboardLayout() {
  const [currentRole, setCurrentRole] = useState<DashboardRole>('citizen');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const userName = ROLE_USER_NAMES[currentRole];
  const { greeting, subtitle } = ROLE_GREETINGS[currentRole];

  // Dynamic header override depending on sub-page
  const getHeaderInfo = () => {
    const path = location.pathname;
    if (path === '/dashboard/challenges') {
      return {
        greeting: 'My Challenges',
        subtitle:
          'Track the challenges you care about and the change you are helping create.',
      };
    }
    if (path === '/dashboard/ideas') {
      return {
        greeting: 'My Ideas',
        subtitle:
          'Manage solution ideas submitted by you and monitor their journey to project realization.',
      };
    }
    if (path === '/dashboard/projects') {
      return {
        greeting: 'My Projects',
        subtitle:
          'Track active collaborative projects, technical workstreams, and consortium milestones.',
      };
    }
    if (path === '/dashboard/solutions') {
      return {
        greeting: 'My Solutions',
        subtitle:
          'Track solutions you have contributed to or supported across Jharkhand.',
      };
    }
    if (path === '/dashboard/collaborations') {
      return {
        greeting: 'My Collaborations',
        subtitle:
          'Active academic, industrial, and community networks powering your initiatives.',
      };
    }
    if (path === '/dashboard/notifications') {
      return {
        greeting: 'Notifications & Alerts',
        subtitle:
          'System dispatches, reviewer feedback, milestone approvals, and team invitations.',
      };
    }
    if (path === '/dashboard/impact') {
      return {
        greeting: 'My Impact & Achievements',
        subtitle:
          'Your verified civic contributions, badges, and societal value generated.',
      };
    }
    if (path === '/dashboard/settings') {
      return {
        greeting: 'Settings & Preferences',
        subtitle:
          'Manage your innovator profile, notification frequencies, and role configuration.',
      };
    }
    return { greeting, subtitle };
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="min-h-screen bg-[#EDE8DF] text-[#1D2522] font-sans flex antialiased">
      {/* ── Left Persistent Sidebar (Deep Green #123B2A, ~252px) ── */}
      <DashboardSidebar
        currentRole={currentRole}
        userName={userName}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* ── Main Application Canvas (Floating Rounded Container inspired by Design 4) ── */}
      <div className="flex-1 min-w-0 lg:pl-[252px] p-2.5 sm:p-4 lg:p-6 flex flex-col justify-center">
        <div className="w-full bg-[#F7F5F0] rounded-[28px] sm:rounded-[36px] shadow-xl border border-[#EEEAE1] p-5 sm:p-8 lg:p-10 space-y-7 min-h-[calc(100vh-3rem)] flex flex-col justify-between">
          <div className="space-y-7">
            {/* Top Header */}
            <DashboardTopHeader
              greeting={headerInfo.greeting}
              subtitle={headerInfo.subtitle}
              currentRole={currentRole}
              onRoleChange={(r) => setCurrentRole(r)}
              onOpenMobileMenu={() => setMobileMenuOpen(true)}
            />

            {/* Main Active Route View */}
            <main className="w-full">
              <Outlet context={{ currentRole, userName, onRoleChange: setCurrentRole }} />
            </main>
          </div>

          {/* Minimal footer note within dashboard canvas */}
          <footer className="pt-6 border-t border-[#EEEAE1] flex flex-col sm:flex-row items-center justify-between text-[11.5px] font-mono text-[#6B5845] gap-2">
            <span>JharSankalp Authenticated Innovator Workspace · Jharkhand</span>
            <span>All actions verified by Department of IT & e-Governance</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
