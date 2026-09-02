import { useState } from 'react';
import { Badge } from '../ui/Badge';
import { StatusBadge } from '../ui/StatusBadge';
import { MapPin, ArrowRight, Eye, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DistrictChallengeNode {
  id: string;
  district: string;
  block: string;
  title: string;
  domain: string;
  domainColor: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  stage: string;
  population: string;
  coordinates: { x: number; y: number }; // Relative SVG percentage
  summary: string;
}

const DISTRICT_CHALLENGES: DistrictChallengeNode[] = [
  {
    id: 'JS-2024-00001',
    district: 'Khunti',
    block: 'Murhu Block',
    title: 'Predictive Maintenance of Rural Water Pumps',
    domain: 'Water & Sanitation',
    domainColor: '#2563EB',
    priority: 'HIGH',
    stage: 'PILOT',
    population: '2,000 residents',
    coordinates: { x: 50, y: 64 },
    summary: 'Hand pumps in 5 tribal villages experiencing repeated mechanical failures with 10-14 days downtime per incident.',
  },
  {
    id: 'JS-2024-00002',
    district: 'Gumla',
    block: 'Bishunpur Block',
    title: 'Soil Health Monitoring for Tribal Farmers',
    domain: 'Agriculture',
    domainColor: '#16A34A',
    priority: 'MEDIUM',
    stage: 'MATCHING',
    population: '5,000 farmers',
    coordinates: { x: 30, y: 62 },
    summary: 'Lack of real-time soil nutrient testing leading to declining crop yield in rainfed uplands.',
  },
  {
    id: 'JS-2024-00003',
    district: 'Dhanbad',
    block: 'Jharia Coalfield',
    title: 'Early Warning System for Abandoned Mine Subsidence',
    domain: 'Mining Safety',
    domainColor: '#B45309',
    priority: 'CRITICAL',
    stage: 'UNDER_VALIDATION',
    population: '15,000 residents',
    coordinates: { x: 74, y: 44 },
    summary: 'Ground shifting hazard over abandoned coal seams requiring real-time seismic displacement monitoring.',
  },
  {
    id: 'JS-2024-00004',
    district: 'Simdega',
    block: 'Thethaitangar Block',
    title: 'Telemedicine Access for Remote Tribal Hamlets',
    domain: 'Healthcare',
    domainColor: '#DC2626',
    priority: 'HIGH',
    stage: 'SUBMITTED',
    population: '8,000 residents',
    coordinates: { x: 33, y: 84 },
    summary: 'Primary healthcare centers over 30 km away; need low-bandwidth diagnostic consultation pods.',
  },
  {
    id: 'JS-2024-00005',
    district: 'Hazaribagh',
    block: 'Ichak Block',
    title: 'Solar-Powered Cold Storage for Smallholders',
    domain: 'Clean Energy & Agriculture',
    domainColor: '#0D9488',
    priority: 'MEDIUM',
    stage: 'SUBMITTED',
    population: '3,000 farmers',
    coordinates: { x: 54, y: 38 },
    summary: 'Post-harvest vegetable loss estimated at 30-40% due to lack of village-level micro cold rooms.',
  },
  {
    id: 'JS-2024-00006',
    district: 'Ranchi',
    block: 'Namkum Innovation Corridor',
    title: 'State Capability & Consortium Orchestration Hub',
    domain: 'Institutional Core',
    domainColor: '#4C1E4F',
    priority: 'HIGH',
    stage: 'PROJECT',
    population: 'Statewide Impact',
    coordinates: { x: 53, y: 55 },
    summary: 'Birsa Agricultural University and BIT Mesra joint lab network monitoring multi-district telemetry data.',
  },
];

export function InnovationMap() {
  const [selectedNode, setSelectedNode] = useState<DistrictChallengeNode>(DISTRICT_CHALLENGES[0]);
  const navigate = useNavigate();

  return (
    <section id="innovation-map" className="py-14 border-b border-neutral-200 bg-neutral-0 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b border-neutral-200 pb-5 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-caption font-mono uppercase tracking-widest text-brand-purple font-semibold">
              Geographic Distribution
            </span>
            <h2 className="text-h2 font-bold text-neutral-900 tracking-tight mt-1">
              Where challenges are emerging
            </h2>
          </div>
          <div className="flex items-center gap-3 text-caption text-neutral-600">
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600 inline-block" /> Water
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-green-600 inline-block" /> Agriculture
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-600 inline-block" /> Mining Safety
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-red-600 inline-block" /> Healthcare
            </span>
          </div>
        </div>

        {/* ── 2-Column Map & Live Detail Panel ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SVG Map Canvas (7 Cols) */}
          <div className="lg:col-span-7 rounded-sm border border-neutral-200 bg-neutral-50 p-6 relative">
            <div className="flex items-center justify-between text-caption font-mono text-neutral-400 mb-2">
              <span className="flex items-center gap-1">
                <Layers className="h-3.5 w-3.5" />
                JHARKHAND GEODETIC BOUNDARY (STATE LEVEL)
              </span>
              <span>24 DISTRICTS CONNECTED</span>
            </div>

            {/* Custom SVG Representation of Jharkhand Territory with District Nodes */}
            <div className="relative aspect-[4/3] w-full border border-neutral-200 bg-neutral-0 rounded-xs overflow-hidden">
              {/* Background Coordinate Grid Lines */}
              <svg className="absolute inset-0 w-full h-full stroke-neutral-100" strokeWidth="1">
                <line x1="25%" y1="0" x2="25%" y2="100%" />
                <line x1="50%" y1="0" x2="50%" y2="100%" />
                <line x1="75%" y1="0" x2="75%" y2="100%" />
                <line x1="0" y1="33%" x2="100%" y2="33%" />
                <line x1="0" y1="66%" x2="100%" y2="66%" />
              </svg>

              {/* Simplified Jharkhand State Contour Silhouette (Stylized SVG polygon) */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full fill-neutral-50 stroke-neutral-300"
                strokeWidth="1.25"
                strokeLinejoin="round"
              >
                {/* Jharkhand State Boundary Polygon */}
                <polygon points="18,32 30,16 54,12 70,22 84,24 88,40 82,54 84,72 70,86 52,90 32,88 22,76 14,56 12,42" />
                {/* Internal Plateau Division Contours */}
                <path d="M30,36 Q50,42 70,38" fill="none" stroke="#E7E4E8" strokeDasharray="2,2" />
                <path d="M24,60 Q52,58 80,62" fill="none" stroke="#E7E4E8" strokeDasharray="2,2" />
                <path d="M48,15 L52,88" fill="none" stroke="#E7E4E8" strokeDasharray="2,2" />
              </svg>

              {/* Interactive District Nodes */}
              {DISTRICT_CHALLENGES.map((node) => {
                const isSelected = selectedNode.id === node.id;

                return (
                  <div
                    key={node.id}
                    style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                    onClick={() => setSelectedNode(node)}
                    onMouseEnter={() => setSelectedNode(node)}
                  >
                    {/* Pulsing ring when selected */}
                    {isSelected && (
                      <span
                        style={{ borderColor: node.domainColor }}
                        className="absolute -inset-2 rounded-full border-2 animate-ping opacity-50"
                      />
                    )}

                    {/* Node Dot */}
                    <div
                      style={{ backgroundColor: node.domainColor }}
                      className={`h-4 w-4 rounded-full border-2 border-neutral-0 shadow-sm transition-transform ${
                        isSelected ? 'scale-125 ring-2 ring-brand-purple' : 'group-hover:scale-110'
                      }`}
                    />

                    {/* Permanent Location Tag on Map */}
                    <span className="absolute top-4 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-xs bg-neutral-900/80 text-neutral-0 text-[10px] font-mono whitespace-nowrap leading-none pointer-events-none">
                      {node.district}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-caption text-neutral-400 mt-2 text-left">
              Click or hover any district marker to inspect active telemetry, problem brief, and lifecycle status.
            </p>
          </div>

          {/* Interactive Inspection Detail Card (5 Cols) */}
          <div className="lg:col-span-5 rounded-sm border border-neutral-200 bg-neutral-0 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-1.5 text-caption font-mono text-brand-purple font-semibold">
                <MapPin className="h-3.5 w-3.5" />
                <span>{selectedNode.district} · {selectedNode.block}</span>
              </div>
              <Badge variant="purple" size="sm">
                {selectedNode.domain}
              </Badge>
            </div>

            <div>
              <span className="text-caption font-mono text-neutral-400">
                {selectedNode.id}
              </span>
              <h3 className="text-body font-bold text-neutral-900 leading-snug mt-0.5">
                {selectedNode.title}
              </h3>
              <p className="text-small text-neutral-600 mt-2 leading-relaxed">
                {selectedNode.summary}
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="p-3 bg-neutral-50 rounded-sm border border-neutral-200 grid grid-cols-2 gap-3 text-left">
              <div>
                <span className="text-[11px] text-neutral-400 block font-medium">Population Affected</span>
                <strong className="text-body-sm text-neutral-900 font-semibold">{selectedNode.population}</strong>
              </div>
              <div>
                <span className="text-[11px] text-neutral-400 block font-medium">Lifecycle Status</span>
                <StatusBadge type="challenge" value={selectedNode.stage} />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => navigate('/challenges')}
                className="text-small font-medium text-brand-purple hover:underline inline-flex items-center gap-1"
              >
                <span>Inspect Problem Dossier</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => navigate('/report')}
                className="text-small font-medium text-neutral-600 hover:text-neutral-900 inline-flex items-center gap-1"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Report Related Issue</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
