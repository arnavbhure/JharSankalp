import { useState } from 'react';
import { ProjectReadinessCriteria } from '../../types/myIdeas';
import { Rocket, Check, Circle, Info, CheckCircle2 } from 'lucide-react';

interface ProjectFormationReadinessProps {
  criteria: ProjectReadinessCriteria[];
  ideaTitle: string;
}

export function ProjectFormationReadiness({
  criteria,
  ideaTitle,
}: ProjectFormationReadinessProps) {
  const [showNeededInfo, setShowNeededInfo] = useState(false);
  const [initiated, setInitiated] = useState(false);

  const metCount = criteria.filter((c) => c.met).length;

  return (
    <section className="rounded-3xl border-2 border-[#7E22CE]/30 bg-[#FAF5FF]/50 p-6 sm:p-8 space-y-6 text-left shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#7E22CE]/20 pb-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#7E22CE]">
            <Rocket className="h-4 w-4" />
            <span>INCUBATION BRIDGE · PROJECT FORMATION</span>
          </div>

          <h3 className="text-[1.6rem] sm:text-[1.85rem] font-extrabold text-[#1D2522] font-sans tracking-tight leading-tight">
            Ready to become a project?
          </h3>

          <p className="text-[14px] text-[#6B5845] leading-relaxed max-w-2xl">
            For Idea: <strong className="text-[#1D2522]">{ideaTitle}</strong>. When a technical hypothesis gathers enough contributors and verified lab feasibility, it can be formalized as an execution project with dedicated grant funding.
          </p>
        </div>

        <div className="shrink-0 bg-white p-3 rounded-2xl border border-[#E9D5FF] text-center shadow-2xs">
          <div className="text-[1.8rem] font-extrabold font-mono text-[#7E22CE] leading-none">
            {metCount}/{criteria.length}
          </div>
          <div className="text-[10px] font-mono uppercase text-[#6B5845] mt-0.5">
            Criteria Met
          </div>
        </div>
      </div>

      {/* ── Criteria Checklist ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {criteria.map((c) => (
          <div
            key={c.id}
            className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
              c.met
                ? 'bg-white border-[#E9D5FF] text-[#1D2522]'
                : 'bg-[#FFFDF9] border-[#F5A623]/40 text-[#6B5845]'
            }`}
          >
            <div
              className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                c.met
                  ? 'bg-[#15803D] text-white'
                  : 'border-2 border-[#B45309] bg-white text-[#B45309]'
              }`}
            >
              {c.met ? <Check className="h-3 w-3 stroke-[3]" /> : <Circle className="h-2 w-2 fill-[#B45309]" />}
            </div>

            <div className="space-y-0.5 min-w-0">
              <span className={`text-[13px] font-bold block ${c.met ? 'text-[#1D2522]' : 'text-[#B45309]'}`}>
                {c.criterion}
              </span>
              <p className="text-[11.5px] text-[#6B5845] leading-tight">
                {c.note}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Actions ── */}
      <div className="pt-2 border-t border-[#7E22CE]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {initiated ? (
          <div className="flex items-center gap-2 text-[#15803D] font-bold text-[13.5px]">
            <CheckCircle2 className="h-5 w-5" />
            <span>Project Charter Request Drafted! District Innovation Reviewer Assigned.</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => setInitiated(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7E22CE] hover:bg-[#6B21A8] text-white text-[13.5px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <Rocket className="h-4 w-4 text-[#F5A623]" />
              <span>Start Project Formation →</span>
            </button>

            <button
              type="button"
              onClick={() => setShowNeededInfo(!showNeededInfo)}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-[#E9D5FF] bg-white hover:bg-[#FAF9F5] text-[#7E22CE] text-[13px] font-bold transition-colors cursor-pointer"
            >
              <Info className="h-4 w-4" />
              <span>{showNeededInfo ? 'Hide Criteria Guide' : 'What is still needed?'}</span>
            </button>
          </div>
        )}

        <span className="text-[12px] font-mono text-[#6B5845]">
          Transition requirement: Minimum 4 of 5 criteria met
        </span>
      </div>

      {/* Explanatory Dropdown Guide */}
      {showNeededInfo && (
        <div className="p-4 rounded-2xl bg-white border border-[#E9D5FF] text-[12.5px] text-[#6B5845] leading-relaxed space-y-2 animate-in fade-in-50">
          <h5 className="font-bold text-[#1D2522]">
            Why does JharSankalp distinguish Ideas from Projects?
          </h5>
          <p>
            An <strong>Idea</strong> is an open-ended technical hypothesis or grassroots proposed solution. A <strong>Project</strong> is a funded, formal execution initiative with a committed consortium, timeline, and district pilot site.
          </p>
          <p>
            To formalize this idea, you need one institutional faculty endorsement (e.g. from Birsa Agricultural University, BIT Sindri, or NIT Jamshedpur) to act as technical auditor.
          </p>
        </div>
      )}
    </section>
  );
}
