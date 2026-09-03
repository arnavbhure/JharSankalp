import {
  Project,
  PortfolioStats,
  PortfolioActivityItem,
  ProjectFiltersState,
} from '../types/projects';
import { ProjectDetail, ExpressInterestFormData } from '../types/projectDetail';

export const SEED_PROJECTS: Project[] = [
  {
    id: 'PROJECT-2026-0012',
    projectCode: 'PROJECT-2026-0012',
    title: 'Smart Rural Water Infrastructure Monitoring',
    summary:
      'A university-led consortium developing low-cost sensor collars and LoRa mesh telemetry to identify rural drinking water handpump failures before village supply experiences prolonged disruption.',
    domain: 'Water Management',
    relatedChallengeId: 'JS-2026-00024',
    relatedChallengeTitle: 'Frequent Breakdown of Drinking Water Pumps in Murhu Block',
    relatedIdeaId: 'IDEA-2026-0001',
    district: 'Khunti',
    location: 'Murhu Block, Khunti',
    stage: 'FIELD_PILOT',
    stageLabel: 'FIELD PILOT',
    health: 'ON_TRACK',
    healthLabel: 'ON TRACK',
    leadInstitution: 'BIT Mesra',
    impactMetric: '2,000+ Residents Covered',
    potentialBeneficiaries: 2000,
    progressPercentage: 68,
    startedAt: 'November 2025',
    featured: true,
    coordinates: { x: 50, y: 62 },
    imageUrl: '/rural_water_iot_field.jpg',
    partners: [
      { id: 'p1', name: 'BIT Mesra', type: 'UNIVERSITY', role: 'Telemetry Architecture & LoRa Mesh', lead: true },
      { id: 'p2', name: 'Khunti District Administration', type: 'GOVERNMENT', role: 'Pilot Handpump Allocation & Jal Samiti Training' },
      { id: 'p3', name: 'Rural Innovation Lab', type: 'RESEARCH_ORG', role: 'Vibration Signal Processing' },
      { id: 'p4', name: 'Local MSME Partner', type: 'STARTUP', role: 'Machined Sensor Casing Fabrication' },
    ],
    collaborationNeeds: [
      {
        id: 'cn-1',
        type: 'IoT Manufacturing Partner',
        description: 'Seeking an indigenous PCB assembly and solar enclosure fabrication partner for 150 pilot kits.',
        status: 'OPEN',
      },
    ],
  },
  {
    id: 'PROJECT-2026-0009',
    projectCode: 'PROJECT-2026-0009',
    title: 'AI-Based Mine Subsidence Early Warning System',
    summary:
      'Underground micro-seismic geophone array coupled with predictive neural networks to monitor strata deformation and surface crack propagation across legacy mining wards.',
    domain: 'Mining Safety',
    relatedChallengeId: 'JS-2024-00003',
    relatedChallengeTitle: 'Early Detection of Ground Subsidence in Mining Areas',
    relatedIdeaId: 'IDEA-2026-0003',
    district: 'Dhanbad',
    location: 'Jharia Sector, Dhanbad',
    stage: 'PROTOTYPE',
    stageLabel: 'PROTOTYPE',
    health: 'NEEDS_ATTENTION',
    healthLabel: 'NEEDS ATTENTION',
    leadInstitution: 'BIT Sindri',
    impactMetric: '15,000 Residents Protected',
    potentialBeneficiaries: 15000,
    progressPercentage: 45,
    startedAt: 'October 2025',
    coordinates: { x: 74, y: 42 },
    partners: [
      { id: 'p5', name: 'BIT Sindri', type: 'UNIVERSITY', role: 'Seismic Signal Analysis', lead: true },
      { id: 'p6', name: 'Mining Research Centre', type: 'RESEARCH_ORG', role: 'Borehole Sensor Calibration' },
      { id: 'p7', name: 'Dhanbad District Administration', type: 'GOVERNMENT', role: 'Evacuation Protocol Integration' },
    ],
    collaborationNeeds: [
      {
        id: 'cn-2',
        type: 'Geospatial Data Partner',
        description: 'Requires satellite InSAR baseline imagery calibration and GIS spatial overlay expertise.',
        status: 'OPEN',
      },
    ],
  },
  {
    id: 'PROJECT-2026-0007',
    projectCode: 'PROJECT-2026-0007',
    title: 'Soil Intelligence for Smallholder Farmers',
    summary:
      'Electrochemical micro-fluidic soil chemistry probes with vernacular audio advisories helping tribal farmers calibrate micronutrients and overcome heavy soil acidity.',
    domain: 'Agriculture',
    relatedChallengeId: 'JS-2026-00019',
    relatedChallengeTitle: 'Low Agricultural Yield Due to Untested Acidic Soils',
    district: 'Gumla',
    location: 'Bishunpur Block, Gumla',
    stage: 'FIELD_PILOT',
    stageLabel: 'FIELD PILOT',
    health: 'ON_TRACK',
    healthLabel: 'ON TRACK',
    leadInstitution: 'Birsa Agricultural University',
    impactMetric: '5,000 Farmers Supported',
    potentialBeneficiaries: 5000,
    progressPercentage: 72,
    startedAt: 'August 2025',
    coordinates: { x: 34, y: 64 },
    partners: [
      { id: 'p8', name: 'Birsa Agricultural University', type: 'UNIVERSITY', role: 'Soil Chemistry Baseline', lead: true },
      { id: 'p9', name: 'Farmer Producer Organization', type: 'COMMUNITY_ORG', role: 'Village Testing Hubs' },
      { id: 'p10', name: 'AgriTech Startup', type: 'STARTUP', role: 'Mobile Advisory Engine' },
    ],
    collaborationNeeds: [
      {
        id: 'cn-3',
        type: 'Rural Sensor Deployment Partner',
        description: 'Looking for grassroots Krishi Mitras for distributed test kit calibration across 22 panchayats.',
        status: 'OPEN',
      },
    ],
  },
  {
    id: 'PROJECT-2026-0004',
    projectCode: 'PROJECT-2026-0004',
    title: 'Offline Digital Learning Network',
    summary:
      'Solar-powered local micro-cloud servers transmitting Ho, Santhali, and Hindi educational content to low-cost tablets without internet connectivity.',
    domain: 'Education',
    relatedChallengeId: 'JS-2026-00017',
    relatedChallengeTitle: 'Poor Mobile Connectivity in Remote Tribal Schools',
    district: 'West Singhbhum',
    location: 'Manoharpur Block, West Singhbhum',
    stage: 'IMPACT_VERIFICATION',
    stageLabel: 'IMPACT VERIFICATION',
    health: 'ON_TRACK',
    healthLabel: 'ON TRACK',
    leadInstitution: 'Kolhan State University',
    impactMetric: '3,500 Students Reached',
    potentialBeneficiaries: 3500,
    progressPercentage: 84,
    startedAt: 'July 2025',
    coordinates: { x: 56, y: 82 },
    partners: [
      { id: 'p11', name: 'Kolhan State University', type: 'UNIVERSITY', role: 'Curriculum & Pedagogy', lead: true },
      { id: 'p12', name: 'Education Department Jharkhand', type: 'GOVERNMENT', role: 'School Access & Teacher Training' },
      { id: 'p13', name: 'Shiksha Open EdTech Partner', type: 'INDUSTRY', role: 'Local Content Caching' },
    ],
    collaborationNeeds: [
      {
        id: 'cn-4',
        type: 'Content Development Partner',
        description: 'Seeking bilingual curriculum writers for grades 6-10 STEM modules in Santhali & Mundari.',
        status: 'OPEN',
      },
    ],
  },
  {
    id: 'PROJECT-2025-0021',
    projectCode: 'PROJECT-2025-0021',
    title: 'Community Waste Segregation Tracking System',
    summary:
      'QR-coded household waste compliance telemetry and localized compost bin temperature analytics connecting municipal waste collectors with residential RWAs.',
    domain: 'Environment',
    relatedChallengeId: 'JS-2025-00182',
    relatedChallengeTitle: 'Unsafe Waste Disposal Near Residential Areas',
    district: 'Ranchi',
    location: 'Namkum & Harmu Wards, Ranchi',
    stage: 'SCALING',
    stageLabel: 'SCALING',
    health: 'ON_TRACK',
    healthLabel: 'ON TRACK',
    leadInstitution: 'Central University of Jharkhand',
    impactMetric: '25,000 Citizens Engaged',
    potentialBeneficiaries: 25000,
    progressPercentage: 92,
    startedAt: 'April 2025',
    coordinates: { x: 53, y: 52 },
    partners: [
      { id: 'p14', name: 'Ranchi Municipal Corporation', type: 'GOVERNMENT', role: 'Fleet Integration', lead: true },
      { id: 'p15', name: 'Central University of Jharkhand', type: 'UNIVERSITY', role: 'Bio-composting Optimization' },
      { id: 'p16', name: 'SwachhTech Solutions', type: 'STARTUP', role: 'Routing Software Platform' },
    ],
    collaborationNeeds: [
      {
        id: 'cn-5',
        type: 'District Logistics Partner',
        description: 'Seeking decentralized e-rickshaw waste collection routing integration partner.',
        status: 'OPEN',
      },
    ],
  },
  {
    id: 'PROJECT-2025-0017',
    projectCode: 'PROJECT-2025-0017',
    title: 'Accessible Public Service Navigation',
    summary:
      'Haptic audio wayfinding kiosks and tactile floor navigation for visually impaired and elderly citizens navigating block administrative centers and civil hospitals.',
    domain: 'Accessibility',
    relatedChallengeId: 'JS-2026-00008',
    relatedChallengeTitle: 'Inaccessible Grievance Kiosks for Differently Abled',
    district: 'Hazaribagh',
    location: 'Sadar Block, Hazaribagh',
    stage: 'DESIGN',
    stageLabel: 'DESIGN',
    health: 'AT_RISK',
    healthLabel: 'AT RISK',
    leadInstitution: 'Vinoba Bhave University',
    impactMetric: '8,000 Citizens Enabled',
    potentialBeneficiaries: 8000,
    progressPercentage: 28,
    startedAt: 'December 2025',
    coordinates: { x: 54, y: 32 },
    partners: [
      { id: 'p17', name: 'Vinoba Bhave University', type: 'UNIVERSITY', role: 'Assistive Tech Prototyping', lead: true },
      { id: 'p18', name: 'Disability Rights Organization', type: 'COMMUNITY_ORG', role: 'User Experience Auditing' },
      { id: 'p19', name: 'Hazaribagh District Administration', type: 'GOVERNMENT', role: 'Collectorate Facility Pilot' },
    ],
    collaborationNeeds: [
      {
        id: 'cn-6',
        type: 'Mobile Accessibility Co-designer',
        description: 'Needs mobile UX accessibility specialists familiar with WCAG AAA and tactile feedback triggers.',
        status: 'OPEN',
      },
    ],
  },
];

