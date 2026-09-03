import { Search, Filter, X } from 'lucide-react';

interface IdeaFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  category: string;
  onCategoryChange: (val: string) => void;
  district: string;
  onDistrictChange: (val: string) => void;
  status: string;
  onStatusChange: (val: string) => void;
  sortBy: string;
  onSortByChange: (val: string) => void;
  totalCount: number;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const FOCUS_AREAS = [
  'All Focus Areas',
  'Agriculture',
  'Education',
  'Healthcare',
  'Environment',
  'Livelihoods',
  'Water Management',
  'Clean Energy',
  'Mining Safety',
];

const DISTRICTS = [
  'All Districts',
  'Ranchi',
  'Dhanbad',
  'Dumka',
  'Hazaribagh',
  'Bokaro',
  'West Singhbhum',
  'Khunti',
  'Latehar',
  'Gumla',
  'Simdega',
];

const STATUSES = [
  'All Statuses',
  'New',
  'Community Supported',
  'Under Review',
  'In Development',
  'Implemented',
];

const SORT_OPTIONS = [
  { value: 'most_supported', label: 'Most Supported' },
  { value: 'newest', label: 'Newest' },
  { value: 'in_development', label: 'In Development' },
];

export function IdeaFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  district,
  onDistrictChange,
  status,
  onStatusChange,
  sortBy,
  onSortByChange,
  totalCount,
  onClearFilters,
  hasActiveFilters,
}: IdeaFiltersProps) {
  return (
    <div className="space-y-4 text-left">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B5845]/70" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search ideas by keyword, district or focus area..."
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

      {/* Filter Dropdowns Strip & Results Count */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
        {/* Dropdowns Row */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase text-[#6B5845] mr-1">
            <Filter className="h-3.5 w-3.5 text-[#123B2A]" />
            <span className="hidden sm:inline">FILTERS:</span>
          </div>

          {/* Focus Area */}
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
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

          {/* Idea Status */}
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[12.5px] text-[#1D2522] font-medium focus:outline-none focus:border-[#123B2A] cursor-pointer shadow-2xs"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="h-10 px-3 rounded-xl border border-[#EEEAE1] bg-[#FAF9F5] text-[12.5px] text-[#123B2A] font-bold focus:outline-none focus:border-[#123B2A] cursor-pointer shadow-2xs"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                Sort: {opt.label}
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
          Showing <strong className="text-[#1D2522] font-bold">{totalCount}</strong> ideas
        </div>
      </div>
    </div>
  );
}
