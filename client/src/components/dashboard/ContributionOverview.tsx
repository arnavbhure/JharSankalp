import { DashboardStats } from '../../types/citizenDashboard';
import { AlertCircle, FileText, Clock, Users } from 'lucide-react';

interface ContributionOverviewProps {
  stats: DashboardStats;
}

export function ContributionOverview({ stats }: ContributionOverviewProps) {
  return (
    <div className="rounded-2xl border border-[#EEEAE1] bg-white p-5 sm:p-6 shadow-2xs text-left mb-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#EEEAE1] gap-4 lg:gap-0">
        {/* 1. Challenges Submitted */}
        <div className="lg:pr-6 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase font-bold text-[#6B5845]">
            <FileText className="h-3.5 w-3.5 text-[#123B2A]" />
            <span>Total Reported</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-mono">
              0{stats.totalSubmitted}
            </span>
            <span className="text-[12.5px] font-semibold text-[#6B5845] leading-tight">
              Challenges Submitted
            </span>
          </div>
        </div>

        {/* 2. Currently Under Review */}
        <div className="lg:px-6 space-y-1 pt-3 sm:pt-0">
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase font-bold text-[#6B5845]">
            <Clock className="h-3.5 w-3.5 text-[#123B2A]" />
            <span>Intake Stage</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[2.2rem] font-extrabold text-[#123B2A] tracking-tight font-mono">
              0{stats.underReview}
            </span>
            <span className="text-[12.5px] font-semibold text-[#6B5845] leading-tight">
              Currently Under Review
            </span>
          </div>
        </div>

        {/* 3. Active Collaboration */}
        <div className="lg:px-6 space-y-1 pt-3 sm:pt-0">
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase font-bold text-[#6B5845]">
            <Users className="h-3.5 w-3.5 text-[#15803D]" />
            <span>In Motion</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[2.2rem] font-extrabold text-[#15803D] tracking-tight font-mono">
              0{stats.inCollaboration}
            </span>
            <span className="text-[12.5px] font-semibold text-[#6B5845] leading-tight">
              Active Collaboration
            </span>
          </div>
        </div>

        {/* 4. Information Requested (High-emphasis Attention Card) */}
        <div className="lg:pl-6 space-y-1 pt-3 sm:pt-0">
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase font-bold text-[#B45309]">
            <AlertCircle className="h-3.5 w-3.5 text-[#F5A623]" />
            <span>Attention Required</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-[2.2rem] font-extrabold tracking-tight font-mono ${
                stats.actionRequired > 0 ? 'text-[#BE123C]' : 'text-[#6B5845]'
              }`}
            >
              0{stats.actionRequired}
            </span>
            <span
              className={`text-[12.5px] font-bold leading-tight ${
                stats.actionRequired > 0 ? 'text-[#BE123C]' : 'text-[#6B5845]'
              }`}
            >
              {stats.actionRequired > 0 ? 'Information Requested' : 'All Requests Handled'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
