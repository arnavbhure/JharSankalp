import { UniversityProfile } from '../../types/university';
import { GraduationCap, MapPin, Users, Rocket, BookOpen } from 'lucide-react';

interface UniversityHeaderProps {
  profile: UniversityProfile;
}

export function UniversityHeader({ profile }: UniversityHeaderProps) {
  return (
    <section className="border-b border-[#EEEAE1] bg-white pt-8 pb-7 sm:pt-10 sm:pb-9 text-left relative overflow-hidden">
      {/* Subtle topographic background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] pattern-topography"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-5 z-10">
        {/* Top Eyebrow & Institutional Live Signal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="inline-flex items-center gap-1.5 rounded-md border border-[#4C1E4F]/20 bg-[#FAF9F5] px-3 py-1 text-[11px] font-mono font-bold tracking-wider uppercase text-[#4C1E4F]">
              <GraduationCap className="h-3.5 w-3.5 text-[#FA7E61]" />
              <span>INSTITUTION OVERVIEW</span>
            </div>
            <span className="text-[#6B5845]/50">·</span>
            <span className="text-[11.5px] font-mono font-semibold text-[#6B5845]">
              {profile.category} · {profile.location}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0] text-[11px] font-mono font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#15803D] animate-pulse" />
              ACADEMIC SPRINT ACTIVE
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-2">
          <h1 className="text-[2.2rem] sm:text-[2.8rem] lg:text-[3.2rem] font-extrabold text-[#1D2522] tracking-tight leading-[1.12] font-sans">
            {profile.name}
          </h1>
          <p className="text-[15.5px] sm:text-[17px] text-[#6B5845] max-w-3xl leading-relaxed">
            {profile.tagline} — Channeling student engineers, faculty investigators, and laboratory
            capabilities into solving Jharkhand&apos;s real-world societal bottlenecks.
          </p>
        </div>

        {/* Profile Stats Quick Strip */}
        <div className="flex items-center gap-4 sm:gap-6 pt-3 border-t border-[#EEEAE1] text-[12.5px] font-mono text-[#6B5845] flex-wrap">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[#4C1E4F]" />
            <span>
              <strong className="text-[#1D2522]">{profile.activeResearchers}</strong> Active
              Researchers
            </span>
          </div>
          <span className="text-[#6B5845]/40 hidden sm:inline">·</span>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-[#123B2A]" />
            <span>
              <strong className="text-[#1D2522]">{profile.studentTeams}</strong> Student Teams
            </span>
          </div>
          <span className="text-[#6B5845]/40 hidden sm:inline">·</span>
          <div className="flex items-center gap-2">
            <Rocket className="h-4 w-4 text-[#FA7E61]" />
            <span>
              <strong className="text-[#1D2522]">{profile.activeProjects}</strong> Active Projects
            </span>
          </div>
          <span className="text-[#6B5845]/40 hidden sm:inline">·</span>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#B5A886]" />
            <span className="text-[#1D2522] font-semibold">{profile.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
