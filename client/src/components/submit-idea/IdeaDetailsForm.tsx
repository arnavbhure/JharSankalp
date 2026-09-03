import { Lightbulb, Info } from 'lucide-react';

interface IdeaDetailsFormProps {
  title: string;
  summary: string;
  coreIdea: string;
  whyThisHelps: string;
  onChange: (updates: {
    title?: string;
    summary?: string;
    coreIdea?: string;
    whyThisHelps?: string;
  }) => void;
  errors?: Record<string, string>;
}

export function IdeaDetailsForm({
  title,
  summary,
  coreIdea,
  whyThisHelps,
  onChange,
  errors = {},
}: IdeaDetailsFormProps) {
  const summaryCharsLeft = 300 - summary.length;

  return (
    <div className="space-y-6 text-left">
      {/* ── Step Intro ── */}
      <div className="space-y-1.5 border-b border-[#EEEAE1] pb-4">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <Lightbulb className="h-4 w-4 text-[#F5A623]" />
          <span>STEP 02 · CORE HYPOTHESIS</span>
        </div>
        <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Tell us about your idea.
        </h2>
        <p className="text-[14.5px] text-[#6B5845] leading-relaxed max-w-2xl">
          You don&apos;t need a complete solution yet. Explain the direction you believe could help solve the challenge.
        </p>
      </div>

      <div className="space-y-5">
        {/* Field 1: Idea Title */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A] flex items-center justify-between">
            <span>Idea Title *</span>
            <span className="text-[11px] font-normal text-[#6B5845]">Clear & descriptive</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="e.g. Low-Cost IoT Monitoring for Rural Water Pumps"
            className={`w-full h-12 px-4 rounded-xl border bg-white text-[14px] text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] transition-all ${
              errors.title ? 'border-[#BE123C]' : 'border-[#EEEAE1]'
            }`}
          />
          {errors.title && (
            <p className="text-[11.5px] text-[#BE123C] font-mono">{errors.title}</p>
          )}
        </div>

        {/* Field 2: Short Summary */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
              Short Summary *
            </label>
            <span
              className={`text-[11px] font-mono ${
                summaryCharsLeft < 0 ? 'text-[#BE123C] font-bold' : 'text-[#6B5845]'
              }`}
            >
              {summaryCharsLeft} characters left
            </span>
          </div>
          <textarea
            rows={2}
            required
            maxLength={300}
            value={summary}
            onChange={(e) => onChange({ summary: e.target.value })}
            placeholder="Describe the idea in one or two clear sentences (maximum 300 characters)..."
            className={`w-full p-3.5 rounded-xl border bg-white text-[13.5px] text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] leading-relaxed transition-all ${
              errors.summary ? 'border-[#BE123C]' : 'border-[#EEEAE1]'
            }`}
          />
          {errors.summary && (
            <p className="text-[11.5px] text-[#BE123C] font-mono">{errors.summary}</p>
          )}
        </div>

        {/* Field 3: The Core Idea */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            The Core Idea *
          </label>
          <div className="flex items-center gap-1.5 text-[11.5px] text-[#6B5845] bg-[#FAF9F5] p-2.5 rounded-lg border border-[#EEEAE1]">
            <Info className="h-3.5 w-3.5 text-[#123B2A] shrink-0" />
            <span>Describe the main concept without worrying about technical perfection.</span>
          </div>
          <textarea
            rows={4}
            required
            value={coreIdea}
            onChange={(e) => onChange({ coreIdea: e.target.value })}
            placeholder="What is the solution you are proposing? How does it interact with the physical or community environment?"
            className={`w-full p-3.5 rounded-xl border bg-white text-[13.5px] text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] leading-relaxed transition-all ${
              errors.coreIdea ? 'border-[#BE123C]' : 'border-[#EEEAE1]'
            }`}
          />
          {errors.coreIdea && (
            <p className="text-[11.5px] text-[#BE123C] font-mono">{errors.coreIdea}</p>
          )}
        </div>

        {/* Field 4: Why This Could Help */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            Why This Could Help
          </label>
          <textarea
            rows={3}
            value={whyThisHelps}
            onChange={(e) => onChange({ whyThisHelps: e.target.value })}
            placeholder="Why do you think this approach could improve the situation over existing methods?"
            className="w-full p-3.5 rounded-xl border border-[#EEEAE1] bg-white text-[13.5px] text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] leading-relaxed transition-all"
          />
        </div>
      </div>
    </div>
  );
}
