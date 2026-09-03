import { ProjectDetail } from '../../types/projectDetail';
import { Clock } from 'lucide-react';

interface ProjectActivityTimelineProps {
  project: ProjectDetail;
}

export function ProjectActivityTimeline({ project }: ProjectActivityTimelineProps) {
  return (
    <section id="activity" className="scroll-mt-32 space-y-6 text-left">
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
              <Clock className="h-4 w-4 text-[#F5A623]" />
              <span>CHRONOLOGICAL AUDIT TRAIL</span>
            </div>
            <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              Recent project activity
            </h3>
          </div>

          <span className="text-[12px] font-mono text-[#6B5845]">Live Activity Stream</span>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-[#EEEAE1]">
          {project.activity.map((item) => (
            <div key={item.id} className="relative group">
              {/* Dot */}
              <div className="absolute -left-6 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white border border-[#123B2A] shadow-2xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#123B2A]" />
              </div>

              <div className="space-y-0.5">
                <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
                  {item.timestamp}
                </span>

                <h4 className="text-[14px] font-bold text-[#1D2522]">{item.title}</h4>

                <p className="text-[13px] text-[#6B5845] leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
