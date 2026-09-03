import { CollaborationPipelineStage } from '../../types/industry';
import { GitCommit, Sparkles } from 'lucide-react';

interface CollaborationPipelineSectionProps {
  pipeline: CollaborationPipelineStage[];
}

export function CollaborationPipelineSection({ pipeline }: CollaborationPipelineSectionProps) {
  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-xs text-left space-y-6">
      <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <GitCommit className="h-4 w-4 text-[#F5A623]" />
            <span>COMMERCIALIZATION FUNNEL</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Industry Collaboration Pipeline
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl">
            Tracking partnerships from initial challenge RFP discovery to formal consortium MOUs and
            field pilots.
          </p>
        </div>

        <span className="text-[11px] font-mono text-[#6B5845] bg-[#FAF9F5] px-3 py-1 rounded-full border border-[#EEEAE1]">
          STAGE TELEMETRY
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {pipeline.map((stage, idx) => (
          <div
            key={stage.stage}
            className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-3 transition-all ${
              stage.highlight
                ? 'border-2 border-[#123B2A] bg-[#FAF9F5] shadow-xs'
                : 'border-[#EEEAE1] bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#F8F6F1] text-[#6B5845]">
                0{idx + 1}
              </span>

              {stage.highlight && <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />}
            </div>

            <div className="space-y-1">
              <div
                className={`text-[2rem] font-extrabold font-mono tracking-tight leading-none ${
                  stage.highlight ? 'text-[#123B2A]' : 'text-[#1D2522]'
                }`}
              >
                {stage.count}
              </div>

              <div className="text-[12px] font-extrabold font-sans uppercase tracking-wider text-[#1D2522] leading-snug">
                {stage.label}
              </div>
            </div>

            <div className="pt-2 border-t border-[#EEEAE1]">
              <p className="text-[11px] text-[#6B5845] leading-tight">{stage.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
