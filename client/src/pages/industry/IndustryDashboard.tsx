import { useState, useEffect } from 'react';
import { IndustryDashboardData } from '../../types/industry';
import { industryApi } from '../../services/industryApi';
import { IndustryHeader } from '../../components/industry/IndustryHeader';
import { IndustryQuickActions } from '../../components/industry/IndustryQuickActions';
import { IndustryOpportunityMetrics } from '../../components/industry/IndustryOpportunityMetrics';
import { RecommendedOpportunitiesSection } from '../../components/industry/RecommendedOpportunitiesSection';
import { ActiveCommitmentsSection } from '../../components/industry/ActiveCommitmentsSection';
import { IndustryCapabilityProfile } from '../../components/industry/IndustryCapabilityProfile';
import { CollaborationPipelineSection } from '../../components/industry/CollaborationPipelineSection';
import { IndustryActivityFeed } from '../../components/industry/IndustryActivityFeed';
import { Footer } from '../../components/layout/Footer';

export function IndustryDashboard() {
  const [data, setData] = useState<IndustryDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadIndustryData() {
      try {
        setLoading(true);
        const res = await industryApi.getDashboard();
        setData(res);
      } catch (err) {
        console.error('Failed to load industry dashboard telemetry:', err);
      } finally {
        setLoading(false);
      }
    }

    loadIndustryData();
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] flex flex-col items-center justify-center p-6 space-y-3">
        <div className="h-10 w-10 border-3 border-[#123B2A] border-t-transparent rounded-full animate-spin" />
        <span className="text-[13.5px] font-mono text-[#6B5845]">
          Loading Innovation Partner Network Workspace...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#1D2522] flex flex-col w-full text-left">
      {/* ── 1. Industry Header ── */}
      <IndustryHeader profile={data.profile} />

      {/* ── Main Workspace Body Stream ── */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-10 sm:space-y-12">
        {/* ── 8. Fast-Track Quick Actions ── */}
        <IndustryQuickActions />

        {/* ── 2. Opportunity Metrics ── */}
        <IndustryOpportunityMetrics metrics={data.metrics} />

        {/* ── 3. Recommended Opportunities ── */}
        <RecommendedOpportunitiesSection opportunities={data.opportunities} />

        {/* ── 4. Active Commitments ── */}
        <div id="commitments">
          <ActiveCommitmentsSection commitments={data.commitments} />
        </div>

        {/* ── 5. Capability Profile ── */}
        <div id="capabilities">
          <IndustryCapabilityProfile capabilities={data.capabilities} />
        </div>

        {/* ── 6. Collaboration Pipeline ── */}
        <CollaborationPipelineSection pipeline={data.pipeline} />

        {/* ── 7. Activity Feed ── */}
        <IndustryActivityFeed activities={data.activities} />
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
