import { Project, ProjectActivityItem, PortfolioMetrics, StageCount } from '../types/projects';

export const PORTFOLIO_METRICS: PortfolioMetrics = {
  activeProjects: 12,
  universitiesEngaged: 8,
  partnersCount: 14,
  districtsReached: 9,
  peopleImpacted: '32,000+',
  impactCategories: {
    people: '32,000+',
    communities: 18,
    innovation: 4,
    knowledge: 7,
    economic: 3,
  },
};

export const STAGE_COUNTS: StageCount[] = [
  {
    stage: 'FORMATION',
    stepNumber: '01',
    label: 'FORMATION',
    count: 2,
  },
  {
    stage: 'RESEARCH_DESIGN',
    stepNumber: '02',
    label: 'RESEARCH & DESIGN',
    count: 1,
  },
  {
    stage: 'PROTOTYPE',
    stepNumber: '03',
    label: 'PROTOTYPE',
    count: 2,
  },
  {
    stage: 'FIELD_PILOT',
    stepNumber: '04',
    label: 'FIELD PILOT',
    count: 4,
  },
  {
    stage: 'IMPLEMENTATION',
    stepNumber: '05',
    label: 'IMPLEMENTATION',
    count: 2,
  },
  {
    stage: 'IMPACT_VERIFICATION',
    stepNumber: '06',
    label: 'IMPACT VERIFICATION',
    count: 1,
  },
];

const RAW_PROJECTS: Array<
  Omit<
    Project,
    | 'location'
    | 'health'
    | 'healthLabel'
    | 'startedAt'
    | 'progressPercentage'
    | 'potentialBeneficiaries'
  > & {
    summary?: string;
  }
