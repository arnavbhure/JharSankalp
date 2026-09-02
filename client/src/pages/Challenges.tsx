import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChallengeHero } from '../components/challenges/ChallengeHero';
import { ChallengeFilters } from '../components/challenges/ChallengeFilters';
import { FeaturedChallenge } from '../components/challenges/FeaturedChallenge';
import { ChallengeCard } from '../components/challenges/ChallengeCard';
import { ChallengeMap } from '../components/challenges/ChallengeMap';
import { ChallengeCTA } from '../components/challenges/ChallengeCTA';
import { Footer } from '../components/layout/Footer';
import { CHALLENGES_DATA } from '../data/challengesData';
import { ChallengeItem } from '../types/challenges';
import { SearchX, ArrowDown, X, Users, MapPin } from 'lucide-react';

const INITIAL_PAGE_SIZE = 6;

export function Challenges() {
  const navigate = useNavigate();

  // Filter States
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Focus Areas');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedImpact, setSelectedImpact] = useState('All Impact Levels');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE);

  // Selected challenge for interactive modal / preview
  const [previewChallenge, setPreviewChallenge] = useState<ChallengeItem | null>(null);

  // Featured challenge
  const featuredItem = useMemo(
    () => CHALLENGES_DATA.find((c) => c.featured) || CHALLENGES_DATA[0],
    []
  );

  // Filtered challenges list
  const filteredChallenges = useMemo(() => {
    return CHALLENGES_DATA.filter((item) => {
      // Search keyword filter
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesDistrict = item.district.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesBlock = item.block.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesDistrict && !matchesCategory && !matchesBlock) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'All Focus Areas' && item.category !== selectedCategory) {
        return false;
      }

      // District filter
      if (selectedDistrict !== 'All Districts' && item.district !== selectedDistrict) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'All Statuses' && item.status !== selectedStatus) {
        return false;
      }

      // Impact level filter
      if (selectedImpact !== 'All Impact Levels' && item.impactLevel !== selectedImpact) {
        return false;
      }

      return true;
    });
  }, [search, selectedCategory, selectedDistrict, selectedStatus, selectedImpact]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('All Focus Areas');
    setSelectedDistrict('All Districts');
    setSelectedStatus('All Statuses');
    setSelectedImpact('All Impact Levels');
    setVisibleCount(INITIAL_PAGE_SIZE);
  };

  const visibleChallenges = filteredChallenges.slice(0, visibleCount);
  const hasMore = visibleCount < filteredChallenges.length;

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col">
      {/* ── 1. Page Hero with Platform Insights ── */}
      <ChallengeHero />

      {/* ── 2. Discovery Section (Filters + Featured + Grid/Map) ── */}
      <section className="py-10 sm:py-14 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full space-y-10 flex-1">
        {/* Discovery Filter Controls */}
        <ChallengeFilters
          search={search}
          onSearchChange={(val) => {
            setSearch(val);
            setVisibleCount(INITIAL_PAGE_SIZE);
          }}
          selectedCategory={selectedCategory}
          onCategoryChange={(val) => {
            setSelectedCategory(val);
            setVisibleCount(INITIAL_PAGE_SIZE);
          }}
          selectedDistrict={selectedDistrict}
          onDistrictChange={(val) => {
            setSelectedDistrict(val);
            setVisibleCount(INITIAL_PAGE_SIZE);
          }}
          selectedStatus={selectedStatus}
          onStatusChange={(val) => {
            setSelectedStatus(val);
            setVisibleCount(INITIAL_PAGE_SIZE);
          }}
          selectedImpact={selectedImpact}
          onImpactChange={(val) => {
            setSelectedImpact(val);
            setVisibleCount(INITIAL_PAGE_SIZE);
          }}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onResetFilters={handleResetFilters}
          totalFiltered={filteredChallenges.length}
        />

        {/* ── Featured Challenge Spotlight (Show when in Grid View and no specific narrow filter) ── */}
        {viewMode === 'grid' && !search && selectedCategory === 'All Focus Areas' && (
          <FeaturedChallenge
            challenge={featuredItem}
            onViewDetails={(c) => setPreviewChallenge(c)}
            onJoinCollaboration={(c) => setPreviewChallenge(c)}
          />
        )}

        {/* ── Main Challenges Section Header ── */}
        <div className="border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-[1.75rem] sm:text-[2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              Explore Challenges
            </h2>
            <p className="text-[13.5px] text-[#6B5845] mt-0.5">
              Showing{' '}
              <strong className="text-[#1D2522] font-bold">
                {filteredChallenges.length}
              </strong>{' '}
              active challenges across Jharkhand
            </p>
          </div>
        </div>

        {/* ── VIEW SWITCH: Grid View or Interactive Map View ── */}
        {viewMode === 'map' ? (
          /* Map View */
          <ChallengeMap
            challenges={filteredChallenges}
            onSelectChallenge={(c) => setPreviewChallenge(c)}
          />
        ) : filteredChallenges.length > 0 ? (
          /* Grid View */
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onViewDetails={(c) => setPreviewChallenge(c)}
                />
              ))}
            </div>

            {/* Load More Challenges Progressive Pagination */}
            {hasMore && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#123B2A] bg-white hover:bg-[#F8F6F1] text-[#123B2A] px-7 py-3 text-[14px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Load More Challenges</span>
                  <ArrowDown className="h-4 w-4 stroke-[2.5]" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="py-16 px-4 text-center rounded-2xl border border-dashed border-[#EEEAE1] bg-white space-y-4 max-w-xl mx-auto">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FEF6E9] text-[#B45309] mx-auto">
              <SearchX className="h-7 w-7 stroke-[2]" />
            </div>
            <div>
              <h3 className="text-[1.25rem] font-bold text-[#1D2522] font-sans">
                No challenges found.
              </h3>
              <p className="text-[13.5px] text-[#6B5845] mt-1 max-w-sm mx-auto">
                Try changing your search terms or explore another focus area and district.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#123B2A] text-white px-5 py-2.5 text-[13.5px] font-bold hover:bg-[#0D2B1E] transition-all cursor-pointer shadow-2xs"
            >
              <span>Clear All Filters</span>
            </button>
          </div>
        )}
      </section>

      {/* ── 3. Community Voice Call to Action ── */}
      <ChallengeCTA />

      {/* ── 4. Institutional Footer ── */}
      <Footer />

      {/* ── Interactive Problem Dossier Modal / Preview Drawer ── */}
      {previewChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs text-left animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-2xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setPreviewChallenge(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-[#6B5845] hover:bg-[#F8F6F1] hover:text-[#1D2522] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-8">
              <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-[#123B2A] uppercase">
                <MapPin className="h-3.5 w-3.5 text-[#F5A623]" />
                <span>{previewChallenge.district}</span>
                <span>·</span>
                <span>{previewChallenge.category}</span>
                <span>·</span>
                <span className="text-[#6B5845]">{previewChallenge.id}</span>
              </div>

              <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight leading-snug font-sans">
                {previewChallenge.title}
              </h3>
            </div>

            {/* Problem Description */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
                Problem Formulation & Ground Reality
              </span>
              <p className="text-[14.5px] text-[#1D2522]/90 leading-relaxed bg-[#FAF9F5] p-4 rounded-xl border border-[#EEEAE1]">
                {previewChallenge.description}
              </p>
            </div>

            {/* District & Operational Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg border border-[#EEEAE1] bg-white text-left">
                <div className="text-[11px] font-mono text-[#6B5845]">Target Block</div>
                <div className="text-[13.5px] font-bold text-[#1D2522] mt-0.5">{previewChallenge.block}</div>
              </div>

              <div className="p-3 rounded-lg border border-[#EEEAE1] bg-white text-left">
                <div className="text-[11px] font-mono text-[#6B5845]">Impact Level</div>
                <div className="text-[13.5px] font-bold text-[#123B2A] mt-0.5">{previewChallenge.impactLevel}</div>
              </div>

              <div className="p-3 rounded-lg border border-[#EEEAE1] bg-white text-left col-span-2 sm:col-span-1">
                <div className="text-[11px] font-mono text-[#6B5845]">Current Status</div>
                <div className="text-[13.5px] font-bold text-[#B45309] mt-0.5">{previewChallenge.status}</div>
              </div>
            </div>

            {/* Collaborators & Contributions */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#F8F6F1] border border-[#EEEAE1] flex-wrap gap-3">
              <div className="flex items-center gap-3 text-[13px] text-[#6B5845]">
                <span className="flex items-center gap-1.5 font-bold text-[#1D2522]">
                  <Users className="h-4 w-4 text-[#123B2A]" />
                  {previewChallenge.collaboratorsCount} Active Solvers
                </span>
                <span>·</span>
                <span>{previewChallenge.ideasCount} Ideas Submitted</span>
              </div>

              <span className="text-[11px] font-mono text-[#6B5845]">
                Verified by Dept. of Higher & Tech Education
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setPreviewChallenge(null)}
                className="px-5 py-2.5 rounded-lg border border-[#EEEAE1] text-[13.5px] font-medium text-[#1D2522] hover:bg-[#F8F6F1] transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => {
                  setPreviewChallenge(null);
                  navigate('/report');
                }}
                className="px-6 py-2.5 rounded-lg bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13.5px] font-bold transition-all shadow-xs cursor-pointer"
              >
                Contribute Idea / Collaborate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
