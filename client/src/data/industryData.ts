import {
  IndustryProfile,
  IndustryOpportunityMetrics,
  RecommendedOpportunity,
  ActiveCommitment,
  IndustryCapability,
  CollaborationPipelineStage,
  IndustryActivity,
  IndustryDashboardData,
} from '../types/industry';

export const INDUSTRY_PROFILE: IndustryProfile = {
  name: 'Innovation Partner Network',
  tagline: 'Partner Workspace',
  description:
    'Discover projects where your technology, expertise and resources can create real-world impact across Jharkhand.',
  activeCommitments: 3,
  collaborationOpportunities: 5,
  projectsSupported: 2,
};

export const INDUSTRY_METRICS: IndustryOpportunityMetrics = {
  seekingTechnicalSupport: 8,
  prototypeOpportunities: 4,
  fieldPilotsSeekingPartners: 3,
  highPriorityRequests: 5,
};

export const RECOMMENDED_OPPORTUNITIES: RecommendedOpportunity[] = [
  {
    id: 'opp-1',
    projectId: 'PRJ-2026-0012',
    projectCode: 'PRJ-2026-0012',
    title: 'Smart Rural Water Reliability Network',
    domain: 'Water Management',
    need: 'IoT Hardware Prototyping & Enclosure Fabrication',
    requiredCapability: 'Weather-Proof PCB Assembly & Battery Life Optimization',
    stage: 'FIELD_PILOT',
    stageLabel: 'FIELD PILOT',
    location: 'Murhu Block, Khunti',
    urgency: 'HIGH',
  },
  {
    id: 'opp-2',
    projectId: 'PRJ-2026-0007',
    projectCode: 'PRJ-2026-0007',
    title: 'Portable Electrochemical Soil Chemistry Probes',
    domain: 'Agriculture',
    need: 'Sensor Manufacturing & Electrode Calibration Partner',
    requiredCapability: 'Precision Electrode Milling & Bulk Calibration',
    stage: 'PROTOTYPE',
    stageLabel: 'PROTOTYPE',
    location: 'Gumla Tribal Agro-Belt',
    urgency: 'URGENT',
  },
  {
    id: 'opp-3',
    projectId: 'PRJ-2026-0009',
    projectCode: 'PRJ-2026-0009',
    title: 'Predictive Mine Subsidence Early Warning System',
    domain: 'Mining Safety',
    need: 'Geospatial Technology & Downhole Instrumentation Partner',
    requiredCapability: 'Underground Borehole Sensor Mesh & Ruggedized Telemetry',
    stage: 'RESEARCH_DESIGN',
    stageLabel: 'RESEARCH & DESIGN',
    location: 'Jharia Coalfield, Dhanbad',
    urgency: 'URGENT',
  },
  {
    id: 'opp-4',
    projectId: 'PRJ-2026-0014',
    projectCode: 'PRJ-2026-0014',
    title: 'Mobile Solar-Powered Cold Storage Micro-Hubs',
    domain: 'Agriculture / Livelihoods',
    need: 'Thermal Phase-Change Material & Solar Battery MSME',
    requiredCapability: 'Thermal Enclosures & DC Inverter Balancing',
    stage: 'FIELD_PILOT',
    stageLabel: 'FIELD PILOT',
    location: 'Latehar Horticultural Zone',
    urgency: 'NORMAL',
  },
];

export const ACTIVE_COMMITMENTS: ActiveCommitment[] = [
  {
    id: 'comm-1',
    projectId: 'PRJ-2026-0012',
    projectCode: 'PRJ-2026-0012',
    projectTitle: 'Smart Rural Water Reliability Network',
    domain: 'Water Management',
    contribution: 'Prototype Hardware Support & IP68 Ingress Enclosures',
    partnerRole: 'Co-Development Partner',
    status: 'ACTIVE',
    leadInstitution: 'BIT Mesra',
  },
  {
    id: 'comm-2',
    projectId: 'PRJ-2026-0007',
    projectCode: 'PRJ-2026-0007',
    projectTitle: 'Portable Electrochemical Soil Chemistry Probes',
    domain: 'Agriculture',
    contribution: 'Technical Mentorship & Sensor Manufacturing Tooling',
    partnerRole: 'Manufacturing Mentor',
    status: 'ACTIVE',
    leadInstitution: 'Birsa Agricultural University',
  },
  {
    id: 'comm-3',
    projectId: 'PRJ-2025-0031',
    projectCode: 'PRJ-2025-0031',
    projectTitle: 'Santhali & Ho Vernacular Speech Engine',
    domain: 'Education & Accessibility',
    contribution: 'GPU Cloud Compute Allocation & Audio Corpus Storage',
    partnerRole: 'Infrastructure Sponsor',
    status: 'IN_DELIVERY',
    leadInstitution: 'Kolhan University',
  },
];

