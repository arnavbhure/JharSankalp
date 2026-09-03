import { Cpu, ArrowRight } from 'lucide-react';

interface ApproachFormProps {
  problemGap: string;
  proposedApproach: string;
  expectedOutcome: string;
  onChange: (updates: {
    problemGap?: string;
    proposedApproach?: string;
    expectedOutcome?: string;
  }) => void;
  errors?: Record<string, string>;
}

export function ApproachForm({
  problemGap,
  proposedApproach,
  expectedOutcome,
  onChange,
  errors = {},
}: ApproachFormProps) {
  return (
    <div className="space-y-6 text-left">
      {/* ── Step Intro ── */}
      <div className="space-y-1.5 border-b border-[#EEEAE1] pb-4">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <Cpu className="h-4 w-4 text-[#F5A623]" />
          <span>STEP 03 · OPERATIONAL MECHANISM</span>
        </div>
        <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          How do you imagine this working?
        </h2>
        <p className="text-[14.5px] text-[#6B5845] leading-relaxed max-w-2xl">
          Help potential collaborators understand the path from idea to practical solution on the ground.
        </p>
      </div>

      <div className="space-y-5">
        {/* Field 1: Current Problem Gap */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            Current Problem Gap
          </label>
          <textarea
            rows={3}
            value={problemGap}
            onChange={(e) => onChange({ problemGap: e.target.value })}
            placeholder="e.g. Pump failures are often detected only after communities report water disruption weeks later..."
            className="w-full p-3.5 rounded-xl border border-[#EEEAE1] bg-white text-[13.5px] text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] leading-relaxed transition-all"
          />
        </div>

        {/* Field 2: Proposed Approach */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            Proposed Approach *
          </label>
          <textarea
            rows={4}
            required
            value={proposedApproach}
            onChange={(e) => onChange({ proposedApproach: e.target.value })}
            placeholder="e.g. Install low-cost acoustic activity sensors that automatically detect unusual pump vibrations and relay alerts over LoRa mesh..."
            className={`w-full p-3.5 rounded-xl border bg-white text-[13.5px] text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] leading-relaxed transition-all ${
              errors.proposedApproach ? 'border-[#BE123C]' : 'border-[#EEEAE1]'
            }`}
          />
          {errors.proposedApproach && (
            <p className="text-[11.5px] text-[#BE123C] font-mono">{errors.proposedApproach}</p>
          )}
        </div>

        {/* Field 3: Expected Outcome */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            Expected Outcome *
          </label>
          <textarea
            rows={3}
            required
            value={expectedOutcome}
            onChange={(e) => onChange({ expectedOutcome: e.target.value })}
            placeholder="e.g. Reduce pump downtime from 18 days to under 48 hours and allow local maintenance teams to respond proactively..."
            className={`w-full p-3.5 rounded-xl border bg-white text-[13.5px] text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] leading-relaxed transition-all ${
              errors.expectedOutcome ? 'border-[#BE123C]' : 'border-[#EEEAE1]'
            }`}
          />
          {errors.expectedOutcome && (
            <p className="text-[11.5px] text-[#BE123C] font-mono">{errors.expectedOutcome}</p>
          )}
        </div>

        {/* ── Dynamic Pipeline Flow Preview ── */}
        <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-3">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
            GENERATED SOLUTION TRAJECTORY
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center text-left">
            <div className="p-3 rounded-xl bg-white border border-[#EEEAE1] space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-[#BE123C]">
                01 Problem Gap
              </span>
              <p className="text-[12px] text-[#1D2522] line-clamp-2">
                {problemGap || 'Pump failure detected late'}
              </p>
            </div>

            <div className="relative">
              <div className="hidden sm:block absolute -left-2 top-1/2 -translate-y-1/2 text-[#6B5845]/40">
                <ArrowRight className="h-4 w-4" />
              </div>
              <div className="p-3 rounded-xl bg-white border-2 border-[#123B2A] space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-[#123B2A]">
                  02 Proposed Approach
                </span>
                <p className="text-[12px] text-[#1D2522] line-clamp-2">
                  {proposedApproach || 'Install non-intrusive smart sensors'}
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="hidden sm:block absolute -left-2 top-1/2 -translate-y-1/2 text-[#6B5845]/40">
                <ArrowRight className="h-4 w-4" />
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#EEEAE1] space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-[#15803D]">
                  03 Expected Outcome
                </span>
                <p className="text-[12px] text-[#1D2522] line-clamp-2">
                  {expectedOutcome || 'Reduce repair delays to <48h'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
