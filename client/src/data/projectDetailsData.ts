import { ProjectDetail, ProjectMember, ProjectMilestone } from '../types/projectDetail';
import { Project } from '../types/projects';

export interface ProjectDetailMap {
  [projectId: string]: Partial<ProjectDetail>;
}

export const PROJECT_DETAILS_DATA: ProjectDetailMap = {
  'PRJ-2026-0012': {
    challenge: {
      id: 'JS-2026-00024',
      title: 'Frequent Breakdown of Drinking Water Handpumps in Murhu Block',
      location: 'Murhu Block, Khunti',
    },
    idea: {
      id: 'IDEA-2026-0001',
      title: 'Low-Cost IoT Water Infrastructure Monitoring System',
    },
    mission: {
      problem:
        'Frequent mechanical breakdown of drinking water handpumps in tribal hamlets leaves over 2,000 residents without potable water for weeks. Manual paper inspection logs create weeks of delay between failure and technician dispatch.',
      approach:
        'A non-invasive clamp-on stroke sensor and acoustic vibration collar coupled with long-range LoRaWAN telemetry. The collar monitors stroke velocity and cylinder vibration, triggering automatic SMS tickets to local Jal Sahiyas and the PHED mechanical dispatch squad.',
      expectedOutcome:
        'A 32% reduction in pump downtime, continuous water supply for 18 village borewells, and average repair turnaround under 36 hours.',
    },
    successCriteria: [
      {
        label: 'Sensor Collar Operating Uptime',
        baseline: '0%',
        target: '98% continuous outdoor operation in monsoon conditions',
      },
      {
        label: 'Mean Time to Repair (MTTR)',
        baseline: '7 to 14 days',
        target: 'Under 36 hours from first mechanical anomaly alert',
      },
      {
        label: 'Community Verification Score',
        baseline: '32% resident satisfaction',
        target: 'Over 85% resident water reliability confidence',
      },
    ],
    milestones: [
      {
        id: 'ms-1',
        phase: 'PHASE 1',
        period: 'Nov 2025',
        title: 'Community Problem & Handpump Geometry Validation',
        description: 'Conducted field acoustic survey across 30 handpumps in Murhu block with village Jal Sahiyas.',
        deliverables: ['Acoustic Baseline Dataset', 'Mounting Clamp CAD Spec'],
        owner: 'BIT Mesra & Jal Sahiya Collective',
        status: 'COMPLETED',
      },
      {
        id: 'ms-2',
        phase: 'PHASE 2',
        period: 'Dec 2025',
        title: 'University Team Formation & Hardware Prototyping',
        description: 'Assembled cross-functional engineering team and manufactured 5 breadboard telemetry prototypes.',
        deliverables: ['Bench Prototype PCB', 'LoRaWAN Frequency License Review'],
        owner: 'Dr. Alok Sen (BIT Mesra)',
        status: 'COMPLETED',
      },
      {
        id: 'ms-3',
        phase: 'PHASE 3',
        period: 'Jan 2026',
        title: 'Initial Prototype Laboratory Testing',
        description: 'Completed 100,000 cycle stroke simulation in hydraulic test rig with simulated sand grit ingestion.',
        deliverables: ['Durability Test Dossier', 'IP67 Enclosure Blueprint'],
        owner: 'IoT Innovation Partner',
        status: 'COMPLETED',
      },
      {
        id: 'ms-4',
        phase: 'PHASE 4',
        period: 'Feb 2026',
        title: 'Weatherproof Sensor Fabrication & Gateway Deployment',
        description: 'Fabricated 25 solar-rechargeable collars and erected the Murhu Block BDO gateway mast.',
        deliverables: ['25 Production Sensor Collars', 'Murhu Gateway Station'],
        owner: 'Joint Consortium',
        status: 'COMPLETED',
      },
      {
        id: 'ms-5',
        phase: 'PHASE 5',
        period: 'Mar 2026 – Present',
        title: 'Field Pilot Deployment on 18 Water Points',
        description: 'Active installation and real-world telemetry validation across 18 public borewells with trained Jal Sahiyas.',
        deliverables: ['18 Live Dashboard Feeds', 'Automated Dispatch SMS Gateway'],
        owner: 'District Water Resources Team',
        status: 'IN_PROGRESS',
      },
      {
        id: 'ms-6',
        phase: 'PHASE 6',
        period: 'May 2026',
        title: 'Impact Verification & District Scale-up Roadmap',
        description: 'Independent third-party evaluation of downtime metrics and blueprint for 100-village Khunti rollout.',
        deliverables: ['Verified Impact Report', 'Scale-up Operational Plan'],
        owner: 'Department of Drinking Water & Sanitation',
        status: 'UPCOMING',
      },
    ],
    team: [
      {
        id: 'tm-1',
        name: 'Dr. Alok Sen',
        role: 'Faculty Mentor',
        title: 'Professor of Electronics & Communication',
        specialty: 'Low-Power IoT Telemetry & LoRa Architecture',
        institution: 'BIT Mesra',
        avatarInitials: 'AS',
      },
      {
        id: 'tm-2',
        name: 'Sunita Soren',
        role: 'Field Coordinator',
        title: 'Lead Jal Sahiya Coordinator',
        specialty: 'Community Groundwater Governance & Mechanic Mobilization',
        institution: 'Murhu Village Water Committee',
        avatarInitials: 'SS',
      },
      {
        id: 'tm-3',
        name: 'Priyanka Verma',
        role: 'Technical Lead',
        title: 'Senior Embedded Firmware Engineer',
        specialty: 'Edge Vibration Analysis & Microcontroller Design',
        institution: 'IoT Innovation Partner',
        avatarInitials: 'PV',
      },
      {
        id: 'tm-4',
        name: 'Rajesh Gope',
        role: 'Student Researcher',
        title: 'M.Tech Research Scholar',
        specialty: 'Signal Processing & Predictive Mechanical Diagnostics',
        institution: 'BIT Mesra',
        avatarInitials: 'RG',
      },
      {
        id: 'tm-5',
        name: 'Anil Kumar Tirkey',
        role: 'Government Coordinator',
        title: 'Assistant Engineer (PHED)',
        specialty: 'District Mechanic Roster & Public Works Integration',
        institution: 'District Water Resources Team',
        avatarInitials: 'AT',
      },
    ],
    activity: [
      {
        id: 'act-1',
        timestamp: 'TODAY',
        title: 'Field Pilot sensors installed at 4 additional water points',
        description: 'Consortium technicians and Jal Sahiyas completed collar attachments at Hatinghore hamlet borewells.',
      },
      {
        id: 'act-2',
        timestamp: '2 DAYS AGO',
        title: 'Prototype reliability testing completed',
        description: 'Over-the-air firmware patch v2.1 successfully distributed to 14 active nodes with zero transmission drop.',
      },
      {
        id: 'act-3',
        timestamp: '1 WEEK AGO',
        title: 'District water team joined the pilot review meeting',
        description: 'Khunti PHED leadership reviewed initial downtime reduction telemetry and endorsed SMS ticket escalation rules.',
      },
      {
        id: 'act-4',
        timestamp: '2 WEEKS AGO',
        title: 'Initial field testing report uploaded',
        description: 'Baseline report detailing first 30 days of continuous acoustic recording compiled and submitted.',
      },
    ],
    documents: [
      {
        id: 'doc-1',
        title: 'Field Pilot Report — April 2026',
        type: 'PDF',
        date: '14 Apr 2026',
        size: '2.4 MB',
      },
      {
        id: 'doc-2',
        title: 'Prototype Architecture & LoRa Frequency Dossier',
        type: 'PDF',
        date: '28 Feb 2026',
        size: '1.8 MB',
      },
      {
        id: 'doc-3',
        title: 'Handpump Vibration Acoustic Baseline Dataset',
        type: 'Dataset',
        date: '15 Jan 2026',
        size: '14.2 MB',
      },
      {
        id: 'doc-4',
        title: 'Jal Sahiya Field Operation Handbook (Sadri / Hindi)',
        type: 'PDF',
        date: '05 Mar 2026',
        size: '850 KB',
      },
    ],
    impact: {
      currentOutputs: [
        { label: 'Water Points Monitored', value: '18', desc: 'Active sensor collars deployed on borewells' },
        { label: 'Potential Beneficiaries', value: '2,000+', desc: 'Direct household water access safeguarded' },
        { label: 'Communities Participating', value: '4', desc: 'Hamlets in Murhu Block actively engaged' },
      ],
      targetOutcomes: [
        { label: 'Downtime Reduction', value: '32%', desc: 'Decrease in average pump failure duration' },
        { label: 'Resolution Window', value: '< 36h', desc: 'Mechanic dispatch following automated alert' },
        { label: 'Scale-up Capacity', value: '100 Wells', desc: 'Phase 2 district scale-out readiness' },
      ],
      evidenceStatus: {
        baselineData: 'COLLECTED',
        pilotData: 'IN_PROGRESS',
        impactValidation: 'PENDING',
      },
    },
  },

  'PRJ-2026-0009': {
    challenge: {
      id: 'JS-2024-00003',
      title: 'Early Detection of Ground Subsidence in Mining Areas',
      location: 'Jharia Sector, Dhanbad',
    },
    idea: {
      id: 'IDEA-2026-0003',
      title: 'Micro-Seismic Geophone Telemetry & Strata Neural Network',
    },
    mission: {
      problem:
        'Centuries of coal seam extraction and underground mine fires have created unstable subterranean voids. Abrupt ground subsidence threatens 15,000 residents across Jharia without predictive warning.',
      approach:
        'Deep borehole micro-seismic sensors combined with surface crack tiltmeters and an edge neural network running vibration analysis to detect micro-fracturing hours before catastrophic subsidence occurs.',
      expectedOutcome:
        'A 6-hour advance evacuation advisory window, continuous structural integrity telemetry, and automated alerts to district disaster authorities.',
    },
    successCriteria: [
      {
        label: 'Micro-Seismic Event Detection Accuracy',
        baseline: '45% (post-event manual audit)',
        target: '94% automated real-time classification',
      },
      {
        label: 'Advance Evacuation Warning Window',
        baseline: '0 hours (sudden collapse)',
        target: 'Minimum 6 hours prior to surface breach',
      },
      {
        label: 'InSAR Satellite Calibration Correlation',
        baseline: 'Unsynchronized',
        target: 'Sub-centimeter geospatial alignment with Sentinel-1',
      },
    ],
    milestones: [
      {
        id: 'ms-m1',
        phase: 'PHASE 1',
        period: 'Oct 2025',
        title: 'Geological Void Mapping & Risk Stratification',
        description: 'Surveyed legacy underground mining galleries in Jharia sector with CIMFR geologists.',
        deliverables: ['Subsurface Hazard Map', 'Borehole Sensor Siting Matrix'],
        owner: 'BIT Sindri & Mining Research Centre',
        status: 'COMPLETED',
      },
      {
        id: 'ms-m2',
        phase: 'PHASE 2',
        period: 'Dec 2025',
        title: 'Geophone Array & Data Logger Bench Testing',
        description: 'Calibrated tri-axial micro-seismic sensors inside deep rock core samples.',
        deliverables: ['Hardware Calibration Rig', 'Edge Sampling Board v1'],
        owner: 'BIT Sindri Electronics Lab',
        status: 'COMPLETED',
      },
      {
        id: 'ms-m3',
        phase: 'PHASE 3',
        period: 'Feb 2026',
        title: 'Predictive Strata Neural Network Model',
        description: 'Trained CNN-LSTM network on historical subsidence seismic signatures.',
        deliverables: ['Trained Model Weights', 'Anomaly Detection API'],
        owner: 'IIT ISM Dhanbad Research Group',
        status: 'IN_PROGRESS',
      },
      {
        id: 'ms-m4',
        phase: 'PHASE 4',
        period: 'Apr 2026',
        title: 'Borehole Telemetry Installation in Jharia',
        description: 'Deploying first 4 sensor arrays in high-vulnerability residential wards.',
        deliverables: ['4 Operational Borehole Nodes', 'BCCL Grid Integration'],
        owner: 'District Disaster Management Authority',
        status: 'UPCOMING',
      },
      {
        id: 'ms-m5',
        phase: 'PHASE 5',
        period: 'Jul 2026',
        title: 'District Alert Integration & Siren Triggers',
        description: 'Integration with Dhanbad district emergency siren network.',
        deliverables: ['API Siren Interlock', 'SOP Evacuation Manual'],
        owner: 'District Administration',
        status: 'UPCOMING',
      },
      {
        id: 'ms-m6',
        phase: 'PHASE 6',
        period: 'Oct 2026',
        title: 'Multi-Ward Verification & Impact Certification',
        description: 'Evaluation of false positive rates and long-term sensor drift.',
        deliverables: ['Audit Dossier', 'Policy Whitepaper'],
        owner: 'Directorate General of Mines Safety',
        status: 'UPCOMING',
      },
    ],
    team: [
      {
        id: 'tm-m1',
        name: 'Prof. K. N. Mandal',
        role: 'Faculty Mentor',
        title: 'Head of Mining Engineering',
        specialty: 'Strata Mechanics & Underground Void Stability',
        institution: 'BIT Sindri',
        avatarInitials: 'KM',
      },
      {
        id: 'tm-m2',
        name: 'Dr. Snigdha Ghosh',
        role: 'Technical Lead',
        title: 'Senior Computational Geoscientist',
        specialty: 'Seismic Micro-Fracture Neural Modeling',
        institution: 'IIT ISM Dhanbad',
        avatarInitials: 'SG',
      },
      {
        id: 'tm-m3',
        name: 'Vikas Kumar Saw',
        role: 'Student Researcher',
        title: 'Ph.D. Candidate (Geophysics)',
        specialty: 'Tri-Axial Geophone Firmware & Signal Inversion',
        institution: 'BIT Sindri',
        avatarInitials: 'VS',
      },
      {
        id: 'tm-m4',
        name: 'Shankar Mahato',
        role: 'Field Coordinator',
        title: 'Jharia Ward Safety Representative',
        specialty: 'Community Evacuation Mapping & Resident Preparedness',
        institution: 'Jharia Citizen Welfare Committee',
        avatarInitials: 'SM',
      },
    ],
    activity: [
      {
        id: 'act-m1',
        timestamp: 'TODAY',
        title: 'Micro-seismic geophone array calibration completed',
        description: 'Laboratory simulation verified tri-axial sensitivity down to 0.5 Hz frequencies.',
      },
      {
        id: 'act-m2',
        timestamp: '3 DAYS AGO',
        title: 'Borehole drilling permit approved by BCCL',
        description: 'Permission granted for 4 test sensor wells along the Jharia-Dhanbad transit boundary.',
      },
      {
        id: 'act-m3',
        timestamp: '1 WEEK AGO',
        title: 'InSAR satellite baseline data ingested',
        description: 'Synthesized 24 months of Sentinel-1 ground displacement measurements.',
      },
    ],
    documents: [
      {
        id: 'doc-m1',
        title: 'Jharia Subsurface Void Acoustic Analysis Report',
        type: 'PDF',
        date: '10 Feb 2026',
        size: '3.1 MB',
      },
      {
        id: 'doc-m2',
        title: 'Micro-Seismic Geophone Specification & Sensor Layout',
        type: 'PDF',
        date: '20 Jan 2026',
        size: '1.5 MB',
      },
    ],
    impact: {
      currentOutputs: [
        { label: 'Settlements Covered', value: '4 Wards', desc: 'Highest vulnerability sectors in Jharia' },
        { label: 'Protected Population', value: '15,000+', desc: 'Residents inside subsidence hazard contour' },
        { label: 'Sensors Calibrated', value: '12 Units', desc: 'Borehole geophones ready for deployment' },
      ],
      targetOutcomes: [
        { label: 'Evacuation Lead Time', value: '6 Hours', desc: 'Notice before surface ground fissure occurs' },
        { label: 'False Alarm Rate', value: '< 2%', desc: 'Discriminator filtering heavy truck transit' },
        { label: 'Ward Safety Coverage', value: '100%', desc: 'High-risk coal belt settlement protection' },
      ],
      evidenceStatus: {
        baselineData: 'COLLECTED',
        pilotData: 'IN_PROGRESS',
        impactValidation: 'PENDING',
      },
    },
  },

  'PRJ-2026-0007': {
    challenge: {
      id: 'JS-2026-00019',
      title: 'Low Agricultural Yield Due to Untested Highly Acidic Soils',
      location: 'Bishunpur Block, Gumla',
    },
    idea: {
      id: 'IDEA-2026-0007',
      title: 'Electrochemical Soil Chemistry Probes & Vernacular Audio Advisories',
    },
    mission: {
      problem:
        'Red laterite soils across Gumla have high acidity (pH < 5.0) and severe phosphorus fixation, depressing millet and pulse yields by 45%. Conventional laboratory soil testing takes 4 months, missing planting seasons.',
      approach:
        'A handheld micro-fluidic electrochemical probe that measures active pH, electrical conductivity, and nitrate/phosphate levels in 3 minutes, generating spoken audio fertilizer and lime recommendations in Sadri and Kurukh.',
      expectedOutcome:
        'A 28% increase in crop yield, 500 smallholder tribal farmers reached, and optimized agricultural lime dosing saving ₹4,200 per hectare.',
    },
    successCriteria: [
      {
        label: 'Soil Test Turnaround Time',
        baseline: '90 to 120 days (state testing lab)',
        target: 'Under 3 minutes at the farmer field boundary',
      },
      {
        label: 'Nutrient Calibration Accuracy',
        baseline: 'Uncalibrated empirical guessing',
        target: 'Within 8% variance of spectrophotometer lab tests',
      },
      {
        label: 'Millet & Pulse Yield Gain',
        baseline: '8.5 quintals / hectare',
        target: '11.2 quintals / hectare with lime amendment',
      },
    ],
    milestones: [
      {
        id: 'ms-s1',
        phase: 'PHASE 1',
        period: 'Sep 2025',
        title: 'Soil Sample Baseline Mapping in Bishunpur',
        description: 'Analyzed 120 soil cores from upland tribal farming plots across 6 Gram Panchayats.',
        deliverables: ['Acidity Geographic Map', 'Nutrient Deficiency Profile'],
        owner: 'Birsa Agricultural University',
        status: 'COMPLETED',
      },
      {
        id: 'ms-s2',
        phase: 'PHASE 2',
        period: 'Nov 2025',
        title: 'Miniature Electrochemical Sensor Prototyping',
        description: 'Built ion-selective electrode array calibrated specifically for acidic laterite substrates.',
        deliverables: ['Working Probe Hardware', 'Calibration Algorithm'],
        owner: 'BAU & AgriTech Innovation Lab',
        status: 'COMPLETED',
      },
      {
        id: 'ms-s3',
        phase: 'PHASE 3',
        period: 'Jan 2026',
        title: 'Vernacular Audio Advisory Integration',
        description: 'Created text-to-speech audio advisory generator in Sadri, Kurukh, and Mundari.',
        deliverables: ['Vernacular Audio Library', 'Bluetooth Diagnostic App'],
        owner: 'Vikas Bharti Bishunpur',
        status: 'COMPLETED',
      },
      {
        id: 'ms-s4',
        phase: 'PHASE 4',
        period: 'Feb 2026 – Present',
        title: 'Farmer Field Trials Across 12 Villages',
        description: 'Equipped 15 local Krishi Mitras with portable kits to test 500 smallholder plots before sowing.',
        deliverables: ['500 Soil Cards Issued', 'Lime Distribution Tracking'],
        owner: 'Krishi Vigyan Kendra Gumla',
        status: 'IN_PROGRESS',
      },
      {
        id: 'ms-s5',
        phase: 'PHASE 5',
        period: 'May 2026',
        title: 'Harvest Yield Comparison & Soil Restoration Audit',
        description: 'Post-harvest measurement of finger millet (Ragi) and pigeon pea production.',
        deliverables: ['Harvest Yield Audit Report', 'Economics Case Study'],
        owner: 'BAU Faculty of Agriculture',
        status: 'UPCOMING',
      },
      {
        id: 'ms-s6',
        phase: 'PHASE 6',
        period: 'Jul 2026',
        title: 'Statewide Krishi Mitra Kit Rollout Blueprint',
        description: 'Submission to Jharkhand Department of Agriculture for 24-district scaling.',
        deliverables: ['Policy Proposal', 'MSME Manufacturing Blueprint'],
        owner: 'Consortium Steering Committee',
        status: 'UPCOMING',
      },
    ],
    team: [
      {
        id: 'tm-s1',
        name: 'Dr. Arvind Minz',
        role: 'Faculty Mentor',
        title: 'Professor of Soil Science & Agricultural Chemistry',
        specialty: 'Laterite Soil Chemistry & Acid Soil Reclamation',
        institution: 'Birsa Agricultural University',
        avatarInitials: 'AM',
      },
      {
        id: 'tm-s2',
        name: 'Sushila Bhagat',
        role: 'Field Coordinator',
        title: 'Lead Krishi Mitra Coordinator',
        specialty: 'Tribal Farmer Extension & Vernacular Advisories',
        institution: 'Vikas Bharti Bishunpur',
        avatarInitials: 'SB',
      },
      {
        id: 'tm-s3',
        name: 'Manish Chawla',
        role: 'Technical Lead',
        title: 'Hardware Systems Architect',
        specialty: 'Ion-Selective Electrochemistry & Rugged Portable Devices',
        institution: 'AgriTech Innovation Partner',
        avatarInitials: 'MC',
      },
    ],
    activity: [
      {
        id: 'act-s1',
        timestamp: 'TODAY',
        title: 'Soil test cards issued to 45 additional smallholders',
        description: 'Krishi Mitras in Banari village completed pre-sowing pH tests for upland millet plots.',
      },
      {
        id: 'act-s2',
        timestamp: '4 DAYS AGO',
        title: 'Kurukh voice module successfully validated in field',
        description: 'Elderly non-literate farmers successfully understood spoken audio fertilizer dosage instructions.',
      },
      {
        id: 'act-s3',
        timestamp: '2 WEEKS AGO',
        title: 'Agricultural lime distribution hub established',
        description: 'Cooperative depot established at Bishunpur KVK to supply low-cost soil neutralizing amendments.',
      },
    ],
    documents: [
      {
        id: 'doc-s1',
        title: 'Laterite Soil Acidity & Micronutrient Benchmark Dossier',
        type: 'PDF',
        date: '18 Jan 2026',
        size: '2.8 MB',
      },
      {
        id: 'doc-s2',
        title: 'Electrochemical Ion-Selective Sensor Calibration Manual',
        type: 'PDF',
        date: '02 Feb 2026',
        size: '1.2 MB',
      },
    ],
    impact: {
      currentOutputs: [
        { label: 'Farmers Tested', value: '500+', desc: 'Tribal smallholders with verified soil cards' },
        { label: 'Villages Covered', value: '12', desc: 'Hamlets in Bishunpur block active in pilot' },
        { label: 'Krishi Mitras Trained', value: '15', desc: 'Local youths operating portable test kits' },
      ],
      targetOutcomes: [
        { label: 'Millet Yield Increase', value: '28%', desc: 'Projected boost from pH neutralization' },
        { label: 'Input Cost Savings', value: '₹4,200/ha', desc: 'Preventing wasted unabsorbed NPK fertilizer' },
        { label: 'Turnaround Time', value: '3 Minutes', desc: 'Instant testing versus 4-month lab delay' },
      ],
      evidenceStatus: {
        baselineData: 'COLLECTED',
        pilotData: 'IN_PROGRESS',
        impactValidation: 'PENDING',
      },
    },
  },
};

