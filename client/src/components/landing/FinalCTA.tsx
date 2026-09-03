import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import beTheChangeImg from '../../assets/be-the-change.png';
import heroIllustration from '../../assets/landing-page-frame.png';

export function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#F8F6F1] py-20 lg:py-24 border-t border-[#EEEAE1] relative overflow-hidden text-left">
      {/* Background Topographic Details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] pattern-topography"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ── LEFT SIDE: Typography Image & Campaign Action ── */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-caption font-mono uppercase font-bold text-[#123B2A] tracking-widest">
              <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
              <span>HAVE AN IDEA OR A PROBLEM?</span>
            </div>

            {/* ── EMBEDDED TRANSPARENT TYPOGRAPHY PNG ASSET ── */}
            <div className="max-w-[460px] select-none">
              <img
                src={beTheChangeImg}
                alt="Be the change Jharkhand needs."
                className="w-full h-auto object-contain drop-shadow-2xs"
                loading="eager"
              />
            </div>

            {/* Supporting Text (Exact 3 Lines from Specification) */}
            <div className="text-[16px] text-[#1D2522]/80 space-y-1.5 leading-relaxed font-medium">
              <p>Your idea can improve lives.</p>
              <p>Your voice can spark solutions.</p>
              <p>Your institution can help transform a community.</p>
            </div>

            {/* Rectangular CTA Buttons */}
            <div className="flex items-center gap-4 flex-wrap pt-2">
              <button
                onClick={() => navigate('/submit-idea')}
                className="inline-flex items-center gap-2.5 rounded-lg bg-[#123B2A] px-7 py-3.5 text-[15px] font-bold text-white shadow-sm hover:bg-[#0D2B1E] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Submit an Idea</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>

              <button
                onClick={() => navigate('/ideas')}
                className="inline-flex items-center gap-2 rounded-lg border border-[#6B5845]/30 bg-white px-6 py-3.5 text-[15px] font-bold text-[#1D2522] hover:bg-[#FAF9F5] hover:border-[#6B5845]/50 active:scale-[0.98] transition-all shadow-2xs cursor-pointer"
              >
                <span>Explore Ideas</span>
              </button>
            </div>
          </div>

          {/* ── RIGHT SIDE: Authentic Platform Illustration Composition ── */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] flex items-center justify-center">
              {/* Soft Amber Glow Backdrop */}
              <div
                aria-hidden="true"
                className="absolute top-4 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-[#F5A623]/25 blur-3xl pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute top-10 left-1/2 -translate-x-1/2 h-56 w-56 rounded-full bg-gradient-to-tr from-[#F5A623]/35 to-[#F5A623]/10 pointer-events-none border border-[#F5A623]/20"
              />

              {/* Dotted Accent Grid */}
              <div
                aria-hidden="true"
                className="absolute top-6 left-6 grid grid-cols-4 gap-2 opacity-25 pointer-events-none z-0"
              >
                {[...Array(12)].map((_, i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#123B2A]" />
                ))}
              </div>

              {/* Transparent Collaborative Visual Artwork */}
              <div className="relative z-10 w-full flex items-center justify-center">
                <img
                  src={heroIllustration}
                  alt="Young collaborative pioneers across Jharkhand"
                  className="w-full h-auto max-h-[460px] object-contain drop-shadow-sm select-none"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM: Institutional Trust & Partner Logos Strip ── */}
        <div className="mt-20 pt-10 border-t border-[#EEEAE1] text-center">
          <span className="text-[12px] font-bold uppercase tracking-widest text-[#6B5845] block mb-8 font-mono">
            Trusted by institutions and organizations
          </span>

          <div className="flex items-center justify-center gap-8 sm:gap-14 flex-wrap opacity-65 grayscale hover:grayscale-0 transition-all select-none">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[1.1rem] tracking-tight text-[#1D2522] font-sans">
                TATA TRUSTS
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[1.1rem] tracking-normal text-[#1D2522] font-sans">
                unicef <span className="font-normal text-[11px] block -mt-1 text-[#6B5845]">for every child</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[1rem] tracking-wide text-[#1D2522]">
                BIT SINDRI
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[1rem] tracking-wide text-[#1D2522]">
                IIT (ISM) DHANBAD
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[1rem] tracking-wide text-[#1D2522]">
                BIRSA AGRICULTURAL UNIVERSITY
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[0.95rem] tracking-wide text-[#1D2522]">
                GOVT OF JHARKHAND
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

