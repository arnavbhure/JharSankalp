import { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CitizenIntakeReviewSectionProps {
  challenges: any[];
  onStatusUpdate: (challengeId: string, newStatus: string) => Promise<void>;
}

export function CitizenIntakeReviewSection({
  challenges,
  onStatusUpdate,
}: CitizenIntakeReviewSectionProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const submittedCount = challenges.filter(
    (c) => c.status === 'SUBMITTED' || !c.status
  ).length;
  const underReviewCount = challenges.filter(
    (c) => c.status === 'UNDER_REVIEW'
  ).length;
  const validatedCount = challenges.filter(
    (c) => c.status === 'VALIDATED' || c.status === 'MATCHED'
  ).length;

  const handleAction = async (challengeId: string, targetStatus: string, label: string) => {
    try {
      setUpdatingId(challengeId);
      await onStatusUpdate(challengeId, targetStatus);
      setFeedbackToast(`Challenge updated to "${label}"`);
      setTimeout(() => setFeedbackToast(null), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Focus on challenges needing government attention
  const activeReviewList = challenges.slice(0, 6);

  return (
    <section className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EEEAE1] pb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#4C1E4F] font-bold">
            <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
            CITIZEN INTAKE & MODERATION DESK
          </div>
          <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans mt-1">
            Grassroots Intake & Validation Protocol
          </h2>
          <p className="text-[14px] text-[#6B5845] max-w-2xl">
            Real-time verification queue for challenges reported by citizens, local panchayats, and community observers across Jharkhand.
          </p>
        </div>

        {feedbackToast && (
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-[12.5px] font-medium animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{feedbackToast}</span>
          </div>
        )}
      </div>

      {/* ── 3 Intake Counters ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-[#EEEAE1] bg-white shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-[11.5px] font-mono font-bold uppercase text-[#6B5845]">
            <span>Newly Submitted</span>
            <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
          </div>
          <div className="text-[2rem] font-extrabold text-[#1D2522] font-mono">
            {submittedCount}
          </div>
          <p className="text-[12px] text-[#6B5845]">
            Fresh civic problems awaiting initial verification
          </p>
        </div>

        <div className="p-4 rounded-xl border border-[#EEEAE1] bg-white shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-[11.5px] font-mono font-bold uppercase text-[#6B5845]">
            <span>Under Review</span>
            <span className="h-2 w-2 rounded-full bg-[#3B82F6]" />
          </div>
          <div className="text-[2rem] font-extrabold text-[#1D2522] font-mono">
            {underReviewCount}
          </div>
          <p className="text-[12px] text-[#6B5845]">
            District and line department desks evaluating ground scope
          </p>
        </div>

        <div className="p-4 rounded-xl border border-[#EEEAE1] bg-white shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-[11.5px] font-mono font-bold uppercase text-[#6B5845]">
            <span>Validated</span>
            <span className="h-2 w-2 rounded-full bg-[#15803D]" />
          </div>
          <div className="text-[2rem] font-extrabold text-[#1D2522] font-mono">
            {validatedCount}
          </div>
          <p className="text-[12px] text-[#6B5845]">
            Corroborated problems unlocked for university consortium matching
          </p>
        </div>
      </div>

      {/* ── Intake Verification Queue Cards ── */}
      <div className="rounded-2xl border border-[#EEEAE1] bg-white p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
          <span className="text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A] flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-[#F5A623]" />
            <span>Active Intake Stream</span>
          </span>
          <Link
            to="/challenges"
            className="text-[12.5px] font-bold text-[#123B2A] hover:underline inline-flex items-center gap-1"
          >
            <span>View Public Registry</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {activeReviewList.length === 0 ? (
          <div className="text-center py-8 text-[13.5px] text-[#6B5845]">
            No challenges currently waiting in the intake queue.
          </div>
        ) : (
          <div className="divide-y divide-[#EEEAE1]">
            {activeReviewList.map((ch) => {
              const chId = ch.publicId || ch.challengeCode || ch.id;
              const isUpdating = updatingId === ch.id;
              const currentStatus = ch.status || 'SUBMITTED';

              return (
                <div
                  key={ch.id}
                  className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:bg-[#FAF9F5]/60 -mx-3 px-3 rounded-xl"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-mono font-bold text-[#6B5845] bg-[#F8F6F1] px-2 py-0.5 rounded border border-[#EEEAE1]">
                        {chId}
                      </span>
                      <span
                        className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                          currentStatus === 'VALIDATED'
                            ? 'bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]'
                            : currentStatus === 'UNDER_REVIEW'
                            ? 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]'
                            : 'bg-[#FEF6E9] text-[#B45309] border border-[#FDE68A]'
                        }`}
                      >
                        {currentStatus.replace('_', ' ')}
                      </span>
                      <span className="text-[11.5px] font-medium text-[#6B5845]">
                        {ch.domain || 'Civic'}
                      </span>
                      <span className="text-[#6B5845]/40">·</span>
                      <span className="text-[11.5px] text-[#6B5845] flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{ch.district?.name || ch.district || 'Jharkhand'}</span>
                      </span>
                    </div>

                    <h4 className="text-[14.5px] font-bold text-[#1D2522] leading-snug">
                      <Link
                        to={`/challenges/${encodeURIComponent(chId)}`}
                        className="hover:text-[#123B2A] transition-colors"
                      >
                        {ch.title}
                      </Link>
                    </h4>

                    <p className="text-[12.5px] text-[#6B5845] line-clamp-1">
                      {ch.description}
                    </p>
                  </div>

                  {/* Verification Quick Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
                    {currentStatus === 'SUBMITTED' && (
                      <button
                        type="button"
                        onClick={() => handleAction(ch.id, 'UNDER_REVIEW', 'Under Review')}
                        disabled={isUpdating}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[12px] font-bold text-[#1D2522] transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <Clock className="h-3.5 w-3.5 text-[#3B82F6]" />
                        <span>Move to Under Review</span>
                      </button>
                    )}

                    {currentStatus !== 'VALIDATED' && (
                      <button
                        type="button"
                        onClick={() => handleAction(ch.id, 'VALIDATED', 'Validated')}
                        disabled={isUpdating}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[12px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
                      >
                        <ShieldCheck className="h-3.5 w-3.5 text-[#F5A623]" />
                        <span>Validate Challenge</span>
                      </button>
                    )}

                    {currentStatus === 'VALIDATED' && (
                      <span className="inline-flex items-center gap-1 text-[12px] font-mono text-[#15803D] font-bold px-2.5 py-1 rounded bg-[#F0FDF4] border border-[#BBF7D0]">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Validated for Matching</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
