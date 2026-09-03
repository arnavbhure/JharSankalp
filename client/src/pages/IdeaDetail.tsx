import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getIdeaDetail } from '../data/ideaDetailData';
import { IdeaDetail as IdeaDetailType, CollaborationOpportunity } from '../types/ideaDetail';
import { IdeaDetailHero } from '../components/idea-detail/IdeaDetailHero';
import { IdeaStickyNav } from '../components/idea-detail/IdeaStickyNav';
import { RelatedChallengePanel } from '../components/idea-detail/RelatedChallengePanel';
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

export function IdeaDetail() {
  const { ideaId } = useParams<{ ideaId: string }>();
  const [idea, setIdea] = useState<IdeaDetailType>(getIdeaDetail(ideaId));
  const [isContributionOpen, setIsContributionOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState<CollaborationOpportunity | null>(null);

  useEffect(() => {
    setIdea(getIdeaDetail(ideaId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [ideaId]);

  const handleOpenContribute = (need?: CollaborationOpportunity) => {
    setSelectedNeed(need || null);
    setIsContributionOpen(true);
  };

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col">
      {/* ── Editorial Hero ── */}
      <IdeaDetailHero
        idea={idea}
        onContributeClick={() => handleOpenContribute()}
      />

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
            <IdeaContextSidebar
              idea={idea}
              onContributeClick={() => handleOpenContribute()}
            />
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
