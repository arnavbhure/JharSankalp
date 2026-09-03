import { ProjectDetail } from '../../types/projectDetail';
import { Target, ArrowRight, CheckCircle2, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

interface ProjectMissionProps {
  project: ProjectDetail;
}

export function ProjectMission({ project }: ProjectMissionProps) {
  const { mission, successCriteria } = project;

  return (
    <section id="mission" className="scroll-mt-32 space-y-6 text-left">
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-8">
        <div className="space-y-1 border-b border-[#EEEAE1] pb-4">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <Target className="h-4 w-4 text-[#F5A623]" />
            <span>OPERATIONAL CHARTER</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            The mission & success criteria
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl leading-relaxed">
            The engineering hypothesis, delivery methodology, and audited baseline goals governing this consortium.
          </p>
        </div>

        {/* ── 3-Part Operational Core Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Problem Card */}
          <div className="p-5 rounded-2xl bg-[#FFF5F5] border border-[#FECDD3] space-y-2 text-left">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase text-[#BE123C]">
              <ShieldAlert className="h-4 w-4" />
              <span>THE PROBLEM</span>
            </div>
            <p className="text-[13.5px] text-[#1D2522] leading-relaxed">
              {mission.problem}
            </p>
          </div>

          {/* Approach Card */}
          <div className="p-5 rounded-2xl bg-[#FFFDF9] border-2 border-[#123B2A] space-y-2 text-left">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase text-[#123B2A]">
              <Cpu className="h-4 w-4 text-[#F5A623]" />
              <span>THE APPROACH</span>
            </div>
            <p className="text-[13.5px] text-[#1D2522] leading-relaxed">
              {mission.approach}
            </p>
          </div>

          {/* Outcome Card */}
          <div className="p-5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-2 text-left">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase text-[#15803D]">
              <CheckCircle2 className="h-4 w-4" />
              <span>EXPECTED OUTCOME</span>
            </div>
            <p className="text-[13.5px] text-[#1D2522] leading-relaxed">
              {mission.expectedOutcome}
            </p>
          </div>
        </div>

        {/* ── Success Criteria Metrics Strip ── */}
        <div className="pt-2 space-y-3">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
            <span>MEASURABLE SUCCESS CRITERIA</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {successCriteria.map((crit, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-2 text-left"
              >
                <span className="text-[12.5px] font-bold text-[#1D2522] block">
                  {crit.label}
                </span>

                <div className="flex items-center gap-2 text-[11.5px] font-mono">
                  <span className="text-[#BE123C] bg-white px-2 py-0.5 rounded border border-[#EEEAE1]">
                    {crit.baseline}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#6B5845]/60 shrink-0" />
                  <span className="text-[#15803D] font-bold bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#BBF7D0]">
                    {crit.target}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
