import { WorkflowStep } from '../../types/ideaDetail';
import { Cpu, Activity, Radio, Bell, Wrench } from 'lucide-react';

interface HowItWorksFlowProps {
  steps: WorkflowStep[];
}

export function HowItWorksFlow({ steps }: HowItWorksFlowProps) {
  const getStepIcon = (num: string) => {
    switch (num) {
      case '01':
        return <Activity className="h-5 w-5 text-[#0284C7]" />;
      case '02':
        return <Cpu className="h-5 w-5 text-[#F5A623]" />;
      case '03':
        return <Radio className="h-5 w-5 text-[#123B2A]" />;
      case '04':
        return <Bell className="h-5 w-5 text-[#B45309]" />;
      case '05':
      default:
        return <Wrench className="h-5 w-5 text-[#15803D]" />;
    }
  };

  return (
    <section className="space-y-6 text-left">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <Cpu className="h-4 w-4 text-[#F5A623]" />
          <span>SECTION 03 · TECHNICAL ARCHITECTURE</span>
        </div>

        <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          How the system could work
        </h2>
        <p className="text-[14px] text-[#6B5845] leading-relaxed max-w-2xl">
          A concept blueprint for non-intrusive edge sensing and decentralized mesh telemetry designed for rugged Chota Nagpur rural terrains.
        </p>
      </div>

      {/* ── 5-Step Connected Flow Container ── */}
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((step) => (
            <div
              key={step.stepNumber}
              className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] flex flex-col justify-between space-y-3 relative group hover:border-[#123B2A]/40 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-[#EEEAE1] text-[12px] font-mono font-bold text-[#123B2A]">
                    {step.stepNumber}
                  </span>
                  <div className="p-1.5 rounded-lg bg-white border border-[#EEEAE1]">
                    {getStepIcon(step.stepNumber)}
                  </div>
                </div>

                <h3 className="text-[1.15rem] font-bold text-[#1D2522] font-sans">
                  {step.title}
                </h3>

                <p className="text-[13px] text-[#6B5845] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Technical Detail Note */}
              <div className="pt-2 border-t border-[#EEEAE1]/80">
                <span className="text-[10px] font-mono uppercase text-[#123B2A] font-bold block mb-0.5">
                  Specification:
                </span>
                <p className="text-[11px] text-[#1D2522]/80 font-mono leading-tight">
                  {step.technicalDetail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
