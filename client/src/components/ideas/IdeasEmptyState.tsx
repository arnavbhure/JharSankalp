import { useNavigate } from 'react-router-dom';
import { Sparkles, Compass, Plus } from 'lucide-react';

interface IdeasEmptyStateProps {
  onShareIdea: () => void;
}

export function IdeasEmptyState({ onShareIdea }: IdeasEmptyStateProps) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-[#EEEAE1] bg-white p-12 text-center space-y-5 shadow-2xs">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F8F6F1] text-[#123B2A] border border-[#EEEAE1] mx-auto shadow-2xs">
        <Sparkles className="h-8 w-8 text-[#F5A623]" />
      </div>

      <div className="space-y-1.5 max-w-md mx-auto">
        <h3 className="text-[1.35rem] font-extrabold text-[#1D2522] font-sans">
          No ideas found yet.
        </h3>
        <p className="text-[14px] text-[#6B5845] leading-relaxed">
          This could be an opportunity to start the conversation. Propose the first research
          approach or technical hypothesis for this category.
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onShareIdea}
          className="inline-flex items-center gap-2 rounded-lg bg-[#123B2A] hover:bg-[#0D2B1E] text-white px-5 py-3 text-[13.5px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <Plus className="h-4 w-4 text-[#F5A623] stroke-[3]" />
          <span>Share an Idea</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/challenges')}
          className="inline-flex items-center gap-2 rounded-lg border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[#1D2522] px-5 py-3 text-[13.5px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <Compass className="h-4 w-4 text-[#6B5845]" />
          <span>Explore Challenges</span>
        </button>
      </div>
    </div>
  );
}
