import { ChallengeDetailData } from '../../types/challengeDetail';

interface ImpactAtAGlanceProps {
  challenge: ChallengeDetailData;
}

export function ImpactAtAGlance({ challenge }: ImpactAtAGlanceProps) {
  return (
    <section
      id="human-impact"
      className="relative overflow-hidden bg-[#123B2A] text-white py-14 sm:py-18 border-y border-[#1F5A3D] text-left"
    >
      {/* Background Topographic Matrix */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] pattern-topography"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <div className="border-b border-white/15 pb-4 mb-10">
          <div className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#F5A623] font-bold">
            <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
            HUMAN & INFRASTRUCTURAL VULNERABILITY
          </div>
          <h2 className="text-[1.85rem] sm:text-[2.35rem] font-extrabold text-white tracking-tight font-sans mt-1">
            The Human Impact
          </h2>
        </div>

        {/* 3 Visual Data Elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-white/15">
          {/* Metric 1 */}
          <div className="space-y-2 border-l-2 border-[#F5A623] pl-5">
            <div className="text-[2.75rem] sm:text-[3.25rem] font-extrabold font-mono text-white leading-none">
              {challenge.impactMetrics.affectedResidents}
            </div>
            <div className="text-[15px] font-bold text-white/95">
              Residents Potentially Affected
            </div>
            <p className="text-[13px] text-white/70 leading-relaxed max-w-xs">
              Directly affected residents and households in {challenge.subLocation || challenge.district}.
            </p>
          </div>

          {/* Metric 2 */}
          <div className="space-y-2 border-l-2 border-white/40 pl-5">
            <div className="text-[2.75rem] sm:text-[3.25rem] font-extrabold font-mono text-[#F5A623] leading-none">
              {challenge.impactMetrics.highRiskLocations}
            </div>
            <div className="text-[15px] font-bold text-white/95">
              High-Risk Locations Identified
            </div>
            <p className="text-[13px] text-white/70 leading-relaxed max-w-xs">
              Identified priority sectors and community clusters in {challenge.district} requiring intervention.
            </p>
          </div>

          {/* Metric 3 */}
          <div className="space-y-2 border-l-2 border-white/40 pl-5">
            <div className="text-[2.75rem] sm:text-[3.25rem] font-extrabold font-mono text-white leading-none">
              {challenge.impactMetrics.communitiesInvolved}
            </div>
            <div className="text-[15px] font-bold text-white/95">Local Communities Involved</div>
            <p className="text-[13px] text-white/70 leading-relaxed max-w-xs">
              Local gram panchayats, citizen committees, and community observers participating in validation.
            </p>
          </div>
        </div>

        {/* Supporting Institutional Statement */}
        <div className="pt-8 max-w-3xl">
          <p className="text-[16px] sm:text-[17px] text-white/90 leading-relaxed italic">
            &ldquo;{challenge.impactMetrics.statement}&rdquo;
          </p>
          <div className="mt-3 text-[12px] font-mono text-[#F8F6F1]/60">
            {challenge.district} District Administration & Departmental Review Desk Consensus Note
          </div>
        </div>
      </div>
    </section>
  );
}
