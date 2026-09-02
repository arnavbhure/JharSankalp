import { Users, Trophy, Heart, ArrowRight } from 'lucide-react';

export function DarkImpactSection() {
  return (
    <section id="impact" className="bg-[#123B2A] text-white py-20 lg:py-24 relative overflow-hidden border-y border-[#1F5A3D]">
      {/* Background Subtle Jharkhand Map Silhouette, Routes & Topographic Lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
      >
        <svg viewBox="0 0 1000 400" className="w-full h-full stroke-white fill-none" strokeWidth="0.8">
          {/* Subtle Jharkhand rough geographic polygon contour */}
          <path
            d="M 120,80 L 280,60 L 480,90 L 680,50 L 820,110 L 920,220 L 840,320 L 620,360 L 380,340 L 220,370 L 110,260 Z"
            stroke="#F5A623"
            strokeWidth="1.2"
            strokeDasharray="6 6"
            className="opacity-40"
          />
          {/* Dotted interconnected route corridors */}
          <path d="M150,200 Q300,70 500,190 T850,210" strokeDasharray="5,5" strokeWidth="1" />
          <path d="M80,140 Q320,300 620,130 T960,250" strokeDasharray="5,5" strokeWidth="1" />
          {/* Location pins & connection nodes */}
          <circle cx="280" cy="120" r="5" fill="#F5A623" className="opacity-80" />
          <circle cx="500" cy="190" r="4" fill="white" className="opacity-70" />
          <circle cx="680" cy="140" r="6" fill="#F5A623" className="opacity-80" />
          <circle cx="850" cy="210" r="4" fill="white" className="opacity-70" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          {/* ── LEFT SIDE: Editorial Narrative ── */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-caption font-mono uppercase font-bold text-[#F5A623] tracking-widest">
              <span className="text-xs">▶</span>
              <span>OUR IMPACT</span>
            </div>

            <h2 className="text-[2.5rem] sm:text-[3.2rem] font-extrabold tracking-tight leading-[1.14] font-sans text-white">
              Turning ideas
              <br />
              into real change
            </h2>

            <p className="text-[16px] text-white/80 max-w-md leading-relaxed">
              From local communities to institutions and innovators, JharSankalp creates a transparent path from identifying a problem to delivering measurable impact.
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('impact-stories');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-[#F5A623] hover:bg-[#E09215] text-[#123B2A] px-6 py-3.5 text-[15px] font-extrabold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>See Impact Stories</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* ── RIGHT SIDE: 3 Large Circular Metric Nodes ── */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {/* Metric 1 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-[#FEE1C7] shadow-md">
                <Users className="h-9 w-9 stroke-[2]" />
              </div>
              <div>
                <div className="text-[2.75rem] font-extrabold font-mono text-white leading-none tracking-tight">
                  12K+
                </div>
                <div className="text-[13px] font-bold text-white/85 uppercase tracking-wider mt-2">
                  Active Change Makers
                </div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-[#F5A623] shadow-md">
                <Trophy className="h-9 w-9 stroke-[2]" />
              </div>
              <div>
                <div className="text-[2.75rem] font-extrabold font-mono text-white leading-none tracking-tight">
                  16+
                </div>
                <div className="text-[13px] font-bold text-white/85 uppercase tracking-wider mt-2">
                  Awards & Recognitions
                </div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-[#1F5A3D] shadow-md">
                <Heart className="h-9 w-9 stroke-[2] fill-[#1F5A3D] text-[#1F5A3D]" />
              </div>
              <div>
                <div className="text-[2.75rem] font-extrabold font-mono text-white leading-none tracking-tight">
                  20+
                </div>
                <div className="text-[13px] font-bold text-white/85 uppercase tracking-wider mt-2">
                  Years of Collective Impact
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

