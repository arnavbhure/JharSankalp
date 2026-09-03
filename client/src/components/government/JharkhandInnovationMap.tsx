import { useState } from 'react';
import { DistrictActivity, PriorityLevel } from '../../types/government';
import { MapPin, Target, Rocket, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

interface JharkhandInnovationMapProps {
  districts: DistrictActivity[];
  selectedDistrict: DistrictActivity | null;
  onSelectDistrict: (district: DistrictActivity) => void;
}

export function JharkhandInnovationMap({
  districts,
  selectedDistrict,
  onSelectDistrict,
}: JharkhandInnovationMapProps) {
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');

  const filteredDistricts =
    priorityFilter === 'ALL'
      ? districts
      : districts.filter((d) => d.priority === priorityFilter);

  const getPriorityColor = (priority: PriorityLevel) => {
    switch (priority) {
      case 'CRITICAL':
        return '#DC2626'; // Red
      case 'HIGH':
        return '#FA7E61'; // Coral
      case 'MEDIUM':
        return '#D97706'; // Amber
      case 'LOW':
      default:
        return '#15803D'; // Green
    }
  };

  const getPriorityBadgeClass = (priority: PriorityLevel) => {
    switch (priority) {
      case 'CRITICAL':
        return 'bg-[#FEF2F2] text-[#DC2626] border-[#FECDD3]';
      case 'HIGH':
        return 'bg-[#FEE1C7] text-[#FA7E61] border-[#FA7E61]/30';
      case 'MEDIUM':
        return 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]';
      case 'LOW':
      default:
        return 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]';
    }
  };

  const activeDistrict = selectedDistrict || filteredDistricts[0];

  return (
    <section id="map-section" className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-xs text-left space-y-6">
      {/* ── Section Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EEEAE1] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#4C1E4F]">
            <MapPin className="h-4 w-4 text-[#FA7E61]" />
            <span>TERRITORIAL GEODETIC TELEMETRY</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Jharkhand Innovation Activity Map
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl">
            Interactive district intelligence mapping challenge density, active R&D consortia, and priority levels.
          </p>
        </div>

        {/* Priority Filter Toggle */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-3.5 w-3.5 text-[#6B5845]" />
          <span className="text-[11.5px] font-mono uppercase text-[#6B5845] font-bold">
            Filter Priority:
          </span>
          <div className="inline-flex rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] p-1">
            {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriorityFilter(p)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  priorityFilter === p
                    ? 'bg-[#4C1E4F] text-white shadow-xs'
                    : 'text-[#6B5845] hover:text-[#1D2522]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Map Canvas & Interactive Inspector Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Map Canvas (7 Cols) */}
        <div className="lg:col-span-7 relative aspect-[4/3] w-full rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] overflow-hidden shadow-inner select-none">
          {/* Topographic Lines Overlay */}
          <svg className="absolute inset-0 w-full h-full stroke-[#EEEAE1]" strokeWidth="0.8">
            <line x1="20%" y1="0" x2="20%" y2="100%" />
            <line x1="40%" y1="0" x2="40%" y2="100%" />
            <line x1="60%" y1="0" x2="60%" y2="100%" />
            <line x1="80%" y1="0" x2="80%" y2="100%" />
            <line x1="0" y1="25%" x2="100%" y2="25%" />
            <line x1="0" y1="50%" x2="100%" y2="50%" />
            <line x1="0" y1="75%" x2="100%" y2="75%" />
          </svg>

          {/* Jharkhand State Polygon Silhouette */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none">
            <polygon
              points="18,32 30,16 54,12 70,22 84,24 88,40 82,54 84,72 70,86 52,90 32,88 22,76 14,56 12,42"
              fill="#F8F6F1"
              stroke="#4C1E4F"
              strokeWidth="1.8"
              strokeLinejoin="round"
              className="drop-shadow-xs"
            />
            {/* Regional Labels */}
            <text x="50" y="53" fill="#6B5845" fontSize="2.8" fontWeight="bold" textAnchor="middle" opacity="0.4">
              Ranchi
            </text>
            <text x="74" y="47" fill="#6B5845" fontSize="2.8" fontWeight="bold" textAnchor="middle" opacity="0.4">
              Dhanbad
            </text>
            <text x="51" y="64" fill="#6B5845" fontSize="2.8" fontWeight="bold" textAnchor="middle" opacity="0.4">
              Khunti
            </text>
            <text x="34" y="64" fill="#6B5845" fontSize="2.8" fontWeight="bold" textAnchor="middle" opacity="0.4">
              Gumla
            </text>
            <text x="61" y="85" fill="#6B5845" fontSize="2.8" fontWeight="bold" textAnchor="middle" opacity="0.4">
              West Singhbhum
            </text>
            <text x="78" y="80" fill="#6B5845" fontSize="2.8" fontWeight="bold" textAnchor="middle" opacity="0.4">
              East Singhbhum
            </text>
            <text x="86" y="37" fill="#6B5845" fontSize="2.8" fontWeight="bold" textAnchor="middle" opacity="0.4">
              Dumka
            </text>
            <text x="92" y="22" fill="#6B5845" fontSize="2.8" fontWeight="bold" textAnchor="middle" opacity="0.4">
              Sahibganj
            </text>
          </svg>

          {/* Interactive District Pins */}
          {filteredDistricts.map((dist) => {
            const isSelected = activeDistrict?.district === dist.district;
            const pinColor = getPriorityColor(dist.priority);

            return (
              <div
                key={dist.district}
                style={{
                  left: `${dist.coordinates.x}%`,
                  top: `${dist.coordinates.y}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                onClick={() => onSelectDistrict(dist)}
              >
                {isSelected && (
                  <span
                    className="absolute -inset-2 rounded-full animate-ping opacity-60"
                    style={{ backgroundColor: pinColor }}
                  />
                )}

                <div
                  className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 border-white shadow-md transition-all group-hover:scale-125 ${
                    isSelected ? 'scale-125 ring-2 ring-black/40' : ''
                  }`}
                  style={{ backgroundColor: pinColor }}
                >
                  <MapPin className="h-4 w-4 text-white" />
                </div>

                {/* District Label Tooltip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block bg-[#1D2522] text-white px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap shadow-md pointer-events-none z-30">
                  {dist.district}: {dist.challengesCount} Challenges · {dist.activeProjectsCount} Projects
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected District Inspector Card (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] p-5 sm:p-6 space-y-4">
          {activeDistrict ? (
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-[#6B5845]">
                  DISTRICT DOSSIER
                </span>

                <span
                  className={`text-[10.5px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${getPriorityBadgeClass(
                    activeDistrict.priority
                  )}`}
                >
                  ● {activeDistrict.priority} PRIORITY
                </span>
              </div>

              <div>
                <h4 className="text-[1.6rem] font-extrabold text-[#1D2522] font-sans leading-none">
                  {activeDistrict.district.toUpperCase()}
                </h4>
                <div className="text-[12.5px] text-[#6B5845] font-mono mt-1">
                  Lead Consortium: <strong className="text-[#123B2A]">{activeDistrict.leadInstitution}</strong>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#EEEAE1]">
                <div className="p-3 rounded-xl bg-white border border-[#EEEAE1] space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#6B5845]">
                    <Target className="h-3.5 w-3.5 text-[#FA7E61]" />
                    <span>Challenges</span>
                  </div>
                  <div className="text-[1.8rem] font-extrabold font-mono text-[#1D2522] leading-none">
                    {activeDistrict.challengesCount}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#EEEAE1] space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#6B5845]">
                    <Rocket className="h-3.5 w-3.5 text-[#15803D]" />
                    <span>Active Projects</span>
                  </div>
                  <div className="text-[1.8rem] font-extrabold font-mono text-[#15803D] leading-none">
                    {activeDistrict.activeProjectsCount}
                  </div>
                </div>
              </div>

              {/* Dominant Domain Callout */}
              <div className="p-3.5 rounded-xl bg-white border border-[#EEEAE1] space-y-1">
                <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] block">
                  Top Societal Domain
                </span>
                <div className="text-[14.5px] font-bold text-[#4C1E4F]">
                  {activeDistrict.topDomain}
                </div>
              </div>

              {/* Status & Operational Note */}
              {activeDistrict.statusNote && (
                <div className="p-3 rounded-xl bg-[#FFFDF9] border border-[#FDE68A] text-[12.5px] text-[#1D2522] leading-relaxed">
                  <span className="font-mono font-bold text-[#B45309] uppercase mr-1.5">Note:</span>
                  {activeDistrict.statusNote}
                </div>
              )}

              {/* Action Link */}
              <div className="pt-2">
                <Link
                  to={`/challenges?district=${encodeURIComponent(activeDistrict.district)}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#4C1E4F] hover:bg-[#3A143D] text-white text-[13px] font-bold shadow-xs transition-all"
                >
                  <span>Inspect {activeDistrict.district} Challenge Queue →</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-[13px] text-[#6B5845]">
              Click any district pin on the map to inspect activity telemetry.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
