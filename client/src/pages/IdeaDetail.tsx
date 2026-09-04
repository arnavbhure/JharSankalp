import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchIdeaById, mapDbIdeaToDetail } from '../services/api/ideas';
import { IdeaDetail as IdeaDetailType, CollaborationOpportunity } from '../types/ideaDetail';
import { IdeaDetailHero } from '../components/idea-detail/IdeaDetailHero';
import { IdeaStickyNav } from '../components/idea-detail/IdeaStickyNav';
import { RelatedChallengePanel } from '../components/idea-detail/RelatedChallengePanel';
import { GraduatedProjectBanner } from '../components/idea-detail/GraduatedProjectBanner';
import { ProposedApproach } from '../components/idea-detail/ProposedApproach';
import { HowItWorksFlow } from '../components/idea-detail/HowItWorksFlow';
import { IdeaStageProgress } from '../components/idea-detail/IdeaStageProgress';
import { DevelopmentTimeline } from '../components/idea-detail/DevelopmentTimeline';
import { ContributorList } from '../components/idea-detail/ContributorList';
import { IdeaCollaborationNeeds } from '../components/idea-detail/IdeaCollaborationNeeds';
import { IdeaContextSidebar } from '../components/idea-detail/IdeaContextSidebar';
import { RelatedIdeas } from '../components/idea-detail/RelatedIdeas';
import { ContributionDialog } from '../components/idea-detail/ContributionDialog';
import { Footer } from '../components/layout/Footer';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

export function IdeaDetail() {
  const { ideaId } = useParams<{ ideaId: string }>();
  const [idea, setIdea] = useState<IdeaDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isContributionOpen, setIsContributionOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState<CollaborationOpportunity | null>(null);

  useEffect(() => {
    async function loadDetail() {
      if (!ideaId) return;
      setLoading(true);
      setError(null);
      try {
        const raw = await fetchIdeaById(ideaId);
        if (raw) {
          setIdea(mapDbIdeaToDetail(raw));
        } else {
          setError('Idea record could not be found.');
        }
      } catch (err: any) {
        console.error('Failed to load idea detail:', err);
        setError(err?.response?.data?.message || 'Failed to load idea from database.');
      } finally {
        setLoading(false);
      }
    }
    loadDetail();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [ideaId]);

  const handleOpenContribute = (need?: CollaborationOpportunity) => {
    setSelectedNeed(need || null);
    setIsContributionOpen(true);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F8F6F1] flex flex-col justify-between">
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4">
          <Loader2 className="w-10 h-10 text-[#123B2A] animate-spin" />
          <p className="text-[#6B5845] font-mono text-sm">Loading solution idea details from JharSankalp database...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !idea) {
    return (
      <div className="w-full min-h-screen bg-[#F8F6F1] flex flex-col justify-between">
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4 text-center max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 text-[#BE123C]" />
          <h2 className="text-xl font-bold text-[#1D2522]">Idea Record Not Found</h2>
          <p className="text-sm text-[#6B5845]">{error || 'The requested idea does not exist in the database or has been moved.'}</p>
          <Link
            to="/ideas"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#123B2A] text-white font-medium text-sm hover:bg-[#1E5A3A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Ideas Catalog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col">
      {/* ── Editorial Hero ── */}
      <IdeaDetailHero idea={idea} onContributeClick={() => handleOpenContribute()} />

      {/* ── Compact Sticky Sub-Navigation ── */}
      <IdeaStickyNav
        stageLabel={idea.stageLabel}
        onContributeClick={() => handleOpenContribute()}
      />

      {/* ── Main Workspace Body ── */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ── Left Editorial Column (8 Columns) ── */}
          <div className="lg:col-span-8 space-y-14">
            {/* Ecosystem Graduation Banner (if linked to active project) */}
            <GraduatedProjectBanner ideaId={idea.id} />

            {/* Section 1: The Challenge Behind the Idea */}
            <RelatedChallengePanel challenge={idea.parentChallenge} />

            {/* Section 2: The Proposed Approach */}
            <ProposedApproach approach={idea.proposedApproach} />

            {/* Section 3: How It Works Technical Architecture */}
            <HowItWorksFlow steps={idea.workflowSteps} />

            {/* Section 4: Current Development Stage */}
            <IdeaStageProgress
              currentStage={idea.stage}
              currentFocus={idea.currentFocus}
              nextMilestone={idea.nextMilestone}
            />

            {/* Section 5: Development Activity Timeline */}
            <DevelopmentTimeline milestones={idea.milestones} />

            {/* Section 6: Contributors */}
            <ContributorList contributors={idea.contributors} />

            {/* Section 7: Collaboration Needs */}
            <IdeaCollaborationNeeds
              needs={idea.collaborationNeeds}
              onOfferSupport={handleOpenContribute}
            />

            {/* Section 9: Related Ideas */}
            <RelatedIdeas ideas={idea.relatedIdeas} />
          </div>

          {/* ── Right Column: Sticky Context Sidebar (4 Columns) ── */}
          <div className="lg:col-span-4">
            <IdeaContextSidebar idea={idea} onContributeClick={() => handleOpenContribute()} />
          </div>
        </div>
      </main>

      {/* ── Contribution Request Dialog ── */}
      <ContributionDialog
        isOpen={isContributionOpen}
        onClose={() => setIsContributionOpen(false)}
        ideaTitle={idea.title}
        preselectedNeed={selectedNeed}
      />

      {/* ── Platform Footer ── */}
      <Footer />
    </div>
  );
}
