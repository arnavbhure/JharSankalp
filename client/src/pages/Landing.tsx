import { Hero } from '../components/landing/Hero';
import { StatsStrip } from '../components/landing/StatsStrip';
import { FocusAreas } from '../components/landing/FocusAreas';
import { DarkImpactSection } from '../components/landing/DarkImpactSection';
import { ChallengeJourney } from '../components/landing/ChallengeJourney';
import { ActiveChallengeFeed } from '../components/landing/ActiveChallengeFeed';
import { EcosystemDiagram } from '../components/landing/EcosystemDiagram';
import { FinalCTA } from '../components/landing/FinalCTA';
import { Footer } from '../components/layout/Footer';

export function Landing() {
  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans">
      {/* ── 1. Hero Section (with authentic Landing page frame.png illustration) ── */}
      <Hero />

      {/* ── 2. Impact Statistics Floating Strip (250+ Challenges, 1.2K+ Solvers) ── */}
      <StatsStrip />

      {/* ── 3. Focus Areas ("What's important to Jharkhand?" Clean Ivory Domain Tiles) ── */}
      <FocusAreas />

      {/* ── 4. Challenge to Impact (Full-bleed Deep Forest Green with Circular Metrics) ── */}
      <DarkImpactSection />

      {/* ── 5. The Innovation Lifecycle (Connected 5-stage Challenge to Impact Loop) ── */}
      <ChallengeJourney />

      {/* ── 6. Featured Civic Challenges (Authentic Problem Dossiers with Collaborators) ── */}
      <ActiveChallengeFeed />

      {/* ── 7. Ecosystem Collaboration (4-forces: Citizens, Govt, Uni, Industry) ── */}
      <EcosystemDiagram />

      {/* ── 8. Final CTA ("Be the change Jharkhand needs" featuring Transparent PNG Asset) ── */}
      <FinalCTA />

      {/* ── 9. Institutional Deep Forest Green Footer ── */}
      <Footer />
    </div>
  );
}