> = [
  {
    id: 'PRJ-2026-0012',
    projectCode: 'PRJ-2026-0012',
    title: 'Smart Rural Water Reliability Network',
    domain: 'Water Management',
    district: 'Khunti',
    block: 'Murhu Block',
    locationDisplay: 'Khunti · Murhu Block',
    stage: 'FIELD_PILOT',
    stageLabel: 'FIELD PILOT',
    status: 'ACTIVE',
    leadInstitution: 'BIT Mesra',
    beneficiaries: 2000,
    impactMetric: '2,000 Residents Covered · 18 Water Points Monitored',
    milestoneProgress: {
      completed: 4,
      total: 6,
    },
    oneLineDescription:
      'IoT-based monitoring system designed to reduce water pump downtime in remote communities.',
    description:
      'Frequent breakdown of drinking water handpumps leaves tribal hamlets in Murhu without safe water for days. This project deploys non-invasive sensor collars to monitor stroke-frequency and acoustic vibration, dispatching automatic maintenance tickets to local Jal Sahiyas before complete mechanical failure.',
    summary:
      'Sensor collar network on 18 community borewells preventing prolonged water supply outages.',
    coordinates: { x: 51, y: 64 },
    featured: true,
    createdAt: '2026-01-14',
    partners: [
      {
        id: 'p1',
        name: 'Murhu Village Water Committee',
        type: 'COMMUNITY',
        role: 'Community Co-Design & Pump Caretakers',
      },
      {
        id: 'p2',
        name: 'BIT Mesra',
        type: 'UNIVERSITY',
        role: 'Hardware Design & LoRaWAN Firmware',
      },
      {
        id: 'p3',
        name: 'IoT Innovation Partner',
        type: 'INDUSTRY',
        role: 'Telemetry Cloud & Gateway Architecture',
      },
      {
        id: 'p4',
        name: 'District Water Resources Team',
        type: 'GOVERNMENT',
        role: 'Mechanic Roster & Rapid Response Dispatch',
      },
    ],
  },
  {
    id: 'PRJ-2026-0009',
    projectCode: 'PRJ-2026-0009',
    title: 'Predictive Mine Subsidence Warning System',
    domain: 'Mining Safety',
    district: 'Dhanbad',
    block: 'Jharia',
    locationDisplay: 'Dhanbad · Jharia',
    stage: 'PROTOTYPE',
    stageLabel: 'PROTOTYPE',
    status: 'ACTIVE',
    leadInstitution: 'BIT Sindri',
    beneficiaries: 15000,
    impactMetric: '15,000 Residents · High Risk Settlement Corridor',
    milestoneProgress: {
      completed: 3,
      total: 6,
    },
    oneLineDescription:
      'Multi-sensor borehole extensometer network detecting subsurface coal-seam movement before ground collapse.',
    description:
      'Legacy coal extraction and subsurface coal fires cause sudden ground sinking in Jharia settlements. This prototype embeds optical fiber strain sensors and tiltmeters into boreholes, alerting district authorities 48 hours prior to catastrophic surface shear.',
    summary:
      'Deep subsurface extensometer array transmitting micro-shift telemetry to prevent collapse casualties.',
    coordinates: { x: 74, y: 47 },
    createdAt: '2026-02-02',
    partners: [
      {
        id: 'p5',
        name: 'BIT Sindri',
        type: 'UNIVERSITY',
        role: 'Geophysics & Sensor Engineering Lead',
      },
      {
        id: 'p6',
        name: 'Mining Research Lab',
        type: 'RESEARCH_ORGANIZATION',
        role: 'Geological Stratification Calibration',
      },
      {
        id: 'p7',
        name: 'Directorate General of Mines Safety',
        type: 'GOVERNMENT',
        role: 'Safety Thresholds & Evacuation SOPs',
      },
    ],
  },
  {
    id: 'PRJ-2026-0007',
    projectCode: 'PRJ-2026-0007',
    title: 'Portable Soil Intelligence System',
    domain: 'Agriculture',
    district: 'Gumla',
    block: 'Bishunpur',
    locationDisplay: 'Gumla · Bishunpur',
    stage: 'FIELD_PILOT',
    stageLabel: 'FIELD PILOT',
    status: 'ACTIVE',
    leadInstitution: 'Birsa Agricultural University',
    beneficiaries: 5000,
    impactMetric: '5,000 Smallholder Farmers Covered',
    milestoneProgress: {
      completed: 4,
      total: 6,
    },
    oneLineDescription:
      'Rugged handheld spectrometer providing instant N-P-K soil diagnostics and vernacular crop recommendations.',
    description:
      'Smallholder tribal farmers in Bishunpur struggle with acidic laterite soil degradation and excessive fertilizer spend. This field pilot equips Krishi Mitras with handheld optical scanners, generating personalized Sadri/Hindi soil advisory cards in under 5 minutes.',
    summary: 'Pocket spectrometer testing soil health in 14 villages with zero reagent wait times.',
    coordinates: { x: 34, y: 62 },
    createdAt: '2026-01-28',
    partners: [
      {
        id: 'p8',
        name: 'Birsa Agricultural University',
        type: 'UNIVERSITY',
        role: 'Agronomic Soil Calibration & Fertilizer Matrices',
      },
      {
        id: 'p9',
        name: 'AgriTech Startup',
        type: 'STARTUP',
        role: 'Optical Miniaturization & Mobile SDK',
      },
      {
        id: 'p10',
        name: 'Krishi Vigyan Kendra Gumla',
        type: 'GOVERNMENT',
        role: 'Farmer Group Training & Field Validation',
      },
    ],
  },
  {
    id: 'PRJ-2025-0031',
    projectCode: 'PRJ-2025-0031',
    title: 'Offline Learning Access Network',
    domain: 'Education',
    district: 'West Singhbhum',
    block: 'Chaibasa',
    locationDisplay: 'West Singhbhum · Chaibasa',
    stage: 'IMPLEMENTATION',
    stageLabel: 'IMPLEMENTATION',
    status: 'ACTIVE',
    leadInstitution: 'Kolhan University Research Team',
    beneficiaries: 4200,
    impactMetric: '32 Schools · 4,200 Students Reached',
    milestoneProgress: {
      completed: 5,
      total: 6,
    },
    oneLineDescription:
      'Solar-powered local Wi-Fi microservers delivering interactive vernacular STEM content to off-grid schools.',
    description:
      'In deep forested blocks with no cellular towers, government middle schools lack access to digital curriculum. This project deploys rugged solar micro-servers hosting local Wi-Fi hotspots, serving bilingual Ho and Hindi interactive simulations without internet fees.',
    summary:
      'Offline digital curriculum hubs in 32 remote schools powered by low-draw solar arrays.',
    coordinates: { x: 61, y: 83 },
    createdAt: '2025-11-12',
    partners: [
      {
        id: 'p11',
        name: 'Kolhan University Research Team',
        type: 'UNIVERSITY',
        role: 'Vernacular Pedagogical Evaluation',
      },
      {
        id: 'p12',
        name: 'Education NGO',
        type: 'COMMUNITY',
        role: 'Teacher Training & Learning Assessment',
      },
      {
        id: 'p13',
        name: 'District Education Office',
        type: 'GOVERNMENT',
        role: 'School Infrastructure & Hardware Allocation',
      },
    ],
  },
  {
    id: 'PRJ-2026-0014',
    projectCode: 'PRJ-2026-0014',
    title: 'Smart Community Waste Tracking System',
    domain: 'Environment',
    district: 'Ranchi',
    block: 'Kanke',
    locationDisplay: 'Ranchi · Kanke',
    stage: 'RESEARCH_DESIGN',
    stageLabel: 'RESEARCH & DESIGN',
    status: 'ACTIVE',
    leadInstitution: 'Municipal Innovation Cell',
    beneficiaries: 8000,
    impactMetric: '8,000 Peri-Urban Residents',
    milestoneProgress: {
      completed: 2,
      total: 6,
    },
    oneLineDescription:
      'Decentralized organic composting and RFID collection route optimizer for peri-urban wards.',
    description:
      'Uncollected organic waste creates open dumpsites in fringe wards of Ranchi. The team is developing low-cost ultrasonic fill sensors on municipal bins and dynamic electric-rickshaw route optimization, coupled with black soldier fly composting.',
    summary:
      'Dynamic bin sensor pilot and bio-digester route optimization for peri-urban waste resilience.',
    coordinates: { x: 50, y: 53 },
    createdAt: '2026-02-18',
    partners: [
      {
        id: 'p14',
        name: 'Municipal Innovation Cell',
        type: 'GOVERNMENT',
        role: 'Ward Administration & Pilot Sanction',
      },
      {
        id: 'p15',
        name: 'Ranchi University',
        type: 'UNIVERSITY',
        role: 'Route Algorithm Optimization & Waste Auditing',
      },
      {
        id: 'p16',
        name: 'Startup Partner',
        type: 'STARTUP',
        role: 'Ultrasonic Fill Level Hardware',
      },
    ],
  },
  {
    id: 'PRJ-2025-0026',
    projectCode: 'PRJ-2025-0026',
    title: 'Accessible Public Transport Navigation',
    domain: 'Accessibility',
    district: 'East Singhbhum',
    block: 'Jamshedpur',
    locationDisplay: 'East Singhbhum · Jamshedpur',
    stage: 'IMPACT_VERIFICATION',
    stageLabel: 'IMPACT VERIFICATION',
    status: 'ACTIVE',
    leadInstitution: 'NIT Jamshedpur Accessibility Lab',
    beneficiaries: 3500,
    impactMetric: '3,500 Commuters with Disabilities Benefited',
    milestoneProgress: {
      completed: 6,
      total: 6,
    },
    oneLineDescription:
      'Audio-tactile low-energy BLE beacon network enabling independent transit for visually impaired commuters.',
    description:
      'Crowded transit junctions in Jamshedpur present severe hazards for persons with visual impairments. This completed deployment installed 140 Bluetooth LE orientation beacons across 12 transit hubs, paired with voice navigation in Hindi, Santali, and Bengali.',
    summary: 'Audible indoor transit beacon grid verified across 12 busiest bus interchanges.',
    coordinates: { x: 78, y: 78 },
    createdAt: '2025-10-04',
    partners: [
      {
        id: 'p17',
        name: 'NIT Jamshedpur Accessibility Lab',
        type: 'UNIVERSITY',
        role: 'Indoor Positioning Algorithms & Beacon Hardware',
      },
      {
        id: 'p18',
        name: 'Urban Mobility Partner',
        type: 'INDUSTRY',
        role: 'Transit Authority Integration & Fleet Beacon Sync',
      },
      {
        id: 'p19',
        name: 'Jharkhand Disability Rights Forum',
        type: 'COMMUNITY',
        role: 'Usability Benchmarking & User Auditing',
      },
    ],
  },
  {
    id: 'PRJ-2026-0018',
    projectCode: 'PRJ-2026-0018',
    title: 'Saranda Bio-Canopy Acoustic Telemetry',
    domain: 'Environment',
    district: 'West Singhbhum',
    block: 'Manoharpur',
    locationDisplay: 'West Singhbhum · Saranda Forest',
    stage: 'FORMATION',
    stageLabel: 'FORMATION',
    status: 'ACTIVE',
    leadInstitution: 'IIT ISM Dhanbad',
    beneficiaries: 1800,
    impactMetric: '250 sq km Forest Corridor Monitored',
    milestoneProgress: {
      completed: 1,
      total: 6,
    },
    oneLineDescription:
      'Solar bio-acoustic monitoring pods detecting chainsaw frequencies and wildlife elephant corridors in Saranda.',
    description:
      'Human-elephant conflict along mineral haul routes causes fatalities every winter. The project consortium is deploying canopy acoustic listening nodes that detect elephant herd trumpeting and illegal timber cutting, alerting forest guards over LoRa radio.',
    summary:
      'Acoustic canopy nodes listening for wildlife calls and chainsaw noise in dense Sal forest.',
    coordinates: { x: 55, y: 88 },
    createdAt: '2026-02-22',
    partners: [
      {
        id: 'p20',
        name: 'IIT ISM Dhanbad',
        type: 'UNIVERSITY',
        role: 'Acoustic Signal Processing & Edge AI',
      },
      {
        id: 'p21',
        name: 'Forest Department Rangers',
        type: 'GOVERNMENT',
        role: 'Forest Boundary Mapping & Protocol Response',
      },
      {
        id: 'p22',
        name: 'Van Suraksha Samiti',
        type: 'COMMUNITY',
        role: 'Canopy Node Safeguarding',
      },
    ],
  },
  {
    id: 'PRJ-2026-0022',
    projectCode: 'PRJ-2026-0022',
    title: 'Tribal Solar Cold-Chain Micro-Hubs',
    domain: 'Agriculture',
    district: 'Latehar',
    block: 'Mahuadanr',
    locationDisplay: 'Latehar · Mahuadanr',
    stage: 'PROTOTYPE',
    stageLabel: 'PROTOTYPE',
    status: 'ACTIVE',
    leadInstitution: 'Birsa Agricultural University',
    beneficiaries: 2400,
    impactMetric: '2,400 Tribal Produce Gatherers',
    milestoneProgress: {
      completed: 3,
      total: 6,
    },
    oneLineDescription:
      'Phase-change thermal storage micro-coolers preserving seasonal forest produce and wild honey.',
    description:
      'Perishable forest produce such as Mahua blossoms and wild mangoes suffer 40% post-harvest spoilage due to lack of grid power in Latehar valleys. This prototype uses solar-charged phase-change wax batteries that maintain 4°C cooling for up to 72 hours without continuous electricity.',
    summary: 'Passive phase-change solar cold storage preserving non-timber forest produce.',
    coordinates: { x: 38, y: 44 },
    createdAt: '2026-01-19',
    partners: [
      {
        id: 'p23',
        name: 'Birsa Agricultural University',
        type: 'UNIVERSITY',
        role: 'Thermal Storage Testing & Produce Life Cycles',
      },
      {
        id: 'p24',
        name: 'Solar Thermal Startup',
        type: 'STARTUP',
        role: 'Modular Refrigeration Engineering',
      },
    ],
  },
  {
    id: 'PRJ-2026-0015',
    projectCode: 'PRJ-2026-0015',
    title: 'Vernacular Maternal Tele-Triage Backpack',
    domain: 'Healthcare',
    district: 'Dumka',
    block: 'Ranishwar',
    locationDisplay: 'Dumka · Ranishwar',
    stage: 'FIELD_PILOT',
    stageLabel: 'FIELD PILOT',
    status: 'ACTIVE',
    leadInstitution: 'AIIMS Deoghar Extension Team',
    beneficiaries: 3800,
    impactMetric: '3,800 Mothers & Infants Screened',
    milestoneProgress: {
      completed: 4,
      total: 6,
    },
    oneLineDescription:
      'All-in-one solar diagnostic kit with non-invasive hemoglobin sensor for frontline tribal ASHA workers.',
    description:
      'Severe maternal anemia in Santhal Pargana often remains undiagnosed until critical labor complications arise. Frontline ASHA workers carry an ultra-portable solar diagnostic kit with non-invasive spectroscopic optical finger sensors, syncing vitals to district hospitals.',
    summary:
      'Portable optical diagnostic backpack equipping ASHA workers across 20 remote tribal hamlets.',
    coordinates: { x: 86, y: 35 },
    createdAt: '2026-01-08',
    partners: [
      {
        id: 'p25',
        name: 'AIIMS Deoghar Extension Team',
        type: 'UNIVERSITY',
        role: 'Clinical Protocol & Telemedicine Validation',
      },
      {
        id: 'p26',
        name: 'Jharkhand State Health Society',
        type: 'GOVERNMENT',
        role: 'ASHA Cadre Integration',
      },
      {
        id: 'p27',
        name: 'Biomedical Innovation Partner',
        type: 'INDUSTRY',
        role: 'Non-Invasive Diagnostic Sensors',
      },
    ],
  },
  {
    id: 'PRJ-2026-0028',
    projectCode: 'PRJ-2026-0028',
    title: 'Arsenic & Fluoride Gravity Filtration Node',
    domain: 'Water Management',
    district: 'Sahibganj',
    block: 'Rajmahal',
    locationDisplay: 'Sahibganj · Rajmahal',
    stage: 'FIELD_PILOT',
    stageLabel: 'FIELD PILOT',
    status: 'ACTIVE',
    leadInstitution: 'NIT Jamshedpur Chemical Dept',
    beneficiaries: 4600,
    impactMetric: '4,600 Ganga Basin Residents',
    milestoneProgress: {
      completed: 4,
      total: 6,
    },
    oneLineDescription:
      'Zero-electricity clay-activated alumina filtration system remediating high arsenic in alluvial aquifers.',
    description:
      'Groundwater along the Ganga alluvial corridor contains toxic arsenic concentrations exceeding WHO limits by 8x. The project team deployed gravity-fed community filters fabricated from terracotta and activated alumina, requiring zero grid power.',
    summary:
      'Passive zero-power gravity filters installed at 6 primary schools with hazardous arsenic levels.',
    coordinates: { x: 92, y: 22 },
    createdAt: '2026-01-22',
    partners: [
      {
        id: 'p28',
        name: 'NIT Jamshedpur Chemical Dept',
        type: 'UNIVERSITY',
        role: 'Alumina Matrix Synthesis & Filtration Testing',
      },
      {
        id: 'p29',
        name: 'Public Health Engineering Dept (PHED)',
        type: 'GOVERNMENT',
        role: 'Water Quality Certification',
      },
      {
        id: 'p30',
        name: 'Rajmahal Gram Samiti',
        type: 'COMMUNITY',
        role: 'Filter Maintenance & Backwash Stewardship',
      },
    ],
  },
  {
    id: 'PRJ-2025-0040',
    projectCode: 'PRJ-2025-0040',
    title: 'Lac Cultivation Micro-Processing Unit',
    domain: 'Rural Livelihoods',
    district: 'Simdega',
    block: 'Kolebira',
    locationDisplay: 'Simdega · Kolebira',
    stage: 'IMPLEMENTATION',
    stageLabel: 'IMPLEMENTATION',
    status: 'ACTIVE',
    leadInstitution: 'ICAR-IINRG Namkum',
    beneficiaries: 2900,
    impactMetric: '2,900 Lac Harvesters · 65% Value Addition Increase',
    milestoneProgress: {
      completed: 5,
      total: 6,
    },
    oneLineDescription:
      'Solar-powered modular scraping and sealing machinery empowering tribal women lac cooperatives.',
    description:
      'Tribal women traditionally sell raw sticklac to middlemen at distressed prices. This project established a cooperative processing shed with mini solar scrapers and button lac melting pans, shifting raw export to graded sealing shellac.',
    summary:
      'Decentralized solar value-addition processing shed boosting tribal lac farmer incomes.',
    coordinates: { x: 38, y: 78 },
    createdAt: '2025-12-05',
    partners: [
      {
        id: 'p31',
        name: 'ICAR-IINRG Namkum',
        type: 'RESEARCH_ORGANIZATION',
        role: 'Lac Processing Tooling & Scientific Grading',
      },
      {
        id: 'p32',
        name: 'Simdega Mahila Cooperative',
        type: 'COMMUNITY',
        role: 'Facility Ownership & Operating Roster',
      },
      {
        id: 'p33',
        name: 'Jharkhand State Livelihood Promotion Society',
        type: 'GOVERNMENT',
        role: 'Market Linkages & Working Capital Grant',
      },
    ],
  },
  {
    id: 'PRJ-2026-0033',
    projectCode: 'PRJ-2026-0033',
    title: 'Community Forest Fire Early Warning Mesh',
    domain: 'Disaster Management',
    district: 'Palamu',
    block: 'Daltonganj',
    locationDisplay: 'Palamu · Betla Buffer',
    stage: 'FORMATION',
    stageLabel: 'FORMATION',
    status: 'ACTIVE',
    leadInstitution: 'Central University of Jharkhand',
    beneficiaries: 2200,
    impactMetric: '120 sq km Dry Deciduous Zone Protected',
    milestoneProgress: {
      completed: 1,
      total: 6,
    },
    oneLineDescription:
      'Solar infrared heat & CO2 mesh sensors providing instant alert triangulation before forest fires spread.',
    description:
      'Seasonal leaf-litter fires in dry deciduous teak and bamboo zones devastate regenerative undergrowth. The consortium is building low-cost infrared optical nodes along ridges, relaying automatic coordinates to beat officers within 15 minutes of ignition.',
    summary:
      'Infrared optical mesh warning network covering high-vulnerability summer forest sectors.',
    coordinates: { x: 32, y: 32 },
    createdAt: '2026-02-27',
    partners: [
      {
        id: 'p34',
        name: 'Central University of Jharkhand',
        type: 'UNIVERSITY',
        role: 'Sensor Mesh Network Design & Thermal Calibration',
      },
      {
        id: 'p35',
        name: 'Palamu Tiger Reserve Forest Guards',
        type: 'GOVERNMENT',
        role: 'Firebreak Coordination & Rapid Dispatch',
      },
    ],
  },
];

