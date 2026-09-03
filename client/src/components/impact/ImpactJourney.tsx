import { ArrowRight, Compass, Users, Rocket, CheckCircle2, ShieldCheck } from 'lucide-react';

const JOURNEY_STEPS = [
  {
    count: '148',
    label: 'Challenges Identified',
    desc: 'Grassroots problems logged by citizens',
    icon: Compass,
    color: 'text-[#BE123C]',
    bg: 'bg-[#FFF1F2]',
  },
  {
    count: '46',
    label: 'Active Projects',
    desc: 'Multidisciplinary collaboration sprints',
    icon: Users,
    color: 'text-[#0284C7]',
    bg: 'bg-[#F0F9FF]',
  },
  {
    count: '28',
    label: 'Solutions Developed',
    desc: 'Engineered hardware & software prototypes',
    icon: Rocket,
    color: 'text-[#B45309]',
    bg: 'bg-[#FFFBEB]',
  },
  {
    count: '7',
    label: 'Field Deployments',
    desc: 'Live pilots in blocks & Panchayats',
    icon: CheckCircle2,
    color: 'text-[#15803D]',
    bg: 'bg-[#F0FDF4]',
  },
  {
    count: '12,400+',
    label: 'People Reached',
    desc: 'Verified ground community beneficiaries',
    icon: ShieldCheck,
    color: 'text-[#123B2A]',
    bg: 'bg-[#FAF9F5]',
  },
];

export function ImpactJourney() {
  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 text-left space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-[#EEEAE1] pb-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            TRANSFORMATION PIPELINE
          </span>
          <h3 className="text-[1.25rem] font-bold text-[#1D2522]">
            From Challenge to Verified Outcome
          </h3>
        </div>
        <p className="text-[12.5px] text-[#6B5845] max-w-md text-left sm:text-right">
          Every milestone is auditable — measuring how community observations become tangible village improvements.
        </p>
      </div>

      {/* Connected Transformation Progression */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2 relative">
        {JOURNEY_STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.label}
              className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-2 relative group hover:border-[#123B2A]/30 transition-all text-left"
            >
              <div className="flex items-center justify-between">
                <div className={`h-8 w-8 rounded-xl ${step.bg} flex items-center justify-center ${step.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-mono font-bold text-[#6B5845]">
                  Stage 0{idx + 1}
                </span>
              </div>

              <div>
                <div className="text-[1.6rem] font-mono font-extrabold text-[#123B2A] leading-tight">
                  {step.count}
                </div>
                <strong className="text-[13px] font-bold text-[#1D2522] block leading-snug pt-0.5">
                  {step.label}
                </strong>
                <span className="text-[11px] text-[#6B5845] leading-tight block pt-0.5">
                  {step.desc}
                </span>
              </div>

              {idx < 4 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-[#6B5845]/40 pointer-events-none">
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
