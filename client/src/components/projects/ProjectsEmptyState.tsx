import { Rocket, RotateCcw } from 'lucide-react';

interface ProjectsEmptyStateProps {
  onReset: () => void;
}

export function ProjectsEmptyState({ onReset }: ProjectsEmptyStateProps) {
  return (
    <div className="rounded-3xl border border-[#EEEAE1] bg-white p-12 sm:p-16 text-center space-y-5 shadow-2xs text-left max-w-xl mx-auto my-8">
      <div className="h-16 w-16 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] flex items-center justify-center text-[#123B2A] mx-auto shadow-2xs">
        <Rocket className="h-8 w-8 text-[#F5A623]" />
      </div>

      <div className="space-y-1.5 text-center">
        <h3 className="text-[1.45rem] font-extrabold text-[#1D2522] font-sans">
          No projects match these filters.
        </h3>
        <p className="text-[14px] text-[#6B5845] leading-relaxed max-w-md mx-auto">
          Try exploring another district, domain or project stage to discover active multi-stakeholder initiatives.
        </p>
      </div>

      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13.5px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <RotateCcw className="h-4 w-4 text-[#F5A623]" />
          <span>Reset All Filters</span>
        </button>
      </div>
    </div>
  );
}
