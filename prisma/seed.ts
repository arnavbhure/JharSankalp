import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

// ── Jharkhand Districts (all 24) ─────────────────────────────

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

const DEMO_PASSWORD_HASH = '$2a$10$rQZK4Q7XfaGxYzKhXV1wgeKLnZ4j3E1TnCaYdN7F5LbLkVhQ1Y7Ye'; // password123

async function main() {
  console.log('🌱 Seeding JharSankalp PostgreSQL database...\n');

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
  console.log(`   ✅ Organizations seeded`);

  // 3. Users
  console.log('👥 Seeding users...');
  const citizenUser = await prisma.user.upsert({
    where: { email: 'kavita.munda@jharsankalp.in' },
    update: {},
    create: {
      id: '10000000-0000-0000-0000-000000000001',
      name: 'Kavita Munda',
      email: 'kavita.munda@jharsankalp.in',
      passwordHash: DEMO_PASSWORD_HASH,
      role: 'CITIZEN',
      district: 'Khunti',
      bio: 'Jal Sahiya coordinator and tribal community water rights advocate.',
      organizationId: jalSahiyaOrg.id,
    },
  });

  const facultyUser = await prisma.user.upsert({
    where: { email: 'anand.verma@bitmesra.ac.in' },
    update: {},
    create: {
      id: '10000000-0000-0000-0000-000000000002',
      name: 'Prof. Anand Verma',
      email: 'anand.verma@bitmesra.ac.in',
      passwordHash: DEMO_PASSWORD_HASH,
      role: 'UNIVERSITY',
      district: 'Ranchi',
      bio: 'Professor of Sensor Networks & Telemetry Lab Director at BIT Mesra.',
      organizationId: bitOrg.id,
    },
  });

  const govtUser = await prisma.user.upsert({
    where: { email: 'rajesh.ias@jharkhand.gov.in' },
    update: {},
    create: {
      id: '10000000-0000-0000-0000-000000000003',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.ias@jharkhand.gov.in',
      passwordHash: DEMO_PASSWORD_HASH,
      role: 'GOVERNMENT',
      district: 'Khunti',
      bio: 'Block Development Officer (BDO), Murhu Block, Drinking Water & Sanitation Dept.',
    },
  });

  const partnerUser = await prisma.user.upsert({
    where: { email: 'sanjay.oraon@tatasteel.com' },
    update: {},
    create: {
      id: '10000000-0000-0000-0000-000000000004',
      name: 'Sanjay Oraon',
      email: 'sanjay.oraon@tatasteel.com',
      passwordHash: DEMO_PASSWORD_HASH,
      role: 'INDUSTRY',
      district: 'Ranchi',
      bio: 'Lead CSR rural technology implementation partner.',
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@jharsankalp.in' },
    update: {},
    create: {
      id: '10000000-0000-0000-0000-000000000005',
      name: 'JharSankalp Administrator',
      email: 'admin@jharsankalp.in',
      passwordHash: DEMO_PASSWORD_HASH,
      role: 'ADMIN',
      district: 'Ranchi',
    },
  });
  console.log(`   ✅ Users seeded`);

  // 4. Challenges
  console.log('⚡ Seeding challenges...');
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
  console.log(`   ✅ Challenges seeded`);

  // 5. Ideas
  console.log('💡 Seeding ideas...');
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
  console.log(`   ✅ Ideas seeded`);

  // 6. Collaborations
  console.log('👥 Seeding collaborations & project teams...');
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

  // Collaboration Members
  await prisma.collaborationMember.createMany({
    data: [
      {
        id: randomUUID(),
        collaborationId: waterCollab.id,
        userId: facultyUser.id,
        memberName: 'Prof. Anand Verma',
        role: 'LEAD',
        institution: 'BIT Mesra',
      },
      {
        id: randomUUID(),
        collaborationId: waterCollab.id,
        userId: citizenUser.id,
        memberName: 'Kavita Munda',
        role: 'COMMUNITY_PARTNER',
        institution: 'Murhu Jal Sahiya Collective',
      },
      {
        id: randomUUID(),
        collaborationId: waterCollab.id,
        userId: govtUser.id,
        memberName: 'Dr. Rajesh Kumar',
        role: 'MENTOR',
        institution: 'Khunti District DW&S',
      },
      {
        id: randomUUID(),
        collaborationId: waterCollab.id,
        userId: partnerUser.id,
        memberName: 'Sanjay Oraon',
        role: 'INDUSTRY_PARTNER',
        institution: 'Rural Innovation Foundation',
      },
    ],
    skipDuplicates: true,
  });
  console.log(`   ✅ Collaborations seeded`);

  // 7. Solutions
  console.log('✓ Seeding solutions & innovation portfolio...');
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
      leadPartners: ['Rural Health Mission Jharkhand', 'Chaibasa Civil Hospital', 'AIIMS Deoghar'],
    },
  });
  console.log(`   ✅ Solutions seeded`);

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
    ],
    skipDuplicates: true,
  });
  console.log(`   ✅ Impact records seeded`);

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
