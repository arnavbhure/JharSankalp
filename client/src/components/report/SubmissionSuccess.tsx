import { CheckCircle2, Home, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SubmissionResponse } from '../../types/submission';

interface SubmissionSuccessProps {
  response: SubmissionResponse;
}

const NEXT_STEPS = [
  {
    step: '01',
    title: 'Initial Review',
    desc: 'Our civic moderation desk reviews the ground description and confirms jurisdiction within 48 hours.',
  },
  {
    step: '02',
    title: 'Challenge Validation',
    desc: 'The problem is routed to local district authorities and ward officers for ground truth corroboration.',
  },
  {
    step: '03',
    title: 'Expert & Institution Matching',
    desc: 'Relevant university engineering labs and startup incubators receive alerts based on the capability graph.',
  },
  {
    step: '04',
    title: 'Collaboration & Development',
    desc: 'A public working group is formed to design and pilot sustainable technical solutions.',
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

        <div className="space-y-1">
          <h1 className="text-[2.2rem] sm:text-[2.6rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Your challenge has been submitted.
          </h1>
          <p className="text-[15px] sm:text-[16px] text-[#6B5845] max-w-lg mx-auto leading-relaxed">
            Thank you for helping bring attention to a real problem in your community. Real change begins when local challenges are voiced.
          </p>
        </div>
      </div>

      {/* ── Generated Case Docket Card ── */}
      <div className="rounded-2xl border-2 border-[#123B2A] bg-white p-6 shadow-sm space-y-4 text-left">
        <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3 flex-wrap gap-2">
          <div>
            <span className="text-[11px] font-mono uppercase font-bold text-[#6B5845] block">
              OFFICIAL TRACKING REFERENCE
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

        <div className="grid grid-cols-2 gap-3 text-[13px]">
          <div>
            <span className="text-[11px] font-mono text-[#6B5845] block">Title</span>
            <strong className="text-[#1D2522] font-semibold block truncate">
              {response.title}
            </strong>
          </div>
          <div>
            <span className="text-[11px] font-mono text-[#6B5845] block">District / Location</span>
            <strong className="text-[#1D2522] font-semibold block truncate">
              {response.district}
            </strong>
          </div>
        </div>
      </div>

      {/* ── What Happens Next 4-Stage Roadmap ── */}
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="text-[11px] font-mono uppercase font-bold text-[#123B2A] tracking-wider block">
            THE TRAJECTORY FORWARD
          </span>
          <h3 className="text-[1.35rem] font-extrabold text-[#1D2522] font-sans">
            What happens next?
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {NEXT_STEPS.map((item) => (
            <div
              key={item.step}
              className="p-4 rounded-xl border border-[#EEEAE1] bg-white shadow-2xs space-y-1.5 text-left"
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#123B2A] text-white text-[11px] font-mono font-bold">
                  {item.step}
                </span>
                <h4 className="text-[14px] font-bold text-[#1D2522]">{item.title}</h4>
              </div>
              <p className="text-[12.5px] text-[#6B5845] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Action Buttons ── */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => navigate('/challenges')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#123B2A] hover:bg-[#0D2B1E] text-white px-6 py-3 text-[14px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <Compass className="h-4 w-4 text-[#F5A623]" />
          <span>Explore Other Challenges</span>
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[#1D2522] px-6 py-3 text-[14px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <Home className="h-4 w-4 text-[#6B5845]" />
          <span>Return Home</span>
        </button>
      </div>
    </div>
  );
}
