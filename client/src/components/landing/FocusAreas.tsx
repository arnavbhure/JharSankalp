import {
  BookOpen,
  Heart,
  Sprout,
  Droplets,
  TreePine,
  Users,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FocusAreas() {
  const navigate = useNavigate();

  const domains = [
    {
      name: 'Education',
      challenges: '23 Challenges',
      icon: BookOpen,
      iconColor: 'text-[#1F5A3D]',
      iconBg: 'bg-[#1F5A3D]/10',
      accentBorder: 'hover:border-[#1F5A3D]/40',
      sketch: (
        <svg
          viewBox="0 0 160 40"
          className="w-full h-9 opacity-35 fill-none stroke-[#1F5A3D]"
          strokeWidth="1"
        >
          <path d="M10,35 L30,20 L50,35 Z" />
          <rect x="65" y="15" width="30" height="20" rx="2" />
          <polygon points="60,15 80,5 100,15" />
          <line x1="80" y1="5" x2="80" y2="0" />
          <path d="M115,35 Q130,10 145,35" />
        </svg>
      ),
    },
    {
      name: 'Healthcare',
      challenges: '18 Challenges',
      icon: Heart,
      iconColor: 'text-[#C2410C]',
      iconBg: 'bg-[#C2410C]/10',
      accentBorder: 'hover:border-[#C2410C]/40',
      sketch: (
        <svg
          viewBox="0 0 160 40"
          className="w-full h-9 opacity-35 fill-none stroke-[#C2410C]"
          strokeWidth="1"
        >
          <rect x="20" y="15" width="35" height="20" rx="2" />
          <polygon points="15,15 37,5 60,15" />
          <path d="M75,25 H95 M85,15 V35" strokeWidth="2" />
          <circle cx="125" cy="22" r="12" />
        </svg>
      ),
    },
    {
      name: 'Agriculture',
      challenges: '31 Challenges',
      icon: Sprout,
      iconColor: 'text-[#15803D]',
      iconBg: 'bg-[#15803D]/10',
      accentBorder: 'hover:border-[#15803D]/40',
      sketch: (
        <svg
          viewBox="0 0 160 40"
          className="w-full h-9 opacity-35 fill-none stroke-[#15803D]"
          strokeWidth="1"
        >
          <path d="M10,35 Q30,15 50,35 Q70,15 90,35 Q110,15 130,35" />
          <path d="M40,25 Q45,10 50,25" />
          <path d="M80,25 Q85,10 90,25" />
        </svg>
      ),
    },
    {
      name: 'Water Management',
      challenges: '15 Challenges',
      icon: Droplets,
      iconColor: 'text-[#0284C7]',
      iconBg: 'bg-[#0284C7]/10',
      accentBorder: 'hover:border-[#0284C7]/40',
      sketch: (
        <svg
          viewBox="0 0 160 40"
          className="w-full h-9 opacity-35 fill-none stroke-[#0284C7]"
          strokeWidth="1"
        >
          <path d="M10,25 Q35,15 60,25 T110,25 T160,25" />
          <path d="M10,32 Q35,22 60,32 T110,32 T160,32" />
        </svg>
      ),
    },
    {
      name: 'Environment',
      challenges: '26 Challenges',
      icon: TreePine,
      iconColor: 'text-[#123B2A]',
      iconBg: 'bg-[#123B2A]/10',
      accentBorder: 'hover:border-[#123B2A]/40',
      sketch: (
        <svg
          viewBox="0 0 160 40"
          className="w-full h-9 opacity-35 fill-none stroke-[#123B2A]"
          strokeWidth="1"
        >
          <polygon points="30,35 20,20 40,20" />
          <polygon points="30,22 23,12 37,12" />
          <polygon points="75,35 65,18 85,18" />
          <polygon points="120,35 110,20 130,20" />
        </svg>
      ),
    },
    {
      name: 'Livelihoods',
      challenges: '17 Challenges',
      icon: Users,
      iconColor: 'text-[#6B5845]',
      iconBg: 'bg-[#6B5845]/10',
      accentBorder: 'hover:border-[#6B5845]/40',
      sketch: (
        <svg
          viewBox="0 0 160 40"
          className="w-full h-9 opacity-35 fill-none stroke-[#6B5845]"
          strokeWidth="1"
        >
          <circle cx="35" cy="18" r="8" />
          <path d="M22,35 C22,27 48,27 48,35" />
          <circle cx="75" cy="18" r="8" />
          <path d="M62,35 C62,27 88,27 88,35" />
          <circle cx="115" cy="18" r="8" />
          <path d="M102,35 C102,27 128,27 128,35" />
        </svg>
      ),
    },
    {
      name: 'Mining Safety',
      challenges: '12 Challenges',
      icon: ShieldAlert,
      iconColor: 'text-[#B45309]',
      iconBg: 'bg-[#B45309]/10',
      accentBorder: 'hover:border-[#B45309]/40',
      sketch: (
        <svg
          viewBox="0 0 160 40"
          className="w-full h-9 opacity-35 fill-none stroke-[#B45309]"
          strokeWidth="1"
        >
          <polygon points="20,35 45,15 70,35" />
          <polygon points="65,35 90,10 115,35" />
          <line x1="90" y1="10" x2="140" y2="35" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="focus-areas"
      className="py-20 bg-[#F8F6F1] border-b border-[#EEEAE1] text-left relative"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header matching Reference Design */}
        <div className="text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 text-caption font-bold tracking-widest text-[#123B2A] uppercase font-mono">
            <span className="h-2 w-2 rounded-full bg-[#123B2A]" />
            EXPLORE BY FOCUS AREA
          </div>
          <h2 className="text-[2.2rem] sm:text-[2.6rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            What&apos;s important to <span className="text-[#123B2A]">Jharkhand?</span>
          </h2>
        </div>

        {/* ── Responsive Horizontal Scroll / Grid of Clean Ivory Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {domains.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div
                key={idx}
                onClick={() => navigate('/challenges')}
                className={`p-4 rounded-xl border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] shadow-2xs cursor-pointer flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-sm ${item.accentBorder}`}
              >
                {/* Top: Icon */}
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor}`}
                  >
                    <Icon className="h-5 w-5 stroke-[2]" />
                  </div>
                </div>

                {/* Center: Title & Challenge Count */}
                <div>
                  <h3 className="text-[14px] font-bold text-[#1D2522] leading-snug">{item.name}</h3>
                  <p className="text-[12px] text-[#6B5845] font-medium mt-0.5">{item.challenges}</p>
                </div>

                {/* Bottom: Contextual Line Sketch + Circle Arrow Action */}
                <div className="pt-2 border-t border-[#EEEAE1] flex items-center justify-between">
                  <div className="flex-1 overflow-hidden pr-2">{item.sketch}</div>
                  <button
                    aria-label={`Explore ${item.name}`}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#123B2A] text-white hover:bg-[#0D2B1E] transition-colors shadow-2xs"
                  >
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
