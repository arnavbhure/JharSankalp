import { ArrowRight, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroIllustration from '../../assets/landing-page-frame.png';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#F8F6F1] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#EEEAE1]">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ── LEFT SIDE (approx 48%) ────────────────────────────── */}
          <div className="lg:col-span-6 space-y-6 text-left z-10">
            {/* Small Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-md border border-[#1F5A3D]/25 bg-[#EEEAE1]/80 px-3.5 py-1.5 text-[12px] font-bold tracking-wider uppercase text-[#123B2A] shadow-2xs">
              <span className="text-sm leading-none">🌿</span>
              <span>TOGETHER FOR A BETTER JHARKHAND</span>
            </div>

            {/* Main Headline (Bold Sans-Serif, Professional & Editorial) */}
            <h1 className="text-[2.6rem] sm:text-[3.4rem] lg:text-[3.9rem] font-extrabold text-[#1D2522] tracking-tight leading-[1.12] font-sans">
              Local Challenges.
              <br />
              Collective Solutions.
              <br />
              <span className="text-[#F5A623] inline-block mt-0.5">
                Lasting Impact.
              </span>
            </h1>

            {/* Description Copy */}
            <p className="text-[16px] sm:text-[17px] text-[#1D2522]/80 max-w-xl leading-relaxed font-normal">
              JharSankalp connects citizens, institutions and innovators to identify real-world challenges and build solutions that create meaningful change across Jharkhand.
            </p>

            {/* Primary Calls to Action (Strong Rectangular Buttons) */}
            <div className="flex items-center gap-4 flex-wrap pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('challenges-feed');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 rounded-lg bg-[#123B2A] px-7 py-3.5 text-[15px] font-bold text-white shadow-sm hover:bg-[#0D2B1E] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Explore Challenges</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>

              <button
                onClick={() => navigate('/report')}
                className="inline-flex items-center gap-2 rounded-lg border border-[#6B5845]/30 bg-white px-6 py-3.5 text-[15px] font-bold text-[#1D2522] hover:bg-[#F8F6F1] hover:border-[#6B5845]/50 active:scale-[0.98] transition-all shadow-2xs cursor-pointer"
              >
                <MapPin className="h-4 w-4 text-[#123B2A]" />
                <span>Share a Problem</span>
              </button>
            </div>
          </div>

          {/* ── RIGHT SIDE: Organic Illustration Artwork (approx 52%) ── */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[560px] flex items-center justify-center">
              {/* Soft Amber Circular Sun / Warm Glow Backdrop */}
              <div
                aria-hidden="true"
                className="absolute -top-4 sm:top-2 left-1/2 -translate-x-1/2 sm:translate-x-[-40%] h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-[#F5A623]/25 blur-3xl pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute top-8 sm:top-12 left-1/2 -translate-x-1/2 sm:translate-x-[-35%] h-52 w-52 sm:h-64 sm:w-64 rounded-full bg-gradient-to-tr from-[#F5A623]/40 to-[#F5A623]/15 pointer-events-none border border-[#F5A623]/20"
              />

              {/* Dotted Accent Matrix behind illustration */}
              <div
                aria-hidden="true"
                className="absolute top-10 right-8 grid grid-cols-4 gap-2 opacity-25 pointer-events-none z-0"
              >
                {[...Array(16)].map((_, i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#123B2A]" />
                ))}
              </div>

              {/* Main Transparent Artwork (Collaborative Youth & Jharkhand Innovation Composition) */}
              <div className="relative z-10 w-full flex items-center justify-center">
                <img
                  src={heroIllustration}
                  alt="JharSankalp Collaborative Civic Innovation Platform"
                  className="w-full h-auto max-h-[520px] sm:max-h-[580px] lg:max-h-[620px] object-contain drop-shadow-sm select-none transition-transform duration-500 hover:scale-[1.01]"
                  loading="eager"
                />
              </div>

              {/* Floating Impact Micro-Card (Deep Forest Green) */}
              <div className="absolute -bottom-3 left-2 sm:left-4 z-20 rounded-lg bg-[#123B2A] px-4 sm:px-5 py-3 text-white shadow-lg border border-white/15 text-left backdrop-blur-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/15 text-[#F5A623]">
                    <Users className="h-4.5 w-4.5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-white/75 block uppercase tracking-wider">
                      Join a growing movement
                    </span>
                    <div className="text-[1.35rem] font-extrabold font-mono tracking-tight leading-none mt-0.5 text-white">
                      12K+
                    </div>
                    <span className="text-[11px] text-[#F8F6F1]/90 font-medium">Change Makers</span>
                  </div>
                </div>
              </div>

              {/* Floating Quote Micro-Card (Warm White with Gold Quotation) */}
              <div className="hidden sm:block absolute top-8 -right-2 sm:-right-4 z-20 max-w-[190px] rounded-lg bg-white/95 p-3.5 text-left shadow-md border border-[#EEEAE1]">
                <span className="text-[#F5A623] text-xl font-serif leading-none font-bold block mb-1">
                  “
                </span>
                <p className="text-[11.5px] font-bold text-[#1D2522] leading-snug">
                  Small ideas can create big change.
                </p>
                <p className="text-[10.5px] text-[#6B5845] mt-0.5 leading-tight">
                  Be the spark of transformation.
                </p>
                <div className="text-right text-[#F5A623] text-lg font-serif leading-none font-bold">
                  ”
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