export const PORTFOLIO_STATS: PortfolioStats = {
  activeProjects: 18,
  universitiesInvolved: 11,
  partnerOrganizations: 27,
  projectsInFieldPilot: 6,
  peopleImpacted: 42000,
  districtsWithPilots: 6,
};

export const PORTFOLIO_ACTIVITIES: PortfolioActivityItem[] = [
  {
    id: 'pa-1',
    timestamp: 'TODAY',
    title: 'Field Pilot Deployment Initiated',
    description: 'Smart Rural Water Monitoring sensor nodes deployed across 12 handpumps in Murhu Block, Khunti.',
    projectCode: 'PROJECT-2026-0012',
    projectTitle: 'Smart Rural Water Infrastructure Monitoring',
    type: 'pilot',
  },
  {
    id: 'pa-2',
    timestamp: 'YESTERDAY',
    title: 'Impact Verification Completed',
    description: 'Offline Digital Learning Network passed classroom usability tests across 14 remote ashram schools.',
    projectCode: 'PROJECT-2026-0004',
    projectTitle: 'Offline Digital Learning Network',
    type: 'verification',
  },
  {
    id: 'pa-3',
    timestamp: '3 DAYS AGO',
    title: 'New Manufacturing Partner Joined',
    description: 'Adityapur MSME cluster partner joined the Water Monitoring consortium for localized enclosure fabrication.',
    projectCode: 'PROJECT-2026-0012',
    projectTitle: 'Smart Rural Water Infrastructure Monitoring',
    type: 'partner',
  },
  {
    id: 'pa-4',
    timestamp: '5 DAYS AGO',
    title: 'Prototype Laboratory Validation Passed',
    description: 'Mine Subsidence Early Warning System finished simulated fracture detection bench tests at BIT Sindri.',
    projectCode: 'PROJECT-2026-0009',
    projectTitle: 'AI-Based Mine Subsidence Early Warning System',
    type: 'prototype',
  },
  {
    id: 'pa-5',
    timestamp: '1 WEEK AGO',
    title: 'New Consortium Charter Formed',
    description: 'Soil Intelligence for Smallholder Farmers formalized its multi-institution partnership in Gumla.',
    projectCode: 'PROJECT-2026-0007',
    projectTitle: 'Soil Intelligence for Smallholder Farmers',
    type: 'formation',
  },
];

