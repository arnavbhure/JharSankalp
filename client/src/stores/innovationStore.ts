import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IdeaTimelineItem {
  date: string;
  title: string;
  desc: string;
  done: boolean;
}

export interface SubmittedIdea {
  id: string;
  challengeId: string;
  challengeTitle: string;
  district: string;
  focusArea: string;
  title: string;
  summary: string;
  description: string;
  problemPart: string;
  expectedImpact: string;
  beneficiaries: string;
  approach: string;
  resources: string;
  complexity: 'Low' | 'Medium' | 'High';
  seekingCollaborators: boolean;
  collaborationNeeds: string[];
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Selected';
  submissionDate: string;
  collaboratorsCount: number;
  authorName: string;
  timeline: IdeaTimelineItem[];
}

interface InnovationStoreState {
  joinedChallengeIds: string[];
  savedChallengeIds: string[];
  userIdeas: SubmittedIdea[];

  // Actions
  joinChallenge: (challengeId: string) => boolean;
  isChallengeJoined: (challengeId: string) => boolean;
  saveChallenge: (challengeId: string) => void;
  isChallengeSaved: (challengeId: string) => boolean;
  submitIdea: (
    data: Omit<SubmittedIdea, 'id' | 'submissionDate' | 'status' | 'collaboratorsCount' | 'timeline'>
  ) => string;
  saveDraftIdea: (
    data: Partial<SubmittedIdea> & { title: string; challengeId: string; challengeTitle: string }
  ) => string;
  getIdeaById: (id: string) => SubmittedIdea | undefined;
  withdrawIdea: (id: string) => void;
}

