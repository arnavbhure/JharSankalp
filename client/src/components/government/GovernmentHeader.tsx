import { useState } from 'react';
import { ShieldCheck, Calendar, Download, RefreshCw, Check } from 'lucide-react';

interface GovernmentHeaderProps {
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
  onExportReport: () => void;
  exporting: boolean;
}

export function GovernmentHeader({
  timeframe,
  onTimeframeChange,
  onExportReport,
  exporting,
}: GovernmentHeaderProps) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  return (
    <section className="border-b border-[#EEEAE1] bg-white pt-8 pb-7 sm:pt-10 sm:pb-9 text-left relative overflow-hidden">
      {/* Background Topographic Matrix */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] pattern-topography"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-5 z-10">
        {/* Top Eyebrow & Institutional Live Signal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="inline-flex items-center gap-1.5 rounded-md border border-[#123B2A]/20 bg-[#FAF9F5] px-3 py-1 text-[11px] font-mono font-bold tracking-wider uppercase text-[#123B2A]">
              <span className="h-2 w-2 rounded-full bg-[#15803D]" />
              <span>STATE INNOVATION OVERVIEW</span>
            </div>
            <span className="text-[#6B5845]/50">·</span>
            <span className="text-[11.5px] font-mono font-semibold text-[#6B5845]">
              Govt. of Jharkhand · Dept. of Higher & Technical Education
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEE1C7] text-[#4C1E4F] border border-[#FA7E61]/30 text-[11px] font-mono font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FA7E61] animate-pulse" />
              LAST UPDATED: DEMO DATA (FY 2025-26)
            </span>

            <button
              type="button"
              onClick={handleRefresh}
              className="p-1.5 rounded-lg border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[#6B5845] transition-colors cursor-pointer"
              title="Refresh Telemetry Data"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin text-[#123B2A]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Main Title & Supporting Narrative */}
        <div className="space-y-2">
          <h1 className="text-[2.2rem] sm:text-[2.8rem] lg:text-[3.2rem] font-extrabold text-[#1D2522] tracking-tight leading-[1.12] font-sans">
            Jharkhand Societal Innovation Ecosystem
          </h1>
          <p className="text-[15.5px] sm:text-[17px] text-[#6B5845] max-w-3xl leading-relaxed">
            Real-time administrative command overview of community challenges, academic research consortia, and ground deployments across the state.
          </p>
        </div>

        {/* Bottom Control Strip: Range Selector & Directorate Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-[#EEEAE1]">
          {/* Timeframe Range Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <Calendar className="h-4 w-4 text-[#6B5845]" />
            <span className="text-[12px] font-mono uppercase text-[#6B5845] font-bold">
              Time Horizon:
            </span>
            <div className="inline-flex rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] p-1">
              {[
                { key: 'FY_2026', label: 'FY 2025-26 (All Time)' },
                { key: '90D', label: 'Last 90 Days' },
                { key: '30D', label: 'Last 30 Days' },
              ].map((tf) => (
                <button
                  key={tf.key}
                  type="button"
                  onClick={() => onTimeframeChange(tf.key)}
                  className={`px-3 py-1 rounded-lg text-[12px] font-mono font-bold transition-all cursor-pointer ${
                    timeframe === tf.key
                      ? 'bg-[#4C1E4F] text-white shadow-xs'
                      : 'text-[#6B5845] hover:text-[#1D2522]'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onExportReport}
              disabled={exporting}
              className="inline-flex items-center gap-2 rounded-xl border border-[#B5A886]/50 bg-white hover:bg-[#FAF9F5] text-[#1D2522] px-4 py-2.5 text-[13px] font-bold shadow-2xs transition-all cursor-pointer"
            >
              {exporting ? (
                <>
                  <Check className="h-4 w-4 text-[#15803D]" />
                  <span className="text-[#15803D]">Report Generated!</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 text-[#FA7E61]" />
                  <span>Generate Ecosystem Report</span>
                </>
              )}
            </button>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#123B2A] text-white text-[12.5px] font-mono font-bold shadow-xs">
              <ShieldCheck className="h-4 w-4 text-[#F5A623]" />
              <span>DIRECTORATE LEVEL 1 ACCESS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
