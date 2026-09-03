import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInnovationStore } from '../../stores/innovationStore';
import {
  MapPin,
  Users,
  Clock,
  ArrowRight,
  PlusCircle,
  BookmarkCheck,
} from 'lucide-react';

interface CitizenChallengeItem {
  id: string;
  title: string;
  district: string;
  focusArea: string;
  category: 'joined' | 'saved' | 'submitted' | 'completed';
  status: 'Exploring' | 'Contributing' | 'In Review' | 'In Progress' | 'Completed';
  contributionStatus: string;
  collaboratorsCount: number;
  deadlineText: string;
  tagColor: string;
}

const MY_CHALLENGES: CitizenChallengeItem[] = [
  {
    id: 'JS-2026-00024',
    title: 'Frequent Breakdown of Drinking Water Handpumps in Murhu Block',
    district: 'Khunti',
    focusArea: 'Water Infrastructure',
    category: 'joined',
    status: 'Contributing',
    contributionStatus: 'Idea shortlisted for field pilot deployment',
    collaboratorsCount: 14,
    deadlineText: 'Sprint ends in 8 days',
    tagColor: 'text-[#0284C7] bg-[#F0F9FF] border-[#BAE6FD]',
  },
  {
    id: 'JS-2026-00019',
    title: 'Improving Post-Harvest Storage & Market Access for Lac Collectors',
    district: 'Latehar',
    focusArea: 'Forest Economy',
    category: 'joined',
    status: 'In Progress',
    contributionStatus: 'Participating in weekly technical design call',
    collaboratorsCount: 21,
    deadlineText: '12 days active',
    tagColor: 'text-[#15803D] bg-[#F0FDF4] border-[#BBF7D0]',
  },
  {
    id: 'JS-2024-00003',
    title: 'Early Detection of Ground Subsidence & Mine Inundation in Jharia',
    district: 'Dhanbad',
    focusArea: 'Mining Safety',
    category: 'saved',
    status: 'Exploring',
    contributionStatus: 'Saved to review research papers and open vacancies',
    collaboratorsCount: 19,
    deadlineText: 'Open for proposals',
    tagColor: 'text-[#B45309] bg-[#FFFBEB] border-[#FDE68A]',
  },
  {
    id: 'JS-2026-00031',
    title: 'Intermittent Solar Microgrid Failures in Remote Tribal Hamlets',
    district: 'Gumla',
    focusArea: 'Clean Energy',
    category: 'submitted',
    status: 'In Review',
    contributionStatus: 'Under preliminary district verification by BDO',
    collaboratorsCount: 6,
    deadlineText: 'Submitted 4 days ago',
    tagColor: 'text-[#7E22CE] bg-[#FAF5FF] border-[#E9D5FF]',
  },
  {
    id: 'JS-2025-00012',
    title: 'Fluoride Contamination Mitigation in Simdega Borewells',
    district: 'Simdega',
    focusArea: 'Public Health',
    category: 'completed',
    status: 'Completed',
    contributionStatus: 'Activated decentralized filtration units with Jal Samiti',
    collaboratorsCount: 32,
    deadlineText: 'Completed Oct 2025',
    tagColor: 'text-[#15803D] bg-[#F0FDF4] border-[#BBF7D0]',
  },
];