/**
 * Returns customized or dynamically synthesized ProjectDetail for any projectId
 */
export function buildProjectDetail(baseProject: Project): ProjectDetail {
  const specific = PROJECT_DETAILS_DATA[baseProject.id] || PROJECT_DETAILS_DATA[baseProject.projectCode];

  if (specific) {
    return {
      ...baseProject,
      description: baseProject.description,
      summary: baseProject.summary || baseProject.oneLineDescription,
      challenge: specific.challenge || {
        id: baseProject.challengeId || 'JS-2026-00024',
        title: baseProject.challengeTitle || 'Community Societal Challenge',
        location: baseProject.locationDisplay,
      },
      idea: specific.idea || {
        id: baseProject.ideaId || 'IDEA-2026-0001',
        title: baseProject.title,
      },
      mission: specific.mission || {
        problem: baseProject.description,
        approach: baseProject.oneLineDescription,
        expectedOutcome: `Validated field implementation delivering ${baseProject.impactMetric}.`,
      },
      successCriteria: specific.successCriteria || [
        {
          label: 'Core Technology Field Efficacy',
          baseline: '0% Deployment',
          target: 'Over 90% reliable continuous field operation',
        },
        {
          label: 'Community Adoption Index',
          baseline: 'Conventional manual process',
          target: 'Over 80% stakeholder satisfaction and usage',
        },
      ],
      milestones: specific.milestones || generateMilestonesForStage(baseProject),
      team: specific.team || generateTeamForProject(baseProject),
      workstreams: [
        {
          id: 'ws-1',
          title: 'Field Execution & Deployment',
          description: `Operating field testing and telemetry validation in ${baseProject.district}.`,
          progress: `${baseProject.progressPercentage}%`,
          status: 'Active',
          metric: `${baseProject.milestoneProgress.completed}/${baseProject.milestoneProgress.total} Milestones`,
        },
        {
          id: 'ws-2',
          title: 'Stakeholder & Institutional Liaison',
          description: `Coordinating with ${baseProject.leadInstitution} and local administration.`,
          progress: '70%',
          status: 'On Track',
          metric: `${baseProject.partners.length} Partners Engaged`,
        },
      ],
      deliverables: [
        {
          id: 'del-1',
          title: 'Field Pilot Architecture & Sensor Protocol',
          owner: baseProject.leadInstitution,
          status: 'COMPLETED',
          date: 'January 2026',
        },
        {
          id: 'del-2',
          title: 'Mid-Term Operational & Telemetry Report',
          owner: 'Joint Consortium',
          status: 'IN_REVIEW',
          date: 'March 2026',
        },
      ],
      fieldImplementation: {
        district: baseProject.district,
        block: baseProject.block || 'District Center',
        targetPoints: 20,
        installedPoints: 14,
        progressPercentage: baseProject.progressPercentage,
        communityPartners: baseProject.partners.filter((p) => p.type === 'COMMUNITY').length || 2,
        telemetryNotes: `Real-time monitoring active across ${baseProject.district}.`,
      },
      documents: specific.documents || [
        {
          id: 'doc-1',
          title: `${baseProject.title} — Field Dossier`,
          type: 'PDF',
          date: '12 Feb 2026',
          size: '2.1 MB',
        },
        {
          id: 'doc-2',
          title: 'Consortium Operational Specification',
          type: 'PDF',
          date: '20 Jan 2026',
          size: '1.4 MB',
        },
      ],
      impact: specific.impact || {
        currentOutputs: [
          {
            label: 'Potential Beneficiaries',
            value: baseProject.beneficiaries ? `${baseProject.beneficiaries.toLocaleString()}+` : '1,500+',
            desc: 'Direct community coverage',
          },
          {
            label: 'Field Locations',
            value: '4 Sites',
            desc: `Deployments across ${baseProject.district}`,
          },
          {
            label: 'Milestones Reached',
            value: `${baseProject.milestoneProgress.completed} of ${baseProject.milestoneProgress.total}`,
            desc: 'Validated execution gates',
          },
        ],
        targetOutcomes: [
          {
            label: 'Efficiency Boost',
            value: '35%',
            desc: 'Improvement over baseline empirical metrics',
          },
          {
            label: 'District Scale Target',
            value: `${baseProject.district} Wide`,
            desc: 'Replication after pilot sign-off',
          },
        ],
        evidenceStatus: {
          baselineData: 'COLLECTED',
          pilotData: 'IN_PROGRESS',
          impactValidation: 'PENDING',
        },
      },
      activity: specific.activity || [
        {
          id: 'act-gen-1',
          timestamp: 'TODAY',
          title: `${baseProject.title} milestone advance`,
          description: `Consortium completed field calibration review in ${baseProject.locationDisplay}.`,
        },
        {
          id: 'act-gen-2',
          timestamp: '3 DAYS AGO',
          title: 'Technical review with lead institution',
          description: `Engineers from ${baseProject.leadInstitution} validated prototype performance metrics.`,
        },
        {
          id: 'act-gen-3',
          timestamp: '1 WEEK AGO',
          title: 'Community consultation conducted',
          description: `Field coordinators met with local village stakeholders in ${baseProject.district}.`,
        },
      ],
    };
  }

  // Dynamic synthesis for any other project
  return {
    ...baseProject,
    description: baseProject.description,
    summary: baseProject.summary || baseProject.oneLineDescription,
    challenge: {
      id: baseProject.challengeId || 'JS-2026-00024',
      title: baseProject.challengeTitle || `Societal Challenge in ${baseProject.domain}`,
      location: baseProject.locationDisplay,
    },
    idea: {
      id: baseProject.ideaId || 'IDEA-2026-0001',
      title: `${baseProject.title} Concept Hypothesis`,
    },
    mission: {
      problem: baseProject.description,
      approach: baseProject.oneLineDescription,
      expectedOutcome: `Validated field implementation delivering ${baseProject.impactMetric}.`,
    },
    successCriteria: [
      {
        label: 'Field Operational Reliability',
        baseline: '0% deployed',
        target: 'Over 92% sustained uptime in local field conditions',
      },
      {
        label: 'Beneficiary Adoption & Trust',
        baseline: 'Conventional manual process',
        target: 'Over 80% positive community outcome survey',
      },
    ],
    milestones: generateMilestonesForStage(baseProject),
    team: generateTeamForProject(baseProject),
    workstreams: [
      {
        id: 'ws-1',
        title: 'Core Development & Field Prototyping',
        description: `Engineering execution in ${baseProject.district}.`,
        progress: `${baseProject.progressPercentage}%`,
        status: 'Active',
        metric: `${baseProject.milestoneProgress.completed}/${baseProject.milestoneProgress.total} Done`,
      },
    ],
    deliverables: [
      {
        id: 'del-1',
        title: 'Technical Blueprint & Operating Architecture',
        owner: baseProject.leadInstitution,
        status: 'COMPLETED',
        date: 'January 2026',
      },
    ],
    fieldImplementation: {
      district: baseProject.district,
      block: baseProject.block || 'District Hub',
      targetPoints: 15,
      installedPoints: 10,
      progressPercentage: baseProject.progressPercentage,
      communityPartners: 2,
      telemetryNotes: `Field testing in ${baseProject.district}.`,
    },
    documents: [
      {
        id: 'doc-gen-1',
        title: `${baseProject.title} — Milestone Dossier`,
        type: 'PDF',
        date: '10 Feb 2026',
        size: '1.9 MB',
      },
    ],
    impact: {
      currentOutputs: [
        {
          label: 'Beneficiaries Covered',
          value: baseProject.beneficiaries ? `${baseProject.beneficiaries.toLocaleString()}+` : '1,200+',
          desc: 'Direct citizen reach',
        },
        {
          label: 'Milestones Completed',
          value: `${baseProject.milestoneProgress.completed} of ${baseProject.milestoneProgress.total}`,
          desc: 'Verified progress gates',
        },
      ],
      targetOutcomes: [
        {
          label: 'Societal Impact',
          value: 'High',
          desc: `Measurable progress across ${baseProject.domain}`,
        },
      ],
      evidenceStatus: {
        baselineData: 'COLLECTED',
        pilotData: 'IN_PROGRESS',
        impactValidation: 'PENDING',
      },
    },
    activity: [
      {
        id: 'act-dyn-1',
        timestamp: 'TODAY',
        title: 'Sprint update logged',
        description: `Project team logged activity update for ${baseProject.stageLabel}.`,
      },
      {
        id: 'act-dyn-2',
        timestamp: '2 DAYS AGO',
        title: 'Milestone telemetry sync',
        description: `Partner review held with ${baseProject.leadInstitution}.`,
      },
    ],
  };
}