export const SEEDED_PROJECTS: Project[] = RAW_PROJECTS.map((p) => ({
  ...p,
  location: p.locationDisplay,
  summary: p.summary || p.oneLineDescription,
  health: 'ON_TRACK',
  healthLabel: 'ON TRACK',
  startedAt: 'January 2026',
  progressPercentage: Math.round((p.milestoneProgress.completed / p.milestoneProgress.total) * 100),
  potentialBeneficiaries: p.beneficiaries || 2000,
  collaborationNeeds: [
    {
      id: `cn-${p.id}`,
      type: 'Field Evaluation Partner',
      description: 'Seeking field evaluation and sensor deployment partner.',
      status: 'OPEN',
    },
  ],
}));

export const PROJECT_ACTIVITIES: ProjectActivityItem[] = [
  {
    id: 'act-1',
    timestamp: 'TODAY',
    projectTitle: 'Smart Rural Water Reliability Network',
    projectId: 'PRJ-2026-0012',
    activity:
      'Completed Field Pilot Milestone 03: Telemetry collars successfully verified across all 18 test borewells.',
    stage: 'FIELD_PILOT',
    stageLabel: 'FIELD PILOT',
  },
  {
    id: 'act-2',
    timestamp: 'YESTERDAY',
    projectTitle: 'Predictive Mine Subsidence Warning System',
    projectId: 'PRJ-2026-0009',
    activity:
      'BIT Sindri research team published sensor evaluation report verifying 0.5mm micro-shift detection.',
    stage: 'PROTOTYPE',
    stageLabel: 'PROTOTYPE',
  },
  {
    id: 'act-3',
    timestamp: '2 DAYS AGO',
    projectTitle: 'Portable Soil Intelligence System',
    projectId: 'PRJ-2026-0007',
    activity:
      'Onboarded a new AgriTech startup partner to miniaturize the optical scanning chamber.',
    stage: 'FIELD_PILOT',
    stageLabel: 'FIELD PILOT',
  },
  {
    id: 'act-4',
    timestamp: '4 DAYS AGO',
    projectTitle: 'Offline Learning Access Network',
    projectId: 'PRJ-2025-0031',
    activity:
      'Began implementation across 8 additional middle schools in deep Saranda forest buffer hamlets.',
    stage: 'IMPLEMENTATION',
    stageLabel: 'IMPLEMENTATION',
  },
];
