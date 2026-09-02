import { IMAGES } from '../../config/images';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ImpactStories() {
  const navigate = useNavigate();

  return (
    <section id="impact" className="py-16 border-b border-neutral-200 bg-neutral-0 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b border-neutral-200 pb-5 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-brand-purple font-bold">
              <span className="h-2 w-2 rounded-full bg-brand-coral" />
              Verified Field Transformations
            </span>
            <h2 className="text-h2 sm:text-[2.25rem] font-bold text-neutral-900 tracking-tight">
              Real outcomes. Measured before and after.
            </h2>
          </div>
          <p className="max-w-md text-small text-neutral-600 leading-normal">
            Every JharSankalp intervention operates under a binding Impact Contract where baseline
            deficiencies must be mathematically resolved and verified by local communities.
          </p>
        </div>

        {/* ── Featured Field Narrative: Khunti Deep Borewell Pilot ── */}
        <div className="rounded-sm border-2 border-brand-purple bg-brand-purple text-neutral-0 shadow-medium overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left 5 Cols: Full-Bleed Field Photography with Accent Overlay */}
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-[420px] bg-neutral-900">
              <img
                src={IMAGES.waterInfrastructure.url}
                alt={IMAGES.waterInfrastructure.alt}
                className="h-full w-full object-cover grayscale-[10%] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/95 via-brand-purple/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-brand-purple" />

              <div className="absolute bottom-4 left-4 right-4 bg-neutral-900/85 p-3 rounded-xs border border-white/20 text-white text-caption leading-snug">
                <span className="font-bold text-brand-apricot block uppercase font-mono text-[10px]">
                  Field Verification Node #KHT-04
                </span>
                {IMAGES.waterInfrastructure.caption}
              </div>
            </div>

            {/* Right 7 Cols: Saturated Impact Contract Story & Metrics */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-pill bg-brand-coral text-white text-caption font-bold uppercase tracking-wider font-mono">
                    Impact Contract #IC-2024-001
                  </span>
                  <span className="text-white/40">·</span>
                  <span className="text-caption font-mono font-bold text-brand-apricot">
                    Khunti District · Murhu Block
                  </span>
                </div>

                <h3 className="text-h2 sm:text-[2rem] font-bold text-white tracking-tight leading-snug">
                  Reducing Community Water Pump Downtime from 12.4 Days to 3.2 Days
                </h3>

                <p className="text-body-sm text-neutral-0/85 leading-relaxed">
                  In 5 tribal hamlets in Murhu block, repeated deep-bore pump breakdowns left 2,000 residents
                  without clean drinking water for up to two weeks per incident. A university-MSME consortium
                  (BIT Sindri Mechanical Lab + AgriSens Technologies) engineered low-power vibration telemetry pods
                  that predict motor stator burnout 48 hours before failure.
                </p>

                {/* Saturated Baseline vs. Target vs. Verified Metric Tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 bg-white/10 rounded-sm border border-white/20 text-left">
                    <span className="text-[11px] font-mono text-brand-apricot uppercase font-bold block">
                      Field Baseline
                    </span>
                    <div className="text-[2rem] font-extrabold text-white font-mono mt-0.5">
                      12.4d
                    </div>
                    <span className="text-[11px] text-white/70 block mt-0.5">Historical downtime</span>
                  </div>

                  <div className="p-4 bg-white/10 rounded-sm border border-white/20 text-left">
                    <span className="text-[11px] font-mono text-brand-coral uppercase font-bold block">
                      Contract Target
                    </span>
                    <div className="text-[2rem] font-extrabold text-brand-coral font-mono mt-0.5">
                      ≤ 4.0d
                    </div>
                    <span className="text-[11px] text-white/70 block mt-0.5">State grant target</span>
                  </div>

                  <div className="p-4 bg-brand-apricot text-neutral-900 rounded-sm border-2 border-brand-coral text-left shadow-md">
                    <span className="text-[11px] font-mono text-brand-purple uppercase font-bold block">
                      Verified Result
                    </span>
                    <div className="text-[2rem] font-extrabold text-brand-purple font-mono mt-0.5">
                      3.2d
                    </div>
                    <span className="text-[11px] font-bold text-neutral-800 block mt-0.5">Panchayat certified</span>
                  </div>
                </div>
              </div>

              {/* Sign-off strip */}
              <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-caption text-neutral-0/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-brand-coral" />
                  <span>Consortium: <strong>BIT Sindri</strong> (Research) + <strong>AgriSens MSME</strong> (Production)</span>
                </div>

                <button
                  onClick={() => navigate('/challenges')}
                  className="font-bold text-brand-apricot hover:text-white underline inline-flex items-center gap-1"
                >
                  <span>Review Verification Dossier</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
