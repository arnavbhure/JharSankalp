import { useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { Footer } from '../../components/layout/Footer';

export function About() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#FAF9F5] text-[#1D2522] font-sans text-left min-h-screen flex flex-col justify-between">
      {/* ── Header ── */}
      <div>
        <section className="border-b border-[#EEEAE1] bg-white py-12 sm:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F5] border border-[#EEEAE1] text-[#123B2A] text-[11px] font-mono font-bold uppercase tracking-wider">
              <Compass className="h-3.5 w-3.5 text-[#F5A623]" />
              <span>MISSION & PRINCIPLES</span>
            </div>

            <h1 className="text-[2.2rem] sm:text-[3rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              About JharSankalp
            </h1>

            <p className="text-[15px] sm:text-[16px] text-[#6B5845] max-w-2xl leading-relaxed">
              A state-wide civic innovation operating system designed to channel the intellect of
              students, faculty researchers, startups, and community champions toward solving real
              challenges faced by Jharkhand’s 24 districts.
            </p>
          </div>
        </section>

        {/* ── Operating Philosophy ── */}
        <section className="py-12 sm:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-10">
            <div className="space-y-4">
              <h2 className="text-[1.8rem] font-bold text-[#1D2522]">Why JharSankalp Exists</h2>
              <p className="text-[14.5px] text-[#6B5845] leading-relaxed max-w-3xl">
                Too often, hackathon ideas and academic projects evaporate after final
                presentations, while grassroots communities continue to face chronic problems—broken
                handpumps, post-harvest crop loss, maternal clinic delays, and environmental mine
                subsidence.
              </p>
              <p className="text-[14.5px] text-[#6B5845] leading-relaxed max-w-3xl">
                JharSankalp establishes an institutional continuum that carries citizen-reported
                problems through rigorous hypothesis formulation, multi-stakeholder consortia,
                ground field pilots, and audited societal impact.
              </p>
            </div>

            {/* 3 Core Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-6 rounded-3xl bg-white border border-[#EEEAE1] shadow-2xs space-y-3">
                <div className="h-10 w-10 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] flex items-center justify-center font-bold">
                  01
                </div>
                <h3 className="text-[1.15rem] font-bold text-[#1D2522]">Real Problems First</h3>
                <p className="text-[13px] text-[#6B5845] leading-relaxed">
                  Solutions are only funded and built in response to validated challenges documented
                  with ground photographic and geographic evidence.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#EEEAE1] shadow-2xs space-y-3">
                <div className="h-10 w-10 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-[#B45309] flex items-center justify-center font-bold">
                  02
                </div>
                <h3 className="text-[1.15rem] font-bold text-[#1D2522]">Institutional Backing</h3>
                <p className="text-[13px] text-[#6B5845] leading-relaxed">
                  We bridge university R&D departments with District Collectorate offices to
                  guarantee field testbeds and regulatory clearance.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#EEEAE1] shadow-2xs space-y-3">
                <div className="h-10 w-10 rounded-2xl bg-[#FAF5FF] border border-[#E9D5FF] text-[#7E22CE] flex items-center justify-center font-bold">
                  03
                </div>
                <h3 className="text-[1.15rem] font-bold text-[#1D2522]">Audited Societal Value</h3>
                <p className="text-[13px] text-[#6B5845] leading-relaxed">
                  Every project must measure outcome turnaround, mean time to repair, or economic
                  yield improvement—not just software delivery.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#123B2A] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <h3 className="text-[1.4rem] font-bold">Ready to contribute your expertise?</h3>
                <p className="text-[13.5px] text-[#F7F5F0]/80">
                  Join active challenges or submit an innovative hypothesis.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate('/challenges')}
                  className="px-5 py-2.5 rounded-xl bg-white text-[#123B2A] text-[13px] font-bold hover:bg-[#F8F6F1] transition-all cursor-pointer"
                >
                  Explore Challenges
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-5 py-2.5 rounded-xl bg-[#F5A623] text-[#123B2A] text-[13px] font-bold hover:bg-[#E5981A] transition-all cursor-pointer"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
