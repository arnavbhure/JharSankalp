import { Annotation, StateGraph, START, END } from '@langchain/langgraph';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import {
  ChallengeAnalysis,
  ChallengeAnalysisSchema,
  ChallengeInput,
  SUPPORTED_DOMAINS,
} from '../schemas/challengeAnalysis.schema.js';
import { getOpenRouterModel, isOpenRouterConfigured } from '../config/model.js';
import {
  CHALLENGE_ANALYSIS_SYSTEM_PROMPT,
  formatChallengeUserPrompt,
} from '../prompts/challengeAnalysis.prompt.js';

/**
 * State definition for the Challenge Intelligence Graph.
 */
export const ChallengeAnalysisGraphState = Annotation.Root({
  title: Annotation<string>(),
  description: Annotation<string>(),
  district: Annotation<string | undefined>(),
  location: Annotation<string | undefined>(),
  affectedPopulation: Annotation<number | undefined>(),
  analysis: Annotation<ChallengeAnalysis | undefined>(),
  isMockFallback: Annotation<boolean | undefined>(),
  error: Annotation<string | undefined>(),
});

/**
 * Deterministic local fallback generator when OpenRouter API key is not yet set.
 */
function generateDeterministicAnalysis(input: ChallengeInput): ChallengeAnalysis {
  const text = `${input.title} ${input.description}`.toLowerCase();

  let domain: (typeof SUPPORTED_DOMAINS)[number] = 'Water Management';
  let subDomain = 'Rural Water Infrastructure';
  let problemType = 'Infrastructure Breakdown';
  let priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'HIGH';
  let reason = 'Essential public service disruption affecting rural community drinking water access.';
  let stakeholders = ['Rural Residents', 'Gram Panchayat', 'Jal Sahiya Collective', 'Block Development Office'];
  let causes = ['Mechanical fatigue of pump valves', 'Lack of real-time monitoring', 'Delayed maintenance reporting'];
  let approaches = ['IoT Vibration & Telemetry Collars', 'Automated SMS Alerts to BDO Mechanics', 'Community Spare Parts Buffer'];
  let expertise = ['Embedded IoT Systems', 'LoRaWAN Networks', 'Hydraulic Engineering', 'Community Governance'];

  if (text.includes('soil') || text.includes('crop') || text.includes('farmer') || text.includes('fertiliz') || text.includes('agri')) {
    domain = 'Agriculture';
    subDomain = 'Soil Health Monitoring';
    problemType = 'Agricultural Productivity & Input Optimization';
    priority = 'HIGH';
    reason = 'Widespread crop yield decline and unguided fertilizer expenditure affecting smallholder tribal livelihoods.';
    stakeholders = ['Smallholder Farmers', 'Krishi Vigyan Kendra', 'Department of Agriculture', 'Farmer Producer Orgs'];
    causes = ['Lack of rapid soil testing facilities', 'Over-application of chemical fertilizers', 'Soil acidification in laterite belts'];
    approaches = ['Handheld Optical Soil Spectrometers', 'Vernacular Voice-Assisted Mobile Recommendations', 'Organic Biochar Soil Conditioning'];
    expertise = ['Agronomy', 'Spectroscopy & Optical Sensing', 'Mobile App Development', 'Soil Chemistry'];
  } else if (text.includes('subside') || text.includes('mine') || text.includes('coal') || text.includes('crack') || text.includes('inundat')) {
    domain = 'Mining Safety';
    subDomain = 'Mine Subsidence Early Warning';
    problemType = 'Geological Hazard & Structural Risk';
    priority = 'CRITICAL';
    reason = 'Catastrophic ground subsidence and underground coal instability directly threatening human settlements and structures.';
    stakeholders = ['Mining Settlement Residents', 'Directorate General of Mines Safety', 'District Disaster Management', 'Mining Corporation'];
    causes = ['Legacy unmapped underground extraction galleries', 'Subsurface coal seam fires weakening rock strata', 'Lack of continuous ground telemetry'];
    approaches = ['Subsurface Extensometer & MEMS Tilt Arrays', 'Satellite InSAR Surface Deformation Fusion', 'Automated Community Evacuation Sirens'];
    expertise = ['Mining Geophysics', 'Rock Mechanics', 'Remote Sensing / InSAR', 'Emergency Civil Defence'];
  } else if (text.includes('school') || text.includes('student') || text.includes('educat') || text.includes('learn') || text.includes('teach')) {
    domain = 'Education';
    subDomain = 'Vernacular Educational Infrastructure';
    problemType = 'Educational Equity & Resource Accessibility';
    priority = 'MEDIUM';
    reason = 'Educational resource gap limiting experiential learning and mother-tongue foundational numeracy for rural students.';
    stakeholders = ['Primary School Students', 'Tribal Community Educators', 'District Education Department', 'SMC Committees'];
    causes = ['Lack of grid electricity and internet connectivity', 'Scarcity of mother-tongue (Ol Chiki / Mundari) digital learning tools', 'Absence of physical laboratory apparatus'];
    approaches = ['Solar Offline Wi-Fi Micro-Servers', 'Bilingual Interactive Ol Chiki Multimedia Modules', 'Modular Experiential STEM Science Kits'];
    expertise = ['EdTech Systems', 'Vernacular Curriculum Localization', 'Solar Micro-Power Hardware', 'Pedagogy'];
  } else if (text.includes('health') || text.includes('doctor') || text.includes('anemia') || text.includes('diagnos') || text.includes('medic') || text.includes('asha')) {
    domain = 'Healthcare';
    subDomain = 'Point-of-Care Diagnostics';
    problemType = 'Diagnostic Healthcare Accessibility';
    priority = 'HIGH';
    reason = 'Delayed diagnosis of severe health conditions due to remote geography and lack of point-of-care diagnostics.';
    stakeholders = ['Mothers and Children', 'Frontline ASHA & ANM Workers', 'Primary Health Center Staff', 'District Health Society'];
    causes = ['Prohibitive transit distance to referral medical centers', 'Lack of battery-powered diagnostic instruments for remote hamlets', 'Delayed triage'];
    approaches = ['Portable Solar-Charged Diagnostic Backpacks', 'Store-and-Forward Telemedicine Telemetry', 'Non-Invasive Rapid Vitals Screening'];
    expertise = ['Biomedical Engineering', 'Frontline Community Health Protocols', 'Mobile Telemetry', 'Point-of-Care Testing'];
  } else if (text.includes('forest') || text.includes('wildfire') || text.includes('elephant') || text.includes('logging') || text.includes('tree')) {
    domain = 'Environment';
    subDomain = 'Forest Conservation & Wildlife Telemetry';
    problemType = 'Ecosystem Preservation & Biodiversity Protection';
    priority = 'MEDIUM';
    reason = 'Illegal extraction and environmental degradation impacting community forest rights and biodiversity corridors.';
    stakeholders = ['Forest Protection Committees (Van Suraksha Samitis)', 'Forest Department Rangers', 'Indigenous Forest Produce Collectors'];
    causes = ['Undetected illegal felling in remote buffer zones', 'Human-wildlife conflict along seasonal corridors', 'Lack of perimeter acoustic surveillance'];
    approaches = ['Canopy Acoustic Listening Nodes with Edge ML', 'Bio-Fencing & Early Warning Trip-Lines', 'Community Vernacular Alert App'];
    expertise = ['Acoustic Machine Learning', 'Wildlife Biology', 'Forestry Management', 'Hardware Weatherproofing'];
  }

  return {
    summary: `${input.title}: A recognized challenge in ${input.district || 'Jharkhand'} requiring focused multi-sector innovation.`,
    domain,
    subDomain,
    suggestedPriority: priority,
    priorityReason: reason,
    problemType,
    affectedStakeholders: stakeholders,
    possibleRootCauses: causes,
    suggestedApproach: approaches,
    requiredExpertise: expertise,
    estimatedImpactLevel: input.affectedPopulation && input.affectedPopulation > 5000 ? 'DISTRICT' : 'LOCAL',
    confidence: 0.88,
    needsHumanReview: priority === 'CRITICAL' || input.description.length < 50,
  };
}

