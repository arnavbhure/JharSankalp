import { useState, useEffect } from 'react';
import { IdeaDetail } from '../../types/ideaDetail';
import { Sparkles, Droplets, Bookmark, Share2, Check, Radio, Activity, Layers } from 'lucide-react';

interface IdeaDetailHeroProps {
  idea: IdeaDetail;
  onContributeClick: () => void;
}

export function IdeaDetailHero({ idea, onContributeClick }: IdeaDetailHeroProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  // Check saved state from localStorage
  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('saved_ideas_v1') || '[]');
    setIsSaved(savedList.includes(idea.id));
  }, [idea.id]);

  const handleToggleSave = () => {
    const savedList: string[] = JSON.parse(localStorage.getItem('saved_ideas_v1') || '[]');
    let updated: string[];
    if (savedList.includes(idea.id)) {
      updated = savedList.filter((id) => id !== idea.id);
      setIsSaved(false);
    } else {
      updated = [...savedList, idea.id];
      setIsSaved(true);
    }
    localStorage.setItem('saved_ideas_v1', JSON.stringify(updated));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: idea.title,
          text: idea.summary,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(window.location.href);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  return (
    <section className="relative overflow-hidden border-b border-[#EEEAE1] bg-[#F8F6F1] pt-12 pb-14 sm:pt-16 sm:pb-20 text-left">
      {/* Background Geodetic Grid Accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#123B2A08_1px,transparent_1px),linear-gradient(to_bottom,#123B2A08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* ── Left Column: Editorial Information ── */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category & District Eyebrow */}
            <div className="flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#123B2A] font-bold flex-wrap">
              <Droplets className="h-4 w-4 text-[#0284C7]" />
              <span>{idea.category}</span>
              <span>·</span>
              <span>{idea.district}</span>
              <span>·</span>
              <span className="text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#BBF7D0]">
                {idea.stageLabel}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-[2.5rem] sm:text-[3.2rem] lg:text-[3.5rem] font-extrabold text-[#1D2522] tracking-tight leading-[1.08] font-sans">
              {idea.title}
            </h1>

            {/* Supporting Summary */}
            <p className="text-[16px] sm:text-[17.5px] text-[#6B5845] leading-relaxed max-w-2xl font-normal">
              {idea.summary}
            </p>

            {/* 3-Part Metadata Strip */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl border border-[#EEEAE1] bg-white shadow-2xs text-[13px]">
              <div>
                <span className="text-[10.5px] font-mono uppercase text-[#6B5845] block">
                  IDEA ID
                </span>
                <span className="font-mono font-bold text-[#123B2A]">{idea.referenceId}</span>
              </div>

              <div>
                <span className="text-[10.5px] font-mono uppercase text-[#6B5845] block">
                  STAGE
                </span>
                <span className="font-bold text-[#1D2522]">{idea.stage}</span>
              </div>

              <div>
                <span className="text-[10.5px] font-mono uppercase text-[#6B5845] block">
                  LOCATION
                </span>
                <span className="font-bold text-[#1D2522] truncate block">
                  {idea.block}, {idea.district}
                </span>
              </div>
            </div>

            {/* Actions: Primary CTA + Save + Share */}
            <div className="flex items-center gap-3.5 flex-wrap pt-1">
              <button
                type="button"
                onClick={onContributeClick}
                className="inline-flex items-center gap-2.5 rounded-lg bg-[#123B2A] hover:bg-[#0D2B1E] text-white px-7 py-3.5 text-[15px] font-bold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-[#F5A623]" />
                <span>Contribute to This Idea →</span>
              </button>

              <button
                type="button"
                onClick={handleToggleSave}
                className={`inline-flex items-center gap-2 rounded-lg border px-4 py-3.5 text-[14px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer ${
                  isSaved
                    ? 'border-[#123B2A] bg-[#123B2A]/5 text-[#123B2A]'
                    : 'border-[#EEEAE1] bg-white text-[#1D2522] hover:bg-[#FAF9F5]'
                }`}
              >
                <Bookmark
                  className={`h-4 w-4 ${isSaved ? 'fill-[#123B2A] text-[#123B2A]' : 'text-[#6B5845]'}`}
                />
                <span>{isSaved ? 'Idea Saved' : 'Save Idea'}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 rounded-lg border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[#1D2522] px-4 py-3.5 text-[14px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <Share2 className="h-4 w-4 text-[#6B5845]" />
                <span>Share</span>
              </button>

              {shareToast && (
                <span className="inline-flex items-center gap-1 text-[12px] font-mono text-[#15803D] bg-[#F0FDF4] px-2.5 py-1 rounded-md border border-[#BBF7D0]">
                  <Check className="h-3 w-3" />
                  Link copied to clipboard!
                </span>
              )}
            </div>
          </div>

          {/* ── Right Column: Contextual Visual Composition ── */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-full max-w-[460px] aspect-[4/3] rounded-3xl bg-white border border-[#EEEAE1] p-6 relative overflow-hidden flex flex-col justify-between shadow-sm">
              {/* Topographic Geodetic Lines */}
              <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full stroke-[#123B2A]/10 fill-none pointer-events-none"
                strokeWidth="1"
              >
                <circle cx="50%" cy="50%" r="50" />
                <circle cx="50%" cy="50%" r="90" strokeDasharray="3 3" />
                <circle cx="50%" cy="50%" r="130" />
                <line x1="0" y1="50%" x2="100%" y2="50%" strokeDasharray="2 2" />
                <line x1="50%" y1="0" x2="50%" y2="100%" strokeDasharray="2 2" />
              </svg>

              {/* Card Top Telemetry Bar */}
              <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#6B5845] border-b border-[#EEEAE1] pb-2">
                <span className="flex items-center gap-1.5 text-[#123B2A] font-bold">
                  <Activity className="h-3.5 w-3.5 text-[#15803D] animate-pulse" />
                  <span>ACOUSTIC VIBRATION CLUSTER</span>
                </span>
                <span>23.08° N · 85.28° E</span>
              </div>

              {/* Central Concept Node Animation */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto space-y-3">
                <div className="relative flex items-center justify-center">
                  <div className="absolute h-24 w-24 rounded-full bg-[#123B2A]/10 animate-ping" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#123B2A] text-white shadow-md ring-4 ring-white">
                    <Radio className="h-8 w-8 text-[#F5A623]" />
                  </div>
                </div>

                <div className="bg-[#FAF9F5] px-3.5 py-1.5 rounded-xl border border-[#EEEAE1] shadow-2xs text-center space-y-0.5">
                  <div className="text-[12px] font-bold text-[#1D2522]">
                    Low-Power Telemetry Node
                  </div>
                  <div className="text-[10px] font-mono text-[#6B5845]">
                    LoRaWAN Sub-GHz · Murhu Pilot Cluster
                  </div>
                </div>
              </div>

              {/* Bottom Telemetry Metrics */}
              <div className="relative z-10 bg-[#FAF9F5] p-3 rounded-xl border border-[#EEEAE1] flex items-center justify-between text-[11px] font-mono text-[#6B5845]">
                <span className="flex items-center gap-1">
                  <Layers className="h-3 w-3 text-[#123B2A]" />
                  Sampling: 100 Hz
                </span>
                <span className="text-[#15803D] font-bold">Battery Life: 24 Months</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
