import { WorkspaceData, ImpactIndicator } from '../../../types/workspace';
import { Target, ShieldCheck } from 'lucide-react';

interface ImpactWorkspaceTabProps {
  data: WorkspaceData;
  onRefresh: () => void;
}

export function ImpactWorkspaceTab({ data }: ImpactWorkspaceTabProps) {
  const { impactIndicators } = data;

  return (
    <div className="space-y-6 text-left">
      {/* Header Banner */}
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-2">
        <div className="flex items-center gap-2 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <Target className="h-3.5 w-3.5 text-[#F5A623]" />
          <span>SOCIETAL VALUE AUDIT</span>
        </div>
        <h2 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Impact Measurement & Ground Evidence
        </h2>
        <p className="text-[13.5px] text-[#6B5845] max-w-2xl leading-relaxed">
          Tracking validated real-world transformation. Unlike standard task trackers, JharSankalp
          audits whether deployed technologies produce lasting societal benefits.
        </p>
      </div>

      {/* ── 4-Tier Impact Hierarchy Pipeline ── */}
      <div className="rounded-3xl border border-[#EEEAE1] bg-[#FAF9F5] p-6 sm:p-8 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            THE RIGOROUS FOUR-STAGE VALUE HIERARCHY
          </span>
          <span className="text-[11px] font-mono text-[#15803D] font-bold">
            Audited Progression
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Tier 1: Activities */}
          <div className="p-4 rounded-2xl bg-white border border-[#EEEAE1] space-y-2 text-left">
            <span className="text-[10px] font-mono font-bold uppercase text-[#6B5845] bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#EEEAE1]">
              01 ACTIVITIES (ACTIONS)
            </span>
            <p className="text-[13px] font-bold text-[#1D2522] leading-snug">
              20 pilot water points selected across 8 panchayats.
            </p>
            <span className="text-[11px] text-[#6B5845] block">
              What the team is actively performing in the field.
            </span>
          </div>

          {/* Tier 2: Outputs */}
          <div className="p-4 rounded-2xl bg-white border border-[#EEEAE1] space-y-2 text-left">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0284C7] bg-[#F0F9FF] px-2 py-0.5 rounded border border-[#BAE6FD]">
              02 OUTPUTS (PRODUCED)
            </span>
            <p className="text-[13px] font-bold text-[#1D2522] leading-snug">
              14 monitoring sensor units assembled & deployed.
            </p>
            <span className="text-[11px] text-[#6B5845] block">
              Physical artifacts, codebases, and hardware installed.
            </span>
          </div>

          {/* Tier 3: Outcomes */}
          <div className="p-4 rounded-2xl bg-white border border-[#BBF7D0] space-y-2 text-left">
            <span className="text-[10px] font-mono font-bold uppercase text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#BBF7D0]">
              03 OUTCOMES (CHANGES)
            </span>
            <p className="text-[13px] font-bold text-[#1D2522] leading-snug">
              Pump downtime reduced from 12 days to 6.5 days.
            </p>
            <span className="text-[11px] text-[#6B5845] block">
              Direct operational and procedural improvements.
            </span>
          </div>

          {/* Tier 4: Impact */}
          <div className="p-4 rounded-2xl bg-[#FFFDF9] border-2 border-[#123B2A] space-y-2 text-left shadow-xs">
            <span className="text-[10px] font-mono font-bold uppercase text-[#123B2A] bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#EEEAE1]">
              04 IMPACT (VALUE)
            </span>
            <p className="text-[13px] font-bold text-[#123B2A] leading-snug">
              2,000+ residents experience continuous water access.
            </p>
            <span className="text-[11px] text-[#6B5845] block">
              Long-term societal health, economic, and civic gains.
            </span>
          </div>
        </div>
      </div>

      {/* ── Impact Indicators with Evidence ── */}
      <div className="space-y-4">
        {impactIndicators.map((indicator: ImpactIndicator) => (
          <div
            key={indicator.id}
            className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-5 text-left"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EEEAE1] pb-4">
              <div className="space-y-0.5">
                <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                  AUDITED INDICATOR
                </span>
                <h3 className="text-[1.35rem] font-bold text-[#1D2522] font-sans">
                  {indicator.title}
                </h3>
              </div>

              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#15803D] bg-[#F0FDF4] px-3 py-1 rounded-xl border border-[#BBF7D0]">
                <ShieldCheck className="h-4 w-4 text-[#15803D]" />
                <span>Verified Measurement</span>
              </span>
            </div>

            {/* Baseline → Current → Target Trajectory */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-[#FFF5F5] border border-[#FECDD3] space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-[#BE123C] block">
                  BASELINE (PRE-INTERVENTION)
                </span>
                <div className="text-[1.6rem] font-extrabold font-mono text-[#BE123C]">
                  {indicator.baseline}
                </div>
                <span className="text-[11px] text-[#6B5845]">Historical village average</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFFDF9] border-2 border-[#123B2A] space-y-1 shadow-xs">
                <span className="text-[10px] font-mono font-bold uppercase text-[#123B2A] block">
                  CURRENT (PILOT STREAM)
                </span>
                <div className="text-[1.6rem] font-extrabold font-mono text-[#123B2A]">
                  {indicator.current}
                </div>
                <span className="text-[11px] text-[#15803D] font-semibold">
                  45.8% turnaround improvement
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-[#15803D] block">
                  TARGET (GOAL STATE)
                </span>
                <div className="text-[1.6rem] font-extrabold font-mono text-[#15803D]">
                  {indicator.target}
                </div>
                <span className="text-[11px] text-[#6B5845]">Contractual consortium target</span>
              </div>
            </div>

            {/* Supporting Evidence Records */}
            <div className="space-y-2.5 pt-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A] block">
                AUDITED EVIDENCE RECORDS ({indicator.evidence.length})
              </span>

              <div className="space-y-2">
                {indicator.evidence.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left text-[12.5px]"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-[#1D2522]">{ev.source}</div>
                      <p className="text-[#6B5845] text-[12px]">{ev.notes}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 font-mono text-[11px] text-[#6B5845]">
                      <span>{ev.collectedBy}</span>
                      <span>·</span>
                      <span>{ev.date}</span>
                      <span className="text-[#15803D] font-bold bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#BBF7D0]">
                        ✓ {ev.verificationStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
