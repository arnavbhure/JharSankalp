import {
  ChallengeDetailData,
  StakeholderCategory,
  EvidenceItem,
  SolutionApproach,
  LifecycleStageItem,
} from '../types/challengeDetail';
import { CHALLENGES_DATA } from './challengesData';

export const DHANBAD_MINING_DETAIL: ChallengeDetailData = {
  id: 'JS-2024-00003',
  title: 'Building an Early Warning System for Mine Subsidence Risks',
  category: 'Mining Safety',
  district: 'Dhanbad',
  subLocation: 'Jharia Coalfield Sector 4',
  locationCoordinates: {
    lat: 23.74,
    lon: 86.42,
    formatted: '23.74° N · 86.42° E',
    zoneName: 'JHARIA COALFIELD · HIGH-RISK ZONE',
  },
  status: 'OPEN FOR COLLABORATION',
  impactPriority: 'High Impact Priority',
  summary:
    'Communities living near active and abandoned mines in Jharia face recurring risks from land subsidence. A reliable early warning and monitoring system is needed to identify instability before it becomes dangerous.',
  problem: {
    background:
      'The Jharia Coalfield is one of India’s oldest and most densely mined energy reserves, containing over 20 workable coal seams extracted continuously since the late nineteenth century. Over decades of intensive underground extraction, legacy bord-and-pillar voids and undocumented artisanal extraction galleries have left vast subterranean cavities. Subterranean coal seam fires have further weakened rock strata stability, progressively creating unstable ground conditions below established civil settlements and transportation corridors.',
    currentSituation:
      'Over the past three seasons, recurring ground fissures, subsidence depressions, and foundation cracking have been reported across six high-density municipal wards including Lodna, Tisra, and Kujama. Over 15,000 residents live directly above or adjacent to geological fault zones where subterranean void collapse can propagate to surface levels without visible premonitory deformation.',
    whyExistingApproachesNotEnough:
      'Existing safety oversight relies predominantly on retrospective citizen incident reports or quarterly optical theodolite surface surveys conducted at long intervals. In areas subject to thermal stress and underground seam shifting, shear stress transitions can precipitate surface failure within hours. There is currently no continuous real-time telemetry network that correlates micro-seismic acoustic emissions, borehole tiltmetry, and satellite InSAR deformation data to distribute reliable 24- to 48-hour alerts to frontline community disaster teams.',
  },
  profile: {
    district: 'Dhanbad',
    focusArea: 'Mining Safety',
    primaryStakeholders: ['Local Communities', 'Mining Authorities', 'Research Institutions'],
    dateSubmitted: '12 March 2026',
    adminDepartment: 'Dept. of Mines & Geology, Govt. of Jharkhand',
    trackingId: 'JS-CASE-DNB-26043-03',
  },
  impactMetrics: {
    affectedResidents: '15,000+',
    highRiskLocations: '37',
    communitiesInvolved: '6',
    statement:
      'The challenge affects communities living near vulnerable mining zones and requires collaboration between technical institutions, industry experts and local authorities.',
  },
  evidenceTimeline: [
    {
      year: '2023',
      dateStr: 'September 2023',
      observation:
        'Increased reports of ground cracks near residential structures and access roads in Lodna.',
      sourceType: 'Local Community Field Log & Ward Observation Reports',
      verified: true,
      docketId: 'LOG-2023-0941',
    },
    {
      year: '2024',
      dateStr: 'June 2024',
      observation:
        'Local geological surveys identified 37 high-risk zones exhibiting subsurface thermal subsidence acceleration.',
      sourceType: 'Gram Panchayat Safety Audit & Regional Geotechnical Reconnaissance',
      verified: true,
      docketId: 'AUDIT-2024-0418',
    },
    {
      year: '2025',
      dateStr: 'November 2025',
      observation:
        'Community organizations formally requested multi-sensor early warning telemetry and automated evacuation sirens.',
      sourceType: 'District Public Grievance Docket #DNB-2025-0814',
      verified: true,
      docketId: 'DOCKET-2025-0814',
    },
    {
      year: '2026',
      dateStr: '12 March 2026',
      observation:
        'Challenge formally submitted and accepted into JharSankalp Innovation Exchange for consortium matching.',
      sourceType: 'State Innovation Exchange Intake · Dept. of Higher & Technical Education',
      verified: true,
      docketId: 'JS-2024-00003-ENTRY',
    },
  ],
  solutionApproaches: [
    {
      number: 'Approach 01',
      title: 'IoT-Based Ground Movement Sensors',
      description:
        'Distributed low-power borehole tiltmeters, strain gauges, and subterranean acoustic extensometers installed across critical shear zones to continuously stream micro-displacement telemetry to a cloud monitoring station.',
      status: 'Under Discussion',
      feasibilityNotes:
        'Pilot hardware testbench under review with mining telemetry engineering teams.',
      potentialPartners: ['IIT (ISM) Dhanbad', 'Mining IoT Hardware Consortium'],
    },
    {
      number: 'Approach 02',
      title: 'AI-Assisted Risk Prediction',
      description:
        'Machine learning models trained on historical geological borehole data, satellite InSAR displacement rates, and rainfall percolation indices to predict ground shift probability 48–72 hours before surface manifestation.',
      status: 'Research Needed',
      feasibilityNotes:
        'Requires high-resolution satellite radar pass datasets and calibrated ground truth anchors.',
      potentialPartners: ['Geospatial Research Group', 'Data Science Faculty'],
    },
    {
      number: 'Approach 03',
      title: 'Community Alert Network',
      description:
        'A resilient decentralized local communications mesh combining solar-powered ward audio sirens, emergency SMS broadcasts, and volunteer mobile push notifications to initiate orderly preventative evacuations.',
      status: 'Under Discussion',
      feasibilityNotes:
        'Draft standard operating procedure prepared with local panchayat disaster volunteers.',
      potentialPartners: ['Civil Society Taskforces', 'District Disaster Authority'],
    },
  ],
  stakeholders: [
    {
      categoryName: 'Universities & Academic Labs',
      description: 'Faculty researchers, graduate engineers, and geotechnical testing laboratories',
      partners: [
        {
          name: 'IIT (ISM) Dhanbad',
          role: 'Geotechnical Engineering & Rock Mechanics Laboratory',
          organizationType: 'University',
          contributionArea:
            'Subsurface modeling, acoustic emission sensor calibration, and geological stratum analysis',
        },
        {
          name: 'BIT Sindri',
          role: 'Department of Mining Engineering',
          organizationType: 'University',
          contributionArea:
            'Field sensor deployment, localized environmental telemetry, and student research teams',
        },
      ],
    },
    {
      categoryName: 'Industry & Technical Partners',
      description:
        'Industrial sensor fabricators, telemetry providers, and geospatial telemetry specialists',
      partners: [
        {
          name: 'Mining Technology Partners',
          role: 'Industrial Hardware & Telemetry R&D Group',
          organizationType: 'Industry',
          contributionArea:
            'Supply of intrinsically safe borehole sensors and wireless mesh repeater nodes',
        },
        {
          name: 'Geospatial Research Organizations',
          role: 'Radar & InSAR Satellite Remote Sensing Group',
          organizationType: 'Industry',
          contributionArea:
            'Bi-weekly differential satellite radar interferometry to monitor multi-square-kilometer ground elevation shifts',
        },
      ],
    },
    {
      categoryName: 'Community Stakeholders & Civil Society',
      description: 'Resident associations, gram panchayats, and grassroots field observers',
      partners: [
        {
          name: 'Local Community Representatives',
          role: 'Jharia Ward 12 & Lodna Citizen Action Committee',
          organizationType: 'Community',
          contributionArea:
            'Physical ground truth reporting, weekly crack inspection logs, and evacuation route feedback',
        },
        {
          name: 'Civil Society Organizations',
          role: 'Jharkhand Disaster Preparedness & Citizen Safety Forum',
          organizationType: 'Community',
          contributionArea:
            'Citizen safety training, vernacular awareness drills, and community siren maintenance',
        },
      ],
    },
  ],
  lifecycleStages: [
    {
      stage: 'Identify',
      status: 'completed',
      label: 'Identify',
      summary:
        'Ground crack observation logged by citizen dockets and corroborated by Gram Panchayat safety audits.',
      completedDate: 'Sep 2023',
    },
    {
      stage: 'Validate',
      status: 'completed',
      label: 'Validate',
      summary:
        'State technical review confirmed high geological subsidence severity and assigned High Impact Priority.',
      completedDate: 'Mar 2026',
    },
    {
      stage: 'Research',
      status: 'current',
      label: 'Research & Solution Exploration',
      summary:
        'Cross-institution research consortium exploring IoT acoustic sensors, InSAR satellite correlation, and automated alert sirens.',
    },
    {
      stage: 'Build',
      status: 'upcoming',
      label: 'Build Prototype',
      summary:
        'Fabrication of integrated low-power sensor pilot pods and testing of telemetry dashboard.',
    },
    {
      stage: 'Pilot',
      status: 'upcoming',
      label: 'Field Pilot',
      summary:
        'Controlled deployment of 12 sensor nodes in Jharia Sector 4 with live resident warning verification.',
    },
    {
      stage: 'Impact',
      status: 'upcoming',
      label: 'Scale & Policy',
      summary:
        'Integration with District Disaster Management Authority emergency warning protocol statewide.',
    },
  ],
  stats: {
    collaboratorsCount: 12,
    ideasCount: 8,
    followersCount: 142,
  },
  relatedChallengeIds: ['JS-2024-00015', 'JS-2024-00019', 'JS-2024-00018'],
};