export const DETAILED_PROJECTS: Record<string, ProjectDetail> = {
  'PROJECT-2026-0012': {
    ...SEED_PROJECTS[0],
    description:
      'A collaborative initiative developing low-cost monitoring systems to detect rural drinking water infrastructure failures early and reduce prolonged service disruption across Murhu Block.',
    challenge: {
      id: 'JS-2026-00024',
      title: 'Frequent Breakdown of Drinking Water Pumps in Murhu Block',
      location: 'Murhu Block, Khunti',
    },
    idea: {
      id: 'IDEA-2026-0001',
      title: 'Low-Cost IoT Monitoring for Rural Water Pumps',
    },
    mission: {
      problem:
        'Communities in Murhu Block experience prolonged water disruption when drinking water pumps fail without early detection or a structured maintenance response.',
      approach:
        'Deploy affordable sensor modules capable of identifying pump inactivity and unusual operational patterns, combined with a simple monitoring interface for maintenance teams.',
      expectedOutcome:
        'Reduce average infrastructure downtime and enable faster maintenance intervention.',
    },
    successCriteria: [
      {
        label: 'Reduce average pump downtime',
        baseline: 'From 12 days',
        target: 'Target below 4 days',
      },
      {
        label: 'Improve fault detection speed',
        baseline: 'Manual community reporting',
        target: 'Automated telemetry alerts',
      },
      {
        label: 'Pilot Coverage',
        baseline: '20 initial water points',
        target: '75 planned water points across Murhu Block',
      },
    ],
    team: [
      {
        id: 'tm-1',
        name: 'Dr. Ananya Singh',
        role: 'Faculty Mentor & Principal Investigator',
        title: 'Professor, Embedded Systems & IoT',
        specialty: 'Low-Power LoRa Mesh & Sensing Circuits',
        institution: 'BIT Mesra',
        avatarInitials: 'AS',
      },
      {
        id: 'tm-2',
        name: 'Ravi Kumar',
        role: 'Student Researcher',
        title: 'M.Tech Embedded Systems Fellow',
        specialty: 'Hardware Development & Vibration DSP',
        institution: 'BIT Mesra',
        avatarInitials: 'RK',
      },
      {
        id: 'tm-3',
        name: 'Priya Verma',
        role: 'Project Coordinator',
        title: 'Field Operations Specialist',
        specialty: 'Jal Samiti Community Engagement & Training',
        institution: 'Rural Innovation Lab',
        avatarInitials: 'PV',
      },
    ],
    milestones: [
      {
        id: 'ms-1',
        phase: 'PHASE 01',
        period: 'JAN 2026',
        title: 'Problem Validation',
        description:
          'Conducted field baseline across 25 villages in Murhu Block, verifying average pump breakdown patterns and Jal Samiti repair intervals.',
        deliverables: ['Field Failure Audit Report', 'Pump Mechanical Specification Matrix'],
        owner: 'Rural Innovation Lab',
        status: 'COMPLETED',
      },
      {
        id: 'ms-2',
        phase: 'PHASE 02',
        period: 'FEB 2026',
        title: 'System Architecture',
        description:
          'Designed low-power LoRa mesh topology, piezoelectric transducer collar, and energy-harvesting solar battery circuit.',
        deliverables: ['Schematic Design v1.2', 'LoRaWAN Gateway Placement Plan'],
        owner: 'BIT Mesra',
        status: 'COMPLETED',
      },
      {
        id: 'ms-3',
        phase: 'PHASE 03',
        period: 'MAR 2026',
        title: 'Prototype Development',
        description:
          'Fabricated 20 bench prototypes and tested stroke frequency anomaly detection in controlled hydraulic flow test rigs.',
        deliverables: ['IoT Sensor Prototype v2', 'Calibration Firmware v1.0'],
        owner: 'BIT Mesra',
        status: 'COMPLETED',
      },
      {
        id: 'ms-4',
        phase: 'PHASE 04',
        period: 'APR – JUN 2026',
        title: 'Field Pilot',
        description:
          'Installing and operating 20 telemetry nodes on working India Mark II handpumps across 8 gram panchayats in Murhu Block.',
        deliverables: ['14 Installed Field Nodes', 'Daily Dashboard Sync', 'Jal Samiti WhatsApp Integration'],
        owner: 'Joint Consortium',
        status: 'IN_PROGRESS',
      },
      {
        id: 'ms-5',
        phase: 'PHASE 05',
        period: 'JUL 2026',
        title: 'Impact Evaluation',
        description:
          'Measure response turnaround times, false-positive alert frequencies, and community satisfaction with Jal Sahiya workers.',
        deliverables: ['Pilot Evaluation Dossier', 'Mean Time To Repair (MTTR) Analysis'],
        owner: 'Khunti District Administration',
        status: 'UPCOMING',
      },
      {
        id: 'ms-6',
        phase: 'PHASE 06',
        period: 'AUG 2026',
        title: 'Scale Recommendation',
        description:
          'Submit policy brief and commercialization tender specifications to Jharkhand State Drinking Water & Sanitation Department (DWSD).',
        deliverables: ['State Scale Blueprint', 'Tender Hardware Specs'],
        owner: 'BIT Mesra & State DWSD',
        status: 'PLANNED',
      },
    ],
    workstreams: [
      {
        id: 'ws-1',
        title: 'FIELD DEPLOYMENT',
        description: 'Install sensor modules across 20 selected water points in Murhu Block panchayats.',
        progress: '14 / 20 Sites',
        status: 'Active Field Testing',
        metric: '70% Complete',
      },
      {
        id: 'ws-2',
        title: 'DATA COLLECTION',
        description: 'Monitor pump activity and failure patterns.',
        progress: 'Collecting Pilot Data',
        status: 'Continuous Stream',
        metric: '18,400 Packets',
      },
      {
        id: 'ws-3',
        title: 'MAINTENANCE WORKFLOW',
        description: 'Test automated alert routing to maintenance teams.',
        progress: 'In Validation',
        status: 'Dry-Run Testing',
        metric: '6 Verified Alerts',
      },
    ],
    deliverables: [
      {
        id: 'del-1',
        title: 'IoT Sensor Prototype v2',
        owner: 'BIT Mesra',
        status: 'COMPLETED',
        date: 'May 12, 2026',
      },
      {
        id: 'del-2',
        title: 'Field Installation Protocol',
        owner: 'Rural Innovation Lab',
        status: 'COMPLETED',
        date: 'May 18, 2026',
      },
      {
        id: 'del-3',
        title: 'Maintenance Alert Workflow',
        owner: 'Khunti District Administration',
        status: 'IN_REVIEW',
        date: 'May 22, 2026',
      },
      {
        id: 'del-4',
        title: 'Pilot Evaluation Report',
        owner: 'Research Team',
        status: 'UPCOMING',
        date: 'June 30, 2026',
      },
    ],
    fieldImplementation: {
      district: 'Khunti',
      block: 'Murhu Block',
      targetPoints: 20,
      installedPoints: 14,
      progressPercentage: 68,
      communityPartners: 3,
      telemetryNotes:
        'Sensors mounted on discharge head and pump handle. Battery charged via 5W solar panel. Real-time packet hop to BDO office LoRa gateway.',
    },
    documents: [
      {
        id: 'doc-1',
        title: 'Research Proposal & Feasibility Study',
        type: 'PDF',
        date: 'January 2026',
        size: '3.4 MB',
      },
      {
        id: 'doc-2',
        title: 'System Architecture & Telemetry Specs',
        type: 'Technical Document',
        date: 'February 2026',
        size: '5.8 MB',
      },
      {
        id: 'doc-3',
        title: 'Field Deployment Protocol & Jal Samiti SOP',
        type: 'PDF',
        date: 'April 2026',
        size: '2.1 MB',
      },
      {
        id: 'doc-4',
        title: 'Pilot Sensor Vibration & Failure Dataset',
        type: 'Dataset',
        date: 'Updated Yesterday',
        size: '18.2 MB',
      },
    ],
    impact: {
      currentOutputs: [
        { label: 'Water Points Equipped', value: 14, desc: 'Operational sensor telemetry nodes installed' },
        { label: 'Prototype Iterations', value: 2, desc: 'Hardware circuit and machined casing designs' },
        { label: 'Partner Organizations', value: 4, desc: 'Academic, district, and MSME institutions' },
        { label: 'Active Contributors', value: 8, desc: 'Engineers, coordinators, and field staff' },
      ],
      targetOutcomes: [
        { label: 'Reduction in Pump Downtime', value: '75%', desc: 'From 12 days to under 48 hours response' },
        { label: 'Residents with Improved Reliability', value: '2,000+', desc: 'Direct access to uninterrupted drinking water' },
        { label: 'Potential Deployment Points', value: '75', desc: 'Full Murhu Block public handpump coverage' },
      ],
      evidenceStatus: {
        baselineData: 'COLLECTED',
        pilotData: 'IN_PROGRESS',
        impactValidation: 'PENDING',
      },
    },
    activity: [
      {
        id: 'pact-1',
        timestamp: 'TODAY',
        title: '3 Sensor Modules Installed',
        description: 'Installed at Buruhatu and Siyankel village water points with local Jal Sahiya.',
      },
      {
        id: 'pact-2',
        timestamp: 'YESTERDAY',
        title: 'Reliability Observations Submitted',
        description: 'Field testing team submitted initial telemetry reliability observations from 11 nodes.',
      },
      {
        id: 'pact-3',
        timestamp: '3 DAYS AGO',
        title: 'Manufacturing Opportunity Published',
        description: 'Published vacancy for local PCB and casing fabrication partner for scale-up.',
      },
      {
        id: 'pact-4',
        timestamp: '1 WEEK AGO',
        title: 'Prototype v2 Approved',
        description: 'Hardware v2 approved by technical committee for all remaining pilot locations.',
      },
      {
        id: 'pact-5',
        timestamp: '2 WEEKS AGO',
        title: 'Community Validation Workshop',
        description: 'Conducted interactive workshop with 18 Jal Samiti members at Murhu Block headquarters.',
      },
    ],
  },
};

