import { Search, X, RotateCcw } from 'lucide-react';
import { IdeaFilterState } from '../../types/ideas';
import { JHARKHAND_DISTRICTS } from '../../data/challengesData';

interface IdeaFiltersProps {
  filters: IdeaFilterState;
  onChange: (updates: Partial<IdeaFilterState>) => void;
  onReset: () => void;
  totalResults: number;
}

const CATEGORIES = [
  'All Focus Areas',
  'Water Management',
  'Agriculture',
  'Mining Safety',
  'Education',
  'Healthcare',
  'Environment',
  'Livelihoods',
];

const STAGES = [
  'All Stages',
  'Concept',
  'Research',
  'Prototype',
  'Testing',
  'Pilot',
  'Implemented',
];

const STATUSES = [
  'All Statuses',
  'Open for Contributors',
  'Team Formed',
  'Seeking Partners',
  'Completed',
];

export function IdeaFilters({
  filters,
  onChange,
  onReset,
  totalResults,
}: IdeaFiltersProps) {
  const isFiltered =
    Boolean(filters.search) ||
    filters.category !== 'All Focus Areas' ||
    filters.stage !== 'All Stages' ||
    filters.district !== 'All Districts' ||
    filters.status !== 'All Statuses';

  return (
    <div className="space-y-4 text-left">
      {/* Search Bar + Primary Filters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B5845]" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Search ideas, technologies, sensors, or challenges..."
            className="w-full h-12 pl-11 pr-10 rounded-xl border border-[#EEEAE1] bg-white text-[14px] text-[#1D2522] placeholder:text-[#6B5845]/50 shadow-2xs focus:outline-none focus:border-[#123B2A] focus:ring-1 focus:ring-[#123B2A] transition-all"
          />
          {filters.search && (
            <button
              onClick={() => onChange({ search: '' })}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#6B5845] hover:text-[#1D2522] cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Focus Area */}
          <select
            value={filters.category}
            onChange={(e) => onChange({ category: e.target.value })}
            className="h-12 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[13px] font-semibold text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] cursor-pointer transition-all truncate"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Development Stage */}
          <select
            value={filters.stage}
            onChange={(e) => onChange({ stage: e.target.value })}
            className="h-12 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[13px] font-semibold text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] cursor-pointer transition-all truncate"
          >
            {STAGES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          {/* District */}
          <select
            value={filters.district}
            onChange={(e) => onChange({ district: e.target.value })}
            className="h-12 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[13px] font-semibold text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] cursor-pointer transition-all truncate"
          >
            {JHARKHAND_DISTRICTS.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>

          {/* Collaboration Status */}
          <select
            value={filters.status}
            onChange={(e) => onChange({ status: e.target.value })}
            className="h-12 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[13px] font-semibold text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] cursor-pointer transition-all truncate"
          >
            {STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Status Bar */}
      <div className="flex items-center justify-between text-[12.5px] text-[#6B5845] pt-1">
        <span>
          Showing <strong className="text-[#1D2522] font-bold">{totalResults}</strong> ideas addressing challenges across Jharkhand
        </span>

        {isFiltered && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 font-bold text-[#123B2A] hover:underline cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
