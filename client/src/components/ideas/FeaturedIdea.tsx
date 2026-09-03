import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Droplets, Heart, Users, MapPin, Clock, ArrowRight, Check } from 'lucide-react';
import { CommunityIdea } from '../../types/ideas';

interface FeaturedIdeaProps {
  idea: CommunityIdea;
  onViewDetails?: (idea: CommunityIdea) => void;
}

export function FeaturedIdea({ idea, onViewDetails }: FeaturedIdeaProps) {
  const navigate = useNavigate();
  const [supported, setSupported] = useState(false);
  const [supportCount, setSupportCount] = useState(idea.supportersCount);

  const handleSupportToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!supported) {
      setSupported(true);
      setSupportCount((prev) => prev + 1);
    } else {
      setSupported(false);
      setSupportCount((prev) => prev - 1);
    }
  };

  const handleView = () => {
    if (onViewDetails) {
      onViewDetails(idea);
    } else if (idea.linkedChallengeId) {
      navigate(`/challenges/${idea.linkedChallengeId}`);
    } else {
      navigate('/ideas/idea-water-pump-monitoring');
    }
  };

  return (
    <section className="text-left">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#123B2A] text-white p-6 sm:p-9 lg:p-10 shadow-lg border border-[#1E5A3A] transition-all">
        {/* Subtle Topographic / Organic Contours Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04] pattern-topography"
        />
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -bottom-24 w-80 h-80 opacity-[0.06] stroke-white fill-none"
          viewBox="0 0 300 300"
        >
          <circle cx="150" cy="150" r="100" strokeWidth="1.5" strokeDasharray="6 4" />
          <circle cx="150" cy="150" r="140" strokeWidth="1" />
        </svg>

        <div className="relative z-10 space-y-6">
          {/* Top Pill & Category Badges */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5A623] text-[#123B2A] text-[11px] font-mono font-extrabold uppercase tracking-wider shadow-xs">
                <Sparkles className="h-3.5 w-3.5 fill-[#123B2A]" />
                <span>FEATURED COMMUNITY IDEA</span>
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-mono font-semibold border border-white/15">
                <Droplets className="h-3 w-3 text-[#F5A623]" />
                <span>{idea.focusArea}</span>
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11.5px] font-mono text-white/70">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-[#F5A623]" />
                <span>{idea.district} District</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{idea.submittedDate}</span>
              </span>
            </div>
          </div>

          {/* Main Title & Description */}
          <div className="space-y-3 max-w-3xl">
            <h2 className="text-[1.8rem] sm:text-[2.35rem] font-extrabold text-white tracking-tight leading-[1.18] font-sans">
              {idea.title}
            </h2>
            <p className="text-[15px] sm:text-[16px] text-white/80 leading-relaxed font-normal">
              {idea.description}
            </p>
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4 px-5 rounded-2xl bg-white/5 border border-white/10 text-[12.5px] max-w-2xl">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-white/10 flex items-center justify-center text-[#F5A623]">
                <Heart className="h-4 w-4 fill-current" />
              </div>
              <div>
                <strong className="text-[15px] font-mono font-bold text-white block leading-none">
                  {supportCount}
                </strong>
                <span className="text-[11px] text-white/70">Community Supports</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <strong className="text-[15px] font-mono font-bold text-white block leading-none">
                  {idea.contributorsCount}
                </strong>
                <span className="text-[11px] text-white/70">Contributors Involved</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-white/10 flex items-center justify-center text-[#F5A623]">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <strong className="text-[15px] font-mono font-bold text-white block leading-none">
                  Linked
                </strong>
                <span className="text-[11px] text-white/70 truncate block max-w-[140px]">
                  3 Civic Challenges
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={handleSupportToggle}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13.5px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer ${
                supported
                  ? 'bg-[#15803D] text-white border border-[#BBF7D0]'
                  : 'bg-[#F5A623] hover:bg-[#E09215] text-[#123B2A]'
              }`}
            >
              {supported ? (
                <>
                  <Check className="h-4 w-4 stroke-[3]" />
                  <span>Supported ✓</span>
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4 fill-current" />
                  <span>Support Idea</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleView}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 text-white text-[13.5px] font-semibold transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>View Details</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
