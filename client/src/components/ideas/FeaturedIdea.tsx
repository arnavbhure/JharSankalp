import { useNavigate } from 'react-router-dom';
import { IdeaItem } from '../../types/ideas';
import { ArrowRight, Users, Sparkles, Droplets, Radio, Activity, CheckCircle2 } from 'lucide-react';

interface FeaturedIdeaProps {
  idea: IdeaItem;
  onJoinTeamClick: (idea: IdeaItem) => void;
  onViewIdeaClick: (idea: IdeaItem) => void;
}

export function FeaturedIdea({ idea, onJoinTeamClick, onViewIdeaClick }: FeaturedIdeaProps) {
  const navigate = useNavigate();

  return (
    <section className="border-b border-[#EEEAE1] bg-[#F8F6F1] py-12 sm:py-16 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-10 shadow-sm relative overflow-hidden">
          {/* Subtle Corner Badge */}
          <div className="absolute top-0 right-0 bg-[#123B2A] text-[#F5A623] text-[11px] font-mono font-bold uppercase tracking-widest px-6 py-2 rounded-bl-2xl">
            FEATURED INNOVATION
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* ── Left Side: Editorial Content ── */}
            <div className="lg:col-span-7 space-y-6">
              {/* Category & Location */}
              <div className="flex items-center gap-2 text-[11.5px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
                <Droplets className="h-4 w-4 text-[#0284C7]" />
                <span className="text-[#123B2A]">{idea.category}</span>
                <span>·</span>
                <span>{idea.district} {idea.block ? `(${idea.block})` : ''}</span>
              </div>

              {/* Title */}
              <h2
                onClick={() => onViewIdeaClick(idea)}
                className="text-[1.85rem] sm:text-[2.35rem] font-extrabold text-[#1D2522] tracking-tight font-sans leading-tight hover:text-[#123B2A] cursor-pointer transition-colors"
              >
                {idea.title}
              </h2>

              {/* Description */}
              <p className="text-[15px] sm:text-[16px] text-[#1D2522]/80 leading-relaxed font-normal">
                {idea.summary}
              </p>

              {/* Related Challenge Link */}
              <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] flex items-center justify-between gap-3 flex-wrap">
                <div className="text-[12.5px] text-[#6B5845]">
                  <span className="font-mono uppercase font-bold text-[#123B2A] block text-[10.5px]">
                    SOLVING CHALLENGE
                  </span>
                  <strong className="text-[#1D2522]">{idea.challengeTitle}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/challenges/${idea.challengeId}`)}
                  className="text-[12.5px] font-bold text-[#123B2A] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>View Challenge Case</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Idea Metadata Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1 text-[13px] border-t border-[#EEEAE1]">
                <div>
                  <span className="text-[11px] font-mono text-[#6B5845] block">IDEA STAGE</span>
                  <span className="font-bold text-[#123B2A] inline-flex items-center gap-1 mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
                    {idea.stage} Development
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-[#6B5845] block">TEAM SQUAD</span>
                  <span className="font-bold text-[#1D2522] inline-flex items-center gap-1 mt-0.5">
                    <Users className="h-3.5 w-3.5 text-[#123B2A]" />
                    {idea.contributors.length} Active Contributors
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[11px] font-mono text-[#6B5845] block">STATUS</span>
                  <span className="font-bold text-[#15803D] inline-flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Open for Volunteers
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 flex-wrap pt-2">
                <button
                  type="button"
                  onClick={() => onViewIdeaClick(idea)}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#123B2A] hover:bg-[#0D2B1E] text-white px-6 py-3.5 text-[14.5px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>View Idea Architecture</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </button>

                <button
                  type="button"
                  onClick={() => onJoinTeamClick(idea)}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#123B2A] bg-white hover:bg-[#FAF9F5] text-[#123B2A] px-6 py-3.5 text-[14.5px] font-bold transition-all active:scale-[0.98] shadow-2xs cursor-pointer"
                >
                  <Sparkles className="h-4 w-4 text-[#F5A623]" />
                  <span>Join the Team</span>
                </button>
              </div>
            </div>

            {/* ── Right Side: Technical Concept Visual ── */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="w-full aspect-[4/3] rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] p-6 relative overflow-hidden flex flex-col justify-between shadow-inner">
                {/* Geodetic Grid Lines */}
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full stroke-[#EEEAE1] fill-none"
                  strokeWidth="0.8"
                >
                  <line x1="0" y1="25%" x2="100%" y2="25%" />
                  <line x1="0" y1="50%" x2="100%" y2="50%" />
                  <line x1="0" y1="75%" x2="100%" y2="75%" />
                  <line x1="25%" y1="0" x2="25%" y2="100%" />
                  <line x1="50%" y1="0" x2="50%" y2="100%" />
                  <line x1="75%" y1="0" x2="75%" y2="100%" />
                  <circle cx="50%" cy="50%" r="55" strokeDasharray="3 3" />
                  <circle cx="50%" cy="50%" r="90" />
                </svg>

                {/* Top Telemetry Header */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#6B5845] border-b border-[#EEEAE1] pb-2">
                  <span className="flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5 text-[#15803D] animate-pulse" />
                    <span>ACOUSTIC VIBRATION TELEMETRY</span>
                  </span>
                  <span className="font-bold text-[#123B2A]">KHUNTI 23.08°N</span>
                </div>

                {/* Central Schematic Diagram */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto space-y-3">
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing ring */}
                    <div className="absolute h-24 w-24 rounded-full bg-[#0284C7]/10 animate-ping" />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#123B2A] text-white shadow-md ring-4 ring-white">
                      <Radio className="h-8 w-8 text-[#F5A623]" />
                    </div>
                  </div>

                  {/* Connected Mesh Nodes */}
                  <div className="flex items-center gap-6 text-[11px] font-mono">
                    <div className="px-2.5 py-1 rounded-md bg-white border border-[#EEEAE1] shadow-2xs text-[#1D2522]">
                      Sensor Node 01 · Handpump 3
                    </div>
                    <div className="h-[1.5px] w-6 bg-[#123B2A]" />
                    <div className="px-2.5 py-1 rounded-md bg-white border border-[#EEEAE1] shadow-2xs text-[#1D2522]">
                      Gateway Mesh
                    </div>
                  </div>
                </div>

                {/* Bottom Technical Coordinates Strip */}
                <div className="relative z-10 bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-[#EEEAE1] flex items-center justify-between text-[11.5px] font-mono text-[#6B5845]">
                  <span>LoRaWAN Mesh: 868 MHz</span>
                  <span className="text-[#15803D] font-bold">Signal: Strong (98.4%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
