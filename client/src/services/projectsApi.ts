import {
  Project,
  ProjectActivityItem,
  PortfolioMetrics,
  PortfolioStats,
  ProjectFiltersState,
  ProjectStage,
} from '../types/projects';
import { ProjectDetail, ExpressInterestFormData } from '../types/projectDetail';
import {
  SEEDED_PROJECTS,
  PORTFOLIO_METRICS,
  PROJECT_ACTIVITIES,
} from '../data/projectsData';

export { SEEDED_PROJECTS };
export const SEED_PROJECTS: Project[] = SEEDED_PROJECTS;

export const PORTFOLIO_STATS: PortfolioStats = {
  activeProjects: PORTFOLIO_METRICS.activeProjects,
  universitiesInvolved: PORTFOLIO_METRICS.universitiesEngaged,
  partnerOrganizations: PORTFOLIO_METRICS.partnersCount,
  projectsInFieldPilot: 4,
  peopleImpacted: 32000,
  districtsWithPilots: PORTFOLIO_METRICS.districtsReached,
};

export async function getProjects(filters?: Partial<ProjectFiltersState>): Promise<Project[]> {
  await new Promise((resolve) => setTimeout(resolve, 80));

  let results = [...SEEDED_PROJECTS];

  if (!filters) return results;

  // Search filter
  if (filters.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.oneLineDescription.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        (p.block && p.block.toLowerCase().includes(q)) ||
        p.leadInstitution.toLowerCase().includes(q)
    );
  }

  // Domain filter
  if (filters.domain && filters.domain !== 'All Domains' && filters.domain !== 'All Focus Areas') {
    results = results.filter(
      (p) => p.domain.toLowerCase() === filters.domain!.toLowerCase()
    );
  }

  // District filter
  if (filters.district && filters.district !== 'All Districts') {
    results = results.filter(
      (p) => p.district.toLowerCase() === filters.district!.toLowerCase()
    );
  }

  // Stage filter
  if (filters.stage && filters.stage !== 'ALL' && filters.stage !== 'ALL PROJECTS') {
    results = results.filter((p) => p.stage === (filters.stage as ProjectStage));
  }

  // Institution filter
  if (filters.institution && filters.institution !== 'All Institutions') {
    results = results.filter(
      (p) =>
        p.leadInstitution.toLowerCase().includes(filters.institution!.toLowerCase()) ||
        p.partners.some((partner) =>
          partner.name.toLowerCase().includes(filters.institution!.toLowerCase())
        )
    );
  }

  return results;
}

export async function getFeaturedProject(): Promise<Project> {
  return SEEDED_PROJECTS.find((p) => p.featured) || SEEDED_PROJECTS[0];
}

export async function getProjectById(id: string): Promise<Project | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const found = SEEDED_PROJECTS.find(
    (p) => p.id === id || p.projectCode === id
  );
  return found || null;
}

export async function getPortfolioStats(): Promise<PortfolioStats> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return PORTFOLIO_STATS;
}

export async function getProjectActivity(): Promise<ProjectActivityItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return PROJECT_ACTIVITIES;
}

export async function getPortfolioActivity(): Promise<any[]> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return PROJECT_ACTIVITIES.map((a) => ({
    id: a.id,
    timestamp: a.timestamp,
    title: a.projectTitle,
    description: a.activity,
    projectTitle: a.projectTitle,
    type: 'pilot',
  }));
}

export async function getCollaborationOpportunities(): Promise<Array<{ project: Project; need: string }>> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return [
    {
      project: SEEDED_PROJECTS[0],
      need: 'IoT Manufacturing Partner for 150 Solar Telemetry Collars',
    },
    {
      project: SEEDED_PROJECTS[1],
      need: 'Satellite InSAR Calibration & High-Resolution Subsurface Modeling',
    },
    {
      project: SEEDED_PROJECTS[2],
      need: 'Mobile Spectrometer Chamber Precision Miniaturization',
    },
  ];
}

export async function getProjectMetrics(): Promise<PortfolioMetrics> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return PORTFOLIO_METRICS;
}

export async function getProjectMapData(): Promise<
  Array<{
    id: string;
    projectCode: string;
    title: string;
    domain: string;
    district: string;
    stage: ProjectStage;
    stageLabel: string;
    beneficiaries?: number;
    coordinates: { x: number; y: number };
  }>
