import { ArrowRight } from 'lucide-react';

const STAGES = [
  { name: 'Concept', label: '01', desc: 'Civic idea genesis' },
  { name: 'Research', label: '02', desc: 'Feasibility & science' },
  { name: 'Prototype', label: '03', desc: 'Lab & bench model' },
  { name: 'Testing', label: '04', desc: 'Sensor stress testing' },
  { name: 'Field Pilot', label: '05', desc: 'Village trial runs' },
  { name: 'Deployment', label: '06', desc: 'Panchayat handoff' },
  { name: 'Scale', label: '07', desc: 'Statewide expansion' },
];

export function SolutionLifecycle() {
  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 text-left space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-[#EEEAE1] pb-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            CIVIC ENGINEERING PIPELINE
          </span>
          <h3 className="text-[1.25rem] font-bold text-[#1D2522]">Solution Lifecycle Tracking</h3>
        </div>
        <p className="text-[12.5px] text-[#6B5845] max-w-md text-left sm:text-right">
          Every solution on JharSankalp is tracked from early exploration to measurable community
          deployment.
        </p>
      </div>

      {/* Horizontal Connected Progression */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 pt-2">
        {STAGES.map((st, idx) => {
          const isHighlight = st.name === 'Field Pilot';
          return (
            <div
              key={st.name}
              className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between space-y-2 relative group ${
                isHighlight
                  ? 'bg-[#123B2A] text-white border-[#123B2A] shadow-xs'
                  : 'bg-[#FAF9F5] border-[#EEEAE1] text-[#1D2522] hover:border-[#123B2A]/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                    isHighlight
                      ? 'bg-[#F5A623] text-[#123B2A]'
                      : 'bg-white border border-[#EEEAE1] text-[#6B5845]'
                  }`}
                >
                  {st.label}
                </span>

                {idx < 6 && (
                  <ArrowRight
                    className={`hidden lg:block h-3.5 w-3.5 absolute -right-2 top-1/2 -translate-y-1/2 z-10 ${
                      isHighlight ? 'text-[#123B2A]' : 'text-[#6B5845]/40'
                    }`}
                  />
                )}
              </div>

              <div>
                <strong className="text-[13.5px] font-bold block leading-snug">{st.name}</strong>
                <span
                  className={`text-[11px] block leading-tight pt-0.5 ${
                    isHighlight ? 'text-white/80' : 'text-[#6B5845]'
                  }`}
                >
                  {st.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
