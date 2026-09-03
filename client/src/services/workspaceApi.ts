import {
  WorkspaceData,
  WorkspaceMilestone,
  WorkItem,
  WorkspaceDeliverable,
  WorkspaceTeamMember,
  WorkspaceDocument,
  WorkspaceUpdate,
  WorkStatus,
  DeliverableStatus,
} from '../types/workspace';
import { SEED_PROJECTS } from './projectsApi';

const DEFAULT_WORKSPACE_DATA: WorkspaceData = {
  context: {
    projectId: 'PROJECT-2026-0012',
    projectCode: 'PROJECT-2026-0012',
    title: 'Smart Rural Water Infrastructure Monitoring',
    domain: 'Water Management',
    location: 'Murhu Block, Khunti',
    stage: 'FIELD_PILOT',
    stageLabel: 'FIELD PILOT',
    health: 'ON_TRACK',
    healthLabel: 'ON TRACK',
    progressPercentage: 68,
    leadInstitution: 'BIT Mesra',
    currentUserRole: 'project_lead',
    currentUserName: 'Dr. Ananya Singh',
  },
  priorities: [
    {
      id: 'prio-1',
      level: 'HIGH_PRIORITY',
      title: 'Complete installation at remaining 6 pilot locations in Murhu Block.',
      owner: 'Field Deployment Team',
      dueDate: 'June 28',
      actionText: 'View Workstream',
    },
    {
      id: 'prio-2',
      level: 'REVIEW_REQUIRED',
      title: 'Maintenance Alert Workflow is awaiting formal administrative approval.',
      owner: 'Project Lead',
      dueDate: 'June 25',
      actionText: 'Review Deliverable',
    },
    {
      id: 'prio-3',
      level: 'UPCOMING',
      title: 'Pilot acoustic vibration data analysis review scheduled for next week.',
      owner: 'Research Associates',
      dueDate: 'July 04',
      actionText: 'Open Documents',
    },
  ],
  recentActivities: [
    {
      id: 'wa-1',
      author: 'Ravi Kumar',
      action: 'uploaded deliverable',
      target: 'Sensor Reliability Test Report v2',
      timestamp: 'Today · 10:42 AM',
    },
    {
      id: 'wa-2',
      author: 'Dr. Ananya Singh',
      action: 'approved milestone',
      target: 'Prototype Development (Phase 03)',
      timestamp: 'Yesterday',
    },
    {
      id: 'wa-3',
      author: 'Priya Verma',
      action: 'updated field progress',
      target: '14 / 20 Sites Active',
      timestamp: '2 days ago',
    },
    {
      id: 'wa-4',
      author: 'Khunti District Admin',
      action: 'reviewed workflow',
      target: 'Maintenance Alert Routing Protocol',
      timestamp: '3 days ago',
    },
  ],
  workstreams: [
    {
      id: 'ws-field',
      title: 'FIELD DEPLOYMENT',
      description: 'Install and calibrate sensor modules across 20 selected water points in Murhu Block.',
      status: 'ACTIVE',
      progressText: '14 / 20 Sites Complete',
      metric: '70% Complete',
      items: [
        {
          id: 'wi-1',
          workstreamId: 'ws-field',
          title: 'Install Sensor Module – Murhu Cluster A',
          description: 'Deploy solar telemetry collars on 4 India Mark II pumps in Buruhatu village.',
          status: 'IN_PROGRESS',
          progress: 75,
          ownerName: 'Priya Verma',
          ownerRole: 'Field Operations',
          dueDate: 'June 24',
          comments: [
            {
              id: 'c1',
              authorName: 'Priya Verma',
              authorRole: 'Field Coordinator',
              content: '3 nodes installed successfully. Final collar scheduled for tomorrow morning.',
              createdAt: 'Yesterday',
            },
          ],
        },
        {
          id: 'wi-2',
          workstreamId: 'ws-field',
          title: 'Jal Sahiya Verification & Orientation',
          description: 'Brief 6 village water care committee volunteers on optical status indicator checks.',
          status: 'COMPLETED',
          progress: 100,
          ownerName: 'Field Team',
          ownerRole: 'Community Training',
          dueDate: 'June 18',
          comments: [],
        },
        {
          id: 'wi-3',
          workstreamId: 'ws-field',
          title: 'Mounting Bracket Fabrication for Cluster B',
          description: 'Receive machined aluminum casing batches from local MSME partner for remaining sites.',
          status: 'IN_PROGRESS',
          progress: 40,
          ownerName: 'Ravi Kumar',
          ownerRole: 'Hardware Engineering',
          dueDate: 'June 29',
          comments: [],
        },
      ],
    },
    {
      id: 'ws-data',
      title: 'DATA COLLECTION',
      description: 'Collect operational stroke telemetry, noise vibration metrics, and battery levels over LoRa gateways.',
      status: 'ACTIVE',
      progressText: 'Collecting Pilot Data',
      metric: '18,400 Packets Synced',
      items: [
        {
          id: 'wi-4',
          workstreamId: 'ws-data',
          title: 'Validate Data Transmission Reliability',
          description: 'Calculate packet loss ratios across hills and dense sal forest foliage in Murhu Block.',
          status: 'IN_REVIEW',
          progress: 90,
          ownerName: 'Ravi Kumar',
          ownerRole: 'IoT Team',
          dueDate: 'June 26',
          comments: [
            {
              id: 'c2',
              authorName: 'Dr. Ananya Singh',
              authorRole: 'Faculty Lead',
              content: 'Reviewing 72-hour log. Packet error rate is under 3.2% which meets target.',
              createdAt: 'Today',
            },
          ],
        },
        {
          id: 'wi-5',
          workstreamId: 'ws-data',
          title: 'Battery Voltage Discharge Curve Audit',
          description: 'Verify 5W solar trickle charging under monsoon overcast conditions.',
          status: 'IN_PROGRESS',
          progress: 55,
          ownerName: 'Neha Sharma',
          ownerRole: 'Data Analytics',
          dueDate: 'July 02',
          comments: [],
        },
      ],
    },
    {
      id: 'ws-maint',
      title: 'MAINTENANCE WORKFLOW',
      description: 'Validate automated maintenance alert routing from edge gateways to district mechanics.',
      status: 'IN_REVIEW',
      progressText: 'Workflow Validation',
      metric: '6 Verified Alerts',
      items: [
        {
          id: 'wi-6',
          workstreamId: 'ws-maint',
          title: 'Prepare Maintenance Response SOP',
          description: 'Define exact escalation timelines between BDO office, block mechanics, and district van.',
          status: 'IN_REVIEW',
          progress: 85,
          ownerName: 'Khunti District Admin',
          ownerRole: 'District Partner',
          dueDate: 'June 30',
          comments: [],
        },
        {
          id: 'wi-7',
          workstreamId: 'ws-maint',
          title: 'WhatsApp Alert Bot Gateway Hook',
          description: 'Deploy automated Hindi SMS and WhatsApp trigger to local Jal Samiti coordinators.',
          status: 'NOT_STARTED',
          progress: 0,
          ownerName: 'IoT Team',
          ownerRole: 'Software Backend',
          dueDate: 'July 08',
          comments: [],
        },
      ],
    },
  ],
  milestones: [
    {
      id: 'ms-1',
      phase: 'PHASE 01',
      period: 'JAN 2026',
      title: 'Problem Validation',
      description: 'Conducted field baseline across 25 villages in Murhu Block, verifying breakdown patterns.',
      status: 'COMPLETED',
      progress: 100,
      startDate: 'Jan 05, 2026',
      targetDate: 'Jan 31, 2026',
      deliverables: ['Field Failure Audit Report', 'Pump Mechanical Specification Matrix'],
      owner: 'Rural Innovation Lab',
    },
    {
      id: 'ms-2',
      phase: 'PHASE 02',
      period: 'FEB 2026',
      title: 'System Architecture',
      description: 'Designed low-power LoRa mesh topology, piezoelectric transducer collar, and energy circuit.',
      status: 'COMPLETED',
      progress: 100,
      startDate: 'Feb 01, 2026',
      targetDate: 'Feb 28, 2026',
      deliverables: ['Schematic Design v1.2', 'LoRaWAN Gateway Placement Plan'],
      owner: 'BIT Mesra',
    },
    {
      id: 'ms-3',
      phase: 'PHASE 03',
      period: 'MAR 2026',
      title: 'Prototype Development',
      description: 'Fabricated bench prototypes and tested stroke frequency anomaly detection in test rigs.',
      status: 'COMPLETED',
      progress: 100,
      startDate: 'Mar 01, 2026',
      targetDate: 'Mar 31, 2026',
      deliverables: ['IoT Sensor Prototype v2', 'Calibration Firmware v1.0'],
      owner: 'BIT Mesra',
    },
    {
      id: 'ms-4',
      phase: 'PHASE 04',
      period: 'APR – JUN 2026',
      title: 'Field Pilot',
      description: 'Installing and operating 20 telemetry nodes on working India Mark II handpumps across Murhu Block.',
      status: 'IN_PROGRESS',
      progress: 70,
      startDate: 'Apr 05, 2026',
      targetDate: 'Jun 30, 2026',
      deliverables: ['14 Installed Field Nodes', 'Daily Dashboard Sync', 'Jal Samiti WhatsApp Integration'],
      owner: 'Joint Consortium',
    },
    {
      id: 'ms-5',
      phase: 'PHASE 05',
      period: 'JUL 2026',
      title: 'Impact Evaluation',
      description: 'Measure response turnaround times, false-positive alert frequencies, and community satisfaction.',
      status: 'UPCOMING',
      progress: 0,
      startDate: 'Jul 01, 2026',
      targetDate: 'Jul 31, 2026',
      deliverables: ['Pilot Evaluation Dossier', 'Mean Time To Repair (MTTR) Analysis'],
      owner: 'Khunti District Administration',
    },
    {
      id: 'ms-6',
      phase: 'PHASE 06',
      period: 'AUG 2026',
      title: 'Scale Recommendation',
      description: 'Submit policy brief and commercialization tender specifications to Jharkhand DWSD.',
      status: 'PLANNED',
      progress: 0,
      startDate: 'Aug 01, 2026',
      targetDate: 'Aug 31, 2026',
      deliverables: ['State Scale Blueprint', 'Tender Hardware Specs'],
      owner: 'BIT Mesra & State DWSD',
    },
  ],
  deliverables: [
    {
      id: 'del-1',
      title: 'IoT Sensor Prototype v2',
      description: 'Hardware schematics, BOM, and manufactured PCB units for field sensor collars.',
      milestoneTitle: 'Prototype Development',
      owner: 'BIT Mesra',
      status: 'COMPLETED',
      lastUpdated: 'May 12, 2026',
      version: 'v2.1',
      comments: [
        {
          id: 'c-del-1',
          author: 'Dr. Ananya Singh',
          role: 'Project Lead',
          text: 'Verified bench vibration sensitivity with piezoelectric transducer.',
          date: 'May 12, 2026',
        },
      ],
    },
    {
      id: 'del-2',
      title: 'Field Installation Protocol',
      description: 'Standard operating procedure for non-invasive mounting on India Mark II pump heads.',
      milestoneTitle: 'Field Pilot',
      owner: 'Rural Innovation Lab',
      status: 'COMPLETED',
      lastUpdated: 'May 18, 2026',
      version: 'v1.4',
      comments: [],
    },
    {
      id: 'del-3',
      title: 'Maintenance Alert Workflow',
      description: 'Escalation rules, SMS syntax, and automated triage protocol for block maintenance vans.',
      milestoneTitle: 'Field Pilot',
      owner: 'District Administration',
      status: 'UNDER_REVIEW',
      lastUpdated: 'May 22, 2026',
      version: 'v0.9',
      comments: [
        {
          id: 'c-del-2',
          author: 'District Collectorate Office',
          role: 'Government Partner',
          text: 'Awaiting clearance from Murhu BDO on weekend emergency duty roster.',
          date: 'May 25, 2026',
        },
      ],
    },
    {
      id: 'del-4',
      title: 'Pilot Evaluation Report',
      description: 'First 60-day telemetry audit analyzing mean time to repair and false positives.',
      milestoneTitle: 'Impact Evaluation',
      owner: 'Research Team',
      status: 'DRAFT',
      lastUpdated: 'June 01, 2026',
      version: 'v0.2',
      comments: [],
    },
  ],
  teamMembers: [
    {
      id: 'tm-1',
      name: 'Dr. Ananya Singh',
      roleCategory: 'LEADERSHIP',
      roleTitle: 'Principal Investigator & Project Lead',
      institution: 'BIT Mesra',
      areaOfContribution: 'Embedded Systems & LoRa Mesh Architecture',
      currentWorkload: 'Normal',
      avatarInitials: 'AS',
    },
    {
      id: 'tm-2',
      name: 'Ravi Kumar',
      roleCategory: 'RESEARCH_DEV',
      roleTitle: 'Student Fellow & Hardware Engineer',
      institution: 'BIT Mesra',
      areaOfContribution: 'Firmware Development & Solar Battery Circuits',
      currentWorkload: 'High',
      avatarInitials: 'RK',
    },
    {
      id: 'tm-3',
      name: 'Neha Sharma',
      roleCategory: 'RESEARCH_DEV',
      roleTitle: 'Research Associate',
      institution: 'BIT Mesra',
      areaOfContribution: 'Vibration Signal DSP & Failure Machine Learning',
      currentWorkload: 'Normal',
      avatarInitials: 'NS',
    },
    {
      id: 'tm-4',
      name: 'Priya Verma',
      roleCategory: 'FIELD_IMPLEMENTATION',
      roleTitle: 'Field Coordinator',
      institution: 'Rural Innovation Lab',
      areaOfContribution: 'Gram Panchayat Installations & Sahiya Training',
      currentWorkload: 'High',
      avatarInitials: 'PV',
    },
    {
      id: 'tm-5',
      name: 'Amit Kumar',
      roleCategory: 'PARTNER_CONTRIBUTORS',
      roleTitle: 'Industry Mentor',
      institution: 'Jharkhand IoT Solutions',
      areaOfContribution: 'Casing Machining & Weatherproof Ingress Design',
      currentWorkload: 'Light',
      avatarInitials: 'AK',
    },
    {
      id: 'tm-6',
      name: 'Sukhram Munda',
      roleCategory: 'PARTNER_CONTRIBUTORS',
      roleTitle: 'Community Representative',
      institution: 'Murhu Community Water Committee',
      areaOfContribution: 'Ground Truth Reporting & Local Feedback',
      currentWorkload: 'Normal',
      avatarInitials: 'SM',
    },
  ],
  documents: [
    {
      id: 'doc-1',
      title: 'Research Proposal & Technical Feasibility',
      category: 'Research',
      type: 'PDF',
      uploadedBy: 'Dr. Ananya Singh',
      uploadDate: 'January 15, 2026',
      size: '3.4 MB',
    },
    {
      id: 'doc-2',
      title: 'LoRaWAN Gateway Placement & Network Coverage Map',
      category: 'Technical',
      type: 'Technical Document',
      uploadedBy: 'Ravi Kumar',
      uploadDate: 'February 10, 2026',
      size: '5.8 MB',
    },
    {
      id: 'doc-3',
      title: 'Field Installation Protocol & Sahiya SOP',
      category: 'Field Operations',
      type: 'PDF',
      uploadedBy: 'Priya Verma',
      uploadDate: 'April 08, 2026',
      size: '2.1 MB',
    },
    {
      id: 'doc-4',
      title: 'Pilot Pump Stroke Frequency Dataset (Raw Telemetry)',
      category: 'Data',
      type: 'Dataset',
      uploadedBy: 'Neha Sharma',
      uploadDate: 'June 02, 2026',
      size: '18.2 MB',
    },
    {
      id: 'doc-5',
      title: 'Panchayat Jal Samiti MoU & District Approvals',
      category: 'Administration',
      type: 'PDF',
      uploadedBy: 'Khunti District Admin',
      uploadDate: 'March 14, 2026',
      size: '1.6 MB',
    },
  ],
  updates: [
    {
      id: 'upd-1',
      type: 'field_observation',
      title: 'Sal Forest RF Shadowing Resolved',
      content:
        'Two pilot locations in Siyankel experienced intermittent transmission attenuation due to dense canopy moisture. Relocating repeater gateway to the panchayat bhawan solar tower resolved packet drop.',
      authorName: 'Priya Verma',
      authorRole: 'Field Coordinator',
      createdAt: 'Today · 11:15 AM',
      resolved: true,
      commentsCount: 2,
    },
    {
      id: 'upd-2',
      type: 'decision',
      title: 'Sensor Enclosure Revision Approved',
      content:
        'The engineering review approved the gasket revision to withstand high monsoon precipitation (IP67 certified). Production of final 6 collars initiated with local MSME.',
      authorName: 'Dr. Ananya Singh',
      authorRole: 'Project Lead',
      createdAt: 'Yesterday',
      commentsCount: 1,
    },
    {
      id: 'upd-3',
      type: 'issue',
      title: 'Battery Trickle Under Heavy Overcast',
      content:
        'Solar yield dropped to 1.8W during 3 continuous overcast days. Telemetry interval will temporarily back off from 5-minute to 15-minute bursts when voltage drops below 3.4V.',
      authorName: 'Ravi Kumar',
      authorRole: 'Hardware Engineer',
      createdAt: '3 days ago',
      resolved: false,
      commentsCount: 4,
    },
    {
      id: 'upd-4',
      type: 'progress',
      title: '14 Water Points Streaming Live Telemetry',
      content:
        '70% of Murhu pilot deployment complete. Central dashboard has recorded zero false failure alarms over the past 14 days of continuous operation.',
      authorName: 'Neha Sharma',
      authorRole: 'Data Analytics',
      createdAt: '5 days ago',
      commentsCount: 3,
    },
  ],
  impactIndicators: [
    {
      id: 'imp-1',
      title: 'Average Pump Breakdown Downtime',
      metricType: 'Pump Downtime',
      baseline: '12 Days',
      current: '6.5 Days',
      target: 'Below 4 Days',
      evidence: [
        {
          id: 'ev-1',
          source: 'Field Pilot Sensor Telemetry & District Log',
          date: 'June 18, 2026',
          collectedBy: 'BIT Mesra Research Team',
          verificationStatus: 'VERIFIED',
          notes: 'Mean time to detection reduced from 10 days to 3.8 hours across 14 monitored units.',
        },
        {
          id: 'ev-2',
          source: 'Murhu Block Jal Samiti Maintenance Register',
          date: 'May 30, 2026',
          collectedBy: 'Rural Innovation Lab',
          verificationStatus: 'VERIFIED',
          notes: 'Verified against physically completed repair work orders.',
        },
      ],
    },
    {
      id: 'imp-2',
      title: 'Maintenance Dispatch Turnaround Time',
      metricType: 'Response Time',
      baseline: '5 Days from Report',
      current: '2 Days from Alert',
      target: 'Same Day Dispatch (<12 Hours)',
      evidence: [
        {
          id: 'ev-3',
          source: 'District SMS Dispatch Server Log',
          date: 'June 12, 2026',
          collectedBy: 'Khunti District Admin',
          verificationStatus: 'VERIFIED',
          notes: 'Automated SMS triggers delivered directly to assigned area technician.',
        },
      ],
    },
  ],
};

