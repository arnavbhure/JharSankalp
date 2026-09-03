import { ArrowRight, Users, Clock, AlertTriangle, ShieldAlert, Radio } from 'lucide-react';
import { ChallengeItem } from '../../types/challenges';

interface FeaturedChallengeProps {
  challenge: ChallengeItem;
  onViewDetails: (challenge: ChallengeItem) => void;
  onJoinCollaboration: (challenge: ChallengeItem) => void;
}

export function FeaturedChallenge({
  challenge,
  onViewDetails,
  onJoinCollaboration,
}: FeaturedChallengeProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#123B2A] text-white p-6 sm:p-8 lg:p-10 border border-[#1F5A3D] shadow-md text-left">
      {/* ── Background Subtle Geodetic Map Contour Lines ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.09]">
        <svg
          viewBox="0 0 800 400"
          className="w-full h-full stroke-white fill-none"
          strokeWidth="0.9"
        >
          <circle cx="680" cy="180" r="80" strokeDasharray="4 4" />
          <circle cx="680" cy="180" r="140" strokeWidth="1.2" />
          <circle cx="680" cy="180" r="200" strokeDasharray="6 6" />
          <path d="M 100,300 Q 350,150 700,280" strokeWidth="1" />
          <path d="M 50,100 Q 400,260 750,80" strokeWidth="1" strokeDasharray="5 5" />
          <circle cx="680" cy="180" r="6" fill="#F5A623" />
        </svg>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* ── Left Content Area (7 Cols) ── */}
        <div className="lg:col-span-7 space-y-4">
          {/* Eyebrow & Category Label */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#F5A623] text-[#123B2A] text-[11px] font-mono font-extrabold uppercase tracking-wider shadow-2xs">
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              FEATURED CHALLENGE
            </span>

            <div className="flex items-center gap-1.5 text-[12px] font-mono font-bold text-[#F8F6F1]/80 tracking-wider uppercase">
              <ShieldAlert className="h-3.5 w-3.5 text-[#F5A623]" />
              <span>{challenge.district.toUpperCase()}</span>
              <span>·</span>
              <span className="text-[#F5A623]">{challenge.category.toUpperCase()}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-[1.85rem] sm:text-[2.35rem] font-extrabold text-white tracking-tight leading-[1.18] font-sans">
            {challenge.title}
          </h2>

          {/* Description */}
          <p className="text-[15px] sm:text-[15.5px] text-white/85 max-w-2xl leading-relaxed">
            {challenge.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 flex-wrap pt-2">
            <button
              onClick={() => onViewDetails(challenge)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#F5A623] hover:bg-[#E09215] text-[#123B2A] px-6 py-3 text-[14px] font-extrabold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>View Challenge</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </button>

            <button
              onClick={() => onJoinCollaboration(challenge)}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 hover:bg-white/15 text-white px-5 py-3 text-[14px] font-bold transition-all active:scale-[0.98] cursor-pointer backdrop-blur-xs"
            >
              <Users className="h-4 w-4 text-[#F5A623]" />
              <span>Join Collaboration</span>
            </button>
          </div>
        </div>

        {/* ── Right Impact Metrics Card (5 Cols) ── */}
        <div className="lg:col-span-5">
          <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-xs p-5 sm:p-6 space-y-4">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#F8F6F1]/70 border-b border-white/15 pb-2.5 flex items-center justify-between">
              <span>Impact Dimensions</span>
              <span className="text-[#F5A623] flex items-center gap-1 font-bold">
                <AlertTriangle className="h-3 w-3" />
                High Priority
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Metric 1 */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-left">
                  <div className="text-[1.5rem] font-extrabold font-mono text-white leading-none">
                    15,000
                  </div>
                  <div className="text-[12px] text-white/75 mt-1 font-medium">
                    Potentially Impacted Residents
                  </div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#F5A623]">
                  <Users className="h-5 w-5" />
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-left">
                  <div className="text-[1.5rem] font-extrabold font-mono text-[#F5A623] leading-none">
                    48 Hours
                  </div>
                  <div className="text-[12px] text-white/75 mt-1 font-medium">
                    Warning Lead Time Target
                  </div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#F5A623]">
                  <Clock className="h-5 w-5" />
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-left">
                  <div className="text-[1.5rem] font-extrabold font-mono text-white leading-none">
                    12 Active
                  </div>
                  <div className="text-[12px] text-white/75 mt-1 font-medium">
                    Cross-Sector Collaborators
                  </div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#F8F6F1]">
                  <Radio className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