> {
  await new Promise((resolve) => setTimeout(resolve, 40));
  return SEEDED_PROJECTS.map((p) => ({
    id: p.id,
    projectCode: p.projectCode,
    title: p.title,
    domain: p.domain,
    district: p.district,
    stage: p.stage,
    stageLabel: p.stageLabel,
    beneficiaries: p.beneficiaries,
    coordinates: p.coordinates,
  }));
}

/**
 * Returns rich ProjectDetail for /projects/:projectId
 */
export async function getProjectDetail(id: string): Promise<ProjectDetail | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const base = SEEDED_PROJECTS.find((p) => p.id === id || p.projectCode === id) || SEEDED_PROJECTS[0];

  return {
    ...base,
    projectCode: base.projectCode,
    title: base.title,
    summary: base.description,
    domain: base.domain,
    relatedChallengeId: base.challengeId || 'JS-2026-00024',
    relatedChallengeTitle: base.challengeTitle || 'Frequent Breakdown of Drinking Water Handpumps',
    district: base.district,
    location: base.locationDisplay,
    stage: base.stage,
    stageLabel: base.stageLabel,
    health: 'ON_TRACK',
    healthLabel: 'ON TRACK',
    leadInstitution: base.leadInstitution,
    impactMetric: base.impactMetric || '2,000+ Residents Covered',
    potentialBeneficiaries: base.beneficiaries || 2000,
    progressPercentage: Math.round((base.milestoneProgress.completed / base.milestoneProgress.total) * 100),
    startedAt: 'January 2026',
    featured: base.featured,
    coordinates: base.coordinates,
    imageUrl: '/jharkhand_innovation_field_pilot.jpg',
    challenge: {
      id: base.relatedChallengeId || 'JS-2026-00024',
      title: base.relatedChallengeTitle || 'Frequent Breakdown of Drinking Water Handpumps',
      location: base.locationDisplay,
    },
    mission: {
      problem:
        'In tribal blocks across Jharkhand, mechanical handpumps suffer frequent valve wear. Because faults are reported manually on paper, downtime often stretches into weeks. This project turns conventional handpumps into intelligent digital nodes.',
      approach:
        'A clamp-on acoustic and stroke telemetry collar powered by a miniature solar cell that transmits packet telemetry over open LoRaWAN frequencies to village Jal Sahiyas and block engineers.',
      expectedOutcome:
        'Elimination of prolonged rural water outages by alerting maintenance squads before pump failure occurs.',
    },
    team: [
      {
        id: 'm1',
        name: 'Dr. Alok Sen',
        role: 'Principal Investigator',
        title: 'Professor of Electrical & Electronics',
        specialty: 'Embedded Sensing & LoRa Telemetry',
        institution: base.leadInstitution,
        avatarInitials: 'AS',
      },
      {
        id: 'm2',
        name: 'Sunita Soren',
        role: 'Community Co-Lead',
        title: 'Lead Jal Sahiya Coordinator',
        specialty: 'Community Groundwater Governance',
        institution: 'Murhu Village Water Committee',
        avatarInitials: 'SS',
      },
      {
        id: 'm3',
        name: 'Priyanka Verma',
        role: 'Systems Architect',
        title: 'IoT Telemetry Lead',
        specialty: 'Low-Power Edge Analytics',
        institution: 'IoT Innovation Partner',
        avatarInitials: 'PV',
      },
    ],
    activity: [
      {
        id: 'act-1',
        timestamp: 'Today',
        title: 'Milestone 03 Completed',
        description: 'Field telemetry verified on all 18 borewells in Murhu.',
      },
      {
        id: 'act-2',
        timestamp: '2 days ago',
        title: 'Sensor Firmware Deployed',
        description: 'Over-the-air update pushed to telemetry gateways.',
      },
    ],
    impact: {
      currentOutputs: [
        { label: 'Water Points Monitored', value: '18', desc: 'Active sensor collars deployed' },
        { label: 'Residents Protected', value: '2,000+', desc: 'Direct household water continuity' },
      ],
      targetOutcomes: [
        { label: 'Downtime Reduction', value: '32%', desc: 'Decrease in pump failure duration' },
        { label: 'Coverage Target', value: '100 Wells', desc: 'Phase 2 district scale-up' },
      ],
      evidenceStatus: {
        baselineData: 'COLLECTED',
        pilotData: 'IN_PROGRESS',
        impactValidation: 'IN_PROGRESS',
      },
    },
    collaborationNeeds: [
      {
        id: 'cn-1',
        type: 'IoT Manufacturing Partner',
        description: 'Seeking an indigenous PCB assembly and solar enclosure fabrication partner for 150 pilot kits.',
        status: 'OPEN',
      },
    ],
    milestones: [
      {
        id: 'm-1',
        phase: 'PHASE 1',
        period: 'Q4 2025',
        title: 'Acoustic Signature Benchmarking',
        description: 'Completed laboratory trials analyzing stroke sound signatures on mock handpump cylinders.',
        deliverables: ['Acoustic Baseline Dataset', 'Sensor Housing 3D Blueprint'],
        owner: 'Dr. Alok Sen',
        status: 'COMPLETED',
      },
      {
        id: 'm-2',
        phase: 'PHASE 2',
        period: 'Q1 2026',
        title: 'Pilot Sensor Fabrication',
        description: 'Manufactured 25 weatherized solar telemetry collars with local IP67 enclosures.',
        deliverables: ['25 Sensor Collars', 'LoRa Gateway Node'],
        owner: 'Priyanka Verma',
        status: 'COMPLETED',
      },
      {
        id: 'm-3',
        phase: 'PHASE 3',
        period: 'Q2 2026',
        title: 'Ground Field Deployment',
        description: 'Deployed across 18 borewells in Murhu block with Jal Sahiya caretakers active.',
        deliverables: ['18 Live Dashboard Feeds', 'Automated SMS Alerts'],
        owner: 'Sunita Soren',
        status: 'IN_PROGRESS',
      },
    ],
    workstreams: [
      {
        id: 'ws-1',
        title: 'Hardware Ruggedization',
        description: 'Testing monsoon waterproofing and solar battery autonomy in heavy tree cover.',
        progress: '80%',
        status: 'On Track',
        metric: '18/18 Units Active',
      },
      {
        id: 'ws-2',
        title: 'Community Reporting App',
        description: 'Bilingual Sadri / Hindi mobile interface for Jal Sahiya caretakers.',
        progress: '65%',
        status: 'In Progress',
        metric: '22 Caretakers Trained',
      },
    ],
    deliverables: [
      {
        id: 'd-1',
        title: 'Field Pilot Sensor Firmware v2.1',
        owner: 'BIT Mesra Team',
        status: 'COMPLETED',
        date: 'February 2026',
      },
      {
        id: 'd-2',
        title: 'Groundwater Yield & Outage Telemetry Report',
        owner: 'PHED & Bit Mesra',
        status: 'IN_REVIEW',
        date: 'March 2026',
      },
    ],
    fieldImplementation: {
      district: base.district,
      block: base.block || 'Murhu',
      targetPoints: 25,
      installedPoints: 18,
      progressPercentage: 72,
      communityPartners: 3,
      telemetryNotes: 'Zero packet loss recorded across 8.4 km radio line-of-sight to Murhu BDO tower.',
    },
    documents: [
      {
        id: 'doc-1',
        title: 'Field Pilot Architecture & LoRa Frequency Dossier',
        type: 'PDF',
        date: '14 Jan 2026',
        size: '2.4 MB',
      },
      {
        id: 'doc-2',
        title: 'Handpump Vibration Dataset (Q1 Pilot)',
        type: 'Dataset',
        date: '02 Feb 2026',
        size: '14.8 MB',
      },
    ],
    successCriteria: [
      {
        label: 'Sensor Uptime',
        baseline: '0%',
        target: '98% uptime in continuous outdoor operation',
      },
      {
        label: 'Mean Time to Repair',
        baseline: '7 days',
        target: 'Under 36 hours from failure detection',
      },
    ],
  };
}

export async function expressInterest(
  projectId: string,
  _formData: ExpressInterestFormData
): Promise<{ success: boolean; referenceNumber: string }> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return {
    success: true,
    referenceNumber: `EXP-${projectId.replace('PRJ-', '')}-${Math.floor(1000 + Math.random() * 9000)}`,
  };
}

export const projectApi = {
  getProjects,
  getProjectById,
  getFeaturedProject,
  getPortfolioStats,
  getProjectActivity,
  getPortfolioActivity,
  getCollaborationOpportunities,
  getProjectMetrics,
  getProjectMapData,
  getProjectDetail,
  expressInterest,
};
