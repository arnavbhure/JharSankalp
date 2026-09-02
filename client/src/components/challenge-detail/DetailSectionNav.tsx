import { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'the-problem', label: 'The Problem' },
  { id: 'human-impact', label: 'Human Impact' },
  { id: 'evidence-history', label: 'Evidence & History' },
  { id: 'solution-ideas', label: 'Ideas & Approaches' },
  { id: 'active-collaboration', label: 'Stakeholders' },
  { id: 'lifecycle-progress', label: 'Lifecycle Progress' },
];

export function DetailSectionNav() {
  const [activeSection, setActiveSection] = useState('the-problem');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollY) {
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
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="sticky top-16 z-30 w-full bg-[#F8F6F1]/95 backdrop-blur-md border-b border-[#EEEAE1] shadow-2xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-1 sm:space-x-4 overflow-x-auto py-2.5 no-scrollbar text-[13px] font-semibold text-[#6B5845]">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`relative px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'text-[#123B2A] font-bold bg-[#123B2A]/8'
                    : 'hover:text-[#1D2522] hover:bg-[#EEEAE1]/60'
                }`}
              >
                {sec.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#123B2A] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
