import { RotateCcw, Trash2, ArrowRight } from 'lucide-react';

interface DraftRecoveryBannerProps {
  onContinue: () => void;
  onDiscard: () => void;
}

export function DraftRecoveryBanner({ onContinue, onDiscard }: DraftRecoveryBannerProps) {
  return (
    <div className="rounded-2xl border border-[#F5A623]/40 bg-[#FFFDF9] p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left animate-in slide-in-from-top-2 duration-200">
      <div className="space-y-0.5">
        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#B45309]">
          <RotateCcw className="h-3.5 w-3.5" />
          <span>SAVED DRAFT DETECTED</span>
        </div>
        <p className="text-[13.5px] text-[#1D2522]">
          You have an unsubmitted idea draft in progress. Continue where you left off?
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onDiscard}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-[#BE123C] hover:bg-[#FEF2F2] transition-colors cursor-pointer"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Start Fresh</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-[#123B2A] text-white text-[12px] font-bold shadow-2xs hover:bg-[#0D2B1E] transition-colors cursor-pointer"
        >
          <span>Continue Draft</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
