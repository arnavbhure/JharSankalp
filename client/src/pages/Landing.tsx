import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Panel, PanelHeader, PanelBody } from '../components/ui/Panel';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Search,
  PlusCircle,
  MapPin,
  Users,
  ShieldCheck,
  Building2,
  GraduationCap,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';

export function Landing() {
  const { isGovernment, isUniversity, isIndustry } = useAuth();
  const navigate = useNavigate();

  // If already logged in with government/university/industry role, direct to their dedicated view
  if (isGovernment) {
    navigate('/government');
    return null;
  }
  if (isUniversity) {
    navigate('/university');
    return null;
  }
  if (isIndustry) {
    navigate('/industry');
    return null;
  }

  return (
    <div className="space-y-12 text-left">
      {/* ── 1. Editorial Hero Section ─────────────────────────── */}
      <section className="border-b border-neutral-200 pb-10 pt-2">
        <div className="flex items-center gap-2 mb-3.5">
          <span className="px-2 py-0.5 rounded-sm bg-neutral-100 text-neutral-800 text-[11px] font-semibold tracking-wide uppercase border border-neutral-200">
            Govt. of Jharkhand
          </span>
          <span className="text-neutral-300">/</span>
          <span className="text-small text-neutral-600 font-medium">
            Dept. of Higher & Technical Education
          </span>
        </div>

        <h1 className="text-display font-bold text-neutral-900 tracking-tight max-w-4xl text-balance leading-none">
          From local challenges to solutions that reach the ground.
        </h1>

        <p className="mt-4 max-w-2xl text-body-lg text-neutral-600 leading-relaxed text-balance">
          JharSankalp is Jharkhand&apos;s digital exchange connecting community societal problems with
          higher education institutions, industry capabilities, and state resources to build and verify
          measurable field solutions.
        </p>

        <div className="mt-7 flex items-center gap-3 flex-wrap">
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
            leftIcon={<Search className="h-4.5 w-4.5" />}
            onClick={() => navigate('/challenges')}
          >
            Explore Challenges
          </Button>
        </div>
      </section>

      {/* ── 2. The Challenge-to-Impact Loop ──────────────────── */}
      <section className="space-y-5">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-h3 font-bold text-neutral-900 tracking-tight">
            The Challenge-to-Impact Loop
          </h2>
          <p className="text-small text-neutral-600 mt-0.5">
            A closed-loop public innovation lifecycle from local observation to state-level learning.
          </p>
        </div>

        {/* 6-Stage Loop in Structured Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {[
            {
              step: '01',
              title: 'DISCOVER',
              desc: 'Citizens & communities log localized problems via voice, text, and photos.',
            },
            {
              step: '02',
              title: 'STRUCTURE',
              desc: 'AI parses raw descriptions, detects duplicates, and formats problem briefs.',
            },
            {
              step: '03',
              title: 'MATCH',
              desc: 'Matches challenge needs with HEI labs, faculty expertise, and industry commitments.',
            },
            {
              step: '04',
              title: 'BUILD',
              desc: 'Multi-organization consortium forms with a binding, pre-agreed Impact Contract.',
            },
            {
              step: '05',
              title: 'PILOT',
              desc: 'Controlled deployment in targeted blocks with community verification.',
            },
            {
              step: '06',
              title: 'IMPACT',
              desc: 'Evidence-backed baseline vs. actual metric review and systemic Mission scale-up.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-sm border border-neutral-200 bg-neutral-0 flex flex-col justify-between"
            >
              <div>
                <span className="text-caption font-mono font-semibold text-brand-purple tracking-wider">
                  {item.step}
                </span>
                <h3 className="text-small font-bold text-neutral-900 tracking-tight mt-1">
                  {item.title}
                </h3>
                <p className="text-caption text-neutral-600 mt-1.5 leading-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Featured State Challenges (Real Data) ─────────── */}
      <section className="space-y-5">
        <div className="flex items-baseline justify-between border-b border-neutral-200 pb-2">
          <div>
            <h2 className="text-h3 font-bold text-neutral-900 tracking-tight">
              Active Innovation Challenges
            </h2>
            <p className="text-small text-neutral-600 mt-0.5">
              Verified problems requiring technical research, prototyping, or consortium solving.
            </p>
          </div>
          <button
            onClick={() => navigate('/challenges')}
            className="text-small font-medium text-brand-purple hover:underline inline-flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {[
            {
              id: 'JS-2024-00001',
              title: 'Predictive Maintenance of Rural Water Pumps',
              desc: 'Multiple villages in Khunti report repeated breakdowns in hand pumps and electric borewells. Long downtime forces walking up to 4 km for drinking water.',
              district: 'Khunti',
              block: 'Murhu',
              domain: 'Water & Sanitation',
              population: '2,000 residents',
              status: 'SUBMITTED',
              track: 'INNOVATE',
              priority: 'High Priority',
            },
            {
              id: 'JS-2024-00002',
              title: 'Soil Health Monitoring for Tribal Smallholders',
              desc: 'Lack of rapid soil testing facilities leading to fertilizer over-application and declining crop yield across rainfed tribal farming clusters.',
              district: 'Gumla',
              block: 'Bishunpur',
              domain: 'Agriculture',
              population: '5,000 farmers',
              status: 'SUBMITTED',
              track: 'RESEARCH',
              priority: 'Medium Priority',
            },
            {
              id: 'JS-2024-00003',
              title: 'Early Warning System for Abandoned Mine Subsidence',
              desc: 'Ground subsidence hazards near abandoned coal seams threatening residential colonies. Real-time seismic and displacement monitoring required.',
              district: 'Dhanbad',
              block: 'Jharia',
              domain: 'Mining Safety',
              population: '15,000 residents',
              status: 'SUBMITTED',
              track: 'INNOVATE',
              priority: 'Critical Priority',
            },
          ].map((ch) => (
            <div
              key={ch.id}
              className="p-4 rounded-sm border border-neutral-200 bg-neutral-0 hover:border-neutral-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-caption font-mono font-medium text-neutral-400">
                      {ch.id}
                    </span>
                    <Badge variant="purple" size="sm">
                      {ch.domain}
                    </Badge>
                    <StatusBadge type="actionTrack" value={ch.track} />
                  </div>
                  <h3 className="text-body font-semibold text-neutral-900 leading-snug pt-0.5">
                    {ch.title}
                  </h3>
                  <p className="text-small text-neutral-600 leading-normal max-w-3xl">
                    {ch.desc}
                  </p>
                </div>

                <div className="shrink-0 flex sm:flex-col items-end justify-between sm:justify-start gap-1 text-right">
                  <StatusBadge type="challenge" value={ch.status} />
                  <span className="text-caption text-neutral-400 flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {ch.district}, {ch.block}
                  </span>
                </div>
              </div>

              <div className="mt-3.5 pt-3 border-t border-neutral-100 flex items-center justify-between text-caption text-neutral-600">
                <div className="flex items-center gap-4">
                  <span>Impacted Population: <strong className="text-neutral-800">{ch.population}</strong></span>
                  <span className="hidden sm:inline text-neutral-300">|</span>
                  <span className="hidden sm:inline">{ch.priority}</span>
                </div>
                <button
                  onClick={() => navigate(`/challenges`)}
                  className="text-brand-purple font-medium hover:underline inline-flex items-center gap-1"
                >
                  <span>Review Details</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Ecosystem Operating Model ─────────────────────── */}
      <section className="space-y-5">
        <div className="border-b border-neutral-200 pb-2">
          <h2 className="text-h3 font-bold text-neutral-900 tracking-tight">
            Ecosystem Participation
          </h2>
          <p className="text-small text-neutral-600 mt-0.5">
            Clear roles and responsibilities across Jharkhand&apos;s higher education and innovation landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Panel variant="default" padding="md">
            <PanelHeader
              title="Citizens & PRI"
              tag={<Users className="h-4 w-4 text-brand-purple" />}
            />
            <PanelBody>
              <ul className="space-y-2 text-small text-neutral-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-purple shrink-0 mt-0.5" />
                  <span>Report observed community problems with voice, text, or photos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-purple shrink-0 mt-0.5" />
                  <span>Track challenge progression through validation and pilot</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-purple shrink-0 mt-0.5" />
                  <span>Submit ground feedback and field outcome verification</span>
                </li>
              </ul>
            </PanelBody>
          </Panel>

          <Panel variant="default" padding="md">
            <PanelHeader
              title="Universities & HEIs"
              tag={<GraduationCap className="h-4 w-4 text-brand-purple" />}
            />
            <PanelBody>
              <ul className="space-y-2 text-small text-neutral-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-purple shrink-0 mt-0.5" />
                  <span>Index laboratory equipment, research areas, and faculty capacity</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-purple shrink-0 mt-0.5" />
                  <span>Accept validated innovation challenges and form student teams</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-purple shrink-0 mt-0.5" />
                  <span>Lead technical proposals and execute prototypes and pilots</span>
                </li>
              </ul>
            </PanelBody>
          </Panel>

          <Panel variant="default" padding="md">
            <PanelHeader
              title="Industry & MSMEs"
              tag={<Briefcase className="h-4 w-4 text-brand-purple" />}
            />
            <PanelBody>
              <ul className="space-y-2 text-small text-neutral-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-purple shrink-0 mt-0.5" />
                  <span>Publish commitments: hardware, testing facilities, and mentors</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-purple shrink-0 mt-0.5" />
                  <span>Join multidisciplinary consortia alongside universities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-purple shrink-0 mt-0.5" />
                  <span>Facilitate field deployment and industrial manufacturing scale</span>
                </li>
              </ul>
            </PanelBody>
          </Panel>

          <Panel variant="default" padding="md">
            <PanelHeader
              title="Government Authorities"
              tag={<Building2 className="h-4 w-4 text-brand-purple" />}
            />
            <PanelBody>
              <ul className="space-y-2 text-small text-neutral-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-purple shrink-0 mt-0.5" />
                  <span>Triage and validate incoming challenges and confirm action tracks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-purple shrink-0 mt-0.5" />
                  <span>Approve project milestones and verify measured community impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-purple shrink-0 mt-0.5" />
                  <span>Group recurring systemic challenges into state Mission Challenges</span>
                </li>
              </ul>
            </PanelBody>
          </Panel>
        </div>
      </section>

      {/* ── 5. Institutional Bottom Callout ──────────────────── */}
      <section className="p-6 rounded-sm border border-neutral-200 bg-neutral-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand-purple" />
            <h3 className="text-body font-bold text-neutral-900">
              Government Decision & Triage Dashboard
            </h3>
          </div>
          <p className="text-small text-neutral-600 max-w-2xl">
            Authorized state and district officers can review submitted challenges, approve
            consortium configurations, track district metrics, and verify field impact records.
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() => navigate('/government')}
          className="shrink-0"
        >
          Open State Overview
        </Button>
      </section>
    </div>
  );
}