const INITIAL_IDEAS: SubmittedIdea[] = [
  {
    id: 'IDEA-2026-0001',
    challengeId: 'JS-2026-00024',
    challengeTitle: 'Frequent Breakdown of Drinking Water Handpumps in Murhu Block',
    district: 'Khunti',
    focusArea: 'Water Infrastructure',
    title: 'Acoustic & Vibration Sensor Collar for India Mark II Handpumps',
    summary: 'Clamp-on piezoelectric sensor collar detecting mechanical pump stroke anomalies.',
    description:
      'A low-power non-invasive piezoelectric transducer collar clamped onto the riser main. It records piston stroke vibration frequency and identifies valve leakages before total breakdown.',
    problemPart: 'Early mechanical wear detection in subterranean pump cylinders.',
    expectedImpact: '45% reduction in handpump downtime and proactive technician dispatch.',
    beneficiaries: '2,000+ tribal village residents across 20 Murhu Block habitations.',
    approach: 'Edge MCU processing vibration RMS values, transmitting over LoRa mesh to block office.',
    resources: 'Piezoelectric sensor, STM32 low-power MCU, 3.6V Li-SOCl2 battery, weatherproof IP67 collar.',
    complexity: 'Medium',
    seekingCollaborators: true,
    collaborationNeeds: ['Technical Expertise', 'Research Support', 'Government Partnership'],
    status: 'Selected',
    submissionDate: 'May 14, 2026',
    collaboratorsCount: 14,
    authorName: 'Arnab',
    timeline: [
      { date: 'May 14, 2026', title: 'Idea Submitted', desc: 'Entered into JharSankalp innovation pipeline.', done: true },
      { date: 'May 20, 2026', title: 'Initial Review Completed', desc: 'DWSD Technical cell cleared bench testing.', done: true },
      { date: 'June 02, 2026', title: 'Consortium Formed', desc: 'BIT Mesra and Murhu BDO signed field pilot agreement.', done: true },
      { date: 'July 2026', title: 'Pilot Deployment', desc: '14 sensor units installed in active testbed.', done: true },
    ],
  },
  {
    id: 'IDEA-2026-0002',
    challengeId: 'JS-2026-00019',
    challengeTitle: 'Improving Post-Harvest Storage & Market Access for Lac Collectors',
    district: 'Latehar',
    focusArea: 'Forest Economy',
    title: 'Off-Grid Phase Change Material (PCM) Lac Cooling Chambers',
    summary: 'Passive temperature-regulated storage preventing premature lac brood germination.',
    description:
      'Thermal battery storage using bio-based phase change wax packs in insulated bamboo-fibre boxes to maintain 18-22°C without electricity.',
    problemPart: 'High heat causing scraped lac stickiness and market value degradation.',
    expectedImpact: 'Extends fresh brood viability from 4 days to 14 days.',
    beneficiaries: '450 tribal gathering families in Latehar forest range.',
    approach: 'Passive PCM slabs charged with cool night well water, lined inside local bamboo baskets.',
    resources: 'Bio-PCM wax packs, expanded polystyrene / coir insulation, local bamboo encasement.',
    complexity: 'Low',
    seekingCollaborators: true,
    collaborationNeeds: ['Research Support', 'Community Partners'],
    status: 'Under Review',
    submissionDate: 'May 28, 2026',
    collaboratorsCount: 6,
    authorName: 'Arnab',
    timeline: [
      { date: 'May 28, 2026', title: 'Idea Submitted', desc: 'Submitted for Latehar Forest Division call.', done: true },
      { date: 'June 04, 2026', title: 'Technical Feasibility Review', desc: 'Under review by IIT ISM Dhanbad Agri-tech cell.', done: false },
    ],
  },
  {
    id: 'IDEA-2026-0003',
    challengeId: 'JS-2026-00008',
    challengeTitle: 'Rural Healthcare Accessibility Initiative in Dumka',
    district: 'Dumka',
    focusArea: 'Healthcare',
    title: 'Micro-Solar Foldable Diagnostic Kit for Village ASHA Workers',
    summary: 'Solar-powered backpack kit with digital hemoglobinometer and vital monitor.',
    description:
      'A ruggedized field kit enabling doorstep maternal vitals screening with offline Bluetooth data caching to smartphone app.',
    problemPart: 'Late detection of high-risk pregnancies in hill tracts.',
    expectedImpact: '100% antenatal checkup coverage in remote Santhal Pargana villages.',
    beneficiaries: 'ASHA workers and 1,200+ rural expectant mothers.',
    approach: 'Low-cost optical diagnostic sensors connected to an offline Android app with Santhali voice guidance.',
    resources: 'Solar-charged battery pack, spectrophotometric test strips, tablet.',
    complexity: 'Medium',
    seekingCollaborators: true,
    collaborationNeeds: ['Funding', 'Government Partnership'],
    status: 'Submitted',
    submissionDate: 'June 01, 2026',
    collaboratorsCount: 2,
    authorName: 'Arnab',
    timeline: [
      { date: 'June 01, 2026', title: 'Idea Submitted', desc: 'Submitted into district triage queue.', done: true },
      { date: 'Pending', title: 'District Health Review', desc: 'Awaiting CMO review.', done: false },
    ],
  },
  {
    id: 'IDEA-2026-0004',
    challengeId: 'JS-2026-00024',
    challengeTitle: 'Frequent Breakdown of Drinking Water Handpumps in Murhu Block',
    district: 'Ranchi',
    focusArea: 'Water Management',
    title: 'Rainwater Harvest Silt Trap using Bamboo & Coir Bio-filters',
    summary: 'Low-cost pre-filtration chamber for rooftop rainwater recharge.',
    description:
      'Simple gravity-fed modular filtration box catching suspended silt before water enters recharge boreholes.',
    problemPart: 'Clogging of groundwater recharge shafts during initial monsoon downpours.',
    expectedImpact: 'Doubles longevity of urban percolation wells.',
    beneficiaries: 'Peri-urban ward resident welfare associations.',
    approach: 'Coir and charcoal filtration stages built from local agro-waste.',
    resources: 'Charcoal, graded gravel, coir mats, terracotta drainage pipe.',
    complexity: 'Low',
    seekingCollaborators: false,
    collaborationNeeds: [],
    status: 'Draft',
    submissionDate: 'June 02, 2026',
    collaboratorsCount: 1,
    authorName: 'Arnab',
    timeline: [
      { date: 'June 02, 2026', title: 'Draft Created', desc: 'Saved locally. Ready for final review.', done: true },
    ],
  },
];

