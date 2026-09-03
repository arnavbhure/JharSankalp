import { DashboardRole, DashboardRoleData } from '../types/dashboard';
import { api } from './api';

const CITIZEN_DATA: DashboardRoleData = {
  role: 'citizen',
  roleLabel: 'Citizen Innovator',
  userName: 'Arnav',
  greeting: 'Good evening, Arnav 👋',
  subtitle: "See how your ideas are creating change across Jharkhand.",
  impact: {
    title: 'Your Contribution Impact',
    mainCount: 12,
    mainLabel: 'Ideas Submitted',
    growth: '↑ 24% this month',
    chartData: [
      { month: 'Jan', value: 3 },
      { month: 'Feb', value: 5 },
      { month: 'Mar', value: 4 },
      { month: 'Apr', value: 8 },
      { month: 'May', value: 9 },
      { month: 'Jun', value: 12 },
    ],
  },
  metrics: [
    {
      id: 'm-ideas',
      label: 'Ideas Contributed',
      value: 12,
      change: '+2 this month',
      icon: 'Lightbulb',
      bgTint: 'bg-[#F0FDF4]',
      borderTint: 'border-[#BBF7D0]',
      iconColor: 'text-[#15803D]',
    },
    {
      id: 'm-challenges',
      label: 'Challenges Joined',
      value: 5,
      change: '2 active sprints',
      icon: 'Zap',
      bgTint: 'bg-[#FFFBEB]',
      borderTint: 'border-[#FDE68A]',
      iconColor: 'text-[#B45309]',
    },
    {
      id: 'm-solutions',
      label: 'Solutions Supported',
      value: 3,
      change: '1 in field pilot',
      icon: 'Trophy',
      bgTint: 'bg-[#FAF5FF]',
      borderTint: 'border-[#E9D5FF]',
      iconColor: 'text-[#7E22CE]',
    },
  ],
  challengesTitle: 'Active Challenges',
  challenges: [
    {
      id: 'JS-2026-00024',
      domain: 'Water Management',
      title: 'Improving groundwater monitoring in Ranchi & Peri-urban Wards',
      location: 'Ranchi',
      contributorsCount: 14,
      daysLeft: 8,
      status: 'Open for Ideas',
      domainColor: 'text-[#0284C7] bg-[#F0F9FF] border-[#BAE6FD]',
      iconType: 'Droplets',
    },
    {
      id: 'JS-2026-00019',
      domain: 'Agriculture',
      title: 'Improving market access & soil chemistry for smallholder tribal farmers',
      location: 'Khunti',
      contributorsCount: 21,
      daysLeft: 12,
      status: 'Consortium Forming',
      domainColor: 'text-[#15803D] bg-[#F0FDF4] border-[#BBF7D0]',
      iconType: 'Wheat',
    },
    {
      id: 'JS-2026-00008',
      domain: 'Healthcare',
      title: 'Rural healthcare accessibility & diagnostic dispensary navigation',
      location: 'Dumka',
      contributorsCount: 9,
      daysLeft: 5,
      status: 'Review Phase',
      domainColor: 'text-[#BE123C] bg-[#FFF5F5] border-[#FECDD3]',
      iconType: 'HeartPulse',
    },
  ],
  featured: {
    id: 'JS-2026-00024',
    title: 'Clean Water for Rural Jharkhand',
    district: 'Murhu Block, Khunti',
    contributorsCount: 126,
    ideasCount: 42,
    targetDate: 'July 2026',
    domain: 'Water Management',
  },
  activities: [
    {
      id: 'act-1',
      title: 'Your idea was shortlisted',
      target: 'Low-Cost IoT Sensor Network Prototyping',
      timestamp: '2 hours ago',
      type: 'shortlist',
    },
    {
      id: 'act-2',
      title: 'New comment on your challenge',
      target: 'Frequent Breakdown of Drinking Water Pumps',
      timestamp: '5 hours ago',
      type: 'comment',
    },
    {
      id: 'act-3',
      title: 'You earned a Collaboration Badge',
      target: 'Grassroots Civic Innovator · Level 2',
      timestamp: 'Yesterday',
      type: 'badge',
    },
    {
      id: 'act-4',
      title: 'Solution entered Field Pilot',
      target: 'Smart Rural Water Infrastructure Monitoring',
      timestamp: '2 days ago',
      type: 'pilot',
    },
  ],
};

