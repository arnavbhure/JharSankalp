export interface AnalyzeChallengeInput {
  title: string;
  description: string;
  district?: string;
  affectedPopulation?: number;
}

export interface AnalyzeChallengeResult {
  // User-requested 10 structured fields
  summary: string;
  suggestedDomain: string;
  suggestedSubdomain: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  priorityReason: string;
  impactAssessment: string;
  reviewRecommendation: string;
  innovationDirections: string[];
  technologies: string[];
  keywords: string[];

  // Compatibility fields
  suggestedCategory?: string;
  suggestedSubcategory?: string;
  domain?: string;
  subDomain?: string;
  suggestedPriority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  analysisSummary?: string;
  potentialImpactAreas?: string[];
  suggestedStakeholders?: string[];
  suggestedApproach?: string[];
  requiredExpertise?: string[];
  confidence?: number;
  needsHumanReview?: boolean;
}

function hasAny(text: string, words: string[]): boolean {
  return words.some((w) => {
    if (w.length <= 4) {
      return new RegExp(`\\b${w}\\b`, 'i').test(text);
    }
    return text.includes(w.toLowerCase());
  });
}

/**
 * Deterministic rule-based challenge analyzer.
 * Uses realistic keyword heuristics, location context, and impact heuristics.
 * Operates reliably offline without requiring any external AI API keys.
 */
