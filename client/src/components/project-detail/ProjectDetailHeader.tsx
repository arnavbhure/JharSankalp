
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectDetail } from '../../types/projectDetail';
import { ProjectHealthIndicator } from '../projects/ProjectHealthIndicator';
import {
  MapPin,
  Share2,
  Bookmark,
  BookmarkCheck,
  Check,
  Radio,
  Users,
  Building2,
  LayoutDashboard,
} from 'lucide-react';

interface ProjectDetailHeaderProps {
  project: ProjectDetail;
  onJoinClick: () => void;
}

export function ProjectDetailHeader({
  project,
  onJoinClick,
}: ProjectDetailHeaderProps) {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.summary,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasOpenOpportunities =
    project.collaborationNeeds && project.collaborationNeeds.length > 0;

  return (
    <section className="border-b border-[#EEEAE1] bg-white pt-10 pb-8 sm:pt-12 sm:pb-10 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-5">
        {/* Top Metadata Strip */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider flex-wrap">
            <span className="text-[#123B2A] bg-[#FAF9F5] px-2.5 py-0.5 rounded border border-[#EEEAE1]">
              {project.domain}
            </span>
            <span className="text-[#6B5845]/60">·</span>
            <span className="text-[#6B5845] flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-[#BE123C]" />
              {project.location}
            </span>
            <span className="text-[#6B5845]/60">·</span>
            <span className="text-[#6B5845] font-mono font-semibold">
              {project.projectCode}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase px-3 py-1 rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
              <Radio className="h-3 w-3 animate-pulse text-[#15803D]" />
              {project.stageLabel}
            </span>
            <ProjectHealthIndicator health={project.health} label={project.healthLabel} />
          </div>
        </div>

        {/* Main Title & Description */}
        <div className="space-y-3">
          <h1 className="text-[2.2rem] sm:text-[3rem] lg:text-[3.3rem] font-extrabold text-[#1D2522] tracking-tight leading-[1.12] font-sans max-w-4xl">
            {project.title}
          </h1>

          <p className="text-[15.5px] sm:text-[17px] text-[#6B5845] max-w-3xl leading-relaxed font-normal">
            {project.description || project.summary}
          </p>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-[#EEEAE1]">
          <div className="flex items-center gap-2 text-[13px] text-[#6B5845] font-mono">
            <Building2 className="h-4 w-4 text-[#123B2A]" />
            <span>Lead: <strong className="text-[#1D2522]">{project.leadInstitution}</strong></span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Follow Project Button */}
            <button
              type="button"
              onClick={() => setIsFollowing(!isFollowing)}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-[13px] font-bold transition-all cursor-pointer ${isFollowing
                ? 'border-[#15803D] bg-[#F0FDF4] text-[#15803D]'
                : 'border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[#1D2522]'
                }`}
            >
              {isFollowing ? (
                <>
                  <BookmarkCheck className="h-4 w-4 text-[#15803D]" />
                  <span>Following Project</span>
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4 text-[#6B5845]" />
                  <span>Follow Project</span>
                </>
              )}
            </button>

            {/* Share Project Button */}
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[#1D2522] text-[13px] font-bold transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-[#15803D] stroke-[3]" />
                  <span className="text-[#15803D]">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 text-[#6B5845]" />
                  <span>Share</span>
                </>
              )}
            </button>

            {/* Contributor Workspace Trigger */}
            <button
              type="button"
              onClick={() => navigate(`/workspace/projects/${project.id}`)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1B112C] hover:bg-[#281943] text-[#FFD8A8] text-[13px] font-bold border border-[#382657] transition-all cursor-pointer"
            >
              <LayoutDashboard className="h-4 w-4 text-[#F5A623]" />
              <span>Workspace ↗</span>
            </button>

            {/* Primary Action */}
            {hasOpenOpportunities ? (
              <button
                type="button"
                onClick={onJoinClick}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Join Collaboration →</span>
              </button>
            ) : (
              <a
                href="#team"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] text-[#123B2A] text-[13px] font-bold hover:bg-white transition-colors"
              >
                <Users className="h-4 w-4" />
                <span>View Collaboration Team</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