const INSTITUTION_DATA: DashboardRoleData = {
  role: 'institution',
  roleLabel: 'University / R&D Institution',
  userName: 'BIT Mesra Innovation Cell',
  greeting: 'Welcome back, BIT Mesra 🏛️',
  subtitle: 'Institutional innovation portfolio & university-district consortia.',
  impact: {
    title: 'Institutional Research Output',
    mainCount: 4,
    mainLabel: 'Challenges Published',
    growth: '↑ 18% student participation',
    chartData: [
      { month: 'Jan', value: 1 },
      { month: 'Feb', value: 2 },
      { month: 'Mar', value: 2 },
      { month: 'Apr', value: 3 },
      { month: 'May', value: 3 },
      { month: 'Jun', value: 4 },
    ],
  },
  metrics: [
    {
      id: 'm-ideas-inst',
      label: 'Ideas Received',
      value: 42,
      change: '+9 this quarter',
      icon: 'Lightbulb',
      bgTint: 'bg-[#F0FDF4]',
      borderTint: 'border-[#BBF7D0]',
      iconColor: 'text-[#15803D]',
    },
    {
      id: 'm-challenges-inst',
      label: 'Active Consortia',
      value: 8,
      change: '3 district admins',
      icon: 'Building2',
      bgTint: 'bg-[#FFFBEB]',
      borderTint: 'border-[#FDE68A]',
      iconColor: 'text-[#B45309]',
    },
    {
      id: 'm-solutions-inst',
      label: 'Field Pilots',
      value: 2,
      change: 'Khunti & Ranchi',
      icon: 'Rocket',
      bgTint: 'bg-[#FAF5FF]',
      borderTint: 'border-[#E9D5FF]',
      iconColor: 'text-[#7E22CE]',
    },
  ],
  challengesTitle: 'Institutional Challenges Under R&D',
  challenges: [
    {
      id: 'JS-2026-00024',
      domain: 'Water Management',
      title: 'Smart Rural Water Infrastructure Monitoring & LoRa Collar Telemetry',
      location: 'Khunti',
      contributorsCount: 28,
      daysLeft: 14,
      status: 'Field Pilot',
      domainColor: 'text-[#0284C7] bg-[#F0F9FF] border-[#BAE6FD]',
      iconType: 'Droplets',
    },
    {
      id: 'JS-2024-00003',
      domain: 'Mining Safety',
      title: 'AI-Based Mine Subsidence Early Warning System in Jharia',
      location: 'Dhanbad',
      contributorsCount: 19,
      daysLeft: 22,
      status: 'Prototype Stage',
      domainColor: 'text-[#B45309] bg-[#FFFBEB] border-[#FDE68A]',
      iconType: 'Zap',
    },
  ],
  featured: {
    id: 'PROJECT-2026-0012',
    title: 'Smart Rural Water Infrastructure Monitoring',
    district: 'Murhu Block, Khunti',
    contributorsCount: 14,
    ideasCount: 3,
    targetDate: 'August 2026',
    domain: 'Water Management',
  },
  activities: [
    {
      id: 'act-inst-1',
      title: 'New Student Proposal Submitted',
      target: 'Piezoelectric Handpump Collar v3',
      timestamp: '1 hour ago',
      type: 'shortlist',
    },
    {
      id: 'act-inst-2',
      title: 'District Admin Cleared Pilot MOU',
      target: 'Khunti DC Office · Murhu Block Agreement',
      timestamp: '3 days ago',
      type: 'evaluation',
    },
  ],
};

