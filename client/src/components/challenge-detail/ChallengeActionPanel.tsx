import { useState } from 'react';
import { Lightbulb, Users, Share2, AlertOctagon, Check, Bookmark } from 'lucide-react';
import { ChallengeDetailData } from '../../types/challengeDetail';

interface ChallengeActionPanelProps {
  challenge: ChallengeDetailData;
  onContributeIdea: () => void;
  onJoinCollaboration: () => void;
}

export function ChallengeActionPanel({
  challenge,
  onContributeIdea,
  onJoinCollaboration,
}: ChallengeActionPanelProps) {
  const [isFollowing, setIsFollowing] = useState(false);
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

  const followersCount = challenge.stats.followersCount + (isFollowing ? 1 : 0);

  return (
    <>
      {/* ── DESKTOP STICKY SIDEBAR PANEL ── */}
      <div className="hidden lg:block sticky top-28 space-y-4 text-left">
        <div className="rounded-2xl border border-[#EEEAE1] bg-white p-6 shadow-sm space-y-6">
          {/* Header */}
          <div className="border-b border-[#EEEAE1] pb-4 space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B5845] font-semibold">
              PARTICIPATION ACTIONS
            </span>
            <div className="text-[1.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              Take Collective Action
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-2.5">
            <button
              onClick={onContributeIdea}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#123B2A] hover:bg-[#0D2B1E] text-white py-3.5 px-4 text-[14px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <Lightbulb className="h-4 w-4 text-[#F5A623]" />
              <span>Contribute an Idea</span>
            </button>

            <button
              onClick={onJoinCollaboration}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[#123B2A] bg-white hover:bg-[#F8F6F1] text-[#123B2A] py-3.5 px-4 text-[14px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <Users className="h-4 w-4 text-[#123B2A]" />
              <span>Join Collaboration</span>
            </button>
          </div>

          {/* Participation Stats Bar */}
          <div className="grid grid-cols-3 gap-2 text-center py-3 border-y border-[#EEEAE1]">
            <div>
              <div className="text-[1.25rem] font-extrabold font-mono text-[#123B2A] leading-tight">
                {challenge.stats.collaboratorsCount}
              </div>
              <div className="text-[10.5px] font-medium text-[#6B5845] mt-0.5">
                Collaborators
              </div>
            </div>

            <div>
              <div className="text-[1.25rem] font-extrabold font-mono text-[#F5A623] leading-tight">
                {challenge.stats.ideasCount}
              </div>
              <div className="text-[10.5px] font-medium text-[#6B5845] mt-0.5">
                Ideas
              </div>
            </div>

            <div>
              <div className="text-[1.25rem] font-extrabold font-mono text-[#1D2522] leading-tight">
                {followersCount}
              </div>
              <div className="text-[10.5px] font-medium text-[#6B5845] mt-0.5">
                Followers
              </div>
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="space-y-1.5 pt-1 text-[13px]">
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className="w-full flex items-center justify-between p-2.5 rounded-lg text-[#1D2522] hover:bg-[#F8F6F1] transition-colors cursor-pointer font-medium"
            >
              <span className="flex items-center gap-2">
                <Bookmark className={`h-4 w-4 ${isFollowing ? 'fill-[#123B2A] text-[#123B2A]' : 'text-[#6B5845]'}`} />
                <span>{isFollowing ? 'Following Challenge' : 'Follow Challenge'}</span>
              </span>
              <span className="text-[11px] font-mono text-[#6B5845]">
                {isFollowing ? 'Subscribed' : 'Get Alerts'}
              </span>
            </button>

            <button
              onClick={handleShare}
              className="w-full flex items-center justify-between p-2.5 rounded-lg text-[#1D2522] hover:bg-[#F8F6F1] transition-colors cursor-pointer font-medium"
            >
              <span className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-[#6B5845]" />
                <span>{copied ? 'Link Copied!' : 'Share Dossier'}</span>
              </span>
              {copied && <Check className="h-4 w-4 text-[#15803D]" />}
            </button>

            <button
              onClick={onContributeIdea}
              className="w-full flex items-center justify-between p-2.5 rounded-lg text-[#6B5845] hover:text-[#BE123C] hover:bg-[#FEF0F4] transition-colors cursor-pointer font-medium text-[12px]"
            >
              <span className="flex items-center gap-2">
                <AlertOctagon className="h-4 w-4" />
                <span>Report Field Observation</span>
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
