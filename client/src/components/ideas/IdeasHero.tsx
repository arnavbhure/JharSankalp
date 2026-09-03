import { useNavigate } from 'react-router-dom';
import { ArrowRight, Compass, Plus, GitBranch, Target, Users, Zap, Layers } from 'lucide-react';

interface IdeasHeroProps {
  onShareIdeaClick: () => void;
}

export function IdeasHero({ onShareIdeaClick }: IdeasHeroProps) {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden border-b border-[#EEEAE1] bg-[#F8F6F1] py-14 sm:py-20 text-left">
      {/* Subtle Background Geodetic Grid Accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#123B2A08_1px,transparent_1px),linear-gradient(to_bottom,#123B2A08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* ── Left Column: Editorial Copy ── */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#123B2A] font-bold">
              <span className="h-2 w-2 rounded-full bg-[#F5A623] animate-pulse" />
              <span>OPEN INNOVATION MARKETPLACE</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-[2.6rem] sm:text-[3.2rem] lg:text-[3.6rem] font-extrabold text-[#1D2522] tracking-tight leading-[1.08] font-sans">
              Ideas can come from anywhere. <br />
              <span className="text-[#123B2A]">Impact takes collaboration.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-[15.5px] sm:text-[17px] text-[#6B5845] max-w-2xl leading-relaxed font-normal">
              Explore ideas, research approaches and emerging solutions created to address real challenges across Jharkhand. Match your skills with student innovators, grassroots collectives, and university labs.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap pt-2">
              <button
                type="button"
                onClick={onShareIdeaClick}
                className="inline-flex items-center gap-2.5 rounded-lg bg-[#123B2A] hover:bg-[#0D2B1E] text-white px-7 py-3.5 text-[15px] font-bold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
              >
                <Plus className="h-4 w-4 text-[#F5A623] stroke-[3]" />
                <span>Share an Idea</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/challenges')}
                className="inline-flex items-center gap-2 rounded-lg border border-[#6B5845]/30 bg-white hover:bg-[#FAF9F5] text-[#1D2522] px-6 py-3.5 text-[15px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <Compass className="h-4 w-4 text-[#123B2A]" />
                <span>Explore Challenges</span>
              </button>
            </div>
          </div>

          {/* ── Right Column: Concept Flow Trajectory Visual ── */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-full max-w-[460px] rounded-2xl border border-[#EEEAE1] bg-white p-6 shadow-sm space-y-5 text-left relative overflow-hidden">
              {/* Topographic Background Contour lines */}
              <svg
                aria-hidden="true"
                className="absolute -right-12 -top-12 h-64 w-64 stroke-[#123B2A]/10 fill-none pointer-events-none"
              >
                <circle cx="128" cy="128" r="40" />
                <circle cx="128" cy="128" r="80" strokeDasharray="3 3" />
                <circle cx="128" cy="128" r="120" />
              </svg>

              <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                  <GitBranch className="h-3.5 w-3.5 text-[#F5A623]" />
                  <span>INNOVATION LIFECYCLE TRAJECTORY</span>
                </div>
                <span className="text-[10.5px] font-mono text-[#6B5845]">JHARKHAND 24D</span>
              </div>

              {/* 4 Connected Trajectory Nodes: Challenge -> Idea -> Collaboration -> Impact */}
              <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-[#6B5845]/30 before:via-[#123B2A] before:to-[#15803D]">
                {/* Node 1: Challenge */}
                <div className="relative group">
                  <div className="absolute -left-6 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FAF9F5] border border-[#6B5845]/40 text-[#6B5845]">
                    <Target className="h-3 w-3" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#6B5845] block">
                      STAGE 01 · PROBLEM
                    </span>
                    <div className="text-[13.5px] font-bold text-[#1D2522]">
                      Real Societal Challenge Identified
                    </div>
                    <p className="text-[12px] text-[#6B5845]">
                      Ground truth filed by citizens & local district panchayats
                    </p>
                  </div>
                </div>

                {/* Node 2: Idea */}
                <div className="relative group">
                  <div className="absolute -left-6 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#123B2A] text-[#F5A623] shadow-xs ring-2 ring-[#F8F6F1]">
                    <Zap className="h-3 w-3 fill-[#F5A623]" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#123B2A] block">
                      STAGE 02 · DISCOVERY
                    </span>
                    <div className="text-[13.5px] font-bold text-[#123B2A]">
                      Solution Ideas & Research Approaches
                    </div>
                    <p className="text-[12px] text-[#6B5845]">
                      Technical hypotheses proposed by students & innovators
                    </p>
                  </div>
                </div>

                {/* Node 3: Collaboration */}
                <div className="relative group">
                  <div className="absolute -left-6 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FAF9F5] border border-[#123B2A] text-[#123B2A]">
                    <Users className="h-3 w-3" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#6B5845] block">
                      STAGE 03 · SQUAD
                    </span>
                    <div className="text-[13.5px] font-bold text-[#1D2522]">
                      Multidisciplinary Collaboration
                    </div>
                    <p className="text-[12px] text-[#6B5845]">
                      Engineering, domain mentoring & institutional backing
                    </p>
                  </div>
                </div>

                {/* Node 4: Impact */}
                <div className="relative group">
                  <div className="absolute -left-6 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#15803D] text-white">
                    <Layers className="h-3 w-3" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#15803D] block">
                      STAGE 04 · REALITY
                    </span>
                    <div className="text-[13.5px] font-bold text-[#1D2522]">
                      Field Prototyping & Scaled Impact
                    </div>
                    <p className="text-[12px] text-[#6B5845]">
                      Live testing in targeted blocks across Jharkhand
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Micro Banner */}
              <div className="pt-2 border-t border-[#EEEAE1] flex items-center justify-between text-[11px] font-mono text-[#6B5845]">
                <span>24 District Innovation Graph</span>
                <span className="text-[#123B2A] font-bold">Open Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
