import { Filter, X } from 'lucide-react';

interface ImpactFiltersProps {
  selectedDistrict: string;
  onDistrictChange: (dist: string) => void;
  selectedDomain: string;
  onDomainChange: (dom: string) => void;
  selectedTimePeriod: string;
  onTimePeriodChange: (period: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

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

const DOMAINS = [
  'All Focus Areas',
  'Water Management',
  'Agriculture',
  'Healthcare',
  'Education',
  'Mining Safety',
  'Environment',
];

const TIME_PERIODS = [
  { value: 'all_time', label: 'All Time' },
  { value: 'last_30_days', label: 'Last 30 Days' },
  { value: 'last_6_months', label: 'Last 6 Months' },
  { value: 'last_year', label: 'Last Year' },
];

export function ImpactFilters({
  selectedDistrict,
  onDistrictChange,
  selectedDomain,
  onDomainChange,
  selectedTimePeriod,
  onTimePeriodChange,
  onClearFilters,
  hasActiveFilters,
}: ImpactFiltersProps) {
  return (
    <div className="rounded-2xl border border-[#EEEAE1] bg-white p-4 sm:p-5 shadow-2xs text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase text-[#6B5845] mr-1">
            <Filter className="h-3.5 w-3.5 text-[#123B2A]" />
            <span>AUDIT FILTERS:</span>
          </div>

          {/* District Dropdown */}
          <select
            value={selectedDistrict}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[12.5px] text-[#1D2522] font-medium focus:outline-none focus:border-[#123B2A] cursor-pointer shadow-2xs"
          >
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Domain Dropdown */}
          <select
            value={selectedDomain}
            onChange={(e) => onDomainChange(e.target.value)}
            className="h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[12.5px] text-[#1D2522] font-medium focus:outline-none focus:border-[#123B2A] cursor-pointer shadow-2xs"
          >
            {DOMAINS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Time Period Dropdown */}
          <select
            value={selectedTimePeriod}
            onChange={(e) => onTimePeriodChange(e.target.value)}
            className="h-10 px-3 rounded-xl border border-[#EEEAE1] bg-[#FAF9F5] text-[12.5px] text-[#123B2A] font-bold focus:outline-none focus:border-[#123B2A] cursor-pointer shadow-2xs"
          >
            {TIME_PERIODS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="text-[11.5px] font-mono font-bold text-[#BE123C] hover:underline cursor-pointer px-2 py-1 flex items-center gap-1"
            >
              <X className="h-3.5 w-3.5" />
              Reset Filters
            </button>
          )}
        </div>

        <div className="text-[12px] font-mono text-[#15803D] font-bold flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#15803D]" />
          Audited Statewide Cohort
        </div>
      </div>
    </div>
  );
}
