import { ResearchCapability } from '../../types/university';
import { Cpu, Wrench } from 'lucide-react';

interface ResearchCapabilityProfileProps {
  capabilities: ResearchCapability[];
}

export function ResearchCapabilityProfile({ capabilities }: ResearchCapabilityProfileProps) {
  const getStrengthBadge = (strength: string) => {
    switch (strength) {
      case 'HIGH':
        return 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]';
      case 'MEDIUM':
        return 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]';
      case 'EMERGING':
      default:
        return 'bg-[#FEE1C7] text-[#FA7E61] border-[#FA7E61]/30';
    }
  };

  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-xs text-left space-y-6">
      <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#4C1E4F]">
            <Cpu className="h-4 w-4 text-[#FA7E61]" />
            <span>INSTITUTIONAL COMPETENCY MATRIX</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Research & Engineering Capability Profile
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl">
            Domain areas registered with the state innovation clearinghouse to guide intelligent problem matching and grant allocations.
          </p>
        </div>

        <span className="text-[11px] font-mono text-[#6B5845] bg-[#FAF9F5] px-3 py-1 rounded-full border border-[#EEEAE1]">
          {capabilities.length} DECLARED DOMAINS
        </span>
      </div>

      {/* Capability Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {capabilities.map((cap) => (
          <div
            key={cap.id}
            className="p-5 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] hover:bg-white hover:border-[#B5A886] transition-all space-y-3 text-left shadow-2xs flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="h-7 w-7 rounded-lg bg-white border border-[#EEEAE1] text-[#4C1E4F] flex items-center justify-center font-mono font-bold text-[12px]">
                  <Wrench className="h-3.5 w-3.5 text-[#4C1E4F]" />
                </span>

                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${getStrengthBadge(
                    cap.strength
                  )}`}
                >
                  ● {cap.strength} STRENGTH
                </span>
              </div>

              <h4 className="text-[15px] font-bold text-[#1D2522] leading-tight">
                {cap.name}
              </h4>

              <p className="text-[12px] text-[#6B5845] leading-relaxed">
                {cap.description}
              </p>
            </div>

            <div className="pt-2 border-t border-[#EEEAE1] flex items-center justify-between text-[11px] font-mono text-[#6B5845]">
              <span>Linked: <strong className="text-[#1D2522]">{cap.projectsLinked} Projects</strong></span>
              <span>Faculty: <strong className="text-[#4C1E4F]">{cap.facultyCount} PIs</strong></span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
