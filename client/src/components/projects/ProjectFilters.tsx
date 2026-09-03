import { Search, List, Map, X } from 'lucide-react';
import { ProjectFiltersState } from '../../types/projects';
import { JHARKHAND_DISTRICTS } from '../../data/challengesData';

interface ProjectFiltersProps {
  filters: ProjectFiltersState;
  onChange: (updates: Partial<ProjectFiltersState>) => void;
  onReset: () => void;
  viewMode: 'list' | 'map';
  onToggleViewMode: (mode: 'list' | 'map') => void;
}

const DOMAINS = [
  'All Domains',
  'Water Management',
  'Mining Safety',
  'Agriculture',
  'Education',
  'Environment',
  'Accessibility',
];

const INSTITUTIONS = [
  'All Institutions',
  'BIT Mesra',
  'BIT Sindri',
  'Birsa Agricultural University',
  'Kolhan State University',
  'Central University of Jharkhand',
  'Vinoba Bhave University',
];

const OPPORTUNITY_OPTIONS = [
  'All Projects',
  'Seeking Partners Only',
];

export function ProjectFilters({
  filters,
  onChange,
  onReset,
  viewMode,
  onToggleViewMode,
}: ProjectFiltersProps) {
  const hasActiveFilters =
    filters.search ||
    filters.domain !== 'All Domains' ||
    filters.district !== 'All Districts' ||
    filters.institution !== 'All Institutions' ||
    filters.opportunity !== 'All Projects';

  return (
    <div className="space-y-3.5 text-left">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B5845]" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Search projects, organizations, technologies, or districts..."
            className="w-full h-11 pl-11 pr-4 rounded-xl border border-[#EEEAE1] bg-white text-[13.5px] text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] transition-all"
          />
        </div>

        {/* View Mode Toggle: LIST VIEW vs MAP VIEW */}
        <div className="flex items-center bg-[#FAF9F5] p-1 rounded-xl border border-[#EEEAE1] shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => onToggleViewMode('list')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-mono font-bold transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-[#123B2A] text-white shadow-2xs'
                : 'text-[#6B5845] hover:text-[#1D2522]'
            }`}
          >
            <List className="h-3.5 w-3.5" />
            <span>LIST VIEW</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleViewMode('map')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-mono font-bold transition-all cursor-pointer ${
              viewMode === 'map'
                ? 'bg-[#123B2A] text-white shadow-2xs'
                : 'text-[#6B5845] hover:text-[#1D2522]'
            }`}
          >
            <Map className="h-3.5 w-3.5" />
            <span>MAP VIEW</span>
          </button>
        </div>
      </div>

      {/* Filter Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* Domain */}
        <select
          value={filters.domain}
          onChange={(e) => onChange({ domain: e.target.value })}
          className="h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[12.5px] font-semibold text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] cursor-pointer"
        >
          {DOMAINS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* District */}
        <select
          value={filters.district}
          onChange={(e) => onChange({ district: e.target.value })}
          className="h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[12.5px] font-semibold text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] cursor-pointer"
        >
          {JHARKHAND_DISTRICTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* Institution */}
        <select
          value={filters.institution}
          onChange={(e) => onChange({ institution: e.target.value })}
          className="h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[12.5px] font-semibold text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] cursor-pointer"
        >
          {INSTITUTIONS.map((inst) => (
            <option key={inst} value={inst}>
              {inst}
            </option>
          ))}
        </select>

        {/* Partner Opportunity */}
        <select
          value={filters.opportunity}
          onChange={(e) => onChange({ opportunity: e.target.value })}
          className="h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[12.5px] font-semibold text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] cursor-pointer"
        >
          {OPPORTUNITY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Active Filter Clear Prompt */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 pt-1 text-[12px] text-[#6B5845]">
          <span>Filters applied</span>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 font-bold text-[#BE123C] hover:underline cursor-pointer"
          >
            <X className="h-3 w-3" />
            <span>Reset all filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
