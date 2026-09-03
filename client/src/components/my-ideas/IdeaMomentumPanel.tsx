import { useNavigate } from 'react-router-dom';
import { MyIdeaItem } from '../../types/myIdeas';
import { ArrowRight, Sparkles, Users, Check, Radio, Building2 } from 'lucide-react';

interface IdeaMomentumPanelProps {
  idea: MyIdeaItem;
  onViewCollaboration: () => void;
}

const MOMENTUM_STAGES = [
  { label: 'IDEA', status: 'completed' },
  { label: 'REVIEW', status: 'completed' },
  { label: 'DISCOVERY', status: 'completed' },
  { label: 'COLLABORATION', status: 'active' },
  { label: 'PROJECT FORMATION', status: 'upcoming' },
];

export function IdeaMomentumPanel({ idea, onViewCollaboration }: IdeaMomentumPanelProps) {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-xs space-y-6 text-left relative overflow-hidden">
      {/* Background Geodetic Lines Accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(#123B2A0A_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"
      />

      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 relative z-10">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <Sparkles className="h-4 w-4 text-[#F5A623]" />
            <span>YOUR IDEAS GAINING MOMENTUM</span>
          </div>

          <h2
            onClick={() => navigate(`/ideas/${idea.id}`)}
            className="text-[1.6rem] sm:text-[1.95rem] font-extrabold text-[#1D2522] tracking-tight font-sans hover:text-[#123B2A] cursor-pointer transition-colors leading-snug"
          >
            {idea.title}
          </h2>

          <p className="text-[13px] font-mono text-[#6B5845]">
            {idea.category} · {idea.district} {idea.block ? `(${idea.block})` : ''} · Solving:{' '}
            <strong>{idea.challengeTitle}</strong>
          </p>
        </div>

        {/* Status Pill */}
        <div className="shrink-0 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase px-3 py-1.5 rounded-xl bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0] shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-[#15803D] animate-pulse" />
            {idea.stage} · {idea.statusLabel}
          </span>
        </div>
      </div>

      {/* ── 3 Meaningful Activity Signals ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-white border border-[#EEEAE1] flex items-center justify-center text-[#123B2A] shrink-0">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[15px] font-extrabold font-mono text-[#1D2522] leading-tight">
              {idea.contributorCount} Active Contributors
            </div>
            <div className="text-[11px] text-[#6B5845]">Engineering & Testing Squad</div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#F5A623]/40 flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-white border border-[#F5A623]/40 flex items-center justify-center text-[#F5A623] shrink-0">
            <Radio className="h-4 w-4 text-[#B45309]" />
          </div>
          <div>
            <div className="text-[15px] font-extrabold font-mono text-[#B45309] leading-tight">
              {idea.collaborationRequests} Incoming Requests
            </div>
            <div className="text-[11px] text-[#6B5845]">Pending your review</div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-white border border-[#EEEAE1] flex items-center justify-center text-[#7E22CE] shrink-0">
            <Building2 className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[15px] font-extrabold font-mono text-[#1D2522] leading-tight">
              1 University Team
            </div>
            <div className="text-[11px] text-[#6B5845]">BIT Sindri IoT Lab Interested</div>
          </div>
        </div>
      </div>

      {/* ── Visual Momentum Path ── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-3">
        <div className="flex items-center justify-between text-[10.5px] font-mono text-[#6B5845]">
          <span className="font-bold uppercase tracking-wider text-[#123B2A]">
            LIFECYCLE TRAJECTORY
          </span>
          <span>Next Phase: Formal Project Charter</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 relative">
          {MOMENTUM_STAGES.map((s) => {
            const isCompleted = s.status === 'completed';
            const isActive = s.status === 'active';

            return (
              <div
                key={s.label}
                className={`p-2.5 rounded-xl border flex items-center gap-2 text-left ${
                  isActive
                    ? 'border-2 border-[#123B2A] bg-white shadow-xs font-bold text-[#123B2A]'
                    : isCompleted
                      ? 'border-[#EEEAE1] bg-white text-[#1D2522]'
                      : 'border-[#EEEAE1]/60 bg-transparent text-[#6B5845]/60'
                }`}
              >
                <div
                  className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                    isCompleted
                      ? 'bg-[#15803D] text-white'
                      : isActive
                        ? 'bg-[#123B2A] text-[#F5A623]'
                        : 'border border-[#EEEAE1]'
                  }`}
                >
                  {isCompleted ? <Check className="h-3 w-3 stroke-[3]" /> : '●'}
                </div>

                <div className="text-[11px] font-mono truncate">{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
        <span className="text-[12px] text-[#6B5845]">
          A team is actively forming around this idea.
        </span>

        <button
          type="button"
          onClick={onViewCollaboration}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
        >
          <span>View Collaboration Requests</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
