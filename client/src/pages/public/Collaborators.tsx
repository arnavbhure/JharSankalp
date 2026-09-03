import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  MapPin,
  ArrowRight,
  Search,
  CheckCircle2,
} from 'lucide-react';

interface CollaboratorOrg {
  id: string;
  name: string;
  category: 'University' | 'Government' | 'Industry' | 'Grassroots';
  location: string;
  focusAreas: string[];
  activeProjectsCount: number;
  description: string;
}

const ORGANIZATIONS: CollaboratorOrg[] = [
  {
    id: 'org-1',
    name: 'Birla Institute of Technology (BIT) Mesra',
    category: 'University',
    location: 'Ranchi',
    focusAreas: ['Embedded IoT', 'Water Infrastructure', 'Acoustic Sensors'],
    activeProjectsCount: 3,
    description:
      'Premier technical institute leading faculty-student engineering labs and ground prototyping for rural drinking water and telemetry collars.',
  },
  {
    id: 'org-2',
    name: 'IIT (ISM) Dhanbad',
    category: 'University',
    location: 'Dhanbad',
    focusAreas: ['Mine Safety', 'Geo-technical Sensing', 'Thermal Imagery'],
    activeProjectsCount: 2,
    description:
      'Pioneering research in subsurface coalfield fire monitoring, InSAR satellite displacement tracking, and environmental risk mitigation.',
  },
  {
    id: 'org-3',
    name: 'District Administration Khunti (DC Office)',
    category: 'Government',
    location: 'Khunti',
    focusAreas: ['Panchayat Deployment', 'Jal Samiti Training', 'Public Health'],
    activeProjectsCount: 2,
    description:
      'First district partner granting field permissions and integrating automated handpump breakdown SMS alerts with BDO repair crews.',
  },
  {
    id: 'org-4',
    name: 'Jharkhand Tribal Development Society (JTDS)',
    category: 'Government',
    location: 'Statewide',
    focusAreas: ['Minor Forest Produce', 'Tribal Livelihoods', 'Solar Cold Storage'],
    activeProjectsCount: 2,
    description:
      'Empowering scheduled tribe gram sabhas through decentralized post-harvest technologies, lac processing units, and cold storage.',
  },
  {
    id: 'org-5',
    name: 'Jharkhand IoT Solutions Pvt. Ltd.',
    category: 'Industry',
    location: 'Ranchi',
    focusAreas: ['Industrial IoT', 'LoRaWAN Gateways', 'PCB Fabrication'],
    activeProjectsCount: 1,
    description:
      'Local hardware startup providing cost-effective PCB manufacturing, component sourcing, and casing fabrication for pilot projects.',
  },
  {
    id: 'org-6',
    name: 'Rural Innovation Lab (Grassroots NGO)',
    category: 'Grassroots',
    location: 'Murhu Block',
    focusAreas: ['Village Assembly Mobilization', 'Water Testing', 'Youth Tech Fellows'],
    activeProjectsCount: 2,
    description:
      'Community collective ensuring participatory deployment, local language translations, and continuous ground feedback from water users.',
  },
];

export function Collaborators() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'University', 'Government', 'Industry', 'Grassroots'];

  const filtered = ORGANIZATIONS.filter((org) => {
    const matchesCat =
      activeCategory === 'All' || org.category === activeCategory;
    const matchesSearch =
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.focusAreas.some((f) =>
        f.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full bg-[#FAF9F5] text-[#1D2522] font-sans text-left">
      {/* ── Header ── */}
      <section className="border-b border-[#EEEAE1] bg-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5FF] border border-[#E9D5FF] text-[#7E22CE] text-[11px] font-mono font-bold uppercase tracking-wider">
            <Building2 className="h-3.5 w-3.5" />
            <span>ECOSYSTEM COLLABORATION STACK</span>
          </div>

          <h1 className="text-[2.2rem] sm:text-[3rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Collaborators & Institutional Partners
          </h1>

          <p className="text-[15px] sm:text-[16px] text-[#6B5845] max-w-2xl leading-relaxed">
            The universities, district administrations, startup innovators, and grassroots collectives building real-world solutions across Jharkhand.
          </p>

          {/* Search & Category Filter Bar */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-[12.5px] font-mono font-bold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#123B2A] text-white shadow-xs'
                      : 'bg-[#FAF9F5] text-[#6B5845] border border-[#EEEAE1] hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="h-4 w-4 text-[#6B5845] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search partner, district..."
                className="w-full h-10 pl-9 pr-3 rounded-xl border border-[#EEEAE1] bg-white text-[12.5px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Directory Grid ── */}
      <section className="py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((org) => (
              <div
                key={org.id}
                className="rounded-3xl border border-[#EEEAE1] bg-white p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border border-[#EEEAE1] bg-[#FAF9F5] text-[#6B5845]">
                      {org.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-[#15803D] font-bold">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {org.activeProjectsCount} Active Projects
                    </span>
                  </div>

                  <h3 className="text-[1.15rem] font-bold text-[#1D2522] leading-snug">
                    {org.name}
                  </h3>

                  <div className="flex items-center gap-1 text-[11.5px] font-mono text-[#6B5845]">
                    <MapPin className="h-3 w-3 text-[#BE123C]" />
                    <span>{org.location}, Jharkhand</span>
                  </div>

                  <p className="text-[13px] text-[#6B5845] leading-relaxed line-clamp-3">
                    {org.description}
                  </p>

                  {/* Focus Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {org.focusAreas.map((f, i) => (
                      <span
                        key={i}
                        className="text-[10.5px] font-mono text-[#123B2A] bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#EEEAE1]"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EEEAE1]">
                  <button
                    type="button"
                    onClick={() => navigate('/projects')}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#FAF9F5] hover:bg-[#123B2A] hover:text-white text-[#123B2A] text-[12px] font-bold transition-all border border-[#EEEAE1] cursor-pointer"
                  >
                    <span>View Consortium Contributions</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
