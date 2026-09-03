import { STAGE_COUNTS } from '../../data/projectsData';
import { ChevronRight, Filter } from 'lucide-react';

interface ProjectStageExplorerProps {
  selectedStage: string;
  onSelectStage: (stage: string) => void;
}

export function ProjectStageExplorer({ selectedStage, onSelectStage }: ProjectStageExplorerProps) {
  return (
    <section className="border-b border-[#EEEAE1] bg-[#FAF9F5] py-12 sm:py-16 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#123B2A] font-bold">
              <span className="h-2 w-2 rounded-full bg-[#FA7E61]" />
              CONTINUOUS LIFECYCLE PROGRESSION
            </div>
            <h2 className="text-[2rem] sm:text-[2.5rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              Where solutions are in their journey.
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#6B5845] max-w-2xl">
              Every project moves through a different path from research to real-world
              implementation.
            </p>
          </div>

          {/* Quick Stage Reset button if active */}
          {selectedStage !== 'ALL' && selectedStage !== 'ALL PROJECTS' && (
            <button
              type="button"
              onClick={() => onSelectStage('ALL')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#B5A886]/40 bg-white text-[12.5px] font-mono font-bold text-[#4C1E4F] hover:bg-[#FEE1C7]/30 transition-all cursor-pointer shrink-0"
            >
              <Filter className="h-3.5 w-3.5 text-[#FA7E61]" />
              <span>Show All Stages ({STAGE_COUNTS.reduce((acc, c) => acc + c.count, 0)})</span>
            </button>
          )}
        </div>

        {/* ── Connected Lifecycle Stage Ribbon ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-2">
          {STAGE_COUNTS.map((stageItem, index) => {
            const isSelected = selectedStage === stageItem.stage;
            const isLast = index === STAGE_COUNTS.length - 1;

            return (
              <button
                key={stageItem.stage}
                type="button"
                onClick={() => onSelectStage(isSelected ? 'ALL' : stageItem.stage)}
                className={`relative p-4 rounded-2xl text-left transition-all group cursor-pointer border ${
                  isSelected
                    ? 'bg-[#4C1E4F] text-white border-[#4C1E4F] shadow-md ring-2 ring-[#FA7E61]'
                    : 'bg-white hover:bg-[#FAF9F5] text-[#1D2522] border-[#EEEAE1] hover:border-[#B5A886]/60 shadow-2xs'
                }`}
              >
                {/* Step Index Pill */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-white/15 text-[#FEE1C7]' : 'bg-[#F8F6F1] text-[#6B5845]'
                    }`}
                  >
                    {stageItem.stepNumber}
                  </span>

                  {!isLast && (
                    <ChevronRight
                      className={`h-4 w-4 hidden lg:block ${
                        isSelected ? 'text-[#FEE1C7]/60' : 'text-[#6B5845]/30'
                      }`}
                    />
                  )}
                </div>

                {/* Stage Title */}
                <div
                  className={`text-[13px] font-extrabold uppercase tracking-wider font-sans leading-snug ${
                    isSelected ? 'text-white' : 'text-[#1D2522]'
                  }`}
                >
                  {stageItem.label}
                </div>

                {/* Project Count Badge */}
                <div className="mt-3 pt-3 border-t border-current/10 flex items-center justify-between">
                  <span
                    className={`text-[12px] font-mono font-bold ${
                      isSelected ? 'text-[#FA7E61]' : 'text-[#123B2A]'
                    }`}
                  >
                    {stageItem.count} {stageItem.count === 1 ? 'Project' : 'Projects'}
                  </span>

                  <span
                    className={`text-[10px] uppercase font-mono ${
                      isSelected ? 'text-[#FEE1C7]/70' : 'text-[#6B5845]'
                    }`}
                  >
                    {isSelected ? 'Active Filter' : 'Filter ↓'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
