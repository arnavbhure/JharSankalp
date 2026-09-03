import { Compass, Lightbulb, Users, CheckCircle2, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Find a Challenge',
    description:
      'Explore verified community problems surfaced by citizens and district panchayats across Jharkhand.',
    icon: Compass,
    color: 'text-[#BE123C]',
    bg: 'bg-[#FFF1F2]',
  },
  {
    step: '02',
    title: 'Contribute an Idea',
    description:
      'Propose domain research approaches, hardware prototypes, or grassroots workflow concepts.',
    icon: Lightbulb,
    color: 'text-[#F5A623]',
    bg: 'bg-[#FFFBEB]',
  },
  {
    step: '03',
    title: 'Build Together',
    description:
      'Join multi-disciplinary teams with universities, makers, and local field volunteers to build prototypes.',
    icon: Users,
    color: 'text-[#0284C7]',
    bg: 'bg-[#F0F9FF]',
  },
  {
    step: '04',
    title: 'Create Impact',
    description:
      'Deploy field pilots in pilot blocks, monitor performance data, and scale solutions statewide.',
    icon: CheckCircle2,
    color: 'text-[#15803D]',
    bg: 'bg-[#F0FDF4]',
  },
];

export function HowCollaborationWorks() {
  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-9 text-left space-y-7">
      <div className="space-y-1">
        <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          PLATFORM LIFECYCLE
        </span>
        <h2 className="text-[1.5rem] sm:text-[1.8rem] font-bold text-[#1D2522]">
          How Collaboration Works
        </h2>
        <p className="text-[13.5px] text-[#6B5845] max-w-xl leading-relaxed">
          From problem discovery to verified statewide impact, here is how citizens and institutions
          create lasting change together.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {STEPS.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={s.step}
              className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-3 relative group hover:border-[#123B2A]/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`h-10 w-10 rounded-xl ${s.bg} flex items-center justify-center ${s.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#6B5845]">
                  Step {s.step}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-[15px] font-bold text-[#1D2522]">{s.title}</h4>
                <p className="text-[12.5px] text-[#6B5845] leading-relaxed">{s.description}</p>
              </div>

              {idx < 3 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-[#6B5845]/40 pointer-events-none">
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
