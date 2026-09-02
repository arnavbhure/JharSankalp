import { useAuth } from '../hooks/useAuth';
import { Hero } from '../components/landing/Hero';
import { StatsStrip } from '../components/landing/StatsStrip';
import { FocusAreas } from '../components/landing/FocusAreas';
import { ChallengeJourney } from '../components/landing/ChallengeJourney';
import { InnovationMap } from '../components/landing/InnovationMap';
import { ActiveChallengeFeed } from '../components/landing/ActiveChallengeFeed';
import { EcosystemDiagram } from '../components/landing/EcosystemDiagram';
import { DarkImpactSection } from '../components/landing/DarkImpactSection';
import { ImpactStories } from '../components/landing/ImpactStories';
import { FinalCTA } from '../components/landing/FinalCTA';
import { useNavigate } from 'react-router-dom';

export function Landing() {
  const { isGovernment, isUniversity, isIndustry } = useAuth();
  const navigate = useNavigate();

  // If already authenticated with government/university/industry role, direct to their dedicated workspace
  if (isGovernment) {
    navigate('/government');
    return null;
  }
  if (isUniversity) {
    navigate('/university');
    return null;
  }
  if (isIndustry) {
    navigate('/industry');
    return null;
  }

  return (
    <div className="w-full text-left bg-[#FCFAF6] text-neutral-900 font-sans">
      {/* ── 1. Hero Section (with organic brush waterfall image & floating cards) ── */}
      <Hero />

      {/* ── 2. Impact Statistics Floating Strip (250+ Challenges, 1.2K+ Solvers) ── */}
      <StatsStrip />

      {/* ── 3. Focus Areas ("What's important to Jharkhand?" Pastel domain tiles) ── */}
      <FocusAreas />

      {/* ── 4. The Challenge-to-Impact Loop (Connected 6-stage lifecycle) ── */}
      <ChallengeJourney />

      {/* ── 5. Innovation Map ("Challenges don't exist in isolation") ── */}
      <InnovationMap />

      {/* ── 6. Active Challenges (Asymmetric editorial feed with spotlight card) ── */}
      <ActiveChallengeFeed />

      {/* ── 7. Ecosystem Collaboration (4-forces diagram: Citizens, Govt, Uni, Industry) ── */}
      <EcosystemDiagram />

      {/* ── 8. Dark Impact Section (Full-bleed Deep Forest Green with circular metrics) ── */}
      <DarkImpactSection />

      {/* ── 9. Ground Impact Stories (Khunti water pump pilot field narrative) ── */}
      <ImpactStories />

      {/* ── 10. Final CTA ("Be the change Jharkhand needs" featuring PNG asset) ── */}
      <FinalCTA />

      {/* ── Institutional Footer ── */}
      <footer className="border-t border-neutral-200/80 bg-white py-8 text-neutral-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-caption">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-extrabold text-[#163D2B] text-small">JharSankalp</span>
            <span className="hidden sm:inline text-neutral-300">|</span>
            <span>Government of Jharkhand · Dept. of Higher & Technical Education</span>
          </div>
          <div className="text-neutral-400 font-mono text-[11px]">
            Smart India Hackathon 2026 · Problem Statement ID: 26043
          </div>
        </div>
      </footer>
    </div>
  );
}
