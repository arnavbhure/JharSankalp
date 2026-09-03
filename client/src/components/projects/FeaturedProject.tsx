import { Project } from '../../types/projects';
import { ArrowRight, Check, MapPin, Sparkles, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturedProjectProps {
  project: Project;
}

export function FeaturedProject({ project }: FeaturedProjectProps) {
  const lifecycleSteps = [
    { name: 'Challenge Identified', status: 'completed' },
    { name: 'Idea Developed', status: 'completed' },
    { name: 'Project Formed', status: 'completed' },
    { name: 'Prototype', status: 'completed' },
    { name: 'Field Pilot', status: 'active' },
    { name: 'Impact Verification', status: 'upcoming' },
  ];

  const partners = [
    {
      category: 'COMMUNITY',
      name: 'Murhu Village Water Committee',
      role: 'Ground testing & pump caretakers',
      color: 'border-[#FA7E61]/40 text-[#FA7E61]',
    },
    {
      category: 'ACADEMIC',
      name: 'BIT Mesra',
      role: 'Sensor firmware & LoRaWAN hardware',
      color: 'border-[#B5A886]/40 text-[#B5A886]',
    },
    {
      category: 'INDUSTRY',
      name: 'IoT Innovation Partner',
      role: 'Cloud telemetry & gateway architecture',
      color: 'border-[#FEE1C7]/40 text-[#FEE1C7]',
    },
    {
      category: 'GOVERNMENT',
      name: 'District Water Resources Team',
      role: 'Mechanic roster & dispatch coordination',
      color: 'border-white/40 text-white',
    },
  ];

  return (
    <section className="bg-[#123B2A] text-white py-16 sm:py-20 relative overflow-hidden border-b border-[#1F5A3D] text-left">
      {/* Background Topographic Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] pattern-topography"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Eyebrow & Demo Notice */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4 flex-wrap gap-2">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#F5A623] font-bold">
            <Sparkles className="h-4 w-4" />
            <span>PROJECT IN FOCUS</span>
          </div>

          <div className="inline-flex items-center gap-2 text-[10.5px] font-mono uppercase bg-white/10 px-3 py-0.5 rounded-full text-[#FEE1C7]">
            <span>DEMO PROJECT DATA</span>
          </div>
        </div>

        {/* Main Grid: Story on Left, Partners & Progress on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ── Left Narrative Column (7 cols) ── */}
          <div className="lg:col-span-7 space-y-6">
            {/* Domain & Location Tags */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-3 py-1 rounded-md bg-[#4C1E4F] text-[#FEE1C7] text-[11px] font-mono font-bold uppercase tracking-wider border border-[#FEE1C7]/20">
                {project.domain}
              </span>
              <span className="flex items-center gap-1.5 text-[12.5px] font-mono text-[#FEE1C7]/80">
                <MapPin className="h-3.5 w-3.5 text-[#FA7E61]" />
                {project.locationDisplay}
              </span>
            </div>

            {/* Project Title */}
            <h3 className="text-[2.2rem] sm:text-[2.8rem] font-extrabold text-white tracking-tight leading-[1.12] font-sans">
              {project.title}
            </h3>

            {/* Challenge vs Project Story Box */}
            <div className="space-y-4 rounded-2xl bg-white/5 border border-white/15 p-6 sm:p-7 backdrop-blur-xs">
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FA7E61] block">
                  The Challenge
                </span>
                <p className="text-[15px] text-[#FEE1C7]/90 leading-relaxed">
                  Frequent breakdown of drinking water pumps leaves communities without reliable
                  access to water, forcing women and children to trek kilometers to untreated
                  sources.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-1.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#F5A623] block">
                  The Project
                </span>
                <p className="text-[15px] text-white/95 leading-relaxed">
                  A collaborative team is developing a low-cost sensor network to detect pump
                  failure patterns and trigger faster maintenance response before prolonged outages
                  occur.
                </p>
              </div>
            </div>

            {/* Impact Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-black/25 border border-white/10 space-y-1">
                <div className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-white leading-none font-sans">
                  2,000+
                </div>
                <div className="text-[12px] text-[#FEE1C7] font-medium leading-tight">
                  Residents Covered
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/25 border border-white/10 space-y-1">
                <div className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-[#F5A623] leading-none font-sans">
                  18
                </div>
                <div className="text-[12px] text-[#FEE1C7] font-medium leading-tight">
                  Water Points Monitored
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/25 border border-white/10 space-y-1">
                <div className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-[#FA7E61] leading-none font-sans">
                  32%
                </div>
                <div className="text-[12px] text-[#FEE1C7] font-medium leading-tight">
                  Potential Downtime Reduction
                </div>
              </div>
            </div>

            {/* Action Link */}
            <div className="pt-2">
              <Link
                to={`/projects/${project.id}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#FA7E61] hover:bg-[#e86c4f] text-white px-6 py-3.5 text-[14px] font-bold shadow-md transition-all active:scale-[0.98]"
              >
                <span>View Project Story</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* ── Right Column: Partners & Visual Lifecycle (5 cols) ── */}
          <div className="lg:col-span-5 space-y-6">
            {/* Project Partners Roster */}
            <div className="rounded-2xl bg-white/5 border border-white/15 p-6 backdrop-blur-xs space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h4 className="text-[13px] font-mono font-bold uppercase tracking-wider text-white">
                  Multi-Sector Project Partners
                </h4>
                <Building2 className="h-4 w-4 text-[#B5A886]" />
              </div>

              <div className="space-y-3">
                {partners.map((partner) => (
                  <div
                    key={partner.category}
                    className="p-3 rounded-xl bg-black/25 border border-white/10 space-y-0.5"
                  >
                    <span
                      className={`text-[10px] font-mono uppercase font-bold tracking-wider block ${partner.color}`}
                    >
                      {partner.category}
                    </span>
                    <div className="text-[14px] font-bold text-white">{partner.name}</div>
                    <div className="text-[11.5px] text-[#FEE1C7]/70 font-mono">{partner.role}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Lifecycle Progression Track */}
            <div className="rounded-2xl bg-white/5 border border-white/15 p-6 backdrop-blur-xs space-y-3.5">
              <div className="text-[13px] font-mono font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3 flex items-center justify-between">
                <span>Project Progress</span>
                <span className="text-[11px] text-[#FA7E61] font-mono font-bold">
                  STAGE 04 / 06
                </span>
              </div>

              <div className="space-y-2.5 pt-1">
                {lifecycleSteps.map((step) => (
                  <div
                    key={step.name}
                    className={`flex items-center justify-between text-[13px] py-1 px-2.5 rounded-lg font-mono ${
                      step.status === 'active'
                        ? 'bg-[#FA7E61]/20 border border-[#FA7E61]/40 text-white font-bold'
                        : step.status === 'completed'
                          ? 'text-white/80'
                          : 'text-white/40'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {step.status === 'completed' ? (
                        <Check className="h-4 w-4 text-[#15803D]" />
                      ) : step.status === 'active' ? (
                        <span className="h-2 w-2 rounded-full bg-[#FA7E61] animate-pulse" />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-white/30" />
                      )}
                      <span>{step.name}</span>
                    </span>

                    <span className="text-[11px] font-bold">
                      {step.status === 'completed' && '✓'}
                      {step.status === 'active' && '● ACTIVE'}
                      {step.status === 'upcoming' && '○'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