function generateMilestonesForStage(p: Project): ProjectMilestone[] {
  const completedCount = p.milestoneProgress.completed;
  const titles = [
    'Community Problem & Context Validation',
    'Consortium Formation & Research Review',
    'Core Prototype Architecture & Bench Testing',
    'Hardware / Software Weatherization Trials',
    'District Field Pilot Deployment',
    'Impact Verification & Scaling Blueprint',
  ];

  return titles.map((title, i) => {
    let status: ProjectMilestone['status'] = 'UPCOMING';
    if (i < completedCount) {
      status = 'COMPLETED';
    } else if (i === completedCount) {
      status = 'IN_PROGRESS';
    }

    return {
      id: `ms-auto-${i + 1}`,
      phase: `PHASE ${i + 1}`,
      period: `Q${(i % 4) + 1} 2026`,
      title,
      description: `Structured milestone delivering verified outcomes for ${p.domain}.`,
      deliverables: [`Deliverable ${i + 1}.1`, `Audit Report ${i + 1}.2`],
      owner: i % 2 === 0 ? p.leadInstitution : (p.partners[1]?.name || 'Consortium Team'),
      status,
    };
  });
}

function generateTeamForProject(p: Project): ProjectMember[] {
  const partners = p.partners;
  return [
    {
      id: 'tm-1',
      name: 'Dr. Ramesh Soren',
      role: 'Faculty Mentor',
      title: 'Professor & Research Director',
      specialty: `${p.domain} Engineering & Field Deployment`,
      institution: p.leadInstitution,
      avatarInitials: 'RS',
    },
    {
      id: 'tm-2',
      name: 'Pooja Kumari',
      role: 'Student Researcher',
      title: 'Senior Research Scholar',
      specialty: 'Data Telemetry & Hardware Systems',
      institution: p.leadInstitution,
      avatarInitials: 'PK',
    },
    {
      id: 'tm-3',
      name: 'Manoj Tirkey',
      role: 'Field Coordinator',
      title: 'District Community Representative',
      specialty: 'Community Liaison & Ground Operations',
      institution: partners.find((pt) => pt.type === 'COMMUNITY')?.name || `${p.district} Citizen Forum`,
      avatarInitials: 'MT',
    },
    {
      id: 'tm-4',
      name: 'Vikramaditya Sahay',
      role: 'Technical Lead',
      title: 'Chief Technology Consultant',
      specialty: 'Industrial Ruggedization & Quality Assurance',
      institution: partners.find((pt) => pt.type === 'INDUSTRY')?.name || 'Innovation Partner',
      avatarInitials: 'VS',
    },
  ];
}
