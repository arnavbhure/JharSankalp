import { useNavigate } from 'react-router-dom';
import { UserChallenge, CitizenLifecycleStage } from '../../types/citizenDashboard';
import {
  Droplets,
  Radio,
  Leaf,
  GraduationCap,
  HeartPulse,
  Pickaxe,
  Briefcase,
  ArrowRight,
  Check,
  Circle,
  AlertCircle,
} from 'lucide-react';

interface MyChallengeRowProps {
  challenge: UserChallenge;
  onOpenResponseModal?: (challenge: UserChallenge) => void;
}

const STAGES: { key: CitizenLifecycleStage; label: string }[] = [
  { key: 'Submitted', label: 'Submitted' },
  { key: 'Review', label: 'Review' },
  { key: 'Match', label: 'Match' },
  { key: 'Collaboration', label: 'Collaboration' },
  { key: 'Solution', label: 'Solution' },
];

const STAGE_ORDER: Record<CitizenLifecycleStage, number> = {
  Submitted: 1,
  Review: 2,
  Match: 3,
  Collaboration: 4,
  Solution: 5,
};

export function MyChallengeRow({ challenge, onOpenResponseModal }: MyChallengeRowProps) {
  const navigate = useNavigate();

  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'water management':
        return <Droplets className="h-5 w-5 text-[#0284C7]" />;
      case 'digital infrastructure':
        return <Radio className="h-5 w-5 text-[#6366F1]" />;
      case 'environment':
        return <Leaf className="h-5 w-5 text-[#15803D]" />;
      case 'education':
        return <GraduationCap className="h-5 w-5 text-[#0D9488]" />;
      case 'healthcare':
        return <HeartPulse className="h-5 w-5 text-[#E11D48]" />;
      case 'mining safety':
        return <Pickaxe className="h-5 w-5 text-[#D97706]" />;
      default:
        return <Briefcase className="h-5 w-5 text-[#123B2A]" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'UNDER_REVIEW':
        return 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]';
      case 'MATCHED':
        return 'bg-[#E0F2FE] text-[#075985] border-[#BAE6FD]';
      case 'IN_COLLABORATION':
        return 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]';
      case 'SOLUTION_IN_PROGRESS':
        return 'bg-[#EDE9FE] text-[#5B21B6] border-[#DDD6FE]';
      case 'COMPLETED':
        return 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]';
      default:
        return 'bg-[#F8F6F1] text-[#6B5845] border-[#EEEAE1]';
    }
  };

  const currentOrder = STAGE_ORDER[challenge.currentStage] || 1;
  const hasPendingAction = challenge.actionRequired && !challenge.actionRequired.responded;

  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] shadow-2xs hover:shadow-xs transition-all duration-200 text-left space-y-4 group">
      {/* ── Top Bar: Category & Status ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
          <div className="p-1.5 rounded-lg bg-[#FAF9F5] border border-[#EEEAE1]">
            {getCategoryIcon(challenge.category)}
          </div>
          <span className="text-[#123B2A]">{challenge.category}</span>
          <span>·</span>
          <span>{challenge.referenceId}</span>
        </div>

        <div className="flex items-center gap-2">
          {hasPendingAction && (
            <button
              onClick={() => onOpenResponseModal && onOpenResponseModal(challenge)}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-[#FFF1F2] text-[#BE123C] border border-[#FECDD3] cursor-pointer hover:bg-[#FFE4E6]"
            >
              <AlertCircle className="h-3 w-3" />
              <span>Info Requested</span>
            </button>
          )}

          <span
            className={`text-[10.5px] font-mono font-bold px-2.5 py-0.5 rounded-md border uppercase tracking-wider ${getStatusBadge(
              challenge.status
            )}`}
          >
            {challenge.statusLabel}
          </span>
        </div>
      </div>

      {/* ── Main Content: Title & Location ── */}
      <div className="space-y-1">
        <h3
          onClick={() => navigate(`/challenges/${challenge.id}`)}
          className="text-[1.25rem] sm:text-[1.35rem] font-extrabold text-[#1D2522] tracking-tight font-sans hover:text-[#123B2A] cursor-pointer transition-colors leading-snug"
        >
          {challenge.title}
        </h3>
        <p className="text-[13px] text-[#6B5845] font-medium">
          {challenge.district} {challenge.block ? `· ${challenge.block}` : ''} · Submitted on {challenge.submittedDate}
        </p>
      </div>

      {/* ── Compact Lifecycle Stages Tracker ── */}
      <div className="pt-2 pb-1 border-t border-[#EEEAE1]">
        <div className="flex items-center justify-between relative max-w-lg">
          {/* Connecting line */}
          <div className="absolute left-3 right-3 top-2.5 h-[1.5px] bg-[#EEEAE1] -z-0" />

          {STAGES.map((st) => {
            const stepOrder = STAGE_ORDER[st.key];
            const isCompleted = stepOrder < currentOrder;
            const isCurrent = stepOrder === currentOrder;

            return (
              <div key={st.key} className="relative z-10 flex flex-col items-center group/stage">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-mono font-bold transition-all ${
                    isCompleted
                      ? 'bg-[#123B2A] text-white ring-2 ring-white'
                      : isCurrent
                      ? 'bg-[#F5A623] text-white ring-3 ring-[#F5A623]/30 scale-110'
                      : 'bg-white text-[#6B5845] border border-[#EEEAE1]'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-3 w-3 stroke-[3]" />
                  ) : isCurrent ? (
                    <Circle className="h-2 w-2 fill-white" />
                  ) : null}
                </div>

                <span
                  className={`mt-1 text-[10px] font-mono tracking-tight text-center ${
                    isCurrent
                      ? 'font-bold text-[#123B2A]'
                      : isCompleted
                      ? 'text-[#1D2522] font-semibold'
                      : 'text-[#6B5845]/70'
                  }`}
                >
                  {st.label}
                  {isCurrent && <span className="block text-[8.5px] text-[#B45309] font-bold">● ACTIVE</span>}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Footer: Engagement stats & Action ── */}
      <div className="pt-3 border-t border-[#EEEAE1] flex items-center justify-between text-[12.5px] text-[#6B5845] flex-wrap gap-2">
        <div className="flex items-center gap-4">
          <span>
            <strong className="text-[#1D2522]">{challenge.collaboratorsCount}</strong> Collaborators matched
          </span>
          <span>·</span>
          <span>
            <strong className="text-[#1D2522]">{challenge.ideasCount}</strong> Solution hypotheses
          </span>
        </div>

        <button
          onClick={() => navigate(`/challenges/${challenge.id}`)}
          className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#123B2A] hover:text-[#0D2B1E] group-hover:translate-x-0.5 transition-all cursor-pointer"
        >
          <span>View Challenge Dossier</span>
          <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
