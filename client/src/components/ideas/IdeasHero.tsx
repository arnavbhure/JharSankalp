import { useNavigate } from 'react-router-dom';
import { ArrowRight, Compass, Plus, Sparkles, HeartHandshake, Lightbulb } from 'lucide-react';

interface IdeasHeroProps {
  onOpenSubmitModal: () => void;
}

export function IdeasHero({ onOpenSubmitModal }: IdeasHeroProps) {
  const navigate = useNavigate();

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
              <span>COMMUNITY INNOVATION NETWORK</span>
            </div>

            {/* Main Heading with Amber Highlight */}
            <h1 className="text-[2.5rem] sm:text-[3.2rem] lg:text-[3.5rem] font-extrabold text-[#1D2522] tracking-tight leading-[1.1] font-sans">
              Ideas that can move{' '}
              <span className="text-[#F5A623]">Jharkhand forward.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-[15.5px] sm:text-[16.5px] text-[#6B5845] max-w-2xl leading-relaxed font-normal">
              Discover community-driven ideas, support promising solutions and contribute your own perspective to challenges across Jharkhand.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-3.5 flex-wrap pt-2">
              <button
                type="button"
                onClick={onOpenSubmitModal}
                className="inline-flex items-center gap-2 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white px-6 py-3 text-[14px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <Plus className="h-4 w-4 text-[#F5A623] stroke-[3]" />
                <span>Submit Your Idea</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/challenges')}
                className="inline-flex items-center gap-2 rounded-xl border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[#1D2522] px-5 py-3 text-[14px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <Compass className="h-4 w-4 text-[#123B2A]" />
                <span>Explore Challenges</span>
              </button>
            </div>
          </div>

          {/* ── Right Column: Compact Civic Metric Panel (5 Cols) ── */}
          <div className="lg:col-span-5 flex justify-start lg:justify-end">
            <div className="w-full max-w-sm rounded-3xl bg-white border border-[#EEEAE1] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
                <span className="text-[10.5px] font-mono uppercase font-bold tracking-wider text-[#6B5845]">
                  STATEWIDE INNOVATION PULSE
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-[#15803D] font-bold">
                  <span className="h-2 w-2 rounded-full bg-[#15803D] animate-pulse" />
                  Live Sync
                </span>
              </div>

              {/* 3 Metric Rows */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1]">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-[#123B2A]/10 text-[#123B2A] flex items-center justify-center">
                      <Lightbulb className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[1.25rem] font-mono font-extrabold text-[#123B2A] leading-tight">
                        1.2K+
                      </div>
                      <div className="text-[11.5px] text-[#6B5845]">
                        Ideas Shared
                      </div>
                    </div>
                  </div>
                  <span className="text-[10.5px] font-mono text-[#15803D] font-bold bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#BBF7D0]">
                    24 Districts
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1]">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-[#F5A623]/15 text-[#B45309] flex items-center justify-center">
                      <HeartHandshake className="h-4 w-4 text-[#F5A623]" />
                    </div>
                    <div>
                      <div className="text-[1.25rem] font-mono font-extrabold text-[#123B2A] leading-tight">
                        8.4K
                      </div>
                      <div className="text-[11.5px] text-[#6B5845]">
                        Community Supports
                      </div>
                    </div>
                  </div>
                  <span className="text-[10.5px] font-mono text-[#B45309] font-bold bg-[#FFFBEB] px-2 py-0.5 rounded border border-[#FDE68A]">
                    +18% this month
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1]">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-[#0284C7]/10 text-[#0284C7] flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-[#0284C7]" />
                    </div>
                    <div>
                      <div className="text-[1.25rem] font-mono font-extrabold text-[#123B2A] leading-tight">
                        320+
                      </div>
                      <div className="text-[11.5px] text-[#6B5845]">
                        Ideas Under Review
                      </div>
                    </div>
                  </div>
                  <span className="text-[10.5px] font-mono text-[#0284C7] font-bold bg-[#F0F9FF] px-2 py-0.5 rounded border border-[#BAE6FD]">
                    Institutions Engaged
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
