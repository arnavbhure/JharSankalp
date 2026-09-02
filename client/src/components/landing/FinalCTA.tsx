import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../../config/images';

export function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#FCFAF6] py-20 lg:py-24 border-t border-neutral-200/60 relative overflow-hidden text-left">
      {/* Background Topographic Details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#163D2B_1.5px,transparent_1.5px)] [background-size:28px_28px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ── LEFT SIDE: Typography Image & Campaign Action ── */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-caption font-mono uppercase font-bold text-[#F5A623] tracking-widest">
              <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
              <span>HAVE AN IDEA OR A PROBLEM?</span>
            </div>

            {/* ── EMBEDDED TRANSPARENT TYPOGRAPHY PNG ASSET ── */}
            <div className="max-w-[440px] select-none">
              <img
                src="/images/be-the-change.png"
                alt="Be the change Jharkhand needs."
                className="w-full h-auto object-contain drop-shadow-sm"
                loading="eager"
              />
            </div>

            <p className="text-body-lg text-neutral-600 max-w-md leading-relaxed">
              Your idea can improve lives. Your voice can spark solutions. Your institution could help transform a community.
            </p>

            <div className="flex items-center gap-4 flex-wrap pt-2">
              <button
                onClick={() => navigate('/report')}
                className="inline-flex items-center gap-2.5 rounded-pill bg-[#163D2B] px-7 py-3.5 text-body-sm font-bold text-white shadow-md hover:bg-[#102F21] active:scale-[0.98] transition-all"
              >
                <span>Submit an Idea</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('challenges-feed');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 rounded-pill border-2 border-neutral-300 bg-white px-6 py-3.5 text-body-sm font-bold text-neutral-800 hover:bg-neutral-50 hover:border-neutral-400 active:scale-[0.98] transition-all shadow-xs"
              >
                <span>Explore Ideas</span>
              </button>
            </div>
          </div>

          {/* ── RIGHT SIDE: Young Indian Innovators Photographic Composition ── */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px]">
              {/* Golden Orange Sun Circle Backdrop */}
              <div
                aria-hidden="true"
                className="absolute top-8 left-12 h-64 w-64 rounded-full bg-[#F5A623] opacity-85 pointer-events-none"
              />

              {/* Natural Green Organic Accent Shapes */}
              <div
                aria-hidden="true"
                className="absolute -bottom-6 right-8 h-40 w-40 rounded-full bg-[#3E7A4A]/25 blur-xl pointer-events-none"
              />

              {/* Green Organic Paw / Dot Accents */}
              <div className="absolute top-6 left-6 grid grid-cols-3 gap-2 opacity-50 pointer-events-none z-20">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="h-2 w-2 rounded-full bg-[#163D2B]" />
                ))}
              </div>

              {/* Organic Arch / Brush Mask Student Innovators Photograph */}
              <div className="relative z-10 w-full overflow-hidden rounded-t-[180px] rounded-b-[40px] border-4 border-white shadow-2xl bg-neutral-100 aspect-[4/4.5]">
                <img
                  src={IMAGES.studentsInnovators.url}
                  alt={IMAGES.studentsInnovators.alt}
                  className="h-full w-full object-cover grayscale-[0%] contrast-[1.05]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM: Institutional Trust & Partner Logos Strip ── */}
        <div className="mt-20 pt-10 border-t border-neutral-200/80 text-center">
          <span className="text-[12px] font-bold uppercase tracking-widest text-neutral-400 block mb-6">
            Trusted by institutions and organizations
          </span>

          <div className="flex items-center justify-center gap-8 sm:gap-14 flex-wrap opacity-70 grayscale hover:grayscale-0 transition-all">
            <span className="font-extrabold text-[1.1rem] tracking-tight text-neutral-800 font-sans">
              TATA TRUSTS
            </span>
            <span className="font-bold text-[1.1rem] tracking-normal text-neutral-800 font-sans">
              unicef <span className="font-normal text-xs block -mt-1">for every child</span>
            </span>
            <span className="font-bold text-[0.95rem] tracking-wide text-neutral-800">
              BIT SINDRI
            </span>
            <span className="font-bold text-[0.95rem] tracking-wide text-neutral-800">
              IIT (ISM) DHANBAD
            </span>
            <span className="font-bold text-[0.95rem] tracking-wide text-neutral-800">
              BIRSA AGRI UNIV
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
