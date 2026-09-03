import { useState } from 'react';
import { RecommendedOpportunity } from '../../types/industry';
import { Sparkles, ArrowRight, MapPin, Check, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecommendedOpportunitiesSectionProps {
  opportunities: RecommendedOpportunity[];
}

export function RecommendedOpportunitiesSection({ opportunities }: RecommendedOpportunitiesSectionProps) {
  const [expressedIds, setExpressedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleExpressInterest = (opp: RecommendedOpportunity) => {
    setExpressedIds((prev) => [...prev, opp.id]);
    setFeedback(`Collaboration inquiry dispatched to lead research institution for ${opp.projectCode}!`);
    setTimeout(() => setFeedback(null), 3500);
  };

  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-xs text-left space-y-6">
      {/* Header */}
      <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <Sparkles className="h-4 w-4 text-[#F5A623]" />
            <span>COMMERCIALIZATION & PARTNER SOURCING</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Where Your Expertise Can Make a Difference
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl">
            Vetted societal innovation projects seeking industrial co-engineering, precision fabrication tooling, and field deployment resources.
          </p>
        </div>

        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF9F5] hover:bg-[#123B2A] text-[#123B2A] hover:text-white border border-[#B5A886]/40 text-[12.5px] font-bold transition-all shrink-0"
        >
          <span>Explore All Projects</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div className="p-3.5 rounded-xl bg-[#15803D] text-white flex items-center gap-2 text-[13px] font-mono animate-in fade-in duration-200">
          <Check className="h-4 w-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {opportunities.map((opp) => {
          const isExpressed = expressedIds.includes(opp.id);

          return (
            <div
              key={opp.id}
              className="p-5 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] hover:bg-white hover:border-[#123B2A] hover:shadow-xs transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-white border border-[#EEEAE1] text-[#4C1E4F]">
                    ● {opp.stageLabel}
                  </span>

                  <span className="text-[11px] font-mono text-[#6B5845]">
                    {opp.projectCode}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#6B5845]">
                    <span className="font-bold text-[#123B2A]">{opp.domain}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5">
                      <MapPin className="h-3 w-3 text-[#FA7E61]" />
                      {opp.location}
                    </span>
                  </div>

                  <h4 className="text-[15.5px] sm:text-[16.5px] font-bold text-[#1D2522] leading-snug">
                    {opp.title}
                  </h4>
                </div>

                {/* Specific Industry Need */}
                <div className="p-3 rounded-xl bg-white border border-[#EEEAE1] space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase text-[#B45309]">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>Project Need:</span>
                  </div>
                  <div className="text-[13px] font-bold text-[#1D2522]">
                    {opp.need}
                  </div>
                  <div className="text-[11.5px] text-[#6B5845]">
                    Required: {opp.requiredCapability}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#EEEAE1]">
                <Link
                  to={`/projects/${opp.projectId}`}
                  className="inline-flex items-center gap-1 text-[12.5px] font-bold text-[#123B2A] hover:text-[#FA7E61] transition-colors"
                >
                  <span>View Project</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                {isExpressed ? (
                  <span className="inline-flex items-center gap-1 text-[12px] font-mono font-bold text-[#15803D]">
                    <Check className="h-3.5 w-3.5" />
                    <span>Inquiry Sent</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleExpressInterest(opp)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#4C1E4F] hover:bg-[#3A143D] text-white text-[12px] font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    <span>Express Interest →</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
