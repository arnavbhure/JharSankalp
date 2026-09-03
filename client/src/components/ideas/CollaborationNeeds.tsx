import { CollaborationNeed } from '../../types/ideas';
import { Wrench, Compass, BookOpen, MapPin, DollarSign, Award } from 'lucide-react';

interface CollaborationNeedsProps {
  needs: CollaborationNeed[];
}

export function CollaborationNeeds({ needs }: CollaborationNeedsProps) {
  if (!needs || needs.length === 0) return null;

  const getNeedIcon = (cat: CollaborationNeed['roleCategory']) => {
    switch (cat) {
      case 'Engineering':
        return <Wrench className="h-3 w-3 text-[#123B2A]" />;
      case 'Design':
        return <Compass className="h-3 w-3 text-[#F5A623]" />;
      case 'Research':
        return <BookOpen className="h-3 w-3 text-[#0284C7]" />;
      case 'Field Testing':
        return <MapPin className="h-3 w-3 text-[#15803D]" />;
      case 'Funding':
        return <DollarSign className="h-3 w-3 text-[#9333EA]" />;
      case 'Mentorship':
      default:
        return <Award className="h-3 w-3 text-[#B45309]" />;
    }
  };

  return (
    <div className="space-y-1.5 text-left pt-2 border-t border-[#EEEAE1]">
      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B45309]">
        LOOKING FOR COLLABORATORS
      </div>

      <div className="flex flex-wrap gap-1.5">
        {needs.map((n) => (
          <span
            key={n.id}
            title={n.description}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#FFFDF9] text-[#1D2522] border border-[#F5A623]/40 shadow-2xs hover:border-[#123B2A] transition-colors"
          >
            {getNeedIcon(n.roleCategory)}
            <span className="font-bold text-[#123B2A]">{n.roleCategory}:</span>
            <span className="truncate max-w-[140px]">{n.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
