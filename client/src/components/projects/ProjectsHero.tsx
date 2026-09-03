import { ArrowDown, Activity, ShieldCheck, Layers } from 'lucide-react';

export function ProjectsHero() {
  const scrollToPortfolio = () => {
    const el = document.getElementById('project-portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToImpact = () => {
    const el = document.getElementById('project-impact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-[#EEEAE1] bg-[#F8F6F1] pt-12 pb-14 sm:pt-16 sm:pb-20 text-left">
      {/* Background Topographic Matrix */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] pattern-topography"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* ── Left Column: Editorial Headline & Actions (7 cols) ── */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow and Live Indicator */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2 rounded-md border border-[#1F5A3D]/25 bg-[#EEEAE1]/80 px-3.5 py-1 text-[11px] font-mono font-bold tracking-wider uppercase text-[#123B2A] shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-[#FA7E61]" />
                <span>JHARKHAND IN ACTION</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-[#123B2A]/5 border border-[#123B2A]/15 px-3 py-1 text-[11.5px] font-mono font-bold text-[#123B2A]">
                <span className="h-2 w-2 rounded-full bg-[#15803D] animate-pulse" />
                <span>12 ACTIVE PROJECTS ACROSS JHARKHAND</span>
              </div>
            </div>

            {/* Main Editorial Heading */}
            <h1 className="text-[2.6rem] sm:text-[3.5rem] lg:text-[4rem] font-extrabold text-[#1D2522] tracking-tight leading-[1.08] font-sans">
              Ideas become meaningful <br />
              <span className="text-[#4C1E4F]">when they reach the ground.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-[16px] sm:text-[18px] text-[#6B5845] max-w-2xl leading-relaxed font-normal">
              Explore collaborative projects where communities, universities, industry and
              government are working together to turn societal challenges into practical solutions.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3.5 pt-2 flex-wrap">
              <button
                type="button"
                onClick={scrollToPortfolio}
                className="inline-flex items-center gap-2 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white px-6 py-3.5 text-[14px] font-bold shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Explore Active Projects</span>
                <ArrowDown className="h-4 w-4 text-[#F5A623]" />
              </button>

              <button
                type="button"
                onClick={scrollToImpact}
                className="inline-flex items-center gap-2 rounded-xl border border-[#B5A886]/40 bg-white hover:bg-[#FAF9F5] text-[#1D2522] px-6 py-3.5 text-[14px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <Activity className="h-4 w-4 text-[#FA7E61]" />
                <span>View Innovation Impact</span>
              </button>
            </div>

            {/* Subtext Statement */}
            <div className="pt-2 flex items-center gap-4 text-[12px] font-mono text-[#6B5845]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#15803D]" />
                Ground Truth Tested
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-[#4C1E4F]" />
                Multi-Sector Consortia
              </span>
              <span>·</span>
              <span className="text-[#FA7E61] font-bold">Ideas are not the end. Execution is.</span>
            </div>
          </div>

          {/* ── Right Column: Layered Project Ecosystem Visual (5 cols) ── */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#123B2A]/15 shadow-2xl bg-[#1D2522] group">
              <img
                src="/jharkhand_innovation_field_pilot.jpg"
                alt="Jharkhand Multidisciplinary Project Team conducting real-world water sensor telemetry pilot"
                className="w-full h-[420px] sm:h-[460px] object-cover object-center transform group-hover:scale-102 transition-transform duration-700"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

              {/* Top Status Overlays */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono font-bold text-white uppercase tracking-wider">
                  <span className="h-2 w-2 rounded-full bg-[#FA7E61] animate-ping" />
                  LIVE FIELD TRIAL
                </span>

                <span className="px-3 py-1 rounded-full bg-[#4C1E4F]/85 backdrop-blur-md border border-[#FEE1C7]/30 text-[11px] font-mono font-bold text-[#FEE1C7]">
                  KHUNTI DISTRICT
                </span>
              </div>

              {/* Bottom Layered Lifecycle Badges */}
              <div className="absolute bottom-4 left-4 right-4 space-y-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-white text-[10.5px] font-mono font-bold tracking-wider uppercase border border-white/25">
                    PROTOTYPE
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#FA7E61] text-white text-[10.5px] font-mono font-bold tracking-wider uppercase shadow-xs">
                    ● FIELD PILOT
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#15803D]/80 backdrop-blur-md text-white text-[10.5px] font-mono font-bold tracking-wider uppercase border border-[#15803D]/40">
                    IMPLEMENTATION
                  </span>
                </div>

                <div className="rounded-2xl bg-black/70 backdrop-blur-md p-3.5 border border-white/15 text-left">
                  <div className="text-[11px] font-mono uppercase text-[#FEE1C7] font-bold">
                    COMMUNITY + UNIVERSITY + INDUSTRY
                  </div>
                  <div className="text-[14px] font-bold text-white leading-snug">
                    Murhu Water Telemetry Collaborative
                  </div>
                  <div className="text-[12px] text-white/80 font-mono mt-0.5">
                    BIT Mesra · Jal Sahiya Collective · 18 Wells
                  </div>
                </div>
              </div>
            </div>

            {/* Accent Shadow element */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 -z-10 w-full h-full rounded-3xl bg-[#4C1E4F]/20 blur-xl pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
