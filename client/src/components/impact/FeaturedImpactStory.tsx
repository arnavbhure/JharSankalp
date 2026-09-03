import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, TrendingDown, Droplets } from 'lucide-react';

export function FeaturedImpactStory() {
  const navigate = useNavigate();

  return (
    <section id="featured-story" className="text-left space-y-6">
      <div className="space-y-1">
        <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#F5A623] bg-[#123B2A] px-3 py-1 rounded-full inline-block">
          FROM PROBLEM TO PROGRESS
        </span>
        <h2 className="text-[1.6rem] sm:text-[2rem] font-bold text-[#1D2522]">
          Reliable Water Access in Murhu Block
        </h2>
        <p className="text-[14px] text-[#6B5845] max-w-2xl leading-relaxed">
          How a community challenge logged in Khunti brought together researchers, engineers, and
          local women collectives to transform handpump maintenance.
        </p>
      </div>

      <div className="rounded-[32px] border border-[#EEEAE1] bg-white overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* ── Left Side: Story Details & Before/After (7 Cols) ── */}
          <div className="lg:col-span-7 p-6 sm:p-9 space-y-6">
            {/* Metadata Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F9FF] text-[#0284C7] text-[11px] font-mono font-bold border border-[#BAE6FD]">
                <Droplets className="h-3.5 w-3.5" />
                <span>Water Management</span>
              </span>

              <span className="flex items-center gap-1 text-[11.5px] font-mono text-[#6B5845]">
                <MapPin className="h-3.5 w-3.5 text-[#BE123C]" />
                <span>Murhu Block, Khunti District</span>
              </span>
            </div>

            {/* Problem & Solution Narrative */}
            <div className="space-y-4 text-[14px]">
              <div className="p-4 rounded-2xl bg-[#FFF5F5] border border-[#FECDD3] space-y-1">
                <span className="text-[10.5px] font-mono font-bold uppercase text-[#BE123C] block">
                  THE ORIGINAL CHALLENGE
                </span>
                <p className="text-[#1D2522] leading-relaxed">
                  Frequent pump failures left rural communities without reliable drinking water
                  access for several days, forcing women to walk miles to contaminated surface
                  nalas.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-1">
                <span className="text-[10.5px] font-mono font-bold uppercase text-[#15803D] block">
                  THE COLLABORATIVE SOLUTION
                </span>
                <p className="text-[#1D2522] leading-relaxed">
                  A low-cost IoT acoustic sensor collar mounted on Mark II pumps and an automated
                  dispatch SMS gateway developed through university researchers, local engineers,
                  and the Murhu Jal Sahiya Collective.
                </p>
              </div>
            </div>

            {/* ── Visual Before / After Comparison ── */}
            <div className="space-y-2">
              <span className="text-[10.5px] font-mono font-bold uppercase text-[#6B5845] block">
                MEASURED RESPONSE TIME IMPROVEMENT:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1">
                  <span className="text-[10.5px] font-mono text-[#6B5845] block">
                    Before JharSankalp Collaboration
                  </span>
                  <div className="text-[1.7rem] font-mono font-extrabold text-[#BE123C] leading-tight">
                    8 Days
                  </div>
                  <span className="text-[11px] text-[#6B5845]">Average Issue Resolution</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#123B2A] text-white border border-[#1E5A3A] space-y-1 shadow-2xs">
                  <span className="text-[10.5px] font-mono text-[#F5A623] block">
                    After Pilot Deployment
                  </span>
                  <div className="text-[1.7rem] font-mono font-extrabold text-[#F5A623] leading-tight flex items-center gap-2">
                    3 Days
                    <TrendingDown className="h-5 w-5 text-[#F5A623]" />
                  </div>
                  <span className="text-[11px] text-white/80">Average Issue Resolution</span>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
              <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1]">
                <strong className="text-[1.3rem] font-mono font-extrabold text-[#123B2A] block">
                  32%
                </strong>
                <span className="text-[10.5px] text-[#6B5845] leading-tight block">
                  Faster Issue Reporting
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1]">
                <strong className="text-[1.3rem] font-mono font-extrabold text-[#123B2A] block">
                  2,000+
                </strong>
                <span className="text-[10.5px] text-[#6B5845] leading-tight block">
                  Residents Covered
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1]">
                <strong className="text-[1.3rem] font-mono font-extrabold text-[#123B2A] block">
                  14
                </strong>
                <span className="text-[10.5px] text-[#6B5845] leading-tight block">
                  Participating Villages
                </span>
              </div>
            </div>

            {/* Full Chain Lineage Visual */}
            <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-[#123B2A] block">
                FULL INNOVATION CHAIN:
              </span>
              <div className="flex items-center gap-2 text-[11.5px] font-mono text-[#6B5845] flex-wrap">
                <span className="font-bold text-[#BE123C]">Challenge (Murhu)</span>
                <span>→</span>
                <span className="font-bold text-[#0284C7]">Idea (Acoustic IoT)</span>
                <span>→</span>
                <span className="font-bold text-[#B45309]">Collaboration (BIT Mesra)</span>
                <span>→</span>
                <span className="font-bold text-[#15803D]">Solution (Smart Collar)</span>
                <span>→</span>
                <span className="font-bold text-[#123B2A]">Impact (3 Days Fix)</span>
              </div>
            </div>
          </div>

          {/* ── Right Side: Photographic Field Asset (5 Cols) ── */}
          <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full">
            <img
              src="/rural_water_iot.jpg"
              alt="Community Water Intelligence Field Station in Khunti"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white text-left">
              <span className="text-[10.5px] font-mono font-bold uppercase text-[#F5A623]">
                FIELD TESTBED PHOTO
              </span>
              <h4 className="text-[1.2rem] font-bold text-white leading-tight">
                Murhu Block Water Station #04
              </h4>
              <p className="text-[12px] text-white/80 pt-1">
                Local Jal Sahiya representative and student telemetry researcher inspecting
                solar-assisted sensor retrofits.
              </p>
              <button
                type="button"
                onClick={() => navigate('/challenges/JS-2026-00024')}
                className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold text-[#F5A623] hover:underline cursor-pointer"
              >
                <span>View Full Challenge Case Dossier</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
