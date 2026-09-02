import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Search,
  Brain,
  Users,
  Target,
  BarChart3,
  MapPin,
  Shield,
  Lightbulb,
} from 'lucide-react';

export function Landing() {
  const { isGovernment, isUniversity, isIndustry } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated non-citizen users to their dashboard
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
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="text-center py-8 sm:py-12">
        <Badge variant="primary" className="mb-4">
          Jharkhand Innovation Ecosystem
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink-900 text-balance max-w-2xl mx-auto">
          Transform Local Challenges into
          <span className="text-primary"> Measurable Impact</span>
        </h1>
        <p className="mt-3 text-base text-ink-500 max-w-xl mx-auto text-balance">
          JharSankalp connects societal problems with the right combination of universities,
          industry, and government to create real, verified solutions for Jharkhand.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
          <Button
            size="lg"
            rightIcon={<ArrowRight className="h-4 w-4" />}
            onClick={() => navigate('/report')}
          >
            Report a Challenge
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/challenges')}
          >
            Explore Challenges
          </Button>
        </div>
      </section>

      {/* Lifecycle Overview */}
      <section>
        <h2 className="text-lg font-semibold text-ink-900 mb-4 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Search,
              title: 'Discover',
              description: 'Citizens and communities report real local challenges',
              color: 'text-primary',
              bg: 'bg-primary-50',
            },
            {
              icon: Brain,
              title: 'AI Intelligence',
              description: 'AI structures, classifies, and finds related challenges',
              color: 'text-secondary',
              bg: 'bg-secondary-50',
            },
            {
              icon: Users,
              title: 'Collaborate',
              description: 'Universities and industry form capability-matched consortiums',
              color: 'text-primary-700',
              bg: 'bg-primary-50',
            },
            {
              icon: Target,
              title: 'Verified Impact',
              description: 'Field pilots with measurable outcomes and community validation',
              color: 'text-success-700',
              bg: 'bg-success-50',
            },
          ].map((step, i) => (
            <Card key={i} padding="md" hover>
              <CardContent className="mt-0">
                <div className={`flex h-9 w-9 items-center justify-center rounded ${step.bg} ${step.color} mb-3`}>
                  <step.icon className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-sm font-semibold text-ink-900">{step.title}</h3>
                <p className="mt-1 text-sm text-ink-500">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            icon: Lightbulb,
            title: 'Challenge Intelligence',
            description: 'AI-powered problem structuring, deduplication, and priority scoring',
          },
          {
            icon: Shield,
            title: 'Capability Matching',
            description: 'Match challenges with university labs, faculty, and industry resources',
          },
          {
            icon: BarChart3,
            title: 'State-Level Insights',
            description: 'District-level analytics, systemic clusters, and mission recommendations',
          },
          {
            icon: Users,
            title: 'Multi-Org Consortiums',
            description: 'Form the right team across universities, startups, and industry',
          },
          {
            icon: Target,
            title: 'Impact Contracts',
            description: 'Define measurable success before building — baseline to verified outcome',
          },
          {
            icon: MapPin,
            title: 'Field Pilots',
            description: 'Real-world testing with community feedback and evidence collection',
          },
        ].map((feature, i) => (
          <div key={i} className="flex gap-3 p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-ink-100 text-ink-500">
              <feature.icon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink-800">{feature.title}</h3>
              <p className="mt-0.5 text-sm text-ink-500">{feature.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* For Government */}
      <section className="rounded border border-ink-200 bg-white p-6 text-center">
        <h2 className="text-base font-semibold text-ink-900">
          For Government Officers & Decision Makers
        </h2>
        <p className="mt-1 text-sm text-ink-500 max-w-lg mx-auto">
          Validate challenges, monitor projects, verify impact, and create state-level missions.
          All data-driven, all auditable.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate('/government')}
        >
          View Government Dashboard
        </Button>
      </section>
    </div>
  );
}
