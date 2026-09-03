import { useNavigate } from 'react-router-dom';
import { FeaturedChallengeData } from '../../types/dashboard';
import { ArrowRight, Sparkles, Users, Lightbulb, MapPin } from 'lucide-react';

interface FeaturedChallengePanelProps {
  featured: FeaturedChallengeData;
}

export function FeaturedChallengePanel({ featured }: FeaturedChallengePanelProps) {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl bg-[#123B2A] text-white p-6 sm:p-7 shadow-lg relative overflow-hidden flex flex-col justify-between space-y-6 text-left select-none border border-[#1E5A3A]">
      {/* ── Background Subtle Topographic Contour / Geodetic Lines ── */}
      <svg
        className="absolute inset-0 w-full h-full stroke-[#F5A623]/10 fill-none pointer-events-none"
        strokeWidth="1"
      >
        <circle cx="85%" cy="20%" r="140" strokeDasharray="3,3" />
        <circle cx="85%" cy="20%" r="100" />
        <circle cx="85%" cy="20%" r="60" strokeDasharray="2,2" />
        <path
          d="M 10 180 Q 90 140 180 190 T 350 160"
          strokeDasharray="4,4"
          className="opacity-40"
        />
        <path d="M -20 220 Q 80 180 200 230 T 400 200" className="opacity-20" />
      </svg>

      <div className="space-y-4 relative z-10">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E5A3A] border border-[#F5A623]/30 text-[#F5A623] text-[10.5px] font-mono font-bold uppercase tracking-wider">
          <Sparkles className="h-3 w-3 text-[#F5A623]" />
          <span>FEATURED CHALLENGE</span>
        </div>

        {/* Title & Domain */}
        <div className="space-y-1.5">
          <h3 className="text-[1.45rem] sm:text-[1.6rem] font-extrabold text-white tracking-tight leading-tight font-sans">
            {featured.title}
          </h3>

          <div className="flex items-center gap-1.5 text-[12px] font-mono text-[#F7F5F0]/80">
            <MapPin className="h-3.5 w-3.5 text-[#F5A623]" />
            <span>{featured.district}</span>
            <span>·</span>
            <span className="text-[#F5A623]">{featured.domain}</span>
          </div>
        </div>

        <p className="text-[13px] text-[#F7F5F0]/80 leading-relaxed">
          High-priority district problem call uniting youth innovation squads, university
          engineering labs, and local Jal Samitis.
        </p>

        {/* Supporting Metrics Strip */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-2xl bg-[#1E5A3A]/60 border border-[#1E5A3A] space-y-0.5">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#F7F5F0]/70">
              <Users className="h-3.5 w-3.5 text-[#F5A623]" />
              <span>Contributors</span>
            </div>
            <div className="text-[1.4rem] font-extrabold font-mono text-white">
              {featured.contributorsCount}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#1E5A3A]/60 border border-[#1E5A3A] space-y-0.5">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#F7F5F0]/70">
              <Lightbulb className="h-3.5 w-3.5 text-[#F5A623]" />
              <span>Ideas Submitted</span>
            </div>
            <div className="text-[1.4rem] font-extrabold font-mono text-white">
              {featured.ideasCount}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-2 relative z-10">
        <button
          type="button"
          onClick={() => navigate(`/challenges/${featured.id}`)}
          className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#F5A623] hover:bg-[#E5981A] text-[#123B2A] text-[13.5px] font-bold shadow-md transition-all active:scale-[0.98] cursor-pointer"
        >
          <span>Explore Challenge</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
