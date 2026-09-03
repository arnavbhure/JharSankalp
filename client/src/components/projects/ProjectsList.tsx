import { Project } from '../../types/projects';
import { ProjectRow } from './ProjectRow';
import { ProjectsEmptyState } from './ProjectsEmptyState';

interface ProjectsListProps {
  projects: Project[];
  onResetFilters: () => void;
}

export function ProjectsList({ projects, onResetFilters }: ProjectsListProps) {
  if (projects.length === 0) {
    return <ProjectsEmptyState onReset={onResetFilters} />;
  }

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-baseline justify-between border-b border-[#EEEAE1] pb-3">
        <div className="space-y-1">
          <h3 className="text-[1.6rem] sm:text-[1.85rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Across Jharkhand
          </h3>
          <p className="text-[13.5px] text-[#6B5845]">
            Projects currently moving from research and experimentation toward ground implementation.
          </p>
        </div>

        <span className="text-[12px] font-mono text-[#6B5845] shrink-0 font-semibold">
          Showing {projects.length} Active Project{projects.length === 1 ? '' : 's'}
        </span>
      </div>

      <div className="space-y-3.5">
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
