import { ProjectDetail } from '../../types/projectDetail';
import { Target, CheckCircle2, Radio, Clock, ShieldCheck } from 'lucide-react';

interface ProjectImpactProps {
  project: ProjectDetail;
}

export function ProjectImpact({ project }: ProjectImpactProps) {
  const { impact } = project;

  return (
    <section id="impact" className="scroll-mt-32 space-y-6 text-left">
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-8">
        <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
              <Target className="h-4 w-4 text-[#F5A623]" />
              <span>OUTCOME AUDITING & ACCOUNTABILITY</span>
            </div>
            <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              Measuring impact & verified outcomes
            </h3>
            <p className="text-[13.5px] text-[#6B5845] max-w-2xl leading-relaxed">
              JharSankalp enforces an audited boundary between what has physically been deployed versus long-term societal projections.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[11.5px] font-mono font-bold text-[#15803D] bg-[#F0FDF4] px-3 py-1 rounded-xl border border-[#BBF7D0]">
            <ShieldCheck className="h-4 w-4 text-[#15803D]" />
            <span>Field Audited</span>
          </div>
        </div>

        {/* ── 1. Current Verified Outputs ── */}
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
              1. CURRENT DELIVERED OUTPUTS (WHAT HAS BEEN BUILT)
            </span>
            <span className="text-[11px] font-mono text-[#6B5845]">Verified On Ground</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {impact.currentOutputs.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1 text-left"
              >
                <div className="text-[1.8rem] sm:text-[2.2rem] font-extrabold font-mono text-[#123B2A] leading-none">
                  {item.value}
                </div>
                <div className="text-[12.5px] font-bold text-[#1D2522] leading-tight">
                  {item.label}
                </div>
                <div className="text-[10.5px] text-[#6B5845] leading-snug">
                  {item.desc}
                </div>
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
                className="p-5 rounded-2xl bg-[#F0FDF4]/70 border border-[#BBF7D0] space-y-1.5 text-left"
              >
                <div className="text-[2rem] sm:text-[2.4rem] font-extrabold font-mono text-[#15803D] leading-none">
                  {item.value}
                </div>
                <div className="text-[13.5px] font-bold text-[#1D2522]">
                  {item.label}
                </div>
                <div className="text-[11.5px] text-[#6B5845] leading-snug">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. Evidence Audit Status Track ── */}
        <div className="space-y-3 pt-2 border-t border-[#EEEAE1]">
          <span className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#6B5845] block">
            3. SCIENTIFIC EVIDENCE STATUS
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Baseline Data */}
            <div className="p-3.5 rounded-xl bg-white border border-[#BBF7D0] flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-[#15803D] text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono font-bold text-[#15803D] uppercase block">
                  BASELINE DATA
                </span>
                <span className="text-[12px] text-[#1D2522] font-semibold">
                  Field Baseline Completed
                </span>
              </div>
            </div>

            {/* Pilot Telemetry */}
            <div className="p-3.5 rounded-xl bg-white border border-[#FDE68A] flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-[#FFFDF9] border border-[#F5A623] text-[#F5A623] flex items-center justify-center shrink-0">
                <Radio className="h-4 w-4 text-[#B45309] animate-pulse" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono font-bold text-[#B45309] uppercase block">
                  PILOT DATA
                </span>
                <span className="text-[12px] text-[#1D2522] font-semibold">
                  Continuous Telemetry Stream
                </span>
              </div>
            </div>

            {/* Impact Validation */}
            <div className="p-3.5 rounded-xl bg-white border border-[#EEEAE1] flex items-center gap-3 opacity-75">
              <div className="h-8 w-8 rounded-full bg-[#FAF9F5] border border-[#EEEAE1] text-[#6B5845] flex items-center justify-center shrink-0">
                <Clock className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono font-bold text-[#6B5845] uppercase block">
                  IMPACT VALIDATION
                </span>
                <span className="text-[12px] text-[#6B5845]">
                  Pending 6-Month Pilot Cycle
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
