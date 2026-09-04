import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

const DISTRICTS = [
  { name: 'Bokaro', code: 'BOK' },
  { name: 'Chatra', code: 'CHA' },
  { name: 'Deoghar', code: 'DEO' },
  { name: 'Dhanbad', code: 'DHN' },
  { name: 'Dumka', code: 'DUM' },
  { name: 'East Singhbhum', code: 'ESB' },
  { name: 'Garhwa', code: 'GAR' },
  { name: 'Giridih', code: 'GIR' },
  { name: 'Godda', code: 'GOD' },
  { name: 'Gumla', code: 'GUM' },
  { name: 'Hazaribagh', code: 'HAZ' },
  { name: 'Jamtara', code: 'JAM' },
  { name: 'Khunti', code: 'KHU' },
  { name: 'Koderma', code: 'KOD' },
  { name: 'Latehar', code: 'LAT' },
  { name: 'Lohardaga', code: 'LOH' },
  { name: 'Pakur', code: 'PAK' },
  { name: 'Palamu', code: 'PAL' },
  { name: 'Ramgarh', code: 'RAM' },
  { name: 'Ranchi', code: 'RAN' },
  { name: 'Sahebganj', code: 'SAH' },
  { name: 'Seraikela-Kharsawan', code: 'SKH' },
  { name: 'Simdega', code: 'SIM' },
  { name: 'West Singhbhum', code: 'WSB' },
];

const DEMO_PASSWORD_HASH = '$2a$10$nT./KCDTnYcBQnDil57EBubD4LzgEInm71XHaAjCCwni84A2AI6zG'; // password123

