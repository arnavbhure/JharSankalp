import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Droplets, MapPin, Clock, ArrowRight, Check, UserPlus } from 'lucide-react';
import { CollaborationProject } from '../../types/collaborations';

interface FeaturedCollaborationProps {
  project: CollaborationProject;
  onJoinToggle?: (id: string, isJoined: boolean) => void;
}

export function FeaturedCollaboration({ project, onJoinToggle }: FeaturedCollaborationProps) {
  const navigate = useNavigate();
  const [joined, setJoined] = useState(project.isJoined ?? false);
  const [teamCount, setTeamCount] = useState(project.teamCount);

  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !joined;
    setJoined(nextState);
    const nextCount = nextState ? teamCount + 1 : teamCount - 1;
    setTeamCount(nextCount);
    if (onJoinToggle) {
      onJoinToggle(project.id, nextState);
    }
  };

  const handleView = () => {
    navigate(`/workspace/projects/PROJECT-2026-0012`);
  };

  return (
    <section className="text-left">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#123B2A] text-white p-6 sm:p-9 lg:p-10 shadow-lg border border-[#1E5A3A] transition-all">
        {/* Subtle Topographic Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04] pattern-topography"
        />

        <div className="relative z-10 space-y-6">
          {/* Top Pill & Badges */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5A623] text-[#123B2A] text-[11px] font-mono font-extrabold uppercase tracking-wider shadow-xs">
                <Sparkles className="h-3.5 w-3.5 fill-[#123B2A]" />
                <span>FEATURED COLLABORATION</span>
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-mono font-semibold border border-white/15">
                <Droplets className="h-3 w-3 text-[#F5A623]" />
                <span>{project.focusArea}</span>
              </span>

              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#0284C7]/30 text-[#BAE6FD] text-[11px] font-mono font-bold border border-[#BAE6FD]/30">
                {project.stage}
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11.5px] font-mono text-white/70">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-[#F5A623]" />
                <span>{project.district}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Active Sprint</span>
              </span>
            </div>
          </div>

          {/* Main Title & Description */}
          <div className="space-y-3 max-w-3xl">
            <h2 className="text-[1.8rem] sm:text-[2.35rem] font-extrabold text-white tracking-tight leading-[1.18] font-sans">
              {project.title}
            </h2>
            <p className="text-[15px] sm:text-[16px] text-white/80 leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* Progress and Team Strip */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-white/5 border border-white/10">
            {/* Left: Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[12.5px] font-mono">
                <span className="text-white/80 font-bold">Prototype Development</span>
                <span className="text-[#F5A623] font-bold">{project.progress}% Complete</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#F5A623] transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <span className="text-[11px] font-mono text-white/60 block">{project.leadOrg}</span>
            </div>

            {/* Right: Team Avatars & Skills */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[12.5px] font-mono">
                <span className="text-white/80 font-bold">Team Composition</span>
                <span className="text-white/60">{teamCount} Active Contributors</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  {(project.avatars || ['AV', 'PS', 'RM', 'SD', 'AR', 'VK']).map((av, idx) => (
                    <div
                      key={idx}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#FAF9F5] text-[#123B2A] text-[10px] font-mono font-bold ring-2 ring-[#123B2A]"
                    >
                      {av}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {project.skillsNeeded.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-white/10 text-[10.5px] font-mono text-white/90 border border-white/15"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={handleView}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#F5A623] hover:bg-[#E09215] text-[#123B2A] text-[13.5px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>View Project</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={handleJoin}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13.5px] font-bold transition-all active:scale-[0.98] cursor-pointer ${
                joined
                  ? 'bg-[#15803D] text-white border border-[#BBF7D0]'
                  : 'border border-white/20 bg-white/10 hover:bg-white/15 text-white'
              }`}
            >
              {joined ? (
                <>
                  <Check className="h-4 w-4 stroke-[3]" />
                  <span>Joined ✓</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 text-[#F5A623]" />
                  <span>Join Collaboration</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
