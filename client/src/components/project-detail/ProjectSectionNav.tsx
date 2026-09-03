import { useState, useEffect } from 'react';

const NAV_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'lineage', label: 'Lineage' },
  { id: 'mission', label: 'Mission' },
  { id: 'team', label: 'Team & Partners' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'work', label: 'Current Work' },
  { id: 'field-pilot', label: 'Field Pilot' },
  { id: 'needs', label: 'Collaboration' },
  { id: 'impact', label: 'Impact' },
  { id: 'activity', label: 'Activity' },
];

export function ProjectSectionNav() {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(NAV_SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const targetY = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Project Sections"
      className="sticky top-16 z-30 border-b border-[#EEEAE1] bg-[#F8F6F1]/95 backdrop-blur-md transition-all select-none"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 scrollbar-none text-left">
          {NAV_SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;

            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(sec.id)}
                className={`py-1.5 px-3 rounded-lg text-[12.5px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#123B2A] text-white font-bold shadow-2xs'
                    : 'text-[#6B5845] hover:text-[#1D2522] hover:bg-white/60'
                }`}
              >
                {sec.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
