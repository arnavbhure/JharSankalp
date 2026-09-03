/**
 * Centralized Ecosystem Source of Truth for JharSankalp
 *
 * Defines standardized domains, lifecycle stages, and the core
 * relationship graph: Challenge -> Idea -> Project -> Impact.
 */

export const ECOSYSTEM_DOMAINS = [
  'Water Management',
  'Agriculture',
  'Mining Safety',
  'Education',
  'Healthcare',
  'Environment',
  'Accessibility',
  'Rural Livelihood',
] as const;

export type EcosystemDomain = (typeof ECOSYSTEM_DOMAINS)[number];

export const PROJECT_STAGES = [
  'FORMATION',
  'RESEARCH_DESIGN',
  'PROTOTYPE',
  'FIELD_PILOT',
  'IMPLEMENTATION',
  'IMPACT_VERIFICATION',
] as const;

export type ProjectStage = (typeof PROJECT_STAGES)[number];

export interface UnifiedChallenge {
  id: string;
  challengeCode: string;
  title: string;
  domain: string;
  district: string;
  block: string;
  summary: string;
  status: 'OPEN FOR COLLABORATION' | 'UNDER EVALUATION' | 'ACTIVE PILOT';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  dateReported: string;
  relatedIdeaIds: string[];
  relatedProjectIds: string[];
  affectedResidents: string;
  leadInstitution?: string;
}

import { IdeaStage } from '../types/ideas';

export interface UnifiedIdea {
  id: string;
  referenceId: string;
  title: string;
  domain: string;
  district: string;
  block: string;
  challengeId: string;
  challengeTitle: string;
  projectId?: string;
  projectTitle?: string;
  stage: IdeaStage;
  stageLabel: string;
  summary: string;
  authorOrTeam: string;
  likesCount: number;
}

export interface UnifiedProject {
  id: string;
  projectCode: string;
  title: string;
  domain: string;
  district: string;
  block: string;
  stage: ProjectStage;
  stageLabel: string;
  leadInstitution: string;
  challengeId: string;
  challengeTitle: string;
  ideaId?: string;
  ideaTitle?: string;
  milestonesCompleted: number;
  milestonesTotal: number;
  health: 'ON_TRACK' | 'NEEDS_ATTENTION' | 'DELAYED';
  beneficiariesCount: string;
  summary: string;
}

