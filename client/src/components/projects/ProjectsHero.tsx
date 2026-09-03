import { Rocket, Sparkles, Building2, MapPin } from 'lucide-react';

export function ProjectsHero() {
  return (
    <section className="border-b border-[#EEEAE1] bg-[#F8F6F1] pt-12 pb-10 sm:pt-16 sm:pb-12 text-left relative overflow-hidden">
      {/* Background Geodetic Lines Accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(#123B2A0D_1.5px,transparent_1.5px)] bg-[size:20px_20px] pointer-events-none"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
        <div className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#123B2A] font-bold">
          <Rocket className="h-4 w-4 text-[#F5A623]" />
          <span>ACTIVE INNOVATION PROJECTS · EXECUTION LAYER</span>
        </div>

        <h1 className="text-[2.4rem] sm:text-[3.2rem] lg:text-[3.6rem] font-extrabold text-[#1D2522] tracking-tight leading-[1.12] font-sans max-w-4xl">
          Ideas become meaningful <br className="hidden sm:block" />
          when they reach the ground.
        </h1>

        <p className="text-[16px] sm:text-[17.5px] text-[#6B5845] max-w-3xl leading-relaxed font-normal">
          Explore collaborative projects where universities, communities, industry partners and public institutions are working together to turn societal challenges into practical solutions across Jharkhand&apos;s 24 districts.
        </p>

        {/* Triple Signal Pills */}
        <div className="flex items-center gap-3 sm:gap-6 flex-wrap pt-2 text-[12px] font-mono text-[#123B2A]">
          <span className="inline-flex items-center gap-1.5 font-bold">
            <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
            Multi-Stakeholder Consortia
          </span>
          <span className="text-[#6B5845]/40">·</span>
          <span className="inline-flex items-center gap-1.5 font-bold">
            <Building2 className="h-3.5 w-3.5 text-[#123B2A]" />
            Academic & Industrial Backing
          </span>
          <span className="text-[#6B5845]/40">·</span>
          <span className="inline-flex items-center gap-1.5 font-bold">
            <MapPin className="h-3.5 w-3.5 text-[#BE123C]" />
            Real District Deployments
          </span>
        </div>
      </div>
    </section>
  );
}
