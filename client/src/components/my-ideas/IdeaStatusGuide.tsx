import { HelpCircle } from 'lucide-react';

const GUIDE_STAGES = [
  { step: '01', title: 'Submitted', desc: 'Your idea has been received and docketed.' },
  { step: '02', title: 'Under Review', desc: 'Checked for relevance, clarity, and duplication.' },
  { step: '03', title: 'Published', desc: 'Visible to students, researchers, and labs.' },
  { step: '04', title: 'Collaboration', desc: 'People contribute technical skills and test beds.' },
  { step: '05', title: 'Project Formation', desc: 'A committed team structures formal execution.' },
  { step: '06', title: 'Project', desc: 'Becomes a funded pilot with district backing.' },
];

export function IdeaStatusGuide() {
  return (
    <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 shadow-2xs space-y-4 text-left">
      <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A] border-b border-[#EEEAE1] pb-3">
        <HelpCircle className="h-3.5 w-3.5 text-[#F5A623]" />
        <span>HOW YOUR IDEAS PROGRESS</span>
      </div>

      <div className="space-y-3">
        {GUIDE_STAGES.map((g) => (
          <div key={g.step} className="flex items-start gap-2.5 text-[12.5px]">
            <span className="h-5 w-5 rounded bg-[#FAF9F5] border border-[#EEEAE1] text-[10px] font-mono font-bold text-[#123B2A] flex items-center justify-center shrink-0 mt-0.5">
              {g.step}
            </span>
            <div className="min-w-0">
              <span className="font-bold text-[#1D2522] block">{g.title}</span>
              <span className="text-[#6B5845] leading-tight text-[11.5px] block">
                {g.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