export const INDUSTRY_CAPABILITIES: IndustryCapability[] = [
  {
    id: 'icap-1',
    title: 'IoT Hardware Prototyping',
    category: 'Hardware & Embedded',
    description:
      'Rapid turnaround PCB fabrication, sensor collar CNC machining, and ruggedized IP68 packaging.',
    offeredResources: ['3D Printing', 'PCB SMT Line', 'RF Spectrum Analyzer'],
  },
  {
    id: 'icap-2',
    title: 'Precision Sensor Manufacturing',
    category: 'Advanced Manufacturing',
    description:
      'Electrochemical sensor tooling, microfluidic channels, and industrial testing calibration benches.',
    offeredResources: ['Electrode Milling', 'Cleanroom Calibration', 'Automated QA'],
  },
  {
    id: 'icap-3',
    title: 'Field Deployment & Logistics',
    category: 'Operations',
    description:
      'Rural block delivery vehicles, solar panel mounting hardware, and field engineer dispatch network.',
    offeredResources: ['Logistics Fleet', 'Spares Inventory', 'Field Technicians'],
  },
  {
    id: 'icap-4',
    title: 'Cloud Infrastructure & Edge AI',
    category: 'Software & Compute',
    description:
      'GPU compute clusters, telemetry ingestion pipelines, and managed time-series databases.',
    offeredResources: ['NVIDIA GPU Nodes', 'Kubernetes Clusters', 'GIS Tile Servers'],
  },
  {
    id: 'icap-5',
    title: 'CSR Seed Funding & Co-Sponsorship',
    category: 'Capital & Grants',
    description: 'Phase 1 pilot seed capital and community hardware deployment subsidy grants.',
    offeredResources: ['Seed Grants', 'Philanthropic Match', 'Equipment Loans'],
  },
  {
    id: 'icap-6',
    title: 'Technical Mentorship & Code Review',
    category: 'Advisory',
    description:
      'Industrial engineering design reviews, patent filing support, and ISO certification guidance.',
    offeredResources: ['Senior Engineers', 'IP Counsel', 'Regulatory Experts'],
  },
];

export const COLLABORATION_PIPELINE: CollaborationPipelineStage[] = [
  {
    stage: 'IDENTIFIED',
    label: 'Opportunity Identified',
    count: 8,
    description: 'Projects with active technical RFPs matching your capability tags',
  },
  {
    stage: 'INTEREST',
    label: 'Interest Expressed',
    count: 5,
    description: 'Proposals reviewed by university principal investigators',
    highlight: true,
  },
  {
    stage: 'DISCUSSION',
    label: 'Scope Discussion',
    count: 3,
    description: 'Active technical specification calls and resource scoping',
  },
  {
    stage: 'COMMITMENT',
    label: 'Formal Commitment',
    count: 3,
    description: 'Executed contribution agreements and hardware deliverables',
    highlight: true,
  },
  {
    stage: 'ACTIVE',
    label: 'Active Collaboration',
    count: 2,
    description: 'Joint field pilot testing currently operational on the ground',
    highlight: true,
  },
];

export const INDUSTRY_ACTIVITIES: IndustryActivity[] = [
  {
    id: 'iact-1',
    timestamp: '25 MINS AGO',
    message: 'A Water Management project (PRJ-2026-0012) requested IoT hardware support in Khunti.',
    domain: 'Water Management',
  },
  {
    id: 'iact-2',
    timestamp: 'YESTERDAY',
    message: 'New Field Pilot opportunity available: Portable Soil Intelligence System in Gumla.',
    domain: 'Agriculture',
  },
  {
    id: 'iact-3',
    timestamp: '2 DAYS AGO',
    message: 'Your technical feedback on enclosure sealing was acknowledged by the BIT Mesra team.',
    domain: 'Civic Tech',
  },
  {
    id: 'iact-4',
    timestamp: '4 DAYS AGO',
    message:
      'A new Agriculture project matches your "Precision Sensor Manufacturing" capability profile.',
    domain: 'Agriculture',
  },
];

export const INDUSTRY_DASHBOARD_DATA: IndustryDashboardData = {
  profile: INDUSTRY_PROFILE,
  metrics: INDUSTRY_METRICS,
  opportunities: RECOMMENDED_OPPORTUNITIES,
  commitments: ACTIVE_COMMITMENTS,
  capabilities: INDUSTRY_CAPABILITIES,
  pipeline: COLLABORATION_PIPELINE,
  activities: INDUSTRY_ACTIVITIES,
};
