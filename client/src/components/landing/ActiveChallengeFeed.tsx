import { Badge } from '../ui/Badge';
import { StatusBadge } from '../ui/StatusBadge';
import { ArrowRight, MapPin, Users, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChallengeItem {
  id: string;
  title: string;
  domain: string;
  district: string;
  block: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  status: string;
  affected: string;
  summary: string;
  actionTrack: 'RESOLVE' | 'RESEARCH' | 'INNOVATE';
  stripColor: string;
}

const CHALLENGES: ChallengeItem[] = [
  {
    id: 'JS-2024-00001',
    title: 'Rural Water Pump Reliability & Telemetric Failure Prevention',
    domain: 'Water Resources & Sanitation',
    district: 'Khunti',
    block: 'Murhu Block',
    priority: 'HIGH',
    status: 'PILOT',
    affected: '2,000 residents across 5 hamlets',
    summary:
      'Frequent mechanical breakdowns of community borewell pumps create up to 14 days of downtime during peak dry season. Project currently tests local telemetry hardware designed by university consortium.',
    actionTrack: 'INNOVATE',
    stripColor: 'border-l-blue-600',
  },
  {
    id: 'JS-2024-00002',
    title: 'Rapid Soil Nutrient Diagnostic Kits for Rainfed Tribal Farmers',
    domain: 'Agriculture & Soil Science',
    district: 'Gumla',
    block: 'Bishunpur Block',
    priority: 'MEDIUM',
    status: 'MATCHING',
    affected: '5,000 smallholders',
    summary:
      'Lack of decentralized soil testing infrastructure leads to chronic nitrogen/phosphorus imbalance. University chemistry labs and AgriTech startups matching on spectrophotometric field sensors.',
    actionTrack: 'RESEARCH',
    stripColor: 'border-l-green-600',
  },
  {
    id: 'JS-2024-00003',
    title: 'Real-Time Seismic & Geotechnical Subsidence Alert Network',
    domain: 'Mining & Geological Safety',
    district: 'Dhanbad',
    block: 'Jharia Coalfield Sector 4',
    priority: 'CRITICAL',
    status: 'UNDER_VALIDATION',
    affected: '15,000 urban & peri-urban residents',
    summary:
      'Subterranean coal fires and abandoned seam voids creating ground instability in populated zones. Requires distributed tiltmeter and acoustic emission sensor deployment.',
    actionTrack: 'INNOVATE',
    stripColor: 'border-l-amber-600',
  },
  {
    id: 'JS-2024-00004',
    title: 'Low-Bandwidth Pediatric Teleconsultation for Primary Health Centers',
    domain: 'Public Health & Telemedicine',
    district: 'Simdega',
    block: 'Thethaitangar Block',
    priority: 'HIGH',
    status: 'SUBMITTED',
    affected: '8,000 residents',
    summary:
      'Absence of pediatric specialists at community health centers forces 60 km journeys to district hospitals. Prototype needed for offline-first asynchronous diagnostic imaging.',
    actionTrack: 'RESOLVE',
    stripColor: 'border-l-red-600',
  },
];

export function ActiveChallengeFeed() {
  const navigate = useNavigate();

  return (
    <section id="challenges-feed" className="py-14 border-b border-neutral-200 bg-neutral-0 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="border-b border-neutral-200 pb-5 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-caption font-mono uppercase tracking-widest text-brand-purple font-semibold">
              Live Pipeline Triage
            </span>
            <h2 className="text-h2 font-bold text-neutral-900 tracking-tight mt-1">
              Active Societal Challenges
            </h2>
          </div>
          <p className="max-w-md text-small text-neutral-600 leading-normal">
            Real community problems currently progressing from field observation through
            academic matchmaking, consortium formation, and impact contracts.
          </p>
        </div>

        {/* ── Asymmetric Editorial List (NOT generic floating cards) ── */}
        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {CHALLENGES.map((item) => (
            <div
              key={item.id}
              className={`py-6 pl-4 pr-2 border-l-4 ${item.stripColor} hover:bg-neutral-25 transition-colors`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Left: Metadata & Narrative */}
                <div className="space-y-2 max-w-3xl">
                  {/* Top Badges & Tracking ID */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-caption font-mono font-semibold text-neutral-400">
                      {item.id}
                    </span>
                    <span className="text-neutral-300">·</span>
                    <Badge variant="purple" size="sm">
                      {item.domain}
                    </Badge>
                    <StatusBadge type="actionTrack" value={item.actionTrack} />
                    {item.priority === 'CRITICAL' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-status-danger bg-status-danger-subtle px-2 py-0.5 rounded-pill border border-status-danger-border">
                        <AlertCircle className="h-3 w-3" />
                        Critical Priority
                      </span>
                    )}
                  </div>

                  {/* Headline Title */}
                  <h3 className="text-body-lg font-bold text-neutral-900 leading-snug tracking-tight">
                    {item.title}
                  </h3>

                  {/* Problem Narrative */}
                  <p className="text-small text-neutral-600 leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Ground Context Footnote */}
                  <div className="pt-1 flex items-center gap-4 text-caption text-neutral-500 flex-wrap">
                    <span className="flex items-center gap-1 font-medium text-neutral-700">
                      <MapPin className="h-3.5 w-3.5 text-brand-purple" />
                      {item.district} District · {item.block}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-neutral-400" />
                      {item.affected}
                    </span>
                  </div>
                </div>

                {/* Right: State Stage & Action CTA */}
                <div className="shrink-0 flex lg:flex-col items-end justify-between lg:justify-start gap-3 pt-1">
                  <div className="text-right">
                    <span className="text-[11px] text-neutral-400 block uppercase font-mono tracking-wider">
                      Current Stage
                    </span>
                    <StatusBadge type="challenge" value={item.status} className="mt-1" />
                  </div>

                  <button
                    onClick={() => navigate('/challenges')}
                    className="inline-flex items-center gap-1.5 text-small font-semibold text-brand-purple hover:text-neutral-900 hover:underline transition-colors mt-2"
                  >
                    <span>View Challenge Dossier</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to all challenges */}
        <div className="mt-8 flex items-center justify-between pt-4 text-small text-neutral-600">
          <span>Showing 4 of 42 active challenges across 24 districts</span>
          <button
            onClick={() => navigate('/challenges')}
            className="font-medium text-brand-purple hover:underline inline-flex items-center gap-1"
          >
            <span>Open Statewide Challenge Repository</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
