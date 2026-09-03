import { Project } from '../../types/projects';
import { ProjectRow } from './ProjectRow';
import { SearchX, RotateCcw } from 'lucide-react';

interface ProjectPortfolioProps {
  projects: Project[];
  onResetFilters: () => void;
}

export function ProjectPortfolio({ projects, onResetFilters }: ProjectPortfolioProps) {
  if (projects.length === 0) {
    return (
      <div className="py-16 text-center rounded-3xl bg-white border border-[#EEEAE1] p-8 space-y-3">
        <SearchX className="h-10 w-10 text-[#6B5845] mx-auto opacity-40" />
        <h4 className="text-[1.2rem] font-bold text-[#1D2522]">
          No projects found matching your criteria
        </h4>
        <p className="text-[13.5px] text-[#6B5845] max-w-sm mx-auto">
          Try clearing one or more filters or search terms to see active projects across Jharkhand.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-1.5 mt-2 px-4 py-2 rounded-xl bg-[#4C1E4F] text-white text-[13px] font-bold cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectRow key={project.id} project={project} />
      ))}
    </div>
  );
}