const EXPERT_DATA: DashboardRoleData = {
  role: 'expert',
  roleLabel: 'Technical Evaluator / Reviewer',
  userName: 'Dr. Ramesh Soren',
  greeting: 'Good evening, Dr. Soren 🔬',
  subtitle: 'Technical review queue & scientific impact assessments.',
  impact: {
    title: 'Evaluations Completed',
    mainCount: 7,
    mainLabel: 'Proposals Evaluated',
    growth: '3 pending reviews',
    chartData: [
      { month: 'Jan', value: 2 },
      { month: 'Feb', value: 3 },
      { month: 'Mar', value: 5 },
      { month: 'Apr', value: 5 },
      { month: 'May', value: 6 },
      { month: 'Jun', value: 7 },
    ],
  },
  metrics: [
    {
      id: 'm-pending',
      label: 'Pending Reviews',
      value: 3,
      change: '2 due this week',
      icon: 'Clock',
      bgTint: 'bg-[#FFF5F5]',
      borderTint: 'border-[#FECDD3]',
      iconColor: 'text-[#BE123C]',
    },
    {
      id: 'm-assigned',
      label: 'Assigned Proposals',
      value: 11,
      change: 'Water & Soil Tech',
      icon: 'FileText',
      bgTint: 'bg-[#FFFBEB]',
      borderTint: 'border-[#FDE68A]',
      iconColor: 'text-[#B45309]',
    },
    {
      id: 'm-approved',
      label: 'Clearance Granted',
      value: 5,
      change: 'State Verified',
      icon: 'ShieldCheck',
      bgTint: 'bg-[#F0FDF4]',
      borderTint: 'border-[#BBF7D0]',
      iconColor: 'text-[#15803D]',
    },
  ],
  challengesTitle: 'Proposals Awaiting Technical Audit',
  challenges: [
    {
      id: 'JS-2026-00019',
      domain: 'Agriculture',
      title: 'Electrochemical Micro-fluidic Soil Acidity Sensors',
      location: 'Gumla',
      contributorsCount: 16,
      daysLeft: 4,
      status: 'Pending Scoring',
      domainColor: 'text-[#15803D] bg-[#F0FDF4] border-[#BBF7D0]',
      iconType: 'Wheat',
    },
    {
      id: 'JS-2026-00017',
      domain: 'Education',
      title: 'Offline Solar Micro-Cloud Classroom Servers in West Singhbhum',
      location: 'West Singhbhum',
      contributorsCount: 12,
      daysLeft: 9,
      status: 'In Review',
      domainColor: 'text-[#7E22CE] bg-[#FAF5FF] border-[#E9D5FF]',
      iconType: 'GraduationCap',
    },
  ],
  featured: {
    id: 'JS-2026-00019',
    title: 'Soil Intelligence for Smallholder Farmers',
    district: 'Bishunpur, Gumla',
    contributorsCount: 16,
    ideasCount: 7,
    targetDate: 'July 2026',
    domain: 'Agriculture',
  },
  activities: [
    {
      id: 'act-exp-1',
      title: 'Assigned Technical Audit',
      target: 'Soil Chemistry Sensor Collar Review',
      timestamp: '4 hours ago',
      type: 'evaluation',
    },
  ],
};

