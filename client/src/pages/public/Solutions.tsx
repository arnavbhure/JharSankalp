import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Droplets,
  Wheat,
  HeartPulse,
  Zap,
  ArrowRight,
  Filter,
  Sparkles,
} from 'lucide-react';

interface SolutionItem {
  id: string;
  projectId: string;
  title: string;
  domain: string;
  stage: string;
  partner: string;
  district: string;
  impactMetric: string;
  description: string;
  icon: typeof Droplets;
  tagColor: string;
}

const SOLUTIONS: SolutionItem[] = [
  {
    id: 'SOL-01',
    projectId: 'PROJECT-2026-0012',
    title: 'Smart Rural Water Infrastructure Monitoring',
    domain: 'Water Management',
    stage: 'Field Pilot',
    partner: 'BIT Mesra & Murhu Block Administration',
    district: 'Khunti',
    impactMetric: '45.8% reduction in pump downtime across 20 villages',
    description:
      'Low-cost vibration and acoustic sensor collars mounted on India Mark II handpumps to detect valve failures before complete breakdown.',
    icon: Droplets,
    tagColor: 'text-[#0284C7] bg-[#F0F9FF] border-[#BAE6FD]',
  },
  {
    id: 'SOL-02',
    projectId: 'PROJECT-2026-0009',
    title: 'Micro-Cold Storage for Tribal Lac & Forest Produce',
    domain: 'Forest Economy',
    stage: 'Pilot Deployment',
    partner: 'TRIFED Jharkhand & IIT ISM Dhanbad',
    district: 'Latehar',
    impactMetric: '3x extended shelf life for 450 tribal gathering households',
    description:
      'Phase-change material evaporative cool chambers designed for off-grid forest fringe villages without 24x7 electrical grid access.',
    icon: Wheat,
    tagColor: 'text-[#15803D] bg-[#F0FDF4] border-[#BBF7D0]',
  },
  {
    id: 'SOL-03',
    projectId: 'PROJECT-2026-0007',
    title: 'Jharia Coalfield Fire & Subsidence Alert Telemetry',
    domain: 'Mining Safety',
    stage: 'Prototype Validated',
    partner: 'IIT ISM Dhanbad & Bharat Coking Coal Limited',
    district: 'Dhanbad',
    impactMetric: 'Sub-millimeter ground displacement alert accuracy',
    description:
      'InSAR satellite radar data fused with ground MEMS tiltmeters to provide 48-hour advance warning of mine subsidence in densely populated wards.',
    icon: Zap,
    tagColor: 'text-[#B45309] bg-[#FFFBEB] border-[#FDE68A]',
  },
  {
    id: 'SOL-04',
    projectId: 'PROJECT-2026-0005',
    title: 'Solar Direct-Drive Diagnostic Van & Clinic Box',
    domain: 'Healthcare',
    stage: 'Field Pilot',
    partner: 'AIIMS Deoghar & Rural Health Mission',
    district: 'Dumka',
    impactMetric: '1,200+ maternal point-of-care screenings completed',
    description:
      'Portable blood pathology analyzer and solar-refrigerated vaccine transport system powered by rooftop foldable monocrystalline panels.',
    icon: HeartPulse,
    tagColor: 'text-[#BE123C] bg-[#FFF5F5] border-[#FECDD3]',
  },
];

export function Solutions() {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState<string>('All');

  const domains = ['All', 'Water Management', 'Forest Economy', 'Mining Safety', 'Healthcare'];

  const filtered =
    selectedDomain === 'All'
      ? SOLUTIONS
      : SOLUTIONS.filter((s) => s.domain === selectedDomain);

  return (
    <div className="w-full bg-[#FAF9F5] text-[#1D2522] font-sans text-left">
      {/* ── Editorial Header ── */}
      <section className="border-b border-[#EEEAE1] bg-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-[11px] font-mono font-bold uppercase tracking-wider">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>PROVEN & EMERGING INNOVATIONS</span>
          </div>

          <h1 className="text-[2.2rem] sm:text-[3rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Solutions for Jharkhand
          </h1>

          <p className="text-[15px] sm:text-[16px] text-[#6B5845] max-w-2xl leading-relaxed">
            Real-world technologies, operating protocols, and community-tested innovations developed collaboratively to solve pressing societal challenges across Jharkhand.
          </p>

          {/* Domain Filter Pills */}
          <div className="pt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Filter className="h-4 w-4 text-[#6B5845] mr-1 shrink-0" />
            {domains.map((dom) => (
              <button
                key={dom}
                type="button"
                onClick={() => setSelectedDomain(dom)}
                className={`px-3.5 py-1.5 rounded-xl text-[12.5px] font-mono font-bold transition-all cursor-pointer ${
                  selectedDomain === dom
                    ? 'bg-[#123B2A] text-white shadow-xs'
                    : 'bg-[#FAF9F5] text-[#6B5845] border border-[#EEEAE1] hover:bg-white'
                }`}
              >
                {dom}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solutions Grid ── */}
      <section className="py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md border ${item.tagColor}`}
                      >
                        <Icon className="h-3 w-3" />
                        <span>{item.domain}</span>
                      </span>
                      <span className="text-[11px] font-mono text-[#15803D] font-bold bg-[#F0FDF4] px-2.5 py-0.5 rounded-md border border-[#BBF7D0]">
                        ✓ {item.stage}
                      </span>
                    </div>

                    <h3 className="text-[1.25rem] sm:text-[1.4rem] font-bold text-[#1D2522] group-hover:text-[#123B2A] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-[13.5px] text-[#6B5845] leading-relaxed">
                      {item.description}
                    </p>

                    <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1.5 text-[12px]">
                      <div className="flex items-center gap-1.5 text-[#123B2A] font-bold">
                        <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
                        <span>Verified Impact:</span>
                      </div>
                      <p className="text-[#1D2522] font-medium pl-5">
                        {item.impactMetric}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#EEEAE1] flex items-center justify-between">
                    <div className="text-[11.5px] font-mono text-[#6B5845]">
                      <span>{item.partner}</span> · <strong className="text-[#1D2522]">{item.district}</strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate(`/projects/${item.projectId}`)}
                      className="inline-flex items-center gap-1 text-[12.5px] font-bold text-[#123B2A] hover:underline cursor-pointer"
                    >
                      <span>Explore Case Dossier</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
