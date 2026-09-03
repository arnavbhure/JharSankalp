import { ProjectDetail } from '../../types/projectDetail';
import { MapPin, Radio, Wrench } from 'lucide-react';

interface FieldImplementationProps {
  project: ProjectDetail;
}

export function FieldImplementation({ project }: FieldImplementationProps) {
  const { fieldImplementation } = project;

  return (
    <section id="field-pilot" className="scroll-mt-32 space-y-6 text-left">
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-8">
        <div className="space-y-1 border-b border-[#EEEAE1] pb-4">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <Radio className="h-4 w-4 text-[#F5A623] animate-pulse" />
            <span>GROUND DEPLOYMENT SITES</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            From lab to ground
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl leading-relaxed">
            Direct physical integration with panchayat water infrastructure, monitored by local
            community caretakers.
          </p>
        </div>

        {/* ── Contextual Imagery & Deployment Overview ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Visual Canvas (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#EEEAE1] shadow-xs relative aspect-[16/10] bg-[#1B112C]">
            <img
              src={project.imageUrl || '/rural_water_iot_field.jpg'}
              alt={`${project.title} Field Station`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 text-white text-left pointer-events-none space-y-1">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded text-[#FFD8A8]">
                <MapPin className="h-3 w-3 text-[#F5A623]" />
                {fieldImplementation.block}, {fieldImplementation.district}
              </span>
              <p className="text-[12.5px] text-white/90 font-medium">
                Field station retrofitted on India Mark II rural water pump with solar telemetry
                node.
              </p>
            </div>
          </div>

          {/* Metrics Grid (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1 text-left">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#6B5845]">
                <span className="font-bold uppercase text-[#123B2A]">TARGET LOCATIONS</span>
                <span className="font-bold text-[#1D2522]">Murhu Block Wards</span>
              </div>
              <div className="text-[2rem] font-extrabold font-mono text-[#1D2522]">
                {fieldImplementation.targetPoints} Points
              </div>
              <p className="text-[11.5px] text-[#6B5845]">
                Panchayat water points selected based on historical failure records.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-1 text-left">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#15803D]">
                <span className="font-bold uppercase">SYSTEMS INSTALLED</span>
                <span className="font-bold">Active Stream</span>
              </div>
              <div className="text-[2rem] font-extrabold font-mono text-[#15803D]">
                {fieldImplementation.installedPoints} / {fieldImplementation.targetPoints} Installed
              </div>
              <div className="h-1.5 w-full bg-[#BBF7D0] rounded-full overflow-hidden">
                <div
                  style={{ width: `${fieldImplementation.progressPercentage}%` }}
                  className="h-full bg-[#15803D] rounded-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-[#EEEAE1] space-y-1 text-left">
                <span className="text-[10px] font-mono uppercase text-[#6B5845] block">
                  DEPLOYMENT
                </span>
                <div className="text-[1.4rem] font-extrabold font-mono text-[#123B2A]">
                  {fieldImplementation.progressPercentage}%
                </div>
                <span className="text-[11px] text-[#6B5845]">Phase complete</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#EEEAE1] space-y-1 text-left">
                <span className="text-[10px] font-mono uppercase text-[#6B5845] block">
                  PARTNERS
                </span>
                <div className="text-[1.4rem] font-extrabold font-mono text-[#123B2A]">
                  {fieldImplementation.communityPartners}
                </div>
                <span className="text-[11px] text-[#6B5845]">Village Samitis</span>
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Architecture Note */}
        <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] flex items-start gap-3 text-left">
          <Wrench className="h-4 w-4 text-[#123B2A] shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-[12.5px] text-[#1D2522]">
            <span className="font-bold">Hardware & Telemetry Architecture:</span>
            <p className="text-[#6B5845] leading-relaxed">{fieldImplementation.telemetryNotes}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