// ── 1. Canonical Challenges ──────────────────────────────────────
export const CANONICAL_CHALLENGES: UnifiedChallenge[] = [
  {
    id: 'JS-2026-00024',
    challengeCode: 'JS-2026-00024',
    title: 'Intermittent Handpump Breakdowns & Delayed Rural Water Restorations in Khunti',
    domain: 'Water Management',
    district: 'Khunti',
    block: 'Murhu Block',
    summary:
      'Over 18 rural hamlets face recurring drinking water disruptions due to sub-surface mechanical valve fatigue in India Mark II handpumps.',
    status: 'ACTIVE PILOT',
    priority: 'HIGH',
    dateReported: '10 March 2026',
    relatedIdeaIds: ['IDEA-2026-0001'],
    relatedProjectIds: ['PRJ-2026-0012'],
    affectedResidents: '2,000+ Residents',
    leadInstitution: 'BIT Mesra',
  },
  {
    id: 'JS-2024-00003',
    challengeCode: 'JS-2024-00003',
    title: 'Building an Early Warning System for Mine Subsidence Risks in Dhanbad',
    domain: 'Mining Safety',
    district: 'Dhanbad',
    block: 'Jharia Sector 4',
    summary:
      'Subterranean coal seam fires and abandoned legacy voids threaten 15,000+ residents with sudden strata collapse without prior visual warning.',
    status: 'ACTIVE PILOT',
    priority: 'CRITICAL',
    dateReported: '12 March 2026',
    relatedIdeaIds: ['IDEA-2026-0003'],
    relatedProjectIds: ['PRJ-2026-0009'],
    affectedResidents: '15,000+ Residents',
    leadInstitution: 'BIT Sindri & IIT ISM',
  },
  {
    id: 'JS-2026-00005',
    challengeCode: 'JS-2026-00005',
    title: 'Declining Soil Acidity Diagnostics & Crop Yield Deficits in Gumla',
    domain: 'Agriculture',
    district: 'Gumla',
    block: 'Raidih Block',
    summary:
      'High aluminum toxicity and rapid soil acidification across 12 tribal villages cause 40% losses in pulse and millet yields.',
    status: 'ACTIVE PILOT',
    priority: 'HIGH',
    dateReported: '24 February 2026',
    relatedIdeaIds: ['IDEA-2026-0002'],
    relatedProjectIds: ['PRJ-2026-0007'],
    affectedResidents: '4,500+ Farmers',
    leadInstitution: 'Birsa Agricultural University',
  },
  {
    id: 'JS-2026-00015',
    challengeCode: 'JS-2026-00015',
    title: 'Vernacular Language Barrier in Tribal Primary STEM Education',
    domain: 'Education',
    district: 'West Singhbhum',
    block: 'Chaibasa Block',
    summary:
      'Primary students whose mother tongue is Ho or Santhali experience learning stagnation due to state-mandated Hindi/English textbooks.',
    status: 'ACTIVE PILOT',
    priority: 'HIGH',
    dateReported: '15 January 2026',
    relatedIdeaIds: ['IDEA-2026-0006'],
    relatedProjectIds: ['PRJ-2025-0031'],
    affectedResidents: '1,800+ Students',
    leadInstitution: 'Kolhan University',
  },
  {
    id: 'JS-2026-00014',
    challengeCode: 'JS-2026-00014',
    title: 'Post-Harvest Perishable Vegetable Spoilage & Cold-Storage Deficit',
    domain: 'Agriculture / Livelihoods',
    district: 'Latehar',
    block: 'Garu Block',
    summary:
      'Smallholder tomato and ginger farmers lose up to 35% of harvested volume during transit to urban markets due to zero cold chain infrastructure.',
    status: 'OPEN FOR COLLABORATION',
    priority: 'HIGH',
    dateReported: '18 February 2026',
    relatedIdeaIds: [],
    relatedProjectIds: ['PRJ-2026-0014'],
    affectedResidents: '3,200+ Farmers',
    leadInstitution: 'Central University of Jharkhand',
  },
  {
    id: 'JS-2025-00026',
    challengeCode: 'JS-2025-00026',
    title: 'Heavy Metal Leaching and Topsoil Erosion in Abandoned Copper Tailings',
    domain: 'Environment',
    district: 'East Singhbhum',
    block: 'Musabani Block',
    summary:
      'Industrial mine tailings generate acidic runoff contaminating regional stream networks and inhibiting natural vegetative ground recovery.',
    status: 'ACTIVE PILOT',
    priority: 'MEDIUM',
    dateReported: '05 November 2025',
    relatedIdeaIds: [],
    relatedProjectIds: ['PRJ-2025-0026'],
    affectedResidents: '8,000+ Residents',
    leadInstitution: 'NIT Jamshedpur',
  },
];

