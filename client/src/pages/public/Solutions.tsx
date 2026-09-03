import { useState, useMemo, useEffect } from 'react';
import { SolutionsHero } from '../../components/solutions/SolutionsHero';
import { SolutionLifecycle } from '../../components/solutions/SolutionLifecycle';
import { FeaturedSolution } from '../../components/solutions/FeaturedSolution';
import { SolutionFilters } from '../../components/solutions/SolutionFilters';
import { SolutionCard } from '../../components/solutions/SolutionCard';
import { DeploymentStories } from '../../components/solutions/DeploymentStories';
import { SolutionsCTA } from '../../components/solutions/SolutionsCTA';
import { SolutionDetailModal } from '../../components/solutions/SolutionDetailModal';
import { Footer } from '../../components/layout/Footer';
import { DEPLOYMENT_STORIES } from '../../data/solutionsData';
import { SolutionItem } from '../../types/solutions';
import { fetchSolutions } from '../../services/api/solutions';
import { Bookmark, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export function Solutions() {
  const [solutions, setSolutions] = useState<SolutionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters State
  const [search, setSearch] = useState('');
  const [focusArea, setFocusArea] = useState('All Focus Areas');
  const [district, setDistrict] = useState('All Districts');
  const [stage, setStage] = useState('All Stages');
  const [techType, setTechType] = useState('All Technologies');

  // Detail Modal State
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);

  const loadSolutions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSolutions({
        domain: focusArea,
        district,
        stage,
      });
      setSolutions(data || []);
    } catch (err: any) {
      setError(err?.message || 'Unable to connect to JharSankalp database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSolutions();
  }, [focusArea, district, stage]);

  const featuredSolution = useMemo(() => solutions[0] || null, [solutions]);

  // Filter Logic
  const filteredSolutions = useMemo(() => {
    let list = [...solutions];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.district.toLowerCase().includes(q) ||
          s.focusArea.toLowerCase().includes(q) ||
          s.technologyType.toLowerCase().includes(q) ||
          s.technologyTags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (techType !== 'All Technologies') {
      list = list.filter((s) => s.technologyType.toLowerCase() === techType.toLowerCase());
    }

    return list;
  }, [solutions, search, techType]);

  const hasActiveFilters =
    search.trim() !== '' ||
    focusArea !== 'All Focus Areas' ||
    district !== 'All Districts' ||
    stage !== 'All Stages' ||
    techType !== 'All Technologies';

  const handleClearFilters = () => {
    setSearch('');
    setFocusArea('All Focus Areas');
    setDistrict('All Districts');
    setStage('All Stages');
    setTechType('All Technologies');
  };

  const scrollToDirectory = () => {
    const el = document.getElementById('solutions-directory');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col justify-between relative">
      <div>
        {/* ── 1. Page Hero ── */}
        <SolutionsHero onExploreClick={scrollToDirectory} />

        {/* ── Main Content Area ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
          {/* ── 2. Solution Lifecycle Visualization ── */}
          <SolutionLifecycle />

          {/* ── 3. Featured Solution ── */}
          {!hasActiveFilters && featuredSolution && (
            <FeaturedSolution solution={featuredSolution} onOpenDetails={setSelectedSolution} />
          )}

          {/* ── 4. Solution Discovery Controls ── */}
          <SolutionFilters
            search={search}
            onSearchChange={setSearch}
            focusArea={focusArea}
            onFocusAreaChange={setFocusArea}
            district={district}
            onDistrictChange={setDistrict}
            stage={stage}
            onStageChange={setStage}
            techType={techType}
            onTechTypeChange={setTechType}
            totalCount={filteredSolutions.length}
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
          />

          {/* ── Loading State ── */}
          {loading && (
            <div className="py-20 text-center rounded-3xl bg-white border border-[#EEEAE1] p-8 space-y-3">
              <Loader2 className="h-8 w-8 text-[#123B2A] animate-spin mx-auto" />
              <p className="text-[13.5px] font-mono text-[#6B5845]">
                Retrieving engineered solutions from JharSankalp database...
              </p>
            </div>
          )}

          {/* ── Error State with Retry ── */}
          {!loading && error && (
            <div className="py-16 text-center rounded-3xl bg-[#FFF5F5] border border-[#FECDD3] p-8 space-y-3">
              <AlertCircle className="h-8 w-8 text-[#BE123C] mx-auto" />
              <h4 className="text-[1.1rem] font-bold text-[#BE123C]">Unable to load solutions</h4>
              <p className="text-[13px] text-[#6B5845] max-w-md mx-auto">{error}</p>
              <button
                type="button"
                onClick={loadSolutions}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#BE123C] text-white text-[12.5px] font-bold cursor-pointer hover:bg-[#9F1239]"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Retry</span>
              </button>
            </div>
          )}

          {/* ── 5. Solutions Grid ── */}
          {!loading && !error && (
            <div className="space-y-4">
              {filteredSolutions.length === 0 ? (
                <div className="py-16 text-center rounded-3xl bg-white border border-[#EEEAE1] p-8 space-y-3">
                  <Bookmark className="h-8 w-8 text-[#6B5845] mx-auto opacity-50" />
                  <h4 className="text-[1.15rem] font-bold text-[#1D2522]">
                    No solutions match your filter criteria
                  </h4>
                  <p className="text-[13px] text-[#6B5845] max-w-sm mx-auto">
                    Try adjusting your search query or clearing the selected stage and technology
                    filters.
                  </p>
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="px-4 py-2 rounded-xl bg-[#123B2A] text-white text-[12px] font-bold cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredSolutions.map((solution) => (
                    <SolutionCard
                      key={solution.id}
                      solution={solution}
                      onOpenDetails={setSelectedSolution}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── 6. Recently Deployed Section ── */}
          <DeploymentStories stories={DEPLOYMENT_STORIES} />

          {/* ── 7. Contribution CTA ── */}
          <SolutionsCTA />
        </div>
      </div>

      {/* ── 8. Footer ── */}
      <Footer />

      {/* ── 9. Solution Detail Modal ── */}
      <SolutionDetailModal solution={selectedSolution} onClose={() => setSelectedSolution(null)} />
    </div>
  );
}
