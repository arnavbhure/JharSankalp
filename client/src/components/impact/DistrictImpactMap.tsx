import { useState } from 'react';
import { MapPin, CheckCircle2 } from 'lucide-react';
import { DistrictImpact } from '../../types/impact';

interface DistrictImpactMapProps {
  districts: DistrictImpact[];
  onSelectDistrict?: (district: DistrictImpact) => void;
}

export function DistrictImpactMap({
  districts,
  onSelectDistrict,
}: DistrictImpactMapProps) {
  const [activeDistrict, setActiveDistrict] = useState<DistrictImpact>(
    districts[0]
  );

  const handleSelect = (dist: DistrictImpact) => {
    setActiveDistrict(dist);
    if (onSelectDistrict) onSelectDistrict(dist);
  };

  return (
    <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 text-left space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-[#EEEAE1] pb-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            GEOGRAPHIC COVERAGE
          </span>
          <h3 className="text-[1.25rem] font-bold text-[#1D2522]">
            District Reach & Field Distribution
          </h3>
        </div>
        <span className="text-[11.5px] font-mono text-[#15803D] font-bold bg-[#F0FDF4] px-2.5 py-0.5 rounded-full border border-[#BBF7D0]">
          18 Active Districts
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* District Selector Badges & Grid (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <span className="text-[11px] font-mono font-bold uppercase text-[#6B5845] block">
            SELECT DISTRICT TO AUDIT:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {districts.map((dist) => {
              const isSelected = activeDistrict.id === dist.id;
              return (
                <button
                  key={dist.id}
                  type="button"
                  onClick={() => handleSelect(dist)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#123B2A] text-white border-[#123B2A] shadow-xs'
                      : 'bg-[#FAF9F5] border-[#EEEAE1] text-[#1D2522] hover:border-[#123B2A]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12.5px] font-bold block truncate">
                      {dist.name}
                    </span>
                    <MapPin
                      className={`h-3 w-3 ${
                        isSelected ? 'text-[#F5A623]' : 'text-[#BE123C]'
                      }`}
                    />
                  </div>
                  <div className="text-[11px] font-mono mt-1 opacity-80">
                    {dist.peopleReached.toLocaleString()} reached
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected District Deep Dive Card (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-4">
          <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-2.5">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#6B5845] block">
                DISTRICT PROFILE
              </span>
              <h4 className="text-[1.35rem] font-extrabold text-[#1D2522]">
                {activeDistrict.name} District
              </h4>
            </div>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-white text-[#123B2A] border border-[#EEEAE1]">
              {activeDistrict.primaryDomain}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-left">
            <div className="p-2.5 rounded-xl bg-white border border-[#EEEAE1]">
              <span className="text-[9.5px] font-mono text-[#6B5845] block">
                PROJECTS
              </span>
              <span className="text-[1.3rem] font-mono font-extrabold text-[#123B2A]">
                {activeDistrict.projectsCount}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#EEEAE1]">
              <span className="text-[9.5px] font-mono text-[#6B5845] block">
                REACHED
              </span>
              <span className="text-[1.3rem] font-mono font-extrabold text-[#123B2A]">
                {activeDistrict.peopleReached.toLocaleString()}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#EEEAE1]">
              <span className="text-[9.5px] font-mono text-[#6B5845] block">
                PILOTS
              </span>
              <span className="text-[1.3rem] font-mono font-extrabold text-[#15803D]">
                {activeDistrict.activeDeployments}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#EEEAE1] space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#15803D] flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              FLAGSHIP GROUND INITIATIVE
            </span>
            <p className="text-[12px] text-[#1D2522] leading-snug">
              {activeDistrict.highlight}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
