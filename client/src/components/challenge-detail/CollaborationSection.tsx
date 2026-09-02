import { GraduationCap, Briefcase, Users } from 'lucide-react';
import { ChallengeDetailData } from '../../types/challengeDetail';

interface CollaborationSectionProps {
  challenge: ChallengeDetailData;
  onJoinCollaboration: () => void;
}

export function CollaborationSection({ challenge, onJoinCollaboration }: CollaborationSectionProps) {
  return (
    <section id="active-collaboration" className="py-12 sm:py-16 border-b border-[#EEEAE1] text-left">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#123B2A] font-bold">
            <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
            MULTI-SECTOR CONSORTIUM ROSTER
          </div>
          <h2 className="text-[1.85rem] sm:text-[2.25rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            People and institutions working on this challenge
          </h2>
          <p className="text-[14px] text-[#6B5845] max-w-xl">
            A collaborative coalition of academic researchers, industrial telemetry specialists, and grassroots citizen observers.
          </p>
        </div>

        <button
          onClick={onJoinCollaboration}
          className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-[#123B2A] bg-white hover:bg-[#F8F6F1] text-[#123B2A] px-5 py-2.5 text-[13.5px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <Users className="h-4 w-4 text-[#123B2A]" />
          <span>Join Working Group</span>
        </button>
      </div>

      {/* 3 Stakeholder Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenge.stakeholders.map((group) => {
          return (
            <div
              key={group.categoryName}
              className="rounded-2xl border border-[#EEEAE1] bg-white p-6 shadow-2xs flex flex-col justify-between space-y-4 text-left"
            >
              <div className="space-y-4">
                {/* Group Header */}
                <div className="border-b border-[#EEEAE1] pb-3 space-y-1">
                  <div className="flex items-center gap-2">
                    {group.categoryName.includes('Universities') ? (
                      <GraduationCap className="h-4 w-4 text-[#123B2A]" />
                    ) : group.categoryName.includes('Industry') ? (
                      <Briefcase className="h-4 w-4 text-[#6B5845]" />
                    ) : (
                      <Users className="h-4 w-4 text-[#F5A623]" />
                    )}
                    <h3 className="text-[14px] font-mono font-extrabold uppercase tracking-wider text-[#123B2A]">
                      {group.categoryName}
                    </h3>
                  </div>
                  <p className="text-[12px] text-[#6B5845] leading-relaxed">
                    {group.description}
                  </p>
                </div>

                {/* Partner Cards */}
                <div className="space-y-3">
                  {group.partners.map((partner) => (
                    <div
                      key={partner.name}
                      className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-[14px] font-bold text-[#1D2522] leading-tight">
                          {partner.name}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-[#EEEAE1] text-[#6B5845]">
                          {partner.organizationType}
                        </span>
                      </div>

                      <div className="text-[12px] font-medium text-[#123B2A]">
                        {partner.role}
                      </div>

                      <p className="text-[12px] text-[#1D2522]/80 leading-relaxed pt-0.5">
                        {partner.contributionArea}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[11px] font-mono text-[#6B5845]/70">
                Participation registered through JharSankalp Consortium MoU
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
