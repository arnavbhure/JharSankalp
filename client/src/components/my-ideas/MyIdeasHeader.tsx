import { useNavigate } from 'react-router-dom';
import { Plus, Compass, Lightbulb } from 'lucide-react';

export function MyIdeasHeader() {
  const navigate = useNavigate();

  return (
    <header className="border-b border-[#EEEAE1] bg-white py-10 sm:py-12 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#123B2A] font-bold">
              <Lightbulb className="h-4 w-4 text-[#F5A623]" />
              <span>MY IDEAS · INNOVATOR WORKSPACE</span>
            </div>

            <h1 className="text-[2.2rem] sm:text-[2.8rem] font-extrabold text-[#1D2522] tracking-tight leading-tight font-sans">
              Ideas you&apos;ve put into motion.
            </h1>

            <p className="text-[15px] sm:text-[16.5px] text-[#6B5845] max-w-2xl leading-relaxed font-normal">
              Track your submissions, collaboration activity and the progress of ideas as they move toward real-world implementation across Jharkhand.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap shrink-0">
            <button
              type="button"
              onClick={() => navigate('/submit-idea')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[14px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <Plus className="h-4 w-4 text-[#F5A623] stroke-[3]" />
              <span>Submit a New Idea</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/ideas')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[#1D2522] text-[14px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <Compass className="h-4 w-4 text-[#6B5845]" />
              <span>Explore Ideas</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
