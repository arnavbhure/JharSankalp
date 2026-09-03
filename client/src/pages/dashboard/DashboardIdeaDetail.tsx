import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Share2, ExternalLink, ChevronRight, FileText } from 'lucide-react';
import { useInnovationStore } from '../../stores/innovationStore';

const RECOMMENDED_PARTNERS = [
  {
    name: 'BIT Mesra · Rural Tech Lab',
    type: 'Academic Institution',
    focus: 'IoT telemetry & sensor hardware bench testing',
    contact: 'Prof. Alok Mukherjee',
    matchScore: '96% Fit',
  },
  {
    name: 'IIT (ISM) Dhanbad · Water & Earth Systems',
    type: 'Premier Research R&D',
    focus: 'Subsurface aquifer & pumping mechanics audit',
    contact: 'Dr. Ramesh Soren',
    matchScore: '92% Fit',
  },
  {
    name: 'Murhu Jal Sahiya Collective',
    type: 'Community Organization',
    focus: 'Village handpump mechanics & field deployment',
    contact: 'Anita Purty (Lead Jal Sahiya)',
    matchScore: '89% Fit',
  },
  {
    name: 'Khunti District Innovation Cell',
    type: 'District Administration',
    focus: 'Block Development Officer pilot authorization',
    contact: 'Manoj Tirkey (Program Officer)',
    matchScore: 'District Lead',
  },
];

