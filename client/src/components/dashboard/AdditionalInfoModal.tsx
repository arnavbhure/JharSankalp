import { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { UserChallenge } from '../../types/citizenDashboard';

interface AdditionalInfoModalProps {
  challenge: UserChallenge;
  isOpen: boolean;
  onClose: () => void;
  onSubmitResponse: (challengeId: string, responseText: string) => Promise<void>;
}

export function AdditionalInfoModal({
  challenge,
  isOpen,
  onClose,
  onSubmitResponse,
}: AdditionalInfoModalProps) {
  const [response, setResponse] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!response.trim()) return;

    setSubmitting(true);
    try {
      await onSubmitResponse(challenge.id, response);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setResponse('');
        onClose();
      }, 1800);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-7 shadow-2xl border border-[#EEEAE1] text-left space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-[#6B5845] hover:text-[#1D2522] rounded-lg transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 pr-6">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#B45309]">
            <MessageSquare className="h-3.5 w-3.5 text-[#F5A623]" />
            <span>REVIEWER INQUIRY RESPONSE</span>
          </div>
          <h3 className="text-[1.35rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Provide Additional Field Information
          </h3>
          <p className="text-[13px] text-[#6B5845]">
            For Challenge: <strong className="text-[#1D2522]">{challenge.title}</strong>
          </p>
        </div>

        {/* Reviewer's Question */}
        <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[13.5px] text-[#92400E] space-y-1.5">
          <span className="text-[11px] font-mono uppercase font-bold text-[#B45309] block">
            Question from {challenge.actionRequired?.reviewerRole || 'Review Team'}:
          </span>
          <p className="font-semibold leading-relaxed">
            &ldquo;{challenge.actionRequired?.question}&rdquo;
          </p>
        </div>

        {success ? (
          <div className="p-6 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-center space-y-2 animate-in zoom-in-95">
            <CheckCircle2 className="h-9 w-9 text-[#15803D] mx-auto" />
            <h4 className="text-[15px] font-bold text-[#15803D]">
              Information Transmitted Successfully!
            </h4>
            <p className="text-[12.5px] text-[#166534]">
              Thank you. The reviewing panel has been notified and will update your dossier within
              24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[12.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                Your Response & Ground Observations:
              </label>
              <textarea
                rows={4}
                required
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Example: The 4 handpumps fail almost every week due to high silt in the intake. During daytime peaks between 7 AM and 11 AM, around 450 households queue for hours..."
                className="w-full p-3.5 rounded-xl border border-[#EEEAE1] bg-white text-[14px] text-[#1D2522] placeholder:text-[#6B5845]/50 shadow-2xs focus:outline-none focus:border-[#123B2A] focus:ring-1 focus:ring-[#123B2A] transition-all leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-[13px] font-semibold text-[#6B5845] hover:bg-[#FAF9F5] transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting || !response.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13.5px] font-bold shadow-xs transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                <Send className="h-3.5 w-3.5 text-[#F5A623]" />
                <span>{submitting ? 'Sending...' : 'Send Information'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
