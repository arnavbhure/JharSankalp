import { ActiveProjectSnapshot } from '../../types/government';
import { Rocket, ArrowRight, MapPin, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ActiveProjectsSnapshotTableProps {
  projects: ActiveProjectSnapshot[];
}

export function ActiveProjectsSnapshotTable({ projects }: ActiveProjectsSnapshotTableProps) {
  const getHealthBadge = (health: string) => {
    switch (health) {
      case 'ON_TRACK':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#15803D] bg-[#F0FDF4] px-2.5 py-0.5 rounded border border-[#BBF7D0]">
            <CheckCircle2 className="h-3 w-3" />
            ON TRACK
          </span>
        );
      case 'NEEDS_ATTENTION':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#D97706] bg-[#FFFBEB] px-2.5 py-0.5 rounded border border-[#FDE68A]">
            <AlertTriangle className="h-3 w-3" />
            NEEDS ATTENTION
          </span>
        );
      case 'DELAYED':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#DC2626] bg-[#FEF2F2] px-2.5 py-0.5 rounded border border-[#FECDD3]">
            <AlertTriangle className="h-3 w-3" />
            DELAYED
          </span>
        );
    }
  };

  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-xs text-left space-y-6">
      <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#4C1E4F]">
            <Rocket className="h-4 w-4 text-[#15803D]" />
            <span>GROUND EXECUTION TRACKER</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Active Projects Portfolio Snapshot
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl">
            State-level monitoring of university and industry teams delivering field prototypes and pilots.
          </p>
        </div>

        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF9F5] hover:bg-[#4C1E4F] text-[#4C1E4F] hover:text-white border border-[#B5A886]/40 text-[12.5px] font-bold transition-all shrink-0"
        >
          <span>View All Projects</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* ── Compact Monitoring Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#EEEAE1] text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B5845] bg-[#FAF9F5]">
              <th className="py-3 px-4 rounded-l-xl">Project Name</th>
              <th className="py-3 px-4">District</th>
              <th className="py-3 px-4">Stage</th>
              <th className="py-3 px-4">Lead Institution</th>
              <th className="py-3 px-4">Milestone Progress</th>
              <th className="py-3 px-4">Health</th>
              <th className="py-3 px-4 rounded-r-xl text-right">Dossier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEEAE1] text-[13px]">
            {projects.map((proj) => {
              const progressPct = Math.round(
                (proj.milestonesCompleted / proj.milestonesTotal) * 100
              );

              return (
                <tr key={proj.id} className="hover:bg-[#FAF9F5]/70 transition-colors group">
                  {/* Title & Domain */}
                  <td className="py-3.5 px-4 min-w-[240px]">
                    <div className="space-y-0.5">
                      <Link
                        to={`/projects/${proj.id}`}
                        className="font-bold text-[#1D2522] group-hover:text-[#4C1E4F] transition-colors line-clamp-1"
                      >
                        {proj.title}
                      </Link>
                      <span className="text-[11px] font-mono text-[#6B5845]">
                        {proj.domain} · {proj.projectCode}
                      </span>
                    </div>
                  </td>

                  {/* District */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="flex items-center gap-1 text-[12.5px] font-mono text-[#1D2522]">
                      <MapPin className="h-3.5 w-3.5 text-[#FA7E61]" />
                      {proj.district}
                    </span>
                  </td>

                  {/* Stage */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="text-[11px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#FAF9F5] border border-[#EEEAE1] text-[#4C1E4F]">
                      ● {proj.stageLabel}
                    </span>
                  </td>

                  {/* Institution */}
                  <td className="py-3.5 px-4 whitespace-nowrap font-medium text-[#123B2A]">
                    {proj.leadInstitution}
                  </td>

                  {/* Milestones */}
                  <td className="py-3.5 px-4 min-w-[140px]">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-[#6B5845]">Done</span>
                        <span className="font-bold text-[#1D2522]">
                          {proj.milestonesCompleted} / {proj.milestonesTotal}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-[#EEEAE1] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#4C1E4F] rounded-full"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Health */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {getHealthBadge(proj.health)}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-right">
                    <Link
                      to={`/projects/${proj.id}`}
                      className="inline-flex items-center gap-1 text-[12px] font-mono font-bold text-[#4C1E4F] hover:text-[#FA7E61] transition-colors"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
