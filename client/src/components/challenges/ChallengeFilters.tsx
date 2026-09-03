import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, LayoutGrid, Map, X, SlidersHorizontal } from 'lucide-react';
import { ChallengeCategory, ChallengeStatusType, ImpactLevel } from '../../types/challenges';
import { JHARKHAND_DISTRICTS } from '../../data/challengesData';

interface ChallengeFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedDistrict: string;
  onDistrictChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  selectedImpact: string;
  onImpactChange: (value: string) => void;
  viewMode: 'grid' | 'map';
  onViewModeChange: (mode: 'grid' | 'map') => void;
  onResetFilters: () => void;
  totalFiltered: number;
}

const CATEGORIES: ('All Focus Areas' | ChallengeCategory)[] = [
  'All Focus Areas',
  'Water Management',
  'Agriculture',
  'Mining Safety',
  'Education',
  'Healthcare',
  'Environment',
  'Livelihoods',
];

const STATUSES: ('All Statuses' | ChallengeStatusType)[] = [
  'All Statuses',
  'Open for Collaboration',
  'In Discussion',
  'Solution in Development',
  'Implemented',
];

const IMPACT_LEVELS: ('All Impact Levels' | ImpactLevel)[] = [
  'All Impact Levels',
  'Critical',
  'High Impact',
  'Medium Impact',
];

