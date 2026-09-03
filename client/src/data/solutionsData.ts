import { SolutionItem, DeploymentStory } from '../types/solutions';

/**
 * Solutions are now loaded dynamically from the PostgreSQL database via GET /api/solutions.
 * Retained as empty exports for backwards typing compatibility.
 */
export const FEATURED_SOLUTION: SolutionItem = {
  id: '',
  name: '',
  tagline: '',
  description: '',
  focusArea: 'Water Management',
  district: 'Khunti',
  stage: 'Field Pilot',
  technologyType: '',
  technologyTags: [],
  progress: 0,
  impactSummary: '',
  impactMetrics: [],
  challengeId: '',
  challengeTitle: '',
  leadPartners: [],
  milestones: [],
  nextMilestone: '',
};

export const INITIAL_SOLUTIONS: SolutionItem[] = [];

export const DEPLOYMENT_STORIES: DeploymentStory[] = [
  {
    id: 'story-1',
    title: 'Murhu Community Water Resilience',
    district: 'Khunti',
    communitiesReached: '14 tribal villages across Murhu Block',
    currentStatus: 'Active field pilot across 50 India Mark II handpumps',
    metric: '45.8% drop in pump breakdown downtime',
    focusArea: 'Water Management',
    description:
      'Acoustic collars deployed on India Mark II pumps transmit hourly telemetry via LoRaWAN to local Jal Sahiyas, cutting downtime from 8 days to 3 days.',
  },
  {
    id: 'story-2',
    title: 'Forest Hamlet Maternal Diagnostics',
    district: 'West Singhbhum',
    communitiesReached: '24 isolated Saranda forest hamlets',
    currentStatus: 'Operational deployment with 44 certified ASHA kits',
    metric: '1,800+ screenings conducted door-to-door',
    focusArea: 'Healthcare',
    description:
      'Solar-charged backpack kits enable frontline workers to conduct non-invasive hemoglobin and vital checks directly in remote households.',
  },
  {
    id: 'story-3',
    title: 'Santhali Offline Digital Classroom Pods',
    district: 'Dumka',
    communitiesReached: '12 non-electrified primary schools',
    currentStatus: 'Sustained classroom adoption across 650 students',
    metric: '40% gain in foundational STEM literacy',
    focusArea: 'Education',
    description:
      'Solar micro-servers broadcast Ol Chiki and bilingual curriculum modules over local offline Wi-Fi meshes, bridging education in off-grid tribal villages.',
  },
];
