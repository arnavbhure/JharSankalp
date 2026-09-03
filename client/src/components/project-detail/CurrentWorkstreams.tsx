import { ProjectDetail } from '../../types/projectDetail';
import { Activity, Radio, Cpu, Wrench } from 'lucide-react';

interface CurrentWorkstreamsProps {
  project: ProjectDetail;
}

export function CurrentWorkstreams({ project }: CurrentWorkstreamsProps) {
  const getIcon = (title: string) => {
    if (title.includes('DEPLOYMENT')) return <Wrench className="h-4 w-4 text-[#123B2A]" />;
    if (title.includes('DATA')) return <Radio className="h-4 w-4 text-[#F5A623] animate-pulse" />;
    return <Cpu className="h-4 w-4 text-[#7E22CE]" />;
  };

  return (
    <section id="work" className="scroll-mt-32 space-y-6 text-left">
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="space-y-1 border-b border-[#EEEAE1] pb-4">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <Activity className="h-4 w-4 text-[#F5A623]" />
            <span>ACTIVE SPRINT FOCUS</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            What the team is working on now
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl leading-relaxed">
            Concurrent operational tracks advancing technical telemetry, village installation, and alert integration.
          </p>
        </div>

        {/* ── Structured Workstream Rows ── */}
        <div className="space-y-3.5">
          {project.workstreams.map((ws) => (
            <div
              key={ws.id}
              className="p-5 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] hover:border-[#123B2A]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="h-10 w-10 rounded-xl bg-white border border-[#EEEAE1] flex items-center justify-center shrink-0 shadow-2xs">
                  {getIcon(ws.title)}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[14px] font-extrabold font-mono uppercase text-[#123B2A] tracking-wider">
                      {ws.title}
                    </h4>
                    <span className="text-[11px] font-mono text-[#6B5845] bg-white px-2 py-0.5 rounded border border-[#EEEAE1]">
                      {ws.status}
                    </span>
                  </div>

                  <p className="text-[13.5px] text-[#1D2522] leading-relaxed">
                    {ws.description}
                  </p>
                </div>
              </div>

              {/* Workstream Metric Badge */}
              <div className="shrink-0 bg-white p-3 rounded-xl border border-[#EEEAE1] text-right self-start sm:self-auto min-w-[140px]">
                <span className="text-[10px] font-mono uppercase text-[#6B5845] block">
                  PROGRESS
                </span>
                <span className="text-[13.5px] font-extrabold font-mono text-[#123B2A] block mt-0.5">
                  {ws.progress}
                </span>
                <span className="text-[10.5px] font-mono text-[#15803D] block">
                  {ws.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