export function ChallengeFilters({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDistrict,
  onDistrictChange,
  selectedStatus,
  onStatusChange,
  selectedImpact,
  onImpactChange,
  viewMode,
  onViewModeChange,
  onResetFilters,
  totalFiltered,
}: ChallengeFiltersProps) {
  // Custom dropdown open states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterBarRef.current && !filterBarRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasActiveFilters =
    search.trim() !== '' ||
    selectedCategory !== 'All Focus Areas' ||
    selectedDistrict !== 'All Districts' ||
    selectedStatus !== 'All Statuses' ||
    selectedImpact !== 'All Impact Levels';

  return (
    <div ref={filterBarRef} className="space-y-4 text-left">
      {/* ── Top Bar: Large Search + View Switcher ── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Large Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6B5845]/70 stroke-[2.2] pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search challenges by keyword, location or topic..."
            className="w-full h-12 pl-11 pr-10 rounded-xl border border-[#EEEAE1] bg-white text-[14.5px] text-[#1D2522] placeholder:text-[#6B5845]/60 shadow-2xs focus:outline-none focus:border-[#123B2A] focus:ring-1 focus:ring-[#123B2A] transition-all"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#6B5845] hover:text-[#1D2522] transition-colors"
              aria-label="Clear search text"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* View Switcher: Grid View vs Map View */}
        <div className="flex items-center self-end md:self-auto shrink-0 p-1 bg-[#EEEAE1]/80 rounded-xl border border-[#EEEAE1]">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white text-[#123B2A] shadow-xs'
                : 'text-[#6B5845] hover:text-[#1D2522]'
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            <span>Grid View</span>
          </button>

          <button
            onClick={() => onViewModeChange('map')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
              viewMode === 'map'
                ? 'bg-white text-[#123B2A] shadow-xs'
                : 'text-[#6B5845] hover:text-[#1D2522]'
            }`}
          >
            <Map className="h-4 w-4" />
            <span>Map View</span>
          </button>
        </div>
      </div>

      {/* ── Filter Controls Row ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap pt-1">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="hidden sm:flex items-center gap-1.5 text-[12px] font-mono font-bold uppercase tracking-wider text-[#6B5845] mr-1">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#123B2A]" />
            <span>Filter By:</span>
          </div>

          {/* 1. Focus Area Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
              className={`h-10 px-3.5 rounded-lg border text-[13px] font-medium flex items-center gap-2 transition-all cursor-pointer shadow-2xs ${
                selectedCategory !== 'All Focus Areas'
                  ? 'border-[#123B2A] bg-[#123B2A]/5 text-[#123B2A] font-bold'
                  : 'border-[#EEEAE1] bg-white text-[#1D2522] hover:bg-[#FAF9F5]'
              }`}
            >
              <span>{selectedCategory}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-[#6B5845] transition-transform ${openDropdown === 'category' ? 'rotate-180' : ''}`}
              />
            </button>

            {openDropdown === 'category' && (
              <div className="absolute left-0 top-full mt-1.5 z-50 w-56 rounded-xl border border-[#EEEAE1] bg-white p-1.5 shadow-lg max-h-64 overflow-y-auto">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      onCategoryChange(cat);
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#123B2A] text-white font-bold'
                        : 'text-[#1D2522] hover:bg-[#F8F6F1]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. District Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'district' ? null : 'district')}
              className={`h-10 px-3.5 rounded-lg border text-[13px] font-medium flex items-center gap-2 transition-all cursor-pointer shadow-2xs ${
                selectedDistrict !== 'All Districts'
                  ? 'border-[#123B2A] bg-[#123B2A]/5 text-[#123B2A] font-bold'
                  : 'border-[#EEEAE1] bg-white text-[#1D2522] hover:bg-[#FAF9F5]'
              }`}
            >
              <span>{selectedDistrict}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-[#6B5845] transition-transform ${openDropdown === 'district' ? 'rotate-180' : ''}`}
              />
            </button>

            {openDropdown === 'district' && (
              <div className="absolute left-0 top-full mt-1.5 z-50 w-60 rounded-xl border border-[#EEEAE1] bg-white p-1.5 shadow-lg max-h-64 overflow-y-auto">
                {JHARKHAND_DISTRICTS.map((dist) => (
                  <button
                    key={dist}
                    onClick={() => {
                      onDistrictChange(dist);
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-colors ${
                      selectedDistrict === dist
                        ? 'bg-[#123B2A] text-white font-bold'
                        : 'text-[#1D2522] hover:bg-[#F8F6F1]'
                    }`}
                  >
                    {dist}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Status Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
              className={`h-10 px-3.5 rounded-lg border text-[13px] font-medium flex items-center gap-2 transition-all cursor-pointer shadow-2xs ${
                selectedStatus !== 'All Statuses'
                  ? 'border-[#123B2A] bg-[#123B2A]/5 text-[#123B2A] font-bold'
                  : 'border-[#EEEAE1] bg-white text-[#1D2522] hover:bg-[#FAF9F5]'
              }`}
            >
              <span>{selectedStatus}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-[#6B5845] transition-transform ${openDropdown === 'status' ? 'rotate-180' : ''}`}
              />
            </button>

            {openDropdown === 'status' && (
              <div className="absolute left-0 top-full mt-1.5 z-50 w-56 rounded-xl border border-[#EEEAE1] bg-white p-1.5 shadow-lg max-h-64 overflow-y-auto">
                {STATUSES.map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      onStatusChange(st);
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-colors ${
                      selectedStatus === st
                        ? 'bg-[#123B2A] text-white font-bold'
                        : 'text-[#1D2522] hover:bg-[#F8F6F1]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Impact Level Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'impact' ? null : 'impact')}
              className={`h-10 px-3.5 rounded-lg border text-[13px] font-medium flex items-center gap-2 transition-all cursor-pointer shadow-2xs ${
                selectedImpact !== 'All Impact Levels'
                  ? 'border-[#123B2A] bg-[#123B2A]/5 text-[#123B2A] font-bold'
                  : 'border-[#EEEAE1] bg-white text-[#1D2522] hover:bg-[#FAF9F5]'
              }`}
            >
              <span>{selectedImpact}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-[#6B5845] transition-transform ${openDropdown === 'impact' ? 'rotate-180' : ''}`}
              />
            </button>

            {openDropdown === 'impact' && (
              <div className="absolute left-0 top-full mt-1.5 z-50 w-52 rounded-xl border border-[#EEEAE1] bg-white p-1.5 shadow-lg max-h-64 overflow-y-auto">
                {IMPACT_LEVELS.map((imp) => (
                  <button
                    key={imp}
                    onClick={() => {
                      onImpactChange(imp);
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-colors ${
                      selectedImpact === imp
                        ? 'bg-[#123B2A] text-white font-bold'
                        : 'text-[#1D2522] hover:bg-[#F8F6F1]'
                    }`}
                  >
                    {imp}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Match Count & Reset Action */}
        <div className="flex items-center gap-3 text-[13px]">
          <span className="text-[#6B5845] font-medium">
            <strong className="text-[#1D2522] font-bold">{totalFiltered}</strong> challenges found
          </span>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-[#123B2A] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