// ── 2. Canonical Ideas ───────────────────────────────────────────
export const CANONICAL_IDEAS: UnifiedIdea[] = [
  {
    id: 'IDEA-2026-0001',
    referenceId: 'IDEA-2026-0042',
    title: 'Low-Cost IoT Monitoring for Rural Water Pumps',
    domain: 'Water Management',
    district: 'Khunti',
    block: 'Murhu Block',
    challengeId: 'JS-2026-00024',
    challengeTitle: 'Intermittent Handpump Breakdowns & Delayed Rural Water Restorations in Khunti',
    projectId: 'PRJ-2026-0012',
    projectTitle: 'Smart Rural Water Reliability Network',
    stage: 'PROTOTYPE',
    stageLabel: 'PROTOTYPE DEVELOPMENT',
    summary:
      'A clamped acoustic vibration collar tracking pump stroke rhythm and transmitting failure alerts over LoRaWAN before complete seizure occurs.',
    authorOrTeam: 'BIT Mesra Telemetry Cell',
    likesCount: 128,
  },
  {
    id: 'IDEA-2026-0002',
    referenceId: 'IDEA-2026-0038',
    title: 'Portable Electrochemical Field Probes for Soil Acidity Mapping',
    domain: 'Agriculture',
    district: 'Gumla',
    block: 'Raidih Block',
    challengeId: 'JS-2026-00005',
    challengeTitle: 'Declining Soil Acidity Diagnostics & Crop Yield Deficits in Gumla',
    projectId: 'PRJ-2026-0007',
    projectTitle: 'Portable Electrochemical Soil Chemistry Probes',
    stage: 'PROTOTYPE',
    stageLabel: 'PROTOTYPE DEVELOPMENT',
    summary:
      'Handheld diagnostic device delivering on-the-spot pH and NPK readings to village Kisan Mitras via Bluetooth vernacular app.',
    authorOrTeam: 'Birsa Agricultural University AgriTech Hub',
    likesCount: 94,
  },
  {
    id: 'IDEA-2026-0003',
    referenceId: 'IDEA-2026-0029',
    title: 'Subterranean Borehole Micro-Seismic Array for Void Detection',
    domain: 'Mining Safety',
    district: 'Dhanbad',
    block: 'Jharia Sector 4',
    challengeId: 'JS-2024-00003',
    challengeTitle: 'Building an Early Warning System for Mine Subsidence Risks in Dhanbad',
    projectId: 'PRJ-2026-0009',
    projectTitle: 'Predictive Mine Subsidence Early Warning System',
    stage: 'PROTOTYPE',
    stageLabel: 'LABORATORY BENCH TESTING',
    summary:
      'Distributed borehole geophones and satellite InSAR correlation generating 48-hour advance ground subsidence warnings.',
    authorOrTeam: 'BIT Sindri & IIT ISM Strata Cell',
    likesCount: 112,
  },
  {
    id: 'IDEA-2026-0006',
    referenceId: 'IDEA-2026-0017',
    title: 'Santhali & Ho Speech Corpus Synthesis Engine',
    domain: 'Education',
    district: 'West Singhbhum',
    block: 'Chaibasa Block',
    challengeId: 'JS-2026-00015',
    challengeTitle: 'Vernacular Language Barrier in Tribal Primary STEM Education',
    projectId: 'PRJ-2025-0031',
    projectTitle: 'Santhali & Ho Vernacular Speech-to-Text Engine',
    stage: 'PILOT',
    stageLabel: 'FIELD TESTING',
    summary:
      'AI speech-to-text models trained on Ol Chiki and Warang Chiti phonetics to narrate primary math and science concepts in children mother tongue.',
    authorOrTeam: 'Kolhan University Linguistics Lab',
    likesCount: 76,
  },
];