export const KHUNTI_WATER_DETAIL: ChallengeDetailData = {
  id: 'JS-2026-00024',
  title: 'Intermittent Handpump Breakdowns & Delayed Rural Water Restorations in Khunti',
  category: 'Water Management',
  district: 'Khunti',
  subLocation: 'Murhu Block, Hamlets 4–9',
  locationCoordinates: {
    lat: 23.08,
    lon: 85.28,
    formatted: '23.08° N · 85.28° E',
    zoneName: 'KHUNTI · MURHU GROUNDWATER AQUIFER CORRIDOR',
  },
  status: 'ACTIVE PILOT',
  impactPriority: 'High Impact Priority',
  summary:
    'Over 18 rural hamlets face recurring drinking water disruptions due to sub-surface mechanical valve fatigue in India Mark II handpumps. Unmonitored failures leave communities without clean water for an average of 18 days.',
  problem: {
    background:
      'Murhu Block in Khunti district is predominantly rural and hilly, where over 85% of households rely on community borewells and India Mark II deep-well handpumps for daily drinking and domestic water. During the dry season (March to June), water tables drop significantly, increasing the mechanical stroke burden on underground pump rods and seal cups.',
    currentSituation:
      'Over 18 hamlets across 4 Gram Panchayats report recurring pump breakdowns. Because there is zero continuous telemetry or remote sensing on handpump assets, block maintenance mechanics only learn of failures when a village mukhiya files a manual paper requisition weeks later.',
    whyExistingApproachesNotEnough:
      'Scheduled preventive inspections happen only once or twice a year due to sparse block technician staffing. A clamp-on, self-powered acoustic vibration telemetry collar can continuously track mechanical stroke count and transmit premature wear alerts before mechanical seizure occurs.',
  },
  profile: {
    district: 'Khunti',
    focusArea: 'Water Management',
    primaryStakeholders: ['Village Water Committees', 'Panchayati Raj Dept.', 'BIT Mesra'],
    dateSubmitted: '10 March 2026',
    adminDepartment: 'Dept. of Drinking Water & Sanitation, Govt. of Jharkhand',
    trackingId: 'JS-CASE-KHT-26024-01',
  },
  impactMetrics: {
    affectedResidents: '2,000+',
    highRiskLocations: '18 Hamlets',
    communitiesInvolved: '4 Panchayats',
    statement:
      'Resolving this challenge restores reliable potable water to rural households and cuts repair latency from 18 days down to under 48 hours.',
  },
  evidenceTimeline: [
    {
      year: '2024',
      dateStr: 'November 2024',
      observation:
        'Gram Panchayat audits record 34 pump breakdowns across Murhu with average 21-day downtime.',
      sourceType: 'Panchayat Grievance Logs',
      verified: true,
      docketId: 'LOG-KHT-2024-1102',
    },
    {
      year: '2025',
      dateStr: 'May 2025',
      observation:
        'Severe drinking water scarcity in Hamlets 5 & 7 following simultaneous seal failure.',
      sourceType: 'Community Water Audit',
      verified: true,
      docketId: 'AUDIT-KHT-2025-0520',
    },
    {
      year: '2026',
      dateStr: '10 March 2026',
      observation:
        'Challenge accepted into JharSankalp and matched with BIT Mesra IoT engineering team.',
      sourceType: 'State Innovation Clearinghouse',
      verified: true,
      docketId: 'JS-2026-00024-INTAKE',
    },
  ],
  solutionApproaches: [
    {
      number: 'Approach 01',
      title: 'Acoustic Stroke Vibration Collar',
      description:
        'A weatherproof piezoelectric collar clamped to the handpump head that detects mechanical stroke irregularity and sends LoRaWAN signals.',
      status: 'Under Discussion',
      feasibilityNotes: 'Engineered by BIT Mesra; prototype bench testing completed.',
      potentialPartners: ['BIT Mesra', 'JharSankalp Water Consortium'],
    },
  ],
  stakeholders: [
    {
      categoryName: 'Universities & Academic Labs',
      description: 'Water resources engineering, hydrology, and embedded telemetry laboratories',
      partners: [
        {
          name: 'BIT Mesra',
          role: 'Department of Civil & Environmental Engineering',
          organizationType: 'University',
          contributionArea: 'Acoustic piezoelectric telemetry calibration and pump failure prediction',
        },
      ],
    },
    {
      categoryName: 'Community Stakeholders & Civil Society',
      description: 'Gram panchayats, Jal Sahiyas, and village water user committees',
      partners: [
        {
          name: 'Murhu Jal Sahiya Collective',
          role: 'Panchayat Drinking Water Cadre',
          organizationType: 'Community',
          contributionArea: 'Field ground-truth reporting and sensor collar maintenance logs',
        },
      ],
    },
  ],
  lifecycleStages: [
    {
      stage: 'Identify',
      status: 'completed',
      label: 'Challenge Identified',
      summary: 'Verified community problem submitted by Murhu Gram Panchayat.',
    },
    {
      stage: 'Research',
      status: 'completed',
      label: 'Research & Solution Matching',
      summary: 'Matched with BIT Mesra IoT & Embedded Systems Laboratory.',
    },
    {
      stage: 'Build',
      status: 'completed',
      label: 'Prototype Built',
      summary: 'Low-power LoRa collar bench tested.',
    },
    {
      stage: 'Pilot',
      status: 'current',
      label: 'Field Pilot in Progress',
      summary: '10 pilot handpump nodes active in Murhu under project PRJ-2026-0012.',
    },
    {
      stage: 'Impact',
      status: 'upcoming',
      label: 'Scale Across State',
      summary: 'District-wide rollout planned for 1,200 rural water points.',
    },
  ],
  stats: {
    collaboratorsCount: 14,
    ideasCount: 3,
    followersCount: 168,
  },
  relatedChallengeIds: ['JS-2024-00003', 'JS-2026-00005', 'JS-2026-00015'],
};

