import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IdeasHero } from '../components/ideas/IdeasHero';
import { IdeaFilters } from '../components/ideas/IdeaFilters';
import { FeaturedIdea } from '../components/ideas/FeaturedIdea';
import { IdeaCard } from '../components/ideas/IdeaCard';
import { IdeasCTA } from '../components/ideas/IdeasCTA';
import { SubmitIdeaModal } from '../components/ideas/SubmitIdeaModal';
import { Footer } from '../components/layout/Footer';
import { CommunityIdea } from '../types/ideas';
import { fetchIdeas } from '../services/api/ideas';
import { useInnovationStore } from '../stores/innovationStore';
import { CheckCircle2, Bookmark, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export function Ideas() {
  const navigate = useNavigate();
  const { submitIdea } = useInnovationStore();

  const [ideas, setIdeas] = useState<CommunityIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters State
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Focus Areas');
  const [district, setDistrict] = useState('All Districts');
  const [status, setStatus] = useState('All Statuses');
  const [sortBy, setSortBy] = useState('most_supported');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadIdeas = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchIdeas({
        domain: category,
        district,
        status,
      });
      setIdeas(data || []);
    } catch (err: any) {
      setError(err?.message || 'Unable to connect to JharSankalp database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIdeas();
  }, [category, district, status]);

  // Featured Idea
  const featuredIdea = useMemo(() => ideas[0] || null, [ideas]);

  // Filter & Sort Logic
  const filteredIdeas = useMemo(() => {
    let list = [...ideas];

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.district.toLowerCase().includes(q) ||
          i.focusArea.toLowerCase().includes(q) ||
          (i.linkedChallenge && i.linkedChallenge.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'most_supported') {
      list.sort((a, b) => b.supportersCount - a.supportersCount);
    } else if (sortBy === 'contributors') {
      list.sort((a, b) => b.contributorsCount - a.contributorsCount);
    } else if (sortBy === 'recent') {
      list.sort(
        (a, b) =>
          new Date(b.submittedDate).getTime() -
          new Date(a.submittedDate).getTime()
      );
    }

    return list;
  }, [ideas, search, sortBy]);

  const hasActiveFilters =
    search.trim() !== '' ||
    category !== 'All Focus Areas' ||
    district !== 'All Districts' ||
    status !== 'All Statuses';

  const handleClearFilters = () => {
    setSearch('');
    setCategory('All Focus Areas');
    setDistrict('All Districts');
    setStatus('All Statuses');
    setSortBy('most_supported');
  };

  const handleModalSubmit = (
    newIdeaData: Omit<
      CommunityIdea,
      'id' | 'supportersCount' | 'contributorsCount' | 'status' | 'submittedDate'
    >
  ) => {
    submitIdea({
      challengeId: 'JS-2026-00024',
      challengeTitle: newIdeaData.linkedChallenge || 'Autonomous Community Submission',
      district: newIdeaData.district,
      focusArea: newIdeaData.focusArea,
      title: newIdeaData.title,
      summary: newIdeaData.description,
      description: newIdeaData.description,
      problemPart: 'Community reporting and response latency',
      expectedImpact: 'Immediate turnaround and service continuity',
      beneficiaries: 'Rural residents and farmers',
      approach: newIdeaData.description,
      resources: 'Local materials and hardware',
      complexity: 'Medium',
      seekingCollaborators: true,
      collaborationNeeds: ['Hardware', 'Field Testing'],
      authorName: newIdeaData.author,
    });

    const createdIdea: CommunityIdea = {
      id: `IDEA-${Date.now()}`,
      title: newIdeaData.title,
      description: newIdeaData.description,
      focusArea: newIdeaData.focusArea,
      district: newIdeaData.district,
      author: newIdeaData.author,
      supportersCount: 1,
      contributorsCount: 1,
      status: 'New',
      submittedDate: 'Just now',
      isSupported: true,
      linkedChallenge: newIdeaData.linkedChallenge,
    };

    setIdeas((prev) => [createdIdea, ...prev]);

    setToastMessage(`Idea "${newIdeaData.title}" submitted to JharSankalp review pipeline!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col justify-between relative">
      {/* ── Toast Notification ── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#123B2A] text-white shadow-xl border border-[#1E5A3A] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-[#F5A623] shrink-0" />
          <span className="text-[13px] font-medium">{toastMessage}</span>
        </div>
      )}

      <div>
        {/* ── Page Hero ── */}
        <IdeasHero onOpenSubmitModal={() => setModalOpen(true)} />

        {/* ── Main Content Area ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
          {/* ── Featured Idea Section ── */}
          {!hasActiveFilters && featuredIdea && (
            <FeaturedIdea
              idea={featuredIdea}
              onViewDetails={() => {
                if (featuredIdea.linkedChallengeId) {
                  navigate(`/challenges/${featuredIdea.linkedChallengeId}`);
                }
              }}
            />
          )}

          {/* ── Filters & Search Controls ── */}
          <IdeaFilters
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            district={district}
            onDistrictChange={setDistrict}
            status={status}
            onStatusChange={setStatus}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            totalCount={filteredIdeas.length}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={handleClearFilters}
          />

          {/* ── Loading State ── */}
          {loading && (
            <div className="py-20 text-center rounded-3xl bg-white border border-[#EEEAE1] p-8 space-y-3">
              <Loader2 className="h-8 w-8 text-[#123B2A] animate-spin mx-auto" />
              <p className="text-[13.5px] font-mono text-[#6B5845]">
                Retrieving community ideas from JharSankalp database...
              </p>
            </div>
          )}

          {/* ── Error State with Retry ── */}
          {!loading && error && (
            <div className="py-16 text-center rounded-3xl bg-[#FFF5F5] border border-[#FECDD3] p-8 space-y-3">
              <AlertCircle className="h-8 w-8 text-[#BE123C] mx-auto" />
              <h4 className="text-[1.1rem] font-bold text-[#BE123C]">
                Unable to load community ideas
              </h4>
              <p className="text-[13px] text-[#6B5845] max-w-md mx-auto">
                {error}
              </p>
              <button
                type="button"
                onClick={loadIdeas}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#BE123C] text-white text-[12.5px] font-bold cursor-pointer hover:bg-[#9F1239]"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Retry</span>
              </button>
            </div>
          )}

          {/* ── Ideas Grid ── */}
          {!loading && !error && (
            <div className="space-y-4">
              {filteredIdeas.length === 0 ? (
                <div className="py-16 text-center rounded-3xl bg-white border border-[#EEEAE1] p-8 space-y-3">
                  <Bookmark className="h-8 w-8 text-[#6B5845] mx-auto opacity-50" />
                  <h4 className="text-[1.15rem] font-bold text-[#1D2522]">
                    No ideas match your current filter criteria
                  </h4>
                  <p className="text-[13px] text-[#6B5845] max-w-sm mx-auto">
                    Try clearing or widening your category, district, or search filters to see more community proposals.
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
                  {filteredIdeas.map((idea) => (
                    <IdeaCard key={idea.id} idea={idea} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Bottom Call To Action ── */}
          <IdeasCTA onOpenSubmitModal={() => setModalOpen(true)} />
        </div>
      </div>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Submit Idea Modal ── */}
      <SubmitIdeaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmitIdea={handleModalSubmit}
      />
    </div>
  );
}