// ── 3. Canonical Projects ─────────────────────────────────────────
export const CANONICAL_PROJECTS: UnifiedProject[] = [
  {
    id: 'PRJ-2026-0012',
    projectCode: 'PRJ-2026-0012',
    title: 'Smart Rural Water Reliability Network',
    domain: 'Water Management',
    district: 'Khunti',
    block: 'Murhu Block',
    stage: 'FIELD_PILOT',
    stageLabel: 'FIELD PILOT',
    leadInstitution: 'BIT Mesra',
    challengeId: 'JS-2026-00024',
    challengeTitle: 'Intermittent Handpump Breakdowns & Delayed Rural Water Restorations in Khunti',
    ideaId: 'IDEA-2026-0001',
    ideaTitle: 'Low-Cost IoT Monitoring for Rural Water Pumps',
    milestonesCompleted: 4,
    milestonesTotal: 6,
    health: 'ON_TRACK',
    beneficiariesCount: '2,000+ Residents',
    summary:
      'Low-cost clamped vibration sensors and LoRaWAN telemetry installed on India Mark II handpumps to predict breakdown events.',
  },
  {
    id: 'PRJ-2026-0009',
    projectCode: 'PRJ-2026-0009',
    title: 'Predictive Mine Subsidence Early Warning System',
    domain: 'Mining Safety',
    district: 'Dhanbad',
    block: 'Jharia Sector 4',
    stage: 'PROTOTYPE',
    stageLabel: 'PROTOTYPE',
    leadInstitution: 'BIT Sindri',
    challengeId: 'JS-2024-00003',
    challengeTitle: 'Building an Early Warning System for Mine Subsidence Risks in Dhanbad',
    ideaId: 'IDEA-2026-0003',
    ideaTitle: 'Subterranean Borehole Micro-Seismic Array for Void Detection',
    milestonesCompleted: 3,
    milestonesTotal: 6,
    health: 'NEEDS_ATTENTION',
    beneficiariesCount: '15,000+ Residents',
    summary:
      'Downhole sensor mesh integrating acoustic emissions, borehole tiltmetry, and satellite InSAR telemetry to predict void collapse.',
  },
  {
    id: 'PRJ-2026-0007',
    projectCode: 'PRJ-2026-0007',
    title: 'Portable Electrochemical Soil Chemistry Probes',
    domain: 'Agriculture',
    district: 'Gumla',
    block: 'Raidih Block',
    stage: 'FIELD_PILOT',
    stageLabel: 'FIELD PILOT',
    leadInstitution: 'Birsa Agricultural University',
    challengeId: 'JS-2026-00005',
    challengeTitle: 'Declining Soil Acidity Diagnostics & Crop Yield Deficits in Gumla',
    ideaId: 'IDEA-2026-0002',
    ideaTitle: 'Portable Electrochemical Field Probes for Soil Acidity Mapping',
    milestonesCompleted: 4,
    milestonesTotal: 6,
    health: 'ON_TRACK',
    beneficiariesCount: '4,500+ Farmers',
    summary:
      'Handheld ion-selective sensor arrays for instantaneous soil pH, electrical conductivity, and primary nutrient diagnostics.',
  },
  {
    id: 'PRJ-2025-0031',
    projectCode: 'PRJ-2025-0031',
    title: 'Santhali & Ho Vernacular Speech-to-Text Engine',
    domain: 'Education',
    district: 'West Singhbhum',
    block: 'Chaibasa Block',
    stage: 'IMPLEMENTATION',
    stageLabel: 'IMPLEMENTATION',
    leadInstitution: 'Kolhan University',
    challengeId: 'JS-2026-00015',
    challengeTitle: 'Vernacular Language Barrier in Tribal Primary STEM Education',
    ideaId: 'IDEA-2026-0006',
    ideaTitle: 'Santhali & Ho Speech Corpus Synthesis Engine',
    milestonesCompleted: 5,
    milestonesTotal: 6,
    health: 'ON_TRACK',
    beneficiariesCount: '1,800+ Students',
    summary:
      'Acoustic voice models and interactive learning modules narrating science and numeracy concepts in Santhali and Ho.',
  },
  {
    id: 'PRJ-2026-0014',
    projectCode: 'PRJ-2026-0014',
    title: 'Mobile Solar-Powered Cold Storage Micro-Hubs',
    domain: 'Agriculture / Livelihoods',
    district: 'Latehar',
    block: 'Garu Block',
    stage: 'FIELD_PILOT',
    stageLabel: 'FIELD PILOT',
    leadInstitution: 'Central University of Jharkhand',
    challengeId: 'JS-2026-00014',
    challengeTitle: 'Post-Harvest Perishable Vegetable Spoilage & Cold-Storage Deficit',
    milestonesCompleted: 3,
    milestonesTotal: 6,
    health: 'DELAYED',
    beneficiariesCount: '3,200+ Farmers',
    summary:
      'Phase-change thermal battery units on mobile farm carts preserving perishable tomato and green vegetable harvests.',
  },
  {
    id: 'PRJ-2025-0026',
    projectCode: 'PRJ-2025-0026',
    title: 'Biochar Mine Spoil Topsoil Regeneration',
    domain: 'Environment',
    district: 'East Singhbhum',
    block: 'Musabani Block',
    stage: 'IMPACT_VERIFICATION',
    stageLabel: 'IMPACT VERIFICATION',
    leadInstitution: 'NIT Jamshedpur',
    challengeId: 'JS-2025-00026',
    challengeTitle: 'Heavy Metal Leaching and Topsoil Erosion in Abandoned Copper Tailings',
    milestonesCompleted: 6,
    milestonesTotal: 6,
    health: 'ON_TRACK',
    beneficiariesCount: '8,000+ Residents',
    summary:
      'Slow-pyrolysis biochar soil amendments immobilizing copper/arsenic runoff and restoring native grass vegetation.',
  },
];
