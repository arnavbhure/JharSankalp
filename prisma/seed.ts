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

// ── Deterministic IDs ────────────────────────────────────────
// Using fixed UUIDs so seed is repeatable and references are stable

const IDS = {
  // Users
  citizenUser: '10000000-0000-0000-0000-000000000001',
  govtOfficer: '10000000-0000-0000-0000-000000000002',
  districtOfficer: '10000000-0000-0000-0000-000000000003',
  stateAdmin: '10000000-0000-0000-0000-000000000004',
  uniAdmin1: '10000000-0000-0000-0000-000000000005',
  faculty1: '10000000-0000-0000-0000-000000000006',
  student1: '10000000-0000-0000-0000-000000000007',
  industryRep: '10000000-0000-0000-0000-000000000008',
  superAdmin: '10000000-0000-0000-0000-000000000009',
  faculty2: '10000000-0000-0000-0000-000000000010',
  citizenUser2: '10000000-0000-0000-0000-000000000011',

  // Organizations
  birsa: '20000000-0000-0000-0000-000000000001',
  bit: '20000000-0000-0000-0000-000000000002',
  techCorp: '20000000-0000-0000-0000-000000000003',
  govtDept: '20000000-0000-0000-0000-000000000004',

  // Districts (will be set dynamically)
  districts: {} as Record<string, string>,

  // Challenges
  challenge1: '30000000-0000-0000-0000-000000000001',
  challenge2: '30000000-0000-0000-0000-000000000002',
  challenge3: '30000000-0000-0000-0000-000000000003',
  challenge4: '30000000-0000-0000-0000-000000000004',
  challenge5: '30000000-0000-0000-0000-000000000005',
};

// Placeholder password hash for "password123" — bcrypt round 10
// In real usage, passwords would be hashed at registration time
const DEMO_PASSWORD_HASH = '$2a$10$rQZK4Q7XfaGxYzKhXV1wgeKLnZ4j3E1TnCaYdN7F5LbLkVhQ1Y7Ye';