export const useInnovationStore = create<InnovationStoreState>()(
  persist(
    (set, get) => ({
      joinedChallengeIds: ['JS-2026-00024', 'JS-2026-00019'],
      savedChallengeIds: ['JS-2024-00003'],
      userIdeas: INITIAL_IDEAS,

      joinChallenge: (challengeId: string) => {
        const { joinedChallengeIds } = get();
        if (!joinedChallengeIds.includes(challengeId)) {
          set({ joinedChallengeIds: [...joinedChallengeIds, challengeId] });
          return true;
        }
        return false;
      },

      isChallengeJoined: (challengeId: string) => {
        return get().joinedChallengeIds.includes(challengeId);
      },

      saveChallenge: (challengeId: string) => {
        const { savedChallengeIds } = get();
        if (savedChallengeIds.includes(challengeId)) {
          set({
            savedChallengeIds: savedChallengeIds.filter((id) => id !== challengeId),
          });
        } else {
          set({ savedChallengeIds: [...savedChallengeIds, challengeId] });
        }
      },

      isChallengeSaved: (challengeId: string) => {
        return get().savedChallengeIds.includes(challengeId);
      },

      submitIdea: (data) => {
        const id = `IDEA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const dateOptions: Intl.DateTimeFormatOptions = {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        };
        const submissionDate = new Date().toLocaleDateString('en-US', dateOptions);

        const newIdea: SubmittedIdea = {
          ...data,
          id,
          status: 'Submitted',
          submissionDate,
          collaboratorsCount: 1,
          timeline: [
            {
              date: submissionDate,
              title: 'Idea Submitted',
              desc: 'Entered into JharSankalp innovation pipeline.',
              done: true,
            },
            {
              date: 'Estimated +2 Days',
              title: 'Initial Review by District Innovation Cell',
              desc: 'Screening for regional problem relevance and technical feasibility.',
              done: false,
            },
            {
              date: 'Estimated +5 Days',
              title: 'Community & Expert Feedback',
              desc: 'Feedback from academic R&D teams and local stakeholders.',
              done: false,
            },
            {
              date: 'Estimated +12 Days',
              title: 'Collaboration & Consortium Formation',
              desc: 'Matching with technical mentors and field implementation partners.',
              done: false,
            },
            {
              date: 'Target August 2026',
              title: 'Pilot Deployment Consideration',
              desc: 'Evaluation for seed development grant and pilot testbed authorization.',
              done: false,
            },
          ],
        };

        // Also auto-join the challenge if not already joined
        const { joinedChallengeIds } = get();
        const updatedJoined = joinedChallengeIds.includes(data.challengeId)
          ? joinedChallengeIds
          : [...joinedChallengeIds, data.challengeId];

        // Replace if draft already exists with same title or add new
        const existingIdeas = get().userIdeas.filter(
          (i) => !(i.status === 'Draft' && i.title === data.title)
        );

        set({
          userIdeas: [newIdea, ...existingIdeas],
          joinedChallengeIds: updatedJoined,
        });

        return id;
      },

      saveDraftIdea: (data) => {
        const id =
          data.id || `DRAFT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const dateOptions: Intl.DateTimeFormatOptions = {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        };
        const submissionDate = new Date().toLocaleDateString('en-US', dateOptions);

        const draftIdea: SubmittedIdea = {
          id,
          challengeId: data.challengeId,
          challengeTitle: data.challengeTitle,
          district: data.district || 'Jharkhand',
          focusArea: data.focusArea || 'General Innovation',
          title: data.title || 'Untitled Draft Idea',
          summary: data.summary || '',
          description: data.description || '',
          problemPart: data.problemPart || '',
          expectedImpact: data.expectedImpact || '',
          beneficiaries: data.beneficiaries || '',
          approach: data.approach || '',
          resources: data.resources || '',
          complexity: data.complexity || 'Medium',
          seekingCollaborators: data.seekingCollaborators ?? true,
          collaborationNeeds: data.collaborationNeeds || [],
          status: 'Draft',
          submissionDate,
          collaboratorsCount: 1,
          authorName: data.authorName || 'Arnab',
          timeline: [
            {
              date: submissionDate,
              title: 'Draft Saved',
              desc: 'Saved to private draft workspace.',
              done: true,
            },
          ],
        };

        const existingWithoutThis = get().userIdeas.filter((i) => i.id !== id);
        set({
          userIdeas: [draftIdea, ...existingWithoutThis],
        });

        return id;
      },

      getIdeaById: (id: string) => {
        return get().userIdeas.find((i) => i.id === id);
      },

      withdrawIdea: (id: string) => {
        set({
          userIdeas: get().userIdeas.filter((i) => i.id !== id),
        });
      },
    }),
    {
      name: 'jharsankalp-innovation-store',
    }
  )
);