// Fallback generator for other seeded projects
function generateFallbackProjectDetail(base: Project): ProjectDetail {
  return {
    ...base,
    description: base.summary,
    challenge: {
      id: base.relatedChallengeId,
      title: base.relatedChallengeTitle,
      location: base.location,
    },
    idea: base.relatedIdeaId
      ? {
          id: base.relatedIdeaId,
          title: `Prototype Idea for ${base.domain}`,
        }
      : undefined,
    mission: {
      problem: `Communities in ${base.location} face significant difficulties requiring institutional and technological intervention.`,
      approach: `Deploy engineered solutions developed by ${base.leadInstitution} and validated through district-level field testing.`,
      expectedOutcome: `Achieve measurable reduction in operational latency and deliver sustained public impact.`,
    },
    successCriteria: [
      {
        label: 'Operational Efficacy',
        baseline: 'Manual process baseline',
        target: 'Automated & verified performance',
      },
      {
        label: 'Community Adoption',
        baseline: 'Initial pilot cohort',
        target: `${base.impactMetric} beneficiary coverage`,
      },
    ],
    team: [
      {
        id: 'tm-gen-1',
        name: 'Dr. Ramesh Soren',
        role: 'Principal Investigator',
        title: `Faculty Lead, ${base.leadInstitution}`,
        specialty: `${base.domain} Technology Architecture`,
        institution: base.leadInstitution,
        avatarInitials: 'RS',
      },
      {
        id: 'tm-gen-2',
        name: 'Aditi Mukhopadhyay',
        role: 'Research Associate',
        title: 'Field Validation Lead',
        specialty: 'System Verification & Community Trials',
        institution: base.leadInstitution,
        avatarInitials: 'AM',
      },
    ],
    milestones: [
      {
        id: 'ms-gen-1',
        phase: 'PHASE 01',
        period: 'Q1 2026',
        title: 'Problem Formulation & Needs Assessment',
        description: `Verified real-world ground conditions in ${base.location}.`,
        deliverables: ['Baseline Needs Dossier', 'Technical Architecture Specs'],
        owner: base.leadInstitution,
        status: 'COMPLETED',
      },
      {
        id: 'ms-gen-2',
        phase: 'PHASE 02',
        period: 'Q2 2026',
        title: 'Solution Prototyping & Lab Bench Testing',
        description: 'Engineering the core software and hardware mechanics.',
        deliverables: ['Working Prototype v1.0', 'Safety & Performance Audit'],
        owner: base.leadInstitution,
        status: base.stage === 'DESIGN' ? 'IN_PROGRESS' : 'COMPLETED',
      },
      {
        id: 'ms-gen-3',
        phase: 'PHASE 03',
        period: 'Q3 2026',
        title: 'Field Pilot & District Implementation',
        description: `Deploying initial units across ${base.location}.`,
        deliverables: ['Field Installation', 'Operational Telemetry Sync'],
        owner: 'Joint Consortium',
        status: base.stage === 'FIELD_PILOT' ? 'IN_PROGRESS' : base.stage === 'IMPACT_VERIFICATION' || base.stage === 'SCALING' ? 'COMPLETED' : 'UPCOMING',
      },
    ],
    workstreams: [
      {
        id: 'ws-gen-1',
        title: 'TECHNICAL CORE',
        description: `Refining algorithmic and hardware capabilities for ${base.domain}.`,
        progress: `${base.progressPercentage}% Complete`,
        status: 'In Development',
        metric: 'Sprint 6',
      },
      {
        id: 'ws-gen-2',
        title: 'DISTRICT COORDINATION',
        description: `Liaising with ${base.district} district authorities for pilot site onboarding.`,
        progress: 'Active Dialogue',
        status: 'Coordinating',
        metric: '3 Sites Evaluated',
      },
    ],
    deliverables: [
      {
        id: 'del-gen-1',
        title: 'Core Architecture Dossier',
        owner: base.leadInstitution,
        status: 'COMPLETED',
        date: 'Earlier this year',
      },
      {
        id: 'del-gen-2',
        title: 'Field Implementation SOP',
        owner: 'Joint Consortium',
        status: 'IN_REVIEW',
        date: 'Recent',
      },
    ],
    fieldImplementation: {
      district: base.district,
      block: base.location,
      targetPoints: 15,
      installedPoints: 8,
      progressPercentage: base.progressPercentage,
      communityPartners: 2,
      telemetryNotes: `Active implementation site in ${base.location}. Direct coordination with district administrative teams.`,
    },
    documents: [
      {
        id: 'doc-gen-1',
        title: 'Project Inception & Architecture Proposal',
        type: 'PDF',
        date: base.startedAt,
        size: '2.8 MB',
      },
      {
        id: 'doc-gen-2',
        title: 'Field Site Evaluation Dataset',
        type: 'Dataset',
        date: 'Recent',
        size: '6.4 MB',
      },
    ],
    impact: {
      currentOutputs: [
        { label: 'Installed Deployments', value: 8, desc: 'Active test units in field' },
        { label: 'Partner Institutions', value: base.partners.length, desc: 'Consortium stakeholders' },
        { label: 'Active Team Members', value: 6, desc: 'Researchers and domain specialists' },
      ],
      targetOutcomes: [
        { label: 'Potential Beneficiaries', value: base.impactMetric, desc: `Target population in ${base.district}` },
        { label: 'Scale Target', value: '100% Coverage', desc: `Full block coverage across ${base.district}` },
      ],
      evidenceStatus: {
        baselineData: 'COLLECTED',
        pilotData: base.stage === 'FIELD_PILOT' ? 'IN_PROGRESS' : 'PENDING',
        impactValidation: base.stage === 'IMPACT_VERIFICATION' || base.stage === 'SCALING' ? 'IN_PROGRESS' : 'PENDING',
      },
    },
    activity: [
      {
        id: 'act-gen-1',
        timestamp: 'THIS WEEK',
        title: 'Milestone Progress Review',
        description: `Project team reviewed implementation velocity for ${base.stageLabel}.`,
      },
      {
        id: 'act-gen-2',
        timestamp: 'LAST WEEK',
        title: 'District Coordination Meeting',
        description: `Review meeting with ${base.district} district representatives completed.`,
      },
    ],
  };
}

