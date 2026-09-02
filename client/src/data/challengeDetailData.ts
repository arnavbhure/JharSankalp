import { ChallengeDetailData } from '../types/challengeDetail';
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
      observation: 'Increased reports of ground cracks near residential structures and access roads in Lodna.',
      sourceType: 'Local Community Field Log & Ward Observation Reports',
      verified: true,
      docketId: 'LOG-2023-0941',
    },
    {
      year: '2024',
      dateStr: 'June 2024',
      observation: 'Local geological surveys identified 37 high-risk zones exhibiting subsurface thermal subsidence acceleration.',
      sourceType: 'Gram Panchayat Safety Audit & Regional Geotechnical Reconnaissance',
      verified: true,
      docketId: 'AUDIT-2024-0418',
    },
    {
      year: '2025',
      dateStr: 'November 2025',
      observation: 'Community organizations formally requested multi-sensor early warning telemetry and automated evacuation sirens.',
      sourceType: 'District Public Grievance Docket #DNB-2025-0814',
      verified: true,
      docketId: 'DOCKET-2025-0814',
    },
    {
      year: '2026',
      dateStr: '12 March 2026',
      observation: 'Challenge formally submitted and accepted into JharSankalp Innovation Exchange for consortium matching.',
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
      feasibilityNotes: 'Pilot hardware testbench under review with mining telemetry engineering teams.',
      potentialPartners: ['IIT (ISM) Dhanbad', 'Mining IoT Hardware Consortium'],
    },
    {
      number: 'Approach 02',
      title: 'AI-Assisted Risk Prediction',
      description:
        'Machine learning models trained on historical geological borehole data, satellite InSAR displacement rates, and rainfall percolation indices to predict ground shift probability 48–72 hours before surface manifestation.',
      status: 'Research Needed',
      feasibilityNotes: 'Requires high-resolution satellite radar pass datasets and calibrated ground truth anchors.',
      potentialPartners: ['Geospatial Research Group', 'Data Science Faculty'],
    },
    {
      number: 'Approach 03',
      title: 'Community Alert Network',
      description:
        'A resilient decentralized local communications mesh combining solar-powered ward audio sirens, emergency SMS broadcasts, and volunteer mobile push notifications to initiate orderly preventative evacuations.',
      status: 'Under Discussion',
      feasibilityNotes: 'Draft standard operating procedure prepared with local panchayat disaster volunteers.',
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
          contributionArea: 'Subsurface modeling, acoustic emission sensor calibration, and geological stratum analysis',
        },
        {
          name: 'BIT Sindri',
          role: 'Department of Mining Engineering',
          organizationType: 'University',
          contributionArea: 'Field sensor deployment, localized environmental telemetry, and student research teams',
        },
      ],
    },
    {
      categoryName: 'Industry & Technical Partners',
      description: 'Industrial sensor fabricators, telemetry providers, and geospatial telemetry specialists',
      partners: [
        {
          name: 'Mining Technology Partners',
          role: 'Industrial Hardware & Telemetry R&D Group',
          organizationType: 'Industry',
          contributionArea: 'Supply of intrinsically safe borehole sensors and wireless mesh repeater nodes',
        },
        {
          name: 'Geospatial Research Organizations',
          role: 'Radar & InSAR Satellite Remote Sensing Group',
          organizationType: 'Industry',
          contributionArea: 'Bi-weekly differential satellite radar interferometry to monitor multi-square-kilometer ground elevation shifts',
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
          contributionArea: 'Physical ground truth reporting, weekly crack inspection logs, and evacuation route feedback',
        },
        {
          name: 'Civil Society Organizations',
          role: 'Jharkhand Disaster Preparedness & Citizen Safety Forum',
          organizationType: 'Community',
          contributionArea: 'Citizen safety training, vernacular awareness drills, and community siren maintenance',
        },
      ],
    },
  ],
  lifecycleStages: [
    {
      stage: 'Identify',
      status: 'completed',
      label: 'Identify',
      summary: 'Ground crack observation logged by citizen dockets and corroborated by Gram Panchayat safety audits.',
      completedDate: 'Sep 2023',
    },
    {
      stage: 'Validate',
      status: 'completed',
      label: 'Validate',
      summary: 'State technical review confirmed high geological subsidence severity and assigned High Impact Priority.',
      completedDate: 'Mar 2026',
    },
    {
      stage: 'Research',
      status: 'current',
      label: 'Research & Solution Exploration',
      summary: 'Cross-institution research consortium exploring IoT acoustic sensors, InSAR satellite correlation, and automated alert sirens.',
    },
    {
      stage: 'Build',
      status: 'upcoming',
      label: 'Build Prototype',
      summary: 'Fabrication of integrated low-power sensor pilot pods and testing of telemetry dashboard.',
    },
    {
      stage: 'Pilot',
      status: 'upcoming',
      label: 'Field Pilot',
      summary: 'Controlled deployment of 12 sensor nodes in Jharia Sector 4 with live resident warning verification.',
    },
    {
      stage: 'Impact',
      status: 'upcoming',
      label: 'Scale & Policy',
      summary: 'Integration with District Disaster Management Authority emergency warning protocol statewide.',
    },
  ],
  stats: {
    collaboratorsCount: 12,
    ideasCount: 8,
    followersCount: 142,
  },
  relatedChallengeIds: ['JS-2024-00015', 'JS-2024-00019', 'JS-2024-00018'],
};

/**
 * Returns structured challenge detail data for a given challenge ID.
 * Defaults to the comprehensive Dhanbad Mining Safety case file if ID matches or is fallback.
 */
export function getChallengeDetail(id?: string): ChallengeDetailData {
  if (!id || id === 'JS-2024-00003') {
    return DHANBAD_MINING_DETAIL;
  }

  // Find in CHALLENGES_DATA if another challenge was requested
  const baseChallenge = CHALLENGES_DATA.find((c) => c.id === id);

  if (!baseChallenge) {
    return DHANBAD_MINING_DETAIL;
  }

  return {
    ...DHANBAD_MINING_DETAIL,
    id: baseChallenge.id,
    title: baseChallenge.title,
    category: baseChallenge.category,
    district: baseChallenge.district,
    subLocation: baseChallenge.block,
    summary: baseChallenge.description,
    locationCoordinates: {
      lat: 23.34 + (baseChallenge.coordinates.y - 50) * 0.05,
      lon: 85.31 + (baseChallenge.coordinates.x - 50) * 0.05,
      formatted: `${(23.34 + (baseChallenge.coordinates.y - 50) * 0.05).toFixed(2)}° N · ${(85.31 + (baseChallenge.coordinates.x - 50) * 0.05).toFixed(2)}° E`,
      zoneName: `${baseChallenge.district.toUpperCase()} · ${baseChallenge.block.toUpperCase()}`,
    },
    status: baseChallenge.status.toUpperCase(),
    impactPriority: `${baseChallenge.impactLevel} Priority`,
    stats: {
      collaboratorsCount: baseChallenge.collaboratorsCount,
      ideasCount: baseChallenge.ideasCount,
      followersCount: 85 + baseChallenge.collaboratorsCount * 4,
    },
    profile: {
      ...DHANBAD_MINING_DETAIL.profile,
      district: baseChallenge.district,
      focusArea: baseChallenge.category,
      dateSubmitted: baseChallenge.dateReported,
      trackingId: `JS-CASE-${baseChallenge.district.substring(0, 3).toUpperCase()}-${baseChallenge.id.substring(baseChallenge.id.length - 4)}`,
    },
  };
}
