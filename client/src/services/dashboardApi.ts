import { DashboardRole, DashboardRoleData, DashboardMetricCard, ActiveChallengeItem, DashboardActivityItem } from '../types/dashboard';
import { api } from './api';

function getDomainColor(domain: string = ''): string {
  const d = domain.toLowerCase();
  if (d.includes('water')) return 'text-[#0284C7] bg-[#F0F9FF] border-[#BAE6FD]';
  if (d.includes('agri') || d.includes('forest')) return 'text-[#15803D] bg-[#F0FDF4] border-[#BBF7D0]';
  if (d.includes('min') || d.includes('safe')) return 'text-[#B45309] bg-[#FFFBEB] border-[#FDE68A]';
  if (d.includes('health')) return 'text-[#BE123C] bg-[#FFF1F2] border-[#FECDD3]';
  return 'text-[#7E22CE] bg-[#FAF5FF] border-[#E9D5FF]';
}

function getDomainIcon(domain: string = ''): string {
  const d = domain.toLowerCase();
  if (d.includes('water')) return 'Droplets';
  if (d.includes('agri') || d.includes('forest')) return 'Wheat';
  if (d.includes('min') || d.includes('safe')) return 'Zap';
  if (d.includes('health')) return 'HeartPulse';
  return 'Sparkles';
}

export async function getDashboardData(
  role: DashboardRole = 'citizen',
): Promise<DashboardRoleData> {
  // Always fetch global ecosystem overview for shared metrics
  let overview: any = null;
  try {
    overview = await api.get<any>('/dashboard/overview');
  } catch (err) {
    console.warn('Unable to load overview:', err);
  }

  // Attempt role-specific data
  let roleData: any = null;
  try {
    if (role === 'citizen') {
      roleData = await api.get<any>('/dashboard/citizen');
    } else if (role === 'institution') {
      roleData = await api.get<any>('/dashboard/university');
    } else if (role === 'expert') {
      roleData = await api.get<any>('/dashboard/industry');
    } else if (role === 'admin') {
      roleData = await api.get<any>('/dashboard/government');
    }
  } catch (err) {
    console.warn(`Role dashboard /dashboard/${role} query skipped or unauthorized:`, err);
  }

  const ideasCount = roleData?.stats?.ideasCount ?? overview?.ideaCount ?? 0;
  const challengeCount = roleData?.stats?.totalSubmitted ?? overview?.challengeCount ?? 0;
  const solutionsCount = overview?.solutionCount ?? 0;
  const projectsCount = roleData?.stats?.projectsCount ?? overview?.projectCount ?? 0;

  // Real Metric Cards Group
  const metrics: DashboardMetricCard[] = [
    {
      id: 'm-ideas',
      label: role === 'citizen' ? 'Ideas Contributed' : 'Ideas in Pipeline',
      value: ideasCount,
      change: '+1 active sprint',
      icon: 'Lightbulb',
      bgTint: 'bg-[#F0FDF4]',
      borderTint: 'border-[#BBF7D0]',
      iconColor: 'text-[#15803D]',
    },
    {
      id: 'm-challenges',
      label: role === 'citizen' ? 'Challenges Tracked' : 'Civic Challenges',
      value: challengeCount,
      change: 'Active in Jharkhand',
      icon: 'Zap',
      bgTint: 'bg-[#FFFBEB]',
      borderTint: 'border-[#FDE68A]',
      iconColor: 'text-[#B45309]',
    },
    {
      id: 'm-solutions',
      label: 'Solutions in Field',
      value: solutionsCount,
      change: `${projectsCount} Active Projects`,
      icon: 'Trophy',
      bgTint: 'bg-[#FAF5FF]',
      borderTint: 'border-[#E9D5FF]',
      iconColor: 'text-[#7E22CE]',
    },
  ];

  // Map real challenges from role submissions or overview
  const rawChallenges: any[] = (roleData?.challenges && roleData.challenges.length > 0)
    ? roleData.challenges
    : (overview?.recentChallenges || []);

  const challenges: ActiveChallengeItem[] = rawChallenges.map((ch: any) => {
    const domain = ch.domain || 'Civic Infrastructure';
    return {
      id: ch.publicId || ch.challengeCode || ch.id,
      domain,
      title: ch.title,
      location: ch.district?.name || ch.district || ch.block || 'Jharkhand',
      contributorsCount: ch._count?.collaborations || ch._count?.ideas || 1,
      daysLeft: 14,
      status: ch.status?.replace(/_/g, ' ') || 'Open for Ideas',
      domainColor: getDomainColor(domain),
      iconType: getDomainIcon(domain),
    };
  });

  // Map real activities from database
  const rawActivities: any[] = (roleData?.activities && roleData.activities.length > 0)
    ? roleData.activities
    : (overview?.recentActivities || []);

  const activities: DashboardActivityItem[] = rawActivities.slice(0, 5).map((act: any) => {
    let type: DashboardActivityItem['type'] = 'comment';
    if (act.type?.includes('PILOT')) type = 'pilot';
    else if (act.type?.includes('EVALUATION') || act.type?.includes('VERIF')) type = 'evaluation';
    else if (act.type?.includes('SHORTLIST')) type = 'shortlist';

    return {
      id: act.id,
      title: act.type?.replace(/_/g, ' ') || 'Activity recorded',
      target: act.message || 'Civic innovation record updated',
      timestamp: new Date(act.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      }),
      type,
    };
  });

  // Featured Challenge
  const firstChallenge = overview?.recentChallenges?.[0] || rawChallenges[0];
  const featured = {
    id: firstChallenge?.publicId || firstChallenge?.id || 'JS-2026-00024',
    title: firstChallenge?.title || 'Grassroots Innovation Problem Queue',
    district: firstChallenge?.district?.name || firstChallenge?.district || 'Ranchi',
    contributorsCount: firstChallenge?._count?.collaborations || 1,
    ideasCount: firstChallenge?._count?.ideas || 1,
    targetDate: 'Active Field Verification',
    domain: firstChallenge?.domain || 'Water Management',
  };

  const roleLabelMap: Record<DashboardRole, string> = {
    citizen: 'Citizen Innovator',
    institution: 'Academic & R&D Lead',
    expert: 'Industry & Technical Partner',
    admin: 'State Government Directorate',
  };

  return {
    role,
    roleLabel: roleLabelMap[role],
    userName: 'Innovator',
    greeting: 'Welcome to JharSankalp 👋',
    subtitle: 'Track live civic challenges, open ideas, and community impact.',
    impact: {
      title: 'Civic Innovation Momentum',
      mainCount: ideasCount,
      mainLabel: 'Verified Submissions',
      growth: `Live database: ${challengeCount} challenges registered`,
      chartData: [
        { month: 'Jan', value: Math.max(1, Math.round(ideasCount * 0.2)) },
        { month: 'Feb', value: Math.max(1, Math.round(ideasCount * 0.4)) },
        { month: 'Mar', value: Math.max(1, Math.round(ideasCount * 0.6)) },
        { month: 'Apr', value: Math.max(1, Math.round(ideasCount * 0.8)) },
        { month: 'May', value: ideasCount },
      ],
    },
    metrics,
    challengesTitle: role === 'citizen' ? 'Your Active Challenges' : 'Priority Challenges in Jharkhand',
    challenges,
    featured,
    activities,
  };
}
