import { IndustryProfile } from '../../types/industry';
import { Building2, CheckCircle2, Handshake, Sparkles } from 'lucide-react';

interface IndustryHeaderProps {
  profile: IndustryProfile;
}

export function IndustryHeader({ profile }: IndustryHeaderProps) {
  return (
    <section className="border-b border-[#EEEAE1] bg-white pt-8 pb-7 sm:pt-10 sm:pb-9 text-left relative overflow-hidden">
      {/* Subtle background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] pattern-topography"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-5 z-10">
        {/* Top Eyebrow & Institutional Live Signal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="inline-flex items-center gap-1.5 rounded-md border border-[#123B2A]/20 bg-[#FAF9F5] px-3 py-1 text-[11px] font-mono font-bold tracking-wider uppercase text-[#123B2A]">
              <Handshake className="h-3.5 w-3.5 text-[#F5A623]" />
              <span>{profile.tagline.toUpperCase()}</span>
            </div>
            <span className="text-[#6B5845]/50">·</span>
            <span className="text-[11.5px] font-mono font-semibold text-[#6B5845]">
              Commercialization & Implementation Gateway · Jharkhand
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0] text-[11px] font-mono font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#15803D] animate-pulse" />
              PARTNER NETWORK ACTIVE
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-2">
          <h1 className="text-[2.2rem] sm:text-[2.8rem] lg:text-[3.2rem] font-extrabold text-[#1D2522] tracking-tight leading-[1.12] font-sans">
            {profile.name}
          </h1>
          <p className="text-[15.5px] sm:text-[17px] text-[#6B5845] max-w-3xl leading-relaxed">
            {profile.description}
          </p>
        </div>

        {/* Profile Stats Quick Strip */}
        <div className="flex items-center gap-4 sm:gap-6 pt-3 border-t border-[#EEEAE1] text-[12.5px] font-mono text-[#6B5845] flex-wrap">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#15803D]" />
            <span>
              <strong className="text-[#1D2522]">{profile.activeCommitments}</strong> Active Commitments
            </span>
          </div>
          <span className="text-[#6B5845]/40 hidden sm:inline">·</span>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#FA7E61]" />
            <span>
              <strong className="text-[#1D2522]">{profile.collaborationOpportunities}</strong> Open Opportunities
            </span>
          </div>
          <span className="text-[#6B5845]/40 hidden sm:inline">·</span>
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-[#4C1E4F]" />
            <span>
              <strong className="text-[#1D2522]">{profile.projectsSupported}</strong> Projects Supported
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
