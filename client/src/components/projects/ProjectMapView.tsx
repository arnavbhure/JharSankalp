import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../../types/projects';
import { Layers, MapPin, ArrowRight, Building2 } from 'lucide-react';
import { ProjectHealthIndicator } from './ProjectHealthIndicator';

interface ProjectMapViewProps {
  projects: Project[];
}

export function ProjectMapView({ projects }: ProjectMapViewProps) {
  const navigate = useNavigate();
  const [activeProject, setActiveProject] = useState<Project | null>(
    projects.length > 0 ? projects[0] : null
  );

  return (
    <div className="rounded-3xl border border-[#EEEAE1] bg-white p-5 sm:p-7 shadow-xs text-left space-y-5">
      {/* ── Header Strip ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EEEAE1]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <Layers className="h-4 w-4 text-[#F5A623]" />
            <span>JHARKHAND GEODETIC PROJECT CANVAS</span>
          </div>
          <h3 className="text-[1.35rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Interactive Innovation Portfolio Map
          </h3>
        </div>

        {/* Stage Legend */}
        <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono text-[#6B5845] bg-[#FAF9F5] px-3 py-1.5 rounded-xl border border-[#EEEAE1]">
          <span className="font-bold text-[#1D2522]">Stages:</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[#123B2A]" /> Design/Proto
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[#15803D]" /> Field Pilot
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[#7E22CE]" /> Verification/Scale
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
              stroke="#123B2A"
              strokeWidth="1.8"
              strokeLinejoin="round"
              className="drop-shadow-xs"
            />
            {/* Plateau Region Lines */}
            <path
              d="M30,36 Q50,42 70,38"
              fill="none"
              stroke="#6B5845"
              strokeWidth="0.75"
              strokeDasharray="2,2"
              className="opacity-30"
            />
            <path
              d="M24,60 Q52,58 80,62"
              fill="none"
              stroke="#6B5845"
              strokeWidth="0.75"
              strokeDasharray="2,2"
              className="opacity-30"
            />

            {/* Regional Labels */}
            <text x="53" y="52" fill="#6B5845" fontSize="2.8" fontWeight="bold" textAnchor="middle" opacity="0.5">
              Ranchi
            </text>
            <text x="74" y="41" fill="#6B5845" fontSize="2.8" fontWeight="bold" textAnchor="middle" opacity="0.5">
              Dhanbad
            </text>
            <text x="54" y="31" fill="#6B5845" fontSize="2.8" fontWeight="bold" textAnchor="middle" opacity="0.5">
              Hazaribagh
            </text>
            <text x="34" y="63" fill="#6B5845" fontSize="2.8" fontWeight="bold" textAnchor="middle" opacity="0.5">
              Gumla
            </text>
            <text x="50" y="61" fill="#6B5845" fontSize="2.8" fontWeight="bold" textAnchor="middle" opacity="0.5">
              Khunti
            </text>
            <text x="56" y="81" fill="#6B5845" fontSize="2.8" fontWeight="bold" textAnchor="middle" opacity="0.5">
              West Singhbhum
            </text>
          </svg>

          {/* Project Coordinate Nodes */}
          {projects.map((proj) => {
            const isSelected = activeProject?.id === proj.id;
            const isPilot = proj.stage === 'FIELD_PILOT';

            return (
              <div
                key={proj.id}
                onClick={() => setActiveProject(proj)}
                style={{
                  left: `${proj.coordinates.x}%`,
                  top: `${proj.coordinates.y}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
              >
                {/* Pulsing ring for Field Pilots */}
                {isPilot && (
                  <span className="absolute -inset-1.5 rounded-full bg-[#15803D]/25 animate-ping" />
                )}

                {/* Node Button */}
                <div
                  className={`relative flex items-center justify-center rounded-full transition-all duration-200 shadow-md ${
                    isSelected
                      ? 'h-8 w-8 bg-[#123B2A] text-[#F5A623] ring-4 ring-[#123B2A]/20 scale-110'
                      : isPilot
                      ? 'h-6 w-6 bg-[#15803D] text-white hover:scale-115'
                      : 'h-6 w-6 bg-white text-[#123B2A] border-2 border-[#123B2A] hover:scale-115'
                  }`}
                >
                  <MapPin className={`stroke-[2.5] ${isSelected ? 'h-4 w-4' : 'h-3.5 w-3.5'}`} />
                </div>

                {/* Hover Tooltip */}
                <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 whitespace-nowrap">
                  <div className="rounded-lg bg-[#1D2522] px-2.5 py-1 text-[11px] font-mono text-white shadow-xl">
                    {proj.district} · {proj.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Project Preview Docket (4 Cols) */}
        <div className="lg:col-span-4">
          {activeProject ? (
            <div className="rounded-2xl border-2 border-[#123B2A] bg-[#FFFDF9] p-5 sm:p-6 shadow-sm space-y-4 text-left animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
                <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                  {activeProject.domain}
                </span>
                <ProjectHealthIndicator health={activeProject.health} label={activeProject.healthLabel} />
              </div>

              <div className="space-y-1.5">
                <h4
                  onClick={() => navigate(`/projects/${activeProject.id}`)}
                  className="text-[1.2rem] font-bold text-[#1D2522] hover:text-[#123B2A] cursor-pointer transition-colors leading-snug font-sans"
                >
                  {activeProject.title}
                </h4>

                <div className="flex items-center gap-1.5 text-[12px] text-[#6B5845] font-mono">
                  <MapPin className="h-3 w-3 text-[#BE123C]" />
                  <span>{activeProject.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-[11.5px] font-mono">
                <div className="p-2.5 rounded-xl bg-white border border-[#EEEAE1]">
                  <span className="text-[10px] text-[#6B5845] block uppercase">STAGE</span>
                  <strong className="text-[#123B2A] block mt-0.5">{activeProject.stageLabel}</strong>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-[#EEEAE1]">
                  <span className="text-[10px] text-[#6B5845] block uppercase">BENEFICIARIES</span>
                  <strong className="text-[#15803D] block mt-0.5">{activeProject.impactMetric}</strong>
                </div>
              </div>

              {/* Lead Institution */}
              <div className="space-y-1 text-[12px]">
                <div className="flex items-center gap-1.5 text-[#6B5845]">
                  <Building2 className="h-3.5 w-3.5 text-[#123B2A]" />
                  <span>Lead: <strong className="text-[#1D2522]">{activeProject.leadInstitution}</strong></span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-[#EEEAE1]">
                <button
                  type="button"
                  onClick={() => navigate(`/projects/${activeProject.id}`)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13px] font-bold shadow-2xs transition-all cursor-pointer"
                >
                  <span>View Project Dossier</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] text-center text-[13px] text-[#6B5845]">
              Click any node on the Jharkhand map to view project telemetry.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
