import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IdeasHero } from '../components/ideas/IdeasHero';
import { IdeaFilters } from '../components/ideas/IdeaFilters';
import { FeaturedIdea } from '../components/ideas/FeaturedIdea';
import { IdeaCard } from '../components/ideas/IdeaCard';
import { IdeasCTA } from '../components/ideas/IdeasCTA';
import { SubmitIdeaModal } from '../components/ideas/SubmitIdeaModal';
import { Footer } from '../components/layout/Footer';
import {
  FEATURED_COMMUNITY_IDEA,
  INITIAL_COMMUNITY_IDEAS,
} from '../data/communityIdeasData';
import { CommunityIdea } from '../types/ideas';
import { useInnovationStore } from '../stores/innovationStore';
import { CheckCircle2, Bookmark } from 'lucide-react';

export function Ideas() {
  const navigate = useNavigate();
  const { submitIdea } = useInnovationStore();

  const [ideas, setIdeas] = useState<CommunityIdea[]>(INITIAL_COMMUNITY_IDEAS);
  const [featuredIdea] = useState<CommunityIdea>(FEATURED_COMMUNITY_IDEA);

  // Filters State
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Focus Areas');
  const [district, setDistrict] = useState('All Districts');
  const [status, setStatus] = useState('All Statuses');
  const [sortBy, setSortBy] = useState('most_supported');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

    // Category
    if (category !== 'All Focus Areas') {
      list = list.filter(
        (i) => i.focusArea.toLowerCase() === category.toLowerCase()
      );
    }

    // District
    if (district !== 'All Districts') {
      list = list.filter(
        (i) => i.district.toLowerCase() === district.toLowerCase()
      );
    }

    // Status
    if (status !== 'All Statuses') {
      list = list.filter(
        (i) => i.status.toLowerCase() === status.toLowerCase()
      );
    }

    // Sorting
    if (sortBy === 'most_supported') {
      list.sort((a, b) => b.supportersCount - a.supportersCount);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => b.id.localeCompare(a.id));
    } else if (sortBy === 'in_development') {
      list.sort((a, b) => (b.status === 'In Development' ? 1 : 0) - (a.status === 'In Development' ? 1 : 0));
    }

    return list;
  }, [ideas, search, category, district, status, sortBy]);

  const hasActiveFilters =
    search.trim() !== '' ||
    category !== 'All Focus Areas' ||
    district !== 'All Districts' ||
    status !== 'All Statuses' ||
    sortBy !== 'most_supported';

  const handleClearFilters = () => {
    setSearch('');
    setCategory('All Focus Areas');
    setDistrict('All Districts');
    setStatus('All Statuses');
    setSortBy('most_supported');
  };

  // Support toggle handler
  const handleSupportToggle = (id: string, isSupported: boolean) => {
    setIdeas((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isSupported,
            supportersCount: isSupported
              ? item.supportersCount + 1
              : item.supportersCount - 1,
          };
        }
        return item;
      })
    );

    setToastMessage(
      isSupported
        ? 'Thank you! Your community support has been recorded.'
        : 'Support withdrawn.'
    );
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Submit idea handler from modal
  const handleCreateIdea = (
    newIdeaData: Omit<
      CommunityIdea,
      'id' | 'supportersCount' | 'contributorsCount' | 'status' | 'submittedDate'
    >
  ) => {
    const id = `IDEA-COMM-${Date.now().toString().slice(-4)}`;
    const newCommunityIdea: CommunityIdea = {
      id,
      title: newIdeaData.title,
      description: newIdeaData.description,
      focusArea: newIdeaData.focusArea,
      district: newIdeaData.district,
      author: newIdeaData.author || 'Citizen Innovator',
      supportersCount: 1,
      contributorsCount: 1,
      status: 'New',
      submittedDate: 'Just now',
      isSupported: true,
      linkedChallenge: newIdeaData.linkedChallenge || 'General Civic Challenge',
    };

    // Add to local state at the top
    setIdeas((prev) => [newCommunityIdea, ...prev]);

    // Also register into innovationStore so it reflects on Dashboard Ideas
    submitIdea({
      challengeId: 'JS-2026-COMMUNITY',
      challengeTitle: newIdeaData.linkedChallenge || 'Community Innovation Call',
      district: newIdeaData.district,
      focusArea: newIdeaData.focusArea,
      title: newIdeaData.title,
      summary: newIdeaData.description.slice(0, 120),
      description: newIdeaData.description,
      problemPart: newIdeaData.linkedChallenge || 'Community Observation',
      expectedImpact: 'Community verified grassroots innovation',
      beneficiaries: `Citizens of ${newIdeaData.district} district`,
      approach: 'Community co-creation & prototyping',
      resources: 'Local materials & peer participation',
      complexity: 'Medium',
      seekingCollaborators: true,
      collaborationNeeds: ['Technical Expertise', 'Community Partners'],
      authorName: newIdeaData.author,
    });

    setToastMessage('Your idea has been published to the community grid!');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenExplainer = () => {
    setToastMessage(
      'Ideas progress from Community Support → Review → Consortium Sprint → Pilot Testbed.'
    );
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col justify-between relative">
      {/* ── Floating Notification Toast ── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#123B2A] text-white shadow-xl border border-[#1E5A3A] text-[13px] font-medium">
            <CheckCircle2 className="h-4 w-4 text-[#F5A623] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <div>
        {/* ── 1. Ideas Hero Section ── */}
        <IdeasHero onOpenSubmitModal={() => setModalOpen(true)} />

        {/* ── Main Discovery Content Area ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
          {/* ── 2. Discovery Search & Filters ── */}
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
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
          />

          {/* ── 3. Featured Idea Section ── */}
          {!hasActiveFilters && (
            <FeaturedIdea
              idea={featuredIdea}
              onViewDetails={() => navigate('/ideas/idea-water-pump-monitoring')}
            />
          )}

          {/* ── 4. Responsive Idea Cards Grid ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
              <div className="space-y-0.5">
                <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                  GRASSROOTS INNOVATIONS
                </span>
                <h3 className="text-[1.3rem] font-bold text-[#1D2522]">
                  Explore Solution Ideas ({filteredIdeas.length})
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="text-[12.5px] font-bold text-[#123B2A] hover:underline cursor-pointer"
              >
                + Submit An Idea
              </button>
            </div>

            {filteredIdeas.length === 0 ? (
              <div className="py-16 text-center rounded-3xl bg-white border border-[#EEEAE1] p-8 space-y-3">
                <Bookmark className="h-8 w-8 text-[#6B5845] mx-auto opacity-50" />
                <h4 className="text-[1.15rem] font-bold text-[#1D2522]">
                  No ideas match your filter criteria
                </h4>
                <p className="text-[13px] text-[#6B5845] max-w-sm mx-auto">
                  Try adjusting your search terms or clearing the selected district and status filters.
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
                  <IdeaCard
                    key={idea.id}
                    idea={idea}
                    onSupportToggle={handleSupportToggle}
                    onSelect={() => navigate('/ideas/idea-water-pump-monitoring')}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── 5. Bottom Call to Action Section ── */}
          <IdeasCTA
            onOpenSubmitModal={() => setModalOpen(true)}
            onOpenExplainer={handleOpenExplainer}
          />
        </div>
      </div>

      {/* ── 6. Platform Standard Footer ── */}
      <Footer />

      {/* ── 7. Submit Idea Modal ── */}
      <SubmitIdeaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmitIdea={handleCreateIdea}
      />
    </div>
  );
}
