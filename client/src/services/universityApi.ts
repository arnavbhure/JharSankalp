import {
  UniversityDashboardData,
  RecommendedChallenge,
  UniversityActiveProject,
  ResearchCapability,
  UniversityProfile,
  UniversityOverviewMetrics,
  UniversityTeam,
  UniversityActivity,
} from '../types/university';
import { api } from './api';

export async function getDashboard(): Promise<UniversityDashboardData> {
  let backendData: any = null;
  try {
    backendData = await api.get<any>('/dashboard/university');
  } catch (err) {
    console.warn('Backend /dashboard/university call skipped or unauthorized:', err);
  }

  // Also fetch challenges and projects from live API
  let challenges: any[] = [];
  let projects: any[] = [];
  let activitiesList: any[] = [];

  try {
    const [cRes, pRes, actRes] = await Promise.all([
      api.get<any>('/challenges'),
      api.get<any>('/projects'),
      api.get<any>('/activities'),
    ]);
    challenges = Array.isArray(cRes) ? cRes : cRes?.data || [];
    projects = Array.isArray(pRes) ? pRes : pRes?.data || [];
    activitiesList = Array.isArray(actRes) ? actRes : actRes?.data || [];
  } catch (e) {
    console.warn('Failed to load auxiliary entities for university dashboard:', e);
  }

  const kpis = backendData?.kpis;
  const totalIdeas = kpis?.totalIdeasSubmitted ?? 14;
  const activeProjectsCount = kpis?.activeCollaborations ?? projects.length ?? 3;

  const profile: UniversityProfile = {
    name: 'Birla Institute of Technology (BIT) Mesra',
    tagline: 'Translational R&D Centre for Civic & Rural Engineering Solutions',
    category: 'Autonomous University · Tier-1 Technical Institute',
    location: 'Ranchi, Jharkhand',
    activeResearchers: 48,
    studentTeams: 12,
    activeProjects: activeProjectsCount,
  };

  const metrics: UniversityOverviewMetrics = {
    relevantChallenges: challenges.length || totalIdeas,
    activeResearchTeams: 8,
    projectsInProgress: activeProjectsCount,
    facultyMentors: 14,
    industryCollaborations: 4,
  };

  const recommendedChallenges: RecommendedChallenge[] = challenges.slice(0, 4).map((ch: any, i: number) => ({
    id: ch.id,
    challengeCode: ch.publicId || ch.challengeCode || `JS-${ch.id.slice(0, 6)}`,
    title: ch.title,
    domain: ch.domain || 'Engineering',
    matchScore: 92 - i * 4,
    relevantExpertise: ['IoT Sensors', 'Embedded Systems', 'Data Telemetry'],
    location: ch.district?.name || ch.district || 'Ranchi',
    priority: ch.priority === 'CRITICAL' ? 'CRITICAL' : 'HIGH',
  }));

  const activeProjects: UniversityActiveProject[] = projects.slice(0, 4).map((p: any) => {
    const totalM = p.milestones?.length || 4;
    const compM = p.milestones?.filter((m: any) => m.status === 'COMPLETED').length || 2;
    return {
      id: p.id,
      projectCode: p.referenceCode || `PRJ-${p.id.slice(0, 6).toUpperCase()}`,
      title: p.title,
      domain: p.domain || 'Rural Infrastructure',
      stage: p.stage || 'FIELD_PILOT',
      stageLabel: (p.stage || 'FIELD PILOT').replace(/_/g, ' '),
      milestonesCompleted: compM,
      milestonesTotal: totalM,
      studentFellows: 4,
      facultyLead: 'Dr. Ananya Singh',
      department: 'Department of Electronics & Communication Engineering',
    };
  });

  const capabilities: ResearchCapability[] = [
    {
      id: 'cap-1',
      name: 'Subsurface & Hydrogeological Sensor Networks',
      strength: 'HIGH',
      projectsLinked: 2,
      facultyCount: 6,
      description: 'Ultralow-power LoRa telemetry and acoustic piezo sensing for rural handpumps.',
    },
    {
      id: 'cap-2',
      name: 'Mining Subsidence Geomechanics & InSAR',
      strength: 'HIGH',
      projectsLinked: 2,
      facultyCount: 5,
      description: 'Micro-seismic geotechnical monitoring for Jharia coalfield stability oversight.',
    },
    {
      id: 'cap-3',
      name: 'Solar-Powered Cold Chain & Post-Harvest AgriTech',
      strength: 'MEDIUM',
      projectsLinked: 1,
      facultyCount: 4,
      description: 'Phase-change material thermal storage chambers for minor forest produce.',
    },
  ];

  const teams: UniversityTeam[] = [
    {
      id: 'team-1',
      name: 'Rural IoT Sensors & Telemetry Lab',
      lead: 'Prof. Alok Mukherjee',
      leadRole: 'Principal Investigator',
      department: 'Dept. of ECE, BIT Mesra',
      studentsCount: 6,
      activeProject: 'Smart Rural Water Infrastructure Monitoring',
    },
    {
      id: 'team-2',
      name: 'Geotechnical Safety & Remote Sensing Group',
      lead: 'Dr. S. Soren',
      leadRole: 'Lead Geophysicist',
      department: 'Dept. of Mining Engineering, IIT (ISM)',
      studentsCount: 4,
      activeProject: 'Mine Subsidence Early Warning System',
    },
  ];

  const activities: UniversityActivity[] = activitiesList.slice(0, 5).map((a: any) => ({
    id: a.id,
    timestamp: new Date(a.createdAt).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    }),
    message: a.message || 'Milestone achieved in civic research consortium',
    category: 'MILESTONE',
  }));

  return {
    profile,
    metrics,
    recommendedChallenges,
    activeProjects,
    capabilities,
    teams,
    activities,
  };
}

