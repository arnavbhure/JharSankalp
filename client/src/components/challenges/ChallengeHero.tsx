import { Sparkles } from 'lucide-react';

export function ChallengeHero() {
  return (
    <section className="relative overflow-hidden bg-[#F8F6F1] pt-10 pb-8 sm:pt-14 sm:pb-10 border-b border-[#EEEAE1] text-left">
      {/* Background Topographic Matrix */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] pattern-topography"
      />

      {/* Subtle Geographic Contour Arc */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 w-96 h-96 opacity-[0.04] stroke-[#123B2A] fill-none"
        viewBox="0 0 400 400"
      >
        <circle cx="200" cy="200" r="140" strokeWidth="1" strokeDasharray="6 4" />
        <circle cx="200" cy="200" r="180" strokeWidth="1" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* ── LEFT: Compact Hero Narrative ── */}
          <div className="lg:col-span-7 space-y-4">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-md border border-[#1F5A3D]/25 bg-[#EEEAE1]/80 px-3.5 py-1 text-[11.5px] font-mono font-bold tracking-wider uppercase text-[#123B2A] shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
              <span>DISCOVER REAL-WORLD CHALLENGES</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[2.25rem] sm:text-[3rem] lg:text-[3.35rem] font-extrabold text-[#1D2522] tracking-tight leading-[1.12] font-sans">
              Problems worth solving.{' '}
              <span className="text-[#F5A623] block sm:inline">Together.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-[15px] sm:text-[16px] text-[#1D2522]/80 max-w-2xl leading-relaxed">
              Explore challenges submitted by communities, institutions and citizens across Jharkhand. Find problems that matter and contribute your ideas, skills and solutions.
            </p>
          </div>

          {/* ── RIGHT: Compact Platform Insights Strip ── */}
          <div className="lg:col-span-5 flex justify-start lg:justify-end">
            <div className="w-full max-w-md rounded-xl border border-[#EEEAE1] bg-white p-4 sm:p-5 shadow-2xs">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B5845] pb-3 mb-3 border-b border-[#EEEAE1] flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
                  Statewide Civic Radar
                </span>
                <span className="text-[#123B2A] font-bold">24 Districts Live</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center divide-x divide-[#EEEAE1]">
                <div className="px-2">
                  <div className="text-[1.5rem] sm:text-[1.65rem] font-extrabold font-mono text-[#123B2A] leading-tight">
                    250+
                  </div>
                  <div className="text-[11px] font-medium text-[#6B5845] mt-0.5">
                    Challenges
                  </div>
                </div>

                <div className="px-2">
                  <div className="text-[1.5rem] sm:text-[1.65rem] font-extrabold font-mono text-[#123B2A] leading-tight">
                    24
                  </div>
                  <div className="text-[11px] font-medium text-[#6B5845] mt-0.5">
                    Districts
                  </div>
                </div>

                <div className="px-2">
                  <div className="text-[1.5rem] sm:text-[1.65rem] font-extrabold font-mono text-[#F5A623] leading-tight">
                    1.2K+
                  </div>
                  <div className="text-[11px] font-medium text-[#6B5845] mt-0.5">
                    Problem Solvers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
