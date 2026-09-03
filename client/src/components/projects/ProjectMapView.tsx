import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../../types/projects';
import { Layers, MapPin, ArrowRight } from 'lucide-react';

interface ProjectMapViewProps {
  projects: Project[];
  selectedDistrict?: string;
  onSelectDistrict?: (district: string) => void;
}

export function ProjectMapView({
  projects,
  selectedDistrict: _selectedDistrict,
  onSelectDistrict,
}: ProjectMapViewProps) {
  const navigate = useNavigate();
  const [activeProject, setActiveProject] = useState<Project | null>(
    projects.length > 0 ? projects[0] : null,
  );

  const getMarkerColor = (stage: string) => {
    switch (stage) {
      case 'FORMATION':
      case 'RESEARCH_DESIGN':
        return '#4C1E4F'; // Deep Purple -> Research / Formation
      case 'PROTOTYPE':
        return '#D97706'; // Amber -> Prototype
      case 'FIELD_PILOT':
        return '#FA7E61'; // Coral -> Field Pilot
      case 'IMPLEMENTATION':
      case 'IMPACT_VERIFICATION':
        return '#15803D'; // Green -> Implementation / Verified Impact
      default:
        return '#123B2A';
    }
  };

  return (
    <div className="rounded-3xl border border-[#EEEAE1] bg-white p-5 sm:p-7 shadow-xs text-left space-y-5">
      {/* ── Header Strip ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EEEAE1]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#4C1E4F]">
            <Layers className="h-4 w-4 text-[#FA7E61]" />
            <span>ACTIVE IMPLEMENTATION MAP</span>
          </div>
          <h3 className="text-[1.35rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Jharkhand Project Visualization
          </h3>
        </div>

        {/* Stage Color Legend */}
        <div className="flex items-center gap-3 flex-wrap text-[11px] font-mono text-[#6B5845] bg-[#FAF9F5] px-3.5 py-1.5 rounded-xl border border-[#EEEAE1]">
          <span className="font-bold text-[#1D2522]">Stage Colors:</span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#4C1E4F]" /> Formation / Research
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#D97706]" /> Prototype
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FA7E61]" /> Field Pilot
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#15803D]" /> Implementation / Verified
          </span>
        </div>
      </div>

      {/* ── Main Map Canvas & Interactive Preview Sidebar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Geodetic Canvas (8 Cols) */}
        <div className="lg:col-span-8 relative aspect-[4/3] w-full rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] overflow-hidden shadow-inner select-none">
          {/* Subtle Topographic Grid Lines */}
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
            <text
              x="50"
              y="53"
              fill="#6B5845"
              fontSize="2.8"
              fontWeight="bold"
              textAnchor="middle"
              opacity="0.4"
            >
              Ranchi
            </text>
            <text
              x="74"
              y="47"
              fill="#6B5845"
              fontSize="2.8"
              fontWeight="bold"
              textAnchor="middle"
              opacity="0.4"
            >
              Dhanbad
            </text>
            <text
              x="51"
              y="66"
              fill="#6B5845"
              fontSize="2.8"
              fontWeight="bold"
              textAnchor="middle"
              opacity="0.4"
            >
              Khunti
            </text>
            <text
              x="34"
              y="64"
              fill="#6B5845"
              fontSize="2.8"
              fontWeight="bold"
              textAnchor="middle"
              opacity="0.4"
            >
              Gumla
            </text>
            <text
              x="61"
              y="85"
              fill="#6B5845"
              fontSize="2.8"
              fontWeight="bold"
              textAnchor="middle"
              opacity="0.4"
            >
              West Singhbhum
            </text>
            <text
              x="78"
              y="80"
              fill="#6B5845"
              fontSize="2.8"
              fontWeight="bold"
              textAnchor="middle"
              opacity="0.4"
            >
              East Singhbhum
            </text>
            <text
              x="86"
              y="37"
              fill="#6B5845"
              fontSize="2.8"
              fontWeight="bold"
              textAnchor="middle"
              opacity="0.4"
            >
              Dumka
            </text>
          </svg>

          {/* Interactive Project Markers */}
          {projects.map((proj) => {
            const isSelected = activeProject?.id === proj.id;
            const markerColor = getMarkerColor(proj.stage);

            return (
              <div
                key={proj.id}
                style={{
                  left: `${proj.coordinates.x}%`,
                  top: `${proj.coordinates.y}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                onClick={() => {
                  setActiveProject(proj);
                  if (onSelectDistrict) {
                    onSelectDistrict(proj.district);
                  }
                }}
              >
                {/* Glowing Pulse when active */}
                {isSelected && (
                  <span
                    className="absolute -inset-2 rounded-full animate-ping opacity-60"
                    style={{ backgroundColor: markerColor }}
                  />
                )}

                {/* Marker Pin Icon */}
                <div
                  className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 border-white shadow-md transition-all group-hover:scale-125 ${
                    isSelected ? 'scale-125 ring-2 ring-black/40' : ''
                  }`}
                  style={{ backgroundColor: markerColor }}
                >
                  <MapPin className="h-4 w-4 text-white" />
                </div>

                {/* Mini Hover Label */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block bg-[#1D2522] text-white px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap shadow-md pointer-events-none z-30">
                  {proj.district} · {proj.title.substring(0, 20)}...
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Selected Project Sidebar (4 Cols) */}
        <div className="lg:col-span-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] p-5 space-y-4">
          {activeProject ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-[#4C1E4F]">
                    {activeProject.domain}
                  </span>
                  <span
                    className="text-[10.5px] font-mono font-bold px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: getMarkerColor(activeProject.stage) }}
                  >
                    {activeProject.stageLabel}
                  </span>
                </div>

                <h4 className="text-[1.2rem] font-bold text-[#1D2522] leading-snug">
                  {activeProject.title}
                </h4>

                <div className="flex items-center gap-1.5 text-[12px] font-mono text-[#6B5845]">
                  <MapPin className="h-3.5 w-3.5 text-[#FA7E61]" />
                  <span>{activeProject.locationDisplay}</span>
                </div>
              </div>

              <p className="text-[13px] text-[#6B5845] leading-relaxed line-clamp-3">
                {activeProject.oneLineDescription}
              </p>

              {/* Metrics Summary */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#EEEAE1]">
                <div className="p-2.5 rounded-xl bg-white border border-[#EEEAE1]">
                  <span className="text-[10px] font-mono uppercase text-[#6B5845] block">
                    Beneficiaries
                  </span>
                  <div className="text-[13.5px] font-bold text-[#123B2A]">
                    {activeProject.beneficiaries
                      ? activeProject.beneficiaries.toLocaleString()
                      : 'Covered'}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-[#EEEAE1]">
                  <span className="text-[10px] font-mono uppercase text-[#6B5845] block">
                    Milestones
                  </span>
                  <div className="text-[13.5px] font-bold text-[#4C1E4F]">
                    {activeProject.milestoneProgress.completed} /{' '}
                    {activeProject.milestoneProgress.total} Done
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={() => navigate(`/projects/${activeProject.id}`)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#4C1E4F] hover:bg-[#3A143D] text-white text-[13px] font-bold shadow-xs cursor-pointer transition-all"
                >
                  <span>View Project Dossier</span>
                  <ArrowRight className="h-4 w-4 text-[#FA7E61]" />
                </button>

                {onSelectDistrict && (
                  <button
                    type="button"
                    onClick={() => onSelectDistrict(activeProject.district)}
                    className="w-full py-2 rounded-xl border border-[#B5A886]/40 bg-white hover:bg-[#FAF9F5] text-[#1D2522] text-[12px] font-mono font-bold cursor-pointer transition-all"
                  >
                    Filter Portfolio by {activeProject.district}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-[13px] text-[#6B5845]">
              Click any district pin on the map to inspect active execution.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
