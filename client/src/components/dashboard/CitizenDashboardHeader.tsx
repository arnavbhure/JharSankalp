import { useNavigate } from 'react-router-dom';
import { Plus, Sparkles } from 'lucide-react';

interface CitizenDashboardHeaderProps {
  userName?: string;
}

export function CitizenDashboardHeader({ userName = 'Arnav' }: CitizenDashboardHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="border-b border-[#EEEAE1] pb-6 mb-8 text-left">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#123B2A] font-bold">
            <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
            <span>MY CONTRIBUTION · CITIZEN COMMAND CENTER</span>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <span className="text-[13px] font-mono text-[#6B5845] block font-semibold">
              Welcome back, {userName}
            </span>
            <h1 className="text-[2.2rem] sm:text-[2.6rem] font-extrabold text-[#1D2522] tracking-tight leading-tight font-sans">
              The challenges you&apos;re helping move forward.
            </h1>
          </div>

          {/* Supporting Copy */}
          <p className="text-[14.5px] sm:text-[15.5px] text-[#6B5845] leading-relaxed">
            Track your submissions, follow progress, and stay connected as communities, academic labs, and local institutions work toward sustainable solutions across Jharkhand.
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="shrink-0">
          <button
            onClick={() => navigate('/report-challenge')}
            className="inline-flex items-center gap-2 rounded-lg bg-[#123B2A] hover:bg-[#0D2B1E] text-white px-5 py-3.5 text-[14px] font-bold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <Plus className="h-4 w-4 text-[#F5A623] stroke-[3]" />
            <span>Report a New Challenge</span>
          </button>
        </div>
      </div>
    </div>
  );
}
