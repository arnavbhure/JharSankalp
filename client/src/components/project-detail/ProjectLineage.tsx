import { useNavigate } from 'react-router-dom';
import { ProjectDetail } from '../../types/projectDetail';
import { Target, Lightbulb, Rocket, ArrowRight, GitCommit } from 'lucide-react';

interface ProjectLineageProps {
  project: ProjectDetail;
}

export function ProjectLineage({ project }: ProjectLineageProps) {
  const navigate = useNavigate();

  return (
    <section id="lineage" className="scroll-mt-32 space-y-5 text-left">
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="space-y-1 border-b border-[#EEEAE1] pb-4">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <GitCommit className="h-4 w-4 text-[#F5A623]" />
            <span>ECOSYSTEM PROVENANCE & LINEAGE</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            How this project began
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl leading-relaxed">
            Every active project on JharSankalp originates from a community-reported societal problem and an evaluated solution hypothesis.
          </p>
        </div>

        {/* ── Connected 3-Entity Lineage Track ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch relative">
          {/* Entity 1: Challenge */}
          <div
            onClick={() => navigate(`/challenges/${project.challenge.id}`)}
            className="p-5 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] hover:border-[#123B2A]/50 hover:bg-white transition-all cursor-pointer space-y-3 flex flex-col justify-between group shadow-2xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#BE123C] bg-[#FFF5F5] px-2.5 py-0.5 rounded border border-[#FECDD3]">
                  <Target className="h-3 w-3" />
                  01 CHALLENGE
                </span>
                <span className="text-[10px] font-mono text-[#6B5845]">
                  {project.challenge.id}
                </span>
              </div>

              <h4 className="text-[14px] font-bold text-[#1D2522] group-hover:text-[#123B2A] transition-colors leading-snug">
                {project.challenge.title}
              </h4>

              <p className="text-[11.5px] text-[#6B5845] font-mono">
                Location: {project.challenge.location}
              </p>
            </div>

            <div className="pt-2 border-t border-[#EEEAE1] flex items-center justify-between text-[11.5px] font-bold text-[#123B2A]">
              <span>View Challenge File</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Entity 2: Idea */}
          <div
            onClick={() => project.idea && navigate(`/ideas/${project.idea.id}`)}
            className={`p-5 rounded-2xl border transition-all space-y-3 flex flex-col justify-between group shadow-2xs ${
              project.idea
                ? 'border-[#EEEAE1] bg-[#FAF9F5] hover:border-[#123B2A]/50 hover:bg-white cursor-pointer'
                : 'border-[#EEEAE1]/60 bg-[#FAF9F5]/40 opacity-70'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#B45309] bg-[#FFFBEB] px-2.5 py-0.5 rounded border border-[#FDE68A]">
                  <Lightbulb className="h-3 w-3" />
                  02 PROPOSED IDEA
                </span>
                {project.idea && (
                  <span className="text-[10px] font-mono text-[#6B5845]">
                    {project.idea.id}
                  </span>
                )}
              </div>

              <h4 className="text-[14px] font-bold text-[#1D2522] group-hover:text-[#123B2A] transition-colors leading-snug">
                {project.idea?.title || 'Academic & Grassroots Solution Hypothesis'}
              </h4>

              <p className="text-[11.5px] text-[#6B5845]">
                Peer-reviewed hypothesis connecting sensing collars to community mechanics.
              </p>
            </div>

            <div className="pt-2 border-t border-[#EEEAE1] flex items-center justify-between text-[11.5px] font-bold text-[#123B2A]">
              <span>Explore Idea Dossier</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Entity 3: Active Project */}
          <div className="p-5 rounded-2xl border-2 border-[#123B2A] bg-[#FFFDF9] space-y-3 flex flex-col justify-between shadow-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A] bg-[#F0FDF4] px-2.5 py-0.5 rounded border border-[#BBF7D0]">
                  <Rocket className="h-3 w-3 text-[#F5A623]" />
                  03 ACTIVE PROJECT
                </span>
                <span className="text-[10px] font-mono text-[#15803D] font-bold">
                  {project.stageLabel}
                </span>
              </div>

              <h4 className="text-[14px] font-bold text-[#1D2522] leading-snug">
                {project.title}
              </h4>

              <p className="text-[11.5px] text-[#6B5845]">
                Committed multi-institution consortium actively testing in {project.location}.
              </p>
            </div>

            <div className="pt-2 border-t border-[#123B2A]/20 flex items-center justify-between text-[11.5px] font-mono font-bold text-[#123B2A]">
              <span>Current Execution Workspace</span>
              <span className="text-[#15803D]">● Live</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
