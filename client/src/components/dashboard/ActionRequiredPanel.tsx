import { useNavigate } from 'react-router-dom';
import { UserChallenge } from '../../types/citizenDashboard';
import { AlertCircle, ArrowRight, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';

interface ActionRequiredPanelProps {
  challenges: UserChallenge[];
  onOpenResponseModal: (challenge: UserChallenge) => void;
}

export function ActionRequiredPanel({ challenges, onOpenResponseModal }: ActionRequiredPanelProps) {
  const navigate = useNavigate();

  // Find first challenge requiring action
  const pendingChallenge = challenges.find((c) => c.actionRequired && !c.actionRequired.responded);

  if (!pendingChallenge || !pendingChallenge.actionRequired) {
    // Meaningful progress highlight when no action needed
    return (
      <div className="rounded-2xl border border-[#BBF7D0] bg-[#F0FDF4] p-5 text-left mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#15803D] border border-[#BBF7D0] shrink-0">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#15803D] block">
              ALL ITEMS ON TRACK
            </span>
            <p className="text-[13.5px] font-semibold text-[#166534]">
              No pending actions needed from you right now. All your reported challenges are moving
              smoothly through validation and matching.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/challenges')}
          className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#15803D] hover:underline cursor-pointer shrink-0"
        >
          <span>Browse Active Collaborations</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  const req = pendingChallenge.actionRequired;

  return (
    <div className="rounded-2xl border-2 border-[#F5A623] bg-[#FFFDF9] p-5 sm:p-6 text-left mb-8 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 flex-wrap border-b border-[#F5A623]/20 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F5A623] text-white">
            <AlertCircle className="h-4 w-4 stroke-[2.5]" />
          </span>
          <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-[#B45309]">
            ACTION NEEDED
          </span>
        </div>

        <span className="text-[11.5px] font-mono text-[#6B5845] bg-white px-2.5 py-0.5 rounded border border-[#EEEAE1]">
          Requested {req.requestedAt}
        </span>
      </div>

      {/* Narrative & Inquirer */}
      <div className="space-y-2">
        <h3 className="text-[1.25rem] font-bold text-[#1D2522] tracking-tight font-sans">
          We need a little more information about your challenge.
        </h3>

        <div className="text-[13.5px] text-[#6B5845]">
          Challenge: <strong className="text-[#1D2522] font-bold">{pendingChallenge.title}</strong>{' '}
          · {pendingChallenge.block} ({pendingChallenge.district})
        </div>

        {/* Reviewer's specific question quote */}
        <div className="p-4 rounded-xl bg-white border border-[#F5A623]/30 text-[13.5px] text-[#1D2522] space-y-1">
          <span className="text-[11px] font-mono uppercase font-bold text-[#B45309] block">
            Reviewer Request from {req.reviewerRole}:
          </span>
          <p className="font-medium italic leading-relaxed text-[#1D2522]/90">
            &ldquo;{req.question}&rdquo;
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-1 flex-wrap gap-3">
        <p className="text-[12px] text-[#6B5845]">
          Your direct ground feedback helps engineers and district heads calibrate proper solutions.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/challenges/${pendingChallenge.id}`)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[13px] font-bold text-[#1D2522] transition-colors cursor-pointer"
          >
            <span>View Challenge</span>
            <ExternalLink className="h-3.5 w-3.5 text-[#6B5845]" />
          </button>

          <button
            onClick={() => onOpenResponseModal(pendingChallenge)}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
          >
            <MessageSquare className="h-3.5 w-3.5 text-[#F5A623]" />
            <span>Provide Information →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
