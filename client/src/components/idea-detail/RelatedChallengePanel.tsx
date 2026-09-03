import { useNavigate } from 'react-router-dom';
import { ParentChallengeInfo } from '../../types/ideaDetail';
import { Target, ArrowRight, MapPin, Users, Droplets, AlertTriangle } from 'lucide-react';

interface RelatedChallengePanelProps {
  challenge: ParentChallengeInfo;
}

export function RelatedChallengePanel({ challenge }: RelatedChallengePanelProps) {
  const navigate = useNavigate();

  return (
    <section id="challenge" className="space-y-4 text-left">
      <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
        <Target className="h-4 w-4 text-[#F5A623]" />
        <span>SECTION 01 · ORIGINATING SOCIETAL NEED</span>
      </div>

      <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
        The challenge behind the idea
      </h2>

      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="space-y-2 border-b border-[#EEEAE1] pb-5">
          <div className="flex items-center gap-2 text-[11.5px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
            <span>CASE DOSSIER</span>
            <span>·</span>
            <span className="text-[#123B2A]">{challenge.id}</span>
          </div>

          <h3
            onClick={() => navigate(`/challenges/${challenge.id}`)}
            className="text-[1.4rem] sm:text-[1.6rem] font-extrabold text-[#1D2522] font-sans hover:text-[#123B2A] cursor-pointer transition-colors leading-snug"
          >
            {challenge.title}
          </h3>

          <p className="text-[14.5px] text-[#1D2522]/80 leading-relaxed font-normal">
            {challenge.description}
          </p>
        </div>

        {/* 4 Structured Metadata Points */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[13px]">
          <div className="space-y-0.5">
            <span className="text-[11px] font-mono uppercase text-[#6B5845] flex items-center gap-1">
              <MapPin className="h-3 w-3 text-[#123B2A]" />
              DISTRICT
            </span>
            <span className="font-bold text-[#1D2522] block">{challenge.district}</span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] font-mono uppercase text-[#6B5845] flex items-center gap-1">
              <Users className="h-3 w-3 text-[#123B2A]" />
              AFFECTED POPULATION
            </span>
            <span className="font-bold text-[#1D2522] block">{challenge.affectedPopulation}</span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] font-mono uppercase text-[#6B5845] flex items-center gap-1">
              <Droplets className="h-3 w-3 text-[#0284C7]" />
              DOMAIN
            </span>
            <span className="font-bold text-[#123B2A] block">{challenge.domain}</span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] font-mono uppercase text-[#6B5845] flex items-center gap-1">
              <AlertTriangle className="h-3 w-3 text-[#B45309]" />
              PRIORITY
            </span>
            <span className="font-bold text-[#B45309] block">{challenge.priority} Impact</span>
          </div>
        </div>

        {/* Bottom CTA to Challenge Dossier */}
        <div className="pt-2 border-t border-[#EEEAE1] flex items-center justify-between flex-wrap gap-2">
          <span className="text-[12px] text-[#6B5845]">
            Ideas in JharSankalp emerge directly from documented field realities.
          </span>

          <button
            type="button"
            onClick={() => navigate(`/challenges/${challenge.id}`)}
            className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[#123B2A] hover:underline cursor-pointer"
          >
            <span>View Original Challenge Case</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
