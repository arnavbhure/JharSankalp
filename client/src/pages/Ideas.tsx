import { useState, useEffect, useMemo } from 'react';
import { IdeaItem, IdeaFilterState, IdeaStatsData } from '../types/ideas';
import {
  getIdeas,
  getFeaturedIdea,
  getIdeasStats,
  submitIdea,
  joinIdeaTeam,
} from '../services/ideasApi';
import { IdeasHero } from '../components/ideas/IdeasHero';
import { IdeaStats } from '../components/ideas/IdeaStats';
import { FeaturedIdea } from '../components/ideas/FeaturedIdea';
import { IdeaFilters } from '../components/ideas/IdeaFilters';
import { IdeaCard } from '../components/ideas/IdeaCard';
import { LookingForHelp } from '../components/ideas/LookingForHelp';
import { IdeasCTA } from '../components/ideas/IdeasCTA';
import { IdeasEmptyState } from '../components/ideas/IdeasEmptyState';
import { IdeaModal, IdeaModalMode } from '../components/ideas/IdeaModal';
import { Footer } from '../components/layout/Footer';

const INITIAL_FILTERS: IdeaFilterState = {
  search: '',
  category: 'All Focus Areas',
  stage: 'All Stages',
  district: 'All Districts',
  status: 'All Statuses',
};

export function Ideas() {
  const [ideas, setIdeas] = useState<IdeaItem[]>([]);
  const [featuredIdea, setFeaturedIdea] = useState<IdeaItem | null>(null);
  const [stats, setStats] = useState<IdeaStatsData>({
    totalIdeas: 86,
    activeCollaborations: 42,
    prototypesInDevelopment: 18,
    fieldPilots: 7,
  });

  const [filters, setFilters] = useState<IdeaFilterState>(INITIAL_FILTERS);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<IdeaModalMode>('SHARE');
  const [selectedIdea, setSelectedIdea] = useState<IdeaItem | null>(null);

  // Pagination count
  const [visibleCount, setVisibleCount] = useState(6);

  const loadData = async () => {
    try {
      const [ideasData, featData, statsData] = await Promise.all([
        getIdeas(filters),
        getFeaturedIdea(),
        getIdeasStats(),
      ]);
      setIdeas(ideasData);
      setFeaturedIdea(featData);
      setStats(statsData);
    } catch (err) {
      console.error('Failed to load ideas data', err);
    }
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  const handleFilterChange = (updates: Partial<IdeaFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
    setVisibleCount(6);
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setVisibleCount(6);
  };

  // Actions
  const handleOpenShare = () => {
    setModalMode('SHARE');
    setSelectedIdea(null);
    setModalOpen(true);
  };

  const handleOpenJoin = (idea: IdeaItem) => {
    setSelectedIdea(idea);
    setModalMode('JOIN');
    setModalOpen(true);
  };

  const handleOpenView = (idea: IdeaItem) => {
    setSelectedIdea(idea);
    setModalMode('VIEW');
    setModalOpen(true);
  };

  const handleShareSubmit = async (newIdea: Partial<IdeaItem>) => {
    await submitIdea(newIdea);
    await loadData();
  };

  const handleJoinSubmit = async (
    ideaId: string,
    applicant: { name: string; role: string; message: string }
  ) => {
    await joinIdeaTeam(ideaId, applicant);
    await loadData();
  };

  const visibleIdeas = useMemo(() => {
    return ideas.slice(0, visibleCount);
  }, [ideas, visibleCount]);

  const hasMore = visibleCount < ideas.length;

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col">
      {/* ── Page Hero ── */}
      <IdeasHero onShareIdeaClick={handleOpenShare} />

      {/* ── Editorial Stats Strip ── */}
      <IdeaStats stats={stats} />

      {/* ── Large Featured Idea Spotlight ── */}
      {featuredIdea && (
        <FeaturedIdea
          idea={featuredIdea}
          onJoinTeamClick={handleOpenJoin}
          onViewIdeaClick={handleOpenView}
        />
      )}

      {/* ── Main Ideas Discovery Section ── */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full space-y-10">
        {/* Section Header & Filters */}
        <div className="space-y-6">
          <div className="border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="text-[1.75rem] sm:text-[2.1rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
                Explore Ideas & Approaches
              </h2>
              <p className="text-[13.5px] text-[#6B5845] mt-0.5">
                Technical proposals and research hypotheses open for cross-disciplinary collaboration
              </p>
            </div>
          </div>

          <IdeaFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
            totalResults={ideas.length}
          />
        </div>

        {/* ── Ideas Cards Grid or Empty State ── */}
        {ideas.length > 0 ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleIdeas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  onViewIdea={handleOpenView}
                  onJoinTeam={handleOpenJoin}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#123B2A] bg-white hover:bg-[#FAF9F5] text-[#123B2A] px-7 py-3 text-[14px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Load More Ideas ({ideas.length - visibleCount} remaining)</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <IdeasEmptyState onShareIdea={handleOpenShare} />
        )}
      </main>

      {/* ── Looking for Help / Capability Callouts Section ── */}
      <LookingForHelp onJoinTeam={handleOpenJoin} ideas={ideas} />

      {/* ── Bottom Call to Action ── */}
      <IdeasCTA onShareIdea={handleOpenShare} />

      {/* ── Interactive Idea Modal (Share / Join / View) ── */}
      <IdeaModal
        isOpen={modalOpen}
        mode={modalMode}
        idea={selectedIdea}
        onClose={() => setModalOpen(false)}
        onShareSubmit={handleShareSubmit}
        onJoinSubmit={handleJoinSubmit}
      />

      {/* ── Institutional Footer ── */}
      <Footer />
    </div>
  );
}
