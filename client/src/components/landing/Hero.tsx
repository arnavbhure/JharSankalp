import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { IMAGES } from '../../config/images';
import { PlusCircle, MapPin, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-0">
      {/* Background Topographic Contour Lines Texture (Subtle SVG Overlay) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#4C1E4F_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* ── LEFT SIDE: Editorial Narrative (55%) ─────────────── */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Institutional Government Badge */}
            <div className="inline-flex items-center gap-2 rounded-sm border border-neutral-200 bg-neutral-50 px-3 py-1 text-small">
              <span className="font-semibold text-brand-purple uppercase tracking-wider text-[11px]">
                Govt. of Jharkhand
              </span>
              <span className="text-neutral-300">/</span>
              <span className="text-neutral-600 font-medium">
                Dept. of Higher & Technical Education
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-display font-bold text-neutral-900 tracking-tight leading-[1.15] text-balance">
              Local challenges.
              <br />
              <span className="text-brand-purple">Collective intelligence.</span>
              <br />
              Measurable impact.
            </h1>

            {/* Supporting Copy */}
            <p className="text-body-lg text-neutral-600 max-w-2xl leading-relaxed text-balance">
              JharSankalp connects citizens, universities, industry, and state authorities to
              transform real societal challenges across Jharkhand into tested, capability-matched,
              and verifiable public solutions.
            </p>

            {/* Primary Calls to Action */}
            <div className="flex items-center gap-3.5 flex-wrap pt-2">
              <Button
                size="lg"
                variant="primary"
                leftIcon={<PlusCircle className="h-4.5 w-4.5" />}
                onClick={() => navigate('/report')}
              >
                Report a Challenge
              </Button>

              <Button
                size="lg"
                variant="secondary"
                rightIcon={<ArrowRight className="h-4 w-4" />}
                onClick={() => {
                  const el = document.getElementById('innovation-map');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore the Innovation Map
              </Button>
            </div>

            {/* Institutional Trust Indicators */}
            <div className="pt-6 border-t border-neutral-200 grid grid-cols-3 gap-4 text-left max-w-lg">
              <div>
                <div className="text-h3 font-bold text-neutral-900 leading-none">24</div>
                <div className="text-caption text-neutral-600 mt-1 font-medium">
                  Districts Covered
                </div>
              </div>
              <div>
                <div className="text-h3 font-bold text-neutral-900 leading-none">15+</div>
                <div className="text-caption text-neutral-600 mt-1 font-medium">
                  Innovation Domains
                </div>
              </div>
              <div>
                <div className="text-h3 font-bold text-brand-purple leading-none">100%</div>
                <div className="text-caption text-neutral-600 mt-1 font-medium">
                  Verified Outcomes
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDE: Contextual Photographic Composition (45%) ── */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-sm border border-neutral-200 bg-neutral-100 p-2 shadow-medium">
              {/* Primary Contextual Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xs bg-neutral-200">
                <img
                  src={IMAGES.heroLandscape.url}
                  alt={IMAGES.heroLandscape.alt}
                  className="h-full w-full object-cover grayscale-[20%] contrast-[1.05]"
                  loading="eager"
                />
                {/* Subtle dark gradient overlay to guarantee text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/30 to-transparent" />

                {/* Overlaid Geographic Data Marker: Khunti */}
                <div className="absolute bottom-3 left-3 right-3 text-left text-neutral-0">
                  <div className="flex items-center gap-1.5 text-caption font-mono uppercase text-brand-apricot tracking-wide">
                    <MapPin className="h-3 w-3 text-brand-coral" />
                    <span>Khunti District · Murhu Block</span>
                  </div>
                  <h3 className="text-body-sm font-semibold text-neutral-0 leading-tight mt-0.5">
                    Rural Water Pump Telemetry Pilot
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[11px] bg-neutral-0/20 backdrop-blur-none px-2 py-0.5 rounded-sm border border-neutral-0/20 text-neutral-0">
                      Baseline: 12 days downtime
                    </span>
                    <span className="text-[11px] bg-brand-coral/90 text-neutral-0 px-2 py-0.5 rounded-sm font-medium">
                      Target: ≤ 4 days
                    </span>
                  </div>
                </div>
              </div>

              {/* Small Floating Contextual Challenge Badges (Anchored to frame) */}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="p-2 rounded-xs border border-neutral-200 bg-neutral-0 text-left">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-brand-purple">
                    <Cpu className="h-3 w-3 text-brand-coral" />
                    <span>Dhanbad · Jharia</span>
                  </div>
                  <p className="text-[12px] font-medium text-neutral-800 leading-snug truncate mt-0.5">
                    Mine Subsidence Warning
                  </p>
                  <Badge variant="purple" size="sm" className="mt-1 text-[10px]">
                    Critical Priority
                  </Badge>
                </div>

                <div className="p-2 rounded-xs border border-neutral-200 bg-neutral-0 text-left">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-brand-purple">
                    <ShieldCheck className="h-3 w-3 text-brand-coral" />
                    <span>Gumla · Bishunpur</span>
                  </div>
                  <p className="text-[12px] font-medium text-neutral-800 leading-snug truncate mt-0.5">
                    Tribal Soil Health Testing
                  </p>
                  <Badge variant="apricot" size="sm" className="mt-1 text-[10px]">
                    Matching Stage
                  </Badge>
                </div>
              </div>
            </div>

            {/* Editorial Caption Under Image */}
            <p className="text-caption text-neutral-600 mt-2 text-left italic">
              {IMAGES.heroLandscape.caption} ({IMAGES.heroLandscape.credit})
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
