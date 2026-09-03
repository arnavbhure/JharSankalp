import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Heart,
  Users,
  Check,
  Wheat,
  GraduationCap,
  HeartPulse,
  Trees,
  Briefcase,
  Droplets,
  Zap,
  ShieldAlert,
} from 'lucide-react';
import { CommunityIdea, IdeaStatus } from '../../types/ideas';

interface IdeaCardProps {
  idea: CommunityIdea;
  onSupportToggle?: (id: string, isSupported: boolean) => void;
  onSelect?: (idea: CommunityIdea) => void;
}

export function IdeaCard({ idea, onSupportToggle, onSelect }: IdeaCardProps) {
  const navigate = useNavigate();
  const [supported, setSupported] = useState(idea.isSupported ?? false);
  const [count, setCount] = useState(idea.supportersCount);

  const handleSupport = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !supported;
    setSupported(nextState);
    const nextCount = nextState ? count + 1 : count - 1;
    setCount(nextCount);
    if (onSupportToggle) {
      onSupportToggle(idea.id, nextState);
    }
  };

  const getFocusAreaIcon = (area: string) => {
    switch (area.toLowerCase()) {
      case 'agriculture':
        return <Wheat className="h-3.5 w-3.5 text-[#15803D]" />;
      case 'education':
        return <GraduationCap className="h-3.5 w-3.5 text-[#0284C7]" />;
      case 'healthcare':
        return <HeartPulse className="h-3.5 w-3.5 text-[#BE123C]" />;
      case 'environment':
        return <Trees className="h-3.5 w-3.5 text-[#15803D]" />;
      case 'livelihoods':
        return <Briefcase className="h-3.5 w-3.5 text-[#B45309]" />;
      case 'water management':
        return <Droplets className="h-3.5 w-3.5 text-[#0284C7]" />;
      case 'clean energy':
        return <Zap className="h-3.5 w-3.5 text-[#F5A623]" />;
      case 'mining safety':
        return <ShieldAlert className="h-3.5 w-3.5 text-[#B45309]" />;
      default:
        return <Droplets className="h-3.5 w-3.5 text-[#123B2A]" />;
    }
  };

  const getStatusBadge = (status: IdeaStatus) => {
    switch (status) {
      case 'New':
        return 'bg-[#FAF9F5] text-[#6B5845] border-[#EEEAE1]';
      case 'Community Supported':
        return 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]';
      case 'Under Review':
        return 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]';
      case 'In Development':
        return 'bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]';
      case 'Implemented':
        return 'bg-[#123B2A] text-white border-[#1E5A3A]';
      default:
        return 'bg-[#FAF9F5] text-[#6B5845] border-[#EEEAE1]';
    }
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect(idea);
    } else if (idea.linkedChallengeId) {
      navigate(`/challenges/${idea.linkedChallengeId}`);
    } else {
      navigate('/ideas/idea-water-pump-monitoring');
    }
  };

  return (
    <div
      onClick={handleClick}
      className="rounded-3xl border border-[#EEEAE1] bg-white p-6 shadow-2xs hover:shadow-md hover:border-[#123B2A]/30 transition-all duration-200 text-left flex flex-col justify-between space-y-4 cursor-pointer group"
    >
      <div className="space-y-3">
        {/* Top Header: Focus Area & Status Badge */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF9F5] border border-[#EEEAE1] text-[11px] font-mono font-bold uppercase text-[#1D2522]">
            {getFocusAreaIcon(idea.focusArea)}
            <span>{idea.focusArea}</span>
          </span>

          <span
            className={`text-[10.5px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border ${getStatusBadge(
              idea.status,
            )}`}
          >
            {idea.status}
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h3 className="text-[1.2rem] font-bold text-[#1D2522] leading-snug group-hover:text-[#123B2A] transition-colors">
            {idea.title}
          </h3>
          <p className="text-[13px] text-[#6B5845] leading-relaxed line-clamp-3">
            {idea.description}
          </p>
        </div>

        {/* Metadata: District & Author */}
        <div className="flex items-center gap-3 text-[11.5px] font-mono text-[#6B5845]">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-[#BE123C]" />
            {idea.district}
          </span>
          <span>·</span>
          <span className="truncate max-w-[170px]" title={idea.author}>
            {idea.author}
          </span>
        </div>

        {idea.linkedChallenge && (
          <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] text-[11.5px] text-[#6B5845]">
            <span className="text-[9.5px] font-mono font-bold uppercase text-[#6B5845] block">
              CHALLENGE LINK
            </span>
            <span className="font-semibold text-[#123B2A] truncate block">
              {idea.linkedChallenge}
            </span>
          </div>
        )}
      </div>

      {/* Card Footer: Metrics & Support Button */}
      <div className="pt-3 border-t border-[#EEEAE1] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-[11.5px] font-mono text-[#6B5845]">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-[#123B2A]" />
            <span>{idea.contributorsCount} contributors</span>
          </span>
        </div>

        <button
          type="button"
          onClick={handleSupport}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-mono font-bold transition-all active:scale-[0.98] cursor-pointer ${
            supported
              ? 'bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D]'
              : 'bg-[#FAF9F5] hover:bg-[#123B2A] hover:text-white border border-[#EEEAE1] text-[#1D2522]'
          }`}
          title={supported ? 'Click to remove support' : 'Support this civic idea'}
        >
          {supported ? (
            <>
              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>{count} Supported ✓</span>
            </>
          ) : (
            <>
              <Heart className="h-3.5 w-3.5 text-[#F5A623] fill-current" />
              <span>{count} Support</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
