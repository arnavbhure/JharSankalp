import { StatusBadge } from '../ui/StatusBadge';
import { IMAGES } from '../../config/images';
import { ArrowRight, MapPin, Users, AlertTriangle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ActiveChallengeFeed() {
  const navigate = useNavigate();

  const stackedChallenges = [
    {
      id: 'JS-2024-00002',
      title: 'Rapid Soil Nutrient Diagnostic Kits for Tribal Farmers',
      domain: 'Agriculture & Soil Science',
      district: 'Gumla',
      block: 'Bishunpur Block',
      priority: 'MEDIUM',
      status: 'MATCHING',
      affected: '5,000 smallholders',
      metric: 'NPK test speed: 14 days → 15 mins',
      borderClass: 'border-l-4 border-l-emerald-600 bg-emerald-50/40 hover:bg-emerald-50/70',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      tagColor: 'text-emerald-700',
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
      metric: 'Continuous acoustic sub-surface monitoring',
      borderClass: 'border-l-4 border-l-brand-coral bg-[#FFF7F4] hover:bg-[#FFEFEA]',
      badgeClass: 'bg-brand-coral-subtle text-brand-coral-hover border-brand-coral/30',
      tagColor: 'text-brand-coral',
    },
    {
      id: 'JS-2024-00004',
      title: 'Low-Bandwidth Pediatric Teleconsultation for Primary Health Centers',
      domain: 'Public Health & Telemedicine',
      district: 'Simdega',
      block: 'Thethaitangar Block',
      priority: 'HIGH',
      status: 'SUBMITTED',
      affected: '8,000 residents across 12 hamlets',
      metric: 'Offline-first asynchronous diagnostic imaging',
      borderClass: 'border-l-4 border-l-brand-strawberry bg-pink-50/30 hover:bg-pink-50/60',
      badgeClass: 'bg-pink-100 text-brand-strawberry border-pink-300',
      tagColor: 'text-brand-strawberry',
    },
  ];

  return (
    <section id="challenges-feed" className="py-16 border-b border-neutral-200 bg-neutral-0 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b border-neutral-200 pb-5 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-brand-purple font-bold">
              <span className="h-2 w-2 rounded-full bg-brand-coral" />
              Live Pipeline Triage
            </span>
            <h2 className="text-h2 sm:text-[2.25rem] font-bold text-neutral-900 tracking-tight">
              Active Societal Challenges
            </h2>
          </div>
          <p className="max-w-md text-small text-neutral-600 leading-normal">
            Real problems currently progressing from field observation through
            academic matchmaking, consortium formation, and impact contracts.
          </p>
        </div>

        {/* ── Asymmetric Layout (Left Spotlight / Right Stacked Rows) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* ── LEFT (5 Cols): Large Featured Challenge Spotlight ── */}
          <div className="lg:col-span-5 rounded-sm border-2 border-brand-purple bg-white shadow-medium overflow-hidden flex flex-col justify-between">
            {/* Top Photo with Vignette */}
            <div className="relative aspect-[16/10] w-full bg-neutral-900 overflow-hidden">
              <img
                src={IMAGES.waterInfrastructure.url}
                alt={IMAGES.waterInfrastructure.alt}
                className="h-full w-full object-cover grayscale-[10%] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/90 via-brand-purple/20 to-transparent" />

              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-pill bg-brand-coral text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  Active Field Pilot
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-caption font-mono uppercase text-brand-apricot font-bold">
                  JS-2024-00001 · Water Resources
                </span>
                <h3 className="text-h3 font-bold leading-tight mt-0.5">
                  Rural Water Pump Telemetry Pilot
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-caption font-bold text-brand-purple">
                  <MapPin className="h-4 w-4 text-brand-coral" />
                  <span>Khunti District · Murhu Block (5 Villages)</span>
                </div>

                <p className="text-small text-neutral-600 leading-relaxed">
                  Community handpumps suffered repeated mechanical failures during peak summer,
                  leaving 2,000 residents with up to 14 days of downtime. BIT Sindri and AgriSens MSME
                  deployed predictive vibration telemetry pods to anticipate stator failure.
                </p>

                {/* Progress Metric Bar */}
                <div className="p-3 bg-brand-apricot-surface rounded-sm border border-brand-apricot-border space-y-1.5">
                  <div className="flex items-center justify-between text-caption font-bold">
                    <span className="text-neutral-700">Downtime Reduction Progress</span>
                    <span className="text-brand-purple font-mono">74% Target Reached</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-coral rounded-full w-[74%]" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 pt-0.5">
                    <span>Baseline: 12.4d</span>
                    <strong className="text-brand-purple">Current: 3.2d</strong>
                    <span>Target: ≤ 4.0d</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => navigate('/challenges')}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-sm bg-brand-purple hover:bg-brand-purple-hover text-white py-2.5 px-4 text-small font-bold transition-colors shadow-subtle"
                >
                  <span>Inspect Full Problem Dossier</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT (7 Cols): Stacked Color-Communicating Rows ── */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            {stackedChallenges.map((item) => (
              <div
                key={item.id}
                className={`p-5 rounded-sm border-2 border-neutral-200 shadow-subtle transition-all duration-200 flex flex-col justify-between space-y-3 ${item.borderClass}`}
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-caption font-mono font-bold text-neutral-400">
                      {item.id}
                    </span>
                    <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-pill border ${item.badgeClass}`}>
                      {item.domain}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.priority === 'CRITICAL' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-status-danger bg-status-danger-subtle px-2 py-0.5 rounded-pill border border-status-danger-border">
                        <AlertTriangle className="h-3 w-3" />
                        Critical Priority
                      </span>
                    )}
                    <StatusBadge type="challenge" value={item.status} />
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h4 className="text-body font-bold text-neutral-900 leading-snug">
                    {item.title}
                  </h4>
                  <div className="mt-1.5 flex flex-wrap items-center gap-4 text-caption text-neutral-600 font-medium">
                    <span className="flex items-center gap-1">
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

                {/* Footnote & Action */}
                <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between">
                  <span className="text-caption font-mono font-bold text-neutral-700">
                    {item.metric}
                  </span>

                  <button
                    onClick={() => navigate('/challenges')}
                    className="inline-flex items-center gap-1 text-small font-bold text-brand-purple hover:underline"
                  >
                    <span>View Details</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Bottom Repository Bar */}
            <div className="p-4 bg-brand-apricot/30 rounded-sm border border-brand-apricot-border flex items-center justify-between">
              <span className="text-small font-medium text-neutral-700">
                Viewing 4 of 42 validated challenges across 24 districts
              </span>
              <button
                onClick={() => navigate('/challenges')}
                className="text-small font-bold text-brand-purple hover:underline inline-flex items-center gap-1.5"
              >
                <span>Browse All 42 Challenges</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
