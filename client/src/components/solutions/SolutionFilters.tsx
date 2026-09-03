import { Search, Filter, X } from 'lucide-react';

interface SolutionFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  focusArea: string;
  onFocusAreaChange: (val: string) => void;
  district: string;
  onDistrictChange: (val: string) => void;
  stage: string;
  onStageChange: (val: string) => void;
  techType: string;
  onTechTypeChange: (val: string) => void;
  totalCount: number;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const FOCUS_AREAS = [
  'All Focus Areas',
  'Water Management',
  'Agriculture',
  'Mining Safety',
  'Healthcare',
  'Education',
  'Environment',
];

const DISTRICTS = [
  'All Districts',
  'Khunti',
  'Gumla',
  'Dhanbad',
  'West Singhbhum',
  'Dumka',
  'Latehar',
  'Ranchi',
  'Hazaribagh',
];

const STAGES = [
  'All Stages',
  'Research',
  'Prototype',
  'Testing',
  'Field Pilot',
  'Deployment',
  'Scaling',
];

const TECH_TYPES = [
  'All Technologies',
  'IoT + Sensors',
  'Agritech',
  'Sensors + Early Warning',
  'Diagnostic Hardware',
  'EdTech',
  'Environmental Tech',
];

export function SolutionFilters({
  search,
  onSearchChange,
  focusArea,
  onFocusAreaChange,
  district,
  onDistrictChange,
  stage,
  onStageChange,
  techType,
  onTechTypeChange,
  totalCount,
  onClearFilters,
  hasActiveFilters,
}: SolutionFiltersProps) {
  return (
    <div id="solutions-directory" className="space-y-4 text-left">
      {/* Section Title */}
      <div className="space-y-1">
        <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          PORTFOLIO REPOSITORY
        </span>
        <h2 className="text-[1.5rem] sm:text-[1.8rem] font-bold text-[#1D2522]">
          Explore Innovation Outcomes
        </h2>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B5845]/70" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search solutions, technologies or districts..."
          className="w-full h-13 pl-12 pr-10 rounded-2xl border border-[#EEEAE1] bg-white text-[14.5px] text-[#1D2522] placeholder:text-[#6B5845]/60 focus:outline-none focus:border-[#123B2A] shadow-2xs transition-colors"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B5845]/70 hover:text-[#1D2522] p-1 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase text-[#6B5845] mr-1">
            <Filter className="h-3.5 w-3.5 text-[#123B2A]" />
            <span className="hidden sm:inline">FILTERS:</span>
          </div>

          {/* Focus Area */}
          <select
            value={focusArea}
            onChange={(e) => onFocusAreaChange(e.target.value)}
            className="h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[12.5px] text-[#1D2522] font-medium focus:outline-none focus:border-[#123B2A] cursor-pointer shadow-2xs"
          >
            {FOCUS_AREAS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* District */}
          <select
            value={district}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[12.5px] text-[#1D2522] font-medium focus:outline-none focus:border-[#123B2A] cursor-pointer shadow-2xs"
          >
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Solution Stage */}
          <select
            value={stage}
            onChange={(e) => onStageChange(e.target.value)}
            className="h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[12.5px] text-[#1D2522] font-medium focus:outline-none focus:border-[#123B2A] cursor-pointer shadow-2xs"
          >
            {STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Technology Type */}
          <select
            value={techType}
            onChange={(e) => onTechTypeChange(e.target.value)}
            className="h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[12.5px] text-[#1D2522] font-medium focus:outline-none focus:border-[#123B2A] cursor-pointer shadow-2xs"
          >
            {TECH_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="text-[11.5px] font-mono font-bold text-[#BE123C] hover:underline cursor-pointer px-2 py-1"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Dynamic Result Count */}
        <div className="text-[12.5px] font-mono text-[#6B5845] shrink-0">
          Showing <strong className="text-[#1D2522] font-bold">{totalCount}</strong> solutions
        </div>
      </div>
    </div>
  );
}
