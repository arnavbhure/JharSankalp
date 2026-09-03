import { useState } from 'react';
import { Lightbulb, Users, Share2, Check, Bookmark } from 'lucide-react';
import { ChallengeDetailData } from '../../types/challengeDetail';

interface ChallengeActionPanelProps {
  challenge: ChallengeDetailData;
  onContributeIdea: () => void;
  onJoinCollaboration: () => void;
  isJoined?: boolean;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export function ChallengeActionPanel({
  challenge,
  onContributeIdea,
  onJoinCollaboration,
  isJoined = false,
  isSaved = false,
  onToggleSave,
}: ChallengeActionPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <>
      {/* ── DESKTOP STICKY SIDEBAR PANEL ── */}
      <div className="hidden lg:block sticky top-28 space-y-4 text-left">
        <div className="rounded-2xl border border-[#EEEAE1] bg-white p-6 shadow-sm space-y-5">
          {/* Header */}
          <div className="border-b border-[#EEEAE1] pb-3 space-y-1">
            <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#6B5845] font-semibold">
              PARTICIPATION ACTIONS
            </span>
            <div className="text-[1.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              Take Collective Action
            </div>
          </div>

          {/* Key Metrics Strip (Status, Contributors, Time Left) */}
          <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] text-left">
            <div>
              <span className="text-[9.5px] font-mono font-bold uppercase text-[#6B5845] block">
                STATUS
              </span>
              <span className="text-[12px] font-mono font-bold text-[#15803D] block truncate">
                Open for Ideas
              </span>
            </div>
            <div>
              <span className="text-[9.5px] font-mono font-bold uppercase text-[#6B5845] block">
                CONTRIBUTORS
              </span>
              <span className="text-[12px] font-mono font-bold text-[#123B2A] block">
                {challenge.stats.collaboratorsCount + (isJoined ? 1 : 0)} Active
              </span>
            </div>
            <div>
              <span className="text-[9.5px] font-mono font-bold uppercase text-[#6B5845] block">
                TIME LEFT
              </span>
              <span className="text-[12px] font-mono font-bold text-[#F5A623] block">
                18 Days
              </span>
            </div>
          </div>

          {/* Primary & Secondary Action Buttons */}
          <div className="space-y-2.5">
            <button
              onClick={onContributeIdea}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white py-3 px-4 text-[13.5px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <Lightbulb className="h-4 w-4 text-[#F5A623]" />
              <span>Contribute an Idea</span>
            </button>

            <button
              onClick={onJoinCollaboration}
              className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-[13.5px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer ${
                isJoined
                  ? 'bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D]'
                  : 'border border-[#123B2A] bg-white hover:bg-[#FAF9F5] text-[#123B2A]'
              }`}
            >
              {isJoined ? (
                <>
                  <Check className="h-4 w-4 text-[#15803D]" />
                  <span>Joined ✓</span>
                </>
              ) : (
                <>
                  <Users className="h-4 w-4 text-[#123B2A]" />
                  <span>Join Challenge</span>
                </>
              )}
            </button>
          </div>

          {/* Secondary Actions: Save Challenge & Share */}
          <div className="space-y-1.5 pt-2 border-t border-[#EEEAE1] text-[12.5px]">
            <button
              onClick={onToggleSave}
              className="w-full flex items-center justify-between p-2 rounded-lg text-[#1D2522] hover:bg-[#FAF9F5] transition-colors cursor-pointer font-medium"
            >
              <span className="flex items-center gap-2">
                <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-[#123B2A] text-[#123B2A]' : 'text-[#6B5845]'}`} />
                <span>{isSaved ? 'Challenge Saved' : 'Save Challenge'}</span>
              </span>
              <span className="text-[11px] font-mono text-[#6B5845]">
                {isSaved ? 'Saved in Dashboard' : 'Bookmark'}
              </span>
            </button>

            <button
              onClick={handleShare}
              className="w-full flex items-center justify-between p-2 rounded-lg text-[#1D2522] hover:bg-[#FAF9F5] transition-colors cursor-pointer font-medium"
            >
              <span className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-[#6B5845]" />
                <span>Share Case File</span>
              </span>
              <span className="text-[11px] font-mono text-[#15803D]">
                {copied ? 'Link Copied!' : 'Copy Link'}
              </span>
            </button>
          </div>
        </div>

        {/* Verification Guarantee */}
        <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] text-[12px] text-[#6B5845] space-y-1">
          <div className="font-bold text-[#123B2A]">
            Direct Institution Escalation
          </div>
          <p>
            Submissions are reviewed directly by the Department of Mines and the IIT (ISM) technical consortium coordinator.
          </p>
        </div>
      </div>

      {/* ── MOBILE STICKY BOTTOM ACTION BAR ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EEEAE1] px-4 py-3 shadow-lg flex items-center justify-between gap-3">
        <div className="text-left">
          <div className="text-[12px] font-mono font-bold text-[#123B2A]">
            {challenge.stats.collaboratorsCount} Collaborators
          </div>
          <div className="text-[11px] text-[#6B5845]">
            {challenge.stats.ideasCount} Ideas under review
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onContributeIdea}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#123B2A] text-white px-4 py-2.5 text-[13px] font-bold shadow-xs cursor-pointer active:scale-[0.98]"
          >
            <Lightbulb className="h-3.5 w-3.5 text-[#F5A623]" />
            <span>Contribute Idea</span>
          </button>

          <button
            onClick={onJoinCollaboration}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#123B2A] bg-white text-[#123B2A] px-3.5 py-2.5 text-[13px] font-bold cursor-pointer active:scale-[0.98]"
          >
            <Users className="h-3.5 w-3.5" />
            <span>Join</span>
          </button>
        </div>
      </div>
    </>
  );
}