async function main() {
  console.log('🌱 Seeding JharSankalp database...\n');

  // ── Districts ────────────────────────────────────────────

  console.log('📍 Seeding districts...');
  for (const district of DISTRICTS) {
    const created = await prisma.district.upsert({
      where: { code: district.code },
      update: {},
      create: {
        id: randomUUID(),
        name: district.name,
        code: district.code,
        stateCode: 'JH',
      },
    });
    IDS.districts[district.code] = created.id;
  }
  console.log(`   ✅ ${DISTRICTS.length} districts seeded`);

  // ── Organizations ────────────────────────────────────────

  console.log('🏛️  Seeding organizations...');

  await prisma.organization.upsert({
    where: { id: IDS.birsa },
    update: {},
    create: {
      id: IDS.birsa,
      name: 'Birsa Institute of Technology Sindri',
      type: 'UNIVERSITY',
      description:
        'Premier engineering institution in Jharkhand with strong departments in Mechanical, Electrical, Computer Science, and Civil Engineering. Active research in IoT, water systems, and rural technology.',
      website: 'https://bitsindri.ac.in',
      districtId: IDS.districts['DHN'],
      contactEmail: 'admin@bitsindri.ac.in',
      isVerified: true,
    },
  });

  await prisma.organization.upsert({
    where: { id: IDS.bit },
    update: {},
    create: {
      id: IDS.bit,
      name: 'BIT Mesra',
      type: 'UNIVERSITY',
      description:
        'Leading technical university with expertise in Computer Science, Electronics, Biotechnology, and Environmental Engineering. Strong research output in ML, embedded systems, and water treatment.',
      website: 'https://bitmesra.ac.in',
      districtId: IDS.districts['RAN'],
      contactEmail: 'admin@bitmesra.ac.in',
      isVerified: true,
    },
  });

  await prisma.organization.upsert({
    where: { id: IDS.techCorp },
    update: {},
    create: {
      id: IDS.techCorp,
      name: 'AgriSens Technologies',
      type: 'INDUSTRY',
      description:
        'IoT and sensor technology company specializing in agriculture and water monitoring solutions. Provides hardware, field deployment support, and technical mentorship.',
      website: 'https://agrisens.example.com',
      districtId: IDS.districts['RAN'],
      contactEmail: 'partnerships@agrisens.example.com',
      isVerified: true,
    },
  });

  await prisma.organization.upsert({
    where: { id: IDS.govtDept },
    update: {},
    create: {
      id: IDS.govtDept,
      name: 'Department of Higher & Technical Education',
      type: 'GOVERNMENT',
      description:
        'Government of Jharkhand department overseeing higher education and technical institutions in the state.',
      districtId: IDS.districts['RAN'],
      contactEmail: 'dhte@jharkhand.gov.in',
      isVerified: true,
    },
  });

  console.log('   ✅ 4 organizations seeded');

  // ── Users ────────────────────────────────────────────────

  console.log('👤 Seeding users...');

  const users = [
    {
      id: IDS.citizenUser,
      email: 'citizen@demo.jharsankalp.in',
      name: 'Rajesh Kumar',
      role: 'CITIZEN',
      phone: '+919876543210',
      organizationId: null,
    },
    {
      id: IDS.citizenUser2,
      email: 'citizen2@demo.jharsankalp.in',
      name: 'Sunita Devi',
      role: 'CITIZEN',
      phone: '+919876543211',
      organizationId: null,
    },
    {
      id: IDS.govtOfficer,
      email: 'officer@demo.jharsankalp.in',
      name: 'Anil Sharma',
      role: 'GOVERNMENT_OFFICER',
      organizationId: IDS.govtDept,
    },
    {
      id: IDS.districtOfficer,
      email: 'district@demo.jharsankalp.in',
      name: 'Priya Singh',
      role: 'DISTRICT_OFFICER',
      organizationId: IDS.govtDept,
    },
    {
      id: IDS.stateAdmin,
      email: 'stateadmin@demo.jharsankalp.in',
      name: 'Dr. Vikram Mehta',
      role: 'STATE_ADMIN',
      organizationId: IDS.govtDept,
    },
    {
      id: IDS.uniAdmin1,
      email: 'uniadmin@demo.jharsankalp.in',
      name: 'Prof. Sanjay Mishra',
      role: 'UNIVERSITY_ADMIN',
      organizationId: IDS.birsa,
    },
    {
      id: IDS.faculty1,
      email: 'faculty@demo.jharsankalp.in',
      name: 'Dr. Ananya Chatterjee',
      role: 'FACULTY',
      organizationId: IDS.birsa,
    },
    {
      id: IDS.faculty2,
      email: 'faculty2@demo.jharsankalp.in',
      name: 'Dr. Ravi Prakash',
      role: 'FACULTY',
      organizationId: IDS.bit,
    },
    {
      id: IDS.student1,
      email: 'student@demo.jharsankalp.in',
      name: 'Amit Tirkey',
      role: 'STUDENT',
      organizationId: IDS.birsa,
    },
    {
      id: IDS.industryRep,
      email: 'industry@demo.jharsankalp.in',
      name: 'Deepak Agarwal',
      role: 'INDUSTRY',
      organizationId: IDS.techCorp,
    },
    {
      id: IDS.superAdmin,
      email: 'admin@demo.jharsankalp.in',
      name: 'System Admin',
      role: 'SUPER_ADMIN',
      organizationId: null,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        email: user.email,
        passwordHash: DEMO_PASSWORD_HASH,
        name: user.name,
        role: user.role,
        phone: user.phone || null,
        organizationId: user.organizationId,
        isActive: true,
      },
    });
  }

  console.log(`   ✅ ${users.length} users seeded`);

  // ── Challenges ───────────────────────────────────────────

  console.log('🎯 Seeding challenges...');

  const challenges = [
    {
      id: IDS.challenge1,
      publicId: 'JS-2024-00001',
      title: 'Predictive Maintenance of Rural Water Pumps',
      description:
        'Multiple villages in Khunti district report frequent water pump failures. Hand pumps and electric pumps break down regularly, forcing residents to walk long distances for water. The pumps serve approximately 2,000 people across 5 villages. Failures typically go unnoticed until the pump stops completely, leading to 10-14 days of downtime per incident.',
      sourceType: 'CITIZEN',
      submittedById: IDS.citizenUser,
      status: 'SUBMITTED',
      domain: 'WATER_SANITATION',
      subdomain: 'Rural Water Infrastructure',
      visibility: 'PUBLIC',
      verificationStatus: 'UNVERIFIED',
      moderationStatus: 'SAFE',
      districtId: IDS.districts['KHU'],
      block: 'Murhu',
      panchayatOrUlb: 'Karra Panchayat',
      latitude: 23.0707,
      longitude: 85.2784,
      affectedPopulation: 2000,
      severity: 'HIGH',
      urgency: 'HIGH',
    },
    {
      id: IDS.challenge2,
      publicId: 'JS-2024-00002',
      title: 'Soil Health Monitoring for Tribal Farmers',
      description:
        'Farmers in Gumla district lack access to soil testing facilities. Improper use of fertilizers leads to declining crop yields and soil degradation. There is no affordable, real-time soil testing solution available at the village level.',
      sourceType: 'COMMUNITY',
      submittedById: IDS.citizenUser2,
      status: 'SUBMITTED',
      domain: 'AGRICULTURE',
      subdomain: 'Soil Health',
      visibility: 'PUBLIC',
      verificationStatus: 'UNVERIFIED',
      moderationStatus: 'SAFE',
      districtId: IDS.districts['GUM'],
      block: 'Bishunpur',
      latitude: 23.0446,
      longitude: 84.5414,
      affectedPopulation: 5000,
      severity: 'MEDIUM',
      urgency: 'MEDIUM',
    },
    {
      id: IDS.challenge3,
      publicId: 'JS-2024-00003',
      title: 'Early Warning System for Mine Subsidence',
      description:
        'Residential areas near abandoned mines in Dhanbad face risks of ground subsidence. Several incidents of land sinking have been reported, endangering lives and property. There is no real-time monitoring or early warning mechanism in place.',
      sourceType: 'GOVERNMENT',
      submittedById: IDS.govtOfficer,
      organizationId: IDS.govtDept,
      status: 'SUBMITTED',
      domain: 'MINING_SAFETY',
      subdomain: 'Subsidence Monitoring',
      visibility: 'PUBLIC',
      verificationStatus: 'UNVERIFIED',
      moderationStatus: 'SAFE',
      districtId: IDS.districts['DHN'],
      block: 'Jharia',
      latitude: 23.7464,
      longitude: 86.4157,
      affectedPopulation: 15000,
      severity: 'CRITICAL',
      urgency: 'HIGH',
    },
    {
      id: IDS.challenge4,
      publicId: 'JS-2024-00004',
      title: 'Telemedicine Access for Remote Tribal Villages',
      description:
        'Villages in Simdega district have no access to qualified medical practitioners. The nearest health facility is over 30 km away. Patients often delay seeking medical care due to distance and cost of travel.',
      sourceType: 'NGO',
      submittedById: IDS.citizenUser,
      status: 'SUBMITTED',
      domain: 'HEALTHCARE',
      subdomain: 'Rural Healthcare Access',
      visibility: 'PUBLIC',
      verificationStatus: 'UNVERIFIED',
      moderationStatus: 'SAFE',
      districtId: IDS.districts['SIM'],
      block: 'Thethaitangar',
      latitude: 22.6155,
      longitude: 84.5091,
      affectedPopulation: 8000,
      severity: 'HIGH',
      urgency: 'HIGH',
    },
    {
      id: IDS.challenge5,
      publicId: 'JS-2024-00005',
      title: 'Solar-Powered Cold Storage for Small Farmers',
      description:
        'Small-scale farmers in Hazaribagh lose significant portions of their vegetable harvest due to lack of cold storage. Post-harvest losses are estimated at 30-40% for perishable crops. No affordable cold storage solution exists at the village level.',
      sourceType: 'CITIZEN',
      submittedById: IDS.citizenUser2,
      status: 'SUBMITTED',
      domain: 'AGRICULTURE',
      subdomain: 'Post-Harvest Management',
      visibility: 'PUBLIC',
      verificationStatus: 'UNVERIFIED',
      moderationStatus: 'SAFE',
      districtId: IDS.districts['HAZ'],
      block: 'Ichak',
      latitude: 24.0003,
      longitude: 85.3588,
      affectedPopulation: 3000,
      severity: 'MEDIUM',
      urgency: 'MEDIUM',
    },
  ];

  for (const challenge of challenges) {
    await prisma.challenge.upsert({
      where: { id: challenge.id },
      update: {},
      create: challenge,
    });
  }

  console.log(`   ✅ ${challenges.length} challenges seeded`);

  // ── Summary ──────────────────────────────────────────────

  const counts = {
    districts: await prisma.district.count(),
    organizations: await prisma.organization.count(),
    users: await prisma.user.count(),
    challenges: await prisma.challenge.count(),
  };

  console.log('\n🎉 Seed complete!');
  console.log(`   Districts:     ${counts.districts}`);
  console.log(`   Organizations: ${counts.organizations}`);
  console.log(`   Users:         ${counts.users}`);
  console.log(`   Challenges:    ${counts.challenges}`);
  console.log('\n📝 Demo login credentials:');
  console.log('   All demo accounts use password: password123');
  console.log('   Citizen:    citizen@demo.jharsankalp.in');
  console.log('   Govt:       officer@demo.jharsankalp.in');
  console.log('   University: uniadmin@demo.jharsankalp.in');
  console.log('   Faculty:    faculty@demo.jharsankalp.in');
  console.log('   Student:    student@demo.jharsankalp.in');
  console.log('   Industry:   industry@demo.jharsankalp.in');
  console.log('   Admin:      admin@demo.jharsankalp.in');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seed error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
