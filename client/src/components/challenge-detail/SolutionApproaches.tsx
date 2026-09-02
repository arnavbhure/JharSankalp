import { Lightbulb } from 'lucide-react';
import { ChallengeDetailData } from '../../types/challengeDetail';

interface SolutionApproachesProps {
  challenge: ChallengeDetailData;
  onProposeIdea: () => void;
}

export function SolutionApproaches({ challenge, onProposeIdea }: SolutionApproachesProps) {
  return (
    <section id="solution-ideas" className="py-12 sm:py-16 border-b border-[#EEEAE1] text-left">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#123B2A] font-bold">
            <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
            ACTIVE WORKSTREAMS IN EXPLORATION
          </div>
          <h2 className="text-[1.85rem] sm:text-[2.25rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Ideas being explored
          </h2>
          <p className="text-[14px] text-[#6B5845] max-w-xl">
            Multiple parallel hypotheses under technical investigation. No single technology has been finalized as the definitive answer.
          </p>
        </div>

        <button
          onClick={onProposeIdea}
          className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-[#123B2A] hover:bg-[#0D2B1E] text-white px-5 py-2.5 text-[13.5px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <Lightbulb className="h-4 w-4 text-[#F5A623]" />
          <span>Propose an Alternative Approach</span>
        </button>
      </div>

      {/* 3 Solution Approaches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenge.solutionApproaches.map((approach) => {
          const isUnderDiscussion = approach.status === 'Under Discussion';

          return (
            <div
              key={approach.number}
              className="rounded-2xl border border-[#EEEAE1] bg-white p-6 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-4 text-left"
            >
              <div className="space-y-3">
                {/* Header: Approach Number & Status Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] font-mono font-extrabold uppercase tracking-wider text-[#123B2A]">
                    {approach.number}
                  </span>

                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold ${
                      isUnderDiscussion
                        ? 'bg-[#FEF6E9] text-[#B45309] border border-[#F8CCA5]'
                        : 'bg-[#F0F7FF] text-[#0284C7] border border-[#CCE2FF]'
                    }`}
                  >
                    {approach.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[1.2rem] font-bold text-[#1D2522] tracking-tight leading-snug font-sans">
                  {approach.title}
                </h3>

                {/* Description */}
                <p className="text-[13.5px] text-[#1D2522]/80 leading-relaxed">
                  {approach.description}
                </p>
              </div>

              {/* Exploration Notes & Potential Partners */}
              <div className="pt-3 border-t border-[#EEEAE1] space-y-2 text-[12px]">
                <div className="text-[#6B5845]">
                  <strong className="text-[#1D2522] font-semibold">Exploration Focus:</strong>{' '}
                  {approach.feasibilityNotes}
                </div>

                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="font-mono text-[#6B5845] text-[11px]">Explored by:</span>
                  {approach.potentialPartners.map((partner) => (
                    <span
                      key={partner}
                      className="px-2 py-0.5 rounded bg-[#FAF9F5] border border-[#EEEAE1] text-[11px] font-medium text-[#123B2A]"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
