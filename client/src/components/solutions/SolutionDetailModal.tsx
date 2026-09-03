import { useNavigate } from 'react-router-dom';
import {
  X,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Users,
  Target,
  Clock,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { SolutionItem } from '../../types/solutions';

interface SolutionDetailModalProps {
  solution: SolutionItem | null;
  onClose: () => void;
}

const LIFECYCLE_STEPS = [
  'Challenge Identified',
  'Research Completed',
  'Prototype Built',
  'Testing',
  'Field Pilot',
  'Deployment',
];

export function SolutionDetailModal({ solution, onClose }: SolutionDetailModalProps) {
  const navigate = useNavigate();

  if (!solution) return null;

  const getCurrentStepIndex = () => {
    switch (solution.stage) {
      case 'Research':
        return 1;
      case 'Prototype':
        return 2;
      case 'Testing':
        return 3;
      case 'Field Pilot':
        return 4;
      case 'Deployment':
      case 'Scaling':
        return 5;
      default:
        return 2;
    }
  };

  const currentStep = getCurrentStepIndex();

  const handleNavigateChallenge = () => {
    onClose();
    navigate(`/challenges/${solution.challengeId}`);
  };

  const handleNavigateCollaboration = () => {
    onClose();
    if (solution.collaborationId) {
      navigate(`/workspace/projects/${solution.collaborationId}`);
    } else {
      navigate('/collaborations');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl rounded-3xl bg-white border border-[#EEEAE1] shadow-2xl p-6 sm:p-8 space-y-6 text-left max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-[#EEEAE1] pb-4 gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A] bg-[#FAF9F5] px-2.5 py-0.5 rounded border border-[#EEEAE1]">
                {solution.focusArea}
              </span>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0284C7] bg-[#F0F9FF] px-2.5 py-0.5 rounded border border-[#BAE6FD]">
                {solution.stage}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono text-[#6B5845]">
                <MapPin className="h-3 w-3 text-[#BE123C]" />
                {solution.district} District
              </span>
            </div>
            <h3 className="text-[1.5rem] sm:text-[1.8rem] font-bold text-[#1D2522] leading-tight">
              {solution.name}
            </h3>
            <p className="text-[13px] text-[#123B2A] font-semibold">{solution.tagline}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-[#FAF9F5] border border-[#EEEAE1] flex items-center justify-center text-[#6B5845] hover:text-[#1D2522] cursor-pointer shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Visual Lifecycle Timeline ── */}
        <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-2.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6B5845] block">
            LIFECYCLE ADVANCEMENT:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
            {LIFECYCLE_STEPS.map((step, idx) => {
              const isPast = idx < currentStep;
              const isCurrent = idx === currentStep;
              return (
                <div
                  key={step}
                  className={`p-2 rounded-xl border text-center space-y-1 ${
                    isCurrent
                      ? 'bg-[#123B2A] text-white border-[#123B2A] shadow-xs'
                      : isPast
                        ? 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]'
                        : 'bg-white text-[#6B5845]/60 border-[#EEEAE1]'
                  }`}
                >
                  <span className="text-[9.5px] font-mono font-bold block">0{idx + 1}</span>
                  <span className="text-[10.5px] font-bold block leading-tight">{step}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Overview & Original Challenge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
          <div className="p-4 rounded-2xl bg-white border border-[#EEEAE1] space-y-2">
            <span className="text-[10.5px] font-mono font-bold uppercase text-[#123B2A] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
              THE PROPOSED SOLUTION
            </span>
            <p className="text-[#1D2522] leading-relaxed">{solution.description}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#EEEAE1] space-y-2">
            <span className="text-[10.5px] font-mono font-bold uppercase text-[#BE123C] flex items-center gap-1.5">
              <Target className="h-3.5 w-3.5" />
              ORIGINAL CHALLENGE ADDRESSED
            </span>
            <p className="text-[#1D2522] font-medium leading-relaxed">{solution.challengeTitle}</p>
            <button
              type="button"
              onClick={handleNavigateChallenge}
              className="inline-flex items-center gap-1 text-[11.5px] font-mono font-bold text-[#123B2A] hover:underline cursor-pointer pt-1"
            >
              <span>View Challenge Dossier ({solution.challengeId})</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Measured Outcomes & Technology */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
          {/* Measured Outcomes */}
          <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-2">
            <span className="text-[10.5px] font-mono font-bold uppercase text-[#15803D] flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              MEASURED COMMUNITY OUTCOMES
            </span>
            <ul className="space-y-1.5">
              {solution.impactMetrics.map((met, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[#1D2522] text-[12.5px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#15803D] mt-1.5 shrink-0" />
                  <span>{met}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology & Partners */}
          <div className="p-4 rounded-2xl bg-white border border-[#EEEAE1] space-y-2">
            <span className="text-[10.5px] font-mono font-bold uppercase text-[#123B2A] flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-[#0284C7]" />
              TECHNOLOGY STACK & ARCHITECTURE
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {solution.technologyTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-[#FAF9F5] text-[11px] font-mono font-bold text-[#1D2522] border border-[#EEEAE1]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <span className="text-[10px] font-mono font-bold uppercase text-[#6B5845] block">
                PARTNER INSTITUTIONS:
              </span>
              <p className="text-[12px] text-[#1D2522] pt-0.5">
                {solution.leadPartners.join(' · ')}
              </p>
            </div>
          </div>
        </div>

        {/* Milestones & Next Milestone */}
        <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-3 text-[13px]">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-mono font-bold uppercase text-[#123B2A] flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              ENGINEERING MILESTONES
            </span>
            <span className="text-[11px] font-mono font-bold text-[#15803D]">
              {solution.progress}% Complete
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {solution.milestones.map((m, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border text-[12px] flex items-center justify-between ${
                  m.completed
                    ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#15803D]'
                    : 'bg-white border-[#EEEAE1] text-[#6B5845]'
                }`}
              >
                <span>{m.name}</span>
                {m.completed ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D] shrink-0" />
                ) : (
                  <Clock className="h-3.5 w-3.5 text-[#6B5845] shrink-0" />
                )}
              </div>
            ))}
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-[#EEEAE1] text-[12px]">
            <strong className="text-[#F5A623] font-bold block text-[10px] uppercase font-mono">
              NEXT UPCOMING MILESTONE:
            </strong>
            <span className="text-[#1D2522] font-medium">{solution.nextMilestone}</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-3 border-t border-[#EEEAE1] flex items-center justify-between flex-wrap gap-3">
          <button
            type="button"
            onClick={handleNavigateCollaboration}
            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#123B2A] hover:underline cursor-pointer"
          >
            <Users className="h-4 w-4" />
            <span>Open Collaborative Project Workspace</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#123B2A] text-white text-[13px] font-bold shadow-xs hover:bg-[#0D2B1E] cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
