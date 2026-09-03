import { Award } from 'lucide-react';

interface BadgeItem {
  id: string;
  name: string;
  level: string;
  desc: string;
  date: string;
  iconBg: string;
}

const BADGES: BadgeItem[] = [
  {
    id: 'b-1',
    name: 'Grassroots Problem Solver',
    level: 'Tier 2 · Field Verified',
    desc: 'Authored an accepted challenge and provided ground photographic evidence in Khunti.',
    date: 'Earned May 2026',
    iconBg: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
  },
  {
    id: 'b-2',
    name: 'Civic Co-Creator',
    level: 'Tier 1 · Consortium Contributor',
    desc: 'Joined multi-stakeholder working group with BIT Mesra faculty and local Jal Samiti.',
    date: 'Earned May 2026',
    iconBg: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
  },
  {
    id: 'b-3',
    name: 'Ground Validator',
    level: 'Tier 3 · Telemetry Auditor',
    desc: 'Verified handpump sensor uptime records across 14 rural test points.',
    date: 'Earned June 2026',
    iconBg: 'bg-[#FAF5FF] text-[#7E22CE] border-[#E9D5FF]',
  },
];

export function DashboardImpact() {
  return (
    <div className="space-y-6 text-left">
      {/* ── Macro Personal Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-[#EEEAE1] shadow-2xs space-y-1">
          <span className="text-[10.5px] font-mono font-bold uppercase text-[#6B5845] block">
            CITIZENS BENEFITED
          </span>
          <div className="text-[2.2rem] font-extrabold font-mono text-[#123B2A]">
            2,000+
          </div>
          <span className="text-[11.5px] text-[#15803D] font-semibold">
            Murhu Block Pilot Telemetry
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#EEEAE1] shadow-2xs space-y-1">
          <span className="text-[10.5px] font-mono font-bold uppercase text-[#6B5845] block">
            VERIFIED CONTRIBUTIONS
          </span>
          <div className="text-[2.2rem] font-extrabold font-mono text-[#123B2A]">
            12 Ideas
          </div>
          <span className="text-[11.5px] text-[#15803D] font-semibold">
            1 in Field Pilot, 1 in Feasibility
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#EEEAE1] shadow-2xs space-y-1">
          <span className="text-[10.5px] font-mono font-bold uppercase text-[#6B5845] block">
            COMMUNITY BADGES
          </span>
          <div className="text-[2.2rem] font-extrabold font-mono text-[#15803D]">
            3 Earned
          </div>
          <span className="text-[11.5px] text-[#6B5845]">
            State Recognized Civic Contributor
          </span>
        </div>
      </div>

      {/* ── Four-Tier Impact Hierarchy ── */}
      <div className="p-6 rounded-3xl border border-[#EEEAE1] bg-white shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            THE RIGOROUS IMPACT LADDER
          </span>
          <span className="text-[11px] font-mono text-[#15803D] font-bold">
            Audited Progression
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-[12.5px]">
          <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#6B5845] block">
              01 ACTIVITIES
            </span>
            <strong className="text-[#1D2522] block">Handpump Surveys</strong>
            <p className="text-[11.5px] text-[#6B5845]">
              Documented 20 water breakdown points in Murhu Block.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#0284C7] block">
              02 OUTPUTS
            </span>
            <strong className="text-[#1D2522] block">14 Sensors Active</strong>
            <p className="text-[11.5px] text-[#6B5845]">
              Vibration monitoring collars mounted on India Mark II pumps.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#15803D] block">
              03 OUTCOMES
            </span>
            <strong className="text-[#1D2522] block">Downtime Cut 45.8%</strong>
            <p className="text-[11.5px] text-[#6B5845]">
              Pump repair response reduced from 12 days to 6.5 days.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#123B2A] space-y-1 shadow-2xs">
            <span className="text-[10px] font-mono font-bold text-[#123B2A] block">
              04 IMPACT
            </span>
            <strong className="text-[#123B2A] block">Clean Water Security</strong>
            <p className="text-[11.5px] text-[#123B2A]">
              Continuous reliable drinking water for 2,000+ tribal villagers.
            </p>
          </div>
        </div>
      </div>

      {/* ── Earned Badges ── */}
      <div className="p-6 rounded-3xl border border-[#EEEAE1] bg-white shadow-2xs space-y-4">
        <h3 className="text-[1.15rem] font-bold text-[#1D2522] flex items-center gap-2">
          <Award className="h-4 w-4 text-[#F5A623]" />
          <span>Earned Civic Innovation Badges</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BADGES.map((badge) => (
            <div
              key={badge.id}
              className="p-4 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${badge.iconBg}`}
                  >
                    {badge.level}
                  </span>
                  <span className="text-[10.5px] font-mono text-[#6B5845]">
                    {badge.date}
                  </span>
                </div>

                <h4 className="text-[14px] font-bold text-[#1D2522]">
                  {badge.name}
                </h4>

                <p className="text-[12.5px] text-[#6B5845] leading-relaxed">
                  {badge.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-[#EEEAE1] text-[11px] font-mono text-[#15803D] font-bold">
                ✓ Verified On-Chain / State Registry
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
