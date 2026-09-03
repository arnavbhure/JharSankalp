import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Project,
  PortfolioMetrics,
  ProjectActivityItem,
  ProjectFiltersState,
} from '../types/projects';
import {
  getProjects,
  getFeaturedProject,
  getProjectMetrics,
  getProjectActivity,
} from '../services/projectsApi';
import { ProjectsHero } from '../components/projects/ProjectsHero';
import { ProjectMetricsBand } from '../components/projects/ProjectMetricsBand';
import { ProjectStageExplorer } from '../components/projects/ProjectStageExplorer';
import { FeaturedProject } from '../components/projects/FeaturedProject';
import { ProjectFilters } from '../components/projects/ProjectFilters';
import { ProjectPortfolio } from '../components/projects/ProjectPortfolio';
import { ProjectMapView } from '../components/projects/ProjectMapView';
import { CollaborationNetwork } from '../components/projects/CollaborationNetwork';
import { ProjectActivityFeed } from '../components/projects/ProjectActivityFeed';
import { ProjectImpactPreview } from '../components/projects/ProjectImpactPreview';
import { ProjectParticipationCTA } from '../components/projects/ProjectParticipationCTA';
import { Footer } from '../components/layout/Footer';
import { PORTFOLIO_METRICS } from '../data/projectsData';

const INITIAL_FILTERS: ProjectFiltersState = {
  search: '',
  domain: 'All Domains',
  district: 'All Districts',
  stage: 'ALL',
  institution: 'All Institutions',
  impactArea: 'All',
};

export function Projects() {
  const [searchParams] = useSearchParams();
  const urlStage = searchParams.get('stage');
  const urlDomain = searchParams.get('domain');
  const urlDistrict = searchParams.get('district');

  const [projects, setProjects] = useState<Project[]>([]);
  const [featuredProject, setFeaturedProject] = useState<Project | null>(null);
  const [metrics, setMetrics] = useState<PortfolioMetrics>(PORTFOLIO_METRICS);
  const [activities, setActivities] = useState<ProjectActivityItem[]>([]);
  const [filters, setFilters] = useState<ProjectFiltersState>({
    ...INITIAL_FILTERS,
    stage: (urlStage as any) || INITIAL_FILTERS.stage,
    domain: urlDomain || INITIAL_FILTERS.domain,
    district: urlDistrict || INITIAL_FILTERS.district,
  });
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [loading, setLoading] = useState(true);

  // Load initial projects data
  useEffect(() => {
    Promise.all([
      getFeaturedProject(),
      getProjectMetrics(),
      getProjectActivity(),
    ]).then(([featured, metricsData, activityData]) => {
      setFeaturedProject(featured);
      setMetrics(metricsData);
      setActivities(activityData);
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
    // If user clicked stage explorer, smoothly scroll down to the portfolio
    const el = document.getElementById('project-portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFilterUpdate = (updates: Partial<ProjectFiltersState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const handleDistrictSelectFromMap = (district: string) => {
    setFilters((prev) => ({ ...prev, district }));
  };

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col justify-between">
      <div>
        {/* ── SECTION 1: Project Portfolio Hero ── */}
        <ProjectsHero />

        {/* ── SECTION 2: Project Portfolio Metrics Band (Deep Purple) ── */}
        <ProjectMetricsBand metrics={metrics} />

        {/* ── SECTION 3: Project Stage Explorer ── */}
        <ProjectStageExplorer
          selectedStage={filters.stage}
          onSelectStage={handleStageSelect}
        />

        {/* ── SECTION 4: Featured Project In Focus ── */}
        {featuredProject && <FeaturedProject project={featuredProject} />}

        {/* ── SECTION 5: Explore Projects (Portfolio & Map Views) ── */}
        <div id="project-portfolio" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
          <div className="space-y-2 border-b border-[#EEEAE1] pb-5">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#4C1E4F] font-bold">
              <span className="h-2 w-2 rounded-full bg-[#FA7E61]" />
              ACTIVE SPRINT DIRECTORY
            </div>
            <h2 className="text-[2.2rem] sm:text-[2.8rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              Projects across the innovation ecosystem
            </h2>
            <p className="text-[15px] sm:text-[17px] text-[#6B5845] max-w-3xl leading-relaxed">
              Explore ongoing work by sector, location, development stage and participating institutions.
            </p>
          </div>

          {/* Filter Bar */}
          <ProjectFilters
            filters={filters}
            onChange={handleFilterUpdate}
            onReset={handleResetFilters}
            viewMode={viewMode}
            onToggleViewMode={setViewMode}
            totalFiltered={projects.length}
          />

          {/* Dynamic Portfolio View vs Map View */}
          {loading ? (
            <div className="py-16 text-center text-[13.5px] font-mono text-[#6B5845] bg-white rounded-3xl border border-[#EEEAE1] p-8">
              Retrieving active project sprints...
            </div>
          ) : viewMode === 'list' ? (
            <ProjectPortfolio
              projects={projects}
              onResetFilters={handleResetFilters}
            />
          ) : (
            <ProjectMapView
              projects={projects}
              selectedDistrict={filters.district}
              onSelectDistrict={handleDistrictSelectFromMap}
            />
          )}
        </div>

        {/* ── SECTION 6: Collaboration Network ── */}
        <CollaborationNetwork />

        {/* ── SECTION 7: Project Activity Feed ── */}
        <ProjectActivityFeed activities={activities} />

        {/* ── SECTION 8: Project Impact Preview (Deep Purple) ── */}
        <ProjectImpactPreview metrics={metrics} />

        {/* ── SECTION 9: Call To Action (Role-Specific) ── */}
        <ProjectParticipationCTA />
      </div>

      {/* ── Institutional Footer ── */}
      <Footer />
    </div>
  );
}