export async function getProjects(filters?: Partial<ProjectFiltersState>): Promise<Project[]> {
  await new Promise((r) => setTimeout(r, 60));
  let result = [...SEED_PROJECTS];

  if (!filters) return result;

  if (filters.search?.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.partners.some((part) => part.name.toLowerCase().includes(q))
    );
  }

  if (filters.stage && filters.stage !== 'ALL PROJECTS') {
    const normalized = filters.stage.toUpperCase().replace(/\s+/g, '_');
    result = result.filter((p) => p.stage === normalized);
  }

  if (filters.domain && filters.domain !== 'All Domains') {
    result = result.filter((p) => p.domain === filters.domain);
  }

  if (filters.district && filters.district !== 'All Districts') {
    result = result.filter((p) => p.district === filters.district);
  }

  if (filters.institution && filters.institution !== 'All Institutions') {
    result = result.filter((p) =>
      p.partners.some((part) => part.name === filters.institution || part.type === 'UNIVERSITY')
    );
  }

  if (filters.opportunity && filters.opportunity !== 'All Opportunities') {
    result = result.filter((p) =>
      p.collaborationNeeds?.some((n) => n.status === 'OPEN')
    );
  }

  return result;
}

export async function getFeaturedProject(): Promise<Project> {
  await new Promise((r) => setTimeout(r, 40));
  return SEED_PROJECTS.find((p) => p.featured) || SEED_PROJECTS[0];
}