// In-memory persistent state map
const WORKSPACES_STORE: Record<string, WorkspaceData> = {
  'PROJECT-2026-0012': DEFAULT_WORKSPACE_DATA,
};

function generateFallbackWorkspace(projectId: string): WorkspaceData {
  const base = SEED_PROJECTS.find((p) => p.id === projectId || p.projectCode === projectId) || SEED_PROJECTS[0];

  return {
    context: {
      projectId: base.id,
      projectCode: base.projectCode,
      title: base.title,
      domain: base.domain,
      location: base.location,
      stage: base.stage,
      stageLabel: base.stageLabel,
      health: base.health,
      healthLabel: base.healthLabel,
      progressPercentage: base.progressPercentage,
      leadInstitution: base.leadInstitution,
      currentUserRole: 'project_lead',
      currentUserName: `Dr. Ramesh Soren`,
    },
    priorities: [
      {
        id: 'prio-gen-1',
        level: 'HIGH_PRIORITY',
        title: `Complete sprint milestones for ${base.stageLabel}.`,
        owner: 'Project Working Group',
        dueDate: 'Next Week',
      },
      {
        id: 'prio-gen-2',
        level: 'REVIEW_REQUIRED',
        title: 'Review partner memorandum and technical deliverables.',
        owner: 'Project Lead',
        dueDate: 'In 5 days',
      },
    ],
    recentActivities: [
      {
        id: 'wa-gen-1',
        author: 'Lead Investigator',
        action: 'updated sprint status',
        target: `${base.stageLabel} Sprint`,
        timestamp: 'Yesterday',
      },
    ],
    workstreams: [
      {
        id: 'ws-gen-1',
        title: 'CORE IMPLEMENTATION',
        description: `Deliver core ${base.domain} solutions in ${base.location}.`,
        status: 'ACTIVE',
        progressText: `${base.progressPercentage}% Complete`,
        metric: 'Sprint 4',
        items: [
          {
            id: 'wi-gen-1',
            workstreamId: 'ws-gen-1',
            title: 'Refine System Specifications',
            description: 'Align software and field parameters with district specifications.',
            status: 'IN_PROGRESS',
            progress: 60,
            ownerName: 'Lead Researcher',
            ownerRole: 'R&D',
            dueDate: 'End of Month',
            comments: [],
          },
        ],
      },
    ],
    milestones: [
      {
        id: 'ms-gen-1',
        phase: 'PHASE 01',
        period: 'Q1 2026',
        title: 'Needs Assessment & Architecture',
        description: `Verified real-world ground conditions in ${base.location}.`,
        status: 'COMPLETED',
        progress: 100,
        startDate: 'Jan 2026',
        targetDate: 'Mar 2026',
        deliverables: ['Baseline Needs Dossier', 'Architecture Specs'],
        owner: base.leadInstitution,
      },
      {
        id: 'ms-gen-2',
        phase: 'PHASE 02',
        period: 'Q2 2026',
        title: 'Engineering & Field Testing',
        description: `Operating deployment units in ${base.location}.`,
        status: base.stage === 'DESIGN' ? 'IN_PROGRESS' : 'COMPLETED',
        progress: base.progressPercentage,
        startDate: 'Apr 2026',
        targetDate: 'Jun 2026',
        deliverables: ['Field Node Deployment', 'Live Telemetry Integration'],
        owner: 'Joint Consortium',
      },
    ],
    deliverables: [
      {
        id: 'del-gen-1',
        title: 'Architecture & Field Specification Dossier',
        description: 'Primary technical artifact governing implementation.',
        milestoneTitle: 'Engineering & Field Testing',
        owner: base.leadInstitution,
        status: 'COMPLETED',
        lastUpdated: 'Recent',
        version: 'v1.0',
        comments: [],
      },
    ],
    teamMembers: [
      {
        id: 'tm-gen-1',
        name: 'Dr. Ramesh Soren',
        roleCategory: 'LEADERSHIP',
        roleTitle: 'Principal Investigator',
        institution: base.leadInstitution,
        areaOfContribution: 'Project Coordination & Institutional Oversight',
        currentWorkload: 'Normal',
        avatarInitials: 'RS',
      },
      {
        id: 'tm-gen-2',
        name: 'Aditi Mukhopadhyay',
        roleCategory: 'RESEARCH_DEV',
        roleTitle: 'Research Fellow',
        institution: base.leadInstitution,
        areaOfContribution: 'Data & Algorithmic Validation',
        currentWorkload: 'Normal',
        avatarInitials: 'AM',
      },
    ],
    documents: [
      {
        id: 'doc-gen-1',
        title: 'Consortium Charter & Architecture Proposal',
        category: 'Research',
        type: 'PDF',
        uploadedBy: 'Project Lead',
        uploadDate: 'Earlier this year',
        size: '2.8 MB',
      },
    ],
    updates: [
      {
        id: 'upd-gen-1',
        type: 'progress',
        title: 'Sprint Progress On Track',
        content: `Team continues testing in ${base.location} with district partner support.`,
        authorName: 'Dr. Ramesh Soren',
        authorRole: 'Project Lead',
        createdAt: 'This Week',
      },
    ],
    impactIndicators: [
      {
        id: 'imp-gen-1',
        title: 'Verified Beneficiaries Reached',
        metricType: 'Community Beneficiaries',
        baseline: '0',
        current: `${Math.round(base.potentialBeneficiaries * 0.4)}`,
        target: `${base.potentialBeneficiaries}`,
        evidence: [
          {
            id: 'ev-gen-1',
            source: 'District Field Verification Records',
            date: 'Recent',
            collectedBy: base.leadInstitution,
            verificationStatus: 'VERIFIED',
            notes: 'Verified directly on ground with district authorities.',
          },
        ],
      },
    ],
  };
}