export function DashboardChallenges() {
  const navigate = useNavigate();
  const { joinedChallengeIds, savedChallengeIds } = useInnovationStore();
  const [activeTab, setActiveTab] = useState<'joined' | 'saved' | 'submitted' | 'completed'>('joined');

  // Dynamically compute list reflecting joined and saved IDs
  const allChallenges = useMemo(() => {
    return MY_CHALLENGES.map((ch) => {
      let isJoined = joinedChallengeIds.includes(ch.id);
      let isSaved = savedChallengeIds.includes(ch.id);

      // If category was joined originally or dynamically added to store
      if (isJoined && ch.category !== 'submitted' && ch.category !== 'completed') {
        return { ...ch, category: 'joined' as const, status: 'Contributing' as const };
      }
      if (isSaved && ch.category !== 'submitted' && ch.category !== 'completed') {
        return { ...ch, category: 'saved' as const };
      }
      return ch;
    });
  }, [joinedChallengeIds, savedChallengeIds]);

  const tabs: Array<{ id: 'joined' | 'saved' | 'submitted' | 'completed'; label: string; count: number }> = [
    { id: 'joined', label: 'Joined Challenges', count: allChallenges.filter((c) => c.category === 'joined').length },
    { id: 'saved', label: 'Saved', count: allChallenges.filter((c) => c.category === 'saved').length },
    { id: 'submitted', label: 'Submitted by Me', count: allChallenges.filter((c) => c.category === 'submitted').length },
    { id: 'completed', label: 'Completed', count: allChallenges.filter((c) => c.category === 'completed').length },
  ];

  const filteredChallenges = allChallenges.filter((c) => c.category === activeTab);

  const getStatusBadge = (status: CitizenChallengeItem['status']) => {
    switch (status) {
      case 'Contributing':
        return 'text-[#15803D] bg-[#F0FDF4] border-[#BBF7D0]';
      case 'In Progress':
        return 'text-[#0284C7] bg-[#F0F9FF] border-[#BAE6FD]';
      case 'In Review':
        return 'text-[#B45309] bg-[#FFFBEB] border-[#FDE68A]';
      case 'Completed':
        return 'text-[#123B2A] bg-[#FAF9F5] border-[#EEEAE1]';
      case 'Exploring':
      default:
        return 'text-[#6B5845] bg-[#FAF9F5] border-[#EEEAE1]';
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* ── Subheader Action Strip ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EEEAE1] pb-4">
        {/* Tabs Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-[12.5px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-[#123B2A] text-white shadow-xs'
                  : 'bg-white text-[#6B5845] border border-[#EEEAE1] hover:bg-[#FAF9F5]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-[#FAF9F5] text-[#6B5845]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* CTA: Report a Challenge */}
        <button
          type="button"
          onClick={() => navigate('/report-challenge')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[12.5px] font-bold shadow-xs transition-all active:scale-[0.98] shrink-0 cursor-pointer"
        >
          <PlusCircle className="h-4 w-4 text-[#F5A623]" />
          <span>Report a Challenge</span>
        </button>
      </div>

      {/* ── Challenge Cards Grid ── */}
      {filteredChallenges.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white border border-[#EEEAE1] p-8 space-y-3">
          <BookmarkCheck className="h-8 w-8 text-[#6B5845] mx-auto opacity-50" />
          <h3 className="text-[1.1rem] font-bold text-[#1D2522]">
            No challenges in this folder
          </h3>
          <p className="text-[13px] text-[#6B5845] max-w-sm mx-auto">
            Explore active public problem calls across Jharkhand to start contributing ideas or tracking initiatives.
          </p>
          <button
            type="button"
            onClick={() => navigate('/challenges')}
            className="px-4 py-2 rounded-xl bg-[#123B2A] text-white text-[12px] font-bold"
          >
            Explore Public Challenges →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredChallenges.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-[#EEEAE1] bg-white p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${item.tagColor}`}
                  >
                    {item.focusArea}
                  </span>
                  <span
                    className={`text-[10.5px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${getStatusBadge(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="text-[1.15rem] font-bold text-[#1D2522] leading-snug">
                  {item.title}
                </h3>

                <div className="flex items-center gap-3 text-[11.5px] font-mono text-[#6B5845]">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-[#BE123C]" />
                    {item.district}, Jharkhand
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-[#123B2A]" />
                    {item.collaboratorsCount} Team
                  </span>
                </div>

                {/* Progress / Contribution Status Note */}
                <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] text-[12px] text-[#1D2522] space-y-0.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#6B5845] block">
                    YOUR INVOLVEMENT
                  </span>
                  <p className="font-semibold">{item.contributionStatus}</p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-[#EEEAE1] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#6B5845] flex items-center gap-1">
                  <Clock className="h-3 w-3 text-[#F5A623]" />
                  {item.deadlineText}
                </span>

                <button
                  type="button"
                  onClick={() => navigate(`/challenges/${item.id}`)}
                  className="inline-flex items-center gap-1 text-[12px] font-bold text-[#123B2A] hover:underline cursor-pointer"
                >
                  <span>Open Case File</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
