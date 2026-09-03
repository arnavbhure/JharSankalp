import { useState } from 'react';
import { IdeaItem } from '../../types/ideas';
import { X, CheckCircle2, Sparkles, Send, Users } from 'lucide-react';
import { JHARKHAND_DISTRICTS } from '../../data/challengesData';

export type IdeaModalMode = 'VIEW' | 'SHARE' | 'JOIN';

interface IdeaModalProps {
  isOpen: boolean;
  mode: IdeaModalMode;
  idea: IdeaItem | null;
  onClose: () => void;
  onShareSubmit: (newIdea: Partial<IdeaItem>) => Promise<void>;
  onJoinSubmit: (ideaId: string, applicant: { name: string; role: string; message: string }) => Promise<void>;
}

export function IdeaModal({
  isOpen,
  mode,
  idea,
  onClose,
  onShareSubmit,
  onJoinSubmit,
}: IdeaModalProps) {
  // Share form state
  const [shareTitle, setShareTitle] = useState('');
  const [shareCategory, setShareCategory] = useState('Water Management');
  const [shareDistrict, setShareDistrict] = useState('Khunti');
  const [shareSummary, setShareSummary] = useState('');
  const [shareChallengeTitle, setShareChallengeTitle] = useState('');

  // Join form state
  const [applicantName, setApplicantName] = useState('');
  const [applicantRole, setApplicantRole] = useState('');
  const [applicantMessage, setApplicantMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shareTitle.trim() || !shareSummary.trim()) return;

    setSubmitting(true);
    try {
      await onShareSubmit({
        title: shareTitle,
        category: shareCategory,
        district: shareDistrict,
        summary: shareSummary,
        challengeTitle: shareChallengeTitle || 'General Civic Improvement',
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setShareTitle('');
        setShareSummary('');
      }, 1600);
    } finally {
      setSubmitting(false);
    }
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea || !applicantName.trim()) return;

    setSubmitting(true);
    try {
      await onJoinSubmit(idea.id, {
        name: applicantName,
        role: applicantRole || 'Collaborator',
        message: applicantMessage,
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setApplicantName('');
        setApplicantRole('');
        setApplicantMessage('');
      }, 1600);
    } finally {
      setSubmitting(false);
    }
  };

  const validDistricts = JHARKHAND_DISTRICTS.filter((d) => d !== 'All Districts');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[#EEEAE1] text-left space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 text-[#6B5845] hover:text-[#1D2522] rounded-lg transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {success ? (
          <div className="py-12 text-center space-y-3 animate-in zoom-in-95">
            <CheckCircle2 className="h-12 w-12 text-[#15803D] mx-auto" />
            <h3 className="text-[1.4rem] font-bold text-[#1D2522]">
              {mode === 'SHARE'
                ? 'Idea Successfully Published!'
                : 'Application Transmitted!'}
            </h3>
            <p className="text-[14px] text-[#6B5845] max-w-sm mx-auto">
              {mode === 'SHARE'
                ? 'Your proposed solution has been added to the open innovation feed.'
                : 'The project team has received your application to collaborate.'}
            </p>
          </div>
        ) : mode === 'SHARE' ? (
          /* ── SHARE AN IDEA FORM ── */
          <form onSubmit={handleShare} className="space-y-4">
            <div className="space-y-1 pr-6">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
                <span>OPEN PROPOSAL</span>
              </div>
              <h3 className="text-[1.5rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
                Share a Solution Idea
              </h3>
              <p className="text-[13.5px] text-[#6B5845]">
                Propose an engineering hypothesis, research concept, or grassroots approach for challenges in Jharkhand.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                Idea Title *
              </label>
              <input
                type="text"
                required
                value={shareTitle}
                onChange={(e) => setShareTitle(e.target.value)}
                placeholder="e.g. Gravity-Fed Drip Irrigation for Hill Terraces"
                className="w-full h-11 px-3.5 rounded-xl border border-[#EEEAE1] bg-white text-[14px] text-[#1D2522] placeholder:text-[#6B5845]/50 shadow-2xs focus:outline-none focus:border-[#123B2A]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                  Category *
                </label>
                <select
                  value={shareCategory}
                  onChange={(e) => setShareCategory(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[13.5px] text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A]"
                >
                  <option value="Water Management">Water Management</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Mining Safety">Mining Safety</option>
                  <option value="Education">Education</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Environment">Environment</option>
                  <option value="Livelihoods">Livelihoods</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                  Target District *
                </label>
                <select
                  value={shareDistrict}
                  onChange={(e) => setShareDistrict(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[13.5px] text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A]"
                >
                  {validDistricts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                Which Problem Does This Solve?
              </label>
              <input
                type="text"
                value={shareChallengeTitle}
                onChange={(e) => setShareChallengeTitle(e.target.value)}
                placeholder="e.g. Reducing Post-Harvest Crop Loss in Hazaribagh"
                className="w-full h-11 px-3.5 rounded-xl border border-[#EEEAE1] bg-white text-[14px] text-[#1D2522] placeholder:text-[#6B5845]/50 shadow-2xs focus:outline-none focus:border-[#123B2A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                How Does It Work? (Summary) *
              </label>
              <textarea
                rows={4}
                required
                value={shareSummary}
                onChange={(e) => setShareSummary(e.target.value)}
                placeholder="Describe your technical concept, what materials or algorithms it uses, and what makes it feasible..."
                className="w-full p-3.5 rounded-xl border border-[#EEEAE1] bg-white text-[13.5px] text-[#1D2522] placeholder:text-[#6B5845]/50 shadow-2xs focus:outline-none focus:border-[#123B2A] leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-[13px] font-semibold text-[#6B5845] hover:bg-[#FAF9F5] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13.5px] font-bold shadow-xs transition-all cursor-pointer"
              >
                <Send className="h-3.5 w-3.5 text-[#F5A623]" />
                <span>{submitting ? 'Publishing...' : 'Publish Idea'}</span>
              </button>
            </div>
          </form>
        ) : mode === 'JOIN' && idea ? (
          /* ── JOIN TEAM FORM ── */
          <form onSubmit={handleJoin} className="space-y-4">
            <div className="space-y-1 pr-6">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#15803D]">
                <Users className="h-3.5 w-3.5 text-[#15803D]" />
                <span>TEAM COLLABORATION</span>
              </div>
              <h3 className="text-[1.4rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
                Join Solution Squad
              </h3>
              <p className="text-[13px] text-[#6B5845]">
                For Idea: <strong className="text-[#1D2522]">{idea.title}</strong>
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] text-[12.5px] text-[#6B5845]">
              <span className="font-bold text-[#123B2A] block text-[11px] font-mono uppercase">
                Active Needs:
              </span>
              <span>
                {idea.needs.map((n) => `${n.roleCategory} (${n.label})`).join(' · ') ||
                  'Open contributions in engineering, research, and design'}
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="e.g. Aditi Sharma"
                className="w-full h-11 px-3.5 rounded-xl border border-[#EEEAE1] bg-white text-[14px] text-[#1D2522] placeholder:text-[#6B5845]/50 shadow-2xs focus:outline-none focus:border-[#123B2A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                Your Domain / Capability *
              </label>
              <input
                type="text"
                required
                value={applicantRole}
                onChange={(e) => setApplicantRole(e.target.value)}
                placeholder="e.g. Embedded Firmware Engineer / Agronomist / Student"
                className="w-full h-11 px-3.5 rounded-xl border border-[#EEEAE1] bg-white text-[14px] text-[#1D2522] placeholder:text-[#6B5845]/50 shadow-2xs focus:outline-none focus:border-[#123B2A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                How can you help this team? (Message)
              </label>
              <textarea
                rows={3}
                value={applicantMessage}
                onChange={(e) => setApplicantMessage(e.target.value)}
                placeholder="Briefly state your relevant background, tools you use, or why you care about this problem..."
                className="w-full p-3.5 rounded-xl border border-[#EEEAE1] bg-white text-[13.5px] text-[#1D2522] placeholder:text-[#6B5845]/50 shadow-2xs focus:outline-none focus:border-[#123B2A] leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-[13px] font-semibold text-[#6B5845] hover:bg-[#FAF9F5] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13.5px] font-bold shadow-xs transition-all cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
                <span>{submitting ? 'Applying...' : 'Apply to Squad'}</span>
              </button>
            </div>
          </form>
        ) : (
          /* ── VIEW IDEA ARCHITECTURE DETAIL ── */
          idea && (
            <div className="space-y-5">
              <div className="space-y-1.5 pr-6">
                <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
                  <span className="text-[#123B2A]">{idea.category}</span>
                  <span>·</span>
                  <span>{idea.district}</span>
                  <span>·</span>
                  <span className="text-[#15803D] font-bold">{idea.stage} STAGE</span>
                </div>

                <h3 className="text-[1.45rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
                  {idea.title}
                </h3>
              </div>

              {/* Linked Challenge */}
              <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] flex items-center justify-between gap-2">
                <div className="text-[12.5px] text-[#6B5845]">
                  <span className="font-mono uppercase font-bold text-[#123B2A] block text-[10.5px]">
                    SOLVING CHALLENGE
                  </span>
                  <strong className="text-[#1D2522]">{idea.challengeTitle}</strong>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A] block">
                  Concept Architecture
                </span>
                <p className="text-[14px] text-[#1D2522]/85 leading-relaxed bg-[#FAF9F5] p-4 rounded-xl border border-[#EEEAE1]">
                  {idea.summary}
                </p>
              </div>

              {/* Key Innovations */}
              {idea.keyInnovations && idea.keyInnovations.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A] block">
                    Key Technical Innovations
                  </span>
                  <ul className="space-y-1.5 text-[13px] text-[#1D2522]">
                    {idea.keyInnovations.map((inv, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#123B2A] mt-2 shrink-0" />
                        <span>{inv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Active Contributors */}
              <div className="space-y-2 pt-2 border-t border-[#EEEAE1]">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B5845] block">
                  Active Contributors ({idea.contributors.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {idea.contributors.map((c) => (
                    <div
                      key={c.id}
                      className="px-3 py-1.5 rounded-lg border border-[#EEEAE1] bg-[#FAF9F5] text-[12.5px] flex items-center gap-2"
                    >
                      <span className="h-5 w-5 rounded-full bg-[#123B2A] text-white text-[9px] font-mono font-bold flex items-center justify-center">
                        {c.avatarInitials}
                      </span>
                      <span className="font-semibold text-[#1D2522]">{c.name}</span>
                      <span className="text-[11px] text-[#6B5845]">({c.role})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EEEAE1]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-[13px] font-semibold text-[#6B5845] hover:bg-[#FAF9F5] cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    /* switch to join mode */
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13.5px] font-bold shadow-xs cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
                  <span>Join this Squad</span>
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
