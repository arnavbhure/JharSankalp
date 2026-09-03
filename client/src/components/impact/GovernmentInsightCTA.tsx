import { useNavigate } from 'react-router-dom';
import { ArrowRight, Landmark } from 'lucide-react';

export function GovernmentInsightCTA() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden rounded-[32px] bg-[#123B2A] text-white p-8 sm:p-12 lg:p-14 text-left border border-[#1E5A3A] shadow-lg">
      {/* Background Topographic Matrix */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] pattern-topography"
      />

      <div className="relative z-10 max-w-3xl space-y-5">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-[11px] font-mono font-bold tracking-wider uppercase text-[#F5A623]">
          <Landmark className="h-3.5 w-3.5" />
          <span>STATE INNOVATION INTELLIGENCE</span>
        </div>

        {/* Heading */}
        <h2 className="text-[2rem] sm:text-[2.6rem] font-extrabold text-white tracking-tight leading-tight font-sans">
          From individual projects to statewide decision-making.
        </h2>

        {/* Supporting copy */}
        <p className="text-[15px] sm:text-[16.5px] text-white/80 leading-relaxed font-normal max-w-2xl">
          JharSankalp helps government departments understand where challenges emerge, which
          institutions are responding, and where innovation is producing measurable outcomes.
        </p>

        {/* Actions */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 rounded-xl bg-[#F5A623] hover:bg-[#E09215] text-[#123B2A] px-6 py-3.5 text-[14px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>View Government Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
