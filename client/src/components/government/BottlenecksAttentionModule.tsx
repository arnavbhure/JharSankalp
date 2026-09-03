import { useState } from 'react';
import { AttentionItem } from '../../types/government';
import { AlertTriangle, CheckCircle2, ShieldAlert, Zap } from 'lucide-react';

interface BottlenecksAttentionModuleProps {
  items: AttentionItem[];
}

export function BottlenecksAttentionModule({ items }: BottlenecksAttentionModuleProps) {
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);
  const [activePrompt, setActivePrompt] = useState<string | null>(null);

  const handleAction = (item: AttentionItem) => {
    setActivePrompt(`Action dispatched: ${item.actionPrompt} for ${item.title}`);
    setResolvedIds((prev) => [...prev, item.id]);
    setTimeout(() => setActivePrompt(null), 3500);
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-[#FEF2F2] text-[#DC2626] border-[#FECDD3]';
      case 'HIGH':
        return 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]';
      case 'WARNING':
      default:
        return 'bg-[#FEE1C7] text-[#FA7E61] border-[#FA7E61]/30';
    }
  };

  return (
    <section className="rounded-3xl border-2 border-[#FA7E61]/40 bg-[#FFFDF9] p-6 sm:p-8 shadow-xs text-left space-y-6">
      {/* ── Header Strip ── */}
      <div className="space-y-1 border-b border-[#FDE68A] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#B45309]">
            <ShieldAlert className="h-4 w-4 text-[#FA7E61]" />
            <span>INTELLIGENT BOTTLENECK DETECTION</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Attention Required
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl">
            System-flagged friction points requiring Directorate intervention, allocation reminders, or administrative memos.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF2F2] text-[#DC2626] border border-[#FECDD3] text-[11px] font-mono font-bold">
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>{items.length - resolvedIds.length} ACTIVE FLAGS</span>
        </span>
      </div>

      {/* Action Dispatch Feedback Toast */}
      {activePrompt && (
        <div className="p-3.5 rounded-xl bg-[#15803D] text-white flex items-center gap-2 text-[13px] font-mono animate-in fade-in duration-200">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{activePrompt}</span>
        </div>
      )}

      {/* ── 4 Actionable Warning Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => {
          const isResolved = resolvedIds.includes(item.id);

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
                isResolved
                  ? 'border-[#BBF7D0] bg-[#F0FDF4] opacity-75'
                  : 'border-[#FDE68A] bg-white shadow-2xs hover:border-[#FA7E61]'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-mono font-bold uppercase text-[#6B5845]">
                    {item.category}
                  </span>

                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${getSeverityBadge(
                      item.severity
                    )}`}
                  >
                    ● {item.severity}
                  </span>
                </div>

                <h4 className="text-[14.5px] sm:text-[15.5px] font-bold text-[#1D2522] leading-snug">
                  {item.title}
                </h4>

                <p className="text-[12.5px] text-[#6B5845] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Recommendation & Action Button */}
              <div className="pt-3 border-t border-[#EEEAE1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-[11.5px] text-[#123B2A] font-mono font-medium line-clamp-1">
                  💡 {item.recommendedAction}
                </span>

                {isResolved ? (
                  <span className="inline-flex items-center gap-1 text-[12px] font-mono font-bold text-[#15803D] shrink-0">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Action Logged</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleAction(item)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#4C1E4F] hover:bg-[#3A143D] text-white text-[12px] font-bold transition-all shrink-0 cursor-pointer shadow-2xs"
                  >
                    <Zap className="h-3.5 w-3.5 text-[#FA7E61]" />
                    <span>{item.actionPrompt}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
