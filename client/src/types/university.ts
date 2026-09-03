export interface UniversityProfile {
  name: string;
  tagline: string;
  category: string;
  location: string;
  activeResearchers: number;
  studentTeams: number;
  activeProjects: number;
}

export interface UniversityOverviewMetrics {
  relevantChallenges: number;
  activeResearchTeams: number;
  projectsInProgress: number;
  facultyMentors: number;
  industryCollaborations: number;
}

export interface RecommendedChallenge {
  id: string;
  challengeCode: string;
  title: string;
  domain: string;
  matchScore: number;
  relevantExpertise: string[];
  location: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
}

export interface UniversityActiveProject {
  id: string;
  projectCode: string;
  title: string;
  domain: string;
  stage: string;
  stageLabel: string;
  milestonesCompleted: number;
  milestonesTotal: number;
  studentFellows: number;
  facultyLead: string;
  department: string;
}

export interface ResearchCapability {
  id: string;
  name: string;
  strength: 'HIGH' | 'MEDIUM' | 'EMERGING';
  projectsLinked: number;
  facultyCount: number;
  description: string;
}

export interface UniversityTeam {
  id: string;
  name: string;
  lead: string;
  leadRole: string;
  department: string;
  studentsCount: number;
  activeProject: string;
}

export interface UniversityActivity {
  id: string;
  timestamp: string;
  message: string;
  category: 'MATCH' | 'MILESTONE' | 'TALENT' | 'INDUSTRY';
}

export interface UniversityDashboardData {
  profile: UniversityProfile;
  metrics: UniversityOverviewMetrics;
  recommendedChallenges: RecommendedChallenge[];
  activeProjects: UniversityActiveProject[];
  capabilities: ResearchCapability[];
  teams: UniversityTeam[];
  activities: UniversityActivity[];
}
