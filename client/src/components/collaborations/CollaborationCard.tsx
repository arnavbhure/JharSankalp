import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Users,
  Check,
  UserPlus,
  Wheat,
  GraduationCap,
  HeartPulse,
  Trees,
  Briefcase,
  Droplets,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { CollaborationProject, ProjectStage } from '../../types/collaborations';

interface CollaborationCardProps {
  project: CollaborationProject;
  onJoinToggle?: (id: string, isJoined: boolean) => void;
}

export function CollaborationCard({
  project,
  onJoinToggle,
}: CollaborationCardProps) {
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

  const getFocusAreaIcon = (area: string) => {
    switch (area.toLowerCase()) {
      case 'agriculture':
        return <Wheat className="h-3.5 w-3.5 text-[#15803D]" />;
      case 'education':
        return <GraduationCap className="h-3.5 w-3.5 text-[#0284C7]" />;
      case 'healthcare':
        return <HeartPulse className="h-3.5 w-3.5 text-[#BE123C]" />;
      case 'environment':
        return <Trees className="h-3.5 w-3.5 text-[#15803D]" />;
      case 'livelihoods':
        return <Briefcase className="h-3.5 w-3.5 text-[#B45309]" />;
      case 'mining safety':
        return <ShieldAlert className="h-3.5 w-3.5 text-[#B45309]" />;
      default:
        return <Droplets className="h-3.5 w-3.5 text-[#123B2A]" />;
    }
  };

  const getStageBadge = (stage: ProjectStage) => {
    switch (stage) {
      case 'Exploring':
        return 'bg-[#FAF9F5] text-[#6B5845] border-[#EEEAE1]';
      case 'Research':
        return 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]';
      case 'Prototyping':
        return 'bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]';
      case 'Pilot Stage':
        return 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]';
      case 'Implementation':
        return 'bg-[#123B2A] text-white border-[#1E5A3A]';
      default:
        return 'bg-[#FAF9F5] text-[#6B5845] border-[#EEEAE1]';
    }
  };

  const handleClick = () => {
    navigate('/workspace/projects/PROJECT-2026-0012');
  };

  return (
    <div
      onClick={handleClick}
      className="rounded-3xl border border-[#EEEAE1] bg-white p-6 shadow-2xs hover:shadow-md hover:border-[#123B2A]/30 transition-all duration-200 text-left flex flex-col justify-between space-y-4 cursor-pointer group"
    >
      <div className="space-y-3">
        {/* Top Header: Focus Area & Stage Badge */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF9F5] border border-[#EEEAE1] text-[11px] font-mono font-bold uppercase text-[#1D2522]">
            {getFocusAreaIcon(project.focusArea)}
            <span>{project.focusArea}</span>
          </span>

          <span
            className={`text-[10.5px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border ${getStageBadge(
              project.stage
            )}`}
          >
            {project.stage}
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h3 className="text-[1.2rem] font-bold text-[#1D2522] leading-snug group-hover:text-[#123B2A] transition-colors">
            {project.title}
          </h3>
          <p className="text-[13px] text-[#6B5845] leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Location & Lead Org */}
        <div className="flex items-center gap-3 text-[11.5px] font-mono text-[#6B5845]">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-[#BE123C]" />
            {project.district}
          </span>
          {project.leadOrg && (
            <>
              <span>·</span>
              <span className="truncate max-w-[170px]" title={project.leadOrg}>
                {project.leadOrg}
              </span>
            </>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#6B5845]">Progress</span>
            <span className="font-bold text-[#123B2A]">{project.progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#FAF9F5] border border-[#EEEAE1] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#123B2A] transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Skills Needed Chips */}
        <div className="space-y-1 pt-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#6B5845] block">
            SKILLS NEEDED:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {project.skillsNeeded.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-md bg-[#FAF9F5] text-[11px] font-mono text-[#1D2522] border border-[#EEEAE1]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: Team Count & Actions */}
      <div className="pt-3 border-t border-[#EEEAE1] flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-[11.5px] font-mono text-[#6B5845]">
          <Users className="h-3.5 w-3.5 text-[#123B2A]" />
          <span>{teamCount} Contributors</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleJoin}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-mono font-bold transition-all active:scale-[0.98] cursor-pointer ${
              joined
                ? 'bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D]'
                : 'bg-[#FAF9F5] hover:bg-[#123B2A] hover:text-white border border-[#EEEAE1] text-[#1D2522]'
            }`}
          >
            {joined ? (
              <>
                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                <span>Joined ✓</span>
              </>
            ) : (
              <>
                <UserPlus className="h-3.5 w-3.5 text-[#F5A623]" />
                <span>Join</span>
              </>
            )}
          </button>

          <span className="text-[#123B2A] group-hover:translate-x-0.5 transition-transform">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
}
