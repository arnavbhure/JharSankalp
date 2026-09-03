import { Users, MapPin, Rocket, CheckCircle2, ArrowDown, BookOpen } from 'lucide-react';

interface ImpactHeroProps {
  onExploreDataClick: () => void;
  onReadStoryClick: () => void;
}

export function ImpactHero({
  onExploreDataClick,
  onReadStoryClick,
}: ImpactHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#EEEAE1] bg-[#F8F6F1] py-12 sm:py-16 text-left">
      {/* Subtle Background Geodetic Grid Accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#123B2A08_1px,transparent_1px),linear-gradient(to_bottom,#123B2A08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* ── Left Column: Hero Copy (7 Cols) ── */}
          <div className="lg:col-span-7 space-y-5">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-md border border-[#1F5A3D]/25 bg-[#EEEAE1]/80 px-3.5 py-1 text-[11px] font-mono font-bold tracking-wider uppercase text-[#123B2A] shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[#F5A623] animate-pulse" />
              <span>MEASURABLE IMPACT</span>
            </div>

            {/* Main Heading with Amber Highlight */}
            <h1 className="text-[2.5rem] sm:text-[3.2rem] lg:text-[3.5rem] font-extrabold text-[#1D2522] tracking-tight leading-[1.1] font-sans">
              Innovation matters when communities{' '}
              <span className="text-[#F5A623]">feel the difference.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-[15.5px] sm:text-[16.5px] text-[#6B5845] max-w-2xl leading-relaxed font-normal">
              Track how challenges submitted across Jharkhand are transformed into solutions, deployments and measurable improvements in people's lives.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-3.5 flex-wrap pt-2">
              <button
                type="button"
                onClick={onExploreDataClick}
                className="inline-flex items-center gap-2 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white px-6 py-3 text-[14px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>View District Reach</span>
                <ArrowDown className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onReadStoryClick}
                className="inline-flex items-center gap-2 rounded-xl border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[#1D2522] px-5 py-3 text-[14px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <BookOpen className="h-4 w-4 text-[#F5A623]" />
                <span>Featured Story</span>
              </button>
            </div>
          </div>

          {/* ── Right Column: Expressive Impact Metrics Grid (5 Cols) ── */}
          <div className="lg:col-span-5 flex justify-start lg:justify-end">
            <div className="w-full max-w-md rounded-3xl bg-white border border-[#EEEAE1] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
                <span className="text-[10.5px] font-mono uppercase font-bold tracking-wider text-[#6B5845]">
                  VERIFIED OUTCOME AUDIT
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-[#15803D] font-bold">
                  <span className="h-2 w-2 rounded-full bg-[#15803D] animate-pulse" />
                  Live Field Telemetry
                </span>
              </div>

              {/* 4 Expressive Metric Cards Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1 text-left">
                  <div className="flex items-center justify-between text-[#123B2A]">
                    <Users className="h-4 w-4 text-[#123B2A]" />
                    <span className="text-[10px] font-mono font-bold text-[#15803D] bg-[#F0FDF4] px-1.5 py-0.5 rounded border border-[#BBF7D0]">
                      +18% MoM
                    </span>
                  </div>
                  <div className="text-[1.8rem] font-mono font-extrabold text-[#123B2A] leading-tight">
                    12,400+
                  </div>
                  <div className="text-[11px] text-[#6B5845] font-medium">
                    People Reached
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1 text-left">
                  <div className="flex items-center justify-between text-[#B45309]">
                    <MapPin className="h-4 w-4 text-[#F5A623]" />
                    <span className="text-[10px] font-mono font-bold text-[#B45309] bg-[#FFFBEB] px-1.5 py-0.5 rounded border border-[#FDE68A]">
                      Statewide
                    </span>
                  </div>
                  <div className="text-[1.8rem] font-mono font-extrabold text-[#123B2A] leading-tight">
                    18
                  </div>
                  <div className="text-[11px] text-[#6B5845] font-medium">
                    Active Districts
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1 text-left">
                  <div className="flex items-center justify-between text-[#0284C7]">
                    <Rocket className="h-4 w-4 text-[#0284C7]" />
                    <span className="text-[10px] font-mono font-bold text-[#0284C7] bg-[#F0F9FF] px-1.5 py-0.5 rounded border border-[#BAE6FD]">
                      In Sprints
                    </span>
                  </div>
                  <div className="text-[1.8rem] font-mono font-extrabold text-[#123B2A] leading-tight">
                    32
                  </div>
                  <div className="text-[11px] text-[#6B5845] font-medium">
                    Solutions in Progress
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#123B2A] text-white border border-[#1E5A3A] space-y-1 text-left shadow-xs">
                  <div className="flex items-center justify-between text-[#F5A623]">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-[10px] font-mono font-bold text-[#123B2A] bg-[#F5A623] px-1.5 py-0.5 rounded">
                      Live
                    </span>
                  </div>
                  <div className="text-[1.8rem] font-mono font-extrabold text-white leading-tight">
                    7
                  </div>
                  <div className="text-[11px] text-white/80 font-medium">
                    Field Deployments
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
