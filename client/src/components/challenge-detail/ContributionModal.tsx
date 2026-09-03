import { useState } from 'react';
import { X, CheckCircle2, Lightbulb, Users, Send } from 'lucide-react';
import { ChallengeDetailData } from '../../types/challengeDetail';

interface ContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'idea' | 'collaboration';
  challenge: ChallengeDetailData;
}

export function ContributionModal({ isOpen, onClose, mode, challenge }: ContributionModalProps) {
  const [role, setRole] = useState('Faculty / Researcher');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setOrganization('');
    setEmail('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs text-left animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-[#6B5845] hover:bg-[#F8F6F1] hover:text-[#1D2522] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          /* Submission Confirmation */
          <div className="py-8 text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F0FDF4] text-[#15803D] mx-auto">
              <CheckCircle2 className="h-9 w-9 stroke-[2]" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-[1.4rem] font-bold text-[#1D2522] font-sans">
                {mode === 'idea'
                  ? 'Idea Registered Successfully!'
                  : 'Collaboration Request Logged!'}
              </h3>
              <p className="text-[14px] text-[#6B5845] max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{name || 'Contributor'}</strong>. Your submission for{' '}
                <strong>{challenge.id}</strong> has been routed to the technical working group at
                IIT (ISM) Dhanbad and the State Innovation Cell.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 rounded-lg bg-[#123B2A] text-white font-bold text-[14px] hover:bg-[#0D2B1E] transition-all cursor-pointer shadow-xs"
              >
                Return to Case Dossier
              </button>
            </div>
          </div>
        ) : (
          /* Input Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                {mode === 'idea' ? (
                  <Lightbulb className="h-3.5 w-3.5 text-[#F5A623]" />
                ) : (
                  <Users className="h-3.5 w-3.5 text-[#123B2A]" />
                )}
                <span>
                  {mode === 'idea'
                    ? 'Submit Solution Hypothesis'
                    : 'Join Multi-Disciplinary Consortium'}
                </span>
              </div>
              <h3 className="text-[1.35rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
                {mode === 'idea'
                  ? 'Contribute an Idea or Approach'
                  : 'Join Working Group on Subsidence Risk'}
              </h3>
              <p className="text-[13px] text-[#6B5845]">
                {challenge.id} · {challenge.title}
              </p>
            </div>

            {/* Stakeholder Role */}
            <div className="space-y-1 text-left">
              <label className="text-[12px] font-mono font-bold text-[#6B5845] uppercase">
                Your Primary Capacity / Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-11 px-3.5 rounded-lg border border-[#EEEAE1] bg-white text-[13.5px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
              >
                <option value="Faculty / Researcher">Faculty / University Researcher</option>
                <option value="Student Innovator">Student Innovator / Engineer</option>
                <option value="Industry Specialist">Industry / MSME Hardware Specialist</option>
                <option value="Geospatial Specialist">Geospatial / GIS Analyst</option>
                <option value="Community Representative">
                  Local Resident / Community Representative
                </option>
                <option value="NGO / Civil Society">Civil Society / NGO Member</option>
              </select>
            </div>

            {/* Name & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div className="space-y-1">
                <label className="text-[12px] font-mono font-bold text-[#6B5845] uppercase">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Ramesh Kumar"
                  className="w-full h-10 px-3.5 rounded-lg border border-[#EEEAE1] bg-white text-[13.5px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[12px] font-mono font-bold text-[#6B5845] uppercase">
                  Institutional Affiliation
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. BIT Sindri / Tech Startup"
                  className="w-full h-10 px-3.5 rounded-lg border border-[#EEEAE1] bg-white text-[13.5px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1 text-left">
              <label className="text-[12px] font-mono font-bold text-[#6B5845] uppercase">
                Contact Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.name@institution.edu.in"
                className="w-full h-10 px-3.5 rounded-lg border border-[#EEEAE1] bg-white text-[13.5px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
              />
            </div>

            {/* Proposal / Contribution Description */}
            <div className="space-y-1 text-left">
              <label className="text-[12px] font-mono font-bold text-[#6B5845] uppercase">
                {mode === 'idea'
                  ? 'Proposed Hypothesis or Technical Concept *'
                  : 'How would you or your team like to contribute? *'}
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  mode === 'idea'
                    ? 'Outline your technical or community mechanism, sensor approach, or analytical method...'
                    : 'Detail testing equipment, telemetry software, student manpower, or field inspection capabilities you can deploy...'
                }
                className="w-full p-3 rounded-lg border border-[#EEEAE1] bg-white text-[13.5px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2.5 rounded-lg border border-[#EEEAE1] text-[13.5px] font-medium text-[#1D2522] hover:bg-[#F8F6F1] transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13.5px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <Send className="h-3.5 w-3.5 text-[#F5A623]" />
                <span>Submit to Working Group</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
