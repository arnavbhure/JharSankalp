import { CollaborationProject, ActivityItem } from '../types/collaborations';

/**
 * Collaboration projects are now loaded dynamically from the PostgreSQL database via GET /api/collaborations.
 * Retained as empty exports for backwards typing compatibility.
 */
export const FEATURED_COLLABORATION: CollaborationProject = {
  id: '',
  title: '',
  description: '',
  focusArea: 'Water Management',
  district: 'Khunti',
  stage: 'Pilot Stage',
  teamCount: 0,
  progress: 0,
  skillsNeeded: [],
  avatars: [],
};

export const INITIAL_COLLABORATION_PROJECTS: CollaborationProject[] = [];

export const COLLABORATION_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    actor: 'Prof. Anand Verma (BIT Mesra)',
    action: 'uploaded LoRaWAN telemetry calibration firmware v2.1 for Khunti handpump sensors',
    project: 'Community Water Intelligence Network',
    time: '2 hours ago',
    type: 'milestone',
  },
  {
    id: 'act-2',
    actor: 'Kavita Munda (Jal Sahiya)',
    action: 'verified acoustic sensor collar deployment on 5 community handpumps in Murhu',
    project: 'Community Water Intelligence Network',
    time: '5 hours ago',
    type: 'testing',
  },
  {
    id: 'act-3',
    actor: 'Dr. Sudhir Sahay (BAU)',
    action: 'published soil nutrient optical reflectance calibration dataset for Gumla testbeds',
    project: 'Smart Agriculture & Soil Diagnostics Initiative',
    time: 'Yesterday',
    type: 'document',
  },
  {
    id: 'act-4',
    actor: 'Sushila Soy (ASHA Lead)',
    action: 'completed field screening session with portable diagnostic kit in Saranda',
    project: 'Mobile Health Outreach Network',
    time: '2 days ago',
    type: 'milestone',
  },
];