const ADMIN_DATA: DashboardRoleData = {
  role: 'admin',
  roleLabel: 'State Innovation Mission Directorate',
  userName: 'Mission Director',
  greeting: 'State Directorate Overview 🇮🇳',
  subtitle: 'Jharkhand 24-district civic innovation & governance telemetry.',
  impact: {
    title: 'Statewide Implementation Scale',
    mainCount: 18,
    mainLabel: 'Active Projects',
    growth: '↑ 38% civic engagement',
    chartData: [
      { month: 'Jan', value: 6 },
      { month: 'Feb', value: 8 },
      { month: 'Mar', value: 11 },
      { month: 'Apr', value: 14 },
      { month: 'May', value: 16 },
      { month: 'Jun', value: 18 },
    ],
  },
  metrics: [
    {
      id: 'm-submissions',
      label: 'Citizen Submissions',
      value: 284,
      change: '+32 this week',
      icon: 'Users',
      bgTint: 'bg-[#F0FDF4]',
      borderTint: 'border-[#BBF7D0]',
      iconColor: 'text-[#15803D]',
    },
    {
      id: 'm-pilots',
      label: 'Active Field Pilots',
      value: 6,
      change: '6 Districts',
      icon: 'Rocket',
      bgTint: 'bg-[#FAF5FF]',
      borderTint: 'border-[#E9D5FF]',
      iconColor: 'text-[#7E22CE]',
    },
    {
      id: 'm-impacted',
      label: 'People Impacted',
      value: '42,000+',
      change: 'Audited Telemetry',
      icon: 'Trophy',
      bgTint: 'bg-[#FFFBEB]',
      borderTint: 'border-[#FDE68A]',
      iconColor: 'text-[#B45309]',
    },
  ],
  challengesTitle: 'Statewide Problem Moderation Triage',
  challenges: [
    {
      id: 'JS-2026-00024',
      domain: 'Water Management',
      title: 'Frequent Breakdown of Drinking Water Pumps in Murhu Block',
      location: 'Khunti',
      contributorsCount: 126,
      daysLeft: 8,
      status: 'In Field Pilot',
      domainColor: 'text-[#0284C7] bg-[#F0F9FF] border-[#BAE6FD]',
      iconType: 'Droplets',
    },
    {
      id: 'JS-2024-00003',
      domain: 'Mining Safety',
      title: 'Early Detection of Ground Subsidence in Mining Areas',
      location: 'Dhanbad',
      contributorsCount: 84,
      daysLeft: 16,
      status: 'Prototype Validated',
      domainColor: 'text-[#B45309] bg-[#FFFBEB] border-[#FDE68A]',
      iconType: 'Zap',
    },
  ],
  featured: {
    id: 'PROJECT-2026-0012',
    title: 'Smart Rural Water Infrastructure Monitoring',
    district: 'Murhu Block, Khunti',
    contributorsCount: 126,
    ideasCount: 42,
    targetDate: 'State DWSD Tender Aug 2026',
    domain: 'Water Management',
  },
  activities: [
    {
      id: 'act-adm-1',
      title: 'New Challenge Reported',
      target: 'Solar Cold Storage Failure in Latehar',
      timestamp: '35 mins ago',
      type: 'comment',
    },
    {
      id: 'act-adm-2',
      title: 'Consortium Milestone Approved',
      target: 'BIT Mesra · Khunti Drinking Water Pilot',
      timestamp: 'Yesterday',
      type: 'pilot',
    },
  ],
};

const ROLES_STORE: Record<DashboardRole, DashboardRoleData> = {
  citizen: CITIZEN_DATA,
  institution: INSTITUTION_DATA,
  expert: EXPERT_DATA,
  admin: ADMIN_DATA,
};

export async function getDashboardData(
  role: DashboardRole = 'citizen'
): Promise<DashboardRoleData> {
  const baseData = { ...(ROLES_STORE[role] || ROLES_STORE.citizen) };

  try {
    const overview = await api.get<any>('/dashboard/overview');
    if (overview) {
      // Enrich with real counts from database
      if (overview.ideaCount && baseData.metrics[0]) {
        baseData.metrics[0] = { ...baseData.metrics[0], value: overview.ideaCount };
      }
      if (overview.challengeCount && baseData.metrics[1]) {
        baseData.metrics[1] = { ...baseData.metrics[1], value: overview.challengeCount };
      }
      if (overview.solutionCount && baseData.metrics[2]) {
        baseData.metrics[2] = { ...baseData.metrics[2], value: overview.solutionCount };
      }
      if (overview.ideaCount && baseData.impact) {
        baseData.impact = { ...baseData.impact, mainCount: overview.ideaCount };
      }
    }
  } catch (error) {
    console.warn('Backend overview endpoint unreachable, using standard profile metrics:', error);
  }

  return baseData;
}
