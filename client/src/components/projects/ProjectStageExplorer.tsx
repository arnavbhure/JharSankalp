interface StageOption {
  key: string;
  label: string;
  count: number;
}

interface ProjectStageExplorerProps {
  currentStage: string;
  onSelectStage: (stage: string) => void;
}

const STAGES: StageOption[] = [
  { key: 'ALL PROJECTS', label: 'All Projects', count: 18 },
  { key: 'DISCOVERY', label: 'Discovery', count: 2 },
  { key: 'DESIGN', label: 'Design', count: 3 },
  { key: 'PROTOTYPE', label: 'Prototype', count: 4 },
  { key: 'FIELD PILOT', label: 'Field Pilot', count: 6 },
  { key: 'IMPACT VERIFICATION', label: 'Impact Verification', count: 2 },
  { key: 'SCALING', label: 'Scaling', count: 1 },
];

export function ProjectStageExplorer({
  currentStage,
  onSelectStage,
}: ProjectStageExplorerProps) {
  return (
    <div className="border-b border-[#EEEAE1] bg-white py-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 scrollbar-none text-left">
          {STAGES.map((s) => {
            const isActive = currentStage === s.key;

            return (
              <button
                key={s.key}
                type="button"
                onClick={() => onSelectStage(s.key)}
                className={`py-3 px-3 sm:px-4 text-[13px] sm:text-[13.5px] transition-all relative whitespace-nowrap cursor-pointer flex items-center gap-2 group ${
                  isActive
                    ? 'text-[#123B2A] font-extrabold'
                    : 'text-[#6B5845] hover:text-[#1D2522] font-semibold'
                }`}
              >
                <span>{s.label}</span>
                <span
                  className={`text-[11px] font-mono px-1.5 py-0.5 rounded transition-colors ${
                    isActive
                      ? 'bg-[#123B2A] text-white font-bold'
                      : 'bg-[#FAF9F5] text-[#6B5845] group-hover:bg-[#EEEAE1]'
                  }`}
                >
                  {s.count < 10 ? `0${s.count}` : s.count}
                </span>

                {/* Underline indicator */}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#123B2A] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
