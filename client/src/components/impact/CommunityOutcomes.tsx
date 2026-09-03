import { Quote } from 'lucide-react';
import { CommunityQuote } from '../../types/impact';

interface CommunityOutcomesProps {
  quotes: CommunityQuote[];
}

export function CommunityOutcomes({ quotes }: CommunityOutcomesProps) {
  return (
    <section className="space-y-6 text-left">
      <div className="space-y-1">
        <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          VOICES FROM THE GROUND
        </span>
        <h2 className="text-[1.5rem] sm:text-[1.8rem] font-bold text-[#1D2522]">
          Communities at the Centre
        </h2>
        <p className="text-[13.5px] text-[#6B5845] max-w-xl leading-relaxed">
          The lived reality of civic innovation from panchayat representatives, university
          researchers, and district teams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {quotes.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-7 shadow-2xs hover:shadow-md hover:border-[#123B2A]/30 transition-all flex flex-col justify-between space-y-4 text-left"
          >
            <div className="space-y-3">
              <Quote className="h-6 w-6 text-[#F5A623] rotate-180" />
              <p className="text-[15px] font-medium text-[#1D2522] italic leading-relaxed">
                "{item.quote}"
              </p>
            </div>

            <div className="pt-3 border-t border-[#EEEAE1] space-y-0.5">
              <strong className="text-[13.5px] font-bold text-[#123B2A] block">
                {item.author}
              </strong>
              <div className="text-[11.5px] text-[#6B5845]">{item.role}</div>
              <div className="text-[11px] font-mono text-[#15803D]">{item.location}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
