import { useState, useEffect } from 'react';
import { UniversityDashboardData } from '../../types/university';
import { universityApi } from '../../services/universityApi';
import { UniversityHeader } from '../../components/university/UniversityHeader';
import { UniversityQuickActions } from '../../components/university/UniversityQuickActions';
import { UniversityOverviewMetrics } from '../../components/university/UniversityOverviewMetrics';
import { RecommendedChallengesSection } from '../../components/university/RecommendedChallengesSection';
import { UniversityActiveProjectsSection } from '../../components/university/UniversityActiveProjectsSection';
import { ResearchCapabilityProfile } from '../../components/university/ResearchCapabilityProfile';
import { TeamsParticipationSection } from '../../components/university/TeamsParticipationSection';
import { UniversityActivityFeed } from '../../components/university/UniversityActivityFeed';
import { Footer } from '../../components/layout/Footer';

export function UniversityDashboard() {
  const [data, setData] = useState<UniversityDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUniversityData() {
      try {
        setLoading(true);
        const res = await universityApi.getDashboard();
        setData(res);
      } catch (err) {
        console.error('Failed to load university dashboard telemetry:', err);
      } finally {
        setLoading(false);
      }
    }

    loadUniversityData();
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] flex flex-col items-center justify-center p-6 space-y-3">
        <div className="h-10 w-10 border-3 border-[#4C1E4F] border-t-transparent rounded-full animate-spin" />
        <span className="text-[13.5px] font-mono text-[#6B5845]">
          Loading University Innovation Workspace...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#1D2522] flex flex-col w-full text-left">
      {/* ── 1. University Header ── */}
      <UniversityHeader profile={data.profile} />

      {/* ── Main Workspace Body Stream ── */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-10 sm:space-y-12">
        {/* ── 8. Fast-Track Quick Actions ── */}
        <UniversityQuickActions />

        {/* ── 2. Overview Metrics ── */}
        <UniversityOverviewMetrics metrics={data.metrics} />

        {/* ── 3. Recommended Challenges Matching Capabilities ── */}
        <RecommendedChallengesSection challenges={data.recommendedChallenges} />

        {/* ── 4. Active Research & Implementation Projects ── */}
        <UniversityActiveProjectsSection projects={data.activeProjects} />

        {/* ── 5. Research Capability Matrix ── */}
        <div id="capabilities">
          <ResearchCapabilityProfile capabilities={data.capabilities} />
        </div>

        {/* ── 6. Teams & Student Fellowship Cohorts ── */}
        <TeamsParticipationSection teams={data.teams} />

        {/* ── 7. Campus Activity Feed ── */}
        <UniversityActivityFeed activities={data.activities} />
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
