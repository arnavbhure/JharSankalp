import { ArrowRight, MapPin, ShieldCheck, Activity, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroIllustration from '../../assets/landing-page-frame.png';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#F8F6F1] pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-[#EEEAE1]">
      {/* ── Background Topographic Contour & Dotted Geographic Matrix ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] pattern-topography"
      />

      {/* Subtle Contour Curve SVG Background Motif */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-12 w-[680px] h-[680px] opacity-[0.04] stroke-[#123B2A] fill-none"
        viewBox="0 0 500 500"
      >
        <circle cx="250" cy="250" r="100" strokeWidth="1.5" strokeDasharray="6 4" />
        <circle cx="250" cy="250" r="160" strokeWidth="1.2" />
        <circle cx="250" cy="250" r="220" strokeWidth="1" strokeDasharray="8 6" />
        <circle cx="250" cy="250" r="280" strokeWidth="0.8" />
        <path d="M 50,250 Q 250,50 450,250 T 850,250" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M 50,180 Q 200,320 450,160" strokeWidth="1" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* ── LEFT SIDE (5 cols on lg) ────────────────────────────── */}
          <div className="lg:col-span-5 space-y-6 text-left z-10">
            {/* Small Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-md border border-[#1F5A3D]/25 bg-[#EEEAE1]/90 px-3.5 py-1.5 text-[12px] font-bold tracking-wider uppercase text-[#123B2A] shadow-2xs">
              <span className="text-sm leading-none">🌿</span>
              <span>TOGETHER FOR A BETTER JHARKHAND</span>
            </div>

            {/* Main Headline (Bold Sans-Serif, Professional & Editorial) */}
            <h1 className="text-[2.6rem] sm:text-[3.3rem] lg:text-[3.7rem] font-extrabold text-[#1D2522] tracking-tight leading-[1.12] font-sans">
              Local Challenges.
              <br />
              Collective Solutions.
              <br />
              <span className="text-[#F5A623] inline-block mt-0.5">Lasting Impact.</span>
            </h1>

            {/* Description Copy */}
            <p className="text-[16px] sm:text-[17px] text-[#1D2522]/80 max-w-xl leading-relaxed font-normal">
              JharSankalp connects citizens, institutions and innovators to identify real-world
              challenges and build solutions that create meaningful change across Jharkhand.
            </p>

            {/* Primary Calls to Action */}
            <div className="flex items-center gap-4 flex-wrap pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('challenges-feed');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 rounded-lg bg-[#123B2A] px-7 py-3.5 text-[15px] font-bold text-white shadow-md hover:bg-[#0D2B1E] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Explore Challenges</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>

              <button
                onClick={() => navigate('/report-challenge')}
                className="inline-flex items-center gap-2 rounded-lg border border-[#6B5845]/30 bg-white px-6 py-3.5 text-[15px] font-bold text-[#1D2522] hover:bg-[#F8F6F1] hover:border-[#6B5845]/50 active:scale-[0.98] transition-all shadow-2xs cursor-pointer"
              >
                <MapPin className="h-4 w-4 text-[#123B2A]" />
                <span>Share a Problem</span>
              </button>
            </div>

            {/* Key Platform Highlights Row */}
            <div className="pt-2 flex items-center gap-6 text-[13px] text-neutral-600 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#123B2A]" />
                <span>Government Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-[#F5A623]" />
                <span>AI-Assisted Matching</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDE: Enlarged Framed Showcase Artwork (7 cols on lg) ── */}
          <div className="lg:col-span-7 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[680px]">
              {/* Soft Amber / Emerald Glow Backdrop */}
              <div
                aria-hidden="true"
                className="absolute -top-6 left-1/2 -translate-x-1/2 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-[#F5A623]/20 blur-3xl pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute bottom-4 right-8 h-60 w-60 rounded-full bg-[#123B2A]/10 blur-2xl pointer-events-none"
              />

              {/* ── BEAUTIFUL SHOWCASE FRAME ── */}
              <div className="relative z-10 w-full rounded-2xl sm:rounded-3xl border-2 border-[#123B2A]/20 bg-gradient-to-b from-white via-[#FCFBF8] to-[#F5F2EB] shadow-[0_25px_60px_-15px_rgba(18,59,42,0.18)] p-2 sm:p-3 overflow-hidden">
                {/* Frame Title Bar */}
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-[#EEEAE1] bg-[#FAF8F3]/90 rounded-t-xl text-[12px]">
                  {/* Window Controls */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E57373]/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4CAF50]/80 inline-block" />
                  </div>

                  {/* Live Status Pill */}
                  <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white border border-[#EEEAE1] shadow-2xs font-semibold text-[#123B2A]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4CAF50] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4CAF50]" />
                    </span>
                    <span className="text-[11px] sm:text-[12px] tracking-tight">Jharkhand State Innovation Network</span>
                  </div>

                  {/* Right District Badge */}
                  <span className="hidden sm:inline-block text-[11px] font-semibold text-[#6B5845] bg-[#EEEAE1]/60 px-2 py-0.5 rounded">
                    24 Districts
                  </span>
                </div>

                {/* Inner Artwork Display */}
                <div className="relative w-full rounded-b-xl overflow-hidden bg-gradient-to-b from-white/80 to-[#FDFCF9]/60 flex items-center justify-center p-3 sm:p-5 lg:p-6">
                  <img
                    src={heroIllustration}
                    alt="JharSankalp Collaborative Civic Innovation Platform"
                    className="w-full h-auto max-h-[560px] sm:max-h-[640px] lg:max-h-[680px] object-contain drop-shadow-md select-none transition-transform duration-700 hover:scale-[1.015]"
                    loading="eager"
                  />

                  {/* Floating Micro-Badge 1: Bottom Left */}
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 rounded-xl border border-[#123B2A]/20 bg-white/95 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-lg flex items-center gap-2.5 pointer-events-none transition-all">
                    <div className="w-8 h-8 rounded-lg bg-[#123B2A] flex items-center justify-center text-white">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] sm:text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                        Active Field Pilots
                      </div>
                      <div className="text-[12px] sm:text-[13px] font-bold text-[#1D2522]">
                        7 Projects Across Districts
                      </div>
                    </div>
                  </div>

                  {/* Floating Micro-Badge 2: Top Right */}
                  <div className="hidden sm:flex absolute top-4 right-4 sm:top-6 sm:right-6 rounded-xl border border-[#F5A623]/30 bg-white/95 backdrop-blur-md px-3.5 py-1.5 shadow-md items-center gap-2 pointer-events-none">
                    <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
                    <span className="text-[11px] font-bold text-[#1D2522]">
                      ₹12.5L+ CSR Committed
                    </span>
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

