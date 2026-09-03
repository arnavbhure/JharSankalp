import { Contributor } from '../../types/ideas';

interface ContributorStackProps {
  contributors: Contributor[];
  maxVisible?: number;
}

const BG_COLORS = [
  'bg-[#123B2A] text-white',
  'bg-[#F5A623] text-[#1D2522]',
  'bg-[#0284C7] text-white',
  'bg-[#15803D] text-white',
  'bg-[#9333EA] text-white',
];

export function ContributorStack({ contributors, maxVisible = 3 }: ContributorStackProps) {
  const visible = contributors.slice(0, maxVisible);
  const remaining = contributors.length - maxVisible;

  return (
    <div className="flex items-center gap-2 text-left">
      <div className="flex -space-x-2 overflow-hidden">
        {visible.map((c, i) => (
          <div
            key={c.id}
            title={`${c.name} (${c.role}${c.institution ? ` · ${c.institution}` : ''})`}
            className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-mono font-bold ring-2 ring-white shadow-2xs select-none ${
              BG_COLORS[i % BG_COLORS.length]
            }`}
          >
            {c.avatarInitials}
          </div>
        ))}

        {remaining > 0 && (
          <div
            title={`${remaining} more contributors`}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#FAF9F5] text-[10px] font-mono font-bold text-[#6B5845] ring-2 ring-white border border-[#EEEAE1]"
          >
            +{remaining}
          </div>
        )}
      </div>

      <span className="text-[12px] font-semibold text-[#6B5845]">
        <strong className="text-[#1D2522] font-bold">{contributors.length}</strong> Contributors
      </span>
    </div>
  );
}
