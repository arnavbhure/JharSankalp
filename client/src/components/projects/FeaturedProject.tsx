import { useNavigate } from 'react-router-dom';
import { Project } from '../../types/projects';
import { Sparkles, ArrowRight, MapPin, Check, Building2, Radio } from 'lucide-react';

interface FeaturedProjectProps {
  project: Project;
}

const FEATURED_STAGES = [
  { key: 'DISCOVERY', label: 'Discovery', status: 'completed' },
  { key: 'DESIGN', label: 'Design', status: 'completed' },
  { key: 'PROTOTYPE', label: 'Prototype', status: 'completed' },
  { key: 'FIELD_PILOT', label: 'Field Pilot', status: 'active' },
  { key: 'IMPACT_VERIFICATION', label: 'Impact Verification', status: 'upcoming' },
  { key: 'SCALING', label: 'Scale', status: 'upcoming' },
];

export function FeaturedProject({ project }: FeaturedProjectProps) {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-left">
      <div className="rounded-3xl border border-[#EEEAE1] bg-white overflow-hidden shadow-xs hover:border-[#123B2A]/40 transition-all">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* ── Left Column: Editorial Case Study Details (7 cols) ── */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Eyebrow & District Tag */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                  <Sparkles className="h-4 w-4 text-[#F5A623]" />
                  <span>FEATURED IMPLEMENTATION CASE STUDY</span>
                </div>

                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase px-3 py-1 rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
                  <Radio className="h-3 w-3 animate-pulse text-[#15803D]" />
                  {project.stageLabel}
                </span>
              </div>

              {/* Title & Domain */}
              <div className="space-y-2">
                <h2
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="text-[1.85rem] sm:text-[2.4rem] font-extrabold text-[#1D2522] tracking-tight font-sans leading-tight hover:text-[#123B2A] cursor-pointer transition-colors"
                >
                  {project.title}
                </h2>

                <div className="flex items-center gap-2 text-[13px] font-mono text-[#6B5845] flex-wrap">
                  <span className="font-bold text-[#123B2A] bg-[#FAF9F5] px-2.5 py-0.5 rounded border border-[#EEEAE1]">
                    {project.domain}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-[#BE123C]" />
                    {project.location}
                  </span>
                  <span>·</span>
                  <span className="text-[#123B2A] font-bold">
                    {project.impactMetric}
                  </span>
                </div>
              </div>

              {/* Narrative Description */}
              <p className="text-[14.5px] sm:text-[15.5px] text-[#6B5845] leading-relaxed font-normal">
                {project.summary}
              </p>

              {/* Multi-Stakeholder Consortium Stack */}
              <div className="space-y-2 pt-2 border-t border-[#EEEAE1]">
                <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                  <Building2 className="h-3.5 w-3.5 text-[#F5A623]" />
                  <span>COMMITTED CONSORTIUM PARTNERS</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[12.5px] font-semibold text-[#1D2522]">
                  {project.partners.map((partner, idx) => (
                    <span key={partner.id} className="inline-flex items-center gap-2">
                      <span className="px-3 py-1.5 rounded-lg bg-[#FAF9F5] border border-[#EEEAE1] text-[#123B2A] hover:border-[#123B2A]/40 transition-colors">
                        {partner.name}
                        {partner.lead && (
                          <span className="ml-1 text-[10px] font-mono text-[#F5A623] font-bold">
                            (Lead)
                          </span>
                        )}
                      </span>
                      {idx < project.partners.length - 1 && (
                        <span className="text-[#6B5845]/50 font-bold">+</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* 6-Stage Progress Visualization */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#6B5845]">
                  <span className="font-bold uppercase tracking-wider text-[#123B2A]">
                    PROGRESS TRAJECTORY
                  </span>
                  <span className="font-bold text-[#15803D]">
                    Phase 04 · Live Testing on 12 Village Handpumps
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {FEATURED_STAGES.map((s) => {
                    const isCompleted = s.status === 'completed';
                    const isActive = s.status === 'active';

                    return (
                      <div
                        key={s.key}
                        className={`p-2 rounded-xl border text-center flex flex-col items-center justify-center space-y-1 ${
                          isActive
                            ? 'border-2 border-[#123B2A] bg-[#FFFDF9] shadow-xs'
                            : isCompleted
                            ? 'border-[#BBF7D0] bg-[#F0FDF4]'
                            : 'border-[#EEEAE1] bg-[#FAF9F5]/60 text-[#6B5845]/50'
                        }`}
                      >
                        <div
                          className={`h-4 w-4 rounded-full flex items-center justify-center text-[9px] ${
                            isCompleted
                              ? 'bg-[#15803D] text-white'
                              : isActive
                              ? 'bg-[#123B2A] text-[#F5A623]'
                              : 'border border-[#EEEAE1]'
                          }`}
                        >
                          {isCompleted ? <Check className="h-2.5 w-2.5 stroke-[3]" /> : isActive ? '●' : '○'}
                        </div>
                        <span
                          className={`text-[9.5px] font-mono truncate w-full ${
                            isActive
                              ? 'font-bold text-[#123B2A]'
                              : isCompleted
                              ? 'text-[#15803D] font-medium'
                              : 'text-[#6B5845]/60'
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom CTA Bar */}
            <div className="pt-6 border-t border-[#EEEAE1] flex items-center justify-between flex-wrap gap-4">
              <div className="text-[12px] text-[#6B5845]">
                Related Challenge: <strong className="text-[#1D2522]">{project.relatedChallengeTitle}</strong>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/projects/${project.id}`)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[14px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Explore Project</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* ── Right Column: Large Contextual Field Photography (5 cols) ── */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full bg-[#1B112C] overflow-hidden border-t lg:border-t-0 lg:border-l border-[#EEEAE1]">
            <img
              src="/rural_water_iot_field.jpg"
              alt="Smart Rural Water Monitoring Field Station in Murhu Block, Khunti"
              className="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            {/* Ambient Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* In-Image Caption & Telemetry Pill */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 pointer-events-none text-left">
              <div className="inline-flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/20 text-[#FFD8A8]">
                <Radio className="h-3 w-3 text-[#F5A623] animate-pulse" />
                <span>FIELD TELEMETRY · MURHU BLOCK PILOT</span>
              </div>
              <p className="text-[13px] text-white/90 font-medium leading-snug drop-shadow-md">
                Solar station & LoRa vibration node on India Mark II pump transmitting real-time stroke metrics to Jal Samiti.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
