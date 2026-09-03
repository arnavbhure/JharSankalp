import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

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

const SUPPORTED_SOLUTIONS: SupportedSolution[] = [
  {
    id: 'SOL-SUP-01',
    title: 'Smart Rural Water Infrastructure Monitoring System',
    challengeSolved: 'Frequent Breakdown of Drinking Water Handpumps in Murhu Block',
    projectId: 'PROJECT-2026-0012',
    stage: 'Field Pilot (14 of 20 Sites Live)',
    impactMetric: '45.8% reduction in pump downtime; repair dispatch down to 2 days',
    userContribution: 'Co-formulated acoustic anomaly detection algorithm for plunger seal leakages',
    district: 'Khunti',
  },
  {
    id: 'SOL-SUP-02',
    title: 'Off-Grid Evaporative Cooling Chamber for Minor Forest Produce',
    challengeSolved: 'Improving Post-Harvest Storage & Market Access for Lac Collectors',
    projectId: 'PROJECT-2026-0009',
    stage: 'Prototype Validated',
    impactMetric: '3x extended lac freshness; prevents premature seed germination',
    userContribution: 'Provided local village supply chain survey & vernacular testing protocol',
    district: 'Latehar',
  },
];

export function DashboardSolutions() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 text-left">
      {/* ── Header Strip ── */}
      <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
        <div className="space-y-0.5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            VALIDATED VALUE CREATION
          </span>
          <h2 className="text-[1.3rem] font-bold text-[#1D2522]">
            Solutions You Have Supported ({SUPPORTED_SOLUTIONS.length})
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

      {/* ── Solutions Cards ── */}
      <div className="space-y-4">
        {SUPPORTED_SOLUTIONS.map((sol) => (
          <div
            key={sol.id}
            className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-7 shadow-2xs hover:shadow-md transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#6B5845]">
                    {sol.id}
                  </span>
                  <span className="text-[10.5px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]">
                    ✓ {sol.stage}
                  </span>
                </div>

                <h3 className="text-[1.3rem] font-bold text-[#1D2522]">
                  {sol.title}
                </h3>

                <p className="text-[12.5px] text-[#6B5845]">
                  Solved problem:{' '}
                  <strong className="text-[#1D2522]">{sol.challengeSolved}</strong> ·{' '}
                  <span>{sol.district} District</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/projects/${sol.projectId}`)}
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
                <p className="text-[#1D2522] font-semibold">
                  {sol.impactMetric}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-[#123B2A] flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  YOUR DIRECT CONTRIBUTION
                </span>
                <p className="text-[#1D2522] font-semibold">
                  {sol.userContribution}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