export function DashboardIdeaDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getIdeaById } = useInnovationStore();

  const idea = useMemo(() => {
    if (!id) return undefined;
    return getIdeaById(id);
  }, [id, getIdeaById]);

  const [copied, setCopied] = useState(false);

  if (!idea) {
    return (
      <div className="py-16 text-center space-y-4 rounded-3xl bg-white border border-[#EEEAE1] p-8">
        <FileText className="h-10 w-10 text-[#6B5845] mx-auto opacity-50" />
        <h2 className="text-[1.2rem] font-bold text-[#1D2522]">Idea Case File Not Found</h2>
        <p className="text-[13px] text-[#6B5845] max-w-sm mx-auto">
          The requested idea ID could not be loaded from your active innovation workspace session.
        </p>
        <button
          type="button"
          onClick={() => navigate('/dashboard/ideas')}
          className="px-5 py-2 rounded-xl bg-[#123B2A] text-white text-[12.5px] font-bold cursor-pointer"
        >
          Return to My Ideas →
        </button>
      </div>
    );
  }

  const pipelineStages = [
    { key: 'Submitted', label: '1. Submitted', num: 1 },
    { key: 'Initial Review', label: '2. Initial Review', num: 2 },
    { key: 'Expert Feedback', label: '3. Expert Feedback', num: 3 },
    { key: 'Collaboration', label: '4. Collaboration', num: 4 },
    { key: 'Pilot Selection', label: '5. Pilot Selection', num: 5 },
    { key: 'Implementation', label: '6. Implementation', num: 6 },
  ];

  // Determine current active pipeline stage
  const getStageIndex = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 0;
      case 'Under Review':
        return 1;
      case 'Selected':
        return 4;
      default:
        return 0;
    }
  };

  const activeStageIdx = getStageIndex(idea.status);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 text-left">
      {/* ── Top Breadcrumb Bar ── */}
      <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
        <div className="flex items-center gap-2 text-[12px] font-mono text-[#6B5845]">
          <Link
            to="/dashboard/ideas"
            className="hover:text-[#123B2A] transition-colors flex items-center gap-1 font-semibold"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>My Ideas</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-50" />
          <span className="text-[#1D2522] font-bold">{idea.id}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#EEEAE1] bg-white text-[#6B5845] hover:text-[#123B2A] text-[12px] font-mono transition-all cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{copied ? 'Copied!' : 'Share Dossier'}</span>
          </button>
        </div>
      </div>

      {/* ── Idea Header Card ── */}
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono text-[#6B5845]">{idea.id}</span>
              <span className="text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded border border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]">
                ● {idea.status}
              </span>
              <span className="text-[10.5px] font-mono uppercase font-bold px-2 py-0.5 rounded border border-[#EEEAE1] bg-[#FAF9F5] text-[#123B2A]">
                {idea.focusArea}
              </span>
            </div>

            <h1 className="text-[1.6rem] sm:text-[2rem] font-extrabold text-[#1D2522] leading-snug">
              {idea.title}
            </h1>

            <div className="text-[12.5px] text-[#6B5845]">
              Submitted on <strong className="text-[#1D2522]">{idea.submissionDate}</strong> by{' '}
              <strong className="text-[#1D2522]">{idea.authorName}</strong> · District:{' '}
              <strong className="text-[#1D2522]">{idea.district}</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/challenges/${idea.challengeId}`)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF9F5] hover:bg-[#123B2A] hover:text-white border border-[#EEEAE1] text-[#123B2A] text-[12px] font-bold transition-all shrink-0 cursor-pointer"
          >
            <span>Related Challenge</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Responding Challenge Reference */}
        <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] text-[12.5px] space-y-0.5">
          <span className="text-[10px] font-mono font-bold uppercase text-[#6B5845] block">
            RESPONDING TO CIVIC CHALLENGE
          </span>
          <p className="font-bold text-[#1D2522]">{idea.challengeTitle}</p>
        </div>
      </div>

      {/* ── IDEA STATUS PIPELINE ── */}
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-7 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            IDEA STATUS PIPELINE
          </span>
          <span className="text-[11px] font-mono text-[#15803D] font-bold">
            Current Stage: {pipelineStages[activeStageIdx].label}
          </span>
        </div>

        {/* Visual Progression Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          {pipelineStages.map((stage, idx) => {
            const isCompleted = idx < activeStageIdx;
            const isCurrent = idx === activeStageIdx;

            return (
              <div
                key={stage.key}
                className={`p-3 rounded-2xl text-center space-y-1 transition-all ${
                  isCurrent
                    ? 'bg-[#123B2A] text-white shadow-xs'
                    : isCompleted
                      ? 'bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D]'
                      : 'bg-[#FAF9F5] border border-[#EEEAE1] text-[#6B5845]/70'
                }`}
              >
                <div
                  className={`h-5 w-5 rounded-full mx-auto flex items-center justify-center text-[10px] font-mono font-bold ${
                    isCurrent
                      ? 'bg-[#F5A623] text-[#123B2A]'
                      : isCompleted
                        ? 'bg-[#15803D] text-white'
                        : 'bg-[#EEEAE1] text-[#6B5845]'
                  }`}
                >
                  {isCompleted ? '✓' : stage.num}
                </div>
                <span className="block text-[11px] font-mono font-bold truncate">
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── Left Column: Proposal Dossier & Activity Timeline (7 Cols) ── */}
        <div className="lg:col-span-7 space-y-6">
          {/* Proposal Breakdown */}
          <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 shadow-2xs space-y-4">
            <h3 className="text-[1.15rem] font-bold text-[#1D2522]">
              Submitted Solution Architecture
            </h3>

            <div className="space-y-3.5 text-[13px]">
              <div className="space-y-1">
                <span className="text-[10.5px] font-mono font-bold uppercase text-[#6B5845] block">
                  SUMMARY
                </span>
                <p className="text-[#1D2522] leading-relaxed">{idea.summary}</p>
              </div>

              {idea.description && (
                <div className="space-y-1 pt-2 border-t border-[#EEEAE1]">
                  <span className="text-[10.5px] font-mono font-bold uppercase text-[#6B5845] block">
                    HOW IT WORKS
                  </span>
                  <p className="text-[#6B5845] leading-relaxed">{idea.description}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#EEEAE1] text-[12px]">
                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#6B5845] block">
                    CHALLENGE PART ADDRESSED
                  </span>
                  <strong className="text-[#1D2522] block font-sans">
                    {idea.problemPart || 'General Challenge Area'}
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#6B5845] block">
                    EXPECTED IMPACT
                  </span>
                  <strong className="text-[#15803D] block font-sans">
                    {idea.expectedImpact || 'Targeted 40% reduction in downtime'}
                  </strong>
                </div>
              </div>

              {idea.approach && (
                <div className="space-y-1 pt-2 border-t border-[#EEEAE1]">
                  <span className="text-[10.5px] font-mono font-bold uppercase text-[#6B5845] block">
                    IMPLEMENTATION APPROACH & RESOURCES
                  </span>
                  <p className="text-[#1D2522] leading-relaxed">{idea.approach}</p>
                  {idea.resources && (
                    <p className="text-[#6B5845] text-[12px] font-mono">
                      Materials: {idea.resources}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 shadow-2xs space-y-4">
            <h3 className="text-[1.15rem] font-bold text-[#1D2522] flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#F5A623]" />
              <span>Activity & Progression Log</span>
            </h3>

            <div className="space-y-3">
              {idea.timeline.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] flex items-start gap-3 text-[12.5px]"
                >
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-mono font-bold ${
                      item.done
                        ? 'bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]'
                        : 'bg-white text-[#6B5845] border border-[#EEEAE1]'
                    }`}
                  >
                    {item.done ? '✓' : idx + 1}
                  </div>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-[#1D2522] font-sans">{item.title}</strong>
                      <span className="text-[11px] font-mono text-[#6B5845]">{item.date}</span>
                    </div>
                    <p className="text-[12px] text-[#6B5845]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Column: Recommended Collaborators & Actions (5 Cols) ── */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 shadow-2xs space-y-4">
            <div className="space-y-1 border-b border-[#EEEAE1] pb-3">
              <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#123B2A] font-bold">
                ECOSYSTEM MATCHING
              </span>
              <h3 className="text-[1.2rem] font-bold text-[#1D2522]">Recommended Partners</h3>
              <p className="text-[12px] text-[#6B5845]">
                Institutions and research teams that can provide lab equipment, field access, or
                mentoring.
              </p>
            </div>

            <div className="space-y-3">
              {RECOMMENDED_PARTNERS.map((partner, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1.5 text-[12.5px]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-white border border-[#EEEAE1] text-[#123B2A]">
                      {partner.type}
                    </span>
                    <span className="text-[10.5px] font-mono font-bold text-[#15803D]">
                      {partner.matchScore}
                    </span>
                  </div>

                  <strong className="text-[13.5px] text-[#1D2522] block font-sans">
                    {partner.name}
                  </strong>

                  <p className="text-[12px] text-[#6B5845]">{partner.focus}</p>

                  <div className="pt-1.5 border-t border-[#EEEAE1] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#6B5845]">POC: {partner.contact}</span>
                    <span className="text-[#123B2A] font-bold hover:underline cursor-pointer">
                      Invite to Collaborate →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
