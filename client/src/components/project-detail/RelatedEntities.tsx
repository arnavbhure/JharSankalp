import { Link } from 'react-router-dom';
import { ProjectDetail } from '../../types/projectDetail';
import { SEEDED_PROJECTS } from '../../data/projectsData';
import { Target, Lightbulb, Layers, ArrowRight, MapPin, Sparkles } from 'lucide-react';

interface RelatedEntitiesProps {
  project: ProjectDetail;
}

export function RelatedEntities({ project }: RelatedEntitiesProps) {
  // Find other projects in same or complementary domain
  const sameDomainProjects = SEEDED_PROJECTS.filter(
    (p) => p.id !== project.id && (p.domain === project.domain || p.district === project.district)
  ).slice(0, 3);

  // Fallback if none found
  const relatedProjects =
    sameDomainProjects.length > 0
      ? sameDomainProjects
      : SEEDED_PROJECTS.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <section id="related" className="scroll-mt-32 space-y-6 text-left">
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-8">
        <div className="space-y-1 border-b border-[#EEEAE1] pb-4">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#4C1E4F]">
            <Sparkles className="h-4 w-4 text-[#FA7E61]" />
            <span>CONNECTED INNOVATION ECOSYSTEM</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Related Challenges, Ideas & Projects
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl leading-relaxed">
            JharSankalp connects ground problems with collaborative ideas and active field projects across Jharkhand.
          </p>
        </div>

        {/* ── 3 Column Ecosystem Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Column 1: Original Challenge (4 cols) */}
          <div className="lg:col-span-4 p-5 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#BE123C] bg-[#FFF5F5] px-2.5 py-0.5 rounded border border-[#FECDD3]">
                  <Target className="h-3.5 w-3.5" />
                  ORIGINAL CHALLENGE
                </span>
                <span className="text-[11px] font-mono text-[#6B5845]">
                  {project.challenge.id}
                </span>
              </div>

              <h4 className="text-[15px] font-bold text-[#1D2522] leading-snug">
                {project.challenge.title}
              </h4>

              <div className="flex items-center gap-1.5 text-[12px] font-mono text-[#6B5845]">
                <MapPin className="h-3.5 w-3.5 text-[#FA7E61]" />
                <span>{project.challenge.location}</span>
              </div>

              <p className="text-[12.5px] text-[#6B5845] leading-relaxed">
                The community-reported bottleneck that triggered this research consortium.
              </p>
            </div>

            <Link
              to={`/challenges/${project.challenge.id}`}
              className="inline-flex items-center justify-between w-full pt-3 border-t border-[#EEEAE1] text-[12.5px] font-bold text-[#123B2A] hover:text-[#FA7E61] transition-colors"
            >
              <span>View Original Challenge</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Column 2: Related Proposed Idea (4 cols) */}
          <div className="lg:col-span-4 p-5 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#B45309] bg-[#FFFBEB] px-2.5 py-0.5 rounded border border-[#FDE68A]">
                  <Lightbulb className="h-3.5 w-3.5" />
                  PROPOSED SOLUTION IDEA
                </span>
                <span className="text-[11px] font-mono text-[#6B5845]">
                  {project.idea?.id || 'IDEA-2026-0001'}
                </span>
              </div>

              <h4 className="text-[15px] font-bold text-[#1D2522] leading-snug">
                {project.idea?.title || `${project.title} Concept`}
              </h4>

              <div className="text-[11.5px] font-mono text-[#4C1E4F] font-bold">
                Domain: {project.domain}
              </div>

              <p className="text-[12.5px] text-[#6B5845] leading-relaxed">
                The peer-reviewed solution approach selected to move into active project formation.
              </p>
            </div>

            <Link
              to={`/ideas/${project.idea?.id || 'IDEA-2026-0001'}`}
              className="inline-flex items-center justify-between w-full pt-3 border-t border-[#EEEAE1] text-[12.5px] font-bold text-[#4C1E4F] hover:text-[#FA7E61] transition-colors"
            >
              <span>Explore Proposed Idea</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Column 3: Other Projects in Domain (4 cols) */}
          <div className="lg:col-span-4 p-5 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#4C1E4F]">
                <Layers className="h-3.5 w-3.5 text-[#FA7E61]" />
                <span>MORE IN {project.domain.toUpperCase()}</span>
              </div>

              <div className="space-y-2.5">
                {relatedProjects.map((relProj) => (
                  <Link
                    key={relProj.id}
                    to={`/projects/${relProj.id}`}
                    className="p-2.5 rounded-xl bg-white border border-[#EEEAE1] hover:border-[#4C1E4F] transition-all block group"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#6B5845]">
                      <span>{relProj.district}</span>
                      <span className="font-bold text-[#4C1E4F]">{relProj.stageLabel}</span>
                    </div>
                    <div className="text-[13px] font-bold text-[#1D2522] group-hover:text-[#4C1E4F] transition-colors truncate">
                      {relProj.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center justify-between w-full pt-2 text-[12px] font-mono font-bold text-[#6B5845] hover:text-[#1D2522] transition-colors"
            >
              <span>Browse All Projects Portfolio</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
