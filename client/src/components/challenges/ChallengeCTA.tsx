import { ArrowRight, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ChallengeCTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#FAF9F5] py-16 sm:py-20 border-t border-[#EEEAE1] relative overflow-hidden text-left">
      {/* Background Topographic Matrix */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] pattern-topography"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="rounded-2xl border border-[#EEEAE1] bg-white p-8 sm:p-12 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Narrative */}
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-caption font-mono uppercase font-bold text-[#123B2A] tracking-wider">
              <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
              <span>Don&apos;t see the problem you&apos;re looking for?</span>
            </div>

            <h2 className="text-[1.85rem] sm:text-[2.25rem] font-extrabold text-[#1D2522] tracking-tight leading-tight font-sans">
              Your community may need your voice.
            </h2>

            <p className="text-[14.5px] sm:text-[15px] text-[#1D2522]/80 leading-relaxed">
              Share a challenge you&apos;ve observed and help connect the right people to solve it.
              Grassroots observations are reviewed by district authorities and matched with
              university labs.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={() => navigate('/report-challenge')}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#123B2A] hover:bg-[#0D2B1E] text-white px-6 py-3.5 text-[14.5px] font-bold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Share a Problem</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </button>

            <button
              onClick={() => navigate('/report-challenge')}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#6B5845]/30 bg-[#F8F6F1] hover:bg-white text-[#1D2522] px-6 py-3.5 text-[14.5px] font-bold transition-all active:scale-[0.98] shadow-2xs cursor-pointer"
            >
              <Send className="h-4 w-4 text-[#123B2A]" />
              <span>Submit a Challenge</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
