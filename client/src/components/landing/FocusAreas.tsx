import { BookOpen, Heart, Sprout, Droplets, TreePine, Users, ShieldAlert, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FocusAreas() {
  const navigate = useNavigate();

  const domains = [
    {
      name: 'Education',
      challenges: '23 Challenges',
      icon: BookOpen,
      bg: 'bg-[#F2FBF5]',
      border: 'border-[#D2F2DD]',
      iconColor: 'text-[#2E7D32]',
      iconBg: 'bg-[#E0F5E6]',
      // Subtle SVG Landscape / Contextual Sketch
      sketch: (
        <svg viewBox="0 0 160 40" className="w-full h-10 opacity-40 fill-none stroke-[#2E7D32]" strokeWidth="1">
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
      bg: 'bg-[#FFF2F4]',
      border: 'border-[#FDD3D9]',
      iconColor: 'text-[#E11D48]',
      iconBg: 'bg-[#FFE2E6]',
      sketch: (
        <svg viewBox="0 0 160 40" className="w-full h-10 opacity-40 fill-none stroke-[#E11D48]" strokeWidth="1">
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
      bg: 'bg-[#F2F9F3]',
      border: 'border-[#CEE7D2]',
      iconColor: 'text-[#16A34A]',
      iconBg: 'bg-[#DCF2E1]',
      sketch: (
        <svg viewBox="0 0 160 40" className="w-full h-10 opacity-40 fill-none stroke-[#16A34A]" strokeWidth="1">
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
      bg: 'bg-[#F0F7FF]',
      border: 'border-[#CCE2FF]',
      iconColor: 'text-[#0284C7]',
      iconBg: 'bg-[#DDF0FF]',
      sketch: (
        <svg viewBox="0 0 160 40" className="w-full h-10 opacity-40 fill-none stroke-[#0284C7]" strokeWidth="1">
          <path d="M10,25 Q35,15 60,25 T110,25 T160,25" />
          <path d="M10,32 Q35,22 60,32 T110,32 T160,32" />
        </svg>
      ),
    },
    {
      name: 'Environment',
      challenges: '26 Challenges',
      icon: TreePine,
      bg: 'bg-[#F2FAF4]',
      border: 'border-[#CFEAD5]',
      iconColor: 'text-[#15803D]',
      iconBg: 'bg-[#DBF2E1]',
      sketch: (
        <svg viewBox="0 0 160 40" className="w-full h-10 opacity-40 fill-none stroke-[#15803D]" strokeWidth="1">
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
      bg: 'bg-[#FFF7ED]',
      border: 'border-[#FED7AA]',
      iconColor: 'text-[#EA580C]',
      iconBg: 'bg-[#FFEDD5]',
      sketch: (
        <svg viewBox="0 0 160 40" className="w-full h-10 opacity-40 fill-none stroke-[#EA580C]" strokeWidth="1">
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
      bg: 'bg-[#FFF9F3]',
      border: 'border-[#F8CCA5]',
      iconColor: 'text-[#B45309]',
      iconBg: 'bg-[#FEE1C7]',
      sketch: (
        <svg viewBox="0 0 160 40" className="w-full h-10 opacity-40 fill-none stroke-[#B45309]" strokeWidth="1">
          <polygon points="20,35 45,15 70,35" />
          <polygon points="65,35 90,10 115,35" />
          <line x1="90" y1="10" x2="140" y2="35" />
        </svg>
      ),
    },
  ];

  return (
    <section id="focus-areas" className="py-20 bg-[#FCFAF6] border-b border-neutral-200/60 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header matching Reference Design */}
        <div className="text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 text-caption font-bold tracking-widest text-[#163D2B] uppercase font-mono">
            <span className="h-2 w-2 rounded-full bg-[#163D2B]" />
            EXPLORE BY FOCUS AREA
          </div>
          <h2 className="text-[2.25rem] sm:text-[2.75rem] font-extrabold text-neutral-900 tracking-tight font-sans">
            What&apos;s important to <span className="text-[#163D2B]">Jharkhand?</span>
          </h2>
        </div>

        {/* ── Responsive Horizontal Scroll / Grid of Pastel Tiles ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {domains.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div
                key={idx}
                onClick={() => navigate('/challenges')}
                className={`p-4 rounded-2xl border-2 shadow-xs cursor-pointer flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md ${item.bg} ${item.border}`}
              >
                {/* Top: Icon */}
                <div className="flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor}`}>
                    <Icon className="h-5 w-5 stroke-[2]" />
                  </div>
                </div>

                {/* Center: Title & Challenge Count */}
                <div>
                  <h3 className="text-body-sm font-extrabold text-neutral-900 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-caption text-neutral-500 font-medium mt-0.5">
                    {item.challenges}
                  </p>
                </div>

                {/* Bottom: Thematic Sketch + Circle Arrow Action */}
                <div className="pt-2 border-t border-current/10 flex items-center justify-between">
                  <div className="flex-1 overflow-hidden pr-2">
                    {item.sketch}
                  </div>
                  <button
                    aria-label={`Explore ${item.name}`}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#163D2B] text-white hover:bg-[#112E20] transition-colors shadow-xs"
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
