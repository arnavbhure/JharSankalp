import { useNavigate } from 'react-router-dom';
import { ActiveChallengeItem } from '../../types/dashboard';
import {
  Droplets,
  Wheat,
  HeartPulse,
  Zap,
  GraduationCap,
  MapPin,
  Users,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface ActiveChallengesSectionProps {
  title: string;
  challenges: ActiveChallengeItem[];
}

export function ActiveChallengesSection({ title, challenges }: ActiveChallengesSectionProps) {
  const navigate = useNavigate();

  const getCategoryIcon = (iconType: string) => {
    switch (iconType) {
      case 'Droplets':
        return <Droplets className="h-4 w-4 text-[#0284C7]" />;
      case 'Wheat':
        return <Wheat className="h-4 w-4 text-[#15803D]" />;
      case 'HeartPulse':
        return <HeartPulse className="h-4 w-4 text-[#BE123C]" />;
      case 'GraduationCap':
        return <GraduationCap className="h-4 w-4 text-[#7E22CE]" />;
      case 'Zap':
      default:
        return <Zap className="h-4 w-4 text-[#F5A623]" />;
    }
  };

  return (
    <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-7 shadow-2xs space-y-4 text-left">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
        <div className="space-y-0.5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            COMMUNITY PROBLEM STREAMS
          </span>
          <h2 className="text-[1.35rem] sm:text-[1.5rem] font-extrabold text-[#1D2522] font-sans">
            {title}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => navigate('/challenges')}
          className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#123B2A] hover:underline cursor-pointer group"
        >
          <span>View All</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Structured Challenge Rows */}
      <div className="divide-y divide-[#EEEAE1]/80">
        {challenges.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/challenges/${item.id}`)}
            className="py-4 first:pt-2 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF9F5] -mx-3 px-3 rounded-2xl transition-all cursor-pointer group"
          >
            {/* Left Info with Category Icon */}
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="h-10 w-10 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform shadow-2xs">
                {getCategoryIcon(item.iconType)}
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${item.domainColor}`}
                  >
                    {item.domain}
                  </span>
                  <span className="text-[11px] font-mono text-[#6B5845]">{item.id}</span>
                </div>

                <h3 className="text-[14px] sm:text-[15px] font-bold text-[#1D2522] group-hover:text-[#123B2A] transition-colors leading-snug">
                  {item.title}
                </h3>

                <div className="flex items-center gap-3 text-[11.5px] font-mono text-[#6B5845]">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-[#BE123C]" />
                    {item.location}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-[#123B2A]" />
                    {item.contributorsCount} Contributors
                  </span>
                </div>
              </div>
            </div>

            {/* Right Status & Remaining Days */}
            <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto sm:border-l sm:border-[#EEEAE1] sm:pl-5">
              <div className="text-left sm:text-right space-y-0.5">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#123B2A]">
                  <Clock className="h-3 w-3 text-[#F5A623]" />
                  {item.daysLeft} Days Left
                </span>
                <span className="text-[11px] font-mono text-[#6B5845] block">{item.status}</span>
              </div>

              <ArrowRight className="h-4 w-4 text-[#6B5845] group-hover:text-[#123B2A] group-hover:translate-x-1 transition-all hidden sm:block" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
