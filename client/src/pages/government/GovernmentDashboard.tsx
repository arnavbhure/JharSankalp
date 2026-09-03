import { useState, useEffect } from 'react';
import {
  ExecutiveMetrics,
  DistrictActivity,
  PipelineStage,
  DomainAnalytics,
  ActiveProjectSnapshot,
  InstitutionMetric,
  IndustryPartnerMetric,
  AttentionItem,
  EcosystemActivity,
  StateImpactSnapshot,
} from '../../types/government';
import { governmentApi } from '../../services/governmentApi';
import { GovernmentHeader } from '../../components/government/GovernmentHeader';
import { QuickActionsToolbar } from '../../components/government/QuickActionsToolbar';
import { ExecutiveMetricsCards } from '../../components/government/ExecutiveMetricsCards';
import { JharkhandInnovationMap } from '../../components/government/JharkhandInnovationMap';
import { ChallengePipelineFunnel } from '../../components/government/ChallengePipelineFunnel';
import { DomainIntelligencePanel } from '../../components/government/DomainIntelligencePanel';
import { ActiveProjectsSnapshotTable } from '../../components/government/ActiveProjectsSnapshotTable';
import { InstitutionalParticipationSection } from '../../components/government/InstitutionalParticipationSection';
import { BottlenecksAttentionModule } from '../../components/government/BottlenecksAttentionModule';
import { RecentEcosystemActivityFeed } from '../../components/government/RecentEcosystemActivityFeed';
import { StateImpactSnapshotBand } from '../../components/government/StateImpactSnapshotBand';
import { Footer } from '../../components/layout/Footer';

export function GovernmentDashboard() {
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('FY_2026');
  const [exporting, setExporting] = useState(false);

  // Telemetry States
  const [metrics, setMetrics] = useState<ExecutiveMetrics | null>(null);
  const [districts, setDistricts] = useState<DistrictActivity[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictActivity | null>(null);
  const [pipeline, setPipeline] = useState<PipelineStage[]>([]);
  const [domains, setDomains] = useState<DomainAnalytics[]>([]);
  const [projects, setProjects] = useState<ActiveProjectSnapshot[]>([]);
  const [institutions, setInstitutions] = useState<{
    universities: InstitutionMetric[];
    industry: IndustryPartnerMetric[];
  }>({ universities: [], industry: [] });
  const [attentionItems, setAttentionItems] = useState<AttentionItem[]>([]);
  const [activities, setActivities] = useState<EcosystemActivity[]>([]);
  const [impact, setImpact] = useState<StateImpactSnapshot | null>(null);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        const [
          overviewData,
          districtData,
          pipelineData,
          domainData,
          projectsData,
          institutionData,
          attentionData,
          activityData,
          impactData,
        ] = await Promise.all([
          governmentApi.getOverview(),
          governmentApi.getDistrictInsights(),
          governmentApi.getChallengePipeline(),
          governmentApi.getDomainAnalytics(),
          governmentApi.getActiveProjectsSnapshot(),
          governmentApi.getInstitutionMetrics(),
          governmentApi.getAttentionItems(),
          governmentApi.getRecentActivity(),
          governmentApi.getStateImpactSnapshot(),
        ]);

        setMetrics(overviewData);
        setDistricts(districtData);
        setSelectedDistrict(districtData[0] || null);
        setPipeline(pipelineData);
        setDomains(domainData);
        setProjects(projectsData);
        setInstitutions(institutionData);
        setAttentionItems(attentionData);
        setActivities(activityData);
        setImpact(impactData);
      } catch (err) {
        console.error('Failed to load government dashboard telemetry:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const handleExportReport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
    }, 2000);
  };

  if (loading || !metrics || !impact) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] flex flex-col items-center justify-center p-6 space-y-3">
        <div className="h-10 w-10 border-3 border-[#4C1E4F] border-t-transparent rounded-full animate-spin" />
        <span className="text-[13.5px] font-mono text-[#6B5845]">
          Loading State Innovation Command Telemetry...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#1D2522] flex flex-col w-full text-left">
      {/* ── 1. Dashboard Institutional Header ── */}
      <GovernmentHeader
        timeframe={timeframe}
        onTimeframeChange={setTimeframe}
        onExportReport={handleExportReport}
        exporting={exporting}
      />

      {/* ── Main Command Workspace Stream ── */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-10 sm:space-y-12">
        {/* ── 11. Quick Actions Fast-Track Toolbar ── */}
        <QuickActionsToolbar
          onExportReport={handleExportReport}
          exporting={exporting}
        />

        {/* ── 2. Executive Metrics (Grouped Layout) ── */}
        <ExecutiveMetricsCards metrics={metrics} />

        {/* ── 8. Bottlenecks / Attention Required (Placed Prominently) ── */}
        <BottlenecksAttentionModule items={attentionItems} />

        {/* ── 3. Interactive Jharkhand Innovation Map ── */}
        <JharkhandInnovationMap
          districts={districts}
          selectedDistrict={selectedDistrict}
          onSelectDistrict={setSelectedDistrict}
        />

        {/* ── 4. Challenge-to-Impact Pipeline Funnel ── */}
        <ChallengePipelineFunnel stages={pipeline} />

        {/* ── 5. Domain Intelligence Panel ── */}
        <DomainIntelligencePanel analytics={domains} />

        {/* ── 6. Active Projects Portfolio Snapshot ── */}
        <ActiveProjectsSnapshotTable projects={projects} />

        {/* ── 7. Institutional & Industrial Participation ── */}
        <InstitutionalParticipationSection
          universities={institutions.universities}
          industry={institutions.industry}
        />

        {/* ── 9. Recent Ecosystem Activity Feed ── */}
        <RecentEcosystemActivityFeed activities={activities} />

        {/* ── 10. State Innovation Impact Snapshot (Deep Purple Band) ── */}
        <StateImpactSnapshotBand impact={impact} />
      </main>

      {/* ── Institutional Footer ── */}
      <Footer />
    </div>
  );
}
