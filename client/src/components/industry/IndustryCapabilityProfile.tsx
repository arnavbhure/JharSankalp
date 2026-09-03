import { IndustryCapability } from '../../types/industry';
import { Factory } from 'lucide-react';

interface IndustryCapabilityProfileProps {
  capabilities: IndustryCapability[];
}

export function IndustryCapabilityProfile({ capabilities }: IndustryCapabilityProfileProps) {
  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-xs text-left space-y-6">
      <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#4C1E4F]">
            <Factory className="h-4 w-4 text-[#FA7E61]" />
            <span>PARTNER VALUE PROPOSITION</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Industry Capability & Resource Profile
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl">
            Declared competencies, manufacturing lines, and engineering mentors registered to receive targeted project requests.
          </p>
        </div>

        <span className="text-[11px] font-mono text-[#6B5845] bg-[#FAF9F5] px-3 py-1 rounded-full border border-[#EEEAE1]">
          {capabilities.length} ACTIVE CAPABILITIES
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {capabilities.map((cap) => (
          <div
            key={cap.id}
            className="p-5 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] hover:bg-white hover:border-[#B5A886] transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-[#4C1E4F] px-2 py-0.5 rounded bg-white border border-[#EEEAE1] inline-block">
                {cap.category}
              </span>

              <h4 className="text-[15px] font-bold text-[#1D2522] leading-tight">
                {cap.title}
              </h4>

              <p className="text-[12px] text-[#6B5845] leading-relaxed">
                {cap.description}
              </p>
            </div>

            <div className="pt-2 border-t border-[#EEEAE1] space-y-1.5">
              <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] block">
                Offered Resources:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {cap.offeredResources.map((res) => (
                  <span
                    key={res}
                    className="text-[10.5px] font-mono bg-white px-2 py-0.5 rounded border border-[#EEEAE1] text-[#1D2522]"
                  >
                    ✓ {res}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
