import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { getChallengeDetail } from '../data/challengeDetailData';
import { fetchChallengeById } from '../services/api/challenges';
import { ChallengeDetailData } from '../types/challengeDetail';
import { DetailHero } from '../components/challenge-detail/DetailHero';
import { ChallengeEcosystemBanner } from '../components/challenge-detail/ChallengeEcosystemBanner';
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

  const [challenge, setChallenge] = useState<ChallengeDetailData>(() =>
    getChallengeDetail(challengeId)
  );

  useEffect(() => {
    let isMounted = true;
    fetchChallengeById(challengeId || '')
      .then((res) => {
        if (!isMounted) return;
        if (res && res.id) {
          setChallenge((prev) => ({
            ...prev,
            id: res.publicId || res.challengeCode || res.id,
            title: res.title || prev.title,
            category: (res.domain || prev.category) as any,
            district: res.district?.name || res.district || prev.district,
            subLocation: res.block || prev.subLocation,
            summary: res.description || prev.summary,
            status: res.status ? res.status.toUpperCase() : prev.status,
            impactPriority: `${res.priority || 'High'} Impact Priority`,
            stats: {
              collaboratorsCount: res._count?.collaborations || res.collaborations?.length || prev.stats.collaboratorsCount,
              ideasCount: res._count?.ideas || res.ideas?.length || prev.stats.ideasCount,
              followersCount: prev.stats.followersCount,
            },
            profile: {
              ...prev.profile,
              district: res.district?.name || res.district || prev.profile.district,
              focusArea: res.domain || prev.profile.focusArea,
              dateSubmitted: res.createdAt
                ? new Date(res.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : prev.profile.dateSubmitted,
              trackingId: res.publicId || res.challengeCode || prev.profile.trackingId,
            },
          }));
        }
      })
      .catch((err) => {
        console.warn('Using local fallback for challenge detail:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [challengeId]);

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
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#123B2A] text-white shadow-xl border border-[#1E5A3A] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-[#F5A623] shrink-0" />
          <span className="text-[13px] font-medium">{toastMessage}</span>
        </div>
      )}

      {/* ── Breadcrumb & Return Bar ── */}
      <nav aria-label="Breadcrumb" className="border-b border-[#EEEAE1] bg-white/70 backdrop-blur-xs sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[12.5px] font-mono text-[#6B5845]">
            <Link to="/" className="hover:text-[#123B2A] transition-colors">
              JharSankalp
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#6B5845]/50" />
            <Link to="/challenges" className="hover:text-[#123B2A] transition-colors">
              Challenges
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#6B5845]/50" />
            <span className="text-[#123B2A] font-bold truncate max-w-[200px] sm:max-w-xs">
              {challenge.title}
            </span>
          </div>

          <Link
            to="/challenges"
            className="inline-flex items-center gap-1.5 text-[12px] font-mono font-bold text-[#123B2A] hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Explorer</span>
          </Link>
        </div>
      </nav>

      {/* ── Section 1: Detail Hero ── */}
      <DetailHero
        challenge={challenge}
        onContributeClick={handleOpenContributeIdea}
        onJoinClick={handleOpenJoinCollaboration}
        isJoined={isJoined}
      />

      {/* ── Connected Innovation Pipeline Banner ── */}
      <ChallengeEcosystemBanner challengeId={challenge.id} />

      {/* ── Section 2: Sticky Section Anchor Navigation ── */}
      <DetailSectionNav />

      {/* ── Main Detail Grid Layout ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Left Narrative & Detail Column (8 Cols) ── */}
          <div className="lg:col-span-8 space-y-10">
            {/* Section 3: Problem Statement */}
            <ProblemStatement challenge={challenge} />

            {/* Section 4: Impact at a Glance */}
            <ImpactAtAGlance challenge={challenge} />

            {/* Section 5: Timeline & Community Evidence */}
            <EvidenceTimeline challenge={challenge} />

            {/* Section 6: Solution Approaches & Active Ideas */}
            <SolutionApproaches challenge={challenge} onProposeIdea={handleOpenContributeIdea} />

            {/* Section 7: Collaboration Space & Partner Roster */}
            <CollaborationSection
              challenge={challenge}
              onJoinCollaboration={handleOpenJoinCollaboration}
            />

            {/* Section 8: Lifecycle Progress */}
            <LifecycleProgress challenge={challenge} />

            {/* Section 10: Related Challenges */}
            <RelatedChallenges currentCategory={challenge.category} currentId={challenge.id} />
          </div>

          {/* ── Right Fixed Action & Metadata Panel (4 Cols) ── */}
          <aside className="lg:col-span-4 sticky top-20 space-y-6">
            {/* Section 9: Contextual Action Box */}
            <ChallengeActionPanel
              challenge={challenge}
              isJoined={isJoined}
              isSaved={isSaved}
              onContributeIdea={handleOpenContributeIdea}
              onJoinCollaboration={handleOpenJoinCollaboration}
              onToggleSave={handleToggleSave}
            />
          </aside>
        </div>

        {/* ── Section 11: Call to Action Banner ── */}
        <div className="mt-14">
          <DetailCTA
            onContributeIdea={handleOpenContributeIdea}
            onJoinCollaboration={handleOpenJoinCollaboration}
          />
        </div>
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
