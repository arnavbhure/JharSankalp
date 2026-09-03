import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lightbulb, Users } from 'lucide-react';

export function SolutionsCTA() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden rounded-[32px] bg-[#123B2A] text-white p-8 sm:p-12 lg:p-14 text-left border border-[#1E5A3A] shadow-md my-6">
      {/* Background Subtle Contour Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] pattern-topography"
      />

      <div className="relative z-10 max-w-3xl space-y-5">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-[11px] font-mono font-bold tracking-wider uppercase text-[#F5A623]">
          <Lightbulb className="h-3.5 w-3.5" />
          <span>BUILD WHAT MATTERS</span>
        </div>

        {/* Heading */}
        <h2 className="text-[2rem] sm:text-[2.6rem] font-extrabold text-white tracking-tight leading-tight font-sans">
          Have an idea that could become a solution?
        </h2>

        {/* Supporting text */}
        <p className="text-[15px] sm:text-[16.5px] text-white/80 leading-relaxed font-normal max-w-2xl">
          Turn promising ideas into prototypes, pilot programs and deployable innovations by
          connecting with the JharSankalp collaboration network.
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3.5 flex-wrap pt-2">
          <button
            type="button"
            onClick={() => navigate('/submit-idea')}
            className="inline-flex items-center gap-2 rounded-xl bg-[#F5A623] hover:bg-[#E09215] text-[#123B2A] px-6 py-3.5 text-[14px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Submit an Idea</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/collaborations')}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 text-white px-5 py-3.5 text-[14px] font-semibold transition-all active:scale-[0.98] cursor-pointer"
          >
            <Users className="h-4 w-4 text-[#F5A623]" />
            <span>Explore Collaborations</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
