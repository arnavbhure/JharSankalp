import { Info } from 'lucide-react';

const STAGE_GUIDES = [
  {
    num: '01',
    title: 'Submitted',
    desc: 'Your challenge has been safely received and logged under an official tracking dossier.',
  },
  {
    num: '02',
    title: 'Under Review',
    desc: 'The problem is being verified, categorized, and checked against ground realities by regional teams.',
  },
  {
    num: '03',
    title: 'Matched',
    desc: 'Relevant institutions, universities (such as IIT ISM or BIT Sindri), and startup solvers are being identified.',
  },
  {
    num: '04',
    title: 'Collaboration',
    desc: 'A multidisciplinary team convenes to explore parallel engineering and civic intervention hypotheses.',
  },
  {
    num: '05',
    title: 'Impact',
    desc: 'The working solution is field-piloted, measured for efficacy, and deployed across affected wards.',
  },
];

export function ChallengeStatusGuide() {
  return (
    <div className="rounded-2xl border border-[#EEEAE1] bg-white p-6 text-left shadow-2xs space-y-4">
      <div className="flex items-center gap-2 border-b border-[#EEEAE1] pb-3">
        <Info className="h-4 w-4 text-[#123B2A]" />
        <h3 className="text-[14px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          How Challenge Progress Works
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {STAGE_GUIDES.map((st) => (
          <div
            key={st.num}
            className="p-3.5 rounded-xl border border-[#EEEAE1] bg-[#FAF9F5] space-y-1 text-left"
          >
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#123B2A] text-white">
                {st.num}
              </span>
              <h4 className="text-[13px] font-bold text-[#1D2522]">{st.title}</h4>
            </div>
            <p className="text-[12px] text-[#6B5845] leading-relaxed">{st.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
