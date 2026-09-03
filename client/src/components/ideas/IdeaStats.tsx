import { IdeaStatsData } from '../../types/ideas';
import { Lightbulb, Users, Wrench, Rocket } from 'lucide-react';

interface IdeaStatsProps {
  stats: IdeaStatsData;
}

export function IdeaStats({ stats }: IdeaStatsProps) {
  return (
    <div className="border-b border-[#EEEAE1] bg-white py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#EEEAE1] gap-6 md:gap-0 text-left">
          {/* 1. Ideas Submitted */}
          <div className="md:pr-8 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
              <Lightbulb className="h-3.5 w-3.5 text-[#123B2A]" />
              <span>Ideation Pipeline</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[2.2rem] sm:text-[2.6rem] font-extrabold text-[#1D2522] tracking-tight font-mono leading-none">
                {stats.totalIdeas}
              </span>
              <span className="text-[12.5px] font-semibold text-[#6B5845] leading-tight">
                Ideas Submitted
              </span>
            </div>
          </div>

          {/* 2. Active Collaborations */}
          <div className="md:px-8 space-y-1 pt-4 md:pt-0">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
              <Users className="h-3.5 w-3.5 text-[#F5A623]" />
              <span>Interdisciplinary Squads</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[2.2rem] sm:text-[2.6rem] font-extrabold text-[#123B2A] tracking-tight font-mono leading-none">
                {stats.activeCollaborations}
              </span>
              <span className="text-[12.5px] font-semibold text-[#6B5845] leading-tight">
                Active Collaborations
              </span>
            </div>
          </div>

          {/* 3. Prototypes in Development */}
          <div className="md:px-8 space-y-1 pt-4 md:pt-0">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
              <Wrench className="h-3.5 w-3.5 text-[#15803D]" />
              <span>Engineering Phase</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[2.2rem] sm:text-[2.6rem] font-extrabold text-[#1D2522] tracking-tight font-mono leading-none">
                {stats.prototypesInDevelopment}
              </span>
              <span className="text-[12.5px] font-semibold text-[#6B5845] leading-tight">
                Prototypes in Development
              </span>
            </div>
          </div>

          {/* 4. Field Pilots */}
          <div className="md:pl-8 space-y-1 pt-4 md:pt-0">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
              <Rocket className="h-3.5 w-3.5 text-[#9333EA]" />
              <span>Ground Validation</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[2.2rem] sm:text-[2.6rem] font-extrabold text-[#15803D] tracking-tight font-mono leading-none">
                0{stats.fieldPilots}
              </span>
              <span className="text-[12.5px] font-semibold text-[#6B5845] leading-tight">
                Field Pilots Deployed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
