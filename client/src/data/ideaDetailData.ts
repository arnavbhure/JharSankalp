import { IdeaDetail } from '../types/ideaDetail';

export const WATER_PUMP_IDEA_DETAIL: IdeaDetail = {
  id: 'IDEA-2026-0001',
  referenceId: 'IDEA-2026-0042',
  title: 'Low-Cost IoT Monitoring for Rural Water Pumps',
  summary:
    'A distributed monitoring system designed to detect pump failures early, reduce maintenance delays and improve access to drinking water in rural communities across Jharkhand.',
  category: 'Water Management',
  district: 'Khunti',
  block: 'Murhu Block',
  coordinates: { lat: 23.081, lng: 85.279 },
  stage: 'PROTOTYPE',
  stageLabel: 'PROTOTYPE DEVELOPMENT',
  currentFocus:
    'Building and bench-testing the first field-ready acoustic vibration collar prototype for standard India Mark II handpump infrastructure.',
  nextMilestone:
    'Complete laboratory cycle fatigue testing before deployment across 10 pilot pumps in Murhu Block.',
  submittedDate: '10 March 2026',
  likesCount: 128,

  parentChallenge: {
    id: 'JS-2026-00024',
    title: 'Frequent Breakdown of Drinking Water Pumps in Murhu Block',
    description:
      'Rural communities in several villages experience prolonged water disruption when handpumps fail. Limited visibility into pump failures means maintenance teams often become aware of issues only after communities report them manually weeks later.',
    district: 'Khunti',
    affectedPopulation: '2,000+ Residents',
    domain: 'Water Management',
    priority: 'High',
  },

  proposedApproach: {
    problem:
      'Pump failures are detected too late, leaving entire hamlets without clean drinking water for weeks.',
    approach:
      'Attach non-intrusive, solar/battery acoustic vibration sensors to pump riser heads that continuously log mechanical stroke rhythm and transmit failure signals before complete mechanical seizure occurs.',
    expectedOutcome:
      'Reduce average pump repair downtime from 18 days down to under 48 hours and allow block maintenance teams to dispatch spare parts proactively.',
  },

  workflowSteps: [
    {
      stepNumber: '01',
      title: 'Monitor',
      description:
        'Low-cost clamped sensors track pump activity, stroke counts, and diurnal usage patterns non-intrusively.',
      technicalDetail:
        'Piezoelectric vibration sensor logging mechanical frequency profiles between 5 Hz and 200 Hz.',
    },
    {
      stepNumber: '02',
      title: 'Detect',
      description:
        'Anomalous vibration harmonics and dry strokes indicate impending washer wear or drop in water aquifer table.',
      technicalDetail:
        'TinyML edge inference running on ultra-low-power ARM Cortex-M4 microcontroller.',
    },
    {
      stepNumber: '03',
      title: 'Transmit',
      description:
        'Telemetry summaries are relayed through sub-gigahertz mesh gateways to rural base towers.',
      technicalDetail:
        'LoRaWAN 868 MHz protocol achieving 12 km rural transmission without needing SIM cards at each pump.',
    },
    {
      stepNumber: '04',
      title: 'Alert',
      description:
        'District water engineers and Gram Panchayat Jal Samiti members receive an automated actionable mobile notification.',
      technicalDetail:
        'Automated WhatsApp & SMS dispatch tickets specifying exact pump ID, GPS spot, and predicted spare part needs.',
    },
    {
      stepNumber: '05',
      title: 'Respond',
      description:
        'Mobile mechanics replace the worn washer before seizure; service restoration is verified remotely by the sensor.',
      technicalDetail:
        'Telemetry acknowledges resumed stroke fluid resistance, automatically closing the open grievance docket.',
    },
  ],

  milestones: [
    {
      dateLabel: 'MARCH 2026',
      title: 'Prototype Architecture Finalized',
      description:
        'Schematic for low-power sensor collar completed and verified for mechanical fit on India Mark II pump cylinders.',
    },
    {
      dateLabel: 'FEBRUARY 2026',
      title: 'Hardware Components Evaluated',
      description:
        'Benchmarked 3 piezoelectric vibration transducers against ambient temperature spikes up to 45°C.',
    },
    {
      dateLabel: 'JANUARY 2026',
      title: 'Research Collaboration Formed',
      description:
        'Team formed with faculty advisors from BIT Sindri and community coordinators from Khunti Jal Samiti.',
    },
    {
      dateLabel: 'DECEMBER 2025',
      title: 'Idea Submitted to JharSankalp',
      description:
        'Initial concept docket drafted and matched with open societal challenge JS-2026-00024.',
    },
  ],

  contributors: [
    {
      id: 'c1',
      name: 'Arjun Kumar',
      title: 'Engineering Student',
      institution: 'BIT Sindri',
      role: 'Embedded Systems Lead',
      avatarInitials: 'AK',
    },
    {
      id: 'c2',
      name: 'Dr. Priya Singh',
      title: 'Faculty Mentor',
      institution: 'BIT Mesra',
      role: 'IoT & Sensor Systems',
      avatarInitials: 'PS',
    },
    {
      id: 'c3',
      name: 'Rural Innovation Lab',
      title: 'Research Partner',
      institution: 'Khunti Innovation Collective',
      role: 'Field Testing & Assembly',
      avatarInitials: 'RI',
    },
    {
      id: 'c4',
      name: 'Sunita Das',
      title: 'Mechanical Design Lead',
      institution: 'Ranchi Makerspace',
      role: 'Weatherproof Enclosure',
      avatarInitials: 'SD',
    },
    {
      id: 'c5',
      name: 'Amit Roy',
      title: 'Firmware Developer',
      institution: 'Open Hardware Foundation',
      role: 'LoRa Mesh Stack',
      avatarInitials: 'AR',
    },
    {
      id: 'c6',
      name: 'Vikas Kumar',
      title: 'Panchayat Coordinator',
      institution: 'Murhu Water Committee',
      role: 'Community Ground Liaison',
      avatarInitials: 'VK',
    },
  ],

  collaborationNeeds: [
    {
      id: 'need-1',
      category: 'HARDWARE ENGINEERING',
      title: 'Durable Low-Cost Sensor Collar Design',
      description:
        'Designing a tamper-resistant cast aluminium casing capable of withstanding monsoon humidity, dust, and continuous mechanical shock.',
      status: 'OPEN',
      priority: 'HIGH',
    },
    {
      id: 'need-2',
      category: 'FIELD TESTING PARTNER',
      title: 'Support for Pilot Testing in Real Infrastructure',
      description:
        'Coordination with local block development officers and panchayat mukhiyas to test prototypes on 10 active village handpumps.',
      status: 'OPEN',
      priority: 'HIGH',
    },
    {
      id: 'need-3',
      category: 'INDUSTRY MENTOR',
      title: 'IoT Deployment & Manufacturing Scale-Up',
      description:
        'Advisory on transitioning from hand-soldered prototype PCBs to automated surface-mount assembly (SMT) under 500 INR/unit.',
      status: 'SEEKING PARTNER',
      priority: 'SUPPORTING',
    },
    {
      id: 'need-4',
      category: 'FUNDING SUPPORT',
      title: 'Batch Prototype Manufacturing Capital',
      description:
        'Grant or CSR sponsorship to finance tooling, lithium iron phosphate batteries, and pilot gateway installations.',
      status: 'OPEN',
      priority: 'SUPPORTING',
    },
  ],

  relatedIdeas: [
    {
      id: 'IDEA-2026-0007',
      title: 'Decentralized Fluoride Filtration via Activated Clay Adsorbents',
      category: 'Water Management',
      stage: 'RESEARCH',
      contributorsCount: 5,
    },
    {
      id: 'IDEA-2026-0009',
      title: 'Gravity-Fed Automated Drip Irrigation for Terraced Hill Slopes',
      category: 'Agriculture',
      stage: 'PROTOTYPE',
      contributorsCount: 5,
    },
    {
      id: 'IDEA-2026-0002',
      title: 'Solar-Powered Community Cold Storage Network',
      category: 'Agriculture',
      stage: 'RESEARCH',
      contributorsCount: 4,
    },
  ],
};

