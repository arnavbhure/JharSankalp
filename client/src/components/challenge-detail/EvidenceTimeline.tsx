import { CheckCircle, FileText, Info } from 'lucide-react';
import { ChallengeDetailData } from '../../types/challengeDetail';

interface EvidenceTimelineProps {
  challenge: ChallengeDetailData;
}

export function EvidenceTimeline({ challenge }: EvidenceTimelineProps) {
  return (
    <section id="evidence-history" className="py-12 sm:py-16 border-b border-[#EEEAE1] text-left">
      <div className="space-y-1 mb-8">
        <div className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#123B2A] font-bold">
          <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
          GROUND OBSERVATIONS & AUDIT TRAIL
        </div>
        <h2 className="text-[1.85rem] sm:text-[2.25rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Evidence & Observations
        </h2>
        <p className="text-[14px] text-[#6B5845] max-w-xl">
          A documented chronological record of field reports, structural anomalies, and citizen filings leading up to consortium formation.
        </p>
      </div>

      {/* Structured Vertical Timeline */}
      <div className="relative border-l-2 border-[#123B2A]/25 pl-6 sm:pl-8 ml-3 sm:ml-4 space-y-8 max-w-3xl">
        {challenge.evidenceTimeline.map((item, index) => (
          <div key={item.docketId || index} className="relative group">
            {/* Timeline Node Ring */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#123B2A] text-white ring-4 ring-[#F8F6F1]">
              <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
            </div>

            {/* Evidence Card */}
            <div className="rounded-xl border border-[#EEEAE1] bg-white p-5 shadow-2xs space-y-2.5 transition-all group-hover:border-[#123B2A]/40 group-hover:shadow-xs">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#123B2A]/10 text-[#123B2A] text-[12px] font-mono font-bold">
                    {item.year}
                  </span>
                  <span className="text-[12.5px] font-medium text-[#6B5845]">
                    {item.dateStr}
                  </span>
                </div>

                {item.docketId && (
                  <span className="text-[11px] font-mono text-[#6B5845] bg-[#F8F6F1] px-2 py-0.5 rounded border border-[#EEEAE1]">
                    Ref: {item.docketId}
                  </span>
                )}
              </div>

              {/* Observation Content */}
              <p className="text-[14.5px] font-semibold text-[#1D2522] leading-snug">
                {item.observation}
              </p>

              {/* Source Attribution */}
              <div className="pt-2 border-t border-[#EEEAE1] flex items-center justify-between text-[12px] text-[#6B5845]">
                <span className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-[#123B2A]" />
                  <span>Source: {item.sourceType}</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[#15803D] font-medium">
                  <CheckCircle className="h-3 w-3" />
                  Verified
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Demo Data Transparency Note */}
      <div className="mt-8 flex items-center gap-2 text-[12px] font-mono text-[#6B5845]/70 bg-[#FAF9F5] p-3 rounded-lg border border-[#EEEAE1] max-w-3xl">
        <Info className="h-4 w-4 text-[#123B2A] shrink-0" />
        <span>Case docket numbers and observation timelines represent seeded demonstration data aligned with real Dhanbad mining safety research.</span>
      </div>
    </section>
  );
}
