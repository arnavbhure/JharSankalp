import { Users, Trophy, Heart, ArrowRight } from 'lucide-react';

export function DarkImpactSection() {

  return (
    <section className="bg-[#163D2B] text-white py-20 lg:py-24 relative overflow-hidden border-y border-[#25593F]">
      {/* Background Subtle Map Silhouette & Topographic Lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-10"
      >
        <svg viewBox="0 0 1000 400" className="w-full h-full stroke-white fill-none" strokeWidth="0.8">
          <path d="M100,200 Q250,50 450,180 T800,220" strokeDasharray="4,4" />
          <path d="M50,120 Q300,280 600,120 T950,260" strokeDasharray="4,4" />
          <circle cx="250" cy="120" r="4" fill="white" />
          <circle cx="600" cy="180" r="4" fill="white" />
          <circle cx="850" cy="140" r="4" fill="white" />
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

            <h2 className="text-[2.5rem] sm:text-[3.25rem] font-extrabold tracking-tight leading-[1.15] font-sans text-white">
              Turning ideas
              <br />
              into real change
            </h2>

            <p className="text-body-lg text-white/80 max-w-md leading-relaxed">
              From local communities to global collaborators, we are building a stronger, sustainable Jharkhand.
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('impact');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 rounded-pill bg-[#F5A623] hover:bg-[#E09215] text-[#163D2B] px-6 py-3.5 text-body-sm font-extrabold shadow-md transition-all active:scale-[0.98]"
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
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 border-2 border-white/20 text-[#FEE1C7] shadow-lg">
                <Users className="h-9 w-9 stroke-[2]" />
              </div>
              <div>
                <div className="text-[2.75rem] font-extrabold font-mono text-white leading-none tracking-tight">
                  12K+
                </div>
                <div className="text-[13px] font-bold text-white/80 uppercase tracking-wider mt-2">
                  Active Change Makers
                </div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 border-2 border-white/20 text-[#F5A623] shadow-lg">
                <Trophy className="h-9 w-9 stroke-[2]" />
              </div>
              <div>
                <div className="text-[2.75rem] font-extrabold font-mono text-white leading-none tracking-tight">
                  16+
                </div>
                <div className="text-[13px] font-bold text-white/80 uppercase tracking-wider mt-2">
                  Awards & Recognitions
                </div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 border-2 border-white/20 text-[#3E7A4A] shadow-lg">
                <Heart className="h-9 w-9 stroke-[2] fill-[#3E7A4A]" />
              </div>
              <div>
                <div className="text-[2.75rem] font-extrabold font-mono text-white leading-none tracking-tight">
                  20+
                </div>
                <div className="text-[13px] font-bold text-white/80 uppercase tracking-wider mt-2">
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
