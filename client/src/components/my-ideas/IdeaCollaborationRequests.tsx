import { useState } from 'react';
import { ContributorRequest } from '../../types/myIdeas';
import { Users, Check, X, Eye, Clock } from 'lucide-react';

interface IdeaCollaborationRequestsProps {
  requests: ContributorRequest[];
  onRespond: (requestId: string, action: 'ACCEPTED' | 'DECLINED') => Promise<void>;
}

export function IdeaCollaborationRequests({
  requests,
  onRespond,
}: IdeaCollaborationRequestsProps) {
  const [selectedRequest, setSelectedRequest] = useState<ContributorRequest | null>(null);
  const [actingId, setActingId] = useState<string | null>(null);

  const handleAction = async (requestId: string, action: 'ACCEPTED' | 'DECLINED') => {
    setActingId(requestId);
    try {
      await onRespond(requestId, action);
    } finally {
      setActingId(null);
    }
  };

  return (
    <section className="space-y-6 text-left">
      <div className="border-b border-[#EEEAE1] pb-3 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <Users className="h-4 w-4 text-[#F5A623]" />
            <span>COLLABORATION PIPELINE</span>
          </div>
          <h2 className="text-[1.85rem] sm:text-[2.1rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            People who want to contribute
          </h2>
          <p className="text-[13.5px] text-[#6B5845]">
            Review incoming applications from engineering students, researchers, and field partners
          </p>
        </div>

        <span className="text-[12px] font-mono text-[#6B5845]">
          {requests.filter((r) => r.status === 'PENDING').length} Pending Request(s)
        </span>
      </div>

      <div className="space-y-3.5">
        {requests.map((req) => {
          const isPending = req.status === 'PENDING';
          const isAccepted = req.status === 'ACCEPTED';

          return (
            <div
              key={req.id}
              className={`p-5 rounded-2xl border transition-all space-y-4 text-left shadow-2xs ${
                isPending
                  ? 'border-[#123B2A]/30 bg-white hover:border-[#123B2A]'
                  : isAccepted
                  ? 'border-[#BBF7D0] bg-[#F0FDF4]/60'
                  : 'border-[#EEEAE1] bg-[#FAF9F5] opacity-75'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Contributor Profile */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-[#123B2A] text-white text-[12px] font-mono font-bold flex items-center justify-center shrink-0 shadow-2xs">
                    {req.contributor.avatarInitials}
                  </div>

                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-[14.5px] font-bold text-[#1D2522] leading-tight">
                        {req.contributor.name}
                      </h4>
                      <span className="text-[11.5px] font-mono text-[#6B5845]">
                        ({req.contributor.role})
                      </span>
                    </div>

                    <p className="text-[13px] text-[#123B2A] font-semibold">
                      Interested in: <strong>{req.contributionType}</strong>
                    </p>

                    <div className="text-[11.5px] text-[#6B5845] flex items-center gap-2">
                      <span>For: <strong className="text-[#1D2522]">{req.ideaTitle}</strong></span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {req.createdAt}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status or Actions */}
                <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                  {isPending ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setSelectedRequest(req)}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-[#EEEAE1] bg-[#FAF9F5] hover:bg-white text-[12.5px] font-semibold text-[#6B5845] transition-colors cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>View</span>
                      </button>

                      <button
                        type="button"
                        disabled={actingId === req.id}
                        onClick={() => handleAction(req.id, 'DECLINED')}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-[#FECDD3] bg-[#FFF5F5] hover:bg-[#FEF2F2] text-[12.5px] font-bold text-[#BE123C] transition-colors cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                        <span>Decline</span>
                      </button>

                      <button
                        type="button"
                        disabled={actingId === req.id}
                        onClick={() => handleAction(req.id, 'ACCEPTED')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[12.5px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
                      >
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                        <span>Accept to Squad</span>
                      </button>
                    </>
                  ) : isAccepted ? (
                    <span className="inline-flex items-center gap-1 text-[12px] font-mono font-bold text-[#15803D] bg-[#DCFCE7] px-3 py-1.5 rounded-lg border border-[#BBF7D0]">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                      Accepted to Team
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[12px] font-mono font-semibold text-[#6B5845] bg-[#FAF9F5] px-3 py-1.5 rounded-lg border border-[#EEEAE1]">
                      Request Declined
                    </span>
                  )}
                </div>
              </div>

              {/* Message excerpt */}
              {req.message && (
                <p className="text-[12.5px] text-[#6B5845] bg-[#FAF9F5]/70 p-3 rounded-xl border border-[#EEEAE1]/80 leading-relaxed">
                  &ldquo;{req.message}&rdquo;
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Request Details Modal ── */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 text-left">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-[#EEEAE1] space-y-5">
            <button
              onClick={() => setSelectedRequest(null)}
              className="absolute right-5 top-5 p-2 text-[#6B5845] hover:text-[#1D2522] rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1 pr-6">
              <span className="text-[11px] font-mono font-bold uppercase text-[#123B2A]">
                APPLICANT PROFILE
              </span>
              <h3 className="text-[1.4rem] font-extrabold text-[#1D2522] font-sans">
                {selectedRequest.contributor.name}
              </h3>
              <p className="text-[13px] text-[#6B5845]">
                {selectedRequest.contributor.role} {selectedRequest.contributor.organization ? `· ${selectedRequest.contributor.organization}` : ''}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-2 text-[13px]">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#6B5845]">
                <span>TARGET IDEA</span>
                <span>{selectedRequest.createdAt}</span>
              </div>
              <p className="font-bold text-[#1D2522]">
                {selectedRequest.ideaTitle}
              </p>
              <div className="text-[12px] text-[#123B2A] font-semibold">
                Applying for: {selectedRequest.contributionType}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                Applicant Statement:
              </label>
              <p className="text-[13.5px] text-[#1D2522] leading-relaxed bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EEEAE1]">
                {selectedRequest.message}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EEEAE1]">
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 rounded-xl text-[13px] font-semibold text-[#6B5845] hover:bg-[#FAF9F5] cursor-pointer"
              >
                Close
              </button>
              {selectedRequest.status === 'PENDING' && (
                <button
                  type="button"
                  onClick={() => {
                    handleAction(selectedRequest.id, 'ACCEPTED');
                    setSelectedRequest(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13px] font-bold shadow-xs transition-all cursor-pointer"
                >
                  Accept to Squad
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
