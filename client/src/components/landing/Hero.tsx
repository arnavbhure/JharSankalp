import { ArrowRight, MapPin, Users } from 'lucide-react';
import { IMAGES } from '../../config/images';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#FCFAF6] pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-neutral-200/60">
      {/* Background Topographic Contour & Ambient Sun Details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#163D2B_1.5px,transparent_1.5px)] [background-size:30px_30px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ── LEFT SIDE (approx 48%) ────────────────────────────── */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Small Pill: "Together for a better Jharkhand" */}
            <div className="inline-flex items-center gap-2 rounded-pill border border-[#3E7A4A]/30 bg-[#EBF5ED] px-4 py-1 text-[13px] font-semibold text-[#163D2B] shadow-xs">
              <span className="text-base leading-none">🌿</span>
              <span>Together for a better Jharkhand</span>
            </div>

            {/* Main Heading with Expressive Script Accent */}
            <h1 className="text-[2.75rem] sm:text-[3.5rem] lg:text-[4rem] font-extrabold text-neutral-900 tracking-tight leading-[1.1] font-sans">
              Local Challenges.
              <br />
              Collective Solutions.
              <br />
              <span className="font-accent text-[3.25rem] sm:text-[4.25rem] font-bold text-[#F5A623] tracking-normal inline-block mt-1">
                Lasting Impact.
              </span>
            </h1>

            {/* Supporting Editorial Copy */}
            <p className="text-body-lg text-neutral-600 max-w-xl leading-relaxed">
              JharSankalp is a citizen-driven platform that connects people, ideas and institutions to solve real-world challenges of Jharkhand through collaboration and innovation.
            </p>

            {/* Primary Calls to Action */}
            <div className="flex items-center gap-4 flex-wrap pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('challenges-feed');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 rounded-pill bg-[#163D2B] px-7 py-3.5 text-body-sm font-bold text-white shadow-md hover:bg-[#102F21] active:scale-[0.98] transition-all"
              >
                <span>Explore Challenges</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>

              <button
                onClick={() => navigate('/report')}
                className="inline-flex items-center gap-2 rounded-pill border-2 border-neutral-300 bg-white px-6 py-3.5 text-body-sm font-bold text-neutral-800 hover:bg-neutral-50 hover:border-neutral-400 active:scale-[0.98] transition-all shadow-xs"
              >
                <MapPin className="h-4 w-4 text-[#163D2B]" />
                <span>Share a Problem</span>
              </button>
            </div>
          </div>

          {/* ── RIGHT SIDE: Organic Waterfall Composition (approx 52%) ── */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px]">
              {/* Warm Golden Sun Circle behind image */}
              <div
                aria-hidden="true"
                className="absolute -top-6 left-10 h-64 w-64 rounded-full bg-[#F5A623]/30 blur-2xl pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute top-4 left-16 h-48 w-48 rounded-full bg-[#F5A623] opacity-80 pointer-events-none"
              />

              {/* Green Organic Dot Accents */}
              <div className="absolute top-12 left-6 grid grid-cols-4 gap-2 opacity-50 pointer-events-none z-10">
                {[...Array(12)].map((_, i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#163D2B]" />
                ))}
              </div>

              {/* Main Organic Brush-Mask Image (Jharkhand Waterfall & Explorers) */}
              <div className="relative z-10 w-full overflow-hidden rounded-[42px] rounded-tl-[120px] rounded-br-[90px] border-4 border-white shadow-xl bg-neutral-900 aspect-[4/4.5]">
                <img
                  src={IMAGES.heroWaterfall.url}
                  alt={IMAGES.heroWaterfall.alt}
                  className="h-full w-full object-cover grayscale-[5%] contrast-[1.1] scale-105 transition-transform duration-700 hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating Impact Card (Deep Forest Green Badge) */}
              <div className="absolute -bottom-4 left-0 sm:left-4 z-20 rounded-2xl bg-[#163D2B] px-5 py-3.5 text-white shadow-xl border border-white/20 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-[#F5A623]">
                    <Users className="h-5 w-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-white/80 block uppercase tracking-wide">
                      Join a growing movement
                    </span>
                    <div className="text-[1.5rem] font-extrabold font-mono tracking-tight leading-none mt-0.5">
                      12K+
                    </div>
                    <span className="text-[11px] text-[#FEE1C7] font-semibold">Change Makers</span>
                  </div>
                </div>
              </div>

              {/* Floating Quote Card (Warm White with Gold Quotation Marks) */}
              <div className="absolute bottom-16 -right-2 sm:-right-6 z-20 max-w-[210px] rounded-2xl bg-white p-4 text-left shadow-xl border border-neutral-200/80">
                <span className="text-[#F5A623] text-2xl font-serif leading-none font-bold block mb-1">
                  “
                </span>
                <p className="text-[12px] font-semibold text-neutral-800 leading-snug">
                  Small ideas can create big change.
                </p>
                <p className="text-[11px] text-neutral-500 mt-1 leading-tight">
                  Be the spark of transformation.
                </p>
                <div className="text-right text-[#F5A623] text-xl font-serif leading-none font-bold">
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
