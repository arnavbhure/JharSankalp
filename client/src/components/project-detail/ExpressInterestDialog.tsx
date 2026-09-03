import { useState } from 'react';
import { ProjectDetail } from '../../types/projectDetail';
import { ExpressInterestFormData } from '../../types/projectDetail';
import { X, CheckCircle2, Send, Sparkles } from 'lucide-react';

interface ExpressInterestDialogProps {
  project: ProjectDetail;
  initialNeed?: string;
  onClose: () => void;
  onSubmit: (data: ExpressInterestFormData) => Promise<void>;
}

const CONTRIBUTION_AREAS = [
  'Technical Expertise',
  'Research Support',
  'Manufacturing',
  'Funding',
  'Field Implementation',
  'Data & Analytics',
  'Mentorship',
  'Infrastructure',
];

export function ExpressInterestDialog({
  project,
  initialNeed,
  onClose,
  onSubmit,
}: ExpressInterestDialogProps) {
  const [applicantName, setApplicantName] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('Industry Partner');
  const [contributionArea, setContributionArea] = useState(
    initialNeed || 'Technical Expertise'
  );
  const [message, setMessage] = useState('');
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !contact.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        applicantName,
        organization,
        role,
        contributionArea,
        message,
        contact,
      });
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 text-left">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[#EEEAE1] space-y-5">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 text-[#6B5845] hover:text-[#1D2522] rounded-lg transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="h-12 w-12 text-[#15803D] mx-auto" />
            <div className="space-y-1">
              <h3 className="text-[1.4rem] font-extrabold text-[#1D2522] font-sans">
                Interest Submitted
              </h3>
              <p className="text-[13.5px] text-[#6B5845] max-w-sm mx-auto leading-relaxed">
                The project lead at <strong>{project.leadInstitution}</strong> has been notified of your interest. You will be contacted regarding consortium integration.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#123B2A] text-white text-[13px] font-bold shadow-2xs cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1 pr-6">
              <div className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase text-[#B45309]">
                <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
                <span>CONSORTIUM PARTNERSHIP INQUIRY</span>
              </div>
              <h3 className="text-[1.4rem] font-extrabold text-[#1D2522] font-sans">
                Join Project Collaboration
              </h3>
              <p className="text-[12.5px] text-[#6B5845]">
                Target: {project.title}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Vikramaditya Sen"
                  className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[13px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                  Organization / Affiliation
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Adityapur MSME Cluster"
                  className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[13px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                  Role Type
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[12.5px] text-[#1D2522] focus:outline-none focus:border-[#123B2A] cursor-pointer"
                >
                  <option value="Industry Partner">Industry Partner</option>
                  <option value="Academic Researcher">Academic Researcher</option>
                  <option value="Startup / MSME">Startup / MSME</option>
                  <option value="Community Representative">Community Representative</option>
                  <option value="Other Specialist">Other Specialist</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                  Area of Contribution
                </label>
                <select
                  value={contributionArea}
                  onChange={(e) => setContributionArea(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[12.5px] text-[#1D2522] focus:outline-none focus:border-[#123B2A] cursor-pointer"
                >
                  {CONTRIBUTION_AREAS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                Email or Direct Contact Phone *
              </label>
              <input
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="e.g. vikram@adityapur-cluster.in / +91-9876543210"
                className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[13px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                Message / Proposed Support Offer
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe available infrastructure, test facilities, or specialized engineers your organization can commit..."
                className="w-full p-3 rounded-xl border border-[#EEEAE1] bg-white text-[13px] text-[#1D2522] focus:outline-none focus:border-[#123B2A] leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EEEAE1]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-[13px] font-semibold text-[#6B5845] hover:bg-[#FAF9F5] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13px] font-bold shadow-xs transition-all cursor-pointer disabled:opacity-60"
              >
                <Send className="h-3.5 w-3.5 text-[#F5A623]" />
                <span>{isSubmitting ? 'Transmitting...' : 'Submit Partnership Offer'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
