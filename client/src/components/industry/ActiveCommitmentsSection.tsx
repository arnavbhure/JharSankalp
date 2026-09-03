import { ActiveCommitment } from '../../types/industry';
import { ShieldCheck, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ActiveCommitmentsSectionProps {
  commitments: ActiveCommitment[];
}

export function ActiveCommitmentsSection({ commitments }: ActiveCommitmentsSectionProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#15803D] bg-[#F0FDF4] px-2.5 py-0.5 rounded border border-[#BBF7D0]">
            <CheckCircle2 className="h-3 w-3" />
            ACTIVE
          </span>
        );
      case 'IN_DELIVERY':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#4C1E4F] bg-[#FAF9F5] px-2.5 py-0.5 rounded border border-[#4C1E4F]/25">
            <Clock className="h-3 w-3" />
            IN DELIVERY
          </span>
        );
    }
  };

  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-xs text-left space-y-6">
      <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#15803D]">
            <ShieldCheck className="h-4 w-4 text-[#15803D]" />
            <span>COMMITTED CONTRIBUTIONS</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Active Industrial Commitments
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl">
            Projects where your organization is an executed consortium partner supplying tooling, hardware fabrication, or compute grants.
          </p>
        </div>

        <span className="text-[11px] font-mono text-[#15803D] bg-[#F0FDF4] px-3 py-1 rounded-full border border-[#BBF7D0] font-bold">
          {commitments.length} ACTIVE AGREEMENTS
        </span>
      </div>

      {/* Commitments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {commitments.map((comm) => (
          <div
            key={comm.id}
            className="p-5 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] hover:bg-white hover:border-[#15803D] transition-all space-y-3.5 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase text-[#123B2A]">
                  {comm.domain}
                </span>

                {getStatusBadge(comm.status)}
              </div>

              <h4 className="text-[15.5px] font-bold text-[#1D2522] leading-snug">
                {comm.projectTitle}
              </h4>

              <div className="text-[11.5px] font-mono text-[#6B5845]">
                Academic Lead: <strong className="text-[#1D2522]">{comm.leadInstitution}</strong>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#EEEAE1] space-y-1">
                <span className="text-[10.5px] font-mono uppercase font-bold text-[#6B5845] block">
                  Your Contribution:
                </span>
                <div className="text-[12.5px] font-semibold text-[#4C1E4F]">
                  {comm.contribution}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#EEEAE1]">
              <Link
                to={`/projects/${comm.projectId}`}
                className="inline-flex items-center justify-between w-full text-[12px] font-bold text-[#123B2A] hover:text-[#FA7E61] transition-colors"
              >
                <span>Open Project Workspace</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