async function main() {
  console.log('🌱 Seeding complete JharSankalp PostgreSQL database...\n');

  // 1. Districts
  console.log('📍 Seeding 24 Jharkhand districts...');
  const districtMap: Record<string, string> = {};
  for (const d of DISTRICTS) {
    const created = await prisma.district.upsert({
      where: { code: d.code },
      update: {},
      create: {
        id: randomUUID(),
        name: d.name,
        code: d.code,
        stateCode: 'JH',
      },
    });
    districtMap[d.name] = created.id;
  }
  console.log(`   ✅ 24 districts seeded`);

  // 2. Organizations
  console.log('🏛️  Seeding organizations...');
  const bitOrg = await prisma.organization.upsert({
    where: { id: '20000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '20000000-0000-0000-0000-000000000001',
      name: 'Birla Institute of Technology (BIT Mesra)',
      type: 'UNIVERSITY',
      description: 'Premier technical research university leading rural IoT and telemetry systems.',
      website: 'https://www.bitmesra.ac.in',
      districtId: districtMap['Ranchi'],
      isVerified: true,
    },
  });

  const bauOrg = await prisma.organization.upsert({
    where: { id: '20000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      id: '20000000-0000-0000-0000-000000000002',
      name: 'Birsa Agricultural University (BAU)',
      type: 'UNIVERSITY',
      description: 'State agricultural university developing indigenous soil diagnostics and climate-smart crops.',
      website: 'https://www.bauranchi.org',
      districtId: districtMap['Ranchi'],
      isVerified: true,
    },
  });

  const iitDhanbadOrg = await prisma.organization.upsert({
    where: { id: '20000000-0000-0000-0000-000000000003' },
    update: {},
    create: {
      id: '20000000-0000-0000-0000-000000000003',
      name: 'IIT (ISM) Dhanbad',
      type: 'UNIVERSITY',
      description: 'National institute specializing in mining geophysics, rock mechanics, and subsurface sensing.',
      website: 'https://www.iitism.ac.in',
      districtId: districtMap['Dhanbad'],
      isVerified: true,
    },
  });

  const jalSahiyaOrg = await prisma.organization.upsert({
    where: { id: '20000000-0000-0000-0000-000000000004' },
    update: {},
    create: {
      id: '20000000-0000-0000-0000-000000000004',
      name: 'Murhu Jal Sahiya Collective',
      type: 'NGO',
      description: 'Community water sanitation grassroots federation maintaining village handpumps.',
      districtId: districtMap['Khunti'],
      isVerified: true,
    },
  });

  const dumkaEduOrg = await prisma.organization.upsert({
    where: { id: '20000000-0000-0000-0000-000000000005' },
    update: {},
    create: {
      id: '20000000-0000-0000-0000-000000000005',
      name: 'Santhal Pargana Tech Collective',
      type: 'STARTUP',
      description: 'Educational technology cooperative specializing in offline bilingual Santhali Ol Chiki tools.',
      districtId: districtMap['Dumka'],
      isVerified: true,
    },
  });

  const tataSteelOrg = await prisma.organization.upsert({
    where: { id: '20000000-0000-0000-0000-000000000006' },
    update: {},
    create: {
      id: '20000000-0000-0000-0000-000000000006',
      name: 'Tata Steel Rural Development Society (TSRDS)',
      type: 'INDUSTRY',
      description: 'Industrial partner supporting pilot deployments, telemetry hardware fabrication, and CSR co-funding.',
      website: 'https://www.tatasteel.com',
      districtId: districtMap['East Singhbhum'],
      isVerified: true,
    },
  });

  const cclOrg = await prisma.organization.upsert({
    where: { id: '20000000-0000-0000-0000-000000000007' },
    update: {},
    create: {
      id: '20000000-0000-0000-0000-000000000007',
      name: 'Central Coalfields Limited (CSR Wing)',
      type: 'INDUSTRY',
      description: 'Public sector coal enterprise collaborating on mining safety and early subsidence telemetry.',
      districtId: districtMap['Dhanbad'],
      isVerified: true,
    },
  });

  const jharGovOrg = await prisma.organization.upsert({
    where: { id: '20000000-0000-0000-0000-000000000008' },
    update: {},
    create: {
      id: '20000000-0000-0000-0000-000000000008',
      name: 'Dept. of Higher & Technical Education, Govt. of Jharkhand',
      type: 'GOVERNMENT',
      description: 'State nodal department orchestrating university R&D translation and societal challenge resolution.',
      website: 'https://jharkhand.gov.in',
      districtId: districtMap['Ranchi'],
      isVerified: true,
    },
  });
  console.log(`   ✅ Organizations seeded`);

  // 3. Users
  console.log('👥 Seeding users...');
  const citizenUser = await prisma.user.upsert({
    where: { email: 'kavita.munda@jharsankalp.in' },
    update: { isEmailVerified: true, passwordHash: DEMO_PASSWORD_HASH },
    create: {
      id: '10000000-0000-0000-0000-000000000001',
      name: 'Kavita Munda',
      email: 'kavita.munda@jharsankalp.in',
      passwordHash: DEMO_PASSWORD_HASH,
      role: 'CITIZEN',
      district: 'Khunti',
      bio: 'Jal Sahiya coordinator and tribal community water rights advocate.',
      organizationId: jalSahiyaOrg.id,
      isEmailVerified: true,
    },
  });

  const facultyUser = await prisma.user.upsert({
    where: { email: 'anand.verma@bitmesra.ac.in' },
    update: { isEmailVerified: true, passwordHash: DEMO_PASSWORD_HASH },
    create: {
      id: '10000000-0000-0000-0000-000000000002',
      name: 'Prof. Anand Verma',
      email: 'anand.verma@bitmesra.ac.in',
      passwordHash: DEMO_PASSWORD_HASH,
      role: 'UNIVERSITY',
      district: 'Ranchi',
      bio: 'Professor of Sensor Networks & Telemetry Lab Director at BIT Mesra.',
      organizationId: bitOrg.id,
      isEmailVerified: true,
    },
  });

  const govtUser = await prisma.user.upsert({
    where: { email: 'rajesh.ias@jharkhand.gov.in' },
    update: { isEmailVerified: true, passwordHash: DEMO_PASSWORD_HASH },
    create: {
      id: '10000000-0000-0000-0000-000000000003',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.ias@jharkhand.gov.in',
      passwordHash: DEMO_PASSWORD_HASH,
      role: 'GOVERNMENT',
      district: 'Khunti',
      bio: 'Block Development Officer (BDO), Murhu Block, Drinking Water & Sanitation Dept.',
      organizationId: jharGovOrg.id,
      isEmailVerified: true,
    },
  });

  const partnerUser = await prisma.user.upsert({
    where: { email: 'sanjay.oraon@tatasteel.com' },
    update: { isEmailVerified: true, passwordHash: DEMO_PASSWORD_HASH },
    create: {
      id: '10000000-0000-0000-0000-000000000004',
      name: 'Sanjay Oraon',
      email: 'sanjay.oraon@tatasteel.com',
      passwordHash: DEMO_PASSWORD_HASH,
      role: 'INDUSTRY',
      district: 'Ranchi',
      bio: 'Lead CSR rural technology implementation partner.',
      organizationId: tataSteelOrg.id,
      isEmailVerified: true,
    },
  });
  console.log(`   ✅ Users seeded`);

  // 4. Challenges (6 Core Domains)
  console.log('⚡ Seeding 6 core challenges...');
  const waterChallenge = await prisma.challenge.upsert({
    where: { publicId: 'JS-2026-00024' },
    update: {},
    create: {
      id: '30000000-0000-0000-0000-000000000001',
      publicId: 'JS-2026-00024',
      challengeCode: 'JS-2026-00024',
      title: 'Frequent Breakdown of Drinking Water Handpumps in Murhu Block',
      description: 'Handpumps fail repeatedly during dry months, leaving 2,000+ tribal residents in 14 villages without clean drinking water. Repairs take 8–12 days due to lack of real-time monitoring and reporting delay.',
      domain: 'Water Management',
      districtId: districtMap['Khunti'],
      block: 'Murhu',
      status: 'ACTIVE',
      priority: 'HIGH',
      affectedPopulation: 2000,
      submittedById: citizenUser.id,
      organizationId: jalSahiyaOrg.id,
    },
  });

  const agriChallenge = await prisma.challenge.upsert({
    where: { publicId: 'JS-2026-00019' },
    update: {},
    create: {
      id: '30000000-0000-0000-0000-000000000002',
      publicId: 'JS-2026-00019',
      challengeCode: 'JS-2026-00019',
      title: 'Post-Harvest Storage & Soil Degradation in Tribal Belts',
      description: 'Lack of rapid soil testing and cold chains causes 35% crop loss and over-fertilization among smallholder farmers in Gumla district.',
      domain: 'Agriculture',
      districtId: districtMap['Gumla'],
      block: 'Bishunpur',
      status: 'ACTIVE',
      priority: 'HIGH',
      affectedPopulation: 3200,
      submittedById: citizenUser.id,
    },
  });

  const miningChallenge = await prisma.challenge.upsert({
    where: { publicId: 'JS-2024-00003' },
    update: {},
    create: {
      id: '30000000-0000-0000-0000-000000000003',
      publicId: 'JS-2024-00003',
      challengeCode: 'JS-2024-00003',
      title: 'Early Detection of Ground Subsidence & Mine Inundation in Jharia',
      description: 'Unmonitored subsurface coal fires and subsidence threaten residential settlements across the Jharia coalfield belt.',
      domain: 'Mining Safety',
      districtId: districtMap['Dhanbad'],
      block: 'Jharia',
      status: 'ACTIVE',
      priority: 'CRITICAL',
      affectedPopulation: 1200,
      submittedById: govtUser.id,
    },
  });

  const healthChallenge = await prisma.challenge.upsert({
    where: { publicId: 'JS-2026-00008' },
    update: {},
    create: {
      id: '30000000-0000-0000-0000-000000000004',
      publicId: 'JS-2026-00008',
      challengeCode: 'JS-2026-00008',
      title: 'Point-of-Care Diagnostic Accessibility in Remote Forest Hamlets',
      description: 'Severe maternal anemia goes undetected in deep Saranda forest hamlets located hours away from primary health centers.',
      domain: 'Healthcare',
      districtId: districtMap['West Singhbhum'],
      block: 'Manoharpur',
      status: 'ACTIVE',
      priority: 'HIGH',
      affectedPopulation: 1800,
      submittedById: citizenUser.id,
    },
  });

  const eduChallenge = await prisma.challenge.upsert({
    where: { publicId: 'JS-2026-00014' },
    update: {},
    create: {
      id: '30000000-0000-0000-0000-000000000005',
      publicId: 'JS-2026-00014',
      challengeCode: 'JS-2026-00014',
      title: 'Educational Equity & Multilingual Digital Access in Santhal Pargana',
      description: 'Non-electrified tribal primary schools lack foundational numeracy learning tools in their mother tongue Santhali (Ol Chiki script).',
      domain: 'Education',
      districtId: districtMap['Dumka'],
      block: 'Shikaripara',
      status: 'ACTIVE',
      priority: 'HIGH',
      affectedPopulation: 1700,
      submittedById: citizenUser.id,
    },
  });

  const envChallenge = await prisma.challenge.upsert({
    where: { publicId: 'JS-2026-00021' },
    update: {},
    create: {
      id: '30000000-0000-0000-0000-000000000006',
      publicId: 'JS-2026-00021',
      challengeCode: 'JS-2026-00021',
      title: 'Forest Economy & Acoustic Chainsaw Detection in Betla Buffer Zone',
      description: 'Illegal tree felling in the sal forest buffer zone threatens tribal minor forest produce (MFP) collection and biodiversity.',
      domain: 'Environment',
      districtId: districtMap['Latehar'],
      block: 'Garu',
      status: 'ACTIVE',
      priority: 'MEDIUM',
      affectedPopulation: 1100,
      submittedById: citizenUser.id,
    },
  });
  console.log(`   ✅ 6 challenges seeded`);

  // 5. Ideas (6 Core Domains)
  console.log('💡 Seeding 6 ideas...');
  const waterIdea = await prisma.idea.upsert({
    where: { id: '40000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '40000000-0000-0000-0000-000000000001',
      title: 'Smart Water Monitoring Network',
      description: 'Low-cost vibration and acoustic sensor collars mounted on India Mark II handpumps to detect valve fatigue before complete breakdown, transmitting via LoRaWAN to local Jal Sahiya and BDO SMS alerts.',
      domain: 'Water Management',
      district: 'Khunti',
      status: 'IN_COLLABORATION',
      submittedById: facultyUser.id,
      relatedChallengeId: waterChallenge.id,
      authorName: 'Prof. Anand Verma & Rural Tech Lab',
      authorRole: 'University Researcher',
      supportersCount: 142,
      collaboratorsCount: 8,
      tags: ['IoT Telemetry', 'Acoustic Sensors', 'LoRaWAN', 'SMS Gateway'],
    },
  });

  const agriIdea = await prisma.idea.upsert({
    where: { id: '40000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      id: '40000000-0000-0000-0000-000000000002',
      title: 'Precision Soil Health Optical Spectrometer',
      description: 'Handheld optical reflectance spectrometer providing Krishi Mitras with instant soil NPK profiles and tailored bio-fertilizer recommendations.',
      domain: 'Agriculture',
      district: 'Gumla',
      status: 'IN_COLLABORATION',
      submittedById: citizenUser.id,
      relatedChallengeId: agriChallenge.id,
      authorName: 'BAU Extension Team',
      authorRole: 'Agritech Specialist',
      supportersCount: 98,
      collaboratorsCount: 6,
      tags: ['Spectroscopy', 'Bluetooth', 'Soil Health Card'],
    },
  });

  const miningIdea = await prisma.idea.upsert({
    where: { id: '40000000-0000-0000-0000-000000000003' },
    update: {},
    create: {
      id: '40000000-0000-0000-0000-000000000003',
      title: 'Subsurface MEMS Extensometer & InSAR Warning Array',
      description: 'Early warning array detecting sub-millimeter displacement in Jharia subsidence zones and firing sirens 48 hours before cave-ins.',
      domain: 'Mining Safety',
      district: 'Dhanbad',
      status: 'IN_COLLABORATION',
      submittedById: facultyUser.id,
      relatedChallengeId: miningChallenge.id,
      authorName: 'IIT ISM Dhanbad Geo-tech Group',
      authorRole: 'Senior Geophysicist',
      supportersCount: 114,
      collaboratorsCount: 5,
      tags: ['MEMS Tiltmeters', 'InSAR Fusion', 'Early Warning'],
    },
  });

  const healthIdea = await prisma.idea.upsert({
    where: { id: '40000000-0000-0000-0000-000000000004' },
    update: {},
    create: {
      id: '40000000-0000-0000-0000-000000000004',
      title: 'Solar-Powered Backpack Diagnostic Kit for Tribal ASHA Workers',
      description: 'Non-invasive hemoglobinometer and digital vitals kit enabling maternal screening during routine forest hamlet visits.',
      domain: 'Healthcare',
      district: 'West Singhbhum',
      status: 'IMPLEMENTED',
      submittedById: citizenUser.id,
      relatedChallengeId: healthChallenge.id,
      authorName: 'Rural Health Mission Team',
      authorRole: 'ASHA Facilitator',
      supportersCount: 165,
      collaboratorsCount: 9,
      tags: ['Diagnostic Hardware', 'Solar Battery', 'Digital Health Record'],
    },
  });

  const eduIdea = await prisma.idea.upsert({
    where: { id: '40000000-0000-0000-0000-000000000005' },
    update: {},
    create: {
      id: '40000000-0000-0000-0000-000000000005',
      title: 'Offline Digital Learning Hub with Ol Chiki NCERT Modules',
      description: 'Solar-powered offline Wi-Fi micro-servers broadcasting bilingual interactive primary education content to low-cost tablets.',
      domain: 'Education',
      district: 'Dumka',
      status: 'IN_COLLABORATION',
      submittedById: citizenUser.id,
      relatedChallengeId: eduChallenge.id,
      authorName: 'Santhal Pargana Tech Collective',
      authorRole: 'EdTech Innovator',
      supportersCount: 88,
      collaboratorsCount: 4,
      tags: ['Offline Wi-Fi Mesh', 'Solar Micro-Server', 'Ol Chiki'],
    },
  });

  const envIdea = await prisma.idea.upsert({
    where: { id: '40000000-0000-0000-0000-000000000006' },
    update: {},
    create: {
      id: '40000000-0000-0000-0000-000000000006',
      title: 'Community Forest Monitoring Platform with Canopy Audio ML',
      description: 'Acoustic listening nodes in tree canopies detecting chainsaw frequencies and alerting forest guards and Van Suraksha Samitis.',
      domain: 'Environment',
      district: 'Latehar',
      status: 'APPROVED',
      submittedById: facultyUser.id,
      relatedChallengeId: envChallenge.id,
      authorName: 'BAU Forestry Department',
      authorRole: 'Forest Ecologist',
      supportersCount: 76,
      collaboratorsCount: 5,
      tags: ['Canopy Acoustic Sensors', 'Audio ML', 'GPS Geofencing'],
    },
  });
  console.log(`   ✅ 6 ideas seeded`);

  // 6. Collaborations (6 Projects)
  console.log('👥 Seeding 6 collaborative projects & teams...');
  const waterCollab = await prisma.collaboration.upsert({
    where: { id: '50000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '50000000-0000-0000-0000-000000000001',
      title: 'Community Water Intelligence Network',
      description: 'Coordinated pilot deploying acoustic sensor collars on 50 community borewells across Murhu Block with automated SMS dispatch to repair mechanics.',
      status: 'ACTIVE',
      domain: 'Water Management',
      district: 'Khunti',
      stage: 'Field Pilot',
      progressPercentage: 78,
      leadPartner: 'BIT Mesra · Rural Technology Lab',
      institutionName: 'BIT Mesra + Murhu Jal Sahiya Collective',
      relatedChallengeId: waterChallenge.id,
      relatedIdeaId: waterIdea.id,
      neededSkills: ['Embedded C', 'LoRaWAN', 'Hydrology', 'Field Logistics'],
    },
  });

  const agriCollab = await prisma.collaboration.upsert({
    where: { id: '50000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      id: '50000000-0000-0000-0000-000000000002',
      title: 'Smart Agriculture & Soil Diagnostics Initiative',
      description: 'Birsa Agricultural University and Gumla Krishi Vigyan Kendra validating handheld optical soil testing in 42 tribal farm cooperatives.',
      status: 'ACTIVE',
      domain: 'Agriculture',
      district: 'Gumla',
      stage: 'Prototype',
      progressPercentage: 52,
      leadPartner: 'Birsa Agricultural University',
      institutionName: 'BAU + Gumla KVK',
      relatedChallengeId: agriChallenge.id,
      relatedIdeaId: agriIdea.id,
      neededSkills: ['Agronomy', 'Spectroscopy', 'Mobile UI Design'],
    },
  });

  const miningCollab = await prisma.collaboration.upsert({
    where: { id: '50000000-0000-0000-0000-000000000003' },
    update: {},
    create: {
      id: '50000000-0000-0000-0000-000000000003',
      title: 'Early Warning Community Network',
      description: 'Sensor array and early warning telemetry network deployed across Jharia coalfield settlements with civil defence dispatch.',
      status: 'ACTIVE',
      domain: 'Mining Safety',
      district: 'Dhanbad',
      stage: 'Testing',
      progressPercentage: 64,
      leadPartner: 'IIT (ISM) Dhanbad',
      institutionName: 'IIT (ISM) Dhanbad + Jharia Rehabilitation Authority',
      relatedChallengeId: miningChallenge.id,
      relatedIdeaId: miningIdea.id,
      neededSkills: ['Geophysics', 'Telemetry', 'Disaster Management'],
    },
  });

  const healthCollab = await prisma.collaboration.upsert({
    where: { id: '50000000-0000-0000-0000-000000000004' },
    update: {},
    create: {
      id: '50000000-0000-0000-0000-000000000004',
      title: 'Mobile Health Outreach Network',
      description: 'Deploying backpack diagnostic kits with non-invasive vitals logging across 24 isolated forest hamlets in Kolhan division.',
      status: 'ACTIVE',
      domain: 'Healthcare',
      district: 'West Singhbhum',
      stage: 'Deployment',
      progressPercentage: 90,
      leadPartner: 'Rural Health Mission Jharkhand',
      institutionName: 'Chaibasa Civil Hospital + AIIMS Deoghar',
      relatedChallengeId: healthChallenge.id,
      relatedIdeaId: healthIdea.id,
      neededSkills: ['Point-of-Care Diagnostics', 'Community Health', 'Vernacular Training'],
    },
  });

  const eduCollab = await prisma.collaboration.upsert({
    where: { id: '50000000-0000-0000-0000-000000000005' },
    update: {},
    create: {
      id: '50000000-0000-0000-0000-000000000005',
      title: 'Digital Learning Access Initiative',
      description: 'Equipping 12 non-electrified primary schools in Dumka with solar offline micro-servers and Ol Chiki audio-visual curriculum.',
      status: 'ACTIVE',
      domain: 'Education',
      district: 'Dumka',
      stage: 'Field Pilot',
      progressPercentage: 75,
      leadPartner: 'Santhal Pargana Tech Collective',
      institutionName: 'Dumka District Education Office',
      relatedChallengeId: eduChallenge.id,
      relatedIdeaId: eduIdea.id,
      neededSkills: ['Curriculum Localization', 'Solar Micro-Servers', 'Ol Chiki Pedagogy'],
    },
  });

  const envCollab = await prisma.collaboration.upsert({
    where: { id: '50000000-0000-0000-0000-000000000006' },
    update: {},
    create: {
      id: '50000000-0000-0000-0000-000000000006',
      title: 'Community Forest Intelligence Project',
      description: 'Acoustic canopy nodes detecting chainsaw noise signatures and transmitting geolocation alerts to Van Suraksha Samitis.',
      status: 'ACTIVE',
      domain: 'Environment',
      district: 'Latehar',
      stage: 'Research',
      progressPercentage: 38,
      leadPartner: 'Latehar Forest Division',
      institutionName: 'BAU Forestry Department',
      relatedChallengeId: envChallenge.id,
      relatedIdeaId: envIdea.id,
      neededSkills: ['Audio ML Classification', 'Hardware Weatherproofing', 'Forest Law'],
    },
  });

  // Seed Members for Collaborations
  await prisma.collaborationMember.createMany({
    data: [
      { id: randomUUID(), collaborationId: waterCollab.id, userId: facultyUser.id, memberName: 'Prof. Anand Verma', role: 'LEAD', institution: 'BIT Mesra' },
      { id: randomUUID(), collaborationId: waterCollab.id, userId: citizenUser.id, memberName: 'Kavita Munda', role: 'COMMUNITY_PARTNER', institution: 'Murhu Jal Sahiya' },
      { id: randomUUID(), collaborationId: waterCollab.id, userId: govtUser.id, memberName: 'Dr. Rajesh Kumar', role: 'MENTOR', institution: 'DW&S Khunti' },
      { id: randomUUID(), collaborationId: waterCollab.id, userId: partnerUser.id, memberName: 'Sanjay Oraon', role: 'INDUSTRY_PARTNER', institution: 'Tata Steel CSR' },
      { id: randomUUID(), collaborationId: agriCollab.id, userId: facultyUser.id, memberName: 'Dr. Sudhir Sahay', role: 'LEAD', institution: 'BAU Ranchi' },
      { id: randomUUID(), collaborationId: agriCollab.id, userId: citizenUser.id, memberName: 'Bhudhan Oraon', role: 'COMMUNITY_PARTNER', institution: 'Gumla Krishi Samiti' },
      { id: randomUUID(), collaborationId: healthCollab.id, userId: citizenUser.id, memberName: 'Sushila Soy', role: 'LEAD', institution: 'ASHA Kolhan' },
      { id: randomUUID(), collaborationId: eduCollab.id, userId: citizenUser.id, memberName: 'Sunil Murmu', role: 'LEAD', institution: 'Santhal Tech' },
    ],
    skipDuplicates: true,
  });
  console.log(`   ✅ 6 collaborations & members seeded`);

  // 7. Solutions (6 Core Solutions)
  console.log('✓ Seeding 6 solutions...');
  const waterSolution = await prisma.solution.upsert({
    where: { id: '60000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '60000000-0000-0000-0000-000000000001',
      title: 'Smart Water Monitoring Network',
      tagline: 'IoT telemetry & acoustic diagnostic collars for India Mark II community handpumps',
      description: 'A low-cost IoT-based monitoring system helping rural communities track water availability, pump functionality and infrastructure failures in real time before drinking water access is cut off.',
      domain: 'Water Management',
      district: 'Khunti',
      stage: 'FIELD_PILOT',
      technologyTags: ['Vibration Telemetry', 'LoRaWAN Mesh', 'Solar Micro-harvesting', 'SMS Gateway'],
      technologyType: 'IoT + Sensors',
      progressPercentage: 78,
      impactSummary: '14 tribal villages covered across Murhu Block with 45.8% reduction in repair turnaround times',
      imageUrl: '/rural_water_iot.jpg',
      relatedChallengeId: waterChallenge.id,
      relatedCollaborationId: waterCollab.id,
      leadPartners: ['BIT Mesra', 'Murhu Jal Sahiya Collective', 'Khunti DW&S'],
    },
  });

  const soilSolution = await prisma.solution.upsert({
    where: { id: '60000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      id: '60000000-0000-0000-0000-000000000002',
      title: 'Precision Soil Health Toolkit',
      tagline: 'Portable optical reflectance spectrometer for rapid NPK and organic carbon assay',
      description: 'A handheld optical spectrometer providing village Krishi Mitras with instant soil macro-nutrient profiles and tailored bio-fertilizer recommendations.',
      domain: 'Agriculture',
      district: 'Gumla',
      stage: 'PROTOTYPE',
      technologyTags: ['Optical Spectroscopy', 'Mobile Bluetooth', 'Soil Health Card', 'Vernacular UI'],
      technologyType: 'Agritech',
      progressPercentage: 52,
      impactSummary: '42 tribal farmers testbed · 28% chemical fertilizer cost reduction',
      relatedChallengeId: agriChallenge.id,
      relatedCollaborationId: agriCollab.id,
      leadPartners: ['Birsa Agricultural University', 'Gumla Krishi Vigyan Kendra'],
    },
  });

  const subsidenceSolution = await prisma.solution.upsert({
    where: { id: '60000000-0000-0000-0000-000000000003' },
    update: {},
    create: {
      id: '60000000-0000-0000-0000-000000000003',
      title: 'Community Subsidence Warning System',
      tagline: 'MEMS extensometer & satellite InSAR early warning array for coalfield settlements',
      description: 'Subsurface fissure extensometer nodes transmitting real-time micro-displacement alerts to vulnerable community committees in coal subsidence zones.',
      domain: 'Mining Safety',
      district: 'Dhanbad',
      stage: 'TESTING',
      technologyTags: ['InSAR Fusion', 'MEMS Tiltmeters', 'Cellular Gateway', 'Siren Dispatch'],
      technologyType: 'Sensors + Early Warning',
      progressPercentage: 64,
      impactSummary: '8 settlement monitoring nodes · Sub-millimeter ground movement alert accuracy',
      relatedChallengeId: miningChallenge.id,
      relatedCollaborationId: miningCollab.id,
      leadPartners: ['IIT (ISM) Dhanbad', 'Jharia Coalfield Rehabilitation Authority'],
    },
  });

  const healthSolution = await prisma.solution.upsert({
    where: { id: '60000000-0000-0000-0000-000000000004' },
    update: {},
    create: {
      id: '60000000-0000-0000-0000-000000000004',
      title: 'Mobile Rural Health Screening Unit',
      tagline: 'Solar-powered diagnostic backpack for remote tribal ASHA workers',
      description: 'Backpack-portable diagnostic kits with non-invasive hemoglobinometers, digital thermometers, and automated vitals logging with offline cloud sync.',
      domain: 'Healthcare',
      district: 'West Singhbhum',
      stage: 'DEPLOYMENT',
      technologyTags: ['Point-of-Care Diagnostics', 'Solar Battery', 'Digital Health Record', 'Vernacular Voice'],
      technologyType: 'Diagnostic Hardware',
      progressPercentage: 90,
      impactSummary: '1,800+ screenings · 24 forest hamlets covered · 34 high-risk anemia cases flagged',
      relatedChallengeId: healthChallenge.id,
      relatedCollaborationId: healthCollab.id,
      leadPartners: ['Rural Health Mission Jharkhand', 'Chaibasa Civil Hospital', 'AIIMS Deoghar'],
    },
  });

  const eduSolution = await prisma.solution.upsert({
    where: { id: '60000000-0000-0000-0000-000000000005' },
    update: {},
    create: {
      id: '60000000-0000-0000-0000-000000000005',
      title: 'Offline Digital Learning Hub',
      tagline: 'Solar micro-server with curated multilingual Ol Chiki and NCERT learning modules',
      description: 'Offline solar-powered micro-servers loaded with interactive bilingual curriculum modules for non-electrified primary schools without internet.',
      domain: 'Education',
      district: 'Dumka',
      stage: 'FIELD_PILOT',
      technologyTags: ['Offline Wi-Fi Mesh', 'Solar Micro-Server', 'Ol Chiki Language', 'Open Educational Resources'],
      technologyType: 'EdTech',
      progressPercentage: 75,
      impactSummary: '12 non-electrified schools · 650 primary students active · 40% math fluency gain',
      relatedChallengeId: eduChallenge.id,
      relatedCollaborationId: eduCollab.id,
      leadPartners: ['Santhal Pargana Tech Collective', 'Dumka District Education Office'],
    },
  });

  const envSolution = await prisma.solution.upsert({
    where: { id: '60000000-0000-0000-0000-000000000006' },
    update: {},
    create: {
      id: '60000000-0000-0000-0000-000000000006',
      title: 'Community Forest Monitoring Platform',
      tagline: 'Acoustic canopy sensors & mobile vernacular app for Van Suraksha Samitis',
      description: 'Acoustic canopy sensors and smartphone reporting app for community forest protection committees to prevent timber smuggling and log fire smoke.',
      domain: 'Environment',
      district: 'Latehar',
      stage: 'RESEARCH',
      technologyTags: ['Canopy Acoustic Sensors', 'Machine Learning Audio Classifier', 'Offline Map', 'GPS Geofencing'],
      technologyType: 'Environmental Tech',
      progressPercentage: 38,
      impactSummary: '3 Van Suraksha Samitis · 450 hectares monitored · Zero illegal felling in pilot zone',
      relatedChallengeId: envChallenge.id,
      relatedCollaborationId: envCollab.id,
      leadPartners: ['Latehar Forest Division', 'Birsa Agricultural University Forestry Dept'],
    },
  });
  console.log(`   ✅ 6 solutions seeded`);

  // 8. Impact Records
  console.log('📊 Seeding impact records...');
  await prisma.impactRecord.createMany({
    data: [
      {
        id: randomUUID(),
        solutionId: waterSolution.id,
        metricName: 'Villages Covered',
        metricValue: '14',
        metricUnit: 'Villages',
        district: 'Khunti',
        domain: 'Water Management',
        description: 'Panchayat drinking water handpumps actively monitored with solar IoT collars.',
      },
      {
        id: randomUUID(),
        solutionId: waterSolution.id,
        metricName: 'Residents Protected',
        metricValue: '2,000+',
        metricUnit: 'Residents',
        district: 'Khunti',
        domain: 'Water Management',
        description: 'Verified rural community members with continuous drinking water security.',
      },
      {
        id: randomUUID(),
        solutionId: waterSolution.id,
        metricName: 'Faster Issue Reporting',
        metricValue: '32%',
        metricUnit: 'Percent',
        district: 'Khunti',
        domain: 'Water Management',
        description: 'Automated telemetry reduced notification delay to BDO mechanics from 5 days to 2 hours.',
      },
      {
        id: randomUUID(),
        solutionId: waterSolution.id,
        metricName: 'Response Time Reduction',
        metricValue: '8 Days → 3 Days',
        metricUnit: 'Days',
        district: 'Khunti',
        domain: 'Water Management',
        description: 'Average pump breakdown resolution time dropped from 8 days to 3 days.',
      },
      {
        id: randomUUID(),
        solutionId: soilSolution.id,
        metricName: 'Farmers Supported',
        metricValue: '3,200',
        metricUnit: 'Farmers',
        district: 'Gumla',
        domain: 'Agriculture',
        description: 'Smallholder tribal cultivators using handheld soil recommendations.',
      },
      {
        id: randomUUID(),
        solutionId: healthSolution.id,
        metricName: 'Maternal Screenings Completed',
        metricValue: '1,800+',
        metricUnit: 'Screenings',
        district: 'West Singhbhum',
        domain: 'Healthcare',
        description: 'Non-invasive hemoglobin assays conducted by frontline ASHA workers in remote hamlets.',
      },
      {
        id: randomUUID(),
        solutionId: subsidenceSolution.id,
        metricName: 'Early Evacuation Lead Time',
        metricValue: '48 Hours',
        metricUnit: 'Hours',
        district: 'Dhanbad',
        domain: 'Mining Safety',
        description: 'Advance sensor warning window prior to subsurface road and settlement fissure breaches.',
      },
      {
        id: randomUUID(),
        solutionId: eduSolution.id,
        metricName: 'Students Supported',
        metricValue: '650',
        metricUnit: 'Students',
        district: 'Dumka',
        domain: 'Education',
        description: 'Tribal primary students actively learning with Ol Chiki digital modules.',
      },
      {
        id: randomUUID(),
        solutionId: envSolution.id,
        metricName: 'Hectares Forest Monitored',
        metricValue: '450',
        metricUnit: 'Hectares',
        district: 'Latehar',
        domain: 'Environment',
        description: 'Dense Sal forest protected under community acoustic sensor surveillance.',
      },
    ],
    skipDuplicates: true,
  });
  console.log(`   ✅ Impact records seeded`);

  // 9. Structured Implementation Projects (Connecting Challenges & Ideas)
  console.log('🚀 Seeding 6 structured implementation projects...');
  const waterProject = await prisma.project.upsert({
    where: { referenceCode: 'PRJ-2026-0012' },
    update: {},
    create: {
      id: '70000000-0000-0000-0000-000000000001',
      referenceCode: 'PRJ-2026-0012',
      title: 'Smart Rural Water Reliability Network',
      description: 'Frequent breakdown of drinking water handpumps leaves tribal hamlets in Murhu without safe water for days. This project deploys non-invasive sensor collars to monitor stroke-frequency and acoustic vibration, dispatching automatic maintenance tickets to local Jal Sahiyas before complete mechanical failure.',
      challengeId: waterChallenge.id,
      ideaId: waterIdea.id,
      leadOrganizationId: bitOrg.id,
      domain: 'Water Management',
      district: 'Khunti',
      block: 'Murhu Block',
      stage: 'FIELD_PILOT',
      status: 'ACTIVE',
      affectedPopulation: 2000,
      locationDisplay: 'Khunti · Murhu Block',
      impactSummary: '2,000 Residents Covered · 18 Water Points Monitored',
      startDate: new Date('2026-01-14'),
      expectedEndDate: new Date('2026-08-30'),
    },
  });

  const agriProject = await prisma.project.upsert({
    where: { referenceCode: 'PRJ-2026-0007' },
    update: {},
    create: {
      id: '70000000-0000-0000-0000-000000000002',
      referenceCode: 'PRJ-2026-0007',
      title: 'Tribal Pulse & Millets Cold Storage',
      description: 'Micro-climate controlled solar-powered storage mitigating post-harvest degradation for smallholder tribal farmers.',
      challengeId: agriChallenge.id,
      ideaId: agriIdea.id,
      leadOrganizationId: bauOrg.id,
      domain: 'Agriculture',
      district: 'Gumla',
      block: 'Bishunpur Block',
      stage: 'FIELD_PILOT',
      status: 'ACTIVE',
      affectedPopulation: 3200,
      locationDisplay: 'Gumla · Bishunpur Block',
      impactSummary: '3,200 Farmers Supported · 42 Pilot Cooperatives',
      startDate: new Date('2026-02-01'),
      expectedEndDate: new Date('2026-09-15'),
    },
  });

  const miningProject = await prisma.project.upsert({
    where: { referenceCode: 'PRJ-2026-0009' },
    update: {},
    create: {
      id: '70000000-0000-0000-0000-000000000003',
      referenceCode: 'PRJ-2026-0009',
      title: 'Subsurface Fissure Inundation Warning',
      description: 'Distributed geotechnical sensor mesh and satellite InSAR telemetry detecting early ground fissures above abandoned coal seams.',
      challengeId: miningChallenge.id,
      ideaId: miningIdea.id,
      leadOrganizationId: iitDhanbadOrg.id,
      domain: 'Mining Safety',
      district: 'Dhanbad',
      block: 'Jharia Coalfield',
      stage: 'PROTOTYPE',
      status: 'ACTIVE',
      affectedPopulation: 1200,
      locationDisplay: 'Dhanbad · Jharia Coalfield',
      impactSummary: '1,200 Settlement Dwellers · 48h Advance Evacuation Notice',
      startDate: new Date('2026-01-20'),
      expectedEndDate: new Date('2026-10-30'),
    },
  });

  const eduProject = await prisma.project.upsert({
    where: { referenceCode: 'PRJ-2025-0031' },
    update: {},
    create: {
      id: '70000000-0000-0000-0000-000000000004',
      referenceCode: 'PRJ-2025-0031',
      title: 'Solar Ol Chiki Digital Classroom Kits',
      description: 'Off-grid interactive classroom hubs delivering bilingual Ol Chiki and Hindi foundational numeracy curriculum in non-electrified schools.',
      challengeId: eduChallenge.id,
      ideaId: eduIdea.id,
      leadOrganizationId: dumkaEduOrg.id,
      domain: 'Education',
      district: 'Dumka',
      block: 'Shikaripara Block',
      stage: 'IMPLEMENTATION',
      status: 'ACTIVE',
      affectedPopulation: 1700,
      locationDisplay: 'Dumka · Shikaripara Block',
      impactSummary: '12 Schools Equipped · 650 Primary Students',
      startDate: new Date('2025-11-10'),
      expectedEndDate: new Date('2026-06-30'),
    },
  });

  const envProject = await prisma.project.upsert({
    where: { referenceCode: 'PRJ-2026-0014' },
    update: {},
    create: {
      id: '70000000-0000-0000-0000-000000000005',
      referenceCode: 'PRJ-2026-0014',
      title: 'Solar Cold-Chain & Soil Clinic Network',
      description: 'Decentralized mobile solar testing clinics providing rapid soil health cards and bio-fertilizer guidance in tribal forest fringe villages.',
      challengeId: envChallenge.id,
      ideaId: envIdea.id,
      leadOrganizationId: bauOrg.id,
      domain: 'Environment',
      district: 'Latehar',
      block: 'Garu Block',
      stage: 'FIELD_PILOT',
      status: 'ACTIVE',
      affectedPopulation: 1100,
      locationDisplay: 'Latehar · Garu Block',
      impactSummary: '450 Hectares Monitored · 3 Van Suraksha Samitis',
      startDate: new Date('2026-02-15'),
      expectedEndDate: new Date('2026-11-30'),
    },
  });

  const healthProject = await prisma.project.upsert({
    where: { referenceCode: 'PRJ-2025-0026' },
    update: {},
    create: {
      id: '70000000-0000-0000-0000-000000000006',
      referenceCode: 'PRJ-2025-0026',
      title: 'Saranda Forest Maternal Tele-Diagnostics',
      description: 'Backpack-portable diagnostic kits enabling frontline tribal ASHA workers to detect maternal anemia and vital abnormalities in isolated forest hamlets.',
      challengeId: healthChallenge.id,
      ideaId: healthIdea.id,
      leadOrganizationId: bitOrg.id,
      domain: 'Healthcare',
      district: 'West Singhbhum',
      block: 'Manoharpur Block',
      stage: 'IMPACT_VERIFICATION',
      status: 'ACTIVE',
      affectedPopulation: 1800,
      locationDisplay: 'West Singhbhum · Saranda Range',
      impactSummary: '1,800+ Screenings · 24 Forest Hamlets Covered',
      startDate: new Date('2025-09-01'),
      expectedEndDate: new Date('2026-04-30'),
    },
  });
  console.log('   ✅ 6 implementation projects seeded');

  // 10. Project Participants
  console.log('🤝 Seeding project participants...');
  await prisma.projectParticipant.createMany({
    data: [
      { id: randomUUID(), projectId: waterProject.id, organizationId: bitOrg.id, role: 'LEAD', contribution: 'Hardware Design & LoRaWAN Firmware' },
      { id: randomUUID(), projectId: waterProject.id, organizationId: jalSahiyaOrg.id, role: 'COMMUNITY_PARTNER', contribution: 'Community Co-Design & Pump Caretakers' },
      { id: randomUUID(), projectId: waterProject.id, organizationId: tataSteelOrg.id, role: 'TECHNICAL_PARTNER', contribution: 'Telemetry Cloud & Gateway Architecture' },
      { id: randomUUID(), projectId: waterProject.id, organizationId: jharGovOrg.id, role: 'FUNDING_PARTNER', contribution: 'State Directorate Pilot Grants' },

      { id: randomUUID(), projectId: agriProject.id, organizationId: bauOrg.id, role: 'LEAD', contribution: 'Agronomic Validation & Storage Chambers' },
      { id: randomUUID(), projectId: agriProject.id, organizationId: tataSteelOrg.id, role: 'TECHNICAL_PARTNER', contribution: 'Solar Cooling Hardware & Grants' },

      { id: randomUUID(), projectId: miningProject.id, organizationId: iitDhanbadOrg.id, role: 'LEAD', contribution: 'Subsurface Geophysics & Sensor Calibration' },
      { id: randomUUID(), projectId: miningProject.id, organizationId: cclOrg.id, role: 'TECHNICAL_PARTNER', contribution: 'Borehole Drilling & Intrinsically Safe Hardware' },

      { id: randomUUID(), projectId: eduProject.id, organizationId: dumkaEduOrg.id, role: 'LEAD', contribution: 'Ol Chiki Interactive Software & Tablet Provision' },
      { id: randomUUID(), projectId: eduProject.id, organizationId: jharGovOrg.id, role: 'FUNDING_PARTNER', contribution: 'District Primary Education Pilot Sanction' },
    ],
    skipDuplicates: true,
  });
  console.log('   ✅ Project participants seeded');

  // 11. Milestones
  console.log('🎯 Seeding project milestones...');
  await prisma.milestone.createMany({
    data: [
      // PRJ-2026-0012: 4 completed, 2 pending/in-progress
      { id: randomUUID(), projectId: waterProject.id, title: 'Field Topology & Handpump Acoustic Survey', description: 'Baseline acoustic and vibrational profile mapping across 18 community water points in Murhu.', status: 'COMPLETED', dueDate: new Date('2026-02-15'), completedAt: new Date('2026-02-12') },
      { id: randomUUID(), projectId: waterProject.id, title: 'Hardware Prototype Fabrication & LoRaWAN Bench Testing', description: 'Development of weatherproof vibration sensor collars and gateway transceiver nodes.', status: 'COMPLETED', dueDate: new Date('2026-03-01'), completedAt: new Date('2026-02-28') },
      { id: randomUUID(), projectId: waterProject.id, title: 'Gram Panchayat Approval & Jal Sahiya Training', description: 'Co-design workshop with 14 village Jal Sahiyas and Panchayat Pradhans.', status: 'COMPLETED', dueDate: new Date('2026-03-15'), completedAt: new Date('2026-03-14') },
      { id: randomUUID(), projectId: waterProject.id, title: 'Pilot Cluster Installation across 18 Water Points', description: 'Deployment of sensor nodes across Murhu block community borewells.', status: 'COMPLETED', dueDate: new Date('2026-04-01'), completedAt: new Date('2026-03-30') },
      { id: randomUUID(), projectId: waterProject.id, title: 'Automated SMS Maintenance Dispatch Engine Live', description: 'Integration with BDO repair squad ticketing and Jal Sahiya mobile alerts.', status: 'IN_PROGRESS', dueDate: new Date('2026-05-15') },
      { id: randomUUID(), projectId: waterProject.id, title: 'Endline Reliability Evaluation & District Scale Plan', description: 'Comprehensive audit of pump downtime reduction and scaling proposal for Khunti district.', status: 'PENDING', dueDate: new Date('2026-08-30') },

      // PRJ-2026-0009: 2 completed, 2 in-progress/pending
      { id: randomUUID(), projectId: miningProject.id, title: 'Geological Hazard Assessment & InSAR Baseline', description: 'Satellite interferometric baseline mapping of ground subsidence rates.', status: 'COMPLETED', dueDate: new Date('2026-02-20'), completedAt: new Date('2026-02-18') },
      { id: randomUUID(), projectId: miningProject.id, title: 'Subsurface Extensometer Mesh Prototype', description: 'Borehole sensor string assembly and intrinsically safe battery certification.', status: 'COMPLETED', dueDate: new Date('2026-03-25'), completedAt: new Date('2026-03-22') },
      { id: randomUUID(), projectId: miningProject.id, title: 'Surface Inundation Early Warning Sirens', description: 'Community siren activation and mock evacuation drills.', status: 'IN_PROGRESS', dueDate: new Date('2026-06-10') },
      { id: randomUUID(), projectId: miningProject.id, title: 'Telemetry Gateway Mesh Deployment', description: 'Long-range mesh transceivers connecting sensor nodes to district emergency center.', status: 'PENDING', dueDate: new Date('2026-08-15') },

      // PRJ-2026-0007: 3 completed, 1 in-progress
      { id: randomUUID(), projectId: agriProject.id, title: 'Cooperative Baseline Harvest Loss Audit', description: 'Documentation of seasonal storage losses across 42 farmer groups.', status: 'COMPLETED', dueDate: new Date('2026-02-25'), completedAt: new Date('2026-02-24') },
      { id: randomUUID(), projectId: agriProject.id, title: 'Solar Thermal Storage Unit Fabrication', description: 'Zero-emission cold chamber engineering using phase-change cooling materials.', status: 'COMPLETED', dueDate: new Date('2026-03-30'), completedAt: new Date('2026-03-28') },
      { id: randomUUID(), projectId: agriProject.id, title: 'Field Installation in Bishunpur Cluster', description: 'Installation and testing of first 4 decentralized storage micro-hubs.', status: 'COMPLETED', dueDate: new Date('2026-04-20'), completedAt: new Date('2026-04-18') },
      { id: randomUUID(), projectId: agriProject.id, title: 'Farmer Cooperative Management Handover', description: 'Training Krishi Mitras on inventory tracking and solar maintenance.', status: 'IN_PROGRESS', dueDate: new Date('2026-06-30') },
    ],
    skipDuplicates: true,
  });
  console.log('   ✅ Milestones seeded');

  // 12. Impact Metrics
  console.log('📈 Seeding project impact metrics...');
  await prisma.impactMetric.createMany({
    data: [
      { id: randomUUID(), projectId: waterProject.id, metricName: 'Pump Downtime', baselineValue: '12', currentValue: '3.2', targetValue: '2.0', unit: 'Days', verified: true },
      { id: randomUUID(), projectId: waterProject.id, metricName: 'Clean Water Availability', baselineValue: '68', currentValue: '94', targetValue: '98', unit: 'Percentage', verified: true },
      { id: randomUUID(), projectId: waterProject.id, metricName: 'Residents Protected', baselineValue: '0', currentValue: '2000', targetValue: '2000', unit: 'People', verified: true },
      { id: randomUUID(), projectId: waterProject.id, metricName: 'Borewells Monitored', baselineValue: '0', currentValue: '18', targetValue: '50', unit: 'Units', verified: true },

      { id: randomUUID(), projectId: agriProject.id, metricName: 'Post-Harvest Loss', baselineValue: '35', currentValue: '12', targetValue: '8', unit: 'Percentage', verified: true },
      { id: randomUUID(), projectId: agriProject.id, metricName: 'Farmers Reached', baselineValue: '0', currentValue: '3200', targetValue: '5000', unit: 'Farmers', verified: true },

      { id: randomUUID(), projectId: miningProject.id, metricName: 'Early Warning Lead Time', baselineValue: '0', currentValue: '48', targetValue: '72', unit: 'Hours', verified: true },
      { id: randomUUID(), projectId: miningProject.id, metricName: 'Settlement Dwellers Covered', baselineValue: '0', currentValue: '1200', targetValue: '4500', unit: 'Residents', verified: true },

      { id: randomUUID(), projectId: eduProject.id, metricName: 'Foundational Numeracy Gain', baselineValue: '32', currentValue: '68', targetValue: '80', unit: 'Percentage', verified: true },
      { id: randomUUID(), projectId: eduProject.id, metricName: 'Primary Students Active', baselineValue: '0', currentValue: '650', targetValue: '1200', unit: 'Students', verified: true },
    ],
    skipDuplicates: true,
  });
  console.log('   ✅ Impact metrics seeded');

  // 13. Ecosystem Activities
  console.log('📡 Seeding ecosystem activities feed...');
  await prisma.activity.createMany({
    data: [
      { id: randomUUID(), type: 'MILESTONE_COMPLETED', message: 'BIT Mesra completed Pilot Cluster Installation for Smart Water Network in Murhu Block', projectId: waterProject.id, challengeId: waterChallenge.id, organizationId: bitOrg.id },
      { id: randomUUID(), type: 'PROJECT_STARTED', message: 'Project PRJ-2026-0007 (Tribal Pulse & Millets Cold Storage) entered Field Pilot stage in Gumla', projectId: agriProject.id, challengeId: agriChallenge.id, organizationId: bauOrg.id },
      { id: randomUUID(), type: 'IMPACT_RECORDED', message: 'Pump breakdown downtime in Murhu reduced from 12 days to 3.2 days (verified by DW&S)', projectId: waterProject.id, organizationId: jalSahiyaOrg.id },
      { id: randomUUID(), type: 'IDEA_SUBMITTED', message: 'Prof. Anand Verma submitted solution approach for Rural Water Pump Reliability', ideaId: waterIdea.id, challengeId: waterChallenge.id, organizationId: bitOrg.id },
      { id: randomUUID(), type: 'CHALLENGE_CREATED', message: 'Murhu Gram Panchayat logged challenge JS-2026-00024: Frequent Handpump Breakdowns', challengeId: waterChallenge.id, organizationId: jalSahiyaOrg.id },
      { id: randomUUID(), type: 'MILESTONE_COMPLETED', message: 'IIT (ISM) Dhanbad completed Subsurface Extensometer Mesh Prototype for Jharia', projectId: miningProject.id, challengeId: miningChallenge.id, organizationId: iitDhanbadOrg.id },
      { id: randomUUID(), type: 'STATUS_CHANGED', message: 'Challenge JS-2024-00003 (Mine Subsidence Early Warning) promoted to ACTIVE PILOT', challengeId: miningChallenge.id, organizationId: cclOrg.id },
      { id: randomUUID(), type: 'IMPACT_RECORDED', message: '650 tribal primary students enrolled in offline bilingual Ol Chiki modules in Dumka', projectId: eduProject.id, challengeId: eduChallenge.id, organizationId: dumkaEduOrg.id },
      { id: randomUUID(), type: 'PROJECT_STARTED', message: 'Tata Steel CSR committed technical mentorship & co-funding for Project PRJ-2026-0012', projectId: waterProject.id, organizationId: tataSteelOrg.id },
    ],
    skipDuplicates: true,
  });
  console.log('   ✅ Ecosystem activities seeded');

  console.log('\n✨ Database seeding completed successfully!\n');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
