import { useState } from 'react';
import { IdeaStageType, SupportingMaterial } from '../../types/ideaSubmission';
import { GitBranch, Check, Paperclip, Plus, Trash2 } from 'lucide-react';

interface ReadinessSelectorProps {
  selectedStage: IdeaStageType;
  onSelectStage: (stage: IdeaStageType) => void;
  supportingMaterials: SupportingMaterial[];
  onAddMaterial: (material: SupportingMaterial) => void;
  onRemoveMaterial: (id: string) => void;
}

const STAGES: { stage: IdeaStageType; title: string; desc: string }[] = [
  {
    stage: 'CONCEPT',
    title: 'Concept',
    desc: 'An early idea or possible approach that needs initial refinement.',
  },
  {
    stage: 'RESEARCH',
    title: 'Research',
    desc: 'The problem or solution has been explored through academic literature or fieldwork.',
  },
  {
    stage: 'PROTOTYPE',
    title: 'Prototype',
    desc: 'An initial working version, hardware circuit, or digital proof of concept exists.',
  },
  {
    stage: 'TESTING',
    title: 'Testing',
    desc: 'The solution is currently undergoing bench or laboratory validation tests.',
  },
  {
    stage: 'PILOT',
    title: 'Pilot',
    desc: 'The solution is being trialed in a real-world village or community environment.',
  },
  {
    stage: 'IMPLEMENTED',
    title: 'Implemented',
    desc: 'The solution is actively deployed and operational in one or more locations.',
  },
];

export function ReadinessSelector({
  selectedStage,
  onSelectStage,
  supportingMaterials,
  onAddMaterial,
  onRemoveMaterial,
}: ReadinessSelectorProps) {
  const [materialName, setMaterialName] = useState('');
  const [materialType, setMaterialType] = useState<SupportingMaterial['type']>('Document');
  const [materialUrl, setMaterialUrl] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!materialName.trim()) return;

    onAddMaterial({
      id: `mat-${Date.now()}`,
      name: materialName,
      type: materialType,
      url: materialUrl || undefined,
      fileSize: 'Mock Reference',
    });

    setMaterialName('');
    setMaterialUrl('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-7 text-left">
      {/* ── Step Intro ── */}
      <div className="space-y-1.5 border-b border-[#EEEAE1] pb-4">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <GitBranch className="h-4 w-4 text-[#F5A623]" />
          <span>STEP 04 · MATURITY LEVEL</span>
        </div>
        <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          How far has this idea progressed?
        </h2>
        <p className="text-[14.5px] text-[#6B5845] leading-relaxed max-w-2xl">
          Be honest about the current stage. Ideas at every level—from early hypotheses to working prototypes—are welcome in the ecosystem.
        </p>
      </div>

      {/* ── Structured Selectable Rows ── */}
      <div className="space-y-2.5">
        {STAGES.map((s, idx) => {
          const isSelected = selectedStage === s.stage;

          return (
            <div
              key={s.stage}
              onClick={() => onSelectStage(s.stage)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 text-left ${
                isSelected
                  ? 'border-2 border-[#123B2A] bg-[#FFFDF9] shadow-xs'
                  : 'border-[#EEEAE1] bg-white hover:border-[#123B2A]/40 shadow-2xs'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-xl text-[11px] font-mono font-bold shrink-0 ${
                    isSelected
                      ? 'bg-[#123B2A] text-[#F5A623]'
                      : 'bg-[#FAF9F5] text-[#6B5845] border border-[#EEEAE1]'
                  }`}
                >
                  0{idx + 1}
                </span>

                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-[14px] font-bold text-[#1D2522] leading-tight">
                    {s.title}
                  </h4>
                  <p className="text-[12.5px] text-[#6B5845] leading-snug">
                    {s.desc}
                  </p>
                </div>
              </div>

              <div
                className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                  isSelected
                    ? 'border-[#123B2A] bg-[#123B2A] text-white'
                    : 'border-[#EEEAE1] bg-white'
                }`}
              >
                {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Evidence & Supporting Material (Optional) ── */}
      <div className="pt-4 border-t border-[#EEEAE1] space-y-4">
        <div className="space-y-1">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            SUPPORTING EVIDENCE (OPTIONAL)
          </div>
          <h3 className="text-[1.1rem] font-bold text-[#1D2522]">
            Do you have anything that supports your idea?
          </h3>
          <p className="text-[13px] text-[#6B5845]">
            Attach research links, draft diagrams, GitHub repos, or PDF presentations.
          </p>
        </div>

        {/* Existing Materials List */}
        {supportingMaterials.length > 0 && (
          <div className="space-y-2">
            {supportingMaterials.map((mat) => (
              <div
                key={mat.id}
                className="p-3 rounded-xl bg-white border border-[#EEEAE1] flex items-center justify-between gap-3 text-[13px]"
              >
                <div className="flex items-center gap-2 truncate">
                  <Paperclip className="h-3.5 w-3.5 text-[#123B2A] shrink-0" />
                  <span className="font-bold text-[#1D2522] truncate">{mat.name}</span>
                  <span className="text-[11px] font-mono text-[#6B5845]">({mat.type})</span>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveMaterial(mat.id)}
                  className="text-[#BE123C] hover:text-[#9F1239] p-1 cursor-pointer shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Material Trigger / Form */}
        {showAddForm ? (
          <form
            onSubmit={handleAdd}
            className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A]">
                  Resource Title *
                </label>
                <input
                  type="text"
                  required
                  value={materialName}
                  onChange={(e) => setMaterialName(e.target.value)}
                  placeholder="e.g. Lab Vibration Spectrum Report"
                  className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[13px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A]">
                  Resource Type
                </label>
                <select
                  value={materialType}
                  onChange={(e) =>
                    setMaterialType(e.target.value as SupportingMaterial['type'])
                  }
                  className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[13px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
                >
                  <option value="Research">Research</option>
                  <option value="Prototype Link">Prototype Link</option>
                  <option value="Presentation">Presentation</option>
                  <option value="Document">Document</option>
                  <option value="Image">Image</option>
                  <option value="Video">Video</option>
                  <option value="Other Reference">Other Reference</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A]">
                External Link or Drive URL (Optional)
              </label>
              <input
                type="url"
                value={materialUrl}
                onChange={(e) => setMaterialUrl(e.target.value)}
                placeholder="https://..."
                className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[13px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 rounded-lg text-[12px] font-semibold text-[#6B5845] hover:bg-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-[#123B2A] text-white text-[12px] font-bold shadow-2xs cursor-pointer"
              >
                Attach Reference
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[13px] font-bold text-[#123B2A] shadow-2xs cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Supporting Material</span>
          </button>
        )}
      </div>
    </div>
  );
}
