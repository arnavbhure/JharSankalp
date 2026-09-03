import { useNavigate } from 'react-router-dom';
import { IdeaDetail } from '../../types/ideaDetail';
import { Sparkles, ArrowRight, Target, Users, GitBranch, ShieldCheck } from 'lucide-react';

interface IdeaContextSidebarProps {
  idea: IdeaDetail;
  onContributeClick: () => void;
}

export function IdeaContextSidebar({ idea, onContributeClick }: IdeaContextSidebarProps) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-32 space-y-5 text-left">
      {/* ── Context Docket Card ── */}
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 shadow-2xs space-y-5">
        <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            IDEA WORKSPACE DOSSIER
          </span>
          <span className="text-[10.5px] font-mono text-[#6B5845]">{idea.referenceId}</span>
        </div>

        {/* 4 Metadata Points */}
        <div className="space-y-4 text-[13px]">
          {/* Stage */}
          <div className="flex items-start justify-between gap-2">
            <span className="text-[11px] font-mono text-[#6B5845] uppercase flex items-center gap-1.5">
              <GitBranch className="h-3.5 w-3.5 text-[#123B2A]" />
              IDEA STAGE:
            </span>
            <span className="font-bold text-[#15803D] text-right">{idea.stageLabel}</span>
          </div>

          {/* Contributors */}
          <div className="flex items-start justify-between gap-2">
            <span className="text-[11px] font-mono text-[#6B5845] uppercase flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-[#123B2A]" />
              CONTRIBUTORS:
            </span>
            <span className="font-bold text-[#1D2522]">
              {idea.contributors.length} Active Members
            </span>
          </div>

          {/* Collaboration Opportunities */}
          <div className="flex items-start justify-between gap-2">
            <span className="text-[11px] font-mono text-[#6B5845] uppercase flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
              OPEN ROLES:
            </span>
            <span className="font-bold text-[#B45309]">
              {idea.collaborationNeeds.length} Opportunities
            </span>
          </div>

          {/* Related Challenge */}
          <div className="flex flex-col gap-1 pt-2 border-t border-[#EEEAE1]">
            <span className="text-[11px] font-mono text-[#6B5845] uppercase flex items-center gap-1.5">
              <Target className="h-3.5 w-3.5 text-[#F5A623]" />
              RELATED CHALLENGE:
            </span>
            <button
              type="button"
              onClick={() => navigate(`/challenges/${idea.parentChallenge.id}`)}
              className="text-left font-bold text-[#123B2A] hover:underline text-[12.5px] leading-snug cursor-pointer flex items-center gap-1"
            >
              <span className="truncate">{idea.parentChallenge.title}</span>
              <ArrowRight className="h-3 w-3 shrink-0" />
            </button>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2 border-t border-[#EEEAE1]">
          <button
            type="button"
            onClick={onContributeClick}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[14px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-[#F5A623]" />
            <span>Contribute to This Idea</span>
          </button>
        </div>
      </div>

      {/* Verification / Security note */}
      <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] flex items-start gap-2.5 text-[12px] text-[#6B5845] leading-relaxed">
        <ShieldCheck className="h-4 w-4 text-[#123B2A] shrink-0 mt-0.5" />
        <span>
          JharSankalp peer-reviews technical proposals with university faculty and district Jal
          Samitis before live field deployment.
        </span>
      </div>
    </div>
  );
}
