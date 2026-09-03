import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Users, ArrowRight, Sparkles, Edit3, Trash2, Bookmark } from 'lucide-react';
import { useInnovationStore, SubmittedIdea } from '../../stores/innovationStore';

export function DashboardIdeas() {
  const navigate = useNavigate();
  const { userIdeas, withdrawIdea } = useInnovationStore();

  const [activeTab, setActiveTab] = useState<
    'All' | 'Draft' | 'Submitted' | 'Under Review' | 'Selected'
  >('All');

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

  const filteredIdeas =
    activeTab === 'All' ? userIdeas : userIdeas.filter((i) => i.status === activeTab);

  const getStatusBadge = (status: SubmittedIdea['status']) => {
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
                ? userIdeas.length
                : userIdeas.filter((i) => i.status === tab.id).length;

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

      {/* ── Ideas List ── */}
      {filteredIdeas.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white border border-[#EEEAE1] p-8 space-y-3">
          <Bookmark className="h-8 w-8 text-[#6B5845] mx-auto opacity-50" />
          <h3 className="text-[1.1rem] font-bold text-[#1D2522]">No ideas in this category</h3>
          <p className="text-[13px] text-[#6B5845] max-w-sm mx-auto">
            Discover active civic challenges in Jharkhand and propose practical solutions.
          </p>
          <button
            type="button"
            onClick={() => navigate('/challenges')}
            className="px-4 py-2 rounded-xl bg-[#123B2A] text-white text-[12px] font-bold cursor-pointer"
          >
            Explore Challenges →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredIdeas.map((idea) => {
            const isDraft = idea.status === 'Draft';

            return (
              <div
                key={idea.id}
                className="rounded-3xl border border-[#EEEAE1] bg-white p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#6B5845]">{idea.id}</span>
                    <span
                      className={`text-[10.5px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border ${getStatusBadge(
                        idea.status,
                      )}`}
                    >
                      {idea.status}
                    </span>
                  </div>

                  <h3 className="text-[1.2rem] font-bold text-[#1D2522] leading-snug">
                    {idea.title}
                  </h3>

                  <div className="space-y-1 text-[12px]">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#6B5845] block">
                      RESPONDING TO CHALLENGE
                    </span>
                    <p
                      onClick={() => navigate(`/challenges/${idea.challengeId}`)}
                      className="text-[#123B2A] font-semibold hover:underline cursor-pointer"
                    >
                      {idea.challengeTitle}
                    </p>
                  </div>

                  {idea.summary && (
                    <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] text-[12px] text-[#6B5845] line-clamp-2">
                      {idea.summary}
                    </div>
                  )}

                  {idea.timeline && idea.timeline.length > 0 && (
                    <div className="text-[11.5px] font-mono text-[#15803D] flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-[#F5A623]" />
                      <span>{idea.timeline[idea.timeline.length - 1].title}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#EEEAE1] flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[11px] font-mono text-[#6B5845]">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-[#123B2A]" />
                      {idea.collaboratorsCount}{' '}
                      {idea.collaboratorsCount === 1 ? 'Author' : 'Collaborators'}
                    </span>
                    <span>·</span>
                    <span>{idea.submissionDate}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isDraft ? (
                      <>
                        <button
                          type="button"
                          onClick={() => withdrawIdea(idea.id)}
                          className="p-1.5 text-[#6B5845] hover:text-[#BE123C] rounded-lg hover:bg-[#FFF5F5] transition-colors cursor-pointer"
                          title="Discard Draft"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/challenges/${idea.challengeId}/submit-idea`)}
                          className="inline-flex items-center gap-1 text-[12px] font-bold text-[#123B2A] hover:underline cursor-pointer"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          <span>Edit Draft</span>
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => navigate(`/dashboard/ideas/${idea.id}`)}
                        className="inline-flex items-center gap-1 text-[12px] font-bold text-[#123B2A] hover:underline cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
