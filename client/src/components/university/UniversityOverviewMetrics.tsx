import { UniversityOverviewMetrics as MetricsType } from '../../types/university';
import { Target, Users, Rocket, GraduationCap, Briefcase } from 'lucide-react';

interface UniversityOverviewMetricsProps {
  metrics: MetricsType;
}

export function UniversityOverviewMetrics({ metrics }: UniversityOverviewMetricsProps) {
  const cards = [
    {
      label: 'Relevant Challenges',
      value: metrics.relevantChallenges,
      subtext: 'Matched to BIT Mesra lab capabilities',
      icon: Target,
      accent: 'text-[#FA7E61]',
      border: 'border-[#FA7E61]/30',
      badge: 'Demand Match',
    },
    {
      label: 'Active Research Teams',
      value: metrics.activeResearchTeams,
      subtext: 'Multidisciplinary student & faculty cells',
      icon: Users,
      accent: 'text-[#4C1E4F]',
      border: 'border-[#4C1E4F]/25',
      badge: 'Capacity',
    },
    {
      label: 'Projects in Progress',
      value: metrics.projectsInProgress,
      subtext: 'Prototypes & field pilots in Khunti & Dhanbad',
      icon: Rocket,
      accent: 'text-[#15803D]',
      border: 'border-[#BBF7D0]',
      bg: 'bg-[#F0FDF4]',
      badge: 'Active Work',
      highlight: true,
    },
    {
      label: 'Faculty & Mentors',
      value: metrics.facultyMentors,
      subtext: 'Principal investigators leading missions',
      icon: GraduationCap,
      accent: 'text-[#123B2A]',
      border: 'border-[#EEEAE1]',
      badge: 'Faculty Lead',
    },
    {
      label: 'Industry Collaborations',
      value: metrics.industryCollaborations,
      subtext: 'Co-designing sensors & hardware testing',
      icon: Briefcase,
      accent: 'text-[#B45309]',
      border: 'border-[#FDE68A]',
      badge: 'Partner Network',
    },
  ];

  return (
    <section className="space-y-4 text-left">
      <div className="flex items-center justify-between text-[11px] font-mono tracking-wider uppercase text-[#6B5845] border-b border-[#EEEAE1] pb-2">
        <span className="font-bold text-[#1D2522]">ACADEMIC PORTFOLIO TELEMETRY</span>
        <span className="bg-[#FAF9F5] px-2.5 py-0.5 rounded border border-[#EEEAE1]">
          INSTITUTIONAL METRICS
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`p-5 rounded-2xl border ${card.border} ${card.bg || 'bg-white'} shadow-2xs hover:shadow-xs transition-all space-y-3 flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  card.highlight ? 'bg-[#15803D] text-white' : 'bg-[#FAF9F5] text-[#6B5845]'
                }`}>
                  {card.badge}
                </span>
                <Icon className={`h-4 w-4 ${card.accent}`} />
              </div>

              <div className="space-y-1">
                <div className={`text-[2.2rem] sm:text-[2.6rem] font-extrabold font-mono tracking-tight leading-none ${card.accent}`}>
                  {card.value}
                </div>
                <div className="text-[14px] font-bold text-[#1D2522] leading-snug">
                  {card.label}
                </div>
              </div>

              <div className="text-[11.5px] text-[#6B5845] font-mono pt-1 border-t border-[#EEEAE1]/80">
                {card.subtext}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
