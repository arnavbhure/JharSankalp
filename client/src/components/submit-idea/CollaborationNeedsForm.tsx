import { Users, Sparkles, Check } from 'lucide-react';

interface CollaborationNeedsFormProps {
  collaborationNeeds: string[];
  additionalContext: string;
  contributorRole: string;
  organization: string;
  contributorName: string;
  contributorContact: string;
  onChange: (updates: {
    collaborationNeeds?: string[];
    additionalContext?: string;
    contributorRole?: string;
    organization?: string;
    contributorName?: string;
    contributorContact?: string;
  }) => void;
  errors?: Record<string, string>;
}

const NEED_OPTIONS = [
  'Technical Development',
  'Research Support',
  'Faculty Mentorship',
  'Industry Expertise',
  'Field Testing',
  'Prototype Development',
  'Funding',
  'Government Partnership',
  'Community Access',
  'Manufacturing Support',
];

const ROLES = [
  'Student',
  'Researcher',
  'Citizen',
  'Faculty',
  'Startup',
  'Industry Professional',
  'Government / Public Institution',
  'Other',
];

export function CollaborationNeedsForm({
  collaborationNeeds,
  additionalContext,
  contributorRole,
  organization,
  contributorName,
  contributorContact,
  onChange,
  errors = {},
}: CollaborationNeedsFormProps) {
  const toggleNeed = (need: string) => {
    if (collaborationNeeds.includes(need)) {
      onChange({ collaborationNeeds: collaborationNeeds.filter((n) => n !== need) });
    } else {
      onChange({ collaborationNeeds: [...collaborationNeeds, need] });
    }
  };

  return (
    <div className="space-y-7 text-left">
      {/* ── Step Intro ── */}
      <div className="space-y-1.5 border-b border-[#EEEAE1] pb-4">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <Sparkles className="h-4 w-4 text-[#F5A623]" />
          <span>STEP 05 · COLLABORATION & IDENTITY</span>
        </div>
        <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          What would help move this idea forward?
        </h2>
        <p className="text-[14.5px] text-[#6B5845] leading-relaxed max-w-2xl">
          Great ideas often need expertise, resources, and institutional partnerships to become real solutions.
        </p>
      </div>

      {/* ── Multi-select Capabilities ── */}
      <div className="space-y-2.5">
        <label className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A] block">
          Select Capability Needs (Select all that apply)
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {NEED_OPTIONS.map((opt) => {
            const isSelected = collaborationNeeds.includes(opt);

            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleNeed(opt)}
                className={`p-3.5 rounded-xl border transition-all text-left flex items-center justify-between gap-2 cursor-pointer ${
                  isSelected
                    ? 'border-[#123B2A] bg-[#FFFDF9] text-[#123B2A] font-bold shadow-2xs'
                    : 'border-[#EEEAE1] bg-white text-[#1D2522] hover:border-[#123B2A]/40'
                }`}
              >
                <span className="text-[13px] leading-snug">{opt}</span>
                <div
                  className={`h-4 w-4 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? 'border-[#123B2A] bg-[#123B2A] text-white'
                      : 'border-[#EEEAE1] bg-[#FAF9F5]'
                  }`}
                >
                  {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Additional Context Textarea ── */}
      <div className="space-y-1.5">
        <label className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A] block">
          Is there anything specific you&apos;re looking for?
        </label>
        <textarea
          rows={3}
          value={additionalContext}
          onChange={(e) => onChange({ additionalContext: e.target.value })}
          placeholder="e.g. Looking for an engineering mentor with experience in low-power LoRa firmware and PCB fabrication..."
          className="w-full p-3.5 rounded-xl border border-[#EEEAE1] bg-white text-[13.5px] text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] leading-relaxed transition-all"
        />
      </div>

      {/* ── Contributor Information ── */}
      <div className="pt-4 border-t border-[#EEEAE1] space-y-4">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <Users className="h-4 w-4" />
          <span>CONTRIBUTOR IDENTITY</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A] block">
              Your Primary Role *
            </label>
            <select
              required
              value={contributorRole}
              onChange={(e) => onChange({ contributorRole: e.target.value })}
              className={`w-full h-11 px-3.5 rounded-xl border bg-white text-[13.5px] text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] cursor-pointer ${
                errors.contributorRole ? 'border-[#BE123C]' : 'border-[#EEEAE1]'
              }`}
            >
              <option value="">Select your role...</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {errors.contributorRole && (
              <p className="text-[11.5px] text-[#BE123C] font-mono">{errors.contributorRole}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A] block">
              Affiliation / Organization (Optional)
            </label>
            <input
              type="text"
              value={organization}
              onChange={(e) => onChange({ organization: e.target.value })}
              placeholder="e.g. BIT Sindri / Ranchi Makerspace / Self"
              className="w-full h-11 px-3.5 rounded-xl border border-[#EEEAE1] bg-white text-[13.5px] text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A] block">
              Your Full Name
            </label>
            <input
              type="text"
              value={contributorName}
              onChange={(e) => onChange({ contributorName: e.target.value })}
              placeholder="e.g. Arjun Kumar"
              className="w-full h-11 px-3.5 rounded-xl border border-[#EEEAE1] bg-white text-[13.5px] text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A] block">
              Email or Contact Handle
            </label>
            <input
              type="text"
              value={contributorContact}
              onChange={(e) => onChange({ contributorContact: e.target.value })}
              placeholder="e.g. arjun@domain.in"
              className="w-full h-11 px-3.5 rounded-xl border border-[#EEEAE1] bg-white text-[13.5px] text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