export const DOMAIN_DEPARTMENT_MAP: Record<string, string> = {
  'Water Management': 'Dept. of Drinking Water & Sanitation, Govt. of Jharkhand',
  Agriculture: 'Dept. of Agriculture, Animal Husbandry & Co-operative, Govt. of Jharkhand',
  'Mining Safety': 'Dept. of Mines & Geology, Govt. of Jharkhand',
  Healthcare: 'Dept. of Health, Medical Education & Family Welfare, Govt. of Jharkhand',
  Education: 'Dept. of School Education & Literacy, Govt. of Jharkhand',
  Environment: 'Dept. of Forest, Environment & Climate Change, Govt. of Jharkhand',
  Infrastructure: 'Road Construction & Rural Works Dept., Govt. of Jharkhand',
  'Roads & Infrastructure': 'Road Construction Dept., Govt. of Jharkhand',
  Energy: 'Dept. of Energy / JREDA, Govt. of Jharkhand',
  'Urban Development': 'Urban Development & Housing Dept., Govt. of Jharkhand',
  Sanitation: 'Dept. of Drinking Water & Sanitation, Govt. of Jharkhand',
  'Rural Livelihoods': 'Rural Development Dept. (JSLPS), Govt. of Jharkhand',
  'Disaster Management': 'Disaster Management Division, Dept. of Home, Govt. of Jharkhand',
  'Technology & Ethics': 'Dept. of Information Technology & e-Governance, Govt. of Jharkhand',
  General: 'State Innovation Council, Govt. of Jharkhand',
};