export async function getRecommendedChallenges(): Promise<RecommendedChallenge[]> {
  try {
    const list = await api.get<any>('/challenges');
    const raw = Array.isArray(list) ? list : list?.data || [];
    return raw.slice(0, 4).map((ch: any, i: number) => ({
      id: ch.id,
      challengeCode: ch.publicId || ch.challengeCode || `JS-${ch.id.slice(0, 6)}`,
      title: ch.title,
      domain: ch.domain || 'Engineering',
      matchScore: 94 - i * 3,
      relevantExpertise: ['Embedded Systems', 'IoT', 'Field Sensing'],
      location: ch.district?.name || ch.district || 'Ranchi',
      priority: ch.priority === 'CRITICAL' ? 'CRITICAL' : 'HIGH',
    }));
  } catch (e) {
    console.warn('Failed to load recommended challenges:', e);
    return [];
  }
}

export async function getProjects(): Promise<UniversityActiveProject[]> {
  try {
    const list = await api.get<any>('/projects');
    const raw = Array.isArray(list) ? list : list?.data || [];
    return raw.map((p: any) => {
      const totalM = p.milestones?.length || 4;
      const compM = p.milestones?.filter((m: any) => m.status === 'COMPLETED').length || 2;
      return {
        id: p.id,
        projectCode: p.referenceCode || `PRJ-${p.id.slice(0, 6).toUpperCase()}`,
        title: p.title,
        domain: p.domain || 'Rural Infrastructure',
        stage: p.stage || 'FIELD_PILOT',
        stageLabel: (p.stage || 'FIELD PILOT').replace(/_/g, ' '),
        milestonesCompleted: compM,
        milestonesTotal: totalM,
        studentFellows: 4,
        facultyLead: 'Dr. Ananya Singh',
        department: 'Dept. of ECE',
      };
    });
  } catch (e) {
    console.warn('Failed to load university projects:', e);
    return [];
  }
}

export async function getCapabilities(): Promise<ResearchCapability[]> {
  return [
    {
      id: 'cap-1',
      name: 'Subsurface & Hydrogeological Sensor Networks',
      strength: 'HIGH',
      projectsLinked: 2,
      facultyCount: 6,
      description: 'Ultralow-power LoRa telemetry and acoustic piezo sensing for rural handpumps.',
    },
    {
      id: 'cap-2',
      name: 'Mining Subsidence Geomechanics & InSAR',
      strength: 'HIGH',
      projectsLinked: 2,
      facultyCount: 5,
      description: 'Micro-seismic geotechnical monitoring for Jharia coalfield stability oversight.',
    },
  ];
}

export const universityApi = {
  getDashboard,
  getRecommendedChallenges,
  getProjects,
  getCapabilities,
};
