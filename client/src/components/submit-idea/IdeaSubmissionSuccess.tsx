import { useNavigate } from 'react-router-dom';
import { IdeaSubmissionResult, SelectedChallenge } from '../../types/ideaSubmission';
import { CheckCircle2, ArrowRight, Compass, Target, Clock } from 'lucide-react';

interface IdeaSubmissionSuccessProps {
  result: IdeaSubmissionResult;
  challenge: SelectedChallenge | null;
}

export function IdeaSubmissionSuccess({
  result,
  challenge,
}: IdeaSubmissionSuccessProps) {
  const navigate = useNavigate();

  return (
    <div className="py-12 sm:py-16 mx-auto max-w-3xl px-4 text-left space-y-8 animate-in fade-in duration-300">
      {/* ── Header Badge ── */}
      <div className="text-center space-y-4">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] mx-auto shadow-xs">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#15803D] font-bold">
            <span>IDEA SUBMITTED · DOCKET REGISTERED</span>
          </div>

          <h1 className="text-[2.2rem] sm:text-[2.8rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Your idea has entered <br />
            the innovation ecosystem.
          </h1>

          <p className="text-[15.5px] text-[#6B5845] max-w-xl mx-auto leading-relaxed">
            It is now connected to a real societal challenge and will move through peer verification before opening for cross-disciplinary collaboration.
          </p>
        </div>
      </div>

      {/* ── Reference ID Docket Card ── */}
      <div className="p-6 sm:p-7 rounded-3xl border border-[#EEEAE1] bg-white shadow-xs space-y-5 text-left">
        <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            OFFICIAL IDEA DOCKET
          </span>
          <span className="text-[11px] font-mono text-[#6B5845]">
            Registered: {result.submittedDate}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase text-[#6B5845] block">
              IDEA REFERENCE
            </span>
            <span className="text-[1.35rem] font-extrabold font-mono text-[#123B2A]">
              {result.referenceId}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase text-[#6B5845] block">
              CURRENT STATUS
            </span>
            <span className="inline-flex items-center gap-1.5 text-[12px] font-mono font-bold text-[#B45309] bg-[#FFFBEB] px-2.5 py-1 rounded-md border border-[#FDE68A] mt-0.5">
              <Clock className="h-3.5 w-3.5" />
              Under Peer Review
            </span>
          </div>
        </div>

        {challenge && (
          <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] flex items-center gap-3">
            <Target className="h-4 w-4 text-[#F5A623] shrink-0" />
            <div className="min-w-0 text-[12.5px]">
              <span className="text-[10px] font-mono uppercase font-bold text-[#123B2A] block">
                ANCHORED TO CHALLENGE
              </span>
              <span className="font-bold text-[#1D2522] truncate block">
                {challenge.title}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── What Happens Next 3-Step Sequence ── */}
      <div className="p-6 sm:p-8 rounded-3xl border border-[#EEEAE1] bg-white space-y-5 text-left shadow-2xs">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <Clock className="h-4 w-4 text-[#F5A623]" />
          <span>WHAT HAPPENS NEXT</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#123B2A] text-white text-[10px] font-mono font-bold">
                01
              </span>
              <h4 className="text-[13.5px] font-bold text-[#1D2522]">
                Review
              </h4>
            </div>
            <p className="text-[12px] text-[#6B5845] leading-relaxed">
              Your proposal is evaluated for feasibility, duplication, and community relevance by domain reviewers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-[#EEEAE1] text-[#1D2522] text-[10px] font-mono font-bold">
                02
              </span>
              <h4 className="text-[13.5px] font-bold text-[#1D2522]">
                Structure
              </h4>
            </div>
            <p className="text-[12px] text-[#6B5845] leading-relaxed">
              The idea is officially indexed into the 24-district problem ontology and matched with institutional labs.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-[#EEEAE1] text-[#1D2522] text-[10px] font-mono font-bold">
                03
              </span>
              <h4 className="text-[13.5px] font-bold text-[#1D2522]">
                Collaboration
              </h4>
            </div>
            <p className="text-[12px] text-[#6B5845] leading-relaxed">
              Engineers, mentors, and field testing partners can discover the docket and offer direct capability support.
            </p>
          </div>
        </div>
      </div>

      {/* ── Success Actions ── */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate('/my-ideas')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[14.5px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <span>View My Ideas</span>
          <ArrowRight className="h-4 w-4 stroke-[2.5]" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/ideas')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[#1D2522] text-[14.5px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <Compass className="h-4 w-4 text-[#6B5845]" />
          <span>Explore Other Ideas</span>
        </button>

        {challenge && (
          <button
            type="button"
            onClick={() => navigate(`/challenges/${challenge.id}`)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-[#6B5845] hover:text-[#1D2522] text-[13.5px] font-semibold hover:bg-white/50 transition-colors cursor-pointer"
          >
            <span>Return to Challenge</span>
          </button>
        )}
      </div>
    </div>
  );
}
