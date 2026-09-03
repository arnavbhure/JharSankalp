import { ArrowRight, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ActiveChallengeFeed() {
  const navigate = useNavigate();

  const challenges = [
    {
      id: 'JS-2024-00003',
      location: 'DHANBAD',
      category: 'MINING SAFETY',
      title: 'Real-Time Seismic Early Warning for Mine Subsidence',
      description:
        'Ground shifting hazards require continuous monitoring and early warning systems to protect 15,000 residents living near active and abandoned coal seam excavations.',
      status: 'UNDER VALIDATION',
      statusColor: 'bg-[#FEF6E9] text-[#B45309] border-[#F8CCA5]',
      collaborators: 12,
    },
    {
      id: 'JS-2024-00001',
      location: 'KHUNTI',
      category: 'WATER MANAGEMENT',
      title: 'Rural Handpump Telemetry & Predictive Failure Prevention',
      description:
        'Repeated mechanical failure of community borewell pumps leaves rural hamlets without drinking water. Vibration sensor pods predict stator wear before complete pump breakdown.',
      status: 'FIELD PILOT',
      statusColor: 'bg-[#EBF3EE] text-[#123B2A] border-[#1F5A3D]/30',
      collaborators: 18,
    },
    {
      id: 'JS-2024-00002',
      location: 'GUMLA',
      category: 'AGRICULTURE',
      title: 'Rapid Soil Nutrient Diagnostic Kits for Tribal Farmers',
      description:
        'Smallholder farmers in Bishunpur face severe yield uncertainty due to two-week lab soil test delays. Low-cost colorimetric testing strips provide on-field NPK results in 15 minutes.',
      status: 'LAB MATCHING',
      statusColor: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
      collaborators: 14,
    },
    {
      id: 'JS-2024-00004',
      location: 'SIMDEGA',
      category: 'HEALTHCARE',
      title: 'Low-Bandwidth Pediatric Teleconsultation for Primary Health Centers',
      description:
        'Remote community health clinics in Thethaitangar lack on-site pediatric specialists. Store-and-forward offline telemetry allows rural nurses to transmit diagnostics asynchronously to RIMS.',
      status: 'PROTOTYPING',
      statusColor: 'bg-[#FEF0F4] text-[#BE123C] border-[#FECDD3]',
      collaborators: 9,
    },
  ];

  return (
    <section
      id="challenges-feed"
      className="py-20 border-b border-[#EEEAE1] bg-[#F8F6F1] text-left relative"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b border-[#EEEAE1] pb-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#123B2A] font-bold">
              <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
              FEATURED CHALLENGES
            </div>
            <h2 className="text-[2.2rem] sm:text-[2.6rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              Real Problems. Collective Action.
            </h2>
          </div>
          <p className="max-w-md text-[14px] text-[#6B5845] leading-relaxed">
            Real civic problems reported by citizens and local authorities across Jharkhand,
            actively matched with academic labs and solver teams.
          </p>
        </div>

        {/* ── 4 Real Civic Challenge Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-xl border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between space-y-5 group"
            >
              {/* Header: Location/Category & Status Badge */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[#6B5845] uppercase font-mono">
                  <MapPin className="h-3.5 w-3.5 text-[#123B2A]" />
                  <span>{item.location}</span>
                  <span>·</span>
                  <span className="text-[#123B2A]">{item.category}</span>
                </div>

                <span
                  className={`text-[10.5px] font-mono font-bold px-2.5 py-0.5 rounded-md border uppercase tracking-wider ${item.statusColor}`}
                >
                  {item.status}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-[1.2rem] font-extrabold text-[#1D2522] leading-snug tracking-tight group-hover:text-[#123B2A] transition-colors font-sans">
                  {item.title}
                </h3>
                <p className="text-[13.5px] text-[#1D2522]/80 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Footer: Collaborators & Action */}
              <div className="pt-4 border-t border-[#EEEAE1] flex items-center justify-between">
                <div className="flex items-center gap-2 text-[12.5px] font-medium text-[#6B5845]">
                  <Users className="h-4 w-4 text-[#123B2A]" />
                  <span>
                    <strong className="text-[#1D2522] font-bold">{item.collaborators}</strong>{' '}
                    Collaborators
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/challenges/${item.id}`)}
                  className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#123B2A] hover:text-[#0D2B1E] group-hover:translate-x-0.5 transition-all cursor-pointer"
                >
                  <span>View Challenge</span>
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Repository Bar */}
        <div className="mt-8 p-4 bg-[#EEEAE1]/50 rounded-xl border border-[#EEEAE1] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <span className="text-[13px] font-medium text-[#6B5845]">
            Viewing 4 priority societal challenges across 24 districts of Jharkhand
          </span>
          <button
            onClick={() => navigate('/challenges')}
            className="text-[13px] font-bold text-[#123B2A] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Browse All Active Challenges</span>
            <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}
