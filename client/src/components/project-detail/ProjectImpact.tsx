import { ProjectDetail } from '../../types/projectDetail';
import { Target, AlertCircle } from 'lucide-react';

interface ProjectImpactProps {
  project: ProjectDetail;
}

export function ProjectImpact({ project }: ProjectImpactProps) {
  const { impact } = project;

  return (
    <section id="impact" className="scroll-mt-32 space-y-6 text-left">
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-8">
        {/* Section Header */}
        <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#4C1E4F]">
              <Target className="h-4 w-4 text-[#FA7E61]" />
              <span>OUTCOME AUDITING & ACCOUNTABILITY</span>
            </div>
            <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              Impact Tracking & Early Outcomes
            </h3>
            <p className="text-[13.5px] text-[#6B5845] max-w-2xl leading-relaxed">
              Tracking early progress, community reach, and anticipated societal improvements across
              Jharkhand.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase bg-[#FEE1C7] px-3 py-1 rounded-full text-[#4C1E4F] border border-[#FA7E61]/30">
              DEMO / PROTOTYPE DATA
            </span>
          </div>
        </div>

        {/* ── 1. Current Verified Delivered Outputs ── */}
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#4C1E4F]">
              1. EARLY VERIFIED DELIVERED OUTPUTS
            </span>
            <span className="text-[11px] font-mono text-[#6B5845]">Active Field Deployment</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {impact.currentOutputs.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1 text-left shadow-2xs"
              >
                <div className="text-[1.8rem] sm:text-[2.2rem] font-extrabold font-mono text-[#4C1E4F] leading-none">
                  {item.value}
                </div>
                <div className="text-[13px] font-bold text-[#1D2522] leading-tight">
                  {item.label}
                </div>
                <div className="text-[11px] text-[#6B5845] leading-snug">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 2. Target Measurable Outcomes ── */}
        <div className="space-y-3 pt-2">
          <div className="flex items-baseline justify-between">
            <span className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#15803D]">
              2. TARGET OUTCOMES (PROJECTED SOCIETAL TRANSFORMATION)
            </span>
            <span className="text-[11px] font-mono text-[#6B5845]">Subject to Pilot Audit</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {impact.targetOutcomes.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#F0FDF4]/70 border border-[#BBF7D0] space-y-1.5 text-left shadow-2xs"
              >
                <div className="text-[2rem] sm:text-[2.4rem] font-extrabold font-mono text-[#15803D] leading-none">
                  {item.value}
                </div>
                <div className="text-[14px] font-bold text-[#1D2522]">{item.label}</div>
                <div className="text-[11.5px] text-[#6B5845] leading-snug">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. Impact Status Notice Banner ── */}
        <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#FDE68A] flex items-center gap-3 text-left">
          <AlertCircle className="h-5 w-5 text-[#B45309] shrink-0" />
          <div className="text-[12.5px] text-[#1D2522] leading-relaxed">
            <strong className="font-mono uppercase text-[#B45309] mr-1.5">Impact Status:</strong>
            Full impact measurement and formal government baseline verification begins after pilot
            completion. All metrics presented above represent prototype field trial indicators.
          </div>
        </div>
      </div>
    </section>
  );
}
