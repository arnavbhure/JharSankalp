import {
  Project,
  PortfolioStats,
  PortfolioActivityItem,
  ProjectFiltersState,
} from '../types/projects';

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
