import { PipelineStage } from '../../types/government';
import { GitCommit, Sparkles } from 'lucide-react';

interface ChallengePipelineFunnelProps {
  stages: PipelineStage[];
}

export function ChallengePipelineFunnel({ stages }: ChallengePipelineFunnelProps) {
  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-xs text-left space-y-6">
      <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#4C1E4F]">
            <GitCommit className="h-4 w-4 text-[#FA7E61]" />
            <span>VALUE ACCELERATION FUNNEL</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Challenge-to-Impact Pipeline
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl">
            How raw citizen problems transition through validation, academic matching, project
            formation, and verified impact.
          </p>
        </div>

        <span className="text-[11px] font-mono text-[#6B5845] bg-[#FAF9F5] px-3 py-1 rounded-full border border-[#EEEAE1]">
          CONVERSION TELEMETRY
        </span>
      </div>

      {/* ── Visual Step Progression Flow ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-2">
        {stages.map((stage, idx) => {
          return (
            <div
              key={stage.stage}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-3 transition-all ${
                stage.highlight
                  ? 'border-2 border-[#4C1E4F] bg-[#FAF9F5] shadow-xs'
                  : 'border-[#EEEAE1] bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#F8F6F1] text-[#6B5845]">
                  0{idx + 1}
                </span>

                {stage.highlight && <Sparkles className="h-3.5 w-3.5 text-[#FA7E61]" />}
              </div>

              <div className="space-y-1">
                <div
                  className={`text-[2rem] font-extrabold font-mono tracking-tight leading-none ${
                    stage.highlight ? 'text-[#4C1E4F]' : 'text-[#1D2522]'
                  }`}
                >
                  {stage.count.toLocaleString()}
                </div>

                <div className="text-[12px] font-extrabold font-sans uppercase tracking-wider text-[#1D2522] leading-snug">
                  {stage.stage}
                </div>
              </div>

              <div className="pt-2 border-t border-[#EEEAE1] space-y-1">
                <p className="text-[11px] text-[#6B5845] leading-tight">{stage.description}</p>

                {stage.dropoffRate && (
                  <span className="text-[9.5px] font-mono text-[#FA7E61] block pt-0.5">
                    {stage.dropoffRate}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
