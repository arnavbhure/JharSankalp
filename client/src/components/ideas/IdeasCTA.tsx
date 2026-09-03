import { ArrowRight, Lightbulb, HelpCircle, Plus } from 'lucide-react';

interface IdeasCTAProps {
  onOpenSubmitModal: () => void;
  onOpenExplainer?: () => void;
}

export function IdeasCTA({ onOpenSubmitModal, onOpenExplainer }: IdeasCTAProps) {
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
          <span>HAVE AN IDEA?</span>
        </div>

        {/* Heading */}
        <h2 className="text-[2rem] sm:text-[2.6rem] font-extrabold text-white tracking-tight leading-tight font-sans">
          A local observation could become a statewide solution.
        </h2>

        {/* Supporting text */}
        <p className="text-[15px] sm:text-[16.5px] text-white/80 leading-relaxed font-normal max-w-2xl">
          Share a problem you understand, an opportunity you see or a solution worth exploring. Your idea will be visible to innovators, students, and district officers across Jharkhand.
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3.5 flex-wrap pt-2">
          <button
            type="button"
            onClick={onOpenSubmitModal}
            className="inline-flex items-center gap-2 rounded-xl bg-[#F5A623] hover:bg-[#E09215] text-[#123B2A] px-6 py-3.5 text-[14px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
          >
            <Plus className="h-4 w-4 stroke-[3]" />
            <span>Submit Your Idea</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onOpenExplainer}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 text-white px-5 py-3.5 text-[14px] font-semibold transition-all active:scale-[0.98] cursor-pointer"
          >
            <HelpCircle className="h-4 w-4 text-[#F5A623]" />
            <span>How Ideas Work</span>
          </button>
        </div>
      </div>
    </section>
  );
}
