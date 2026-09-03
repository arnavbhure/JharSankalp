import { SelectedChallenge } from '../../types/ideaSubmission';
import { Target, RefreshCw } from 'lucide-react';

interface SelectedChallengeBadgeProps {
  challenge: SelectedChallenge;
  onChangeChallenge: () => void;
}

export function SelectedChallengeBadge({
  challenge,
  onChangeChallenge,
}: SelectedChallengeBadgeProps) {
  return (
    <div className="rounded-2xl border-2 border-[#123B2A] bg-[#FFFDF9] p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-2 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <Target className="h-3.5 w-3.5 text-[#F5A623] shrink-0" />
          <span>YOUR IDEA WILL ADDRESS</span>
        </div>

        <h4 className="text-[14.5px] font-extrabold text-[#1D2522] font-sans truncate">
          {challenge.title}
        </h4>

        <div className="flex items-center gap-2 text-[12px] font-mono text-[#6B5845]">
          <span className="font-semibold text-[#123B2A]">{challenge.category}</span>
          <span>·</span>
          <span>{challenge.district}</span>
          {challenge.block && (
            <>
              <span>·</span>
              <span>{challenge.block}</span>
            </>
          )}
          <span>·</span>
          <span className="text-[#B45309] font-bold">{challenge.priority} Priority</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onChangeChallenge}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[12px] font-bold text-[#123B2A] shadow-2xs transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
      >
        <RefreshCw className="h-3 w-3" />
        <span>Change Challenge</span>
      </button>
    </div>
  );
}
