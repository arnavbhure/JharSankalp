import { useNavigate } from 'react-router-dom';
import { Sparkles, Droplets, MapPin, ArrowRight, TrendingUp, CheckCircle2 } from 'lucide-react';
import { SolutionItem } from '../../types/solutions';

interface FeaturedSolutionProps {
  solution: SolutionItem;
  onOpenDetails: (solution: SolutionItem) => void;
}

export function FeaturedSolution({ solution, onOpenDetails }: FeaturedSolutionProps) {
  const navigate = useNavigate();

  return (
    <section className="text-left">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#123B2A] text-white shadow-xl border border-[#1E5A3A] transition-all">
        {/* Subtle Topographic Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04] pattern-topography"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* ── Left Side: Editorial Content (7 Cols) ── */}
          <div className="lg:col-span-7 p-6 sm:p-9 lg:p-10 z-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5A623] text-[#123B2A] text-[11px] font-mono font-extrabold uppercase tracking-wider shadow-xs">
                  <Sparkles className="h-3.5 w-3.5 fill-[#123B2A]" />
                  <span>FEATURED OUTCOME</span>
                </span>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-mono font-semibold border border-white/15">
                  <Droplets className="h-3 w-3 text-[#F5A623]" />
                  <span>{solution.focusArea}</span>
                </span>

                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#0284C7]/30 text-[#BAE6FD] text-[11px] font-mono font-bold border border-[#BAE6FD]/30">
                  {solution.stage}
                </span>

                <span className="flex items-center gap-1 text-[11.5px] font-mono text-white/70 ml-auto">
                  <MapPin className="h-3 w-3 text-[#F5A623]" />
                  <span>Murhu Block, {solution.district}</span>
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2">
                <h2 className="text-[1.85rem] sm:text-[2.4rem] font-extrabold text-white tracking-tight leading-[1.15] font-sans">
                  {solution.name}
                </h2>
                <p className="text-[14.5px] sm:text-[15.5px] text-white/80 leading-relaxed font-normal">
                  {solution.description}
                </p>
              </div>

              {/* Lineage Breakdown: Challenge Solved & Collaboration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 border-y border-white/10 text-[12px]">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#F5A623] block">
                    CHALLENGE SOLVED
                  </span>
                  <span className="text-white/90 font-medium">
                    Frequent rural water infrastructure failures
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#F5A623] block">
                    COLLABORATION
                  </span>
                  <span className="text-white/90 font-medium">
                    University Researchers + Local Engineers + Community Partners
                  </span>
                </div>
              </div>

              {/* Progress and Impact */}
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11.5px] font-mono">
                    <span className="text-white/80 font-bold">Field Pilot Progress</span>
                    <span className="text-[#F5A623] font-bold">{solution.progress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#F5A623] transition-all duration-500"
                      style={{ width: `${solution.progress}%` }}
                    />
                  </div>
                </div>

                {/* Impact So Far Bullets */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-white/70 block">
                    IMPACT SO FAR:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {solution.impactMetrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-1.5 p-2 rounded-xl bg-white/5 border border-white/10 text-[11.5px] text-white/90"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#F5A623] shrink-0 mt-0.5" />
                        <span className="leading-snug">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => onOpenDetails(solution)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#F5A623] hover:bg-[#E09215] text-[#123B2A] text-[13.5px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>View Solution Details</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/impact')}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 text-white text-[13.5px] font-semibold transition-all active:scale-[0.98] cursor-pointer"
              >
                <TrendingUp className="h-4 w-4 text-[#F5A623]" />
                <span>View Impact</span>
              </button>
            </div>
          </div>

          {/* ── Right Side: Real Photographic Testbed Composition (5 Cols) ── */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
            {solution.image ? (
              <div className="relative h-full w-full overflow-hidden">
                <img
                  src={solution.image}
                  alt="Rural Water Telemetry Station in Khunti"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#123B2A] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#123B2A] lg:via-transparent lg:to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#123B2A]/85 backdrop-blur-xs border border-white/15 text-[11px] font-mono text-white/90">
                  <span className="font-bold text-[#F5A623] block">TESTBED ARCHITECTURE</span>
                  Murhu Handpump Solar Telemetry Unit #04
                </div>
              </div>
            ) : (
              <div className="h-full w-full bg-white/5 flex items-center justify-center p-8 text-white/60">
                <span>Field Image Asset</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
