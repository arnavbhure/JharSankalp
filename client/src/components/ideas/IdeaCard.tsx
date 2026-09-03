import { useNavigate } from 'react-router-dom';
import { IdeaItem } from '../../types/ideas';
import { IdeaStageIndicator } from './IdeaStageIndicator';
import { ContributorStack } from './ContributorStack';
import { CollaborationNeeds } from './CollaborationNeeds';
import { ArrowRight, MapPin, Sparkles, Target } from 'lucide-react';

interface IdeaCardProps {
  idea: IdeaItem;
  onViewIdea: (idea: IdeaItem) => void;
  onJoinTeam: (idea: IdeaItem) => void;
}

export function IdeaCard({ idea, onViewIdea, onJoinTeam }: IdeaCardProps) {
  const navigate = useNavigate();

  const getStatusBadge = (status: IdeaItem['collaborationStatus']) => {
    switch (status) {
      case 'OPEN':
        return 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]';
      case 'TEAM_FORMED':
        return 'bg-[#F8F6F1] text-[#6B5845] border-[#EEEAE1]';
      case 'SEEKING_PARTNERS':
        return 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]';
      case 'COMPLETED':
        return 'bg-[#F1F5F9] text-[#475569] border-[#CBD5E1]';
      default:
        return 'bg-[#FAF9F5] text-[#6B5845] border-[#EEEAE1]';
    }
  };

  const getCategoryTheme = (category: string) => {
    switch (category.toLowerCase()) {
      case 'water management':
        return 'text-[#0284C7]';
      case 'agriculture':
        return 'text-[#15803D]';
      case 'mining safety':
        return 'text-[#D97706]';
      case 'education':
        return 'text-[#0D9488]';
      case 'healthcare':
        return 'text-[#E11D48]';
      case 'environment':
        return 'text-[#16A34A]';
      default:
        return 'text-[#123B2A]';
    }
  };

  return (
    <div
      onClick={() => onViewIdea(idea)}
      className="rounded-2xl border border-[#EEEAE1] bg-white hover:border-[#123B2A]/40 shadow-2xs hover:shadow-md transition-all duration-200 p-5 sm:p-6 text-left flex flex-col justify-between space-y-4 group cursor-pointer"
    >
      {/* ── Card Header: Category, District & Status ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider">
            <span className={getCategoryTheme(idea.category)}>{idea.category}</span>
            <span className="text-[#6B5845]">·</span>
            <span className="text-[#6B5845] flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {idea.district}
            </span>
          </div>

          <span
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${getStatusBadge(
              idea.collaborationStatus
            )}`}
          >
            {idea.statusLabel}
          </span>
        </div>

        {/* ── Parent Challenge Link ── */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/challenges/${idea.challengeId}`);
          }}
          className="text-left w-full inline-flex items-center gap-1 text-[11.5px] font-medium text-[#6B5845] hover:text-[#123B2A] transition-colors truncate"
        >
          <Target className="h-3 w-3 text-[#F5A623] shrink-0" />
          <span className="font-mono uppercase font-semibold text-[10px] text-[#123B2A]">
            SOLVING:
          </span>
          <span className="truncate hover:underline">{idea.challengeTitle}</span>
          <ArrowRight className="h-2.5 w-2.5 shrink-0 opacity-70" />
        </button>

        {/* ── Title & Summary ── */}
        <div className="space-y-1.5 pt-1">
          <h3
            onClick={() => onViewIdea(idea)}
            className="text-[1.2rem] sm:text-[1.28rem] font-extrabold text-[#1D2522] tracking-tight font-sans leading-snug group-hover:text-[#123B2A] transition-colors cursor-pointer"
          >
            {idea.title}
          </h3>

          <p className="text-[13.5px] text-[#1D2522]/80 leading-relaxed line-clamp-3">
            {idea.summary}
          </p>
        </div>
      </div>

      {/* ── Middle: 6-Stage Progress Indicator ── */}
      <div className="py-2 border-t border-[#EEEAE1]">
        <IdeaStageIndicator currentStage={idea.stage} />
      </div>

      {/* ── Collaboration Needs Tags (if any) ── */}
      {idea.needs && idea.needs.length > 0 && (
        <CollaborationNeeds needs={idea.needs} />
      )}

      {/* ── Card Footer: Contributors & Actions ── */}
      <div className="pt-3 border-t border-[#EEEAE1] flex items-center justify-between flex-wrap gap-2">
        <ContributorStack contributors={idea.contributors} />

        <div className="flex items-center gap-2">
          {idea.collaborationStatus === 'OPEN' && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onJoinTeam(idea);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#EEEAE1] bg-[#FAF9F5] hover:bg-white text-[12px] font-bold text-[#123B2A] transition-colors cursor-pointer"
            >
              <Sparkles className="h-3 w-3 text-[#F5A623]" />
              <span>Join</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onViewIdea(idea)}
            className="inline-flex items-center gap-1 text-[13px] font-bold text-[#123B2A] hover:text-[#0D2B1E] group-hover:translate-x-0.5 transition-all cursor-pointer"
          >
            <span>View Idea</span>
            <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
