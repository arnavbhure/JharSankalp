import { ArrowRight, Users, Plus } from 'lucide-react';

interface CollaborationsCTAProps {
  onFindClick: () => void;
  onStartClick: () => void;
}

export function CollaborationsCTA({
  onFindClick,
  onStartClick,
}: CollaborationsCTAProps) {
  return (
    <section className="relative overflow-hidden rounded-[32px] bg-[#123B2A] text-white p-8 sm:p-12 lg:p-14 text-left border border-[#1E5A3A] shadow-md my-6">
      {/* Background Contour Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] pattern-topography"
      />

      <div className="relative z-10 max-w-3xl space-y-5">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-[11px] font-mono font-bold tracking-wider uppercase text-[#F5A623]">
          <Users className="h-3.5 w-3.5" />
          <span>COLLECTIVE ACTION STARTS HERE</span>
        </div>

        {/* Heading */}
        <h2 className="text-[2rem] sm:text-[2.6rem] font-extrabold text-white tracking-tight leading-tight font-sans">
          Your skills could help solve a local problem.
        </h2>

        {/* Supporting text */}
        <p className="text-[15px] sm:text-[16.5px] text-white/80 leading-relaxed font-normal max-w-2xl">
          Whether you are a student, researcher, professional, institution or community member, there is a place for your contribution.
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3.5 flex-wrap pt-2">
          <button
            type="button"
            onClick={onFindClick}
            className="inline-flex items-center gap-2 rounded-xl bg-[#F5A623] hover:bg-[#E09215] text-[#123B2A] px-6 py-3.5 text-[14px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Find a Collaboration</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onStartClick}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 text-white px-5 py-3.5 text-[14px] font-semibold transition-all active:scale-[0.98] cursor-pointer"
          >
            <Plus className="h-4 w-4 text-[#F5A623] stroke-[3]" />
            <span>Start a Project</span>
          </button>
        </div>
      </div>
    </section>
  );
}
