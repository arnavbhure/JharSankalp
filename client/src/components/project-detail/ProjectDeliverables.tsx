import { ProjectDetail, Deliverable } from '../../types/projectDetail';
import { FileCheck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface ProjectDeliverablesProps {
  project: ProjectDetail;
}

export function ProjectDeliverables({ project }: ProjectDeliverablesProps) {
  const getStatusBadge = (status: Deliverable['status']) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#15803D] bg-[#F0FDF4] px-2.5 py-0.5 rounded border border-[#BBF7D0]">
            <CheckCircle2 className="h-3 w-3" />
            Completed
          </span>
        );
      case 'IN_REVIEW':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#B45309] bg-[#FFFBEB] px-2.5 py-0.5 rounded border border-[#FDE68A]">
            <AlertCircle className="h-3 w-3" />
            In Review
          </span>
        );
      case 'UPCOMING':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-[#6B5845] bg-[#FAF9F5] px-2.5 py-0.5 rounded border border-[#EEEAE1]">
            <Clock className="h-3 w-3" />
            Upcoming
          </span>
        );
    }
  };

  return (
    <section className="space-y-6 text-left">
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
              <FileCheck className="h-4 w-4 text-[#F5A623]" />
              <span>FORMAL ARTIFACTS</span>
            </div>
            <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              Project outputs & deliverables
            </h3>
          </div>

          <span className="text-[12px] font-mono text-[#6B5845]">
            {project.deliverables.length} Deliverables Recorded
          </span>
        </div>

        {/* ── Deliverables Table ── */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EEEAE1] text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
                <th className="pb-3 pr-4">Deliverable</th>
                <th className="pb-3 px-4">Institutional Owner</th>
                <th className="pb-3 px-4">Status</th>
                <th className="pb-3 pl-4 text-right">Updated / Due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEAE1]/70 text-[13px]">
              {project.deliverables.map((del) => (
                <tr key={del.id} className="hover:bg-[#FAF9F5] transition-colors">
                  <td className="py-3.5 pr-4 font-bold text-[#1D2522]">{del.title}</td>
                  <td className="py-3.5 px-4 font-mono text-[#6B5845]">{del.owner}</td>
                  <td className="py-3.5 px-4">{getStatusBadge(del.status)}</td>
                  <td className="py-3.5 pl-4 text-right font-mono text-[#6B5845]">{del.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
