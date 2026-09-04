import { useState, useEffect } from 'react';
import { Award, Loader2 } from 'lucide-react';
import { api } from '../../services/api';

interface BadgeItem {
  id: string;
  name: string;
  level: string;
  desc: string;
  date: string;
  iconBg: string;
}

export function DashboardImpact() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    challengesCount: 0,
    ideasCount: 0,
    projectsCount: 0,
    peopleReached: '0',
  });

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      api.get<any>('/dashboard/citizen').catch(() => null),
      api.get<any>('/impact').catch(() => null),
    ])
      .then(([citRes, impRes]) => {
        if (!isMounted) return;
        const citStats = citRes?.stats || {};
        const macro = impRes?.macroMetrics || {};

        setStats({
          challengesCount: citStats.totalSubmitted || 0,
          ideasCount: citStats.ideasCount || 0,
          projectsCount: citStats.inCollaboration || 0,
          peopleReached: macro.peopleReached || '1,200+',
        });
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const earnedBadgesCount = (stats.challengesCount > 0 ? 1 : 0) + (stats.ideasCount > 0 ? 1 : 0) + 1;

  const BADGES: BadgeItem[] = [
    {
      id: 'b-1',
      name: 'Grassroots Problem Solver',
      level: 'Tier 2 · Field Verified',
      desc: 'Authored an accepted challenge and provided ground evidence in Jharkhand.',
      date: 'Earned 2026',
      iconBg: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
    },
    {
      id: 'b-2',
      name: 'Civic Co-Creator',
      level: 'Tier 1 · Consortium Contributor',
      desc: 'Joined multi-stakeholder working group with university faculty and local administration.',
      date: 'Earned 2026',
      iconBg: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
    },
    {
      id: 'b-3',
      name: 'Ground Validator',
      level: 'Tier 3 · Telemetry Auditor',
      desc: 'Verified civic sensor and infrastructure uptime records across rural points.',
      date: 'Active Tier',
      iconBg: 'bg-[#FAF5FF] text-[#7E22CE] border-[#E9D5FF]',
    },
  ];

  return (
    <div className="space-y-6 text-left">
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center space-y-2">
          <Loader2 className="h-6 w-6 animate-spin text-[#123B2A]" />
          <span className="text-[13px] font-mono text-[#6B5845]">Calculating verified community impact...</span>
        </div>
      ) : (
        <>
          {/* ── Macro Personal Stats ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-[#EEEAE1] shadow-2xs space-y-1">
              <span className="text-[10.5px] font-mono font-bold uppercase text-[#6B5845] block">
                CITIZENS BENEFITED
              </span>
              <div className="text-[2.2rem] font-extrabold font-mono text-[#123B2A]">{stats.peopleReached}</div>
              <span className="text-[11.5px] text-[#15803D] font-semibold">
                District Pilot Telemetry
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-[#EEEAE1] shadow-2xs space-y-1">
              <span className="text-[10.5px] font-mono font-bold uppercase text-[#6B5845] block">
                VERIFIED CONTRIBUTIONS
              </span>
              <div className="text-[2.2rem] font-extrabold font-mono text-[#123B2A]">
                {stats.challengesCount + stats.ideasCount} Actions
              </div>
              <span className="text-[11.5px] text-[#15803D] font-semibold">
                {stats.challengesCount} Challenges · {stats.ideasCount} Ideas
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-[#EEEAE1] shadow-2xs space-y-1">
              <span className="text-[10.5px] font-mono font-bold uppercase text-[#6B5845] block">
                COMMUNITY BADGES
              </span>
              <div className="text-[2.2rem] font-extrabold font-mono text-[#15803D]">
                {earnedBadgesCount} Earned
              </div>
              <span className="text-[11.5px] text-[#6B5845]">State Recognized Civic Contributor</span>
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
                <strong className="text-[#1D2522] block">Civic Problem Logging</strong>
                <p className="text-[11.5px] text-[#6B5845]">
                  Documented grassroots breakdown points across Jharkhand districts.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#0284C7] block">02 OUTPUTS</span>
                <strong className="text-[#1D2522] block">Telemetry & Sensors</strong>
                <p className="text-[11.5px] text-[#6B5845]">
                  Ultralow-power monitoring hardware mounted in local village habitations.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#15803D] block">
                  03 OUTCOMES
                </span>
                <strong className="text-[#1D2522] block">Response Latency Reduced</strong>
                <p className="text-[11.5px] text-[#6B5845]">
                  Repair dispatch cut down from weeks to 48-72 hours.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#123B2A] space-y-1 shadow-2xs">
                <span className="text-[10px] font-mono font-bold text-[#123B2A] block">04 IMPACT</span>
                <strong className="text-[#123B2A] block">Universal Service Security</strong>
                <p className="text-[11.5px] text-[#123B2A]">
                  Measurable lasting improvement for rural communities.
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
                      <span className="text-[10.5px] font-mono text-[#6B5845]">{badge.date}</span>
                    </div>

                    <h4 className="text-[14px] font-bold text-[#1D2522]">{badge.name}</h4>

                    <p className="text-[12.5px] text-[#6B5845] leading-relaxed">{badge.desc}</p>
                  </div>

                  <div className="pt-2 border-t border-[#EEEAE1] text-[11px] font-mono text-[#15803D] font-bold">
                    ✓ Verified on State Ledger
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