export async function getWorkspace(projectId: string): Promise<WorkspaceData> {
  await new Promise((r) => setTimeout(r, 60));
  if (!WORKSPACES_STORE[projectId]) {
    WORKSPACES_STORE[projectId] = generateFallbackWorkspace(projectId);
  }
  return WORKSPACES_STORE[projectId];
}

export async function updateMilestone(
  projectId: string,
  milestoneId: string,
  updates: Partial<WorkspaceMilestone>
): Promise<WorkspaceMilestone | null> {
  await new Promise((r) => setTimeout(r, 80));
  const ws = await getWorkspace(projectId);
  const ms = ws.milestones.find((m) => m.id === milestoneId);
  if (ms) {
    Object.assign(ms, updates);
    return ms;
  }
  return null;
}

export async function updateWorkItemStatus(
  projectId: string,
  itemId: string,
  newStatus: WorkStatus
): Promise<WorkItem | null> {
  await new Promise((r) => setTimeout(r, 60));
  const ws = await getWorkspace(projectId);
  for (const stream of ws.workstreams) {
    const item = stream.items.find((i) => i.id === itemId);
    if (item) {
      item.status = newStatus;
      if (newStatus === 'COMPLETED') item.progress = 100;
      return item;
    }
  }
  return null;
}

export async function addWorkItem(
  projectId: string,
  workstreamId: string,
  item: Omit<WorkItem, 'id' | 'workstreamId' | 'comments'>
): Promise<WorkItem> {
  await new Promise((r) => setTimeout(r, 80));
  const ws = await getWorkspace(projectId);
  const stream = ws.workstreams.find((s) => s.id === workstreamId) || ws.workstreams[0];
  const newItem: WorkItem = {
    ...item,
    id: `wi-${Date.now()}`,
    workstreamId: stream.id,
    comments: [],
  };
  stream.items.push(newItem);
  return newItem;
}

