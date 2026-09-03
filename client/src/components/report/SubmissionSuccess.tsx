import { CheckCircle2, Home, Compass, ArrowRight, FileCheck, Layers, Users2, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SubmissionResponse } from '../../types/submission';

interface SubmissionSuccessProps {
  response: SubmissionResponse;
}

const NEXT_STEPS = [
  {
    step: '01',
    title: 'Your challenge is received',
    desc: 'The report has entered the state registry with a permanent public reference code.',
    icon: FileCheck,
  },
  {
    step: '02',
    title: 'The information is reviewed and structured',
    desc: 'AI structuring coordinates with local government and district authorities to corroborate ground truth.',
    icon: Layers,
  },
  {
    step: '03',
    title: 'Relevant experts and institutions may be matched',
    desc: 'University engineering departments, research labs, and civic innovators are matched based on capability needs.',
    icon: Users2,
  },
  {
    step: '04',
    title: 'You can track progress as the challenge moves forward',
    desc: 'Follow ideation, prototyping milestones, and live implementation field trials directly from your dashboard.',
    icon: Activity,
  },
];

export function SubmissionSuccess({ response }: SubmissionSuccessProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-10 text-left max-w-2xl mx-auto py-8">
      {/* ── Success Header ── */}
      <div className="space-y-3 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F0FDF4] text-[#15803D] mx-auto ring-8 ring-[#F0FDF4]/50 shadow-xs">
          <CheckCircle2 className="h-9 w-9 stroke-[2.2]" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-[2.1rem] sm:text-[2.5rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Your challenge is now part of Jharkhand&apos;s innovation ecosystem.
          </h1>
          <p className="text-[14.5px] sm:text-[15.5px] text-[#6B5845] max-w-lg mx-auto leading-relaxed">
            Thank you for voicing this issue. Real societal innovation starts when citizens and local communities articulate the problems that need to be solved.
          </p>
        </div>
      </div>

      {/* ── Generated Case Docket Card ── */}
      <div className="rounded-2xl border-2 border-[#123B2A] bg-white p-6 shadow-sm space-y-4 text-left">
        <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3 flex-wrap gap-2">
          <div>
            <span className="text-[11px] font-mono uppercase font-bold text-[#6B5845] block">
              CHALLENGE REFERENCE
            </span>
            <div className="text-[1.5rem] font-mono font-extrabold text-[#123B2A] tracking-wider">
              {response.referenceId}
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-mono uppercase text-[#6B5845] block">
              Submitted Date
            </span>
            <span className="text-[13px] font-bold text-[#1D2522]">
              {response.submissionDate}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
          <div>
            <span className="text-[11px] font-mono text-[#6B5845] block">Title</span>
            <strong className="text-[#1D2522] font-semibold block truncate">
              {response.title}
            </strong>
          </div>
          <div>
            <span className="text-[11px] font-mono text-[#6B5845] block">District / Focus</span>
            <strong className="text-[#1D2522] font-semibold block truncate">
              {response.district} · {response.category}
            </strong>
          </div>
        </div>
      </div>

      {/* ── What Happens Next 4-Stage Roadmap ── */}
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="text-[11px] font-mono uppercase font-bold text-[#123B2A] tracking-wider block">
            TRANSPARENT LIFECYCLE
          </span>
          <h3 className="text-[1.35rem] font-extrabold text-[#1D2522] font-sans">
            What happens next?
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {NEXT_STEPS.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.step}
                className="p-4 rounded-xl border border-[#EEEAE1] bg-white space-y-1.5 shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#123B2A]/10 text-[11px] font-mono font-bold text-[#123B2A]">
                    {item.step}
                  </span>
                  <IconComp className="h-4 w-4 text-[#F5A623]" />
                  <span className="text-[13px] font-bold text-[#1D2522] font-sans leading-tight">
                    {item.title}
                  </span>
                </div>
                <p className="text-[12px] text-[#6B5845] leading-relaxed pl-8">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Three Navigational Actions ── */}
      <div className="pt-4 border-t border-[#EEEAE1] flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate('/my-challenges')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13.5px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <span>Track My Challenge</span>
          <ArrowRight className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => navigate('/challenges')}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[13px] font-semibold text-[#1D2522] transition-colors cursor-pointer"
          >
            <Compass className="h-4 w-4 text-[#123B2A]" />
            <span>Explore Other Challenges</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[13px] font-semibold text-[#1D2522] transition-colors cursor-pointer"
          >
            <Home className="h-4 w-4 text-[#6B5845]" />
            <span>Return Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}
