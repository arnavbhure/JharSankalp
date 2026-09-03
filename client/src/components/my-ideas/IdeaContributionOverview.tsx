import { ContributorOverviewStats } from '../../types/myIdeas';
import { Lightbulb, Clock, Users, Rocket } from 'lucide-react';

interface IdeaContributionOverviewProps {
  stats: ContributorOverviewStats;
}

export function IdeaContributionOverview({ stats }: IdeaContributionOverviewProps) {
  return (
    <div className="border-b border-[#EEEAE1] bg-white py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#EEEAE1] gap-6 md:gap-0 text-left">
          {/* 1. Ideas Submitted */}
          <div className="md:pr-8 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
              <Lightbulb className="h-3.5 w-3.5 text-[#123B2A]" />
              <span>Total Prototyped</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[2.2rem] sm:text-[2.6rem] font-extrabold text-[#1D2522] tracking-tight font-mono leading-none">
                0{stats.ideasSubmitted}
              </span>
              <span className="text-[12.5px] font-semibold text-[#6B5845] leading-tight">
                Ideas Submitted
              </span>
            </div>
          </div>

          {/* 2. Under Review */}
          <div className="md:px-8 space-y-1 pt-4 md:pt-0">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
              <Clock className="h-3.5 w-3.5 text-[#B45309]" />
              <span>Intake Queue</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[2.2rem] sm:text-[2.6rem] font-extrabold text-[#B45309] tracking-tight font-mono leading-none">
                0{stats.underReview}
              </span>
              <span className="text-[12.5px] font-semibold text-[#6B5845] leading-tight">
                Under Review
              </span>
            </div>
          </div>

          {/* 3. Open for Collaboration */}
          <div className="md:px-8 space-y-1 pt-4 md:pt-0">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
              <Users className="h-3.5 w-3.5 text-[#15803D]" />
              <span>Open Squads</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[2.2rem] sm:text-[2.6rem] font-extrabold text-[#15803D] tracking-tight font-mono leading-none">
                0{stats.openForCollaboration}
              </span>
              <span className="text-[12.5px] font-semibold text-[#6B5845] leading-tight">
                Open for Collaboration
              </span>
            </div>
          </div>

          {/* 4. Moving Toward Project Formation (Accent highlighted!) */}
          <div className="md:pl-8 space-y-1 pt-4 md:pt-0 bg-[#FAF9F5]/60 md:bg-transparent -mx-4 px-4 md:mx-0 py-2 md:py-0 rounded-xl">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#7E22CE]">
              <Rocket className="h-3.5 w-3.5 text-[#7E22CE]" />
              <span>Project Trajectory</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[2.2rem] sm:text-[2.6rem] font-extrabold text-[#7E22CE] tracking-tight font-mono leading-none">
                0{stats.movingTowardProjectFormation}
              </span>
              <span className="text-[12.5px] font-bold text-[#123B2A] leading-tight">
                Moving to Project Formation
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
