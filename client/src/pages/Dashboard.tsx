import { useState, useEffect } from 'react';
import { DashboardRoleData } from '../types/dashboard';
import { getDashboardData } from '../services/dashboardApi';
import { DashboardSidebar } from '../components/dashboard-v2/DashboardSidebar';
import { DashboardTopHeader } from '../components/dashboard-v2/DashboardTopHeader';
import { ImpactOverviewCard } from '../components/dashboard-v2/ImpactOverviewCard';
import { MetricCardsGroup } from '../components/dashboard-v2/MetricCardsGroup';
import { ActiveChallengesSection } from '../components/dashboard-v2/ActiveChallengesSection';
import { FeaturedChallengePanel } from '../components/dashboard-v2/FeaturedChallengePanel';
import { RecentActivitySection } from '../components/dashboard-v2/RecentActivitySection';
import { useAuth } from '../hooks/useAuth';

import { resolveDashboardRole } from '../layouts/DashboardLayout';

export function Dashboard() {
  const { user } = useAuth();
  const currentRole = resolveDashboardRole(user?.role);
  const [data, setData] = useState<DashboardRoleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDashboardData(currentRole)
      .then((res) => {
        setData(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentRole]);

  const userName = user?.name ? user.name.split(' ')[0] : (data ? data.userName : 'Innovator');
  const greeting = user?.name ? `Welcome back, ${user.name.split(' ')[0]} 👋` : (data?.greeting || 'Welcome to JharSankalp 👋');

  return (
    <div className="min-h-screen bg-[#EDE8DF] text-[#1D2522] font-sans flex antialiased">
      {/* ── Left Sidebar (Deep Green ~252px) ── */}
      <DashboardSidebar
        currentRole={currentRole}
        userName={userName}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* ── Main Application Canvas (Floating Rounded Container inspired by Design 4) ── */}
      <div className="flex-1 min-w-0 lg:pl-[252px] p-2.5 sm:p-4 lg:p-6 flex flex-col justify-center">
        <div className="w-full bg-[#F7F5F0] rounded-[28px] sm:rounded-[36px] shadow-xl border border-[#EEEAE1] p-5 sm:p-8 lg:p-10 space-y-7 min-h-[calc(100vh-3rem)]">
          {/* Top Header */}
          <DashboardTopHeader
            greeting={greeting}
            subtitle={data?.subtitle || 'See how your ideas are creating change across Jharkhand.'}
            currentRole={currentRole}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />

          {loading || !data ? (
            <div className="py-24 text-center text-[#6B5845] font-mono text-[13px]">
              Synchronizing civic innovation workspace...
            </div>
          ) : (
            <div className="space-y-7 animate-in fade-in duration-200">
              {/* ── Section 1: Impact Overview (Left Primary Card + Right 3 Metric Cards) ── */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                <div className="lg:col-span-7 flex">
                  <div className="w-full">
                    <ImpactOverviewCard data={data.impact} />
                  </div>
                </div>

                <div className="lg:col-span-5 flex">
                  <div className="w-full">
                    <MetricCardsGroup metrics={data.metrics} />
                  </div>
                </div>
              </section>

              {/* ── Section 2 & 3: Active Challenges + Right Featured Panel & Recent Activity ── */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Main Functional Area: Active Challenges */}
                <div className="lg:col-span-8 space-y-6">
                  <ActiveChallengesSection
                    title={data.challengesTitle}
                    challenges={data.challenges}
                  />
                </div>

                {/* Right Side Column: Featured Challenge + Recent Activity */}
                <div className="lg:col-span-4 space-y-6">
                  <FeaturedChallengePanel featured={data.featured} />
                  <RecentActivitySection activities={data.activities} />
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
