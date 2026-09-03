import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, CheckCircle2, Send, X } from 'lucide-react';

interface IdeaActionRequiredPanelProps {
  hasAction: boolean;
  actionMessage?: string;
  relatedIdeaTitle?: string;
  relatedIdeaId?: string;
  onRespond: (replyText: string) => Promise<void>;
}

export function IdeaActionRequiredPanel({
  hasAction,
  actionMessage,
  relatedIdeaTitle,
  relatedIdeaId,
  onRespond,
}: IdeaActionRequiredPanelProps) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    try {
      await onRespond(replyText);
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
        setModalOpen(false);
        setReplyText('');
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hasAction) {
    return (
      <div className="rounded-2xl border border-[#BBF7D0] bg-[#F0FDF4] p-4 text-left flex items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="h-5 w-5 text-[#15803D] shrink-0" />
          <span className="text-[13.5px] font-medium text-[#15803D]">
            All collaborator requests and reviewer inquiries have been answered. Your ideas are on
            track.
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-3xl border-2 border-[#BE123C] bg-[#FFF8F8] p-5 sm:p-6 text-left shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#BE123C]">
            <AlertCircle className="h-4 w-4" />
            <span>ACTION REQUIRED · INQUIRY PENDING</span>
          </div>

          {relatedIdeaTitle && (
            <span className="text-[11.5px] font-mono text-[#6B5845]">
              For: <strong className="text-[#1D2522]">{relatedIdeaTitle}</strong>
            </span>
          )}
        </div>

        <p className="text-[14.5px] text-[#1D2522] leading-relaxed font-medium">
          {actionMessage ||
            'A university research team has requested more technical details about your proposed approach.'}
        </p>

        <div className="flex items-center gap-3 flex-wrap pt-1">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#BE123C] hover:bg-[#9F1239] text-white text-[13px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Respond to Request</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          {relatedIdeaId && (
            <button
              type="button"
              onClick={() => navigate(`/ideas/${relatedIdeaId}`)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[13px] font-bold text-[#1D2522] transition-colors cursor-pointer"
            >
              <span>View Idea</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Response Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 text-left">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-[#EEEAE1] space-y-5">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-5 top-5 p-2 text-[#6B5845] hover:text-[#1D2522] rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {isDone ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="h-10 w-10 text-[#15803D] mx-auto" />
                <h4 className="text-[1.2rem] font-bold text-[#1D2522]">
                  Clarification Transmitted
                </h4>
                <p className="text-[13px] text-[#6B5845]">
                  The reviewing research team has been notified of your reply.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendReply} className="space-y-4">
                <div className="space-y-1 pr-6">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#BE123C]">
                    RESPOND TO TECHNICAL INQUIRY
                  </span>
                  <h3 className="text-[1.35rem] font-extrabold text-[#1D2522] font-sans">
                    Clarification on Proposed Approach
                  </h3>
                  <p className="text-[12.5px] text-[#6B5845]">Regarding: {relatedIdeaTitle}</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11.5px] font-mono font-bold uppercase text-[#123B2A] block">
                    Your Response / Technical Clarification *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Provide additional context regarding sensor specs, frequency filters, testing locations, or math models..."
                    className="w-full p-3.5 rounded-xl border border-[#EEEAE1] bg-white text-[13.5px] text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-[13px] font-semibold text-[#6B5845] hover:bg-[#FAF9F5] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13px] font-bold shadow-xs transition-all cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5 text-[#F5A623]" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Clarification'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