export async function getProjectById(id: string): Promise<Project | null> {
  await new Promise((r) => setTimeout(r, 40));
  return SEED_PROJECTS.find((p) => p.id === id || p.projectCode === id) || null;
}

export async function getProjectDetail(id: string): Promise<ProjectDetail | null> {
  await new Promise((r) => setTimeout(r, 60));
  if (DETAILED_PROJECTS[id]) {
    return DETAILED_PROJECTS[id];
  }
  const base = SEED_PROJECTS.find((p) => p.id === id || p.projectCode === id);
  if (base) {
    return generateFallbackProjectDetail(base);
  }
  return null;
}

export async function expressInterest(
  _projectId: string,
  _data: ExpressInterestFormData
): Promise<boolean> {
  await new Promise((r) => setTimeout(r, 200));
  return true;
}

export async function getCollaborationOpportunities(): Promise<Array<{ project: Project; need: string }>> {
  await new Promise((r) => setTimeout(r, 40));
  return SEED_PROJECTS.filter((p) => p.collaborationNeeds && p.collaborationNeeds.length > 0).map(
    (p) => ({
      project: p,
      need: p.collaborationNeeds![0].type,
    })
  );
}

export async function getPortfolioStats(): Promise<PortfolioStats> {
  await new Promise((r) => setTimeout(r, 40));
  return PORTFOLIO_STATS;
}

export async function getPortfolioActivity(): Promise<PortfolioActivityItem[]> {
  await new Promise((r) => setTimeout(r, 40));
  return PORTFOLIO_ACTIVITIES;
}
