import { Users, Building2, GraduationCap, Briefcase } from 'lucide-react';
import { BrandMark } from '../common/BrandMark';

export function EcosystemDiagram() {
  return (
    <section id="ecosystem" className="py-20 border-b border-[#EEEAE1] bg-[#F8F6F1] text-left relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b border-[#EEEAE1] pb-6 mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#123B2A] font-bold">
              <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
              COLLABORATIVE OPERATING MODEL
            </div>
            <h2 className="text-[2.2rem] sm:text-[2.6rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              One Challenge. Four Forces in Sync.
            </h2>
          </div>
          <p className="max-w-md text-[14px] text-[#6B5845] leading-relaxed">
            JharSankalp eliminates departmental silos by synchronizing citizen ground reality, state oversight, university research, and industrial scale.
          </p>
        </div>

        {/* ── Central Hub & 4 Quadruple-Helix Forces Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-center">
          {/* ── FORCE 01: Citizens (Soft Ivory Solid Card) ── */}
          <div className="lg:col-span-5 p-6 rounded-xl border border-[#EEEAE1] bg-white text-[#1D2522] shadow-2xs flex flex-col justify-between space-y-4 transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#123B2A]/10 text-[#123B2A] shadow-2xs">
                <Users className="h-6 w-6 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-[#123B2A]/10 text-[#123B2A] border border-[#123B2A]/20">
                Force 01 · Origin
              </span>
            </div>

            <div>
              <h3 className="text-[1.25rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
                Citizens & Gram Panchayats
              </h3>
              <p className="text-[13.5px] text-[#1D2522]/80 mt-2 leading-relaxed">
                Observe infrastructural and societal bottlenecks on the ground. Submit geotagged photos,
                voice notes, and community observations from all 24 districts of Jharkhand.
              </p>
            </div>

            <div className="pt-3 border-t border-[#EEEAE1] flex items-center justify-between text-caption font-bold text-[#123B2A]">
              <span>Ground Truth Layer</span>
              <span>GPS + Voice Verified</span>
            </div>
          </div>

          {/* ── FORCE 02: Government (Deep Forest Green Card) ── */}
          <div className="lg:col-span-7 p-6 rounded-xl border border-[#1F5A3D] bg-[#123B2A] text-white shadow-sm flex flex-col justify-between space-y-4 transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-[#F5A623] shadow-2xs">
                <Building2 className="h-6 w-6 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-white/15 text-[#F5A623] border border-white/20">
                Force 02 · Stewardship
              </span>
            </div>

            <div>
              <h3 className="text-[1.25rem] font-extrabold text-white tracking-tight font-sans">
                State Government & District Authorities
              </h3>
              <p className="text-[13.5px] text-white/85 mt-2 leading-relaxed">
                Triage incoming challenges into three action tracks: <strong>Resolve</strong> (routine civic works), <strong>Research</strong> (academic R&D), or <strong>Innovate</strong> (consortium).
                Issue funding grants and validate field pilot outcomes.
              </p>
            </div>

            <div className="pt-3 border-t border-white/20 flex items-center justify-between text-caption font-bold text-[#F5A623]">
              <span>Public Governance Layer</span>
              <span>Impact Contracts & Grants</span>
            </div>
          </div>

          {/* ── CENTERPIECE: The JharSankalp Innovation Exchange Core ── */}
          <div className="lg:col-span-12 p-6 rounded-xl border-2 border-[#123B2A] bg-white shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <BrandMark size="lg" variant="forest" />
              <div>
                <span className="text-caption font-mono uppercase text-[#F5A623] font-bold tracking-wider">
                  The Coordination Nexus
                </span>
                <h4 className="text-[1.35rem] font-extrabold text-[#1D2522] tracking-tight leading-none mt-0.5 font-sans">
                  JharSankalp Orchestration Engine
                </h4>
                <p className="text-[13px] text-[#6B5845] mt-1.5">
                  Continuously harmonizing: Challenge Intake → AI Triage → Capability Graph → Impact Contract → Ground Pilot → Verified Policy
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-caption font-mono font-bold">
              <span className="px-3 py-1 bg-[#F8F6F1] text-[#123B2A] border border-[#EEEAE1] rounded-md">
                Intake
              </span>
              <span className="text-[#6B5845]/40">→</span>
              <span className="px-3 py-1 bg-[#F8F6F1] text-[#123B2A] border border-[#EEEAE1] rounded-md">
                Matching
              </span>
              <span className="text-[#6B5845]/40">→</span>
              <span className="px-3 py-1 bg-[#F8F6F1] text-[#123B2A] border border-[#EEEAE1] rounded-md">
                Consortium
              </span>
              <span className="text-[#6B5845]/40">→</span>
              <span className="px-3 py-1 bg-[#123B2A] text-white border border-[#123B2A] rounded-md">
                Impact
              </span>
            </div>
          </div>

          {/* ── FORCE 03: Universities (Rich Green Solid Card) ── */}
          <div className="lg:col-span-7 p-6 rounded-xl border border-[#1F5A3D]/40 bg-[#1F5A3D] text-white shadow-sm flex flex-col justify-between space-y-4 transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-white shadow-2xs">
                <GraduationCap className="h-6 w-6 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-white/15 text-white border border-white/20">
                Force 03 · Knowledge & R&D
              </span>
            </div>

            <div>
              <h3 className="text-[1.25rem] font-extrabold text-white tracking-tight font-sans">
                Universities & Higher Education Institutions
              </h3>
              <p className="text-[13.5px] text-white/90 mt-2 leading-relaxed">
                BIT Sindri, BIT Mesra, BAU, and engineering colleges deploy faculty researchers,
                student innovators, and specialized testing laboratories to develop functional hardware and software prototypes.
              </p>
            </div>

            <div className="pt-3 border-t border-white/20 flex items-center justify-between text-caption font-bold text-white">
              <span>Capability Graph Certified</span>
              <span>Prototyping & Lab Validation</span>
            </div>
          </div>

          {/* ── FORCE 04: Industry & MSMEs (Warm Earth Solid Card) ── */}
          <div className="lg:col-span-5 p-6 rounded-xl border border-[#EEEAE1] bg-white text-[#1D2522] shadow-2xs flex flex-col justify-between space-y-4 transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#6B5845]/10 text-[#6B5845] shadow-2xs">
                <Briefcase className="h-6 w-6 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-[#6B5845]/10 text-[#6B5845] border border-[#6B5845]/20">
                Force 04 · Production & Scale
              </span>
            </div>

            <div>
              <h3 className="text-[1.25rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
                Industry, Startups & MSMEs
              </h3>
              <p className="text-[13.5px] text-[#1D2522]/80 mt-2 leading-relaxed">
                Commit manufacturing tooling, IoT sensors, hardware testing rigs, and corporate CSR funding
                to take laboratory prototypes into robust field mass-production.
              </p>
            </div>

            <div className="pt-3 border-t border-[#EEEAE1] flex items-center justify-between text-caption font-bold text-[#6B5845]">
              <span>Industrial Execution</span>
              <span>Physical Hardware Supply</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

