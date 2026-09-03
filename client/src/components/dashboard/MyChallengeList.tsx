import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserChallenge } from '../../types/citizenDashboard';
import { MyChallengeRow } from './MyChallengeRow';
import { Plus, Compass, Sparkles } from 'lucide-react';

interface MyChallengeListProps {
  challenges: UserChallenge[];
  onOpenResponseModal?: (challenge: UserChallenge) => void;
}

type TabType = 'All' | 'Active' | 'Under Review' | 'In Collaboration' | 'Completed';

export function MyChallengeList({ challenges, onOpenResponseModal }: MyChallengeListProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('All');

  const tabs: TabType[] = ['All', 'Active', 'Under Review', 'In Collaboration', 'Completed'];

  const filteredChallenges = challenges.filter((c) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Active') return c.status !== 'COMPLETED';
    if (activeTab === 'Under Review') return c.status === 'UNDER_REVIEW';
    if (activeTab === 'In Collaboration')
      return (
        c.status === 'IN_COLLABORATION' ||
        c.status === 'MATCHED' ||
        c.status === 'SOLUTION_IN_PROGRESS'
      );
    if (activeTab === 'Completed') return c.status === 'COMPLETED';
    return true;
  });

  return (
    <div className="space-y-6 text-left">
      {/* ── Header & Underline Tabs ── */}
      <div className="border-b border-[#EEEAE1] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-[1.75rem] sm:text-[2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Your Challenges
          </h2>
          <p className="text-[13.5px] text-[#6B5845] mt-0.5">
            Showing{' '}
            <strong className="text-[#1D2522] font-bold">{filteredChallenges.length}</strong> of{' '}
            {challenges.length} total submissions
          </p>
        </div>

        {/* Underline Tabs */}
        <div className="flex items-center gap-6 overflow-x-auto pb-px">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`text-[13.5px] font-bold pb-3 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-[#123B2A] text-[#123B2A]'
                    : 'border-transparent text-[#6B5845] hover:text-[#1D2522]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Challenge Rows or Empty State ── */}
      {filteredChallenges.length > 0 ? (
        <div className="space-y-4">
          {filteredChallenges.map((item) => (
            <MyChallengeRow
              key={item.id}
              challenge={item}
              onOpenResponseModal={onOpenResponseModal}
            />
          ))}
        </div>
      ) : (
        /* ── Empty State ── */
        <div className="rounded-2xl border border-[#EEEAE1] bg-white p-12 text-center space-y-5 shadow-2xs">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F8F6F1] text-[#123B2A] border border-[#EEEAE1] mx-auto shadow-2xs">
            <Sparkles className="h-8 w-8 text-[#F5A623]" />
          </div>

          <div className="space-y-1.5 max-w-md mx-auto">
            <h3 className="text-[1.35rem] font-extrabold text-[#1D2522] font-sans">
              You haven&apos;t reported a challenge yet in this view.
            </h3>
            <p className="text-[14px] text-[#6B5845] leading-relaxed">
              Every meaningful solution begins with someone identifying a problem. Your voice can
              mobilize researchers, innovators, and district authorities.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/report-challenge')}
              className="inline-flex items-center gap-2 rounded-lg bg-[#123B2A] hover:bg-[#0D2B1E] text-white px-5 py-3 text-[13.5px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <Plus className="h-4 w-4 text-[#F5A623] stroke-[3]" />
              <span>Report a Challenge</span>
            </button>

            <button
              onClick={() => navigate('/challenges')}
              className="inline-flex items-center gap-2 rounded-lg border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[#1D2522] px-5 py-3 text-[13.5px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <Compass className="h-4 w-4 text-[#6B5845]" />
              <span>Explore Existing Challenges</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
