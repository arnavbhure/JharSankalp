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

// bcrypt hash for 'password123'
const DEMO_PASSWORD_HASH = '$2a$10$nT./KCDTnYcBQnDil57EBubD4LzgEInm71XHaAjCCwni84A2AI6zG';

async function main() {
  console.log('🌱 Starting JharSankalp realistic demo data seeding...\n');

  // ─────────────────────────────────────────────────────────────
  // 1. DISTRICTS (24 Districts of Jharkhand)
  // ─────────────────────────────────────────────────────────────
  console.log('📍 1. Seeding 24 Jharkhand districts...');
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

  // ─────────────────────────────────────────────────────────────
  // 2. ORGANIZATIONS (Universities, Industry, NGOs, Government)
  // ─────────────────────────────────────────────────────────────
  console.log('🏛️  2. Seeding multi-stakeholder organizations...');

  const bitOrg = await prisma.organization.upsert({
    where: { id: '20000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '20000000-0000-0000-0000-000000000001',
      name: 'Birla Institute of Technology (BIT Mesra)',
      type: 'UNIVERSITY',
      description: 'Premier technical research university leading rural IoT, vibration sensors, and telemetry systems.',
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
      name: 'Birsa Agricultural University (BAU Ranchi)',
      type: 'UNIVERSITY',
      description: 'State agricultural university developing indigenous soil diagnostics, cold chain storage, and climate-resilient crops.',
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
      description: 'National institute specializing in mining geophysics, rock mechanics, and subsurface early subsidence warning.',
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
      description: 'Community water sanitation grassroots federation of tribal women caretakers maintaining village handpumps.',
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
      description: 'Educational technology cooperative specializing in solar-powered offline bilingual Santhali (Ol Chiki) learning modules.',
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
      name: 'Central Coalfields Limited (CCL CSR Wing)',
      type: 'INDUSTRY',
      description: 'Public sector coal enterprise collaborating on coalfield safety, subsidence telemetry, and community health.',
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
      description: 'State nodal department orchestrating university R&D translation, pilot funding, and societal challenge resolution.',
      website: 'https://jharkhand.gov.in',
      districtId: districtMap['Ranchi'],
      isVerified: true,
    },
  });

  const gumlaKvkOrg = await prisma.organization.upsert({
    where: { id: '20000000-0000-0000-0000-000000000009' },
    update: {},
    create: {
      id: '20000000-0000-0000-0000-000000000009',
      name: 'Krishi Vigyan Kendra (KVK Gumla)',
      type: 'COLLEGE',
      description: 'ICAR agricultural extension center training tribal farmer groups in soil health and pulse preservation.',
      districtId: districtMap['Gumla'],
      isVerified: true,
    },
  });
  console.log('   ✅ 9 organizations seeded');

  // ─────────────────────────────────────────────────────────────
  // 3. USERS (10 Realistic Demo Personas)
  // ─────────────────────────────────────────────────────────────
  console.log('👥 3. Seeding 10 authentic stakeholder personas...');

  // Citizen 1: Murhu Water Sahiya
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
      phone: '+91 94311 88201',
      bio: 'Jal Sahiya coordinator and tribal community water rights advocate in Murhu Block.',
      organizationId: jalSahiyaOrg.id,
      isEmailVerified: true,
      isActive: true,
    },
  });

  // University 1: BIT Mesra R&D Lead
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
      phone: '+91 98351 44520',
      bio: 'Professor of Embedded Systems & Director of Rural Telemetry Lab at BIT Mesra.',
      organizationId: bitOrg.id,
      isEmailVerified: true,
      isActive: true,
    },
  });

  // Government 1: Block Development Officer (Murhu, Khunti)
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
      phone: '+91 94311 22100',
      bio: 'Block Development Officer (BDO), Murhu Block, Khunti District.',
      organizationId: jharGovOrg.id,
      isEmailVerified: true,
      isActive: true,
    },
  });

  // Industry 1: Tata Steel CSR Program Director
  const partnerUser = await prisma.user.upsert({
    where: { email: 'sanjay.oraon@tatasteel.com' },
    update: { isEmailVerified: true, passwordHash: DEMO_PASSWORD_HASH },
    create: {
      id: '10000000-0000-0000-0000-000000000004',
      name: 'Sanjay Oraon',
      email: 'sanjay.oraon@tatasteel.com',
      passwordHash: DEMO_PASSWORD_HASH,
      role: 'INDUSTRY',
      district: 'East Singhbhum',
      phone: '+91 92345 88910',
      bio: 'Lead CSR Rural Technology Implementation Partner at Tata Steel Rural Development Society.',
      organizationId: tataSteelOrg.id,
      isEmailVerified: true,
      isActive: true,
    },
  });

  // Platform Superadmin (Primary admin account)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@jharsankalp.in' },
    update: { isEmailVerified: true, passwordHash: DEMO_PASSWORD_HASH, role: 'SUPER_ADMIN' },
    create: {
      id: '10000000-0000-0000-0000-000000000005',
      name: 'Jharkhand State IT Mission Admin',
      email: 'admin@jharsankalp.in',
      passwordHash: DEMO_PASSWORD_HASH,
      role: 'SUPER_ADMIN',
      district: 'Ranchi',
      phone: '+91 94311 00001',
      bio: 'System Administrator, JharSankalp State Innovation Exchange.',
      organizationId: jharGovOrg.id,
      isEmailVerified: true,
      isActive: true,
    },
  });

  // Also support admin@jharsankalp.gov.in alias
  await prisma.user.upsert({
    where: { email: 'admin@jharsankalp.gov.in' },
    update: { isEmailVerified: true, passwordHash: DEMO_PASSWORD_HASH, role: 'SUPER_ADMIN' },
    create: {
      id: '10000000-0000-0000-0000-000000000011',
      name: 'Jharkhand State IT Mission Admin (Gov Portal)',
      email: 'admin@jharsankalp.gov.in',
      passwordHash: DEMO_PASSWORD_HASH,
      role: 'SUPER_ADMIN',
      district: 'Ranchi',
      phone: '+91 94311 00002',
      bio: 'System Administrator, JharSankalp State Innovation Exchange (Govt domain alias).',
      organizationId: jharGovOrg.id,
      isEmailVerified: true,
      isActive: true,
    },
  });

  // Citizen 2: Dumka Tribal Educator & Farmer
  const citizenUser2 = await prisma.user.upsert({
    where: { email: 'birsa.soren@jharsankalp.in' },
    update: { isEmailVerified: true, passwordHash: DEMO_PASSWORD_HASH },
    create: {
      id: '10000000-0000-0000-0000-000000000006',
      name: 'Birsa Soren',
      email: 'birsa.soren@jharsankalp.in',
      passwordHash: DEMO_PASSWORD_HASH,
      role: 'CITIZEN',
      district: 'Dumka',
      phone: '+91 94311 77312',
      bio: 'Village Pradhan and tribal educator working on mother-tongue primary learning tools in Shikaripara.',
      organizationId: dumkaEduOrg.id,
      isEmailVerified: true,
      isActive: true,
    },
  });

  // University 2: BAU Agricultural Scientist
  const facultyUser2 = await prisma.user.upsert({
    where: { email: 'sudhir.sahay@bauranchi.org' },
    update: { isEmailVerified: true, passwordHash: DEMO_PASSWORD_HASH },
    create: {
      id: '10000000-0000-0000-0000-000000000007',
      name: 'Dr. Sudhir Sahay',
      email: 'sudhir.sahay@bauranchi.org',
      passwordHash: DEMO_PASSWORD_HASH,
      role: 'UNIVERSITY',
      district: 'Ranchi',
      phone: '+91 94313 55601',
      bio: 'Principal Scientist, Department of Agronomy, Birsa Agricultural University.',
      organizationId: bauOrg.id,
      isEmailVerified: true,
      isActive: true,
    },
  });

  // University 3: IIT ISM Dhanbad Mining Geophysics
  const facultyUser3 = await prisma.user.upsert({
    where: { email: 'amitava.roy@iitism.ac.in' },
    update: { isEmailVerified: true, passwordHash: DEMO_PASSWORD_HASH },
    create: {
      id: '10000000-0000-0000-0000-000000000008',
      name: 'Dr. Amitava Roy',
      email: 'amitava.roy@iitism.ac.in',
      passwordHash: DEMO_PASSWORD_HASH,
      role: 'UNIVERSITY',
      district: 'Dhanbad',
      phone: '+91 94701 33209',
      bio: 'Senior Geophysicist, Geotechnical Engineering & InSAR Remote Sensing Lab, IIT (ISM) Dhanbad.',
      organizationId: iitDhanbadOrg.id,
      isEmailVerified: true,
      isActive: true,
    },
  });

  // Government 2: State Nodal Officer (Ranchi)
  const govtUser2 = await prisma.user.upsert({
    where: { email: 'ananya.sen@jharkhand.gov.in' },
    update: { isEmailVerified: true, passwordHash: DEMO_PASSWORD_HASH },
    create: {
      id: '10000000-0000-0000-0000-000000000009',
      name: 'Smt. Ananya Sen, IAS',
      email: 'ananya.sen@jharkhand.gov.in',
      passwordHash: DEMO_PASSWORD_HASH,
      role: 'GOVERNMENT',
      district: 'Ranchi',
      phone: '+91 94311 00551',
      bio: 'Director, State Higher & Technical Education Innovation Council, Govt. of Jharkhand.',
      organizationId: jharGovOrg.id,
      isEmailVerified: true,
      isActive: true,
    },
  });

  // Industry 2: Central Coalfields Safety Lead
  const partnerUser2 = await prisma.user.upsert({
    where: { email: 'vikas.agarwal@ccl.gov.in' },
    update: { isEmailVerified: true, passwordHash: DEMO_PASSWORD_HASH },
    create: {
      id: '10000000-0000-0000-0000-000000000010',
      name: 'Vikas Agarwal',
      email: 'vikas.agarwal@ccl.gov.in',
      passwordHash: DEMO_PASSWORD_HASH,
      role: 'INDUSTRY',
      district: 'Dhanbad',
      phone: '+91 94311 66782',
      bio: 'General Manager (CSR & Safety), Central Coalfields Limited, Dhanbad.',
      organizationId: cclOrg.id,
      isEmailVerified: true,
      isActive: true,
    },
  });
  console.log('   ✅ 10 demo user accounts seeded');

  // ─────────────────────────────────────────────────────────────
  // 4. CHALLENGES (7 Core Focus Areas Across Jharkhand)
  // ─────────────────────────────────────────────────────────────
  console.log('⚡ 4. Seeding 7 authentic civic challenges...');

  // Challenge 1: Khunti (Water Management)
  const waterChallenge = await prisma.challenge.upsert({
    where: { publicId: 'JS-2026-00024' },
    update: { verificationStatus: 'VERIFIED' },
    create: {
      id: '30000000-0000-0000-0000-000000000001',
      publicId: 'JS-2026-00024',
      challengeCode: 'JS-2026-00024',
      title: 'Frequent Breakdown of Drinking Water Handpumps in Murhu Block',
      description: 'Handpumps fail repeatedly during dry months, leaving 2,000+ tribal residents in 14 villages without clean drinking water. Repairs take 8–12 days due to lack of real-time monitoring and reporting delays.',
      domain: 'Water Management',
      subdomain: 'Rural Drinking Water Telemetry',
      districtId: districtMap['Khunti'],
      block: 'Murhu',
      panchayatOrUlb: 'Murhu Gram Panchayat',
      status: 'ACTIVE',
      priority: 'HIGH',
      severity: 'HIGH',
      urgency: 'HIGH',
      verificationStatus: 'VERIFIED',
      sourceType: 'CITIZEN',
      affectedPopulation: 2000,
      submittedById: citizenUser.id,
      organizationId: jalSahiyaOrg.id,
      aiModelVersion: 'JharSankalp-v1.0',
      aiAnalyzedAt: new Date(),
    },
  });

  // Challenge 2: Gumla (Agriculture)
  const agriChallenge = await prisma.challenge.upsert({
    where: { publicId: 'JS-2026-00019' },
    update: { verificationStatus: 'VERIFIED' },
    create: {
      id: '30000000-0000-0000-0000-000000000002',
      publicId: 'JS-2026-00019',
      challengeCode: 'JS-2026-00019',
      title: 'Post-Harvest Storage & Soil Degradation in Tribal Belts',
      description: 'Lack of rapid soil testing and cold chains causes 35% crop loss and over-fertilization among smallholder farmers in Gumla district.',
      domain: 'Agriculture',
      subdomain: 'Decentralized Cold Chain & Soil Assay',
      districtId: districtMap['Gumla'],
      block: 'Bishunpur',
      panchayatOrUlb: 'Bishunpur Block',
      status: 'ACTIVE',
      priority: 'HIGH',
      severity: 'HIGH',
      urgency: 'HIGH',
      verificationStatus: 'VERIFIED',
      sourceType: 'CITIZEN',
      affectedPopulation: 3200,
      submittedById: citizenUser.id,
      organizationId: gumlaKvkOrg.id,
    },
  });

  // Challenge 3: Dhanbad (Mining Safety)
  const miningChallenge = await prisma.challenge.upsert({
    where: { publicId: 'JS-2024-00003' },
    update: { verificationStatus: 'VERIFIED' },
    create: {
      id: '30000000-0000-0000-0000-000000000003',
      publicId: 'JS-2024-00003',
      challengeCode: 'JS-2024-00003',
      title: 'Early Detection of Ground Subsidence & Mine Inundation in Jharia',
      description: 'Unmonitored subsurface coal fires and subsidence threaten residential settlements across the Jharia coalfield belt.',
      domain: 'Mining Safety',
      subdomain: 'Geotechnical InSAR & Fissure Telemetry',
      districtId: districtMap['Dhanbad'],
      block: 'Jharia',
      panchayatOrUlb: 'Jharia Municipality Ward 12-18',
      status: 'ACTIVE',
      priority: 'CRITICAL',
      severity: 'CRITICAL',
      urgency: 'CRITICAL',
      verificationStatus: 'VERIFIED',
      sourceType: 'GOVERNMENT',
      affectedPopulation: 1200,
      submittedById: govtUser.id,
      organizationId: cclOrg.id,
    },
  });

  // Challenge 4: West Singhbhum (Healthcare)
  const healthChallenge = await prisma.challenge.upsert({
    where: { publicId: 'JS-2026-00008' },
    update: { verificationStatus: 'VERIFIED' },
    create: {
      id: '30000000-0000-0000-0000-000000000004',
      publicId: 'JS-2026-00008',
      challengeCode: 'JS-2026-00008',
      title: 'Point-of-Care Diagnostic Accessibility in Remote Forest Hamlets',
      description: 'Severe maternal anemia goes undetected in deep Saranda forest hamlets located hours away from primary health centers.',
      domain: 'Healthcare',
      subdomain: 'ASHA Portable Diagnostic Telemetry',
      districtId: districtMap['West Singhbhum'],
      block: 'Manoharpur',
      panchayatOrUlb: 'Saranda Forest Range',
      status: 'ACTIVE',
      priority: 'HIGH',
      severity: 'HIGH',
      urgency: 'HIGH',
      verificationStatus: 'VERIFIED',
      sourceType: 'CITIZEN',
      affectedPopulation: 1800,
      submittedById: citizenUser.id,
    },
  });

  // Challenge 5: Dumka (Education)
  const eduChallenge = await prisma.challenge.upsert({
    where: { publicId: 'JS-2026-00014' },
    update: { verificationStatus: 'VERIFIED' },
    create: {
      id: '30000000-0000-0000-0000-000000000005',
      publicId: 'JS-2026-00014',
      challengeCode: 'JS-2026-00014',
      title: 'Educational Equity & Multilingual Digital Access in Santhal Pargana',
      description: 'Non-electrified tribal primary schools lack foundational numeracy learning tools in their mother tongue Santhali (Ol Chiki script).',
      domain: 'Education',
      subdomain: 'Offline Solar Micro-Servers & Ol Chiki',
      districtId: districtMap['Dumka'],
      block: 'Shikaripara',
      panchayatOrUlb: 'Shikaripara Panchayat',
      status: 'ACTIVE',
      priority: 'HIGH',
      severity: 'HIGH',
      urgency: 'HIGH',
      verificationStatus: 'VERIFIED',
      sourceType: 'CITIZEN',
      affectedPopulation: 1700,
      submittedById: citizenUser2.id,
      organizationId: dumkaEduOrg.id,
    },
  });

  // Challenge 6: Latehar (Environment)
  const envChallenge = await prisma.challenge.upsert({
    where: { publicId: 'JS-2026-00021' },
    update: { verificationStatus: 'VERIFIED' },
    create: {
      id: '30000000-0000-0000-0000-000000000006',
      publicId: 'JS-2026-00021',
      challengeCode: 'JS-2026-00021',
      title: 'Forest Economy & Acoustic Chainsaw Detection in Betla Buffer Zone',
      description: 'Illegal tree felling in the sal forest buffer zone threatens tribal minor forest produce (MFP) collection and biodiversity.',
      domain: 'Environment',
      subdomain: 'Bioacoustic Canopy Listening Nodes',
      districtId: districtMap['Latehar'],
      block: 'Garu',
      panchayatOrUlb: 'Betla National Park Fringe',
      status: 'ACTIVE',
      priority: 'MEDIUM',
      severity: 'MEDIUM',
      urgency: 'MEDIUM',
      verificationStatus: 'VERIFIED',
      sourceType: 'CITIZEN',
      affectedPopulation: 1100,
      submittedById: citizenUser.id,
    },
  });

  // Challenge 7: Ranchi (Urban Civic Infrastructure)
  const urbanChallenge = await prisma.challenge.upsert({
    where: { publicId: 'JS-2026-00033' },
    update: { verificationStatus: 'VERIFIED' },
    create: {
      id: '30000000-0000-0000-0000-000000000007',
      publicId: 'JS-2026-00033',
      challengeCode: 'JS-2026-00033',
      title: 'Monsoon Urban Drain Siltation & Flash Inundation in Harmu River Basin',
      description: 'Unmonitored solid waste accumulation chokes peri-urban drainage channels, triggering basement flooding and water-borne pathogens for 4,500 residents along Harmu corridor.',
      domain: 'Urban Development',
      subdomain: 'Ultrasonic Drain Level Telemetry',
      districtId: districtMap['Ranchi'],
      block: 'Kanke',
      panchayatOrUlb: 'Ranchi Municipal Corporation Ward 26',
      status: 'ACTIVE',
      priority: 'HIGH',
      severity: 'HIGH',
      urgency: 'HIGH',
      verificationStatus: 'VERIFIED',
      sourceType: 'CITIZEN',
      affectedPopulation: 4500,
      submittedById: citizenUser.id,
      organizationId: jharGovOrg.id,
    },
  });
  console.log('   ✅ 7 core challenges seeded');

  // ─────────────────────────────────────────────────────────────
  // 5. EVIDENCE METADATA (Attached to Challenges)
  // ─────────────────────────────────────────────────────────────
  console.log('📎 5. Seeding realistic evidence metadata (Photos, Lab Reports, Resolutions)...');

  const evidenceItems = [
    {
      id: '80000000-0000-0000-0000-000000000001',
      challengeId: waterChallenge.id,
      type: 'IMAGE',
      url: '/rural_water_iot.jpg',
      filename: 'murhu_handpump_broken_valve_khunti.jpg',
      mimeType: 'image/jpeg',
      sizeBytes: 2450120,
      metadata: { caption: 'Cracked handle socket and rusted cylinder at Murhu village square handpump' },
      isPublic: true,
    },
    {
      id: '80000000-0000-0000-0000-000000000002',
      challengeId: waterChallenge.id,
      type: 'DOCUMENT',
      url: '/documents/murhu_panchayat_resolution_dw&s.pdf',
      filename: 'gram_panchayat_resolution_murhu_water_security.pdf',
      mimeType: 'application/pdf',
      sizeBytes: 890450,
      metadata: { caption: 'Gram Sabha resolution unanimously demanding real-time pump monitoring' },
      isPublic: true,
    },
    {
      id: '80000000-0000-0000-0000-000000000003',
      challengeId: waterChallenge.id,
      type: 'DOCUMENT',
      url: '/documents/phed_water_turbidity_khunti.pdf',
      filename: 'phed_water_quality_test_report_khunti.pdf',
      mimeType: 'application/pdf',
      sizeBytes: 1240800,
      metadata: { caption: 'District PHED laboratory test indicating elevated turbidity during pump cavitation' },
      isPublic: true,
    },
    {
      id: '80000000-0000-0000-0000-000000000004',
      challengeId: agriChallenge.id,
      type: 'IMAGE',
      url: '/jharkhand_innovation_field_pilot.jpg',
      filename: 'gumla_pulse_spoilage_field_sample.jpg',
      mimeType: 'image/jpeg',
      sizeBytes: 1850200,
      metadata: { caption: 'Fungal decay on Arhar pulse harvests in Bishunpur traditional grain bins' },
      isPublic: true,
    },
    {
      id: '80000000-0000-0000-0000-000000000005',
      challengeId: miningChallenge.id,
      type: 'IMAGE',
      url: '/mining_fissure_jharia.jpg',
      filename: 'jharia_ground_fissure_settlement.jpg',
      mimeType: 'image/jpeg',
      sizeBytes: 3120400,
      metadata: { caption: 'Active 4cm tension crack near residential boundary in Jharia Ward 14' },
      isPublic: true,
    },
    {
      id: '80000000-0000-0000-0000-000000000006',
      challengeId: miningChallenge.id,
      type: 'DOCUMENT',
      url: '/documents/dgms_subsidence_survey_jharia.pdf',
      filename: 'dgms_subsidence_risk_survey_2025.pdf',
      mimeType: 'application/pdf',
      sizeBytes: 4200150,
      metadata: { caption: 'Directorate General of Mines Safety geotechnical hazard classification report' },
      isPublic: true,
    },
    {
      id: '80000000-0000-0000-0000-000000000007',
      challengeId: eduChallenge.id,
      type: 'IMAGE',
      url: '/santhal_primary_school.jpg',
      filename: 'shikaripara_primary_school_ol_chiki.jpg',
      mimeType: 'image/jpeg',
      sizeBytes: 1950300,
      metadata: { caption: 'Students in Shikaripara studying numeracy using handwritten Ol Chiki charts' },
      isPublic: true,
    },
  ];

  for (const item of evidenceItems) {
    await prisma.challengeEvidence.upsert({
      where: { id: item.id },
      update: {},
      create: item,
    });
  }
  console.log(`   ✅ ${evidenceItems.length} evidence metadata records seeded`);

  // ─────────────────────────────────────────────────────────────
  // 6. IDEAS (Proposed Solutions Mapped to Challenges)
  // ─────────────────────────────────────────────────────────────
  console.log('💡 6. Seeding 7 innovative solution proposals...');

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
      tags: ['TRL-6', 'IoT Telemetry', 'Acoustic Sensors', 'LoRaWAN', 'SMS Gateway'],
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
      submittedById: facultyUser2.id,
      relatedChallengeId: agriChallenge.id,
      authorName: 'Dr. Sudhir Sahay & BAU Agronomy Lab',
      authorRole: 'Agritech Specialist',
      supportersCount: 98,
      collaboratorsCount: 6,
      tags: ['TRL-5', 'Spectroscopy', 'Bluetooth', 'Soil Health Card'],
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
      submittedById: facultyUser3.id,
      relatedChallengeId: miningChallenge.id,
      authorName: 'Dr. Amitava Roy & Geophysics Team',
      authorRole: 'Senior Geophysicist',
      supportersCount: 114,
      collaboratorsCount: 5,
      tags: ['TRL-5', 'MEMS Tiltmeters', 'InSAR Fusion', 'Early Warning'],
    },
  });

  const healthIdea = await prisma.idea.upsert({
    where: { id: '40000000-0000-0000-0000-000000000004' },
    update: {},
    create: {
      id: '40000000-0000-0000-0000-000000000004',
      title: 'Solar-Powered Backpack Diagnostic Kit for Tribal ASHA Workers',
      description: 'Non-invasive hemoglobinometer and digital vitals kit enabling maternal screening during routine forest hamlet visits in Kolhan division.',
      domain: 'Healthcare',
      district: 'West Singhbhum',
      status: 'IN_COLLABORATION',
      submittedById: citizenUser.id,
      relatedChallengeId: healthChallenge.id,
      authorName: 'Rural Health Mission Team',
      authorRole: 'ASHA Facilitator',
      supportersCount: 165,
      collaboratorsCount: 9,
      tags: ['TRL-7', 'Diagnostic Hardware', 'Solar Battery', 'Digital Health Record'],
    },
  });

  const eduIdea = await prisma.idea.upsert({
    where: { id: '40000000-0000-0000-0000-000000000005' },
    update: {},
    create: {
      id: '40000000-0000-0000-0000-000000000005',
      title: 'Offline Digital Learning Hub with Ol Chiki NCERT Modules',
      description: 'Solar-powered offline Wi-Fi micro-servers broadcasting bilingual interactive primary education content to low-cost tablets in non-electrified schools.',
      domain: 'Education',
      district: 'Dumka',
      status: 'IN_COLLABORATION',
      submittedById: citizenUser2.id,
      relatedChallengeId: eduChallenge.id,
      authorName: 'Santhal Pargana Tech Collective',
      authorRole: 'EdTech Innovator',
      supportersCount: 88,
      collaboratorsCount: 4,
      tags: ['TRL-6', 'Offline Wi-Fi Mesh', 'Solar Micro-Server', 'Ol Chiki'],
    },
  });

  const envIdea = await prisma.idea.upsert({
    where: { id: '40000000-0000-0000-0000-000000000006' },
    update: {},
    create: {
      id: '40000000-0000-0000-0000-000000000006',
      title: 'Community Forest Monitoring Platform with Canopy Audio ML',
      description: 'Acoustic listening nodes in tree canopies detecting chainsaw frequencies and alerting forest guards and Van Suraksha Samitis in Betla fringe.',
      domain: 'Environment',
      district: 'Latehar',
      status: 'APPROVED',
      submittedById: facultyUser2.id,
      relatedChallengeId: envChallenge.id,
      authorName: 'BAU Forestry Department',
      authorRole: 'Forest Ecologist',
      supportersCount: 76,
      collaboratorsCount: 5,
      tags: ['TRL-4', 'Canopy Acoustic Sensors', 'Audio ML', 'GPS Geofencing'],
    },
  });

  const urbanIdea = await prisma.idea.upsert({
    where: { id: '40000000-0000-0000-0000-000000000007' },
    update: {},
    create: {
      id: '40000000-0000-0000-0000-000000000007',
      title: 'Ultrasonic Drain Inundation Warning & Trash Siltation Telemetry',
      description: 'Solar micro-radar level sensors placed across 12 culverts on Harmu River drainage grid to trigger municipal dredging alerts.',
      domain: 'Urban Development',
      district: 'Ranchi',
      status: 'APPROVED',
      submittedById: facultyUser.id,
      relatedChallengeId: urbanChallenge.id,
      authorName: 'BIT Mesra Civil & Environmental Tech Group',
      authorRole: 'Urban Telemetry Researcher',
      supportersCount: 64,
      collaboratorsCount: 4,
      tags: ['TRL-4', 'Radar Level Sensor', 'Municipal Telemetry', 'Flood Warning'],
    },
  });
  console.log('   ✅ 7 ideas seeded');

  // ─────────────────────────────────────────────────────────────
  // 7. COLLABORATIONS & MULTI-STAKEHOLDER CONSORTIA
  // ─────────────────────────────────────────────────────────────
  console.log('👥 7. Seeding 7 collaborative consortia & member rosters...');

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
      stage: 'Field Pilot',
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
      stage: 'Prototype',
      progressPercentage: 64,
      leadPartner: 'IIT (ISM) Dhanbad',
      institutionName: 'IIT (ISM) Dhanbad + Central Coalfields Ltd',
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
      stage: 'Impact Verification',
      progressPercentage: 90,
      leadPartner: 'Rural Health Mission Jharkhand',
      institutionName: 'BIT Mesra + West Singhbhum Civil Hospital',
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
      stage: 'Implementation',
      progressPercentage: 75,
      leadPartner: 'Santhal Pargana Tech Collective',
      institutionName: 'Dumka District Education Office + State IT Mission',
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
      stage: 'Field Pilot',
      progressPercentage: 38,
      leadPartner: 'Latehar Forest Division',
      institutionName: 'BAU Forestry Department',
      relatedChallengeId: envChallenge.id,
      relatedIdeaId: envIdea.id,
      neededSkills: ['Audio ML Classification', 'Hardware Weatherproofing', 'Forest Law'],
    },
  });

  const urbanCollab = await prisma.collaboration.upsert({
    where: { id: '50000000-0000-0000-0000-000000000007' },
    update: {},
    create: {
      id: '50000000-0000-0000-0000-000000000007',
      title: 'Harmu Drainage Telemetry Consortium',
      description: 'Deployment of ultrasonic level sensors at monsoon flood choke points with live alerts to Municipal Ward Control Rooms.',
      status: 'ACTIVE',
      domain: 'Urban Development',
      district: 'Ranchi',
      stage: 'Concept',
      progressPercentage: 25,
      leadPartner: 'BIT Mesra Civil Engineering',
      institutionName: 'BIT Mesra + Ranchi Municipal Corporation',
      relatedChallengeId: urbanChallenge.id,
      relatedIdeaId: urbanIdea.id,
      neededSkills: ['Sensor Networks', 'Urban Hydrology', 'Municipal Ops'],
    },
  });

  // Seed Members for Collaborations
  const collabMembers = [
    { id: '51000000-0000-0000-0000-000000000001', collaborationId: waterCollab.id, userId: facultyUser.id, memberName: 'Prof. Anand Verma', role: 'LEAD', institution: 'BIT Mesra' },
    { id: '51000000-0000-0000-0000-000000000002', collaborationId: waterCollab.id, userId: citizenUser.id, memberName: 'Kavita Munda', role: 'COMMUNITY_PARTNER', institution: 'Murhu Jal Sahiya' },
    { id: '51000000-0000-0000-0000-000000000003', collaborationId: waterCollab.id, userId: govtUser.id, memberName: 'Dr. Rajesh Kumar', role: 'MENTOR', institution: 'BDO Murhu, Khunti' },
    { id: '51000000-0000-0000-0000-000000000004', collaborationId: waterCollab.id, userId: partnerUser.id, memberName: 'Sanjay Oraon', role: 'INDUSTRY_PARTNER', institution: 'Tata Steel TSRDS' },
    { id: '51000000-0000-0000-0000-000000000005', collaborationId: agriCollab.id, userId: facultyUser2.id, memberName: 'Dr. Sudhir Sahay', role: 'LEAD', institution: 'BAU Ranchi' },
    { id: '51000000-0000-0000-0000-000000000006', collaborationId: agriCollab.id, userId: citizenUser.id, memberName: 'Bhudhan Oraon', role: 'COMMUNITY_PARTNER', institution: 'Gumla Krishi Samiti' },
    { id: '51000000-0000-0000-0000-000000000007', collaborationId: miningCollab.id, userId: facultyUser3.id, memberName: 'Dr. Amitava Roy', role: 'LEAD', institution: 'IIT (ISM) Dhanbad' },
    { id: '51000000-0000-0000-0000-000000000008', collaborationId: miningCollab.id, userId: partnerUser2.id, memberName: 'Vikas Agarwal', role: 'INDUSTRY_PARTNER', institution: 'CCL CSR' },
    { id: '51000000-0000-0000-0000-000000000009', collaborationId: healthCollab.id, userId: citizenUser.id, memberName: 'Sushila Soy', role: 'LEAD', institution: 'ASHA Kolhan' },
    { id: '51000000-0000-0000-0000-000000000010', collaborationId: eduCollab.id, userId: citizenUser2.id, memberName: 'Birsa Soren', role: 'COMMUNITY_PARTNER', institution: 'Santhal Tech' },
  ];

  for (const m of collabMembers) {
    await prisma.collaborationMember.upsert({
      where: { id: m.id },
      update: {},
      create: m,
    });
  }
  console.log('   ✅ 7 consortia & members seeded');

  // ─────────────────────────────────────────────────────────────
  // 8. SOLUTIONS (Verified Developed Solutions)
  // ─────────────────────────────────────────────────────────────
  console.log('✓ 8. Seeding 7 developed solutions with technology profiles...');

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
      leadPartners: ['BIT Mesra', 'Murhu Jal Sahiya Collective', 'Khunti DW&S', 'Tata Steel CSR'],
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
      stage: 'FIELD_PILOT',
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
      stage: 'PROTOTYPE',
      technologyTags: ['InSAR Fusion', 'MEMS Tiltmeters', 'Cellular Gateway', 'Siren Dispatch'],
      technologyType: 'Sensors + Early Warning',
      progressPercentage: 64,
      impactSummary: '8 settlement monitoring nodes · Sub-millimeter ground movement alert accuracy',
      relatedChallengeId: miningChallenge.id,
      relatedCollaborationId: miningCollab.id,
      leadPartners: ['IIT (ISM) Dhanbad', 'Central Coalfields Ltd', 'Jharia Rehabilitation Authority'],
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
      stage: 'IMPACT_VERIFICATION',
      technologyTags: ['Point-of-Care Diagnostics', 'Solar Battery', 'Digital Health Record', 'Vernacular Voice'],
      technologyType: 'Diagnostic Hardware',
      progressPercentage: 90,
      impactSummary: '1,800+ screenings · 24 forest hamlets covered · 34 high-risk anemia cases flagged',
      relatedChallengeId: healthChallenge.id,
      relatedCollaborationId: healthCollab.id,
      leadPartners: ['Rural Health Mission Jharkhand', 'Chaibasa Civil Hospital', 'BIT Mesra'],
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
      stage: 'IMPLEMENTATION',
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
      stage: 'FIELD_PILOT',
      technologyTags: ['Canopy Acoustic Sensors', 'Machine Learning Audio Classifier', 'Offline Map', 'GPS Geofencing'],
      technologyType: 'Environmental Tech',
      progressPercentage: 38,
      impactSummary: '3 Van Suraksha Samitis · 450 hectares monitored · Zero illegal felling in pilot zone',
      relatedChallengeId: envChallenge.id,
      relatedCollaborationId: envCollab.id,
      leadPartners: ['Latehar Forest Division', 'Birsa Agricultural University Forestry Dept'],
    },
  });

  const urbanSolution = await prisma.solution.upsert({
    where: { id: '60000000-0000-0000-0000-000000000007' },
    update: {},
    create: {
      id: '60000000-0000-0000-0000-000000000007',
      title: 'Harmu Drainage Telemetry & Culvert Alert Hub',
      tagline: 'Solar ultrasonic level transceivers predicting monsoon overflow at peri-urban culverts',
      description: 'Low-cost ultrasonic level sensing collars warning Municipal Ward Officers 3 hours before flash canal overflows during torrential monsoon cloudbursts.',
      domain: 'Urban Development',
      district: 'Ranchi',
      stage: 'RESEARCH_DESIGN',
      technologyTags: ['Ultrasonic Sonar', 'Solar Battery', 'Mesh Network', 'Municipal Dashboard'],
      technologyType: 'Smart City Infrastructure',
      progressPercentage: 25,
      impactSummary: '4,500 residents in Harmu basin covered · Rapid 15-minute alert latency',
      relatedChallengeId: urbanChallenge.id,
      relatedCollaborationId: urbanCollab.id,
      leadPartners: ['BIT Mesra Civil Tech Lab', 'RMC Ward 26 Control Unit'],
    },
  });
  console.log('   ✅ 7 solutions seeded');

  // ─────────────────────────────────────────────────────────────
  // 9. VERIFIED IMPACT RECORDS
  // ─────────────────────────────────────────────────────────────
  console.log('📊 9. Seeding verified district impact metrics...');

  const impactRecords = [
    {
      id: '71000000-0000-0000-0000-000000000001',
      solutionId: waterSolution.id,
      metricName: 'Villages Covered',
      metricValue: '14',
      metricUnit: 'Villages',
      district: 'Khunti',
      domain: 'Water Management',
      description: 'Panchayat drinking water handpumps actively monitored with solar IoT collars.',
    },
    {
      id: '71000000-0000-0000-0000-000000000002',
      solutionId: waterSolution.id,
      metricName: 'Residents Protected',
      metricValue: '2,000+',
      metricUnit: 'Residents',
      district: 'Khunti',
      domain: 'Water Management',
      description: 'Verified rural community members with continuous drinking water security.',
    },
    {
      id: '71000000-0000-0000-0000-000000000003',
      solutionId: waterSolution.id,
      metricName: 'Faster Issue Reporting',
      metricValue: '32%',
      metricUnit: 'Percent',
      district: 'Khunti',
      domain: 'Water Management',
      description: 'Automated telemetry reduced notification delay to BDO mechanics from 5 days to 2 hours.',
    },
    {
      id: '71000000-0000-0000-0000-000000000004',
      solutionId: waterSolution.id,
      metricName: 'Response Time Reduction',
      metricValue: '8 Days → 3 Days',
      metricUnit: 'Days',
      district: 'Khunti',
      domain: 'Water Management',
      description: 'Average pump breakdown resolution time dropped from 8 days to 3 days.',
    },
    {
      id: '71000000-0000-0000-0000-000000000005',
      solutionId: soilSolution.id,
      metricName: 'Farmers Supported',
      metricValue: '3,200',
      metricUnit: 'Farmers',
      district: 'Gumla',
      domain: 'Agriculture',
      description: 'Smallholder tribal cultivators using handheld soil recommendations.',
    },
    {
      id: '71000000-0000-0000-0000-000000000006',
      solutionId: healthSolution.id,
      metricName: 'Maternal Screenings Completed',
      metricValue: '1,800+',
      metricUnit: 'Screenings',
      district: 'West Singhbhum',
      domain: 'Healthcare',
      description: 'Non-invasive hemoglobin assays conducted by frontline ASHA workers in remote hamlets.',
    },
    {
      id: '71000000-0000-0000-0000-000000000007',
      solutionId: subsidenceSolution.id,
      metricName: 'Early Evacuation Lead Time',
      metricValue: '48 Hours',
      metricUnit: 'Hours',
      district: 'Dhanbad',
      domain: 'Mining Safety',
      description: 'Advance sensor warning window prior to subsurface road and settlement fissure breaches.',
    },
    {
      id: '71000000-0000-0000-0000-000000000008',
      solutionId: eduSolution.id,
      metricName: 'Students Supported',
      metricValue: '650',
      metricUnit: 'Students',
      district: 'Dumka',
      domain: 'Education',
      description: 'Tribal primary students actively learning with Ol Chiki digital modules.',
    },
    {
      id: '71000000-0000-0000-0000-000000000009',
      solutionId: envSolution.id,
      metricName: 'Hectares Forest Monitored',
      metricValue: '450',
      metricUnit: 'Hectares',
      district: 'Latehar',
      domain: 'Environment',
      description: 'Dense Sal forest protected under community acoustic sensor surveillance.',
    },
    {
      id: '71000000-0000-0000-0000-000000000010',
      solutionId: urbanSolution.id,
      metricName: 'Urban Inundation Damage Prevented',
      metricValue: '₹18 Lakhs',
      metricUnit: 'INR',
      district: 'Ranchi',
      domain: 'Urban Development',
      description: 'Estimated commercial inventory losses prevented via predictive drain de-silting dispatch.',
    },
  ];

  for (const ir of impactRecords) {
    await prisma.impactRecord.upsert({
      where: { id: ir.id },
      update: {},
      create: ir,
    });
  }
  console.log(`   ✅ ${impactRecords.length} impact records seeded`);

  // ─────────────────────────────────────────────────────────────
  // 10. STRUCTURED IMPLEMENTATION PROJECTS
  // ─────────────────────────────────────────────────────────────
  console.log('🚀 10. Seeding 7 structured implementation projects...');

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

  const urbanProject = await prisma.project.upsert({
    where: { referenceCode: 'PRJ-2026-0033' },
    update: {},
    create: {
      id: '70000000-0000-0000-0000-000000000007',
      referenceCode: 'PRJ-2026-0033',
      title: 'Harmu Drainage Ultrasonic Telemetry Pilot',
      description: 'Ultrasonic canal height transceivers and automated SMS dispatch warning municipal sanitation response teams before monsoon inundation breaches.',
      challengeId: urbanChallenge.id,
      ideaId: urbanIdea.id,
      leadOrganizationId: bitOrg.id,
      domain: 'Urban Development',
      district: 'Ranchi',
      block: 'Kanke Block',
      stage: 'RESEARCH_DESIGN',
      status: 'ACTIVE',
      affectedPopulation: 4500,
      locationDisplay: 'Ranchi · Harmu River Corridor',
      impactSummary: '4,500 Residents · 12 Ultrasonic Choke Nodes',
      startDate: new Date('2026-03-01'),
      expectedEndDate: new Date('2026-10-31'),
    },
  });
  console.log('   ✅ 7 implementation projects seeded');

  // ─────────────────────────────────────────────────────────────
  // 11. PROJECT PARTICIPANTS
  // ─────────────────────────────────────────────────────────────
  console.log('🤝 11. Seeding multi-organizational project participant teams...');

  const participants = [
    { id: '72000000-0000-0000-0000-000000000001', projectId: waterProject.id, organizationId: bitOrg.id, role: 'LEAD', contribution: 'Hardware Design & LoRaWAN Firmware' },
    { id: '72000000-0000-0000-0000-000000000002', projectId: waterProject.id, organizationId: jalSahiyaOrg.id, role: 'COMMUNITY_PARTNER', contribution: 'Community Co-Design & Pump Caretakers' },
    { id: '72000000-0000-0000-0000-000000000003', projectId: waterProject.id, organizationId: tataSteelOrg.id, role: 'TECHNICAL_PARTNER', contribution: 'Telemetry Cloud & Gateway Architecture' },
    { id: '72000000-0000-0000-0000-000000000004', projectId: waterProject.id, organizationId: jharGovOrg.id, role: 'FUNDING_PARTNER', contribution: 'State Directorate Pilot Grants' },

    { id: '72000000-0000-0000-0000-000000000005', projectId: agriProject.id, organizationId: bauOrg.id, role: 'LEAD', contribution: 'Agronomic Validation & Storage Chambers' },
    { id: '72000000-0000-0000-0000-000000000006', projectId: agriProject.id, organizationId: tataSteelOrg.id, role: 'TECHNICAL_PARTNER', contribution: 'Solar Cooling Hardware & Grants' },

    { id: '72000000-0000-0000-0000-000000000007', projectId: miningProject.id, organizationId: iitDhanbadOrg.id, role: 'LEAD', contribution: 'Subsurface Geophysics & Sensor Calibration' },
    { id: '72000000-0000-0000-0000-000000000008', projectId: miningProject.id, organizationId: cclOrg.id, role: 'TECHNICAL_PARTNER', contribution: 'Borehole Drilling & Intrinsically Safe Hardware' },

    { id: '72000000-0000-0000-0000-000000000009', projectId: eduProject.id, organizationId: dumkaEduOrg.id, role: 'LEAD', contribution: 'Ol Chiki Interactive Software & Tablet Provision' },
    { id: '72000000-0000-0000-0000-000000000010', projectId: eduProject.id, organizationId: jharGovOrg.id, role: 'FUNDING_PARTNER', contribution: 'District Primary Education Pilot Sanction' },

    { id: '72000000-0000-0000-0000-000000000011', projectId: urbanProject.id, organizationId: bitOrg.id, role: 'LEAD', contribution: 'Sonar Silt Sensor Prototyping' },
    { id: '72000000-0000-0000-0000-000000000012', projectId: urbanProject.id, organizationId: jharGovOrg.id, role: 'TECHNICAL_PARTNER', contribution: 'Municipal Drainage Field Access' },
  ];

  for (const p of participants) {
    await prisma.projectParticipant.upsert({
      where: { id: p.id },
      update: {},
      create: p,
    });
  }
  console.log(`   ✅ ${participants.length} project participant mappings seeded`);

  // ─────────────────────────────────────────────────────────────
  // 12. PROJECT MILESTONES
  // ─────────────────────────────────────────────────────────────
  console.log('🎯 12. Seeding execution milestones...');

  const milestones = [
    // PRJ-2026-0012: Water Project
    { id: '73000000-0000-0000-0000-000000000001', projectId: waterProject.id, title: 'Field Topology & Handpump Acoustic Survey', description: 'Baseline acoustic and vibrational profile mapping across 18 community water points in Murhu.', status: 'COMPLETED', dueDate: new Date('2026-02-15'), completedAt: new Date('2026-02-12') },
    { id: '73000000-0000-0000-0000-000000000002', projectId: waterProject.id, title: 'Hardware Prototype Fabrication & LoRaWAN Bench Testing', description: 'Development of weatherproof vibration sensor collars and gateway transceiver nodes.', status: 'COMPLETED', dueDate: new Date('2026-03-01'), completedAt: new Date('2026-02-28') },
    { id: '73000000-0000-0000-0000-000000000003', projectId: waterProject.id, title: 'Gram Panchayat Approval & Jal Sahiya Training', description: 'Co-design workshop with 14 village Jal Sahiyas and Panchayat Pradhans.', status: 'COMPLETED', dueDate: new Date('2026-03-15'), completedAt: new Date('2026-03-14') },
    { id: '73000000-0000-0000-0000-000000000004', projectId: waterProject.id, title: 'Pilot Cluster Installation across 18 Water Points', description: 'Deployment of sensor nodes across Murhu block community borewells.', status: 'COMPLETED', dueDate: new Date('2026-04-01'), completedAt: new Date('2026-03-30') },
    { id: '73000000-0000-0000-0000-000000000005', projectId: waterProject.id, title: 'Automated SMS Maintenance Dispatch Engine Live', description: 'Integration with BDO repair squad ticketing and Jal Sahiya mobile alerts.', status: 'IN_PROGRESS', dueDate: new Date('2026-05-15') },
    { id: '73000000-0000-0000-0000-000000000006', projectId: waterProject.id, title: 'Endline Reliability Evaluation & District Scale Plan', description: 'Comprehensive audit of pump downtime reduction and scaling proposal for Khunti district.', status: 'PENDING', dueDate: new Date('2026-08-30') },

    // PRJ-2026-0009: Mining Project
    { id: '73000000-0000-0000-0000-000000000007', projectId: miningProject.id, title: 'Geological Hazard Assessment & InSAR Baseline', description: 'Satellite interferometric baseline mapping of ground subsidence rates.', status: 'COMPLETED', dueDate: new Date('2026-02-20'), completedAt: new Date('2026-02-18') },
    { id: '73000000-0000-0000-0000-000000000008', projectId: miningProject.id, title: 'Subsurface Extensometer Mesh Prototype', description: 'Borehole sensor string assembly and intrinsically safe battery certification.', status: 'COMPLETED', dueDate: new Date('2026-03-25'), completedAt: new Date('2026-03-22') },
    { id: '73000000-0000-0000-0000-000000000009', projectId: miningProject.id, title: 'Surface Inundation Early Warning Sirens', description: 'Community siren activation and mock evacuation drills.', status: 'IN_PROGRESS', dueDate: new Date('2026-06-10') },
    { id: '73000000-0000-0000-0000-000000000010', projectId: miningProject.id, title: 'Telemetry Gateway Mesh Deployment', description: 'Long-range mesh transceivers connecting sensor nodes to district emergency center.', status: 'PENDING', dueDate: new Date('2026-08-15') },

    // PRJ-2026-0007: Agri Project
    { id: '73000000-0000-0000-0000-000000000011', projectId: agriProject.id, title: 'Cooperative Baseline Harvest Loss Audit', description: 'Documentation of seasonal storage losses across 42 farmer groups.', status: 'COMPLETED', dueDate: new Date('2026-02-25'), completedAt: new Date('2026-02-24') },
    { id: '73000000-0000-0000-0000-000000000012', projectId: agriProject.id, title: 'Solar Thermal Storage Unit Fabrication', description: 'Zero-emission cold chamber engineering using phase-change cooling materials.', status: 'COMPLETED', dueDate: new Date('2026-03-30'), completedAt: new Date('2026-03-28') },
    { id: '73000000-0000-0000-0000-000000000013', projectId: agriProject.id, title: 'Field Installation in Bishunpur Cluster', description: 'Installation and testing of first 4 decentralized storage micro-hubs.', status: 'COMPLETED', dueDate: new Date('2026-04-20'), completedAt: new Date('2026-04-18') },
    { id: '73000000-0000-0000-0000-000000000014', projectId: agriProject.id, title: 'Farmer Cooperative Management Handover', description: 'Training Krishi Mitras on inventory tracking and solar maintenance.', status: 'IN_PROGRESS', dueDate: new Date('2026-06-30') },
  ];

  for (const m of milestones) {
    await prisma.milestone.upsert({
      where: { id: m.id },
      update: {},
      create: m,
    });
  }
  console.log(`   ✅ ${milestones.length} milestones seeded`);

  // ─────────────────────────────────────────────────────────────
  // 13. PROJECT IMPACT METRICS
  // ─────────────────────────────────────────────────────────────
  console.log('📈 13. Seeding project performance metrics...');

  const impactMetrics = [
    { id: '74000000-0000-0000-0000-000000000001', projectId: waterProject.id, metricName: 'Pump Downtime', baselineValue: '12', currentValue: '3.2', targetValue: '2.0', unit: 'Days', verified: true },
    { id: '74000000-0000-0000-0000-000000000002', projectId: waterProject.id, metricName: 'Clean Water Availability', baselineValue: '68', currentValue: '94', targetValue: '98', unit: 'Percentage', verified: true },
    { id: '74000000-0000-0000-0000-000000000003', projectId: waterProject.id, metricName: 'Residents Protected', baselineValue: '0', currentValue: '2000', targetValue: '2000', unit: 'People', verified: true },
    { id: '74000000-0000-0000-0000-000000000004', projectId: waterProject.id, metricName: 'Borewells Monitored', baselineValue: '0', currentValue: '18', targetValue: '50', unit: 'Units', verified: true },

    { id: '74000000-0000-0000-0000-000000000005', projectId: agriProject.id, metricName: 'Post-Harvest Loss', baselineValue: '35', currentValue: '12', targetValue: '8', unit: 'Percentage', verified: true },
    { id: '74000000-0000-0000-0000-000000000006', projectId: agriProject.id, metricName: 'Farmers Reached', baselineValue: '0', currentValue: '3200', targetValue: '5000', unit: 'Farmers', verified: true },

    { id: '74000000-0000-0000-0000-000000000007', projectId: miningProject.id, metricName: 'Early Warning Lead Time', baselineValue: '0', currentValue: '48', targetValue: '72', unit: 'Hours', verified: true },
    { id: '74000000-0000-0000-0000-000000000008', projectId: miningProject.id, metricName: 'Settlement Dwellers Covered', baselineValue: '0', currentValue: '1200', targetValue: '4500', unit: 'Residents', verified: true },

    { id: '74000000-0000-0000-0000-000000000009', projectId: eduProject.id, metricName: 'Foundational Numeracy Gain', baselineValue: '32', currentValue: '68', targetValue: '80', unit: 'Percentage', verified: true },
    { id: '74000000-0000-0000-0000-000000000010', projectId: eduProject.id, metricName: 'Primary Students Active', baselineValue: '0', currentValue: '650', targetValue: '1200', unit: 'Students', verified: true },
  ];

  for (const im of impactMetrics) {
    await prisma.impactMetric.upsert({
      where: { id: im.id },
      update: {},
      create: im,
    });
  }
  console.log(`   ✅ ${impactMetrics.length} impact metrics seeded`);

  // ─────────────────────────────────────────────────────────────
  // 14. ECOSYSTEM ACTIVITIES FEED
  // ─────────────────────────────────────────────────────────────
  console.log('📡 14. Seeding chronological ecosystem activity feed...');

  const activities = [
    { id: '75000000-0000-0000-0000-000000000001', type: 'MILESTONE_COMPLETED', message: 'BIT Mesra completed Pilot Cluster Installation for Smart Water Network across 18 community water points in Murhu Block', projectId: waterProject.id, challengeId: waterChallenge.id, organizationId: bitOrg.id, userId: facultyUser.id },
    { id: '75000000-0000-0000-0000-000000000002', type: 'PROJECT_STARTED', message: 'Project PRJ-2026-0007 (Tribal Pulse & Millets Cold Storage) entered Field Pilot stage in Gumla', projectId: agriProject.id, challengeId: agriChallenge.id, organizationId: bauOrg.id, userId: facultyUser2.id },
    { id: '75000000-0000-0000-0000-000000000003', type: 'IMPACT_RECORDED', message: 'Pump breakdown downtime in Murhu reduced from 12 days to 3.2 days (verified by DW&S)', projectId: waterProject.id, organizationId: jalSahiyaOrg.id, userId: govtUser.id },
    { id: '75000000-0000-0000-0000-000000000004', type: 'IDEA_SUBMITTED', message: 'Prof. Anand Verma submitted solution approach for Rural Water Pump Reliability', ideaId: waterIdea.id, challengeId: waterChallenge.id, organizationId: bitOrg.id, userId: facultyUser.id },
    { id: '75000000-0000-0000-0000-000000000005', type: 'CHALLENGE_CREATED', message: 'Murhu Gram Panchayat logged challenge JS-2026-00024: Frequent Handpump Breakdowns', challengeId: waterChallenge.id, organizationId: jalSahiyaOrg.id, userId: citizenUser.id },
    { id: '75000000-0000-0000-0000-000000000006', type: 'MILESTONE_COMPLETED', message: 'IIT (ISM) Dhanbad completed Subsurface Extensometer Mesh Prototype for Jharia', projectId: miningProject.id, challengeId: miningChallenge.id, organizationId: iitDhanbadOrg.id, userId: facultyUser3.id },
    { id: '75000000-0000-0000-0000-000000000007', type: 'STATUS_CHANGED', message: 'Challenge JS-2024-00003 (Mine Subsidence Early Warning) promoted to ACTIVE PILOT', challengeId: miningChallenge.id, organizationId: cclOrg.id, userId: govtUser.id },
    { id: '75000000-0000-0000-0000-000000000008', type: 'IMPACT_RECORDED', message: '650 tribal primary students enrolled in offline bilingual Ol Chiki modules in Dumka', projectId: eduProject.id, challengeId: eduChallenge.id, organizationId: dumkaEduOrg.id, userId: citizenUser2.id },
    { id: '75000000-0000-0000-0000-000000000009', type: 'PROJECT_STARTED', message: 'Tata Steel CSR committed technical mentorship & co-funding for Project PRJ-2026-0012', projectId: waterProject.id, organizationId: tataSteelOrg.id, userId: partnerUser.id },
  ];

  for (const act of activities) {
    await prisma.activity.upsert({
      where: { id: act.id },
      update: {},
      create: act,
    });
  }
  console.log(`   ✅ ${activities.length} activity feed records seeded`);

  // ─────────────────────────────────────────────────────────────
  // 15. USER NOTIFICATIONS (Simulating Real Platform Alerts)
  // ─────────────────────────────────────────────────────────────
  console.log('🔔 15. Seeding real interactive notifications for personas...');

  const notifications = [
    // Citizen notifications (Kavita Munda)
    {
      id: '90000000-0000-0000-0000-000000000001',
      userId: citizenUser.id,
      event: 'CHALLENGE_VERIFIED',
      title: 'Challenge Verified by BDO Office',
      message: 'Your challenge JS-2026-00024 regarding Murhu handpumps has been verified and prioritized by Dr. Rajesh Kumar (BDO Murhu).',
      entityType: 'CHALLENGE',
      entityId: waterChallenge.id,
      isRead: true,
      createdAt: new Date('2026-01-12'),
    },
    {
      id: '90000000-0000-0000-0000-000000000002',
      userId: citizenUser.id,
      event: 'IDEA_SUBMITTED',
      title: 'New University Solution Proposed',
      message: 'Prof. Anand Verma (BIT Mesra) proposed a solution: "Smart Water Monitoring Network" using IoT vibration collars.',
      entityType: 'IDEA',
      entityId: waterIdea.id,
      isRead: false,
      createdAt: new Date('2026-01-15'),
    },
    {
      id: '90000000-0000-0000-0000-000000000003',
      userId: citizenUser.id,
      event: 'PROJECT_STARTED',
      title: 'Field Pilot Underway in Murhu',
      message: 'Implementation project PRJ-2026-0012 is now live in your block. 18 sensor collars installed.',
      entityType: 'PROJECT',
      entityId: waterProject.id,
      isRead: false,
      createdAt: new Date('2026-03-30'),
    },

    // University notifications (Prof. Anand Verma)
    {
      id: '90000000-0000-0000-0000-000000000004',
      userId: facultyUser.id,
      event: 'PARTNER_JOINED',
      title: 'Tata Steel CSR Joined Project',
      message: 'Sanjay Oraon (Tata Steel TSRDS) accepted partnership on PRJ-2026-0012 with telemetry cloud & fabrication support.',
      entityType: 'PROJECT',
      entityId: waterProject.id,
      isRead: true,
      createdAt: new Date('2026-01-28'),
    },
    {
      id: '90000000-0000-0000-0000-000000000005',
      userId: facultyUser.id,
      event: 'MILESTONE_APPROVED',
      title: 'Milestone 4 Approved by District',
      message: 'Khunti DW&S verified completion of Pilot Cluster Installation for Smart Water Network.',
      entityType: 'MILESTONE',
      entityId: '73000000-0000-0000-0000-000000000004',
      isRead: false,
      createdAt: new Date('2026-04-02'),
    },

    // Government notifications (Dr. Rajesh Kumar)
    {
      id: '90000000-0000-0000-0000-000000000006',
      userId: govtUser.id,
      event: 'CHALLENGE_SUBMITTED',
      title: 'Urgent Challenge Logged in Murhu',
      message: 'Kavita Munda reported frequent handpump failures across 14 tolas affecting 2,000 residents.',
      entityType: 'CHALLENGE',
      entityId: waterChallenge.id,
      isRead: true,
      createdAt: new Date('2026-01-10'),
    },
    {
      id: '90000000-0000-0000-0000-000000000007',
      userId: govtUser.id,
      event: 'IMPACT_VERIFIED',
      title: 'Verified 73% Downtime Reduction',
      message: 'Automated telemetry data confirms average repair turnaround dropped from 12 days to 3.2 days in Murhu Block.',
      entityType: 'PROJECT',
      entityId: waterProject.id,
      isRead: false,
      createdAt: new Date('2026-04-10'),
    },

    // Industry notifications (Sanjay Oraon)
    {
      id: '90000000-0000-0000-0000-000000000008',
      userId: partnerUser.id,
      event: 'CSR_OPPORTUNITY_MATCH',
      title: 'New High-Impact Innovation Matched',
      message: 'Water telemetry pilot in Khunti matches Tata Steel CSR rural drinking water priorities.',
      entityType: 'PROJECT',
      entityId: waterProject.id,
      isRead: true,
      createdAt: new Date('2026-01-20'),
    },
  ];

  for (const n of notifications) {
    await prisma.notification.upsert({
      where: { id: n.id },
      update: {},
      create: n,
    });
  }
  console.log(`   ✅ ${notifications.length} notifications seeded`);

  // ─────────────────────────────────────────────────────────────
  // 16. AUDIT LOGS (Accountability & Oversight Trail)
  // ─────────────────────────────────────────────────────────────
  console.log('🛡️  16. Seeding governance audit logs...');

  const auditLogs = [
    {
      id: '95000000-0000-0000-0000-000000000001',
      actorId: govtUser.id,
      actorRole: 'GOVERNMENT',
      action: 'CHALLENGE_VERIFY',
      entityType: 'Challenge',
      entityId: waterChallenge.id,
      before: { verificationStatus: 'PENDING' },
      after: { verificationStatus: 'VERIFIED', priority: 'HIGH' },
      reason: 'Field inspection confirmed repeated cavitation and pump downtime in Murhu villages.',
      createdAt: new Date('2026-01-12'),
    },
    {
      id: '95000000-0000-0000-0000-000000000002',
      actorId: govtUser2.id,
      actorRole: 'GOVERNMENT',
      action: 'PILOT_GRANT_SANCTION',
      entityType: 'Project',
      entityId: waterProject.id,
      before: { stage: 'RESEARCH_DESIGN' },
      after: { stage: 'FIELD_PILOT' },
      reason: 'State Innovation Council approved ₹12 Lakhs seed grant for 18 telemetry collars.',
      createdAt: new Date('2026-01-18'),
    },
    {
      id: '95000000-0000-0000-0000-000000000003',
      actorId: facultyUser.id,
      actorRole: 'UNIVERSITY',
      action: 'MILESTONE_COMPLETE',
      entityType: 'Milestone',
      entityId: '73000000-0000-0000-0000-000000000004',
      before: { status: 'IN_PROGRESS' },
      after: { status: 'COMPLETED' },
      reason: 'Sensors deployed on all 18 borewells and sending live telemetry to LoRa gateway.',
      createdAt: new Date('2026-03-30'),
    },
  ];

  for (const al of auditLogs) {
    await prisma.auditLog.upsert({
      where: { id: al.id },
      update: {},
      create: al,
    });
  }
  console.log(`   ✅ ${auditLogs.length} audit logs seeded`);

  console.log('\n✨ COMPLETE JHARSANKALP ECOSYSTEM SEEDING FINISHED SUCCESSFULLY!\n');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
