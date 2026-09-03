import { useNavigate } from 'react-router-dom';
import { MyIdeaItem, MyIdeaStatus } from '../../types/myIdeas';
import { ArrowRight, MapPin, Users, Sparkles, Radio } from 'lucide-react';

interface MyIdeaRowProps {
  idea: MyIdeaItem;
}

const STAGES_FLOW = [
  { key: 'Submitted', label: 'Submitted' },
  { key: 'Review', label: 'Review' },
  { key: 'Published', label: 'Published' },
  { key: 'Collaboration', label: 'Collaboration' },
  { key: 'Project', label: 'Project' },
];

export function MyIdeaRow({ idea }: MyIdeaRowProps) {
  const navigate = useNavigate();

  const getStageIndex = (status: MyIdeaStatus): number => {
    switch (status) {
      case 'UNDER_REVIEW':
        return 1;
      case 'PUBLISHED':
        return 2;
      case 'ACTIVE_COLLABORATION':
        return 3;
      case 'PROJECT_FORMATION':
        return 4;
      case 'PROJECT_ACTIVE':
      case 'COMPLETED':
        return 5;
      default:
        return 0;
    }
  };

  const activeStageIdx = getStageIndex(idea.status);

  const getStatusBadge = (status: MyIdeaStatus) => {
    switch (status) {
      case 'UNDER_REVIEW':
        return 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]';
      case 'PUBLISHED':
        return 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]';
      case 'ACTIVE_COLLABORATION':
        return 'bg-[#F0FDF4] text-[#123B2A] border-[#123B2A]/30';
      case 'PROJECT_FORMATION':
        return 'bg-[#FAF5FF] text-[#7E22CE] border-[#E9D5FF]';
      case 'PROJECT_ACTIVE':
      case 'COMPLETED':
        return 'bg-[#F1F5F9] text-[#334155] border-[#CBD5E1]';
      default:
        return 'bg-[#FAF9F5] text-[#6B5845] border-[#EEEAE1]';
    }
  };

  return (
    <div className="rounded-2xl border border-[#EEEAE1] bg-white hover:border-[#123B2A]/40 shadow-2xs hover:shadow-xs transition-all p-5 sm:p-6 space-y-4 text-left">
      {/* ── Top Bar: Domain, Location & Status ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EEEAE1]/80 pb-3">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider">
          <span className="text-[#123B2A] bg-[#FAF9F5] px-2.5 py-0.5 rounded border border-[#EEEAE1]">
            {idea.category}
          </span>
          <span className="text-[#6B5845]">·</span>
          <span className="text-[#6B5845] flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {idea.district} {idea.block ? `(${idea.block})` : ''}
          </span>
          <span className="text-[#6B5845]">·</span>
          <span className="text-[#6B5845] font-mono">{idea.referenceId}</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-[10.5px] font-mono font-bold px-2.5 py-0.5 rounded-md border uppercase tracking-wider ${getStatusBadge(
              idea.status,
            )}`}
          >
            {idea.statusLabel}
          </span>
        </div>
      </div>

      {/* ── Main Idea Content & Challenge Interlink ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 space-y-1.5">
          <h3
            onClick={() => navigate(`/ideas/${idea.id}`)}
            className="text-[1.25rem] sm:text-[1.35rem] font-extrabold text-[#1D2522] font-sans hover:text-[#123B2A] cursor-pointer transition-colors leading-snug"
          >
            {idea.title}
          </h3>

          <div className="text-[12.5px] text-[#6B5845] flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-[10.5px] font-bold text-[#123B2A] uppercase">
              Solving:
            </span>
            <span
              onClick={() => navigate(`/challenges/${idea.challengeId}`)}
              className="text-[#1D2522] hover:text-[#123B2A] hover:underline cursor-pointer font-medium"
            >
              {idea.challengeTitle}
            </span>
          </div>

          {/* Collaboration Metrics */}
          <div className="flex items-center gap-4 text-[12px] text-[#6B5845] pt-1">
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-[#123B2A]" />
              <strong className="text-[#1D2522]">{idea.contributorCount}</strong> Contributors
            </span>

            <span>·</span>

            <span className="flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
              <strong className="text-[#1D2522]">{idea.openNeeds}</strong> Open Needs
            </span>

            {idea.collaborationRequests > 0 && (
              <>
                <span>·</span>
                <span className="flex items-center gap-1 text-[#B45309] font-bold bg-[#FFFBEB] px-2 py-0.5 rounded border border-[#FDE68A]">
                  <Radio className="h-3 w-3 animate-pulse" />
                  {idea.collaborationRequests} New Request
                  {idea.collaborationRequests > 1 ? 's' : ''}
                </span>
              </>
            )}
          </div>
        </div>

        {/* ── Compact 5-Stage Lifecycle Progress Track ── */}
        <div className="lg:col-span-5 space-y-2 lg:border-l lg:border-[#EEEAE1] lg:pl-6">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#6B5845]">
            <span className="font-bold uppercase tracking-wider text-[#123B2A]">
              PROGRESS LIFECYCLE
            </span>
            <span className="font-bold text-[#1D2522]">Stage: {idea.stage}</span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 text-center">
            {STAGES_FLOW.map((s, idx) => {
              const isCompleted = idx < activeStageIdx;
              const isCurrent = idx === activeStageIdx;

              return (
                <div key={s.key} className="flex flex-col items-center space-y-1">
                  <div
                    className={`h-2.5 w-full rounded-full transition-all ${
                      isCompleted
                        ? 'bg-[#15803D]'
                        : isCurrent
                          ? 'bg-[#123B2A] ring-2 ring-[#123B2A]/20'
                          : 'bg-[#EEEAE1]'
                    }`}
                  />
                  <span
                    className={`text-[9px] font-mono leading-tight truncate ${
                      isCurrent
                        ? 'font-bold text-[#123B2A]'
                        : isCompleted
                          ? 'text-[#1D2522]'
                          : 'text-[#6B5845]/60'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Manage Action */}
          <div className="pt-2 flex items-center justify-end">
            <button
              type="button"
              onClick={() => navigate(`/ideas/${idea.id}`)}
              className="inline-flex items-center gap-1 text-[12.5px] font-bold text-[#123B2A] hover:underline cursor-pointer"
            >
              <span>Manage Idea</span>
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
