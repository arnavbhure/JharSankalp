import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInnovationStore } from '../../stores/innovationStore';
import { getUserChallenges } from '../../services/citizenDashboardApi';
import { fetchChallenges } from '../../services/api/challenges';
import { MapPin, Users, ArrowRight, PlusCircle, BookmarkCheck, Loader2 } from 'lucide-react';

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

export function DashboardChallenges() {
  const navigate = useNavigate();
  const { joinedChallengeIds, savedChallengeIds } = useInnovationStore();
  const [activeTab, setActiveTab] = useState<'joined' | 'saved' | 'submitted' | 'completed'>('joined');

  const [dbChallenges, setDbChallenges] = useState<CitizenChallengeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      getUserChallenges(),
      fetchChallenges(),
    ])
      .then(([userChs, publicChs]) => {
        if (!isMounted) return;

        const items: CitizenChallengeItem[] = [];

        // 1. User submitted challenges
        userChs.forEach((ch) => {
          let status: CitizenChallengeItem['status'] = 'In Review';
          if (ch.status === 'IN_COLLABORATION' || ch.status === 'SOLUTION_IN_PROGRESS' || ch.status === 'MATCHED') {
            status = 'In Progress';
          } else if (ch.status === 'COMPLETED') {
            status = 'Completed';
          }

          items.push({
            id: ch.id,
            title: ch.title,
            district: ch.district,
            focusArea: ch.category,
            category: ch.status === 'COMPLETED' ? 'completed' : 'submitted',
            status,
            contributionStatus: `Submitted by you on ${ch.submittedDate}`,
            collaboratorsCount: ch.collaboratorsCount,
            deadlineText: ch.statusLabel || 'In Progress',
            tagColor: 'text-[#15803D] bg-[#F0FDF4] border-[#BBF7D0]',
          });
        });

        // 2. Joined & Saved from public challenges
        publicChs.forEach((ch) => {
          const isJoined = joinedChallengeIds.includes(ch.id);
          const isSaved = savedChallengeIds.includes(ch.id);

          if (isJoined) {
            items.push({
              id: ch.id,
              title: ch.title,
              district: ch.district,
              focusArea: ch.category,
              category: 'joined',
              status: 'Contributing',
              contributionStatus: 'Active contributor squad member',
              collaboratorsCount: ch.collaboratorsCount,
              deadlineText: 'Active sprint',
              tagColor: 'text-[#0284C7] bg-[#F0F9FF] border-[#BAE6FD]',
            });
          } else if (isSaved) {
            items.push({
              id: ch.id,
              title: ch.title,
              district: ch.district,
              focusArea: ch.category,
              category: 'saved',
              status: 'Exploring',
              contributionStatus: 'Bookmarked for collaboration',
              collaboratorsCount: ch.collaboratorsCount,
              deadlineText: 'Open for proposals',
              tagColor: 'text-[#B45309] bg-[#FFFBEB] border-[#FDE68A]',
            });
          }
        });

        setDbChallenges(items);
      })
      .catch((err) => {
        console.warn('Failed to load dashboard challenges:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [joinedChallengeIds, savedChallengeIds]);

  const tabs: Array<{
    id: 'joined' | 'saved' | 'submitted' | 'completed';
    label: string;
    count: number;
  }> = [
    {
      id: 'joined',
      label: 'Joined Challenges',
      count: dbChallenges.filter((c) => c.category === 'joined').length,
    },
    {
      id: 'saved',
      label: 'Saved',
      count: dbChallenges.filter((c) => c.category === 'saved').length,
    },
    {
      id: 'submitted',
      label: 'Submitted by Me',
      count: dbChallenges.filter((c) => c.category === 'submitted').length,
    },
    {
      id: 'completed',
      label: 'Completed',
      count: dbChallenges.filter((c) => c.category === 'completed').length,
    },
  ];

  const filteredChallenges = useMemo(() => {
    return dbChallenges.filter((c) => c.category === activeTab);
  }, [dbChallenges, activeTab]);

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
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-[#FAF9F5] text-[#6B5845]'
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

      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center space-y-2">
          <Loader2 className="h-6 w-6 animate-spin text-[#123B2A]" />
          <span className="text-[13px] font-mono text-[#6B5845]">Loading challenge portfolio...</span>
        </div>
      ) : filteredChallenges.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white border border-[#EEEAE1] p-8 space-y-3">
          <BookmarkCheck className="h-8 w-8 text-[#6B5845] mx-auto opacity-50" />
          <h3 className="text-[1.1rem] font-bold text-[#1D2522]">No challenges in this folder</h3>
          <p className="text-[13px] text-[#6B5845] max-w-sm mx-auto">
            Explore active public problem calls across Jharkhand to start contributing ideas or tracking initiatives.
          </p>
          <button
            type="button"
            onClick={() => navigate('/challenges')}
            className="px-4 py-2 rounded-xl bg-[#123B2A] text-white text-[12px] font-bold cursor-pointer hover:bg-[#0D2B1E]"
          >
            Explore Public Challenges
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredChallenges.map((ch) => (
            <div
              key={ch.id}
              onClick={() => navigate(`/challenges/${ch.id}`)}
              className="p-5 rounded-3xl border border-[#EEEAE1] bg-white hover:border-[#123B2A]/40 transition-all cursor-pointer shadow-2xs hover:shadow-xs space-y-3 group text-left"
            >
              <div className="flex items-start justify-between gap-2">
                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${ch.tagColor}`}>
                  {ch.focusArea}
                </span>
                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(ch.status)}`}>
                  {ch.status}
                </span>
              </div>

              <h4 className="text-[1.05rem] font-bold text-[#1D2522] leading-snug group-hover:text-[#123B2A] transition-colors">
                {ch.title}
              </h4>

              <div className="flex items-center gap-3 text-[12px] text-[#6B5845]">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-[#123B2A]" />
                  <span>{ch.district}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-[#123B2A]" />
                  <span>{ch.collaboratorsCount} Collaborators</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#EEEAE1] flex items-center justify-between text-[11.5px]">
                <span className="text-[#6B5845] line-clamp-1">{ch.contributionStatus}</span>
                <span className="font-bold text-[#123B2A] flex items-center gap-1 shrink-0 group-hover:translate-x-0.5 transition-transform">
                  View Detail <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
