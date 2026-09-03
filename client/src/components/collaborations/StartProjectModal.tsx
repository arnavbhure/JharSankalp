import { useState } from 'react';
import { X, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { CollaborationProject } from '../../types/collaborations';

interface StartProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (
    newProj: Omit<CollaborationProject, 'id' | 'teamCount' | 'progress' | 'stage'>,
  ) => void;
}

const FOCUS_AREAS = [
  'Agriculture',
  'Education',
  'Healthcare',
  'Environment',
  'Livelihoods',
  'Water Management',
  'Mining Safety',
];

const DISTRICTS = [
  'Ranchi',
  'Dhanbad',
  'Dumka',
  'Hazaribagh',
  'Bokaro',
  'West Singhbhum',
  'Khunti',
  'Latehar',
];

export function StartProjectModal({ isOpen, onClose, onCreateProject }: StartProjectModalProps) {
  const [title, setTitle] = useState('');
  const [relatedIdea, setRelatedIdea] = useState('');
  const [focusArea, setFocusArea] = useState(FOCUS_AREAS[0]);
  const [district, setDistrict] = useState(DISTRICTS[0]);
  const [description, setDescription] = useState('');
  const [skillsString, setSkillsString] = useState('');
  const [leadOrg, setLeadOrg] = useState('Citizen Consortium');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'Please enter a project title';
    if (!relatedIdea.trim()) errs.relatedIdea = 'Please specify related challenge or idea';
    if (!description.trim()) errs.description = 'Please describe the project scope';
    if (!skillsString.trim()) errs.skillsString = 'Please list at least one required skill';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const skills = skillsString
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onCreateProject({
      title: title.trim(),
      description: description.trim(),
      focusArea,
      district,
      skillsNeeded: skills.length > 0 ? skills : ['General Collaboration'],
      leadOrg: leadOrg.trim() || 'Community Team',
      linkedChallenge: relatedIdea.trim(),
      avatars: ['YOU'],
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setTitle('');
      setRelatedIdea('');
      setDescription('');
      setSkillsString('');
      setErrors({});
      onClose();
    }, 1500);
  };

  const handleAutofill = () => {
    setTitle('Solar-Powered Cold Storage for Small Farmers');
    setRelatedIdea('Post-Harvest Vegetable Spoilage Mitigation');
    setFocusArea('Agriculture');
    setDistrict('Latehar');
    setDescription(
      'Forming a prototyping team to assemble and field-test modular evaporative cooling lockers powered by 500W rooftop solar panels.',
    );
    setSkillsString('Thermal Engineering, IoT Telemetry, Solar Hardware');
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl rounded-3xl bg-white border border-[#EEEAE1] shadow-2xl p-6 sm:p-8 space-y-6 text-left max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A] block">
              INITIATIVE WORKSPACE
            </span>
            <h3 className="text-[1.35rem] font-bold text-[#1D2522]">
              Create a Collaboration Project
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAutofill}
              className="text-[11px] font-mono font-bold text-[#B45309] bg-[#FFFBEB] hover:bg-[#FEF3C7] px-2 py-1 rounded border border-[#FDE68A] cursor-pointer"
              title="Quick demo autofill"
            >
              Autofill
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 rounded-full bg-[#FAF9F5] border border-[#EEEAE1] flex items-center justify-center text-[#6B5845] hover:text-[#1D2522] cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {success ? (
          <div className="py-10 text-center space-y-3">
            <div className="h-14 w-14 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="text-[1.25rem] font-bold text-[#1D2522]">Project Workspace Created!</h4>
            <p className="text-[13px] text-[#6B5845] max-w-sm mx-auto">
              Your initiative is now open for collaborators, student researchers, and institutions
              across Jharkhand.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-[13px]">
            {/* Project Name */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                Project Name *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Smart Irrigation for Small Farmers"
                className={`w-full h-11 px-3.5 rounded-xl border text-[13.5px] focus:outline-none transition-colors ${
                  errors.title
                    ? 'border-[#BE123C] bg-[#FFF5F5]'
                    : 'border-[#EEEAE1] focus:border-[#123B2A]'
                }`}
              />
              {errors.title && (
                <span className="text-[11px] text-[#BE123C] flex items-center gap-1 font-mono">
                  <AlertCircle className="h-3 w-3" /> {errors.title}
                </span>
              )}
            </div>

            {/* Related Challenge / Idea */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                Related Challenge / Idea *
              </label>
              <input
                type="text"
                value={relatedIdea}
                onChange={(e) => setRelatedIdea(e.target.value)}
                placeholder="e.g. JS-2026-00019 Post-Harvest Storage"
                className={`w-full h-11 px-3.5 rounded-xl border text-[13.5px] focus:outline-none transition-colors ${
                  errors.relatedIdea
                    ? 'border-[#BE123C] bg-[#FFF5F5]'
                    : 'border-[#EEEAE1] focus:border-[#123B2A]'
                }`}
              />
              {errors.relatedIdea && (
                <span className="text-[11px] text-[#BE123C] flex items-center gap-1 font-mono">
                  <AlertCircle className="h-3 w-3" /> {errors.relatedIdea}
                </span>
              )}
            </div>

            {/* Focus Area & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                  Focus Area *
                </label>
                <select
                  value={focusArea}
                  onChange={(e) => setFocusArea(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[13px] text-[#1D2522] focus:outline-none focus:border-[#123B2A] cursor-pointer"
                >
                  {FOCUS_AREAS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                  District *
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[13px] text-[#1D2522] focus:outline-none focus:border-[#123B2A] cursor-pointer"
                >
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Project Description */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                Project Description *
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is the objective, timeline, and expected prototype or pilot outcome?"
                className={`w-full p-3.5 rounded-xl border text-[13px] focus:outline-none transition-colors leading-relaxed ${
                  errors.description
                    ? 'border-[#BE123C] bg-[#FFF5F5]'
                    : 'border-[#EEEAE1] focus:border-[#123B2A]'
                }`}
              />
              {errors.description && (
                <span className="text-[11px] text-[#BE123C] flex items-center gap-1 font-mono">
                  <AlertCircle className="h-3 w-3" /> {errors.description}
                </span>
              )}
            </div>

            {/* Skills Needed */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                Skills Needed * (comma-separated)
              </label>
              <input
                type="text"
                value={skillsString}
                onChange={(e) => setSkillsString(e.target.value)}
                placeholder="e.g. Agriculture Research, IoT Sensors, Firmware Dev"
                className={`w-full h-11 px-3.5 rounded-xl border text-[13px] focus:outline-none transition-colors ${
                  errors.skillsString
                    ? 'border-[#BE123C] bg-[#FFF5F5]'
                    : 'border-[#EEEAE1] focus:border-[#123B2A]'
                }`}
              />
              {errors.skillsString && (
                <span className="text-[11px] text-[#BE123C] flex items-center gap-1 font-mono">
                  <AlertCircle className="h-3 w-3" /> {errors.skillsString}
                </span>
              )}
            </div>

            {/* Lead Organization / Team */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase text-[#6B5845] block">
                Lead Organization or Initiator
              </label>
              <input
                type="text"
                value={leadOrg}
                onChange={(e) => setLeadOrg(e.target.value)}
                placeholder="e.g. BIT Mesra / Rural Youth Lab"
                className="w-full h-10 px-3.5 rounded-xl border border-[#EEEAE1] text-[13px] focus:outline-none focus:border-[#123B2A]"
              />
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#EEEAE1] flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-[#EEEAE1] hover:bg-[#FAF9F5] text-[#1D2522] text-[13px] font-semibold transition-all cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <Send className="h-3.5 w-3.5 text-[#F5A623]" />
                <span>Create Collaboration</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
