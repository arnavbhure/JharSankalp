import { useState, useEffect } from 'react';
import { X, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { CollaborationOpportunity } from '../../types/ideaDetail';

interface ContributionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  ideaTitle: string;
  preselectedNeed?: CollaborationOpportunity | null;
}

const CONTRIBUTION_TYPES = [
  'Technical Expertise',
  'Research Support',
  'Mentorship',
  'Field Testing',
  'Funding',
  'Industry Partnership',
  'Other',
];

export function ContributionDialog({
  isOpen,
  onClose,
  ideaTitle,
  preselectedNeed,
}: ContributionDialogProps) {
  const [selectedType, setSelectedType] = useState('Technical Expertise');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [experienceMessage, setExperienceMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (preselectedNeed) {
      const cat = preselectedNeed.category.toLowerCase();
      if (cat.includes('hardware') || cat.includes('engineering')) {
        setSelectedType('Technical Expertise');
      } else if (cat.includes('testing')) {
        setSelectedType('Field Testing');
      } else if (cat.includes('mentor')) {
        setSelectedType('Mentorship');
      } else if (cat.includes('fund')) {
        setSelectedType('Funding');
      }
    }
  }, [preselectedNeed]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !experienceMessage.trim()) return;

    setIsSubmitting(true);
    try {
      // Simulate API network latency
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFullName('');
        setEmail('');
        setExperienceMessage('');
      }, 1800);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 text-left">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[#EEEAE1] space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 text-[#6B5845] hover:text-[#1D2522] rounded-lg transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {isSuccess ? (
          <div className="py-10 text-center space-y-3 animate-in zoom-in-95">
            <CheckCircle2 className="h-12 w-12 text-[#15803D] mx-auto" />
            <h3 className="text-[1.4rem] font-bold text-[#1D2522] font-sans">
              Contribution Request Sent!
            </h3>
            <p className="text-[14px] text-[#6B5845] max-w-sm mx-auto">
              The project team has received your details and message. They will reach out to coordinate next steps.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1 pr-6">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
                <span>COLLABORATION PROPOSAL</span>
              </div>
              <h3 className="text-[1.5rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
                How would you like to contribute?
              </h3>
              <p className="text-[13px] text-[#6B5845]">
                For: <strong className="text-[#1D2522]">{ideaTitle}</strong>
              </p>
            </div>

            {/* Contribution Type Chips */}
            <div className="space-y-1.5">
              <label className="text-[11.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A] block">
                Select Contribution Type *
              </label>
              <div className="flex flex-wrap gap-2">
                {CONTRIBUTION_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1.5 rounded-lg text-[12.5px] font-semibold transition-all cursor-pointer ${
                      selectedType === type
                        ? 'bg-[#123B2A] text-white shadow-2xs font-bold'
                        : 'bg-[#FAF9F5] text-[#1D2522] border border-[#EEEAE1] hover:border-[#123B2A]/40'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A] block">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Anand Murmu"
                  className="w-full h-11 px-3.5 rounded-xl border border-[#EEEAE1] bg-white text-[14px] text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A] block">
                  Email or Phone *
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. anand@domain.in"
                  className="w-full h-11 px-3.5 rounded-xl border border-[#EEEAE1] bg-white text-[14px] text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A]"
                />
              </div>
            </div>

            {/* Tell the team about your experience */}
            <div className="space-y-1.5">
              <label className="text-[11.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A] block">
                Tell the team about your experience *
              </label>
              <textarea
                rows={4}
                required
                value={experienceMessage}
                onChange={(e) => setExperienceMessage(e.target.value)}
                placeholder="Mention your technical skills, laboratory capabilities, organizational affiliation, or how you want to test/support this project..."
                className="w-full p-3.5 rounded-xl border border-[#EEEAE1] bg-white text-[13.5px] text-[#1D2522] placeholder:text-[#6B5845]/50 shadow-2xs focus:outline-none focus:border-[#123B2A] leading-relaxed"
              />
            </div>

            {/* Modal Buttons */}
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
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13.5px] font-bold shadow-xs transition-all cursor-pointer"
              >
                <Send className="h-3.5 w-3.5 text-[#F5A623]" />
                <span>{isSubmitting ? 'Transmitting...' : 'Send Contribution Request'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
