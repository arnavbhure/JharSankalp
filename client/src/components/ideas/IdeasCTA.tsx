import { useNavigate } from 'react-router-dom';
import { ArrowRight, Compass, Plus, Sparkles } from 'lucide-react';

interface IdeasCTAProps {
  onShareIdea: () => void;
}

export function IdeasCTA({ onShareIdea }: IdeasCTAProps) {
  const navigate = useNavigate();

  return (
    <section className="bg-[#123B2A] text-white py-16 sm:py-20 relative overflow-hidden text-left">
      {/* Background Geodetic Grid Accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#F5A623] font-bold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>COMMUNITY PROPOSALS WELCOME</span>
          </div>

          <h2 className="text-[2.2rem] sm:text-[2.8rem] lg:text-[3.2rem] font-extrabold tracking-tight leading-tight font-sans text-white">
            You don&apos;t need permission <br />
            to contribute an idea.
          </h2>

          <p className="text-[15.5px] sm:text-[17px] text-white/80 leading-relaxed max-w-2xl font-normal">
            If you see a better way to solve a problem, share it. JharSankalp pairs emerging hypotheses with university labs, industrial fabricators, and district pilot programs.
          </p>

          <div className="flex items-center gap-4 flex-wrap pt-2">
            <button
              type="button"
              onClick={onShareIdea}
              className="inline-flex items-center gap-2.5 rounded-lg bg-white hover:bg-[#F8F6F1] text-[#123B2A] px-7 py-3.5 text-[15px] font-bold shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <Plus className="h-4 w-4 text-[#F5A623] stroke-[3]" />
              <span>Share Your Idea</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/challenges')}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-transparent hover:bg-white/10 text-white px-6 py-3.5 text-[15px] font-bold transition-all active:scale-[0.98] cursor-pointer"
            >
              <Compass className="h-4 w-4 text-[#F5A623]" />
              <span>Explore Open Challenges</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
