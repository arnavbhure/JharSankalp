import { ApproachTrio } from '../../types/ideaDetail';
import { Lightbulb, AlertOctagon, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProposedApproachProps {
  approach: ApproachTrio;
}

const FLOW_STEPS = [
  { label: 'Water Pump', sub: 'Village handpump infrastructure' },
  { label: 'Sensor Detection', sub: 'Acoustic vibration logger' },
  { label: 'Data Transmission', sub: 'Sub-GHz LoRa mesh' },
  { label: 'Maintenance Alert', sub: 'Automated dispatch SMS' },
  { label: 'Faster Repair', sub: 'Restored service in <48h' },
];

export function ProposedApproach({ approach }: ProposedApproachProps) {
  return (
    <section id="overview" className="space-y-6 text-left">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <Lightbulb className="h-4 w-4 text-[#F5A623]" />
          <span>SECTION 02 · HYPOTHESIS & MECHANISM</span>
        </div>

        <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          The proposed approach
        </h2>
      </div>

      {/* ── 3-Part Structured Analysis Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* 1. Problem */}
        <div className="p-6 rounded-3xl border border-[#EEEAE1] bg-white shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#BE123C]">
              <AlertOctagon className="h-4 w-4" />
              <span>THE GROUND BOTTLENECK</span>
            </div>
            <h3 className="text-[1.2rem] font-bold text-[#1D2522] leading-snug font-sans">
              Pump failures are detected too late.
            </h3>
            <p className="text-[13.5px] text-[#6B5845] leading-relaxed">
              {approach.problem}
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#BE123C] font-semibold">
            Status Quo: Manual Complaints
          </span>
        </div>

        {/* 2. Approach */}
        <div className="p-6 rounded-3xl border-2 border-[#123B2A] bg-white shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
              <Cpu className="h-4 w-4 text-[#F5A623]" />
              <span>THE TECHNICAL PROPOSAL</span>
            </div>
            <h3 className="text-[1.2rem] font-bold text-[#1D2522] leading-snug font-sans">
              Install non-intrusive smart sensors.
            </h3>
            <p className="text-[13.5px] text-[#6B5845] leading-relaxed">
              {approach.approach}
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#123B2A] font-semibold">
            Core Engine: Edge Harmonic Telemetry
          </span>
        </div>

        {/* 3. Expected Outcome */}
        <div className="p-6 rounded-3xl border border-[#EEEAE1] bg-white shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#15803D]">
              <CheckCircle2 className="h-4 w-4" />
              <span>PROJECTED CIVIC OUTCOME</span>
            </div>
            <h3 className="text-[1.2rem] font-bold text-[#1D2522] leading-snug font-sans">
              Proactive maintenance & faster repairs.
            </h3>
            <p className="text-[13.5px] text-[#6B5845] leading-relaxed">
              {approach.expectedOutcome}
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#15803D] font-semibold">
            Target: &lt; 48 Hour Restoration
          </span>
        </div>
      </div>

      {/* ── Editorial Visual Flow Diagram ── */}
      <div className="p-6 sm:p-7 rounded-3xl border border-[#EEEAE1] bg-[#FAF9F5] shadow-inner space-y-4">
        <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3 text-[11px] font-mono text-[#6B5845]">
          <span className="font-bold text-[#123B2A] uppercase tracking-wider">
            SOLUTION CONCEPT PIPELINE
          </span>
          <span>End-to-End Operational Flow</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
          {FLOW_STEPS.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
              <div className="flex items-center gap-2 w-full">
                <span className="h-6 w-6 rounded-full bg-[#123B2A] text-white text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                  0{idx + 1}
                </span>
                <span className="text-[13px] font-bold text-[#1D2522] truncate">
                  {step.label}
                </span>
                {idx < FLOW_STEPS.length - 1 && (
                  <ArrowRight className="hidden sm:block h-3.5 w-3.5 text-[#6B5845]/40 ml-auto shrink-0" />
                )}
              </div>
              <p className="text-[11px] text-[#6B5845] leading-tight">
                {step.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
