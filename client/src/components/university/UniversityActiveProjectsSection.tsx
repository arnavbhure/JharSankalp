import { UniversityActiveProject } from '../../types/university';
import { Rocket, ArrowRight, Users, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UniversityActiveProjectsSectionProps {
  projects: UniversityActiveProject[];
}

export function UniversityActiveProjectsSection({
  projects,
}: UniversityActiveProjectsSectionProps) {
  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-xs text-left space-y-6">
      <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#15803D]">
            <Rocket className="h-4 w-4 text-[#15803D]" />
            <span>RESEARCH TO FIELD REALIZATION</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Active Research & Implementation Projects
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl">
            Live societal projects where BIT Mesra departments lead hardware prototyping, field
            pilots, and community validation.
          </p>
        </div>

        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF9F5] hover:bg-[#4C1E4F] text-[#4C1E4F] hover:text-white border border-[#B5A886]/40 text-[12.5px] font-bold transition-all shrink-0"
        >
          <span>View All State Projects</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((proj) => {
          const progressPct = Math.round((proj.milestonesCompleted / proj.milestonesTotal) * 100);

          return (
            <div
              key={proj.id}
              className="p-5 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] hover:border-[#123B2A] transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-white border border-[#EEEAE1] text-[#4C1E4F]">
                    ● {proj.stageLabel}
                  </span>

                  <span className="text-[11px] font-mono text-[#6B5845]">{proj.projectCode}</span>
                </div>

                <h4 className="text-[16px] font-bold text-[#1D2522] leading-snug">{proj.title}</h4>

                <div className="text-[12px] font-mono text-[#123B2A]">
                  Dept: <strong>{proj.department}</strong>
                </div>

                <div className="flex items-center gap-4 text-[12px] font-mono text-[#6B5845] pt-1">
                  <div className="flex items-center gap-1">
                    <GraduationCap className="h-3.5 w-3.5 text-[#4C1E4F]" />
                    <span>Lead: {proj.facultyLead}</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-[#15803D]" />
                    <span>{proj.studentFellows} Students</span>
                  </div>
                </div>
              </div>

              {/* Milestone Progress Bar */}
              <div className="pt-2 border-t border-[#EEEAE1] space-y-1.5">
                <div className="flex items-center justify-between text-[11.5px] font-mono">
                  <span className="text-[#6B5845]">Consortium Progress</span>
                  <span className="font-bold text-[#1D2522]">
                    {proj.milestonesCompleted} of {proj.milestonesTotal} Milestones ({progressPct}%)
                  </span>
                </div>

                <div className="h-2 w-full bg-[#EEEAE1] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#4C1E4F] to-[#15803D] rounded-full transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              <div className="pt-1">
                <Link
                  to={`/projects/${proj.id}`}
                  className="w-full inline-flex items-center justify-between py-2 px-3 rounded-xl bg-white border border-[#EEEAE1] hover:border-[#4C1E4F] text-[12.5px] font-bold text-[#4C1E4F] transition-all"
                >
                  <span>Open Full Project Dossier</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
