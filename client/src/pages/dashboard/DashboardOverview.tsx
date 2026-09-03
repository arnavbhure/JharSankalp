import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { DashboardOutletContext } from '../../layouts/DashboardLayout';
import { DashboardRoleData } from '../../types/dashboard';
import { getDashboardData } from '../../services/dashboardApi';
import { ImpactOverviewCard } from '../../components/dashboard-v2/ImpactOverviewCard';
import { MetricCardsGroup } from '../../components/dashboard-v2/MetricCardsGroup';
import { ActiveChallengesSection } from '../../components/dashboard-v2/ActiveChallengesSection';
import { FeaturedChallengePanel } from '../../components/dashboard-v2/FeaturedChallengePanel';
import { RecentActivitySection } from '../../components/dashboard-v2/RecentActivitySection';

export function DashboardOverview() {
  const { currentRole } = useOutletContext<DashboardOutletContext>();
  const [data, setData] = useState<DashboardRoleData | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading || !data) {
    return (
      <div className="py-24 text-center text-[#6B5845] font-mono text-[13px]">
        Synchronizing civic innovation workspace...
      </div>
    );
  }

  return (
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
  );
}
