import { useState } from 'react';
import { Layers, MapPin, ArrowRight } from 'lucide-react';
import { ChallengeItem } from '../../types/challenges';
import { getCategoryMeta } from '../../data/challengesData';

interface ChallengeMapProps {
  challenges: ChallengeItem[];
  onSelectChallenge: (challenge: ChallengeItem) => void;
}

export function ChallengeMap({ challenges, onSelectChallenge }: ChallengeMapProps) {
  const [activeChallenge, setActiveChallenge] = useState<ChallengeItem | null>(
    challenges.length > 0 ? challenges[0] : null,
  );

  return (
    <div className="rounded-2xl border border-[#EEEAE1] bg-white p-5 sm:p-7 shadow-xs text-left">
      {/* ── Map Header Strip ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#EEEAE1]">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <Layers className="h-4 w-4 text-[#F5A623]" />
            <span>JHARKHAND GEODETIC DISCOVERY CANVAS</span>
          </div>
          <h3 className="text-[1.2rem] font-extrabold text-[#1D2522] tracking-tight mt-0.5 font-sans">
            Interactive Problem Map
          </h3>
        </div>

        {/* Category Color Legend */}
        <div className="flex items-center gap-2.5 flex-wrap text-[11px] font-medium text-[#6B5845] bg-[#F8F6F1] px-3 py-1.5 rounded-lg border border-[#EEEAE1]">
          <span className="flex items-center gap-1.5 font-bold text-[#1D2522]">
            <span>Legend:</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0284C7]" /> Water
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#15803D]" /> Agri
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#B45309]" /> Mining
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#1F5A3D]" /> Edu
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#BE123C]" /> Health
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#123B2A]" /> Env
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#6B5845]" /> Livelihood
          </span>
        </div>
      </div>

      {/* ── Main Map Canvas & Interactive Preview Sidebar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5 items-start">
        {/* SVG Geodetic Canvas (8 Cols) */}
        <div className="lg:col-span-8 relative aspect-[4/3] w-full rounded-xl border border-[#EEEAE1] bg-[#FAF9F5] overflow-hidden shadow-inner">
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

          {/* Jharkhand State Contour Silhouette */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full select-none">
            {/* Main State Polygon with Warm Ivory / Soft Beige Fill */}
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
              className="opacity-40"
            />
            <path
              d="M24,60 Q52,58 80,62"
              fill="none"
              stroke="#6B5845"
              strokeWidth="0.75"
              strokeDasharray="2,2"
              className="opacity-40"
            />
            <path
              d="M48,15 L52,88"
              fill="none"
              stroke="#6B5845"
              strokeWidth="0.75"
              strokeDasharray="2,2"
              className="opacity-40"
            />

            {/* District Labels */}
            <text
              x="53"
              y="52"
              fill="#6B5845"
              fontSize="2.8"
              fontWeight="bold"
              textAnchor="middle"
              opacity="0.6"
            >
              Ranchi
            </text>
            <text
              x="74"
              y="41"
              fill="#6B5845"
              fontSize="2.8"
              fontWeight="bold"
              textAnchor="middle"
              opacity="0.6"
            >
              Dhanbad
            </text>
            <text
              x="54"
              y="32"
              fill="#6B5845"
              fontSize="2.8"
              fontWeight="bold"
              textAnchor="middle"
              opacity="0.6"
            >
              Hazaribagh
            </text>
            <text
              x="26"
              y="24"
              fill="#6B5845"
              fontSize="2.8"
              fontWeight="bold"
              textAnchor="middle"
              opacity="0.6"
            >
              Palamu
            </text>
            <text
              x="48"
              y="69"
              fill="#6B5845"
              fontSize="2.8"
              fontWeight="bold"
              textAnchor="middle"
              opacity="0.6"
            >
              Khunti
            </text>
            <text
              x="28"
              y="67"
              fill="#6B5845"
              fontSize="2.8"
              fontWeight="bold"
              textAnchor="middle"
              opacity="0.6"
            >
              Gumla
            </text>
            <text
              x="32"
              y="88"
              fill="#6B5845"
              fontSize="2.8"
              fontWeight="bold"
              textAnchor="middle"
              opacity="0.6"
            >
              Simdega
            </text>
            <text
              x="58"
              y="86"
              fill="#6B5845"
              fontSize="2.8"
              fontWeight="bold"
              textAnchor="middle"
              opacity="0.6"
            >
              W. Singhbhum
            </text>
            <text
              x="80"
              y="82"
              fill="#6B5845"
              fontSize="2.8"
              fontWeight="bold"
              textAnchor="middle"
              opacity="0.6"
            >
              E. Singhbhum
            </text>
            <text
              x="86"
              y="30"
              fill="#6B5845"
              fontSize="2.8"
              fontWeight="bold"
              textAnchor="middle"
              opacity="0.6"
            >
              Dumka
            </text>
            <text
              x="76"
              y="23"
              fill="#6B5845"
              fontSize="2.8"
              fontWeight="bold"
              textAnchor="middle"
              opacity="0.6"
            >
              Deoghar
            </text>
          </svg>

          {/* Interactive Challenge Location Pins */}
          {challenges.map((c) => {
            const meta = getCategoryMeta(c.category);
            const isSelected = activeChallenge?.id === c.id;

            return (
              <div
                key={c.id}
                style={{ left: `${c.coordinates.x}%`, top: `${c.coordinates.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                onClick={() => setActiveChallenge(c)}
                onMouseEnter={() => setActiveChallenge(c)}
              >
                {/* Ping Animation for Selected/Hovered Marker */}
                {isSelected && (
                  <span
                    style={{ borderColor: meta.accent }}
                    className="absolute -inset-2.5 rounded-full border-2 animate-ping opacity-75"
                  />
                )}

                {/* Pin Node */}
                <div
                  style={{ backgroundColor: meta.accent }}
                  className={`flex items-center justify-center rounded-full text-white shadow-md transition-all duration-200 ${
                    isSelected
                      ? 'h-7 w-7 ring-4 ring-white scale-110'
                      : 'h-5 w-5 hover:scale-125 hover:ring-2 hover:ring-white'
                  }`}
                >
                  <span className="text-[9px] font-mono font-extrabold leading-none">
                    {c.category[0]}
                  </span>
                </div>

                {/* Mini Tooltip on Hover */}
                <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 rounded bg-[#123B2A] text-white text-[10px] font-mono whitespace-nowrap shadow-md pointer-events-none z-30">
                  {c.district} · {c.category}
                </div>
              </div>
            );
          })}

          {/* Geolocation Coordinate Watermark */}
          <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-[#6B5845]/70 bg-white/80 px-2 py-0.5 rounded border border-[#EEEAE1]">
            LAT 23°21&apos;N · LON 85°20&apos;E (Ranchi datum)
          </div>
        </div>

        {/* ── Interactive Preview Sidebar Card (4 Cols) ── */}
        <div className="lg:col-span-4">
          {activeChallenge ? (
            <div className="p-5 sm:p-6 rounded-xl border border-[#EEEAE1] bg-[#FAF9F5] shadow-sm space-y-4 text-left">
              {/* Top Header Row */}
              <div className="flex items-center justify-between gap-2 border-b border-[#EEEAE1] pb-3">
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#6B5845] uppercase">
                  <MapPin className="h-3.5 w-3.5 text-[#123B2A]" />
                  <span>{activeChallenge.district}</span>
                  <span>·</span>
                  <span className="text-[#123B2A]">{activeChallenge.category}</span>
                </div>

                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    activeChallenge.impactLevel === 'Critical'
                      ? 'bg-[#FEF0F4] text-[#BE123C]'
                      : 'bg-[#FEF6E9] text-[#B45309]'
                  }`}
                >
                  {activeChallenge.impactLevel}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h4 className="text-[1.15rem] font-bold text-[#1D2522] leading-snug tracking-tight font-sans">
                  {activeChallenge.title}
                </h4>
                <p className="text-[13px] text-[#1D2522]/80 leading-relaxed">
                  {activeChallenge.description}
                </p>
              </div>

              {/* District & Location Specs */}
              <div className="p-3 rounded-lg bg-white border border-[#EEEAE1] space-y-1 text-[12px]">
                <div className="flex items-center justify-between text-[#6B5845]">
                  <span>Specific Location:</span>
                  <strong className="text-[#1D2522]">{activeChallenge.block}</strong>
                </div>
                <div className="flex items-center justify-between text-[#6B5845]">
                  <span>Collaborators:</span>
                  <strong className="text-[#123B2A]">
                    {activeChallenge.collaboratorsCount} Active
                  </strong>
                </div>
                <div className="flex items-center justify-between text-[#6B5845]">
                  <span>Status:</span>
                  <strong className="text-[#1D2522]">{activeChallenge.status}</strong>
                </div>
              </div>

              {/* View Challenge CTA */}
              <button
                onClick={() => onSelectChallenge(activeChallenge)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#123B2A] hover:bg-[#0D2B1E] text-white py-2.5 px-4 text-[13.5px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>View Full Problem Dossier</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-[#EEEAE1] bg-[#FAF9F5] text-center text-[#6B5845]">
              <MapPin className="h-8 w-8 mx-auto text-[#123B2A]/40 mb-2" />
              <p className="text-[13px]">Select any marker on the map to inspect the challenge.</p>
            </div>
          )}

          {/* Quick District Picker List */}
          <div className="mt-4 pt-3 border-t border-[#EEEAE1] text-left">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B5845] block mb-2">
              Explore By Active Hotspot:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {challenges.slice(0, 6).map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveChallenge(c)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                    activeChallenge?.id === c.id
                      ? 'bg-[#123B2A] text-white font-bold'
                      : 'bg-white text-[#1D2522] border border-[#EEEAE1] hover:bg-[#F8F6F1]'
                  }`}
                >
                  {c.district}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
