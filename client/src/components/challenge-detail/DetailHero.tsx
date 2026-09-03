import { MapPin, Users, Lightbulb, AlertTriangle, ShieldAlert, Activity, Check } from 'lucide-react';
import { ChallengeDetailData } from '../../types/challengeDetail';

interface DetailHeroProps {
  challenge: ChallengeDetailData;
  onContributeClick: () => void;
  onJoinClick: () => void;
  isJoined?: boolean;
}

export function DetailHero({
  challenge,
  onContributeClick,
  onJoinClick,
  isJoined = false,
}: DetailHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#F8F6F1] pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-[#EEEAE1] text-left">
      {/* Topographic Background Matrix */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] pattern-topography"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* ── LEFT: Case File Header & Editorial Narrative (7 Cols) ── */}
          <div className="lg:col-span-7 space-y-5">
            {/* Top Breadcrumb & Status Pill */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#123B2A] text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-2xs">
                <ShieldAlert className="h-3.5 w-3.5 text-[#F5A623]" />
                <span>{challenge.category.toUpperCase()}</span>
              </span>

              <div className="flex items-center gap-1.5 text-[12px] font-mono font-bold text-[#6B5845] uppercase">
                <MapPin className="h-3.5 w-3.5 text-[#123B2A]" />
                <span>{challenge.district.toUpperCase()} · {challenge.subLocation.toUpperCase()}</span>
              </div>

              <span className="text-[#6B5845]/40 font-mono">·</span>

              <span className="text-[12px] font-mono font-bold text-[#6B5845]">
                {challenge.id}
              </span>

              {/* Status Indicator */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-[11px] font-mono font-bold uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-[#15803D] animate-pulse" />
                <span>{challenge.status}</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[2.25rem] sm:text-[3rem] lg:text-[3.25rem] font-extrabold text-[#1D2522] tracking-tight leading-[1.14] font-sans">
              {challenge.title}
            </h1>

            {/* Supporting Summary */}
            <p className="text-[15.5px] sm:text-[16.5px] text-[#1D2522]/85 max-w-2xl leading-relaxed">
              {challenge.summary}
            </p>

            {/* Key Metadata 4-Column Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#EEEAE1]">
              <div className="p-3 rounded-lg bg-white border border-[#EEEAE1] shadow-2xs">
                <div className="text-[1.35rem] font-extrabold font-mono text-[#123B2A] leading-none">
                  {challenge.impactMetrics.affectedResidents}
                </div>
                <div className="text-[11.5px] text-[#6B5845] mt-1 font-medium">
                  Affected Residents
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#EEEAE1] shadow-2xs">
                <div className="text-[1.35rem] font-extrabold font-mono text-[#B45309] leading-none">
                  {challenge.impactPriority.split(' ')[0]}
                </div>
                <div className="text-[11.5px] text-[#6B5845] mt-1 font-medium">
                  Impact Priority
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#EEEAE1] shadow-2xs">
                <div className="text-[1.35rem] font-extrabold font-mono text-[#123B2A] leading-none">
                  {challenge.stats.collaboratorsCount}
                </div>
                <div className="text-[11.5px] text-[#6B5845] mt-1 font-medium">
                  Active Solvers
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#EEEAE1] shadow-2xs">
                <div className="text-[1.35rem] font-extrabold font-mono text-[#F5A623] leading-none">
                  {challenge.stats.ideasCount}
                </div>
                <div className="text-[11.5px] text-[#6B5845] mt-1 font-medium">
                  Ideas Submitted
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Contextual Civic Intelligence Visual (5 Cols) ── */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#123B2A] border-2 border-[#1F5A3D] text-white p-6 sm:p-7 shadow-lg overflow-hidden space-y-4">
              {/* Radar & Terrain SVG Overlays */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-15"
              >
                <svg viewBox="0 0 400 300" className="w-full h-full stroke-white fill-none" strokeWidth="0.8">
                  {/* Topographic Contour Rings */}
                  <circle cx="200" cy="150" r="40" strokeDasharray="3 3" />
                  <circle cx="200" cy="150" r="80" strokeWidth="1" />
                  <circle cx="200" cy="150" r="120" strokeDasharray="4 4" />
                  <circle cx="200" cy="150" r="160" strokeWidth="1" />
                  {/* Geological Fault Vectors */}
                  <path d="M 40,240 Q 180,110 360,200" strokeWidth="1.4" stroke="#F5A623" />
                  <path d="M 60,60 Q 220,180 340,90" strokeDasharray="5 5" />
                  {/* Center Node */}
                  <circle cx="200" cy="150" r="5" fill="#F5A623" />
                </svg>
              </div>

              {/* Header inside visual card */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-3">
                <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-[#F8F6F1]/90 uppercase tracking-wider">
                  <Activity className="h-3.5 w-3.5 text-[#F5A623] animate-pulse" />
                  <span>SEISMIC TELEMETRY RADAR</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-white/10 text-[#F5A623] text-[10px] font-mono font-bold">
                  LIVE GRID
                </span>
              </div>

              {/* Geographic Coordinates & Location Card */}
              <div className="relative z-10 space-y-3">
                <div className="text-left">
                  <span className="text-[11px] font-mono font-bold text-[#F5A623] tracking-widest uppercase block">
                    {challenge.locationCoordinates.zoneName}
                  </span>
                  <div className="text-[1.35rem] font-mono font-extrabold text-white tracking-tight mt-0.5">
                    {challenge.locationCoordinates.formatted}
                  </div>
                </div>

                {/* Subsurface Sensor Vector Box */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/15 space-y-2 text-[12px] text-left">
                  <div className="flex items-center justify-between text-white/80">
                    <span>Geological Strata:</span>
                    <span className="font-mono text-white font-bold">Barakar Coal Measures</span>
                  </div>
                  <div className="flex items-center justify-between text-white/80">
                    <span>Subterranean Depth:</span>
                    <span className="font-mono text-white font-bold">60m – 140m Voids</span>
                  </div>
                  <div className="flex items-center justify-between text-white/80">
                    <span>Telemetry Status:</span>
                    <span className="font-mono text-[#F5A623] font-bold">Acoustic Extensometer Pilot</span>
                  </div>
                </div>

                {/* Warning Banner */}
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F8F6F1] text-[11.5px]">
                  <AlertTriangle className="h-4 w-4 text-[#F5A623] shrink-0" />
                  <span>Active seam fire thermal acceleration documented in Sector 4.</span>
                </div>
              </div>

              {/* Quick Action Buttons inside Hero Visual */}
              <div className="relative z-10 pt-2 flex items-center gap-2.5">
                <button
                  onClick={onContributeClick}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#F5A623] hover:bg-[#E09215] text-[#123B2A] py-2.5 px-4 text-[13px] font-extrabold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Lightbulb className="h-4 w-4" />
                  <span>Contribute Idea</span>
                </button>

                <button
                  onClick={onJoinClick}
                  className={`flex-1 inline-flex items-center justify-center gap-2 rounded-lg py-2.5 px-4 text-[13px] font-bold transition-all active:scale-[0.98] cursor-pointer ${
                    isJoined
                      ? 'bg-[#15803D] text-white border border-[#BBF7D0]'
                      : 'border border-white/30 bg-white/10 hover:bg-white/15 text-white'
                  }`}
                >
                  {isJoined ? (
                    <>
                      <Check className="h-4 w-4 text-white" />
                      <span>Joined ✓</span>
                    </>
                  ) : (
                    <>
                      <Users className="h-4 w-4 text-[#F5A623]" />
                      <span>Join Challenge</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