export const DOMAIN_STAKEHOLDER_MAP: Record<string, StakeholderCategory[]> = {
  'Water Management': [
    {
      categoryName: 'Academic & Engineering Labs',
      description: 'Water resources engineering, hydrology, and sensor telemetry',
      partners: [
        {
          name: 'BIT Mesra',
          role: 'Civil & Environmental Engineering',
          organizationType: 'University',
          contributionArea: 'Groundwater hydrology and automated sensor telemetry',
        },
      ],
    },
    {
      categoryName: 'Community & Field Collectives',
      description: 'Village water committees, Jal Sahiyas, and grassroots field observers',
      partners: [
        {
          name: 'Jal Sahiya Collective',
          role: 'Community Water Vanguard',
          organizationType: 'Community',
          contributionArea: 'Ground truth logging, pump status monitoring, and village outreach',
        },
      ],
    },
  ],
  Agriculture: [
    {
      categoryName: 'Agricultural Research Institutions',
      description: 'Agronomy faculty, soil scientists, and cold chain researchers',
      partners: [
        {
          name: 'Birsa Agricultural University (BAU)',
          role: 'Department of Agronomy',
          organizationType: 'University',
          contributionArea: 'Soil testing protocols and post-harvest preservation research',
        },
      ],
    },
    {
      categoryName: 'Field Extension & Farmer Groups',
      description: 'Krishi Vigyan Kendras, Farmer Producer Organizations (FPOs)',
      partners: [
        {
          name: 'Krishi Vigyan Kendra (KVK)',
          role: 'District Extension Unit',
          organizationType: 'Government',
          contributionArea: 'Field trials, farmer demonstration, and localized advisory',
        },
      ],
    },
  ],
  Infrastructure: [
    {
      categoryName: 'Technical & Civil Engineering Labs',
      description: 'Transportation engineering, material durability, and all-weather pavement design',
      partners: [
        {
          name: 'BIT Sindri',
          role: 'Department of Civil Engineering',
          organizationType: 'University',
          contributionArea: 'Geotechnical soil stabilization and all-weather pavement prototyping',
        },
      ],
    },
    {
      categoryName: 'Community Infrastructure Committees',
      description: 'Gram panchayat road committees and rural transport associations',
      partners: [
        {
          name: 'Gram Panchayat Infrastructure Committee',
          role: 'Ground Monitoring Cell',
          organizationType: 'Community',
          contributionArea: 'Road bottleneck mapping and localized flood drainage reporting',
        },
      ],
    },
  ],
  Healthcare: [
    {
      categoryName: 'Medical Research & Healthcare Labs',
      description: 'Public health researchers, tele-diagnostics, and clinical outreach units',
      partners: [
        {
          name: 'RIMS Ranchi',
          role: 'Department of Community Medicine',
          organizationType: 'University',
          contributionArea: 'Diagnostic protocols and maternal healthcare outreach',
        },
      ],
    },
    {
      categoryName: 'Frontline Health Workers',
      description: 'ASHA workers, ANMs, and community health networks',
      partners: [
        {
          name: 'District ASHA Collective',
          role: 'Frontline Care Network',
          organizationType: 'Community',
          contributionArea: 'Field health surveys and rapid response coordination',
        },
      ],
    },
  ],
  Environment: [
    {
      categoryName: 'Environmental Research Labs',
      description: 'Forest ecology, pollution telemetry, and biodiversity monitoring',
      partners: [
        {
          name: 'Institute of Forest Productivity (IFP Ranchi)',
          role: 'Ecology & Agroforestry Lab',
          organizationType: 'University',
          contributionArea: 'Ecological impact assessment and sustainable reclamation',
        },
      ],
    },
  ],
  'Mining Safety': DHANBAD_MINING_DETAIL.stakeholders,
};

