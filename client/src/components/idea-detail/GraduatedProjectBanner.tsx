import { Link } from 'react-router-dom';
import { getProjectsForIdea } from '../../services/ecosystemApi';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface GraduatedProjectBannerProps {
  ideaId: string;
}

export function GraduatedProjectBanner({ ideaId }: GraduatedProjectBannerProps) {
  const linkedProjects = getProjectsForIdea(ideaId);
  const project = linkedProjects[0];

  if (!project) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-[#BBF7D0] bg-[#F0FDF4] p-6 sm:p-7 shadow-xs text-left space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#BBF7D0] pb-3">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-[#15803D] text-white flex items-center justify-center">
            <CheckCircle2 className="h-3.5 w-3.5" />
          </span>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#15803D]">
            GRADUATED TO STRUCTURED EXECUTION
          </span>
        </div>

        <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white text-[#15803D] border border-[#BBF7D0]">
          ● {project.stageLabel}
        </span>
      </div>

      <div className="space-y-1">
        <span className="text-[11px] font-mono text-[#6B5845]">
          Project ID: <strong className="text-[#1D2522]">{project.projectCode}</strong> · Lead:{' '}
          <strong className="text-[#123B2A]">{project.leadInstitution}</strong>
        </span>
        <h4 className="text-[1.35rem] sm:text-[1.5rem] font-extrabold text-[#1D2522] font-sans">
          {project.title}
        </h4>
        <p className="text-[13px] text-[#6B5845] leading-relaxed">{project.summary}</p>
      </div>

      <div className="pt-2">
        <Link
          to={`/projects/${project.id}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[12.5px] font-bold shadow-xs transition-all"
        >
          <span>Open Full Project Implementation Dossier</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
