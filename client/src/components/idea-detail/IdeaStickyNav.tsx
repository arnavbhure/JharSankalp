import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface IdeaStickyNavProps {
  stageLabel: string;
  onContributeClick: () => void;
}

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'progress', label: 'Progress' },
  { id: 'contributors', label: 'Contributors' },
  { id: 'collaboration', label: 'Collaboration' },
  { id: 'challenge', label: 'Related Challenge' },
];

export function IdeaStickyNav({ stageLabel, onContributeClick }: IdeaStickyNavProps) {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-16 z-40 w-full border-b border-[#EEEAE1] bg-white/95 backdrop-blur-md shadow-2xs text-left select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4 overflow-x-auto">
          {/* Navigation Links */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#123B2A] text-white font-bold'
                      : 'text-[#6B5845] hover:text-[#1D2522] hover:bg-[#FAF9F5]'
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Stage Badge & Contribute Action */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#15803D] bg-[#F0FDF4] px-2.5 py-1 rounded-md border border-[#BBF7D0]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#15803D]" />
              {stageLabel}
            </span>

            <button
              type="button"
              onClick={onContributeClick}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#123B2A] hover:bg-[#0D2B1E] text-white px-3.5 py-1.5 text-[12.5px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <Sparkles className="h-3 w-3 text-[#F5A623]" />
              <span>Contribute</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
