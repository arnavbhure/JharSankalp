import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, ArrowRight, Bookmark, Loader2, Lightbulb } from 'lucide-react';
import { api } from '../../services/api';

interface IdeaItem {
  id: string;
  challengeId: string;
  challengeTitle: string;
  district: string;
  focusArea: string;
  title: string;
  summary: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Selected';
  submissionDate: string;
  collaboratorsCount: number;
}

export function DashboardIdeas() {
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState<IdeaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<
    'All' | 'Draft' | 'Submitted' | 'Under Review' | 'Selected'
  >('All');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    api.get<any[]>('/ideas/my')
      .then((res) => {
        if (!isMounted) return;
        const list = Array.isArray(res) ? res : (res as any)?.data || [];

        const mapped: IdeaItem[] = list.map((item: any) => {
          let status: IdeaItem['status'] = 'Submitted';
          if (item.status === 'UNDER_REVIEW' || item.status === 'UNDER_VALIDATION') status = 'Under Review';
          else if (item.status === 'VALIDATED' || item.status === 'SELECTED' || item.status === 'ACTIVE') status = 'Selected';
          else if (item.status === 'DRAFT') status = 'Draft';

          return {
            id: item.id,
            challengeId: item.challenge?.publicId || item.challengeId || 'JS-2026-00024',
            challengeTitle: item.challenge?.title || 'Civic Problem Statement',
            district: item.district || item.challenge?.district?.name || 'Jharkhand',
            focusArea: item.domain || item.challenge?.domain || 'Water Management',
            title: item.title,
            summary: item.description || item.summary || 'Community innovation proposal',
            status,
            submissionDate: new Date(item.createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }),
            collaboratorsCount: item._count?.collaborations || 0,
          };
        });

        setIdeas(mapped);
      })
      .catch((err) => {
        console.warn('Failed to load user ideas from database:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const tabs: Array<{
    id: 'All' | 'Draft' | 'Submitted' | 'Under Review' | 'Selected';
    label: string;
  }> = [
    { id: 'All', label: 'All Ideas' },
    { id: 'Draft', label: 'Drafts' },
    { id: 'Submitted', label: 'Submitted' },
    { id: 'Under Review', label: 'Under Review' },
    { id: 'Selected', label: 'Selected' },
  ];

  const filteredIdeas = useMemo(() => {
    return activeTab === 'All' ? ideas : ideas.filter((i) => i.status === activeTab);
  }, [ideas, activeTab]);

  const getStatusBadge = (status: IdeaItem['status']) => {
    switch (status) {
      case 'Selected':
        return 'text-[#15803D] bg-[#F0FDF4] border-[#BBF7D0]';
      case 'Under Review':
        return 'text-[#B45309] bg-[#FFFBEB] border-[#FDE68A]';
      case 'Submitted':
        return 'text-[#0284C7] bg-[#F0F9FF] border-[#BAE6FD]';
      case 'Draft':
      default:
        return 'text-[#6B5845] bg-[#FAF9F5] border-[#EEEAE1]';
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* ── Action Header Strip ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EEEAE1] pb-4">
        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab) => {
            const count =
              tab.id === 'All'
                ? ideas.length
                : ideas.filter((i) => i.status === tab.id).length;

            return (
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
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* CTA: Submit New Idea */}
        <button
          type="button"
          onClick={() => navigate('/challenges')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[12.5px] font-bold shadow-xs transition-all active:scale-[0.98] shrink-0 cursor-pointer"
        >
          <PlusCircle className="h-4 w-4 text-[#F5A623]" />
          <span>+ Submit New Idea</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center space-y-2">
          <Loader2 className="h-6 w-6 animate-spin text-[#123B2A]" />
          <span className="text-[13px] font-mono text-[#6B5845]">Loading your submitted ideas...</span>
        </div>
      ) : filteredIdeas.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white border border-[#EEEAE1] p-8 space-y-3">
          <Bookmark className="h-8 w-8 text-[#6B5845] mx-auto opacity-50" />
          <h3 className="text-[1.1rem] font-bold text-[#1D2522]">No ideas found in this folder</h3>
          <p className="text-[13px] text-[#6B5845] max-w-sm mx-auto">
            Explore active civic challenges in Jharkhand and propose practical technological or community solutions.
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
        <div className="space-y-3.5">
          {filteredIdeas.map((idea) => (
            <div
              key={idea.id}
              onClick={() => navigate(`/ideas/${idea.id}`)}
              className="p-5 sm:p-6 rounded-3xl border border-[#EEEAE1] bg-white hover:border-[#123B2A]/40 transition-all cursor-pointer shadow-2xs hover:shadow-xs space-y-3 group"
            >
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-[#FAF9F5] border border-[#EEEAE1] text-[#6B5845]">
                      {idea.focusArea}
                    </span>
                    <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(idea.status)}`}>
                      {idea.status}
                    </span>
                  </div>
                  <h4 className="text-[1.15rem] font-bold text-[#1D2522] leading-snug group-hover:text-[#123B2A] transition-colors">
                    {idea.title}
                  </h4>
                </div>

                <div className="text-right text-[11px] font-mono text-[#6B5845]">
                  Submitted {idea.submissionDate}
                </div>
              </div>

              <p className="text-[13px] text-[#3D4C44] leading-relaxed line-clamp-2">
                {idea.summary}
              </p>

              <div className="pt-3 border-t border-[#EEEAE1] flex items-center justify-between text-[12px] text-[#6B5845]">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-3.5 w-3.5 text-[#F5A623]" />
                  <span className="font-medium text-[#123B2A]">Linked Challenge:</span>
                  <span className="truncate max-w-xs">{idea.challengeTitle}</span>
                </div>

                <span className="font-bold text-[#123B2A] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  View Idea Dossier <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
