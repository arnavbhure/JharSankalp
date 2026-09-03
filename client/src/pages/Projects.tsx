import { useState, useEffect } from 'react';
import {
  Project,
  PortfolioStats,
  PortfolioActivityItem,
  ProjectFiltersState,
} from '../types/projects';
import {
  getProjects,
  getFeaturedProject,
  getPortfolioStats,
  getPortfolioActivity,
  getCollaborationOpportunities,
  PORTFOLIO_STATS,
} from '../services/projectsApi';
import { ProjectsHero } from '../components/projects/ProjectsHero';
import { ProjectPortfolioOverview } from '../components/projects/ProjectPortfolioOverview';
import { FeaturedProject } from '../components/projects/FeaturedProject';
import { ProjectStageExplorer } from '../components/projects/ProjectStageExplorer';
import { ProjectFilters } from '../components/projects/ProjectFilters';
import { ProjectsList } from '../components/projects/ProjectsList';
import { ProjectMapView } from '../components/projects/ProjectMapView';
import { CollaborationOpportunities } from '../components/projects/CollaborationOpportunities';
import { PortfolioImpactSnapshot } from '../components/projects/PortfolioImpactSnapshot';
import { PortfolioActivityTimeline } from '../components/projects/PortfolioActivityTimeline';
import { Footer } from '../components/layout/Footer';

const INITIAL_FILTERS: ProjectFiltersState = {
  search: '',
  domain: 'All Domains',
  district: 'All Districts',
  stage: 'ALL PROJECTS',
  institution: 'All Institutions',
  opportunity: 'All Projects',
};

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [featuredProject, setFeaturedProject] = useState<Project | null>(null);
  const [stats, setStats] = useState<PortfolioStats>(PORTFOLIO_STATS);
  const [activities, setActivities] = useState<PortfolioActivityItem[]>([]);
  const [opportunities, setOpportunities] = useState<Array<{ project: Project; need: string }>>([]);
  const [filters, setFilters] = useState<ProjectFiltersState>(INITIAL_FILTERS);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [loading, setLoading] = useState(true);

  // Load initial portfolio data
  useEffect(() => {
    Promise.all([
      getFeaturedProject(),
      getPortfolioStats(),
      getPortfolioActivity(),
      getCollaborationOpportunities(),
    ]).then(([featured, portfolioStats, activityData, oppData]) => {
      setFeaturedProject(featured);
      setStats(portfolioStats);
      setActivities(activityData);
      setOpportunities(oppData);
    });
  }, []);

  // Filter projects when criteria changes
  useEffect(() => {
    setLoading(true);
    getProjects(filters)
      .then((res) => {
        setProjects(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filters]);

  const handleStageSelect = (stageKey: string) => {
    setFilters((prev) => ({ ...prev, stage: stageKey }));
  };

  const handleFilterUpdate = (updates: Partial<ProjectFiltersState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col">
      {/* ── Page Hero Introduction ── */}
      <ProjectsHero />

      {/* ── Wide Continuous Portfolio Metrics Band (Deep Purple) ── */}
      <ProjectPortfolioOverview stats={stats} />

      {/* ── Featured Centerpiece Case Study ── */}
      {featuredProject && <FeaturedProject project={featuredProject} />}

      {/* ── Horizontal Stage Explorer ── */}
      <ProjectStageExplorer
        currentStage={filters.stage}
        onSelectStage={handleStageSelect}
      />

      {/* ── Main Portfolio Exploration Body ── */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full space-y-12">
        {/* Search & Filtering Controls with List/Map Toggle */}
        <ProjectFilters
          filters={filters}
          onChange={handleFilterUpdate}
          onReset={handleResetFilters}
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
        />

        {/* Dynamic View: Structured List or Geodetic Map */}
        {loading ? (
          <div className="py-20 text-center text-[14px] text-[#6B5845]">
            Updating innovation portfolio...
          </div>
        ) : viewMode === 'list' ? (
          <ProjectsList
            projects={projects}
            onResetFilters={handleResetFilters}
          />
        ) : (
          <ProjectMapView projects={projects} />
        )}

        {/* ── Collaboration Opportunities (Industry & Partners) ── */}
        <CollaborationOpportunities opportunities={opportunities} />

        {/* ── Impact Snapshot (Deep Purple & Soft Apricot) ── */}
        <PortfolioImpactSnapshot stats={stats} />

        {/* ── Portfolio Activity Movement Timeline ── */}
        <PortfolioActivityTimeline activities={activities} />
      </main>

      {/* ── Institutional Footer ── */}
      <Footer />
    </div>
  );
}
