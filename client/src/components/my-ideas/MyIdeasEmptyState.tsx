import { useNavigate } from 'react-router-dom';
import { Lightbulb, Plus, Compass } from 'lucide-react';

export function MyIdeasEmptyState() {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-[#EEEAE1] bg-white p-12 text-center space-y-6 shadow-2xs text-left max-w-xl mx-auto my-12">
      <div className="h-16 w-16 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] flex items-center justify-center text-[#123B2A] mx-auto shadow-2xs">
        <Lightbulb className="h-8 w-8 text-[#F5A623]" />
      </div>

      <div className="space-y-2 text-center">
        <h3 className="text-[1.5rem] font-extrabold text-[#1D2522] font-sans">
          You haven&apos;t shared an idea yet.
        </h3>
        <p className="text-[14px] text-[#6B5845] leading-relaxed max-w-md mx-auto">
          An idea doesn&apos;t need to be complete before it enters the right conversation. Propose
          an engineering hypothesis or community approach for any societal challenge in Jharkhand.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate('/submit-idea')}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[14px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <Plus className="h-4 w-4 text-[#F5A623] stroke-[3]" />
          <span>Submit an Idea</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/ideas')}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[#1D2522] text-[14px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <Compass className="h-4 w-4 text-[#6B5845]" />
          <span>Explore Existing Ideas</span>
        </button>
      </div>
    </div>
  );
}
