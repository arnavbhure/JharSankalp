import { useNavigate } from 'react-router-dom';
import { Project } from '../../types/projects';
import { ProjectHealthIndicator } from './ProjectHealthIndicator';
import { MapPin, ArrowRight, Sparkles, Building2 } from 'lucide-react';

interface ProjectRowProps {
  project: Project;
}

const STAGE_ORDER = [
  'DISCOVERY',
  'DESIGN',
  'PROTOTYPE',
  'FIELD_PILOT',
  'IMPACT_VERIFICATION',
  'SCALING',
];

export function ProjectRow({ project }: ProjectRowProps) {
  const navigate = useNavigate();

  const currentStageIdx = STAGE_ORDER.indexOf(project.stage);
  const totalStages = STAGE_ORDER.length;

  const collaborationNeed =
    project.collaborationNeeds && project.collaborationNeeds.length > 0
      ? project.collaborationNeeds[0]
      : null;

  return (
    <div className="rounded-2xl border border-[#EEEAE1] bg-white hover:border-[#123B2A]/50 shadow-2xs hover:shadow-xs transition-all p-5 sm:p-7 text-left space-y-4 group">
      {/* ── Top Strip: Domain, Location, Project Code, and Health ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EEEAE1]/80 pb-3">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider flex-wrap">
          <span className="text-[#123B2A] bg-[#FAF9F5] px-2.5 py-0.5 rounded border border-[#EEEAE1]">
            {project.domain}
          </span>
          <span className="text-[#6B5845]/60">·</span>
          <span className="text-[#6B5845] flex items-center gap-1">
            <MapPin className="h-3 w-3 text-[#BE123C]" />
            {project.location}
          </span>
          <span className="text-[#6B5845]/60">·</span>
          <span className="text-[#6B5845] font-mono">{project.projectCode}</span>
        </div>

        <div className="flex items-center gap-2.5">
          <ProjectHealthIndicator health={project.health} label={project.healthLabel} />
        </div>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left / Center: Title, Challenge Interlink, Partners (7 cols) */}
        <div className="lg:col-span-7 space-y-2.5">
          <h3
            onClick={() => navigate(`/projects/${project.id}`)}
            className="text-[1.35rem] sm:text-[1.5rem] font-extrabold text-[#1D2522] font-sans group-hover:text-[#123B2A] cursor-pointer transition-colors leading-snug"
          >
            {project.title}
          </h3>

          <div className="text-[12.5px] text-[#6B5845] flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-[10.5px] font-bold text-[#123B2A] uppercase">
              Challenge:
            </span>
            <span
              onClick={() => navigate(`/challenges/${project.relatedChallengeId}`)}
              className="text-[#1D2522] hover:text-[#123B2A] hover:underline cursor-pointer font-medium truncate max-w-md"
            >
              {project.relatedChallengeTitle}
            </span>
          </div>

          {/* Compact Organization Stack (Not generic avatar circles) */}
          <div className="flex items-center gap-2 text-[12px] text-[#1D2522] flex-wrap pt-1">
            <Building2 className="h-3.5 w-3.5 text-[#6B5845] shrink-0" />
            <div className="flex items-center gap-1.5 flex-wrap">
              {project.partners.map((partner, idx) => (
                <span key={partner.id} className="inline-flex items-center gap-1.5">
                  <span className="font-semibold text-[#1D2522]">
                    {partner.name}
                  </span>
                  {idx < project.partners.length - 1 && (
                    <span className="text-[#6B5845]/50 font-bold">+</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Collaboration Need Badge (if seeking partner) */}
          {collaborationNeed && (
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#B45309] bg-[#FFFBEB] px-3 py-1 rounded-md border border-[#FDE68A]">
                <Sparkles className="h-3 w-3 text-[#F5A623]" />
                <span>SEEKING: {collaborationNeed.type}</span>
              </span>
            </div>
          )}
        </div>

        {/* Right: Stage, Beneficiaries, Progress, Action (5 cols) */}
        <div className="lg:col-span-5 space-y-3 lg:border-l lg:border-[#EEEAE1] lg:pl-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2A] block">
                STAGE & PROGRESS
              </span>
              <span className="text-[12.5px] font-extrabold text-[#1D2522] font-mono">
                {project.stageLabel}
              </span>
            </div>

            <div className="text-right space-y-0.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6B5845] block">
                POTENTIAL IMPACT
              </span>
              <span className="text-[13px] font-extrabold text-[#15803D] font-mono">
                {project.impactMetric}
              </span>
            </div>
          </div>

          {/* Stepped Progress Indicator */}
          <div className="space-y-1">
            <div className="grid grid-cols-6 gap-1 h-2 w-full">
              {STAGE_ORDER.map((s, idx) => {
                const isPassed = idx <= currentStageIdx;
                const isCurrent = idx === currentStageIdx;

                return (
                  <div
                    key={s}
                    className={`rounded-full transition-all ${
                      isCurrent
                        ? 'bg-[#123B2A]'
                        : isPassed
                        ? 'bg-[#15803D]'
                        : 'bg-[#EEEAE1]'
                    }`}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-[#6B5845]">
              <span>Stage {currentStageIdx + 1} of {totalStages}</span>
              <span>{project.progressPercentage}% complete</span>
            </div>
          </div>

          {/* Action Link */}
          <div className="pt-2 flex items-center justify-end">
            <button
              type="button"
              onClick={() => navigate(`/projects/${project.id}`)}
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#123B2A] hover:underline group-hover:translate-x-0.5 transition-transform cursor-pointer"
            >
              <span>View Project</span>
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