export async function addTeamMember(
  projectId: string,
  member: Omit<WorkspaceTeamMember, 'id'>
): Promise<WorkspaceTeamMember> {
  await new Promise((r) => setTimeout(r, 80));
  const ws = await getWorkspace(projectId);
  const newMember: WorkspaceTeamMember = {
    ...member,
    id: `tm-${Date.now()}`,
  };
  ws.teamMembers.push(newMember);
  return newMember;
}

export async function updateDeliverableStatus(
  projectId: string,
  deliverableId: string,
  newStatus: DeliverableStatus,
  reviewComment?: string
): Promise<WorkspaceDeliverable | null> {
  await new Promise((r) => setTimeout(r, 80));
  const ws = await getWorkspace(projectId);
  const del = ws.deliverables.find((d) => d.id === deliverableId);
  if (del) {
    del.status = newStatus;
    del.lastUpdated = 'Just now';
    if (reviewComment) {
      del.comments.push({
        id: `c-${Date.now()}`,
        author: ws.context.currentUserName,
        role: 'Project Lead',
        text: reviewComment,
        date: 'Just now',
      });
    }
    return del;
  }
  return null;
}

export async function createUpdate(
  projectId: string,
  update: Omit<WorkspaceUpdate, 'id' | 'createdAt'>
): Promise<WorkspaceUpdate> {
  await new Promise((r) => setTimeout(r, 80));
  const ws = await getWorkspace(projectId);
  const newUpdate: WorkspaceUpdate = {
    ...update,
    id: `upd-${Date.now()}`,
    createdAt: 'Just now',
  };
  ws.updates.unshift(newUpdate);
  return newUpdate;
}

export async function resolveIssue(
  projectId: string,
  updateId: string
): Promise<boolean> {
  await new Promise((r) => setTimeout(r, 60));
  const ws = await getWorkspace(projectId);
  const target = ws.updates.find((u) => u.id === updateId);
  if (target) {
    target.resolved = true;
    return true;
  }
  return false;
}

export async function uploadDocument(
  projectId: string,
  doc: Omit<WorkspaceDocument, 'id' | 'uploadDate'>
): Promise<WorkspaceDocument> {
  await new Promise((r) => setTimeout(r, 80));
  const ws = await getWorkspace(projectId);
  const newDoc: WorkspaceDocument = {
    ...doc,
    id: `doc-${Date.now()}`,
    uploadDate: 'Just now',
  };
  ws.documents.unshift(newDoc);
  return newDoc;
}
