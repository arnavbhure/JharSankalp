import { IdeaItem } from '../../types/ideas';
import { Wrench, BookOpen, Award, MapPin, ArrowRight, Sparkles } from 'lucide-react';

interface LookingForHelpProps {
  onJoinTeam: (idea: IdeaItem) => void;
  ideas: IdeaItem[];
}

export function LookingForHelp({ onJoinTeam, ideas }: LookingForHelpProps) {
  // Find matching ideas from dataset
  const waterIdea = ideas.find((i) => i.id === 'IDEA-2026-0001') || ideas[0];
  const mineIdea = ideas.find((i) => i.id === 'IDEA-2026-0003') || ideas[1];
  const wasteIdea = ideas.find((i) => i.id === 'IDEA-2026-0006') || ideas[2];

  const CAPABILITY_CALLOUTS = [
    {
      category: 'ENGINEERING',
      title: 'IoT Hardware & Mesh Firmware Lead',
      description:
        'Need embedded engineers to build ultra-low-power LoRa acoustic vibration collars for rural deep borewells.',
      icon: Wrench,
      accentColor: 'text-[#123B2A] bg-[#F0FDF4] border-[#BBF7D0]',
      idea: waterIdea,
    },
    {
      category: 'RESEARCH',
      title: 'Satellite InSAR & Geospatial Analyst',
      description:
        'Seeking researchers to run differential interferometric radar analysis on abandoned Jharia coalfield zones.',
      icon: BookOpen,
      accentColor: 'text-[#0284C7] bg-[#F0F9FF] border-[#BAE6FD]',
      idea: mineIdea,
    },
    {
      category: 'MENTORSHIP',
      title: 'Mining Safety & Disaster Protocol Fellow',
      description:
        'Senior geotechnical advisors needed to benchmark acoustic failure alert thresholds with DGMS standards.',
      icon: Award,
      accentColor: 'text-[#B45309] bg-[#FFFBEB] border-[#FDE68A]',
      idea: mineIdea,
    },
    {
      category: 'IMPLEMENTATION',
      title: 'Municipal Decentralized Compost Specialist',
      description:
        'Local ground coordinators needed to pilot morning household segregation schemes across Namkum urban wards.',
      icon: MapPin,
      accentColor: 'text-[#15803D] bg-[#F0FDF4] border-[#BBF7D0]',
      idea: wasteIdea,
    },
  ];

  return (
    <section className="py-16 sm:py-20 border-t border-[#EEEAE1] bg-white text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="border-b border-[#EEEAE1] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#123B2A] font-bold">
              <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
              <span>COLLABORATION CALLOUTS</span>
            </div>
            <h2 className="text-[2.2rem] sm:text-[2.6rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              These ideas need the right people.
            </h2>
          </div>
          <p className="max-w-md text-[14px] text-[#6B5845] leading-relaxed">
            Some promising ideas are waiting for researchers, engineers, mentors, institutions and
            partners to help move them forward into live prototypes.
          </p>
        </div>

        {/* 4 Capability Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITY_CALLOUTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] hover:bg-white shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between space-y-4 text-left group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
                      {item.category}
                    </span>
                    <div className={`p-2 rounded-lg border ${item.accentColor}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="text-[1.15rem] font-bold text-[#1D2522] leading-snug group-hover:text-[#123B2A] transition-colors font-sans">
                    {item.title}
                  </h3>

                  <p className="text-[13px] text-[#6B5845] leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-4 border-t border-[#EEEAE1] space-y-2">
                  <div className="text-[11.5px] text-[#6B5845] truncate">
                    For:{' '}
                    <strong className="text-[#1D2522] font-semibold">{item.idea?.title}</strong>
                  </div>

                  <button
                    type="button"
                    onClick={() => item.idea && onJoinTeam(item.idea)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[12.5px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <span>Join Working Group</span>
                    <ArrowRight className="h-3 w-3 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
