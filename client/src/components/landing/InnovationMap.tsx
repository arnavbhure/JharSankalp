import { useState } from 'react';
import { StatusBadge } from '../ui/StatusBadge';
import { MapPin, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DistrictChallengeNode {
  id: string;
  district: string;
  block: string;
  title: string;
  domain: string;
  domainColor: string;
  domainBg: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  stage: string;
  population: string;
  coordinates: { x: number; y: number }; // Relative SVG percentage
  summary: string;
  consortium: string;
  metricLabel: string;
  metricValue: string;
}

const DISTRICT_CHALLENGES: DistrictChallengeNode[] = [
  {
    id: 'JS-2024-00001',
    district: 'Khunti',
    block: 'Murhu Block',
    title: 'Predictive Maintenance of Rural Water Pumps',
    domain: 'Water Resources',
    domainColor: '#2563EB',
    domainBg: 'bg-blue-600',
    priority: 'HIGH',
    stage: 'PILOT',
    population: '2,000 residents',
    coordinates: { x: 48, y: 64 },
    summary:
      'Hand pumps in 5 tribal villages experiencing repeated mechanical failures with 10-14 days downtime per incident.',
    consortium: 'BIT Sindri (Mechanical) + AgriSens Technologies (MSME)',
    metricLabel: 'Downtime Reduction',
    metricValue: '12.4d → 3.2d',
  },
  {
    id: 'JS-2024-00002',
    district: 'Gumla',
    block: 'Bishunpur Block',
    title: 'Rapid Soil Health Diagnostic Kits for Tribal Farmers',
    domain: 'Agriculture',
    domainColor: '#16A34A',
    domainBg: 'bg-green-600',
    priority: 'MEDIUM',
    stage: 'MATCHING',
    population: '5,000 farmers',
    coordinates: { x: 28, y: 62 },
    summary:
      'Lack of real-time soil nutrient testing leading to chronic nitrogen/phosphorus imbalance in rainfed uplands.',
    consortium: 'Birsa Agricultural University + Tribal Farmer Producer Org',
    metricLabel: 'NPK Testing Speed',
    metricValue: '14 days → 15 mins',
  },
  {
    id: 'JS-2024-00003',
    district: 'Dhanbad',
    block: 'Jharia Coalfield',
    title: 'Real-Time Seismic Early Warning for Mine Subsidence',
    domain: 'Mining Safety',
    domainColor: '#FA7E61',
    domainBg: 'bg-brand-coral',
    priority: 'CRITICAL',
    stage: 'UNDER_VALIDATION',
    population: '15,000 residents',
    coordinates: { x: 74, y: 44 },
    summary:
      'Ground shifting hazard over abandoned subterranean coal seam fires requiring continuous acoustic telemetry.',
    consortium: 'IIT (ISM) Dhanbad Geotechnical Lab + CMPDI',
    metricLabel: 'Warning Lead Time',
    metricValue: '+48 Hours Alert',
  },
  {
    id: 'JS-2024-00004',
    district: 'Simdega',
    block: 'Thethaitangar Block',
    title: 'Low-Bandwidth Pediatric Teleconsultation Pods',
    domain: 'Healthcare',
    domainColor: '#F44174',
    domainBg: 'bg-brand-strawberry',
    priority: 'HIGH',
    stage: 'SUBMITTED',
    population: '8,000 residents',
    coordinates: { x: 32, y: 84 },
    summary:
      'Primary healthcare centers over 40 km away; need solar offline-first diagnostic imaging consultation pods.',
    consortium: 'RIMS Ranchi Pediatrics + HealthTech Accelerator',
    metricLabel: 'Hamlets Connected',
    metricValue: '12 Hamlets',
  },
  {
    id: 'JS-2024-00005',
    district: 'Hazaribagh',
    block: 'Ichak Block',
    title: 'Solar Micro Cold Storage for Smallholders',
    domain: 'Clean Energy',
    domainColor: '#D97706',
    domainBg: 'bg-amber-600',
    priority: 'MEDIUM',
    stage: 'SUBMITTED',
    population: '3,000 farmers',
    coordinates: { x: 54, y: 36 },
    summary:
      'Post-harvest vegetable spoilage exceeds 35% during summer due to lack of village-level cold storage.',
    consortium: 'BIT Mesra Energy Dept. + GreenGrid Startups',
    metricLabel: 'Spoilage Avoidance',
    metricValue: '-75% Loss',
  },
  {
    id: 'JS-2024-00006',
    district: 'Ranchi',
    block: 'Namkum Innovation Corridor',
    title: 'State Capability & Consortium Orchestration Hub',
    domain: 'Coordination Core',
    domainColor: '#4C1E4F',
    domainBg: 'bg-brand-purple',
    priority: 'HIGH',
    stage: 'PROJECT',
    population: 'Statewide Impact',
    coordinates: { x: 53, y: 55 },
    summary:
      'Central command telemetry coordinating university lab testing, government challenge grants, and field pilots.',
    consortium: 'State Higher & Technical Education Dept.',
    metricLabel: 'Active Missions',
    metricValue: '42 Projects',
  },
];

export function InnovationMap() {
  const [selectedNode, setSelectedNode] = useState<DistrictChallengeNode>(DISTRICT_CHALLENGES[0]);
  const navigate = useNavigate();

  return (
    <section
      id="innovation-map"
      className="py-16 border-b border-neutral-200 bg-neutral-0 text-left"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b border-neutral-200 pb-5 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#163D2B] font-bold">
              <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
              GEOGRAPHIC INNOVATION MAP
            </span>
            <h2 className="text-h2 sm:text-[2.25rem] font-bold text-neutral-900 tracking-tight font-sans">
              Challenges don&apos;t exist in isolation.
            </h2>
            <p className="text-small text-neutral-600 max-w-xl">
              Explore where problems are emerging across Jharkhand and how communities are
              responding.
            </p>
          </div>

          {/* Color Legend Bar */}
          <div className="flex items-center gap-3 flex-wrap text-caption font-bold text-neutral-700 bg-neutral-50 px-3 py-1.5 rounded-pill border border-neutral-200">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600" /> Water
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-green-600" /> Agriculture
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-coral" /> Mining Safety
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-strawberry" /> Healthcare
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-600" /> Clean Energy
            </span>
          </div>
        </div>

        {/* ── 2-Column Map & Live Detail Panel ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Map Canvas (7 Cols) with Warm Soft Apricot Canvas */}
          <div className="lg:col-span-7 rounded-sm border-2 border-brand-purple bg-[#FFF9F3] p-5 shadow-medium relative">
            <div className="flex items-center justify-between text-caption font-mono font-bold text-brand-purple mb-3">
              <span className="flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-brand-coral" />
                JHARKHAND GEODETIC BOUNDARY · 24 DISTRICTS
              </span>
              <span className="bg-brand-purple text-neutral-0 px-2 py-0.5 rounded-sm text-[11px]">
                LIVE GPS TELEMETRY
              </span>
            </div>

            {/* Custom SVG Representation of Jharkhand Territory with Rich Topography */}
            <div className="relative aspect-[4/3] w-full border border-brand-apricot-border bg-white rounded-xs overflow-hidden shadow-inner">
              {/* Coordinate Grid Lines */}
              <svg className="absolute inset-0 w-full h-full stroke-neutral-150" strokeWidth="0.75">
                <line x1="20%" y1="0" x2="20%" y2="100%" />
                <line x1="40%" y1="0" x2="40%" y2="100%" />
                <line x1="60%" y1="0" x2="60%" y2="100%" />
                <line x1="80%" y1="0" x2="80%" y2="100%" />
                <line x1="0" y1="25%" x2="100%" y2="25%" />
                <line x1="0" y1="50%" x2="100%" y2="50%" />
                <line x1="0" y1="75%" x2="100%" y2="75%" />
              </svg>

              {/* Stylized State Silhouette with Soft Apricot Plateau Fill & Deep Purple Outlines */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                {/* State Silhouette Polygon */}
                <polygon
                  points="18,32 30,16 54,12 70,22 84,24 88,40 82,54 84,72 70,86 52,90 32,88 22,76 14,56 12,42"
                  fill="#FEE1C7"
                  stroke="#4C1E4F"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />

                {/* Sub-Plateau Boundaries (Chota Nagpur & Santhal Pargana) */}
                <path
                  d="M30,36 Q50,42 70,38"
                  fill="none"
                  stroke="#B5A886"
                  strokeWidth="1.5"
                  strokeDasharray="3,3"
                />
                <path
                  d="M24,60 Q52,58 80,62"
                  fill="none"
                  stroke="#B5A886"
                  strokeWidth="1.5"
                  strokeDasharray="3,3"
                />
                <path
                  d="M48,15 L52,88"
                  fill="none"
                  stroke="#B5A886"
                  strokeWidth="1.5"
                  strokeDasharray="3,3"
                />
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
                    {/* Animated Pulsing Ring */}
                    <span
                      style={{ borderColor: node.domainColor }}
                      className={`absolute -inset-2.5 rounded-full border-2 animate-ping opacity-60 ${
                        isSelected ? 'opacity-100' : 'opacity-40'
                      }`}
                    />

                    {/* Saturated Node Marker */}
                    <div
                      style={{ backgroundColor: node.domainColor }}
                      className={`h-5 w-5 rounded-full border-2 border-white shadow-md transition-all duration-200 ${
                        isSelected ? 'scale-125 ring-4 ring-brand-purple' : 'group-hover:scale-110'
                      }`}
                    />

                    {/* Location Badge */}
                    <span
                      className={`absolute top-5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-xs text-[10px] font-mono font-bold whitespace-nowrap shadow-sm pointer-events-none transition-colors ${
                        isSelected
                          ? 'bg-brand-purple text-white'
                          : 'bg-neutral-900 text-white group-hover:bg-brand-purple'
                      }`}
                    >
                      {node.district}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Instruction Footer */}
            <div className="mt-3 flex items-center justify-between text-caption text-neutral-600 font-medium">
              <span>Hover or click any district node to inspect challenge telemetry</span>
              <span className="font-mono text-brand-purple font-bold">
                6 SATELLITE NODES ACTIVE
              </span>
            </div>
          </div>

          {/* Interactive Inspection Detail Card (5 Cols) with Vibrant Domain Header */}
          <div className="lg:col-span-5 rounded-sm border-2 border-neutral-200 bg-white shadow-medium overflow-hidden">
            {/* Color Accent Top Bar Matching Active Domain */}
            <div
              style={{ backgroundColor: selectedNode.domainColor }}
              className="px-5 py-3 text-white flex items-center justify-between"
            >
              <div className="flex items-center gap-2 font-mono text-caption font-bold tracking-wider uppercase">
                <MapPin className="h-4 w-4" />
                <span>
                  {selectedNode.district} · {selectedNode.block}
                </span>
              </div>
              <span className="px-2 py-0.5 bg-white/20 rounded-pill text-[11px] font-extrabold uppercase tracking-wide">
                {selectedNode.domain}
              </span>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4 text-left">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-caption font-mono font-bold text-neutral-400">
                    {selectedNode.id}
                  </span>
                  <StatusBadge type="challenge" value={selectedNode.stage} />
                </div>
                <h3 className="text-h3 font-bold text-neutral-900 leading-snug mt-1">
                  {selectedNode.title}
                </h3>
                <p className="text-small text-neutral-600 mt-2 leading-relaxed">
                  {selectedNode.summary}
                </p>
              </div>

              {/* Key Metrics Grid */}
              <div className="p-4 bg-neutral-50 rounded-sm border border-neutral-200 grid grid-cols-2 gap-3 text-left">
                <div>
                  <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                    Impact Population
                  </span>
                  <strong className="text-body font-extrabold text-neutral-900 font-mono">
                    {selectedNode.population}
                  </strong>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                    {selectedNode.metricLabel}
                  </span>
                  <strong className="text-body font-extrabold text-brand-purple font-mono">
                    {selectedNode.metricValue}
                  </strong>
                </div>
              </div>

              {/* Active Consortium Lead */}
              <div className="p-3 bg-brand-apricot-surface rounded-sm border border-brand-apricot-border text-left">
                <div className="flex items-center gap-1.5 text-caption font-bold text-brand-purple uppercase font-mono">
                  <CheckCircle2 className="h-3.5 w-3.5 text-status-success" />
                  <span>Assigned Consortium</span>
                </div>
                <p className="text-small font-bold text-neutral-900 mt-0.5">
                  {selectedNode.consortium}
                </p>
              </div>

              {/* Actions Footer */}
              <div className="pt-2 flex items-center justify-between border-t border-neutral-100">
                <button
                  onClick={() => navigate('/challenges')}
                  className="inline-flex items-center gap-1.5 text-small font-bold text-brand-purple hover:text-brand-purple-hover hover:underline"
                >
                  <span>Open Challenge Dossier</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => navigate('/report')}
                  className="inline-flex items-center gap-1 text-small font-semibold text-brand-coral hover:text-brand-coral-hover"
                >
                  <span>Submit Related Data</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
