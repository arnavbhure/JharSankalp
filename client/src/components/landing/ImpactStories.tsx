import { IMAGES } from '../../config/images';
import { Badge } from '../ui/Badge';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ImpactStories() {
  const navigate = useNavigate();

  return (
    <section id="impact" className="py-14 border-b border-neutral-200 bg-neutral-0 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="border-b border-neutral-200 pb-5 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-caption font-mono uppercase tracking-widest text-brand-purple font-semibold">
              Ground Verification
            </span>
            <h2 className="text-h2 font-bold text-neutral-900 tracking-tight mt-1">
              Real outcomes. Measured before and after.
            </h2>
          </div>
          <p className="max-w-md text-small text-neutral-600 leading-normal">
            Every JharSankalp intervention operates under a binding Impact Contract where baseline
            deficiencies must be mathematically resolved and verified by local communities.
          </p>
        </div>

        {/* ── Featured Field Narrative (Murhu Block, Khunti Case) ── */}
        <div className="rounded-sm border border-neutral-200 bg-neutral-25 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left 5 Cols: Contextual Field Photography */}
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto bg-neutral-200">
              <img
                src={IMAGES.waterInfrastructure.url}
                alt={IMAGES.waterInfrastructure.alt}
                className="h-full w-full object-cover grayscale-[15%] contrast-[1.05]"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-neutral-900/80 p-2 text-neutral-0 rounded-xs text-[11px] leading-tight">
                {IMAGES.waterInfrastructure.caption}
              </div>
            </div>

            {/* Right 7 Cols: Impact Contract Story & Metrics */}
            <div className="lg:col-span-7 p-6 lg:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="purple" size="sm">
                    Impact Contract #IC-2024-001
                  </Badge>
                  <span className="text-neutral-300">·</span>
                  <span className="text-caption font-mono font-medium text-neutral-500">
                    Khunti District · Murhu Block
                  </span>
                </div>

                <h3 className="text-h3 font-bold text-neutral-900 tracking-tight leading-snug">
                  Reducing Community Water Pump Downtime from 12 Days to 3.2 Days
                </h3>

                <p className="text-small text-neutral-600 leading-relaxed">
                  In 5 tribal hamlets in Murhu block, repeated deep-bore pump breakdown left 2,000 residents
                  without clean drinking water for up to two weeks per incident. A university-MSME consortium
                  (BIT Sindri Mechanical Lab + AgriSens Technologies) engineered low-power vibration telemetry pods
                  that predict motor stator burnout 48 hours before failure.
                </p>

                {/* Structured Baseline vs. Verified Target Comparison */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-neutral-0 border border-neutral-200 rounded-sm">
                    <span className="text-[11px] font-mono text-neutral-400 block uppercase">
                      Baseline
                    </span>
                    <strong className="text-h3 font-bold text-neutral-900 font-mono">12.4 Days</strong>
                    <span className="text-[11px] text-neutral-500 block mt-0.5">Average repair downtime</span>
                  </div>

                  <div className="p-3 bg-neutral-0 border border-neutral-200 rounded-sm">
                    <span className="text-[11px] font-mono text-neutral-400 block uppercase">
                      Target
                    </span>
                    <strong className="text-h3 font-bold text-brand-coral font-mono">≤ 4.0 Days</strong>
                    <span className="text-[11px] text-neutral-500 block mt-0.5">Contracted commitment</span>
                  </div>

                  <div className="p-3 bg-brand-purple-subtle border border-brand-purple-border/30 rounded-sm">
                    <span className="text-[11px] font-mono text-brand-purple block uppercase font-semibold">
                      Verified Result
                    </span>
                    <strong className="text-h3 font-bold text-brand-purple font-mono">3.2 Days</strong>
                    <span className="text-[11px] text-brand-purple/80 block mt-0.5">Gram Panchayat certified</span>
                  </div>
                </div>
              </div>

              {/* Stakeholder Sign-Off Strip */}
              <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-caption text-neutral-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-status-success" />
                  <span>Consortium: <strong>BIT Sindri</strong> (Research) + <strong>AgriSens</strong> (MSME)</span>
                </div>

                <button
                  onClick={() => navigate('/challenges')}
                  className="font-medium text-brand-purple hover:underline inline-flex items-center gap-1"
                >
                  <span>Review Verification Audit</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