/**
 * Creates a domain-aware, dynamic ChallengeDetailData object from a database Challenge record.
 * GUARANTEE: Never falls back to Dhanbad/Jharia mining content for unrelated challenges.
 */
export function mapDbChallengeToDetailData(raw: any): ChallengeDetailData {
  if (!raw) {
    return createGenericPendingDetail();
  }

  // If this specifically is the seeded Dhanbad challenge ID, return DHANBAD_MINING_DETAIL
  if (raw.id === 'JS-2024-00003' || raw.publicId === 'JS-2024-00003') {
    return DHANBAD_MINING_DETAIL;
  }

  // If this specifically is the seeded Khunti challenge ID, return KHUNTI_WATER_DETAIL
  if (raw.id === 'JS-2026-00024' || raw.publicId === 'JS-2026-00024') {
    return KHUNTI_WATER_DETAIL;
  }

  const id = raw.publicId || raw.challengeCode || raw.id || 'JS-PENDING';
  const title = raw.title || 'Untitled Civic Challenge';
  const domain = (raw.domain || raw.category || 'General') as any;
  const district = raw.district?.name || (typeof raw.district === 'string' ? raw.district : 'Jharkhand');
  const subLocation = raw.block || raw.panchayatOrUlb || raw.subLocation || 'District Sector';
  const description = raw.description || raw.summary || '';
  const ai = raw.aiAnalysis || null;

  const lat = raw.latitude || (raw.district?.latitude ? Number(raw.district.latitude) : 23.34);
  const lon = raw.longitude || (raw.district?.longitude ? Number(raw.district.longitude) : 85.31);

  // Dynamic problem dossier
  const background =
    ai?.priorityReason ||
    ai?.summary ||
    `This challenge was officially documented and submitted by local stakeholders in ${district}, highlighting key operational and infrastructural bottlenecks requiring multi-sector intervention.`;

  const currentSituation =
    `${description}${raw.affectedPopulation ? ` Currently, approximately ${Number(raw.affectedPopulation).toLocaleString()}+ residents are directly impacted.` : ''}${raw.panchayatOrUlb ? ` Reports have been verified across ${raw.panchayatOrUlb}.` : ''}`.trim();

  let whyExistingApproachesNotEnough = '';
  if (ai?.possibleRootCauses && Array.isArray(ai.possibleRootCauses) && ai.possibleRootCauses.length > 0) {
    whyExistingApproachesNotEnough = `Key systemic constraints identified include: ${ai.possibleRootCauses.join('; ')}. Standard administrative or manual interventions face delays without dedicated technical and collaborative approaches.`;
  } else if (ai?.impactAssessment) {
    whyExistingApproachesNotEnough = `${ai.impactAssessment}. Conventional routine oversight has proved insufficient without continuous stakeholder collaboration and dedicated technical intervention.`;
  } else {
    whyExistingApproachesNotEnough = `Conventional reporting and fragmented response mechanisms experience operational delays. A structured, data-driven collaboration between technical institutions and district administration is needed to implement lasting solutions.`;
  }

  // Dynamic Impact Metrics
  const affectedResidents = raw.affectedPopulation
    ? `${Number(raw.affectedPopulation).toLocaleString()}+`
    : 'Community-wide';
  const highRiskLocations = raw.block ? `${raw.block} Block` : `${district} Sector`;
  const communitiesInvolved = raw.panchayatOrUlb || `${district} Wards`;
  const statement =
    ai?.impactAssessment ||
    description ||
    `Resolving this challenge addresses critical public infrastructure and community welfare in ${district}.`;

  // Dynamic Stakeholders for profile
  const primaryStakeholders =
    ai?.affectedStakeholders && Array.isArray(ai.affectedStakeholders) && ai.affectedStakeholders.length > 0
      ? ai.affectedStakeholders
      : ['Local Communities', `${district} Administration`, 'Technical Specialists'];

  // Admin Department
  const adminDepartment =
    DOMAIN_DEPARTMENT_MAP[domain] || 'State Innovation Council, Govt. of Jharkhand';

  // Dynamic Evidence Timeline
  const evidenceTimeline: EvidenceItem[] = [];
  if (raw.createdAt) {
    const createdDate = new Date(raw.createdAt);
    const dateStr = createdDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const yearStr = String(createdDate.getFullYear());

    evidenceTimeline.push({
      year: yearStr,
      dateStr,
      observation: `Challenge officially registered by citizen in JharSankalp repository for ${district}.`,
      sourceType: `${raw.sourceType || 'Citizen'} Intake Docket`,
      verified: true,
      docketId: `DOC-${id.slice(-6).toUpperCase()}`,
    });

    if (raw.aiAnalyzedAt || ai) {
      const aiDate = raw.aiAnalyzedAt ? new Date(raw.aiAnalyzedAt) : createdDate;
      evidenceTimeline.push({
        year: String(aiDate.getFullYear()),
        dateStr: aiDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        observation: `Civic intelligence engine analyzed submission: classified as ${domain} (${raw.priority || 'High'} Priority).`,
        sourceType: `JharSankalp Civic Engine · ${raw.aiModelVersion || 'v1.0'}`,
        verified: true,
        docketId: `AI-${id.slice(-6).toUpperCase()}`,
      });
    }

    evidenceTimeline.push({
      year: yearStr,
      dateStr: 'Current',
      observation: `Challenge status: ${(raw.status || 'SUBMITTED').toUpperCase()}. Open for multi-sector consortium proposals.`,
      sourceType: 'State Innovation Clearinghouse',
      verified: true,
    });
  }

  // Dynamic Solution Approaches (from real ideas or AI directions)
  const solutionApproaches: SolutionApproach[] = [];
  if (raw.ideas && Array.isArray(raw.ideas) && raw.ideas.length > 0) {
    raw.ideas.forEach((idea: any, idx: number) => {
      solutionApproaches.push({
        number: `Approach 0${idx + 1}`,
        title: idea.title,
        description: idea.description,
        status: idea.status === 'APPROVED' ? 'Under Discussion' : 'Research Needed',
        feasibilityNotes: `Submitted by ${idea.submittedBy?.name || 'Registered Contributor'} (${idea.submittedBy?.role || 'Innovator'}).`,
        potentialPartners: [`${domain} Solvers`, `${district} Taskforce`],
      });
    });
  } else if (ai?.suggestedApproach && Array.isArray(ai.suggestedApproach) && ai.suggestedApproach.length > 0) {
    ai.suggestedApproach.forEach((appr: string, idx: number) => {
      solutionApproaches.push({
        number: `Direction 0${idx + 1}`,
        title: appr.length > 45 ? `${appr.slice(0, 42)}...` : appr,
        description: appr,
        status: 'Research Needed',
        feasibilityNotes: 'Identified by civic intelligence engine as a high-potential intervention direction.',
        potentialPartners: [
          ai?.requiredExpertise?.[idx] || `${domain} Engineering Labs`,
          `${district} Taskforce`,
        ],
      });
    });
  } else if (ai?.innovationDirections && Array.isArray(ai.innovationDirections) && ai.innovationDirections.length > 0) {
    ai.innovationDirections.forEach((dir: string, idx: number) => {
      solutionApproaches.push({
        number: `Direction 0${idx + 1}`,
        title: dir.length > 45 ? `${dir.slice(0, 42)}...` : dir,
        description: dir,
        status: 'Research Needed',
        feasibilityNotes: 'Identified by civic intelligence engine as a high-potential intervention direction.',
        potentialPartners: [`${domain} Specialists`],
      });
    });
  }

  // Dynamic Stakeholders (from real collaborations or domain defaults)
  let stakeholders: StakeholderCategory[] = [];
  if (raw.collaborations && Array.isArray(raw.collaborations) && raw.collaborations.length > 0) {
    const partners = raw.collaborations.flatMap((collab: any) =>
      (collab.members || []).map((m: any) => ({
        name: m.user?.name || m.name || 'Collaborator',
        role: m.role || 'Contributor',
        organizationType: (m.organizationType || 'University') as any,
        contributionArea: m.contributionArea || 'Solution Co-Development',
      })),
    );
    if (partners.length > 0) {
      stakeholders = [
        {
          categoryName: 'Active Working Group Members',
          description: 'Registered collaborators engaged on this challenge',
          partners,
        },
      ];
    }
  }

  if (stakeholders.length === 0 && DOMAIN_STAKEHOLDER_MAP[domain]) {
    stakeholders = DOMAIN_STAKEHOLDER_MAP[domain];
  }

  // Dynamic Lifecycle Stages
  const rawStatus = (raw.status || 'SUBMITTED').toUpperCase();
  const lifecycleStages: LifecycleStageItem[] = [
    {
      stage: 'Identify',
      status: 'completed',
      label: 'Identify',
      summary: `Citizen problem logged and corroborated by ${district} local stakeholders.`,
      completedDate: raw.createdAt ? new Date(raw.createdAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : undefined,
    },
    {
      stage: 'Validate',
      status: rawStatus === 'SUBMITTED' ? 'current' : 'completed',
      label: 'Validate',
      summary: `Civic domain verified as ${domain} with ${raw.priority || 'High'} Impact Priority.`,
    },
    {
      stage: 'Research',
      status: ['UNDER_REVIEW', 'MATCHING', 'VALIDATED'].includes(rawStatus) ? 'current' : ['ACTIVE', 'IN_PROGRESS', 'RESOLVED'].includes(rawStatus) ? 'completed' : 'upcoming',
      label: 'Research & Solution Exploration',
      summary: `Consortium matching active with academic and technical research partners.`,
    },
    {
      stage: 'Build',
      status: ['ACTIVE', 'IN_PROGRESS'].includes(rawStatus) ? 'current' : rawStatus === 'RESOLVED' ? 'completed' : 'upcoming',
      label: 'Build Prototype',
      summary: 'Prototyping intervention models and field pilot specifications.',
    },
    {
      stage: 'Pilot',
      status: rawStatus === 'FIELD_PILOT' ? 'current' : rawStatus === 'RESOLVED' ? 'completed' : 'upcoming',
      label: 'Field Pilot',
      summary: `Controlled field deployment and validation in ${subLocation}.`,
    },
    {
      stage: 'Impact',
      status: rawStatus === 'RESOLVED' ? 'completed' : 'upcoming',
      label: 'Scale & Policy',
      summary: `District-wide rollout across ${district} with departmental sponsorship.`,
    },
  ];

  return {
    id,
    title,
    category: domain,
    district,
    subLocation,
    locationCoordinates: {
      lat,
      lon,
      formatted: `${lat.toFixed(2)}° N · ${lon.toFixed(2)}° E`,
      zoneName: `${district.toUpperCase()} · ${subLocation.toUpperCase()}`,
    },
    status: (raw.status || 'OPEN FOR COLLABORATION').toUpperCase(),
    impactPriority: `${raw.priority ? raw.priority.charAt(0).toUpperCase() + raw.priority.slice(1).toLowerCase() : 'High'} Impact Priority`,
    summary: description,
    problem: {
      background,
      currentSituation,
      whyExistingApproachesNotEnough,
    },
    profile: {
      district,
      focusArea: domain,
      primaryStakeholders,
      dateSubmitted: raw.createdAt
        ? new Date(raw.createdAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : 'Recent Submission',
      adminDepartment,
      trackingId: id,
    },
    impactMetrics: {
      affectedResidents,
      highRiskLocations,
      communitiesInvolved,
      statement,
    },
    evidenceTimeline,
    solutionApproaches,
    stakeholders,
    lifecycleStages,
    stats: {
      collaboratorsCount:
        raw._count?.collaborations || raw.collaborations?.length || 0,
      ideasCount: raw._count?.ideas || raw.ideas?.length || solutionApproaches.length,
      followersCount: 30 + (raw._count?.collaborations || 0) * 8,
    },
    relatedChallengeIds: [],
    evidenceFiles: raw.evidence || [],
  };
}

/**
 * Creates a clean generic pending detail without any Jharia/Mining data.
 */
function createGenericPendingDetail(id?: string): ChallengeDetailData {
  return {
    id: id || 'JS-PENDING',
    title: 'Loading Challenge Details...',
    category: 'General',
    district: 'Jharkhand',
    subLocation: 'District Sector',
    locationCoordinates: {
      lat: 23.34,
      lon: 85.31,
      formatted: '23.34° N · 85.31° E',
      zoneName: 'JHARKHAND · DISTRICT SECTOR',
    },
    status: 'UNDER REVIEW',
    impactPriority: 'High Impact Priority',
    summary: 'Retrieving challenge record from JharSankalp state repository...',
    problem: {
      background: 'Retrieving contextual problem background from repository...',
      currentSituation: 'Fetching latest ground situation observations...',
      whyExistingApproachesNotEnough: 'Analyzing existing approaches and operational constraints...',
    },
    profile: {
      district: 'Jharkhand',
      focusArea: 'General',
      primaryStakeholders: ['Local Communities', 'District Administration'],
      dateSubmitted: 'Pending',
      adminDepartment: 'State Innovation Council, Govt. of Jharkhand',
      trackingId: id || 'JS-PENDING',
    },
    impactMetrics: {
      affectedResidents: 'Analyzing...',
      highRiskLocations: 'Analyzing...',
      communitiesInvolved: 'Pending...',
      statement: 'Analyzing community impact and priority indicators...',
    },
    evidenceTimeline: [],
    solutionApproaches: [],
    stakeholders: [],
    lifecycleStages: [
      {
        stage: 'Identify',
        status: 'completed',
        label: 'Identify',
        summary: 'Challenge logged in state repository.',
      },
      {
        stage: 'Validate',
        status: 'current',
        label: 'Validate',
        summary: 'Verifying domain and impact level.',
      },
      {
        stage: 'Research',
        status: 'upcoming',
        label: 'Research & Solution Exploration',
        summary: 'Consortium matching in progress.',
      },
      {
        stage: 'Build',
        status: 'upcoming',
        label: 'Build Prototype',
        summary: 'Prototyping intervention models.',
      },
      {
        stage: 'Pilot',
        status: 'upcoming',
        label: 'Field Pilot',
        summary: 'Field deployment testing.',
      },
      {
        stage: 'Impact',
        status: 'upcoming',
        label: 'Scale & Policy',
        summary: 'Statewide implementation.',
      },
    ],
    stats: {
      collaboratorsCount: 0,
      ideasCount: 0,
      followersCount: 0,
    },
    relatedChallengeIds: [],
    evidenceFiles: [],
  };
}

/**
 * Returns structured challenge detail data for a given challenge ID.
 * GUARANTEE: Never falls back to DHANBAD_MINING_DETAIL for non-mining challenges!
 */
export function getChallengeDetail(id?: string): ChallengeDetailData {
  if (!id) {
    return createGenericPendingDetail();
  }

  if (id === 'JS-2024-00003') {
    return DHANBAD_MINING_DETAIL;
  }

  if (id === 'JS-2026-00024') {
    return KHUNTI_WATER_DETAIL;
  }

  const baseChallenge = CHALLENGES_DATA.find((c) => c.id === id);
  if (baseChallenge) {
    return mapDbChallengeToDetailData(baseChallenge);
  }

  return createGenericPendingDetail(id);
}
