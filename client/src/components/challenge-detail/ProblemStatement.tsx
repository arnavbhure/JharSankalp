import { Calendar, Building2, Layers, AlertCircle } from 'lucide-react';
import { ChallengeDetailData } from '../../types/challengeDetail';

interface ProblemStatementProps {
  challenge: ChallengeDetailData;
}

export function ProblemStatement({ challenge }: ProblemStatementProps) {
  return (
    <section id="the-problem" className="py-12 sm:py-16 border-b border-[#EEEAE1] text-left">
      {/* Section Eyebrow & Title */}
      <div className="space-y-1 mb-8">
        <div className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#123B2A] font-bold">
          <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
          PROBLEM ANALYSIS & CONTEXT
        </div>
        <h2 className="text-[1.85rem] sm:text-[2.25rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Understanding the challenge
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* ── LEFT: Detailed Problem Dossier (7 Cols) ── */}
        <div className="lg:col-span-7 space-y-8 max-w-2xl text-[15px] leading-relaxed text-[#1D2522]/90">
          {/* Background */}
          <div className="space-y-2">
            <h3 className="text-[1.15rem] font-extrabold text-[#123B2A] font-sans flex items-center gap-2">
              <span className="text-[#F5A623] font-mono">01.</span>
              <span>Geological & Historical Background</span>
            </h3>
            <p className="text-[#1D2522]/85 leading-relaxed">{challenge.problem.background}</p>
          </div>

          {/* Current Situation */}
          <div className="space-y-2">
            <h3 className="text-[1.15rem] font-extrabold text-[#123B2A] font-sans flex items-center gap-2">
              <span className="text-[#F5A623] font-mono">02.</span>
              <span>The Current Situation on the Ground</span>
            </h3>
            <p className="text-[#1D2522]/85 leading-relaxed">
              {challenge.problem.currentSituation}
            </p>
          </div>

          {/* Why Existing Approaches Are Not Enough */}
          <div className="space-y-2">
            <h3 className="text-[1.15rem] font-extrabold text-[#123B2A] font-sans flex items-center gap-2">
              <span className="text-[#F5A623] font-mono">03.</span>
              <span>Why Existing Approaches Are Not Enough</span>
            </h3>
            <p className="text-[#1D2522]/85 leading-relaxed">
              {challenge.problem.whyExistingApproachesNotEnough}
            </p>
          </div>

          {/* Callout box */}
          <div className="p-4 rounded-xl bg-[#FAF9F5] border-l-4 border-[#123B2A] text-[13.5px] text-[#6B5845] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#123B2A]">
              <AlertCircle className="h-4 w-4 text-[#F5A623]" />
              <span>Institutional Field Note</span>
            </div>
            <p>
              Data logged in JharSankalp case files reflects field-verified observations submitted
              by municipal ward committees and technical researchers.
            </p>
          </div>
        </div>

        {/* ── RIGHT: Contextual Challenge Profile Card (5 Cols) ── */}
        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-2xl border border-[#EEEAE1] bg-white p-6 sm:p-7 shadow-xs space-y-5">
            <div className="border-b border-[#EEEAE1] pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
                <Layers className="h-4 w-4 text-[#123B2A]" />
                <span>CHALLENGE PROFILE</span>
              </div>
              <span className="text-[11px] font-mono text-[#6B5845]">
                {challenge.profile.trackingId}
              </span>
            </div>

            {/* Profile Fields List */}
            <div className="space-y-3.5 text-[13.5px]">
              <div>
                <span className="text-[11px] font-mono uppercase text-[#6B5845] font-semibold block">
                  District
                </span>
                <span className="font-bold text-[#1D2522] text-[15px]">
                  {challenge.profile.district}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase text-[#6B5845] font-semibold block">
                  Focus Area
                </span>
                <span className="font-bold text-[#123B2A] text-[15px]">
                  {challenge.profile.focusArea}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase text-[#6B5845] font-semibold block">
                  Primary Stakeholders
                </span>
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {challenge.profile.primaryStakeholders.map((sh) => (
                    <span
                      key={sh}
                      className="px-2.5 py-0.5 rounded-md bg-[#F8F6F1] border border-[#EEEAE1] text-[12px] font-medium text-[#1D2522]"
                    >
                      {sh}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase text-[#6B5845] font-semibold block">
                  Submitted
                </span>
                <div className="flex items-center gap-1.5 text-[#1D2522] font-semibold mt-0.5">
                  <Calendar className="h-3.5 w-3.5 text-[#6B5845]" />
                  <span>{challenge.profile.dateSubmitted}</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase text-[#6B5845] font-semibold block">
                  Administering Department
                </span>
                <div className="flex items-center gap-1.5 text-[#6B5845] text-[12.5px] mt-0.5">
                  <Building2 className="h-3.5 w-3.5 text-[#123B2A] shrink-0" />
                  <span>{challenge.profile.adminDepartment}</span>
                </div>
              </div>
            </div>

            {/* Mini Geographic Locator Map */}
            <div className="pt-3 border-t border-[#EEEAE1]">
              <span className="text-[11px] font-mono uppercase text-[#6B5845] font-semibold block mb-2">
                Geographic District Context
              </span>
              <div className="relative aspect-[16/9] w-full rounded-xl border border-[#EEEAE1] bg-[#FAF9F5] overflow-hidden flex items-center justify-center p-3">
                {/* SVG Silhouette */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full stroke-[#123B2A] fill-[#EEEAE1]"
                >
                  <polygon
                    points="18,32 30,16 54,12 70,22 84,24 88,40 82,54 84,72 70,86 52,90 32,88 22,76 14,56 12,42"
                    strokeWidth="1.5"
                  />
                  {/* Dhanbad marker */}
                  <circle cx="74" cy="44" r="4.5" fill="#F5A623" stroke="#123B2A" strokeWidth="1" />
                  <text
                    x="74"
                    y="38"
                    fill="#123B2A"
                    fontSize="4.5"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    Dhanbad
                  </text>
                </svg>
                <div className="absolute bottom-2 left-2.5 text-[10px] font-mono text-[#6B5845]">
                  Jharia Coalfield Sector 4
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
