import { Users, Building2, GraduationCap, Briefcase } from 'lucide-react';
import { BrandMark } from '../common/BrandMark';

export function EcosystemDiagram() {
  return (
    <section id="ecosystem" className="py-16 border-b border-neutral-200 bg-[#F9F8F9] text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b border-neutral-200 pb-5 mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-brand-purple font-bold">
              <span className="h-2 w-2 rounded-full bg-brand-coral" />
              Tripartite Operating Model
            </span>
            <h2 className="text-h2 sm:text-[2.25rem] font-bold text-neutral-900 tracking-tight">
              One challenge. Four forces working together.
            </h2>
          </div>
          <p className="max-w-md text-small text-neutral-600 leading-normal">
            JharSankalp eliminates departmental silos by synchronizing citizen ground reality,
            state oversight, university laboratory research, and industrial scale.
          </p>
        </div>

        {/* ── Central Hub & 4 Quadruple-Helix Forces Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-center">
          {/* ── FORCE 01: Citizens (Soft Apricot Solid Card) ── */}
          <div className="lg:col-span-5 p-6 rounded-sm border-2 border-brand-apricot-border bg-brand-apricot text-neutral-900 shadow-medium flex flex-col justify-between space-y-4 transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-brand-purple text-brand-apricot shadow-sm">
                <Users className="h-6 w-6 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-pill bg-brand-purple/15 text-brand-purple border border-brand-purple/20">
                Force 01 · Origin
              </span>
            </div>

            <div>
              <h3 className="text-h3 font-extrabold text-neutral-900 tracking-tight">
                Citizens & Gram Panchayats
              </h3>
              <p className="text-small text-neutral-800 mt-2 leading-relaxed">
                Observe infrastructural and societal failures on the ground. Submit geotagged photos,
                voice notes, and local community observations from 24 districts.
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-900/15 flex items-center justify-between text-caption font-bold text-brand-purple">
              <span>Ground Truth Layer</span>
              <span>GPS + Voice Verified</span>
            </div>
          </div>

          {/* ── FORCE 02: Government (Deep Purple Solid Card) ── */}
          <div className="lg:col-span-7 p-6 rounded-sm border-2 border-brand-purple-hover bg-brand-purple text-neutral-0 shadow-medium flex flex-col justify-between space-y-4 transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-white/10 text-brand-apricot shadow-sm">
                <Building2 className="h-6 w-6 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-pill bg-brand-apricot/20 text-brand-apricot border border-brand-apricot/30">
                Force 02 · Stewardship
              </span>
            </div>

            <div>
              <h3 className="text-h3 font-extrabold text-white tracking-tight">
                State Government & District Authorities
              </h3>
              <p className="text-small text-neutral-0/85 mt-2 leading-relaxed">
                Triage incoming challenges into three action tracks: <strong>Resolve</strong> (routine), <strong>Research</strong> (academic), or <strong>Innovate</strong> (consortium).
                Issue funding grants and validate field pilot outcomes.
              </p>
            </div>

            <div className="pt-3 border-t border-white/20 flex items-center justify-between text-caption font-bold text-brand-apricot">
              <span>Public Governance Layer</span>
              <span>Impact Contracts & Grants</span>
            </div>
          </div>

          {/* ── CENTERPIECE: The JharSankalp Innovation Exchange Core ── */}
          <div className="lg:col-span-12 p-5 rounded-sm border-2 border-brand-coral bg-white shadow-medium flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <BrandMark size="lg" />
              <div>
                <span className="text-caption font-mono uppercase text-brand-coral font-bold tracking-wider">
                  The Coordination Nexus
                </span>
                <h4 className="text-h3 font-extrabold text-neutral-900 tracking-tight leading-none mt-0.5">
                  JharSankalp Orchestration Engine
                </h4>
                <p className="text-caption text-neutral-600 mt-1">
                  Continuously harmonizing: Challenge Intake → AI Triage → Capability Graph → Impact Contract → Ground Pilot → Verified Policy
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-caption font-mono font-bold">
              <span className="px-3 py-1 bg-brand-apricot-surface text-brand-purple border border-brand-apricot-border rounded-sm">
                Intake
              </span>
              <span className="text-neutral-400">→</span>
              <span className="px-3 py-1 bg-brand-purple-subtle text-brand-purple border border-brand-purple-border/30 rounded-sm">
                Matching
              </span>
              <span className="text-neutral-400">→</span>
              <span className="px-3 py-1 bg-brand-coral-subtle text-brand-coral border border-brand-coral/30 rounded-sm">
                Consortium
              </span>
              <span className="text-neutral-400">→</span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-sm">
                Impact
              </span>
            </div>
          </div>

          {/* ── FORCE 03: Universities (Khaki Solid Card) ── */}
          <div className="lg:col-span-7 p-6 rounded-sm border-2 border-brand-khaki-border bg-brand-khaki text-neutral-900 shadow-medium flex flex-col justify-between space-y-4 transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-neutral-900 text-brand-khaki shadow-sm">
                <GraduationCap className="h-6 w-6 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-pill bg-neutral-900/15 text-neutral-900 border border-neutral-900/25">
                Force 03 · Knowledge & R&D
              </span>
            </div>

            <div>
              <h3 className="text-h3 font-extrabold text-neutral-900 tracking-tight">
                Universities & Higher Education Institutions
              </h3>
              <p className="text-small text-neutral-900/90 mt-2 leading-relaxed">
                BIT Sindri, BIT Mesra, BAU, and engineering colleges deploy faculty researchers,
                student innovators, and specialized testing laboratories to develop functional prototypes.
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-900/20 flex items-center justify-between text-caption font-bold text-neutral-900">
              <span>Capability Graph Certified</span>
              <span>Prototyping & Lab Validation</span>
            </div>
          </div>

          {/* ── FORCE 04: Industry & MSMEs (Vibrant Coral Solid Card) ── */}
          <div className="lg:col-span-5 p-6 rounded-sm border-2 border-brand-coral-hover bg-brand-coral text-white shadow-medium flex flex-col justify-between space-y-4 transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-white text-brand-coral shadow-sm">
                <Briefcase className="h-6 w-6 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-pill bg-white/20 text-white border border-white/30">
                Force 04 · Production & Scale
              </span>
            </div>

            <div>
              <h3 className="text-h3 font-extrabold text-white tracking-tight">
                Industry, Startups & MSMEs
              </h3>
              <p className="text-small text-white/90 mt-2 leading-relaxed">
                Commit manufacturing tooling, IoT sensors, hardware testing rigs, and corporate CSR funding
                to take laboratory prototypes into robust field mass-production.
              </p>
            </div>

            <div className="pt-3 border-t border-white/25 flex items-center justify-between text-caption font-bold text-brand-apricot">
              <span>Industrial Execution</span>
              <span>Physical Hardware Supply</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
