import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Users,
  ArrowRight,
} from 'lucide-react';

interface CitizenIdeaItem {
  id: string;
  title: string;
  relatedChallenge: string;
  relatedChallengeId: string;
  submissionDate: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Selected';
  collaboratorsCount: number;
  progressStage: string;
}

const MY_IDEAS: CitizenIdeaItem[] = [
  {
    id: 'IDEA-01',
    title: 'Acoustic & Vibration Sensor Collar for India Mark II Handpumps',
    relatedChallenge: 'Frequent Breakdown of Drinking Water Pumps in Murhu Block',
    relatedChallengeId: 'JS-2026-00024',
    submissionDate: 'May 14, 2026',
    status: 'Selected',
    collaboratorsCount: 14,
    progressStage: 'Field Pilot Underway · BIT Mesra Lead',
  },
  {
    id: 'IDEA-02',
    title: 'Off-Grid Phase Change Material (PCM) Lac Cooling Chambers',
    relatedChallenge: 'Improving Post-Harvest Storage & Market Access for Lac Collectors',
    relatedChallengeId: 'JS-2026-00019',
    submissionDate: 'May 28, 2026',
    status: 'Under Review',
    collaboratorsCount: 6,
    progressStage: 'Technical Feasibility Audit by IIT ISM',
  },
  {
    id: 'IDEA-03',
    title: 'Micro-Solar Foldable Diagnostic Kit for Village ASHA Workers',
    relatedChallenge: 'Rural Healthcare Accessibility Initiative in Dumka',
    relatedChallengeId: 'JS-2026-00008',
    submissionDate: 'June 01, 2026',
    status: 'Submitted',
    collaboratorsCount: 2,
    progressStage: 'Awaiting District Committee Triage',
  },
  {
    id: 'IDEA-04',
    title: 'Rainwater Harvest Silt Trap using Bamboo & Coir Bio-filters',
    relatedChallenge: 'Groundwater Depletion in Peri-Urban Ranchi Wards',
    relatedChallengeId: 'JS-2026-00024',
    submissionDate: 'June 02, 2026',
    status: 'Draft',
    collaboratorsCount: 1,
    progressStage: 'Draft in Progress · Needs CAD Sketch',
  },
];

export function DashboardIdeas() {
  const navigate = useNavigate();
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
    activeTab === 'All'
      ? MY_IDEAS
      : MY_IDEAS.filter((i) => i.status === activeTab);

  const getStatusBadge = (status: CitizenIdeaItem['status']) => {
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
                ? MY_IDEAS.length
                : MY_IDEAS.filter((i) => i.status === tab.id).length;

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
                    activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-[#FAF9F5] text-[#6B5845]'
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
          onClick={() => navigate('/submit-idea')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[12.5px] font-bold shadow-xs transition-all active:scale-[0.98] shrink-0 cursor-pointer"
        >
          <PlusCircle className="h-4 w-4 text-[#F5A623]" />
          <span>+ Submit New Idea</span>
        </button>
      </div>

      {/* ── Ideas List ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIdeas.map((idea) => (
          <div
            key={idea.id}
            className="rounded-3xl border border-[#EEEAE1] bg-white p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#6B5845]">
                  {idea.id}
                </span>
                <span
                  className={`text-[10.5px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border ${getStatusBadge(
                    idea.status
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
                <p className="text-[#123B2A] font-semibold hover:underline cursor-pointer">
                  {idea.relatedChallenge}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] text-[12px] space-y-0.5">
                <span className="text-[10px] font-mono font-bold uppercase text-[#6B5845] block">
                  PROGRESS TRAJECTORY
                </span>
                <p className="font-semibold text-[#1D2522]">
                  {idea.progressStage}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#EEEAE1] flex items-center justify-between">
              <div className="flex items-center gap-3 text-[11px] font-mono text-[#6B5845]">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-[#123B2A]" />
                  {idea.collaboratorsCount} Collaborators
                </span>
                <span>·</span>
                <span>{idea.submissionDate}</span>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/ideas/idea-water-pump-monitoring`)}
                className="inline-flex items-center gap-1 text-[12px] font-bold text-[#123B2A] hover:underline cursor-pointer"
              >
                <span>View Details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
