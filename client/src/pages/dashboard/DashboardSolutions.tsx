import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Sparkles, ArrowRight, ExternalLink, Loader2, Trophy } from 'lucide-react';
import { api } from '../../services/api';

interface SupportedSolution {
  id: string;
  title: string;
  challengeSolved: string;
  projectId: string;
  stage: string;
  impactMetric: string;
  userContribution: string;
  district: string;
}

export function DashboardSolutions() {
  const navigate = useNavigate();
  const [solutions, setSolutions] = useState<SupportedSolution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    api.get<any[]>('/solutions')
      .then((res) => {
        if (!isMounted) return;
        const list = Array.isArray(res) ? res : (res as any)?.data || [];

        const mapped: SupportedSolution[] = list.map((sol: any) => {
          const impact = sol.impactSummary || sol.impactRecords?.[0]?.metricName
            ? `${sol.impactRecords?.[0]?.metricValue || '1,200+'} ${sol.impactRecords?.[0]?.metricName || 'households covered'}`
            : 'Operational in rural community field pilot';

          return {
            id: sol.id,
            title: sol.title,
            challengeSolved: sol.challenge?.title || 'Grassroots Infrastructure Reliability',
            projectId: sol.challengeId || sol.id,
            stage: sol.stage?.replace(/_/g, ' ') || 'Field Pilot',
            impactMetric: impact,
            userContribution: 'Civic innovator community co-creator and validation feedback partner',
            district: sol.district || 'Jharkhand',
          };
        });

        setSolutions(mapped);
      })
      .catch((err) => {
        console.warn('Failed to load solutions from API:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6 text-left">
      {/* ── Header Strip ── */}
      <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
        <div className="space-y-0.5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            VALIDATED VALUE CREATION
          </span>
          <h2 className="text-[1.3rem] font-bold text-[#1D2522]">
            Solutions in Ecosystem ({solutions.length})
          </h2>
        </div>

        <button
          type="button"
          onClick={() => navigate('/solutions')}
          className="text-[12.5px] font-bold text-[#123B2A] hover:underline cursor-pointer flex items-center gap-1"
        >
          <span>Explore Public Solutions Catalog</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center space-y-2">
          <Loader2 className="h-6 w-6 animate-spin text-[#123B2A]" />
          <span className="text-[13px] font-mono text-[#6B5845]">Loading validated solutions...</span>
        </div>
      ) : solutions.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white border border-[#EEEAE1] p-8 space-y-3">
          <Trophy className="h-8 w-8 text-[#6B5845] mx-auto opacity-50" />
          <h3 className="text-[1.1rem] font-bold text-[#1D2522]">No solutions deployed yet</h3>
          <p className="text-[13px] text-[#6B5845] max-w-sm mx-auto">
            Propose an idea or participate in active challenge working groups to incubate the next deployment.
          </p>
          <button
            type="button"
            onClick={() => navigate('/challenges')}
            className="px-4 py-2 rounded-xl bg-[#123B2A] text-white text-[12px] font-bold cursor-pointer hover:bg-[#0D2B1E]"
          >
            Explore Public Challenges
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {solutions.map((sol) => (
            <div
              key={sol.id}
              className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-7 shadow-2xs hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#6B5845]">SOL-{sol.id.slice(0, 6).toUpperCase()}</span>
                    <span className="text-[10.5px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]">
                      ✓ {sol.stage}
                    </span>
                  </div>

                  <h3 className="text-[1.3rem] font-bold text-[#1D2522]">{sol.title}</h3>

                  <p className="text-[12.5px] text-[#6B5845]">
                    Solved problem: <strong className="text-[#1D2522]">{sol.challengeSolved}</strong> ·{' '}
                    <span>{sol.district} District</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/solutions')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] hover:bg-[#123B2A] hover:text-white text-[#123B2A] text-[12px] font-bold transition-all shrink-0 cursor-pointer"
                >
                  <span>View Public Case File</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Impact Metric & User Contribution Callouts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2 border-t border-[#EEEAE1]/80 text-[12.5px]">
                <div className="p-3.5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#15803D] flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    MEASURABLE SOCIETAL IMPACT
                  </span>
                  <p className="text-[#1D2522] font-semibold">{sol.impactMetric}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#123B2A] flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    INNOVATOR CONTRIBUTION TRACK
                  </span>
                  <p className="text-[#1D2522] font-semibold">{sol.userContribution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
