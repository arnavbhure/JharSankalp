import { useState } from 'react';
import { RecommendedChallenge } from '../../types/university';
import { ArrowRight, Sparkles, MapPin, Check, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecommendedChallengesSectionProps {
  challenges: RecommendedChallenge[];
}

export function RecommendedChallengesSection({ challenges }: RecommendedChallengesSectionProps) {
  const [expressedIds, setExpressedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleExpressInterest = (challenge: RecommendedChallenge) => {
    setExpressedIds((prev) => [...prev, challenge.id]);
    setFeedback(`Interest registered! University Innovation Cell dispatched preliminary response for ${challenge.challengeCode}.`);
    setTimeout(() => setFeedback(null), 3500);
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'CRITICAL':
        return 'bg-[#FEF2F2] text-[#DC2626] border-[#FECDD3]';
      case 'HIGH':
        return 'bg-[#FEE1C7] text-[#FA7E61] border-[#FA7E61]/30';
      case 'MEDIUM':
      default:
        return 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]';
    }
  };

  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-xs text-left space-y-6">
      {/* Header */}
      <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#4C1E4F]">
            <Sparkles className="h-4 w-4 text-[#FA7E61]" />
            <span>AI CAPABILITY ROUTING</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Challenges Matching Your Capabilities
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl">
            Community-submitted problems automatically routed to your institution based on laboratory equipment, faculty patents, and student engineering strengths.
          </p>
        </div>

        <Link
          to="/challenges"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF9F5] hover:bg-[#4C1E4F] text-[#4C1E4F] hover:text-white border border-[#B5A886]/40 text-[12.5px] font-bold transition-all shrink-0"
        >
          <span>Explore All Challenges</span>
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
        {challenges.map((item) => {
          const isExpressed = expressedIds.includes(item.id);

          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] hover:bg-white hover:border-[#4C1E4F] hover:shadow-xs transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${getPriorityBadge(
                    item.priority
                  )}`}>
                    ● {item.priority}
                  </span>

                  <div className="inline-flex items-center gap-1.5 bg-[#4C1E4F] text-[#FFD8A8] px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold shadow-2xs">
                    <Zap className="h-3 w-3 text-[#FA7E61]" />
                    <span>Match Score: {item.matchScore}%</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#6B5845]">
                    <span className="font-bold text-[#4C1E4F]">{item.domain}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5">
                      <MapPin className="h-3 w-3 text-[#FA7E61]" />
                      {item.location}
                    </span>
                  </div>

                  <h4 className="text-[15px] sm:text-[16px] font-bold text-[#1D2522] leading-snug">
                    {item.title}
                  </h4>
                </div>

                {/* Relevant Expertise Tags */}
                <div className="pt-2 border-t border-[#EEEAE1] space-y-1.5">
                  <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] block">
                    Relevant Expertise Required:
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {item.relevantExpertise.map((exp) => (
                      <span
                        key={exp}
                        className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-[#EEEAE1] text-[#1D2522]"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#EEEAE1]">
                <Link
                  to={`/challenges/${item.id}`}
                  className="inline-flex items-center gap-1 text-[12.5px] font-bold text-[#4C1E4F] hover:text-[#FA7E61] transition-colors"
                >
                  <span>Review Challenge</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                {isExpressed ? (
                  <span className="inline-flex items-center gap-1 text-[12px] font-mono font-bold text-[#15803D]">
                    <Check className="h-3.5 w-3.5" />
                    <span>Interest Registered</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleExpressInterest(item)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[12px] font-bold transition-all cursor-pointer shadow-2xs"
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
