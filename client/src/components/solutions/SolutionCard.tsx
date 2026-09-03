import {
  MapPin,
  CheckCircle2,
  Droplets,
  Wheat,
  ShieldAlert,
  HeartPulse,
  GraduationCap,
  Trees,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { SolutionItem, SolutionStage } from '../../types/solutions';

interface SolutionCardProps {
  solution: SolutionItem;
  onOpenDetails: (solution: SolutionItem) => void;
}

export function SolutionCard({ solution, onOpenDetails }: SolutionCardProps) {

  const getDomainIcon = (area: string) => {
    switch (area.toLowerCase()) {
      case 'water management':
        return <Droplets className="h-4 w-4 text-[#0284C7]" />;
      case 'agriculture':
        return <Wheat className="h-4 w-4 text-[#15803D]" />;
      case 'mining safety':
        return <ShieldAlert className="h-4 w-4 text-[#B45309]" />;
      case 'healthcare':
        return <HeartPulse className="h-4 w-4 text-[#BE123C]" />;
      case 'education':
        return <GraduationCap className="h-4 w-4 text-[#0284C7]" />;
      case 'environment':
        return <Trees className="h-4 w-4 text-[#15803D]" />;
      default:
        return <Sparkles className="h-4 w-4 text-[#123B2A]" />;
    }
  };

  const getStageBadge = (stage: SolutionStage) => {
    switch (stage) {
      case 'Research':
        return 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]';
      case 'Prototype':
        return 'bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]';
      case 'Testing':
        return 'bg-[#FAF5FF] text-[#7E22CE] border-[#E9D5FF]';
      case 'Field Pilot':
        return 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]';
      case 'Deployment':
        return 'bg-[#123B2A] text-white border-[#1E5A3A]';
      case 'Scaling':
        return 'bg-[#15803D] text-white border-[#15803D]';
      default:
        return 'bg-[#FAF9F5] text-[#6B5845] border-[#EEEAE1]';
    }
  };

  return (
    <div
      onClick={() => onOpenDetails(solution)}
      className="rounded-3xl border border-[#EEEAE1] bg-white p-6 shadow-2xs hover:shadow-md hover:border-[#123B2A]/30 transition-all duration-200 text-left flex flex-col justify-between space-y-4 cursor-pointer group"
    >
      <div className="space-y-3.5">
        {/* Top Header: Focus Area & Stage Badge */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF9F5] border border-[#EEEAE1] text-[11px] font-mono font-bold uppercase text-[#1D2522]">
            {getDomainIcon(solution.focusArea)}
            <span>{solution.focusArea}</span>
          </span>

          <span
            className={`text-[10.5px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border ${getStageBadge(
              solution.stage
            )}`}
          >
            {solution.stage}
          </span>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-1">
          <h3 className="text-[1.2rem] font-bold text-[#1D2522] leading-snug group-hover:text-[#123B2A] transition-colors">
            {solution.name}
          </h3>
          <p className="text-[12.5px] font-medium text-[#123B2A] leading-tight">
            {solution.tagline}
          </p>
          <p className="text-[13px] text-[#6B5845] leading-relaxed line-clamp-2 pt-1">
            {solution.description}
          </p>
        </div>

        {/* District & Technology Tag */}
        <div className="flex items-center gap-3 text-[11.5px] font-mono text-[#6B5845]">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-[#BE123C]" />
            {solution.district}
          </span>
          <span>·</span>
          <span className="text-[#123B2A] font-semibold">
            {solution.technologyType}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#6B5845]">Progress</span>
            <span className="font-bold text-[#123B2A]">{solution.progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#FAF9F5] border border-[#EEEAE1] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#123B2A] transition-all duration-300"
              style={{ width: `${solution.progress}%` }}
            />
          </div>
        </div>

        {/* Impact Indicator Card */}
        <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#15803D] flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            MEASURED OUTCOME
          </span>
          <p className="text-[12px] font-medium text-[#1D2522] leading-snug">
            {solution.impactSummary}
          </p>
        </div>

        {/* Related Challenge Link */}
        <div className="text-[11px] font-mono text-[#6B5845]">
          <span className="text-[#6B5845] block text-[9.5px] uppercase font-bold">
            ORIGINAL CHALLENGE:
          </span>
          <span className="text-[#123B2A] font-semibold truncate block">
            {solution.challengeTitle}
          </span>
        </div>
      </div>

      {/* Footer: View Details Action */}
      <div className="pt-3 border-t border-[#EEEAE1] flex items-center justify-between">
        <div className="flex items-center gap-1.5 flex-wrap">
          {solution.technologyTags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded bg-[#FAF9F5] text-[10.5px] font-mono text-[#6B5845] border border-[#EEEAE1]"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-[12.5px] font-bold text-[#123B2A] group-hover:translate-x-0.5 transition-transform cursor-pointer"
        >
          <span>View Details</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
