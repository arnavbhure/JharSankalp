import { useState } from 'react';
import {
  WorkspaceData,
  WorkspaceDeliverable,
  DeliverableStatus,
} from '../../../types/workspace';
import { updateDeliverableStatus } from '../../../services/workspaceApi';
import {
  FileCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  X,
  MessageSquare,
  Check,
  RotateCcw,
} from 'lucide-react';

interface DeliverablesTabProps {
  data: WorkspaceData;
  onRefresh: () => void;
}

export function DeliverablesTab({ data, onRefresh }: DeliverablesTabProps) {
  const [activeDeliverable, setActiveDeliverable] =
    useState<WorkspaceDeliverable | null>(null);
  const [reviewComment, setReviewComment] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusTransition = async (
    deliverable: WorkspaceDeliverable,
    newStatus: DeliverableStatus
  ) => {
    setIsUpdating(true);
    try {
      await updateDeliverableStatus(
        data.context.projectId,
        deliverable.id,
        newStatus,
        reviewComment.trim() || undefined
      );
      deliverable.status = newStatus;
      deliverable.lastUpdated = 'Just now';
      if (reviewComment.trim()) {
        deliverable.comments.push({
          id: `c-${Date.now()}`,
          author: data.context.currentUserName,
          role: 'Project Lead',
          text: reviewComment.trim(),
          date: 'Just now',
        });
        setReviewComment('');
      }
      if (activeDeliverable?.id === deliverable.id) {
        setActiveDeliverable({ ...deliverable });
      }
      onRefresh();
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status: DeliverableStatus) => {
    switch (status) {
      case 'APPROVED':
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#15803D] bg-[#F0FDF4] px-2.5 py-0.5 rounded border border-[#BBF7D0]">
            <CheckCircle2 className="h-3 w-3" />
            {status}
          </span>
        );
      case 'UNDER_REVIEW':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#B45309] bg-[#FFFBEB] px-2.5 py-0.5 rounded border border-[#FDE68A]">
            <Clock className="h-3 w-3" />
            UNDER REVIEW
          </span>
        );
      case 'REVISION_REQUIRED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#BE123C] bg-[#FFF5F5] px-2.5 py-0.5 rounded border border-[#FECDD3]">
            <AlertTriangle className="h-3 w-3" />
            REVISION REQ.
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#0284C7] bg-[#F0F9FF] px-2.5 py-0.5 rounded border border-[#BAE6FD]">
            IN PROGRESS
          </span>
        );
      case 'DRAFT':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-[#6B5845] bg-[#FAF9F5] px-2.5 py-0.5 rounded border border-[#EEEAE1]">
            DRAFT
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header Banner */}
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-2">
        <div className="flex items-center gap-2 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <FileCheck className="h-3.5 w-3.5 text-[#F5A623]" />
          <span>GOVERNANCE & ARTIFACT REPOSITORY</span>
        </div>
        <h2 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Project Deliverables & Governance Audit
        </h2>
        <p className="text-[13.5px] text-[#6B5845] max-w-2xl leading-relaxed">
          Formally submitted protocols, technical blueprints, and evaluation reports undergoing institutional review.
        </p>
      </div>

      {/* ── Deliverables Table ── */}
      <div className="rounded-3xl border border-[#EEEAE1] bg-white overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EEEAE1] bg-[#FAF9F5] text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
                <th className="py-3.5 px-5">Deliverable</th>
                <th className="py-3.5 px-4">Related Milestone</th>
                <th className="py-3.5 px-4">Institutional Owner</th>
                <th className="py-3.5 px-4">Review Status</th>
                <th className="py-3.5 px-4">Last Updated</th>
                <th className="py-3.5 pr-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEAE1]/80 text-[13px]">
              {data.deliverables.map((del) => (
                <tr
                  key={del.id}
                  onClick={() => setActiveDeliverable(del)}
                  className="hover:bg-[#FAF9F5] transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2.5">
                      <FileText className="h-4 w-4 text-[#123B2A] shrink-0" />
                      <div>
                        <div className="font-bold text-[#1D2522] group-hover:text-[#123B2A]">
                          {del.title}
                        </div>
                        <span className="text-[11px] font-mono text-[#6B5845]">
                          Ver: {del.version}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono text-[12px] text-[#6B5845]">
                    {del.milestoneTitle}
                  </td>
                  <td className="py-4 px-4 font-semibold text-[#1D2522]">
                    {del.owner}
                  </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(del.status)}
                  </td>
                  <td className="py-4 px-4 font-mono text-[11.5px] text-[#6B5845]">
                    {del.lastUpdated}
                  </td>
                  <td className="py-4 pr-5 text-right font-bold text-[12px] text-[#123B2A] group-hover:underline">
                    Inspect & Review →
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Deliverable Detail & Review Workflow Modal ── */}
      {activeDeliverable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 text-left">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[#EEEAE1] space-y-5">
            <button
              onClick={() => setActiveDeliverable(null)}
              className="absolute right-5 top-5 p-2 text-[#6B5845] hover:text-[#1D2522] rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1 pr-6">
              <div className="flex items-center gap-2 text-[10.5px] font-mono text-[#6B5845]">
                <span>Milestone: {activeDeliverable.milestoneTitle}</span>
                <span>·</span>
                <span>Ver: {activeDeliverable.version}</span>
              </div>
              <h3 className="text-[1.35rem] font-bold text-[#1D2522] font-sans leading-snug">
                {activeDeliverable.title}
              </h3>
            </div>

            <p className="text-[13px] text-[#6B5845] leading-relaxed">
              {activeDeliverable.description}
            </p>

            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] text-[12px]">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#6B5845] block">
                  OWNER INSTITUTION
                </span>
                <span className="font-semibold text-[#1D2522] block mt-0.5">
                  {activeDeliverable.owner}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#6B5845] block">
                  CURRENT STATUS
                </span>
                <div className="mt-1">{getStatusBadge(activeDeliverable.status)}</div>
              </div>
            </div>

            {/* Governance Review Workflow Actions */}
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#F5A623]/40 space-y-3">
              <span className="text-[11px] font-mono font-bold uppercase text-[#B45309] block">
                GOVERNANCE REVIEW ACTION (LEAD SIGN-OFF)
              </span>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[#6B5845] block">
                  Review Comment / Audit Note:
                </label>
                <textarea
                  rows={2}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="e.g. Cleared for field implementation with BDO office."
                  className="w-full p-2.5 rounded-xl border border-[#EEEAE1] bg-white text-[12.5px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap pt-1">
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleStatusTransition(activeDeliverable, 'APPROVED')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-[12px] font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Approve Deliverable</span>
                </button>

                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleStatusTransition(activeDeliverable, 'REVISION_REQUIRED')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFF5F5] border border-[#FECDD3] text-[#BE123C] hover:bg-[#FEE2E2] text-[12px] font-bold transition-colors cursor-pointer disabled:opacity-60"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Request Revision</span>
                </button>
              </div>
            </div>

            {/* Comments Thread */}
            {activeDeliverable.comments.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-[#EEEAE1]">
                <span className="text-[11px] font-mono font-bold uppercase text-[#123B2A] flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Audit Trail Comments ({activeDeliverable.comments.length})
                </span>
                <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                  {activeDeliverable.comments.map((c) => (
                    <div
                      key={c.id}
                      className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] text-[12px] space-y-0.5"
                    >
                      <div className="flex items-center justify-between font-mono text-[10.5px] text-[#6B5845]">
                        <strong className="text-[#123B2A]">{c.author} ({c.role})</strong>
                        <span>{c.date}</span>
                      </div>
                      <p className="text-[#1D2522]">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
