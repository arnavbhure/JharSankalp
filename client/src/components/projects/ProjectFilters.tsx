import { Search, X, LayoutList, Map as MapIcon, RotateCcw } from 'lucide-react';
import { ProjectFiltersState } from '../../types/projects';

interface ProjectFiltersProps {
  filters: ProjectFiltersState;
  onChange: (updates: Partial<ProjectFiltersState>) => void;
  onReset: () => void;
  viewMode: 'list' | 'map';
  onToggleViewMode: (mode: 'list' | 'map') => void;
  totalFiltered: number;
}

const DOMAINS = [
  'All Domains',
  'Water Management',
  'Agriculture',
  'Mining Safety',
  'Education',
  'Environment',
  'Accessibility',
  'Healthcare',
  'Rural Livelihoods',
  'Disaster Management',
];

const DISTRICTS = [
  'All Districts',
  'Khunti',
  'Dhanbad',
  'Gumla',
  'West Singhbhum',
  'Ranchi',
  'East Singhbhum',
  'Latehar',
  'Dumka',
  'Sahibganj',
  'Simdega',
  'Palamu',
];

const STAGES = [
  { value: 'ALL', label: 'All Stages' },
  { value: 'FORMATION', label: '01 Formation' },
  { value: 'RESEARCH_DESIGN', label: '02 Research & Design' },
  { value: 'PROTOTYPE', label: '03 Prototype' },
  { value: 'FIELD_PILOT', label: '04 Field Pilot' },
  { value: 'IMPLEMENTATION', label: '05 Implementation' },
  { value: 'IMPACT_VERIFICATION', label: '06 Impact Verification' },
];

const INSTITUTIONS = [
  'All Institutions',
  'BIT Mesra',
  'BIT Sindri',
  'Birsa Agricultural University',
  'Kolhan University',
  'NIT Jamshedpur',
  'IIT ISM Dhanbad',
  'AIIMS Deoghar',
  'Municipal Innovation Cell',
  'ICAR-IINRG',
  'Central University of Jharkhand',
];

