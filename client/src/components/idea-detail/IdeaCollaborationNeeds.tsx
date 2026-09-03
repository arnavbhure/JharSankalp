import { CollaborationOpportunity } from '../../types/ideaDetail';
import { Sparkles, ArrowRight, Wrench, MapPin, Award, DollarSign } from 'lucide-react';

interface IdeaCollaborationNeedsProps {
  needs: CollaborationOpportunity[];
  onOfferSupport: (need?: CollaborationOpportunity) => void;
}

export function IdeaCollaborationNeeds({ needs, onOfferSupport }: IdeaCollaborationNeedsProps) {
  const getIcon = (cat: string) => {
    if (cat.includes('HARDWARE')) return <Wrench className="h-4 w-4 text-[#123B2A]" />;
    if (cat.includes('TESTING')) return <MapPin className="h-4 w-4 text-[#15803D]" />;
    if (cat.includes('MENTOR')) return <Award className="h-4 w-4 text-[#B45309]" />;
    return <DollarSign className="h-4 w-4 text-[#9333EA]" />;
  };

  return (
    <section id="collaboration" className="space-y-6 text-left">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <Sparkles className="h-4 w-4 text-[#F5A623]" />
          <span>SECTION 07 · CAPABILITY VACANCIES</span>
        </div>

        <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          What this idea needs next
        </h2>
        <p className="text-[14.5px] text-[#6B5845] leading-relaxed max-w-2xl">
          The idea has technical momentum, but moving toward a field pilot requires additional
          expertise and institutional partnerships.
        </p>
      </div>

      {/* ── Structured Needs Grid with Hierarchy ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {needs.map((need) => {
          const isHigh = need.priority === 'HIGH';

          return (
            <div
              key={need.id}
              className={`p-6 sm:p-7 rounded-3xl border transition-all duration-200 flex flex-col justify-between space-y-4 text-left shadow-2xs hover:shadow-xs ${
                isHigh
                  ? 'border-2 border-[#123B2A] bg-white'
                  : 'border-[#EEEAE1] bg-[#FAF9F5] hover:bg-white'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                    {getIcon(need.category)}
                    <span>{need.category}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isHigh && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FEF2F2] text-[#BE123C] border border-[#FECDD3] uppercase">
                        CRITICAL NEED
                      </span>
                    )}

                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                        need.status === 'OPEN'
                          ? 'bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]'
                          : 'bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]'
                      }`}
                    >
                      {need.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-[1.25rem] font-bold text-[#1D2522] leading-snug font-sans">
                  {need.title}
                </h3>

                <p className="text-[13.5px] text-[#6B5845] leading-relaxed">{need.description}</p>
              </div>

              {/* Offer Support Action Button */}
              <div className="pt-3 border-t border-[#EEEAE1] flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => onOfferSupport(need)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Offer Support</span>
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
