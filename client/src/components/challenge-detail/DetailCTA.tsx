import { ArrowRight, Users } from 'lucide-react';

interface DetailCTAProps {
  onContributeIdea: () => void;
  onJoinCollaboration: () => void;
}

export function DetailCTA({ onContributeIdea, onJoinCollaboration }: DetailCTAProps) {
  return (
    <section className="relative overflow-hidden bg-[#123B2A] text-white py-16 sm:py-20 border-t border-[#1F5A3D] text-left">
      {/* Background Topographic Matrix */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] pattern-topography"
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-[11.5px] font-mono font-bold tracking-wider uppercase text-[#F5A623] shadow-2xs">
          <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
          <span>COLLECTIVE CIVIC ACTION</span>
        </div>

        <h2 className="text-[2.2rem] sm:text-[2.75rem] font-extrabold text-white tracking-tight leading-tight font-sans">
          A problem becomes solvable <br className="hidden sm:inline" />
          when the right people come together.
        </h2>

        <p className="text-[15.5px] sm:text-[16.5px] text-white/85 max-w-2xl mx-auto leading-relaxed">
          Bring your knowledge, ideas, technology or institutional expertise to help move this
          challenge forward.
        </p>

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={onContributeIdea}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#F5A623] hover:bg-[#E09215] text-[#123B2A] px-7 py-3.5 text-[14.5px] font-extrabold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Contribute an Idea</span>
            <ArrowRight className="h-4 w-4 stroke-[2.5]" />
          </button>

          <button
            onClick={onJoinCollaboration}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 hover:bg-white/15 text-white px-7 py-3.5 text-[14.5px] font-bold transition-all active:scale-[0.98] cursor-pointer backdrop-blur-xs"
          >
            <Users className="h-4 w-4 text-[#F5A623]" />
            <span>Join the Collaboration</span>
          </button>
        </div>
      </div>
    </section>
  );
}
