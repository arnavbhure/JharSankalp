import { Project, ProjectPartner } from '../../types/projects';
import { ArrowRight, MapPin, Users, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectRowProps {
  project: Project;
}

export function ProjectRow({ project }: ProjectRowProps) {
  // Stage styling tags
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'FORMATION':
      case 'RESEARCH_DESIGN':
        return 'bg-[#4C1E4F]/10 text-[#4C1E4F] border-[#4C1E4F]/30';
      case 'PROTOTYPE':
        return 'bg-[#FEF6E9] text-[#B45309] border-[#FDE68A]';
      case 'FIELD_PILOT':
        return 'bg-[#FEE1C7] text-[#FA7E61] border-[#FA7E61]/40';
      case 'IMPLEMENTATION':
      case 'IMPACT_VERIFICATION':
        return 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Format participant summary: "Lead + 2nd + X more"
  const participantSummary = () => {
    if (project.partners.length === 0) return project.leadInstitution;
    const lead = project.partners[0]?.name || project.leadInstitution;
    const second = project.partners[1]?.name;
    const remaining = project.partners.length - 2;

    if (remaining > 0) {
      return `${lead} + ${second} + ${remaining} more`;
    } else if (second) {
      return `${lead} + ${second}`;
    }
    return lead;
  };

  const progressPercentage = Math.round(
    (project.milestoneProgress.completed / project.milestoneProgress.total) * 100,
  );

  return (
    <div className="group rounded-2xl bg-white border border-[#EEEAE1] hover:border-[#B5A886] p-5 sm:p-7 transition-all duration-200 shadow-2xs hover:shadow-md text-left space-y-4">
      {/* ── Header Metadata Bar ── */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Domain Tag */}
          <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-[#4C1E4F] bg-[#F8F6F1] px-2.5 py-0.5 rounded border border-[#EEEAE1]">
            {project.domain}
          </span>

          {/* Location */}
          <span className="flex items-center gap-1 text-[12px] font-mono text-[#6B5845]">
            <MapPin className="h-3.5 w-3.5 text-[#FA7E61]" />
            {project.locationDisplay}
          </span>
        </div>

        {/* Stage Badge */}
        <span
          className={`text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${getStageColor(
            project.stage,
          )}`}
        >
          ● {project.stageLabel}
        </span>
      </div>

      {/* ── Project Title and One-Line Description ── */}
      <div className="space-y-1.5">
        <Link
          to={`/projects/${project.id}`}
          className="text-[1.3rem] sm:text-[1.5rem] font-extrabold text-[#1D2522] group-hover:text-[#4C1E4F] transition-colors leading-snug block font-sans"
        >
          {project.title}
        </Link>
        <p className="text-[14.5px] text-[#6B5845] leading-relaxed max-w-4xl">
          {project.oneLineDescription}
        </p>
      </div>

      {/* ── Horizontal Details & Metrics Bar ── */}
      <div className="pt-3 border-t border-[#EEEAE1] grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        {/* Participants (5 cols) */}
        <div className="sm:col-span-4 space-y-0.5">
          <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] flex items-center gap-1">
            <Building2 className="h-3 w-3 text-[#123B2A]" />
            Participants
          </span>
          <div
            className="text-[12.5px] font-medium text-[#1D2522] truncate"
            title={project.partners.map((p: ProjectPartner) => p.name).join(', ')}
          >
            {participantSummary()}
          </div>
        </div>

        {/* Impact Scope (3 cols) */}
        <div className="sm:col-span-3 space-y-0.5">
          <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] flex items-center gap-1">
            <Users className="h-3 w-3 text-[#15803D]" />
            Impact Scope
          </span>
          <div className="text-[12.5px] font-bold text-[#123B2A]">
            {project.beneficiaries
              ? `${project.beneficiaries.toLocaleString()} Beneficiaries`
              : project.impactMetric}
          </div>
        </div>

        {/* Milestone Progress (3 cols) */}
        <div className="sm:col-span-3 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#6B5845]">Milestones</span>
            <span className="font-bold text-[#123B2A]">
              {project.milestoneProgress.completed} / {project.milestoneProgress.total} Done
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#EEEAE1] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#4C1E4F] to-[#FA7E61]"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Action Button (2 cols) */}
        <div className="sm:col-span-2 sm:text-right">
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F8F6F1] hover:bg-[#4C1E4F] text-[#1D2522] hover:text-white text-[12.5px] font-bold transition-all shadow-2xs group/btn"
          >
            <span>View Project</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#FA7E61] group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