export async function analyzeChallengeMock(
  input: AnalyzeChallengeInput,
): Promise<AnalyzeChallengeResult> {
  const text = `${input.title} ${input.description}`.toLowerCase();
  const district = input.district || 'Jharkhand';
  const population = input.affectedPopulation || 500;

  let domain = 'General';
  let subcategory = 'Civic Infrastructure & Public Welfare';
  let priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'MEDIUM';
  let priorityReason =
    'Civic concern requiring administrative review and district field verification.';
  let keywords = ['Civic Issue', 'Public Welfare', 'Community Assessment'];
  let potentialImpactAreas = [
    'Local neighborhood and community well-being',
    'Access to municipal and rural public services',
  ];
  let suggestedStakeholders = [
    'District Administration & Block Development Office',
    'Local Gram Panchayat / Municipal Corporation',
  ];
  let approaches = [
    'Field Inspection & Multi-Department Needs Assessment',
    'Citizen Consultation & Priority Action Plan',
  ];

  // Domain Rule-Based Matching (Order of specificity)
  if (
    hasAny(text, [
      'ai',
      'artificial intelligence',
      'robot',
      'algorithm',
      'cyber',
      'tech',
      'software',
      'machine learning',
      'taking over',
    ])
  ) {
    domain = 'Technology & Digital Governance';
    subcategory = 'AI Governance & Ethics';
    priority = 'MEDIUM';
    priorityReason =
      'Technology ethics or broad digital query requiring contextual scoping to local public challenges.';
    keywords = ['Artificial Intelligence', 'Digital Governance', 'Technology Policy', 'AI Ethics'];
    potentialImpactAreas = [
      'Digital literacy and public awareness',
      'Ethical AI adoption in governance',
    ];
    suggestedStakeholders = [
      'Department of Information Technology & e-Governance (DoIT)',
      'Academic Research Centers & Technical Institutes',
    ];
    approaches = [
      'Civic Tech Scoping & Responsible AI Framework',
      'Public Awareness & Digital Capacity Building',
    ];
  } else if (
    hasAny(text, [
      'water',
      'pump',
      'handpump',
      'hand pump',
      'drinking water',
      'well',
      'groundwater',
      'fluoride',
      'arsenic',
      'jal',
      'nal',
    ])
  ) {
    domain = 'Water Management';
    subcategory = 'Rural Drinking Water Infrastructure';
    priority = population >= 1000 ? 'HIGH' : 'MEDIUM';
    priorityReason =
      'Disruption to daily drinking water access creates immediate sanitation and public health risks.';
    keywords = ['Water Supply', 'Hand Pump Maintenance', 'Groundwater', 'Rural Infrastructure'];
    potentialImpactAreas = [
      'Daily household drinking water security',
      'Public health and waterborne disease prevention',
      'Time and labor burden on rural women and families',
    ];
    suggestedStakeholders = [
      'Drinking Water & Sanitation Department (DWSD)',
      'District Panchayati Raj Officer (DPRO)',
      'Birsa Agricultural University / BIT Mesra Engineering Labs',
      'Local Jal Sahiya Collective & Gram Panchayat',
    ];
    approaches = [
      'Solar-Powered IoT Telemetry for Hand Pump Sensors',
      'Automated SMS Dispatch for Block Maintenance Mechanics',
      'Panchayat Spare Parts Buffer & Jal Sahiya Mobile Reporting',
    ];
  } else if (
    hasAny(text, [
      'farm',
      'crop',
      'soil',
      'seed',
      'fertiliz',
      'paddy',
      'irrigation',
      'kisan',
      'agriculture',
      'harvest',
    ])
  ) {
    domain = 'Agriculture';
    subcategory = 'Soil Health & Resilient Cropping';
    priority = population > 1000 ? 'HIGH' : 'MEDIUM';
    priorityReason =
      'Smallholder agricultural productivity directly impacts tribal farmer income and food stability.';
    keywords = ['Soil Acidity', 'Crop Health', 'Agronomy', 'Irrigation Systems', 'Organic Biochar'];
    potentialImpactAreas = [
      'Smallholder crop yields and household income',
      'Long-term soil vitality in acidic laterite belts',
      'Monsoon dependency and dry-season resilience',
    ];
    suggestedStakeholders = [
      'Department of Agriculture & Sugarcane Development',
      'Birsa Agricultural University (BAU) Agronomy Research Labs',
      'Krishi Vigyan Kendras (KVK)',
      'Local Farmer Producer Organizations (FPOs)',
    ];
    approaches = [
      'Low-Cost Handheld Optical Soil Spectrometers',
      'Vernacular Voice Advisory for Village Hamlets',
      'Localized Micro-Check Dam Gravity Irrigation',
    ];
  } else if (
    hasAny(text, [
      'mine',
      'subsidence',
      'coal',
      'sinkhole',
      'blast',
      'quarry',
      'landslide',
      'collapse',
      'crack',
    ])
  ) {
    domain = 'Mining Safety';
    subcategory = 'Mine Subsidence & Geological Hazard Warning';
    priority = 'CRITICAL';
    priorityReason =
      'Subsurface subsidence and ground fissures directly endanger resident safety and public structures.';
    keywords = [
      'Subsidence Early Warning',
      'InSAR Geophysics',
      'Underground Fire',
      'Structural Safety',
    ];
    potentialImpactAreas = [
      'Protection of human lives in mining periphery settlements',
      'Integrity of village housing, schools, and connecting roads',
      'Prevention of sudden catastrophic underground collapse',
    ];
    suggestedStakeholders = [
      'Directorate General of Mines Safety (DGMS)',
      'District Disaster Management Authority (DDMA)',
      'IIT (ISM) Dhanbad Department of Mining Geophysics',
      'Coal India / BCCL / CCL Corporate Safety Teams',
    ];
    approaches = [
      'Subsurface MEMS Borehole Inclinometer Arrays',
      'Satellite InSAR Ground Displacement Radar Fusion',
      'Autonomous Solar Evacuation Sirens with Push Alerts',
    ];
  } else if (
    hasAny(text, [
      'school',
      'student',
      'educat',
      'learn',
      'teach',
      'classroom',
      'vernacular',
      'tribal language',
      'santhali',
      'ho language',
      'mundari',
    ])
  ) {
    domain = 'Education';
    subcategory = 'Vernacular Primary & STEM EdTech';
    priority = 'MEDIUM';
    priorityReason =
      'Bridging the foundational language barrier ensures equitable learning outcomes in rural primary schools.';
    keywords = [
      'Indigenous Languages',
      'Primary Education',
      'Digital Learning',
      'Experiential STEM',
    ];
    potentialImpactAreas = [
      'Foundational literacy and numeracy in tribal mother tongues',
      'Student retention and reduction in primary school dropouts',
      'Hands-on experimental science exposure in remote schools',
    ];
    suggestedStakeholders = [
      'Department of School Education & Literacy (JEPC)',
      'Central University of Jharkhand Tribal Language Cell',
      'Ranchi University & DIET District Resource Centers',
      'School Management Committees (SMC)',
    ];
    approaches = [
      'Solar-Powered Offline Mesh Micro-Servers for Classrooms',
      'Bilingual Interactive Santhali/Ho/Hindi Audio Modules',
      'Tactile Vernacular STEM Science Kits',
    ];
  } else if (
    text.includes('health') ||
    text.includes('hospital') ||
    text.includes('doctor') ||
    text.includes('anemia') ||
    text.includes('malnutrition') ||
    text.includes('medicine') ||
    text.includes('clinic') ||
    text.includes('pregnant') ||
    text.includes('asha') ||
    text.includes('ambulance') ||
    text.includes('disease')
  ) {
    domain = 'Healthcare';
    subcategory = 'Point-of-Care Diagnostics & Maternal Health';
    priority = 'HIGH';
    priorityReason =
      'Delayed diagnostics and lack of cold-chain transport in remote hamlets present critical health risks.';
    keywords = ['Point-of-Care Diagnostics', 'Maternal Anemia', 'ASHA Toolkit', 'Tele-Triage'];
    potentialImpactAreas = [
      'Rapid detection of severe anemia in adolescent girls and mothers',
      'Reduction of referral transit delays for high-risk patients',
      'Empowerment of frontline ASHA workers with digital tools',
    ];
    suggestedStakeholders = [
      'Department of Health, Medical Education & Family Welfare',
      'AIIMS Deoghar / RIMS Ranchi Community Medicine Labs',
      'National Health Mission (NHM) Jharkhand',
      'District Civil Surgeon & ASHA Collective',
    ];
    approaches = [
      'Non-Invasive Optical Hemoglobin Screening Devices',
      'Solar Cold-Chain Backpacks for Vaccine & Sample Transport',
      'Store-and-Forward Telemedicine Nodes for Sub-Centers',
    ];
  } else if (
    text.includes('forest') ||
    text.includes('tree') ||
    text.includes('wildfire') ||
    text.includes('pollution') ||
    text.includes('waste') ||
    text.includes('garbage') ||
    text.includes('river') ||
    text.includes('elephant') ||
    text.includes('spoil')
  ) {
    domain = 'Environment';
    subcategory = 'Forest Conservation & Bio-Diversity Monitoring';
    priority = text.includes('elephant') || text.includes('wildfire') ? 'HIGH' : 'MEDIUM';
    priorityReason =
      'Protection of community forest corridors and prevention of human-wildlife conflict preserves ecology.';
    keywords = [
      'Wildlife Corridor Telemetry',
      'Acoustic Surveillance',
      'Forest Fire Warning',
      'Bio-Fencing',
    ];
    potentialImpactAreas = [
      'Prevention of human-elephant conflict in migration routes',
      'Rapid suppression of dry-season forest canopy fires',
      'Preservation of biodiversity and community forest rights',
    ];
    suggestedStakeholders = [
      'Department of Forest, Environment & Climate Change',
      'Wildlife Institute of India / Birsa Agricultural Forestry Wing',
      'Van Suraksha Samitis (Forest Protection Committees)',
      'District Forest Officers (DFO)',
    ];
    approaches = [
      'Canopy Acoustic Listening Nodes with Edge ML Detection',
      'Solar Infrared Early-Warning Perimeter Trip-Lines',
      'Vernacular SMS & Sirens for Herd Tracking',
    ];
  } else if (
    text.includes('disab') ||
    text.includes('wheelchair') ||
    text.includes('blind') ||
    text.includes('deaf') ||
    text.includes('handicap') ||
    text.includes('ramp') ||
    text.includes('accessib')
  ) {
    domain = 'Accessibility';
    subcategory = 'Inclusive Public Infrastructure & Assistive Tech';
    priority = 'MEDIUM';
    priorityReason =
      'Physical and digital accessibility barriers restrict full participation of persons with disabilities.';
    keywords = [
      'Universal Accessibility',
      'Tactile Paving',
      'Assistive Devices',
      'Public Facility Retrofit',
    ];
    potentialImpactAreas = [
      'Barrier-free access to schools, hospitals, and transit hubs',
      'Independent mobility for visually and physically impaired citizens',
      'Compliance with State Rights of Persons with Disabilities norms',
    ];
    suggestedStakeholders = [
      'Department of Women, Child Development & Social Security',
      'National Institute for the Visually Handicapped Regional Wing',
      'University Assistive Tech Incubators',
      'Divyangjan Advocacy Collectives',
    ];
    approaches = [
      'Modular Low-Cost Concrete Access Ramps with Handrails',
      'Vernacular Audio-Tactile Indoor Navigation Beacons',
      'All-Terrain Wheelchair Conversions for Rural Unpaved Paths',
    ];
  } else if (
    text.includes('lac') ||
    text.includes('tussar') ||
    text.includes('silk') ||
    text.includes('artisan') ||
    text.includes('craft') ||
    text.includes('shg') ||
    text.includes('self help') ||
    text.includes('livelihood') ||
    text.includes('ntfp')
  ) {
    domain = 'Rural Livelihood';
    subcategory = 'Tribal Bio-Economy & Forest Produce Value Addition';
    priority = 'MEDIUM';
    priorityReason =
      'Empowering village SHGs with micro-processing machinery increases household income retention.';
    keywords = [
      'Tussar Silk Reeling',
      'Lac Processing',
      'NTFP Value Addition',
      'Solar Cold Storage',
    ];
    potentialImpactAreas = [
      'Local value retention before wholesale merchant export',
      'Economic self-reliance for tribal women SHG collectives',
      'Year-round income diversification for forest hamlets',
    ];
    suggestedStakeholders = [
      'Jharkhand State Livelihood Promotion Society (JSLPS)',
      'TRIFED & Department of Industries',
      'Indian Institute of Natural Resins and Gums (IINRG Ranchi)',
      'Gramin Mahila SHG Federations',
    ];
    approaches = [
      'Solar-Powered Motorized Tussar Silk Reeling Machines',
      'Decentralized Scientific Lac Scraping and Refining Units',
      'Blockchain-Assisted Fair Price Micro-Aggregation Centers',
    ];
  } else if (
    text.includes('road') ||
    text.includes('pothole') ||
    text.includes('drain') ||
    text.includes('sewage') ||
    text.includes('traffic') ||
    text.includes('garbage') ||
    text.includes('urban')
  ) {
    domain = 'Urban Development';
    subcategory = 'Urban Drainage & Municipal Sanitation';
    priority = 'MEDIUM';
    priorityReason =
      'Municipal drainage congestion creates waterlogging and urban vector-borne health risks during monsoons.';
    keywords = [
      'Urban Drainage',
      'Solid Waste Segregation',
      'Road Quality',
      'Municipal Sanitation',
    ];
    potentialImpactAreas = [
      'Prevention of urban flash waterlogging in low-lying localities',
      'Improvement in arterial connectivity and road commute safety',
      'Scientific secondary waste collection and recycling',
    ];
    suggestedStakeholders = [
      'Urban Development & Housing Department (UDHD)',
      'Municipal Corporation / Nagar Parishad Engineers',
      'Ranchi Smart City Corporation',
      'Local Resident Welfare Associations (RWAs)',
    ];
    approaches = [
      'Ultrasonic Stormwater Drain Clog Telemetry Nodes',
      'Cold-Mix Bitumen Pothole Rapid-Repair Units',
      'GIS-Tracked Door-to-Door Municipal Waste Route Optimization',
    ];
  } else if (
    text.includes('electric') ||
    text.includes('power') ||
    text.includes('transformer') ||
    text.includes('light') ||
    text.includes('ration') ||
    text.includes('pds') ||
    text.includes('pension') ||
    text.includes('bridge')
  ) {
    domain = 'Public Services';
    subcategory = 'Rural Energy Access & Public Infrastructure';
    priority = population > 1000 ? 'HIGH' : 'MEDIUM';
    priorityReason =
      'Grid instability and critical transformer failures interrupt essential lighting, study, and irrigation.';
    keywords = ['Transformer Health', 'Solar Micro-Grid', 'PDS Last-Mile', 'Rural Electrification'];
    potentialImpactAreas = [
      'Uninterrupted nighttime lighting for student learning and safety',
      'Reliable power for village agro-processing and water pumps',
      'Dignified last-mile service delivery for senior citizens and families',
    ];
    suggestedStakeholders = [
      'Jharkhand Bijli Vitran Nigam Limited (JBVNL)',
      'Jharkhand Renewable Energy Development Agency (JREDA)',
      'District Administration & Sub-Divisional Officer (SDO)',
      'Panchayat Public Works Committees',
    ];
    approaches = [
      'Decentralized Solar DC Micro-Grids with Battery Storage',
      'IoT Transformer Thermal Overload Early-Warning Monitor',
      'Mobile Biometric Offline PDS Handheld Distribution Units',
    ];
  }

  // Priority adjustments based on urgent signals
  if (
    text.includes('urgent') ||
    text.includes('death') ||
    text.includes('danger') ||
    text.includes('hazard') ||
    text.includes('poison') ||
    text.includes('flood') ||
    text.includes('serious') ||
    population >= 5000
  ) {
    priority = 'CRITICAL';
    priorityReason =
      'High severity hazard flagged with immediate community impact and potential safety implications.';
  } else if (text.includes('frequent') || text.includes('months') || population >= 1000) {
    priority = 'HIGH';
  }

  // Calculate realistic confidence
  let confidence = 0.88;
  if (text.length > 80) confidence += 0.04;
  if (input.district) confidence += 0.03;
  confidence = Math.min(confidence, 0.96);

  const summary = `${input.title.trim()}: Identified as a key ${domain} challenge in ${district}. ${priorityReason}`;

  const pStr = String(priority).toUpperCase();
  const priorityNormalized: 'Low' | 'Medium' | 'High' | 'Critical' =
    pStr === 'CRITICAL' ? 'Critical' : pStr === 'HIGH' ? 'High' : pStr === 'LOW' ? 'Low' : 'Medium';

  return {
    summary,
    suggestedDomain: domain,
    suggestedSubdomain: subcategory,
    priority: priorityNormalized,
    priorityReason,
    impactAssessment: potentialImpactAreas.join('. '),
    reviewRecommendation: `Submit to ${domain} innovation committee for priority review and field pilot assessment.`,
    innovationDirections: approaches,
    technologies: keywords,
    keywords,

    // Compatibility fields
    suggestedCategory: domain,
    suggestedSubcategory: subcategory,
    domain,
    subDomain: subcategory,
    suggestedPriority: priority,
    analysisSummary: summary,
    potentialImpactAreas,
    suggestedStakeholders,
    suggestedApproach: approaches,
    requiredExpertise: keywords,
    confidence,
    needsHumanReview: priority === 'CRITICAL' || text.length < 50,
  };
}
