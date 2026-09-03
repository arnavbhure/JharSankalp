import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { getChallengeDetail } from '../data/challengeDetailData';
import { DetailHero } from '../components/challenge-detail/DetailHero';
import { DetailSectionNav } from '../components/challenge-detail/DetailSectionNav';
import { ProblemStatement } from '../components/challenge-detail/ProblemStatement';
import { ImpactAtAGlance } from '../components/challenge-detail/ImpactAtAGlance';
import { EvidenceTimeline } from '../components/challenge-detail/EvidenceTimeline';
import { SolutionApproaches } from '../components/challenge-detail/SolutionApproaches';
import { CollaborationSection } from '../components/challenge-detail/CollaborationSection';
import { LifecycleProgress } from '../components/challenge-detail/LifecycleProgress';
import { ChallengeActionPanel } from '../components/challenge-detail/ChallengeActionPanel';
import { RelatedChallenges } from '../components/challenge-detail/RelatedChallenges';
import { DetailCTA } from '../components/challenge-detail/DetailCTA';
import { Footer } from '../components/layout/Footer';
import { useInnovationStore } from '../stores/innovationStore';

export function ChallengeDetail() {
  const { challengeId } = useParams<{ challengeId: string }>();
  const navigate = useNavigate();
  const challenge = useMemo(() => getChallengeDetail(challengeId), [challengeId]);

  const { isChallengeJoined, joinChallenge, isChallengeSaved, saveChallenge } = useInnovationStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isJoined = isChallengeJoined(challenge.id);
  const isSaved = isChallengeSaved(challenge.id);

  const handleOpenContributeIdea = () => {
    navigate(`/challenges/${challenge.id}/submit-idea`);
  };

  const handleOpenJoinCollaboration = () => {
    const justJoined = joinChallenge(challenge.id);
    if (justJoined) {
      setToastMessage("You've joined this challenge! Contributor status active.");
    } else {
      setToastMessage("You are an active contributor on this challenge.");
    }
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleToggleSave = () => {
    saveChallenge(challenge.id);
    setToastMessage(
      !isSaved
        ? 'Challenge saved to your dashboard bookmark queue.'
        : 'Challenge removed from your bookmarks.'
    );
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col relative">
      {/* ── Floating Notification Toast ── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#123B2A] text-white shadow-xl border border-[#1E5A3A] text-[13px] font-medium">
            <CheckCircle2 className="h-4 w-4 text-[#F5A623] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* ── Breadcrumb Bar ── */}
      <div className="border-b border-[#EEEAE1] bg-white py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[12.5px] text-[#6B5845]">
          <div className="flex items-center gap-2">
            <Link to="/challenges" className="hover:text-[#123B2A] transition-colors flex items-center gap-1 font-medium">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Challenges</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#6B5845]/50" />
            <span className="font-semibold text-[#123B2A]">{challenge.category}</span>
            <ChevronRight className="h-3.5 w-3.5 text-[#6B5845]/50" />
            <span className="font-mono text-[#6B5845] truncate max-w-[140px] sm:max-w-xs">
              {challenge.id}
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 font-mono text-[11px] text-[#6B5845]">
            {isJoined && (
              <span className="px-2 py-0.5 rounded-full bg-[#F0FDF4] text-[#15803D] font-bold border border-[#BBF7D0]">
                Joined by You ✓
              </span>
            )}
            <span className="h-2 w-2 rounded-full bg-[#15803D]" />
            <span>Case Dossier Active</span>
          </div>
        </div>
      </div>

      {/* ── 1. Challenge Editorial Hero ── */}
      <DetailHero
        challenge={challenge}
        onContributeClick={handleOpenContributeIdea}
        onJoinClick={handleOpenJoinCollaboration}
        isJoined={isJoined}
      />

      {/* ── 2. Sticky Section Sub-Navigation ── */}
      <DetailSectionNav />

      {/* ── 3. Main Case File Body with Sticky Action Sidebar ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Case Dossier Column (8 Cols on Desktop) */}
          <div className="lg:col-span-8 space-y-2">
            {/* Section 2: The Problem Analysis */}
            <ProblemStatement challenge={challenge} />

            {/* Section 3: Impact at a Glance */}
            <ImpactAtAGlance challenge={challenge} />

            {/* Section 4: Evidence & Observations Timeline */}
            <EvidenceTimeline challenge={challenge} />

            {/* Section 5: Ideas & Approaches */}
            <SolutionApproaches
              challenge={challenge}
              onProposeIdea={handleOpenContributeIdea}
            />

            {/* Section 6: Active Collaboration Coalition */}
            <CollaborationSection
              challenge={challenge}
              onJoinCollaboration={handleOpenJoinCollaboration}
            />

            {/* Section 7: Lifecycle Progress */}
            <LifecycleProgress challenge={challenge} />

            {/* Section 8: Related Challenges */}
            <RelatedChallenges currentChallengeId={challenge.id} />
          </div>

          {/* Sticky Sidebar Action Column (4 Cols on Desktop) */}
          <div className="lg:col-span-4">
            <ChallengeActionPanel
              challenge={challenge}
              onContributeIdea={handleOpenContributeIdea}
              onJoinCollaboration={handleOpenJoinCollaboration}
              isJoined={isJoined}
              isSaved={isSaved}
              onToggleSave={handleToggleSave}
            />
          </div>
        </div>
      </div>

      {/* ── 4. Bottom Editorial CTA ── */}
      <DetailCTA
        onContributeIdea={handleOpenContributeIdea}
        onJoinCollaboration={handleOpenJoinCollaboration}
      />

      {/* ── 5. Platform Standard Footer ── */}
      <Footer />
    </div>
  );
}
