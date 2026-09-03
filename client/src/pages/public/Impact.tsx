import { useNavigate } from 'react-router-dom';
import { Target, ArrowRight } from 'lucide-react';

export function Impact() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#FAF9F5] text-[#1D2522] font-sans text-left">
      {/* ── Header ── */}
      <section className="border-b border-[#EEEAE1] bg-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-[11px] font-mono font-bold uppercase tracking-wider">
            <Target className="h-3.5 w-3.5" />
            <span>STATEWIDE EVIDENCE AUDIT</span>
          </div>

          <h1 className="text-[2.2rem] sm:text-[3rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Measurable Societal Impact
          </h1>

          <p className="text-[15px] sm:text-[16px] text-[#6B5845] max-w-2xl leading-relaxed">
            Unlike platforms that stop at task lists or funding promises, JharSankalp audits whether deployed innovations create measurable improvement in village lives.
          </p>

          {/* 4 Macro Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-6">
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1]">
              <span className="text-[10.5px] font-mono font-bold uppercase text-[#6B5845] block">
                DISTRICTS ENGAGED
              </span>
              <div className="text-[2rem] font-extrabold font-mono text-[#123B2A] mt-0.5">
                24 / 24
              </div>
              <span className="text-[11px] text-[#15803D] font-semibold">100% State Coverage</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1]">
              <span className="text-[10.5px] font-mono font-bold uppercase text-[#6B5845] block">
                CITIZENS BENEFITED
              </span>
              <div className="text-[2rem] font-extrabold font-mono text-[#123B2A] mt-0.5">
                42,000+
              </div>
              <span className="text-[11px] text-[#6B5845]">Verified Field Beneficiaries</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1]">
              <span className="text-[10.5px] font-mono font-bold uppercase text-[#6B5845] block">
                PUMP DOWNTIME REDUCTION
              </span>
              <div className="text-[2rem] font-extrabold font-mono text-[#15803D] mt-0.5">
                45.8%
              </div>
              <span className="text-[11px] text-[#15803D] font-semibold">12 Days → 6.5 Days</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1]">
              <span className="text-[10.5px] font-mono font-bold uppercase text-[#6B5845] block">
                UNIVERSITY PARTNERS
              </span>
              <div className="text-[2rem] font-extrabold font-mono text-[#123B2A] mt-0.5">
                14 Labs
              </div>
              <span className="text-[11px] text-[#6B5845]">Active R&D Teams</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4-Tier Hierarchy Section ── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
              THE METHODOLOGY
            </span>
            <h2 className="text-[1.8rem] sm:text-[2.2rem] font-bold text-[#1D2522]">
              The Four-Tier Impact Ladder
            </h2>
            <p className="text-[14px] text-[#6B5845] max-w-xl">
              Distinguishing effort from true transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-[#EEEAE1] space-y-2 shadow-2xs">
              <span className="text-[10px] font-mono font-bold uppercase text-[#6B5845] bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#EEEAE1]">
                01 ACTIVITIES
              </span>
              <h3 className="text-[15px] font-bold text-[#1D2522]">Actions Performed</h3>
              <p className="text-[13px] text-[#6B5845] leading-relaxed">
                Village surveys, sensor testing, focus group consultations, and academic lab assemblies.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-[#EEEAE1] space-y-2 shadow-2xs">
              <span className="text-[10px] font-mono font-bold uppercase text-[#0284C7] bg-[#F0F9FF] px-2 py-0.5 rounded border border-[#BAE6FD]">
                02 OUTPUTS
              </span>
              <h3 className="text-[15px] font-bold text-[#1D2522]">Artifacts Produced</h3>
              <p className="text-[13px] text-[#6B5845] leading-relaxed">
                20 telemetry collars deployed, 4 mobile apps created, 18,400 data packets synced to cloud.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-[#BBF7D0] space-y-2 shadow-2xs">
              <span className="text-[10px] font-mono font-bold uppercase text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#BBF7D0]">
                03 OUTCOMES
              </span>
              <h3 className="text-[15px] font-bold text-[#1D2522]">Operational Shifts</h3>
              <p className="text-[13px] text-[#6B5845] leading-relaxed">
                Dispatch repair van response reduced from 5 days to 2 days; mechanics arrive with correct spare parts.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-[#FFFDF9] border-2 border-[#123B2A] space-y-2 shadow-xs">
              <span className="text-[10px] font-mono font-bold uppercase text-[#123B2A] bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#EEEAE1]">
                04 IMPACT
              </span>
              <h3 className="text-[15px] font-bold text-[#123B2A]">Lasting Value</h3>
              <p className="text-[13px] text-[#123B2A] leading-relaxed">
                Continuous clean drinking water access for 2,000+ tribal families; reduction in water-borne illness.
              </p>
            </div>
          </div>

          <div className="pt-4 flex justify-start">
            <button
              type="button"
              onClick={() => navigate('/projects')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#123B2A] text-white text-[13px] font-bold hover:bg-[#0D2B1E] transition-all cursor-pointer shadow-xs"
            >
              <span>Explore Active Project Portfolio</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