/**
 * Node 1: Analyze Challenge (via OpenRouter ChatOpenAI with structured output or intelligent fallback)
 */
async function analyzeChallengeNode(state: typeof ChallengeAnalysisGraphState.State) {
  const input: ChallengeInput = {
    title: state.title,
    description: state.description,
    district: state.district,
    location: state.location,
    affectedPopulation: state.affectedPopulation,
  };

  if (!isOpenRouterConfigured()) {
    console.log('[AI LangGraph]: OpenRouter API key not detected or in mock mode. Executing deterministic intelligence node.');
    const fallbackAnalysis = generateDeterministicAnalysis(input);
    return {
      analysis: fallbackAnalysis,
      isMockFallback: true,
    };
  }

  try {
    const model = getOpenRouterModel({ temperature: 0.1 });
    const structuredModel = model.withStructuredOutput(ChallengeAnalysisSchema);

    const userPrompt = formatChallengeUserPrompt(input);
    const messages = [
      new SystemMessage(CHALLENGE_ANALYSIS_SYSTEM_PROMPT),
      new HumanMessage(userPrompt),
    ];

    const result = await structuredModel.invoke(messages);

    return {
      analysis: result as ChallengeAnalysis,
      isMockFallback: false,
    };
  } catch (error) {
    console.warn('[AI LangGraph]: OpenRouter execution error, using deterministic fallback:', error);
    const fallbackAnalysis = generateDeterministicAnalysis(input);
    return {
      analysis: fallbackAnalysis,
      isMockFallback: true,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Node 2: Validate Analysis
 */
async function validateAnalysisNode(state: typeof ChallengeAnalysisGraphState.State) {
  if (!state.analysis) {
    throw new Error('Analysis object was not produced by analysis node.');
  }

  // Strictly parse through Zod schema
  const parsed = ChallengeAnalysisSchema.parse(state.analysis);

  // Normalize confidence into [0, 1]
  parsed.confidence = Math.max(0, Math.min(1, parsed.confidence));

  return {
    analysis: parsed,
  };
}

/**
 * Node 3: Check Information Completeness & Safety Flags
 */
async function checkCompletenessNode(state: typeof ChallengeAnalysisGraphState.State) {
  if (!state.analysis) return {};

  const analysis = { ...state.analysis };
  const desc = (state.description || '').trim();

  // Flag for human review if input is scarce
  if (desc.length < 40) {
    analysis.needsHumanReview = true;
    analysis.confidence = Math.min(analysis.confidence, 0.6);
  }

  // Flag for human review if CRITICAL safety hazard
  if (analysis.suggestedPriority === 'CRITICAL') {
    analysis.needsHumanReview = true;
  }

  return {
    analysis,
  };
}

/**
 * Compile and export the LangGraph workflow.
 */
export function buildChallengeAnalysisGraph() {
  const workflow = new StateGraph(ChallengeAnalysisGraphState)
    .addNode('analyzeChallenge', analyzeChallengeNode)
    .addNode('validateAnalysis', validateAnalysisNode)
    .addNode('checkCompleteness', checkCompletenessNode)
    .addEdge(START, 'analyzeChallenge')
    .addEdge('analyzeChallenge', 'validateAnalysis')
    .addEdge('validateAnalysis', 'checkCompleteness')
    .addEdge('checkCompleteness', END);

  return workflow.compile();
}