import { CANONICAL_IDEAS } from './ecosystem';

export function getIdeaDetail(id?: string): IdeaDetail {
  if (!id) return WATER_PUMP_IDEA_DETAIL;

  const normalized = id.toLowerCase();
  if (
    normalized === 'idea-2026-0001' ||
    normalized === 'idea-water-pump-monitoring' ||
    normalized.includes('water') ||
    normalized === 'idea-2026-0042'
  ) {
    return WATER_PUMP_IDEA_DETAIL;
  }

  const canonical = CANONICAL_IDEAS.find(
    (i) => i.id.toLowerCase() === normalized || i.referenceId?.toLowerCase() === normalized,
  );

  if (canonical) {
    return {
      ...WATER_PUMP_IDEA_DETAIL,
      id: canonical.id,
      referenceId: canonical.referenceId,
      title: canonical.title,
      summary: canonical.summary,
      category: canonical.domain,
      district: canonical.district,
      block: canonical.block,
      stage: canonical.stage,
      stageLabel: canonical.stageLabel,
      parentChallenge: {
        id: canonical.challengeId,
        title: canonical.challengeTitle,
        description: canonical.summary,
        district: canonical.district,
        affectedPopulation: '1,500+ Citizens',
        domain: canonical.domain,
        priority: 'High',
      },
    };
  }

  // Return realistic fallback structure adapted for the requested ID
  return {
    ...WATER_PUMP_IDEA_DETAIL,
    id: id,
    referenceId: id.toUpperCase(),
  };
}