export function ProjectFilters({
  filters,
  onChange,
  onReset,
  viewMode,
  onToggleViewMode,
  totalFiltered,
}: ProjectFiltersProps) {
  const hasActiveFilters =
    filters.search.trim() !== '' ||
    filters.domain !== 'All Domains' ||
    filters.district !== 'All Districts' ||
    (filters.stage !== 'ALL' && filters.stage !== 'ALL PROJECTS') ||
    filters.institution !== 'All Institutions';

  return (
    <div className="space-y-4 text-left">
      {/* ── Top Bar: Search Input & View Toggle ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Field */}
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B5845]/60" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Search projects by keyword, domain, location or partner..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#EEEAE1] bg-white text-[14px] text-[#1D2522] placeholder:text-[#6B5845]/50 shadow-2xs focus:border-[#123B2A] focus:outline-none transition-all"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onChange({ search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B5845] hover:text-[#1D2522] p-1"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* View Mode Segmented Switch (Portfolio View vs Map View) */}
        <div className="inline-flex items-center rounded-xl bg-white border border-[#EEEAE1] p-1 shadow-2xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onToggleViewMode('list')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12.5px] font-bold transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-[#4C1E4F] text-white shadow-xs'
                : 'text-[#6B5845] hover:text-[#1D2522]'
            }`}
          >
            <LayoutList className="h-4 w-4" />
            <span>Portfolio View</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleViewMode('map')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12.5px] font-bold transition-all cursor-pointer ${
              viewMode === 'map'
                ? 'bg-[#4C1E4F] text-white shadow-xs'
                : 'text-[#6B5845] hover:text-[#1D2522]'
            }`}
          >
            <MapIcon className="h-4 w-4" />
            <span>Map View</span>
          </button>
        </div>
      </div>

      {/* ── Dropdown Filters Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* Domain Filter */}
        <div className="space-y-1">
          <label className="text-[10.5px] font-mono font-bold uppercase text-[#6B5845] px-1">
            Domain
          </label>
          <select
            value={filters.domain}
            onChange={(e) => onChange({ domain: e.target.value })}
            className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[13px] text-[#1D2522] shadow-2xs focus:border-[#123B2A] focus:outline-none cursor-pointer"
          >
            {DOMAINS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* District Filter */}
        <div className="space-y-1">
          <label className="text-[10.5px] font-mono font-bold uppercase text-[#6B5845] px-1">
            District
          </label>
          <select
            value={filters.district}
            onChange={(e) => onChange({ district: e.target.value })}
            className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[13px] text-[#1D2522] shadow-2xs focus:border-[#123B2A] focus:outline-none cursor-pointer"
          >
            {DISTRICTS.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        </div>

        {/* Stage Filter */}
        <div className="space-y-1">
          <label className="text-[10.5px] font-mono font-bold uppercase text-[#6B5845] px-1">
            Project Stage
          </label>
          <select
            value={filters.stage}
            onChange={(e) => onChange({ stage: e.target.value })}
            className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[13px] text-[#1D2522] shadow-2xs focus:border-[#123B2A] focus:outline-none cursor-pointer"
          >
            {STAGES.map((st) => (
              <option key={st.value} value={st.value}>
                {st.label}
              </option>
            ))}
          </select>
        </div>

        {/* Institution Filter */}
        <div className="space-y-1">
          <label className="text-[10.5px] font-mono font-bold uppercase text-[#6B5845] px-1">
            Institution / Partner
          </label>
          <select
            value={filters.institution}
            onChange={(e) => onChange({ institution: e.target.value })}
            className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[13px] text-[#1D2522] shadow-2xs focus:border-[#123B2A] focus:outline-none cursor-pointer"
          >
            {INSTITUTIONS.map((inst) => (
              <option key={inst} value={inst}>
                {inst}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Active Filters Ribbon & Count ── */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-[#EEEAE1]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[12.5px] font-mono text-[#6B5845]">
            Showing <strong className="text-[#1D2522] font-bold">{totalFiltered}</strong>{' '}
            {totalFiltered === 1 ? 'project' : 'projects'}
          </span>

          {filters.domain !== 'All Domains' && (
            <span className="inline-flex items-center gap-1 bg-[#FEE1C7] text-[#4C1E4F] border border-[#FA7E61]/30 px-2.5 py-0.5 rounded-full text-[11.5px] font-mono font-bold">
              {filters.domain}
              <button
                type="button"
                onClick={() => onChange({ domain: 'All Domains' })}
                className="hover:text-[#FA7E61] cursor-pointer"
              >
                ×
              </button>
            </span>
          )}

          {filters.district !== 'All Districts' && (
            <span className="inline-flex items-center gap-1 bg-[#F8F6F1] text-[#1D2522] border border-[#EEEAE1] px-2.5 py-0.5 rounded-full text-[11.5px] font-mono font-bold">
              {filters.district}
              <button
                type="button"
                onClick={() => onChange({ district: 'All Districts' })}
                className="hover:text-[#FA7E61] cursor-pointer"
              >
                ×
              </button>
            </span>
          )}

          {filters.stage !== 'ALL' && filters.stage !== 'ALL PROJECTS' && (
            <span className="inline-flex items-center gap-1 bg-[#4C1E4F] text-white px-2.5 py-0.5 rounded-full text-[11.5px] font-mono font-bold">
              {filters.stage.replace('_', ' ')}
              <button
                type="button"
                onClick={() => onChange({ stage: 'ALL' })}
                className="text-[#FEE1C7] hover:text-white cursor-pointer"
              >
                ×
              </button>
            </span>
          )}

          {filters.institution !== 'All Institutions' && (
            <span className="inline-flex items-center gap-1 bg-[#FAF9F5] text-[#1D2522] border border-[#EEEAE1] px-2.5 py-0.5 rounded-full text-[11.5px] font-mono font-bold">
              {filters.institution}
              <button
                type="button"
                onClick={() => onChange({ institution: 'All Institutions' })}
                className="hover:text-[#FA7E61] cursor-pointer"
              >
                ×
              </button>
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-[12px] font-mono text-[#FA7E61] hover:text-[#e86c4f] font-bold cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
