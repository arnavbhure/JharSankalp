import { useAuth } from '../hooks/useAuth';
import { Hero } from '../components/landing/Hero';
import { ImpactStats } from '../components/landing/ImpactStats';
import { ChallengeJourney } from '../components/landing/ChallengeJourney';
import { InnovationMap } from '../components/landing/InnovationMap';
import { ActiveChallengeFeed } from '../components/landing/ActiveChallengeFeed';
import { EcosystemDiagram } from '../components/landing/EcosystemDiagram';
import { ImpactStories } from '../components/landing/ImpactStories';
import { Button } from '../components/ui/Button';
import { ShieldCheck, ArrowRight } from 'lucide-react';
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
    <div className="w-full text-left">
      {/* ── Section 1: Editorial Hero (55% narrative / 45% contextual photo + pins) ── */}
      <Hero />

      {/* ── Section 2: Jharkhand in Numbers (Deep Purple solid band) ── */}
      <ImpactStats />

      {/* ── Section 3: The Challenge-to-Impact Loop (Horizontal process) ── */}
      <ChallengeJourney />

      {/* ── Section 4: Innovation Map (Interactive SVG Jharkhand map & drawer) ── */}
      <InnovationMap />

      {/* ── Section 5: Active Challenges (Asymmetric editorial feed) ── */}
      <ActiveChallengeFeed />

      {/* ── Section 6: Ecosystem Collaboration (4-forces diagram) ── */}
      <EcosystemDiagram />

      {/* ── Section 7: Ground Impact Stories (Khunti water pump pilot) ── */}
      <ImpactStories />

      {/* ── Section 8: Government Decision CTA Strip ── */}
      <section className="bg-brand-purple text-neutral-0 py-12 border-t border-brand-purple-hover">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-caption font-mono uppercase text-brand-apricot font-semibold">
              <ShieldCheck className="h-4 w-4 text-brand-coral" />
              <span>Public Stewardship & State Triage</span>
            </div>
            <h3 className="text-h2 font-bold text-neutral-0 tracking-tight">
              Are you a state official, district officer, or university admin?
            </h3>
            <p className="text-small text-neutral-0/75 leading-relaxed">
              Access the administrative triage portal to validate citizen problem reports, monitor
              university-industry consortia, and authorize state challenge grants.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="attention"
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
              onClick={() => navigate('/government')}
            >
              Open State Triage
            </Button>
          </div>
        </div>
      </section>

      {/* ── Institutional Footer ── */}
      <footer className="border-t border-neutral-200 bg-neutral-100 py-8 text-neutral-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-caption">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-semibold text-neutral-800">JharSankalp</span>
            <span className="hidden sm:inline text-neutral-300">|</span>
            <span>Government of Jharkhand · Dept. of Higher & Technical Education</span>
          </div>
          <div className="text-neutral-400 font-mono text-[11px]">
            Smart India Hackathon 2024 · Problem Statement ID: 26043
          </div>
        </div>
      </footer>
    </div>
  );
}
