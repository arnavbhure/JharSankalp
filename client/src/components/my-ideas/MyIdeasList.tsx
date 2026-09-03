import { MyIdeaItem } from '../../types/myIdeas';
import { MyIdeaRow } from './MyIdeaRow';
import { Lightbulb } from 'lucide-react';

interface MyIdeasListProps {
  ideas: MyIdeaItem[];
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  'All',
  'Under Review',
  'Published',
  'Collaborating',
  'Project Formation',
  'Completed',
];

export function MyIdeasList({
  ideas,
  currentTab,
  onTabChange,
}: MyIdeasListProps) {
  return (
    <section className="space-y-6 text-left">
      <div className="border-b border-[#EEEAE1] pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-[1.85rem] sm:text-[2.1rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            All Your Ideas
          </h2>
          <p className="text-[13.5px] text-[#6B5845]">
            Manage technical proposals, review queues, and contributor squads
          </p>
        </div>

        <span className="text-[12.5px] font-mono text-[#6B5845]">
          Showing {ideas.length} Idea{ideas.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* ── Underline Filter Tabs ── */}
      <div className="flex items-center gap-2 border-b border-[#EEEAE1] overflow-x-auto pb-px scrollbar-none">
        {TABS.map((tab) => {
          const isActive = currentTab === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`pb-3 px-3 text-[13.5px] font-semibold transition-all relative whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'text-[#123B2A] font-bold'
                  : 'text-[#6B5845] hover:text-[#1D2522]'
              }`}
            >
              <span>{tab}</span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#123B2A] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Idea Rows List ── */}
      {ideas.length === 0 ? (
        <div className="rounded-3xl border border-[#EEEAE1] bg-white p-10 text-center space-y-2">
          <Lightbulb className="h-8 w-8 text-[#6B5845]/50 mx-auto" />
          <h4 className="text-[14.5px] font-bold text-[#1D2522]">
            No ideas under &ldquo;{currentTab}&rdquo;
          </h4>
          <p className="text-[13px] text-[#6B5845]">
            Try switching filter tabs or propose a new solution idea.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {ideas.map((idea) => (
            <MyIdeaRow key={idea.id} idea={idea} />
          ))}
        </div>
      )}
    </section>
  );
}
