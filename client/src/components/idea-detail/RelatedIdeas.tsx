import { useNavigate } from 'react-router-dom';
import { RelatedIdeaCard } from '../../types/ideaDetail';
import { Compass, ArrowRight, Users } from 'lucide-react';

interface RelatedIdeasProps {
  ideas: RelatedIdeaCard[];
}

export function RelatedIdeas({ ideas }: RelatedIdeasProps) {
  const navigate = useNavigate();

  return (
    <section className="space-y-6 text-left border-t border-[#EEEAE1] pt-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#EEEAE1] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <Compass className="h-4 w-4 text-[#F5A623]" />
            <span>SECTION 09 · ADJACENT INNOVATIONS</span>
          </div>

          <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Related approaches
          </h2>
        </div>

        <button
          type="button"
          onClick={() => navigate('/ideas')}
          className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[#123B2A] hover:underline cursor-pointer"
        >
          <span>Explore More Ideas</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {ideas.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              navigate(`/ideas/${item.id}`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-5 rounded-2xl border border-[#EEEAE1] bg-white hover:border-[#123B2A]/40 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#123B2A] font-bold uppercase">{item.category}</span>
                <span className="text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#BBF7D0]">
                  {item.stage}
                </span>
              </div>

              <h3 className="text-[1.15rem] font-bold text-[#1D2522] font-sans group-hover:text-[#123B2A] transition-colors leading-snug">
                {item.title}
              </h3>
            </div>

            <div className="pt-2 border-t border-[#EEEAE1] flex items-center justify-between text-[12px] text-[#6B5845]">
              <span className="flex items-center gap-1 font-medium">
                <Users className="h-3.5 w-3.5 text-[#123B2A]" />
                {item.contributorsCount} Contributors
              </span>

              <span className="font-bold text-[#123B2A] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>View</span>
                <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
