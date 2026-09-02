import {
  Droplets,
  Sprout,
  ShieldAlert,
  BookOpen,
  Heart,
  TreePine,
  Users,
  MapPin,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';
import { ChallengeItem, ChallengeCategory } from '../../types/challenges';
import { CATEGORY_METADATA } from '../../data/challengesData';

interface ChallengeCardProps {
  challenge: ChallengeItem;
  onViewDetails: (challenge: ChallengeItem) => void;
}

function getCategoryIcon(category: ChallengeCategory) {
  switch (category) {
    case 'Water Management':
      return Droplets;
    case 'Agriculture':
      return Sprout;
    case 'Mining Safety':
      return ShieldAlert;
    case 'Education':
      return BookOpen;
    case 'Healthcare':
      return Heart;
    case 'Environment':
      return TreePine;
    case 'Livelihoods':
      return Users;
    default:
      return Lightbulb;
  }
}

function getStatusIndicator(status: ChallengeItem['status']) {
  switch (status) {
    case 'Open for Collaboration':
      return {
        label: 'Open for Collaboration',
        dot: 'bg-[#15803D]',
        text: 'text-[#15803D]',
        bg: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
      };
    case 'In Discussion':
      return {
        label: 'In Discussion',
        dot: 'bg-[#B45309]',
        text: 'text-[#B45309]',
        bg: 'bg-[#FEF6E9]',
        border: 'border-[#F8CCA5]',
      };
    case 'Solution in Development':
      return {
        label: 'Solution in Development',
        dot: 'bg-[#0284C7]',
        text: 'text-[#0284C7]',
        bg: 'bg-[#F0F7FF]',
        border: 'border-[#CCE2FF]',
      };
    case 'Implemented':
      return {
        label: 'Implemented',
        dot: 'bg-[#123B2A]',
        text: 'text-[#123B2A]',
        bg: 'bg-[#EBF3EE]',
        border: 'border-[#25593F]/30',
      };
  }
}

export function ChallengeCard({ challenge, onViewDetails }: ChallengeCardProps) {
  const Icon = getCategoryIcon(challenge.category);
  const meta = CATEGORY_METADATA[challenge.category];
  const statusInfo = getStatusIndicator(challenge.status);

  return (
    <div
      onClick={() => onViewDetails(challenge)}
      className={`group relative rounded-xl border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 cursor-pointer text-left ${meta.hoverBorder}`}
    >
      {/* ── Top Row: Category Icon + Label & Location ── */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-md ${meta.iconBg} ${meta.iconColor}`}
          >
            <Icon className="h-4 w-4 stroke-[2.2]" />
          </div>
          <span
            className={`text-[11px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-md ${meta.badgeBg} ${meta.badgeText}`}
          >
            {challenge.category}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[12px] font-medium text-[#6B5845]">
          <MapPin className="h-3.5 w-3.5 text-[#123B2A]" />
          <span>{challenge.locationDisplay}</span>
        </div>
      </div>

      {/* ── Main Content: Title & Short Description ── */}
      <div className="space-y-2 flex-1">
        <h3 className="text-[1.15rem] font-bold text-[#1D2522] leading-snug tracking-tight group-hover:text-[#123B2A] transition-colors font-sans line-clamp-2">
          {challenge.title}
        </h3>
        <p className="text-[13px] text-[#1D2522]/80 leading-relaxed line-clamp-3">
          {challenge.description}
        </p>
      </div>

      {/* ── Metadata Row ── */}
      <div className="pt-3 border-t border-[#EEEAE1] flex items-center justify-between gap-2 text-[12px] text-[#6B5845] font-medium flex-wrap">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-[#123B2A]" />
            <span>
              <strong className="text-[#1D2522]">{challenge.collaboratorsCount}</strong> Collaborators
            </span>
          </span>

          <span>·</span>

          <span className="flex items-center gap-1">
            <Lightbulb className="h-3.5 w-3.5 text-[#F5A623]" />
            <span>
              <strong className="text-[#1D2522]">{challenge.ideasCount}</strong> Ideas
            </span>
          </span>
        </div>

        {/* Impact Level Tag */}
        <span
          className={`text-[10.5px] font-mono font-bold px-2 py-0.5 rounded-md ${
            challenge.impactLevel === 'Critical'
              ? 'bg-[#FEF0F4] text-[#BE123C]'
              : challenge.impactLevel === 'High Impact'
              ? 'bg-[#FEF6E9] text-[#B45309]'
              : 'bg-[#F2FBF5] text-[#1F5A3D]'
          }`}
        >
          {challenge.impactLevel}
        </span>
      </div>

      {/* ── Bottom: Status Indicator & Action ── */}
      <div className="pt-2.5 flex items-center justify-between gap-2">
        {/* Status Indicator */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold">
          <span className={`h-2 w-2 rounded-full ${statusInfo.dot}`} />
          <span className={statusInfo.text}>{statusInfo.label}</span>
        </div>

        {/* Action Button */}
        <span className="inline-flex items-center gap-1 text-[13px] font-bold text-[#123B2A] group-hover:text-[#0D2B1E] transition-all">
          <span>View Challenge</span>
          <ArrowRight className="h-3.5 w-3.5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  );
}
