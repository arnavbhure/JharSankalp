import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChallengeHero } from '../components/challenges/ChallengeHero';
import { ChallengeFilters } from '../components/challenges/ChallengeFilters';
import { FeaturedChallenge } from '../components/challenges/FeaturedChallenge';
import { ChallengeCard } from '../components/challenges/ChallengeCard';
import { ChallengeMap } from '../components/challenges/ChallengeMap';
import { ChallengeCTA } from '../components/challenges/ChallengeCTA';
import { Footer } from '../components/layout/Footer';
import { ChallengeItem } from '../types/challenges';
import { fetchChallenges } from '../services/api/challenges';
import {
  SearchX,
  ArrowDown,
  X,
  Users,
  MapPin,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

const INITIAL_PAGE_SIZE = 6;

export function Challenges() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const urlDomain = searchParams.get('domain') || searchParams.get('category');
  const urlDistrict = searchParams.get('district');
  const urlStatus = searchParams.get('status');

  // Data State
  const [challenges, setChallenges] = useState<ChallengeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(urlDomain || 'All Focus Areas');
  const [selectedDistrict, setSelectedDistrict] = useState(urlDistrict || 'All Districts');
  const [selectedStatus, setSelectedStatus] = useState(urlStatus || 'All Statuses');
  const [selectedImpact, setSelectedImpact] = useState('All Impact Levels');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE);

  // Selected challenge for interactive modal / preview
  const [previewChallenge, setPreviewChallenge] = useState<ChallengeItem | null>(null);

  const loadChallenges = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchChallenges({
        domain: selectedCategory,
        district: selectedDistrict,
        status: selectedStatus,
      });
      setChallenges(data || []);
    } catch (err: any) {
      setError(err?.message || 'Unable to connect to JharSankalp challenges database.');
      setChallenges([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChallenges();
  }, [selectedCategory, selectedDistrict, selectedStatus]);

  // Featured challenge
  const featuredItem = useMemo(
    () => challenges.find((c) => c.featured) || challenges[0] || null,
    [challenges],
  );

  // Filtered challenges list (client-side search keyword and impact filter)
  const filteredChallenges = useMemo(() => {
    return challenges.filter((item) => {
      // Search keyword filter
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesDistrict = item.district.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesBlock = item.block.toLowerCase().includes(query);
        if (
          !matchesTitle &&
          !matchesDesc &&
          !matchesDistrict &&
          !matchesCategory &&
          !matchesBlock
        ) {
          return false;
        }
      }

      // Impact Level filter
      if (selectedImpact !== 'All Impact Levels' && item.impactLevel !== selectedImpact) {
        return false;
      }

      return true;
    });
  }, [challenges, search, selectedImpact]);

  // Visible sliced list
  const visibleChallenges = useMemo(() => {
    return filteredChallenges.slice(0, visibleCount);
  }, [filteredChallenges, visibleCount]);

  const hasMore = visibleCount < filteredChallenges.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const hasActiveFilters =
    search !== '' ||
    selectedCategory !== 'All Focus Areas' ||
    selectedDistrict !== 'All Districts' ||
    selectedStatus !== 'All Statuses' ||
    selectedImpact !== 'All Impact Levels';

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('All Focus Areas');
    setSelectedDistrict('All Districts');
    setSelectedStatus('All Statuses');
    setSelectedImpact('All Impact Levels');
    setVisibleCount(INITIAL_PAGE_SIZE);
  };

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col justify-between relative">
      <div>
        {/* ── Page Hero ── */}
        <ChallengeHero />

        {/* ── Main Content Area ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
          {/* ── Featured Challenge Section ── */}
          {!hasActiveFilters && featuredItem && (
            <FeaturedChallenge
              challenge={featuredItem}
              onViewDetails={(ch) => navigate(`/challenges/${ch.id}`)}
              onJoinCollaboration={(ch) => navigate(`/challenges/${ch.id}`)}
            />
          )}

          {/* ── Filters & Search Controls ── */}
          <ChallengeFilters
            search={search}
            onSearchChange={setSearch}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedDistrict={selectedDistrict}
            onDistrictChange={setSelectedDistrict}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            selectedImpact={selectedImpact}
            onImpactChange={setSelectedImpact}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            totalFiltered={filteredChallenges.length}
            onResetFilters={handleResetFilters}
          />

          {/* ── Loading State ── */}
          {loading && (
            <div className="py-20 text-center rounded-3xl bg-white border border-[#EEEAE1] p-8 space-y-3">
              <Loader2 className="h-8 w-8 text-[#123B2A] animate-spin mx-auto" />
              <p className="text-[13.5px] font-mono text-[#6B5845]">
                Fetching verified challenges from JharSankalp database...
              </p>
            </div>
          )}

          {/* ── Error State with Retry ── */}
          {!loading && error && (
            <div className="py-16 text-center rounded-3xl bg-[#FFF5F5] border border-[#FECDD3] p-8 space-y-3">
              <AlertCircle className="h-8 w-8 text-[#BE123C] mx-auto" />
              <h4 className="text-[1.1rem] font-bold text-[#BE123C]">Unable to load challenges</h4>
              <p className="text-[13px] text-[#6B5845] max-w-md mx-auto">{error}</p>
              <button
                type="button"
                onClick={loadChallenges}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#BE123C] text-white text-[12.5px] font-bold cursor-pointer hover:bg-[#9F1239]"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Retry</span>
              </button>
            </div>
          )}

          {/* ── Grid or Map View ── */}
          {!loading && !error && (
            <div className="space-y-6">
              {filteredChallenges.length === 0 ? (
                <div className="py-16 text-center rounded-3xl bg-white border border-[#EEEAE1] p-8 space-y-3">
                  <SearchX className="h-10 w-10 text-[#6B5845] mx-auto opacity-40" />
                  <h4 className="text-[1.2rem] font-bold text-[#1D2522]">
                    No challenges found matching your criteria
                  </h4>
                  <p className="text-[13.5px] text-[#6B5845] max-w-sm mx-auto">
                    Try clearing one or more filters or search terms to see open challenges across
                    Jharkhand.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="mt-2 px-4 py-2 rounded-xl bg-[#123B2A] text-white text-[13px] font-bold cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleChallenges.map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      challenge={challenge}
                      onViewDetails={(ch) => navigate(`/challenges/${ch.id}`)}
                    />
                  ))}
                </div>
              ) : (
                <ChallengeMap
                  challenges={filteredChallenges}
                  onSelectChallenge={setPreviewChallenge}
                />
              )}

              {/* Load More Pagination */}
              {viewMode === 'grid' && hasMore && (
                <div className="pt-6 text-center">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] px-6 py-3 text-[13.5px] font-bold text-[#1D2522] shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <span>Load More Challenges</span>
                    <ArrowDown className="h-4 w-4 text-[#123B2A]" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── Bottom Call To Action ── */}
          <ChallengeCTA />
        </div>
      </div>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Preview Modal for Map View Selection ── */}
      {previewChallenge && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setPreviewChallenge(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white border border-[#EEEAE1] shadow-2xl p-6 sm:p-7 space-y-4 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#EEEAE1] pb-3">
              <span className="text-[11px] font-mono font-bold uppercase text-[#123B2A] bg-[#FAF9F5] px-2.5 py-0.5 rounded border border-[#EEEAE1]">
                {previewChallenge.category}
              </span>
              <button
                type="button"
                onClick={() => setPreviewChallenge(null)}
                className="text-[#6B5845] hover:text-[#1D2522] p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-[1.35rem] font-bold text-[#1D2522]">{previewChallenge.title}</h3>
              <p className="text-[13px] text-[#6B5845] line-clamp-3">
                {previewChallenge.description}
              </p>
            </div>

            <div className="flex items-center gap-4 text-[12px] font-mono text-[#6B5845] pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-[#BE123C]" />
                {previewChallenge.locationDisplay}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-[#15803D] font-bold">
                <Users className="h-3.5 w-3.5" />
                {previewChallenge.collaboratorsCount} Collaborators
              </span>
            </div>

            <div className="pt-3 border-t border-[#EEEAE1] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setPreviewChallenge(null)}
                className="px-4 py-2 rounded-xl text-[12.5px] font-bold text-[#6B5845] hover:text-[#1D2522] cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate(`/challenges/${previewChallenge.id}`);
                }}
                className="px-5 py-2 rounded-xl bg-[#123B2A] text-white text-[12.5px] font-bold shadow-xs hover:bg-[#0D2B1E] cursor-pointer"
              >
                Open Full Challenge Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
