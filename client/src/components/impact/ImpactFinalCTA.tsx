import { useNavigate } from 'react-router-dom';
import { ArrowRight, Compass, PlusCircle } from 'lucide-react';

export function ImpactFinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="rounded-[32px] border border-[#EEEAE1] bg-white p-8 sm:p-12 lg:p-14 text-left shadow-2xs space-y-5 my-6">
      <div className="max-w-3xl space-y-4">
        <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A] bg-[#FAF9F5] px-3 py-1 rounded-full border border-[#EEEAE1] inline-block">
          JOIN THE ECOSYSTEM
        </span>

        <h2 className="text-[2rem] sm:text-[2.5rem] font-extrabold text-[#1D2522] tracking-tight leading-tight font-sans">
          Every meaningful change starts with a problem someone decided not to ignore.
        </h2>

        <p className="text-[15px] sm:text-[16.5px] text-[#6B5845] leading-relaxed max-w-2xl">
          Submit a challenge, contribute an idea, collaborate on a solution, or help bring innovation to the communities that need it.
        </p>

        <div className="flex items-center gap-3.5 flex-wrap pt-2">
          <button
            type="button"
            onClick={() => navigate('/report-challenge')}
            className="inline-flex items-center gap-2 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white px-6 py-3.5 text-[14px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
          >
            <PlusCircle className="h-4 w-4 text-[#F5A623]" />
            <span>Report a Challenge</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/challenges')}
            className="inline-flex items-center gap-2 rounded-xl border border-[#EEEAE1] bg-[#FAF9F5] hover:bg-white text-[#1D2522] px-5 py-3.5 text-[14px] font-bold transition-all active:scale-[0.98] cursor-pointer"
          >
            <Compass className="h-4 w-4 text-[#123B2A]" />
            <span>Explore Challenges</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
