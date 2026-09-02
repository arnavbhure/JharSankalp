import { Users, Building2, GraduationCap, Briefcase, ArrowDown, ShieldCheck } from 'lucide-react';

export function EcosystemDiagram() {
  return (
    <section id="ecosystem" className="py-14 border-b border-neutral-200 bg-neutral-50 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="border-b border-neutral-200 pb-5 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-caption font-mono uppercase tracking-widest text-brand-purple font-semibold">
              Tripartite Operating Model
            </span>
            <h2 className="text-h2 font-bold text-neutral-900 tracking-tight mt-1">
              One challenge. Four forces working together.
            </h2>
          </div>
          <p className="max-w-md text-small text-neutral-600 leading-normal">
            JharSankalp replaces isolated departmental interventions with a collaborative pipeline
            connecting ground truth, public stewardship, laboratory R&D, and manufacturing scale.
          </p>
        </div>

        {/* ── Structural Ecosystem Flow Diagram ──────────────────── */}
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Level 1: Ground Problem Identification (Citizen / PRI) */}
          <div className="p-4 rounded-sm border border-brand-apricot-border bg-brand-apricot-surface text-neutral-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-subtle">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-brand-apricot text-neutral-900">
                <Users className="h-5 w-5 stroke-[2]" />
              </div>
              <div>
                <span className="text-caption font-mono uppercase font-semibold text-neutral-600">
                  Force 01 · Origin
                </span>
                <h3 className="text-body font-bold text-neutral-900">
                  Citizens, Gram Panchayats & Community Bodies
                </h3>
                <p className="text-caption text-neutral-700 mt-0.5">
                  Observe local failures on the ground and document evidence via voice, photos, and geotagged text.
                </p>
              </div>
            </div>
            <div className="shrink-0 text-caption font-medium bg-neutral-0/80 px-2.5 py-1 rounded-sm border border-brand-apricot-border">
              Problem Intake
            </div>
          </div>

          {/* Flow Connector Arrow */}
          <div className="flex justify-center -my-2 text-brand-purple">
            <ArrowDown className="h-5 w-5 stroke-[2.5]" />
          </div>

          {/* Level 2: Institutional Governance & Triage (Government) */}
          <div className="p-4 rounded-sm border border-brand-purple-border bg-brand-purple text-neutral-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-subtle">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-neutral-0/10 text-brand-apricot">
                <Building2 className="h-5 w-5 stroke-[2]" />
              </div>
              <div>
                <span className="text-caption font-mono uppercase font-semibold text-brand-apricot">
                  Force 02 · Stewardship
                </span>
                <h3 className="text-body font-bold text-neutral-0">
                  State Government & District Administrations
                </h3>
                <p className="text-caption text-neutral-0/75 mt-0.5">
                  Validates action track (Resolve, Research, Innovate), allocates state challenge grants, and monitors impact metrics.
                </p>
              </div>
            </div>
            <div className="shrink-0 text-caption font-medium bg-neutral-0/20 px-2.5 py-1 rounded-sm border border-neutral-0/20 text-neutral-0">
              State Triage & Oversight
            </div>
          </div>

          {/* Flow Connector Arrow */}
          <div className="flex justify-center -my-2 text-brand-purple">
            <ArrowDown className="h-5 w-5 stroke-[2.5]" />
          </div>

          {/* Level 3: Bilateral Collaborative Consortium (Universities <-> Industry) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative">
            {/* University Column (Khaki Tone) */}
            <div className="p-4 rounded-sm border border-brand-khaki-border/40 bg-brand-khaki-subtle text-neutral-900 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-neutral-0 text-neutral-800 border border-neutral-200">
                    <GraduationCap className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-caption font-mono uppercase font-semibold text-neutral-600">
                    Force 03 · Knowledge
                  </span>
                </div>
                <h3 className="text-body-sm font-bold text-neutral-900 mt-2">
                  Universities & Research Labs
                </h3>
                <p className="text-caption text-neutral-700 mt-1 leading-normal">
                  Faculty and student engineering teams contribute specialized laboratories, prototype design, and field testing.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-brand-khaki-border/30 text-[11px] text-neutral-600 flex justify-between">
                <span>BIT Sindri, BIT Mesra, BAU</span>
                <strong className="text-neutral-900">Lab Capacity</strong>
              </div>
            </div>

            {/* Bilateral Exchange Symbol (Desktop Overlay) */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-neutral-0 border border-neutral-300 rounded-full h-7 w-7 items-center justify-center shadow-subtle text-neutral-600">
              <span className="text-caption font-bold">↔</span>
            </div>

            {/* Industry Column (Coral Accent Tone) */}
            <div className="p-4 rounded-sm border border-brand-coral/30 bg-brand-coral-subtle text-neutral-900 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-neutral-0 text-brand-coral border border-neutral-200">
                    <Briefcase className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-caption font-mono uppercase font-semibold text-brand-coral">
                    Force 04 · Scale
                  </span>
                </div>
                <h3 className="text-body-sm font-bold text-neutral-900 mt-2">
                  Industry, MSMEs & Startups
                </h3>
                <p className="text-caption text-neutral-700 mt-1 leading-normal">
                  Publishes physical commitments: IoT hardware, fabrication facilities, manufacturing capacity, and technical mentors.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-brand-coral/20 text-[11px] text-neutral-600 flex justify-between">
                <span>AgriSens, Coal India, MSME Hubs</span>
                <strong className="text-brand-coral">Scale Commitment</strong>
              </div>
            </div>
          </div>

          {/* Flow Connector Arrow */}
          <div className="flex justify-center -my-2 text-brand-purple">
            <ArrowDown className="h-5 w-5 stroke-[2.5]" />
          </div>

          {/* Level 4: Final Measurable Community Impact */}
          <div className="p-4 rounded-sm border border-status-success-border bg-status-success-subtle text-neutral-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-status-success text-neutral-0">
                <ShieldCheck className="h-5 w-5 stroke-[2]" />
              </div>
              <div>
                <span className="text-caption font-mono uppercase font-semibold text-status-success">
                  Outcome · Verified Impact
                </span>
                <h3 className="text-body font-bold text-neutral-900">
                  Measurable, Evidence-Backed Ground Transformation
                </h3>
                <p className="text-caption text-neutral-700 mt-0.5">
                  Field pilot outcomes validated by PRI representatives, independent telemetry, and government audit.
                </p>
              </div>
            </div>
            <div className="shrink-0 text-caption font-semibold text-status-success bg-neutral-0 px-2.5 py-1 rounded-sm border border-status-success-border">
              Contract Completed
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
