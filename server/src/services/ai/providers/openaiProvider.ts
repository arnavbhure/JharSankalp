import {
  AnalyzeChallengeInput,
  AnalyzeChallengeResult,
  analyzeChallengeMock,
} from './mockProvider.js';

/**
 * Extracts and parses JSON from raw LLM output, handling markdown code fences
 * and any preamble/trailing text safely.
 */
function extractJSON(text: string): any {
  if (!text || typeof text !== 'string') {
    return null;
  }

  let cleaned = text.trim();

  // Strip markdown code fences if present (```json ... ``` or ``` ...)
  const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenceMatch) {
    cleaned = fenceMatch[1].trim();
  } else {
    // Strip leading ```json or trailing ```
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
  }

  // Find outermost JSON object
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(cleaned);
    } catch {
      try {
        // Attempt minor repair: remove trailing commas before } or ] and normalize quotes
        const repaired = cleaned
          .replace(/,\s*([}\]])/g, '$1')
          .replace(/[\u201C\u201D]/g, '"');
        return JSON.parse(repaired);
      } catch {
        return null;
      }
    }
  }

  return null;
}

/**
 * Real AI Provider integrating with OpenRouter / OpenAI.
 * Reads OPENROUTER_API_KEY, OPENROUTER_MODEL, OPENROUTER_BASE_URL.
 * Returns strictly structured dynamic challenge intelligence.
 */
export async function analyzeChallengeOpenAI(
  input: AnalyzeChallengeInput,
): Promise<AnalyzeChallengeResult> {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.warn('No OPENROUTER_API_KEY or OPENAI_API_KEY configured. Using deterministic mock.');
    return analyzeChallengeMock(input);
  }

  try {
    const rawBaseUrl = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
    const baseUrl = rawBaseUrl.replace(/\/+$/, '');
    const endpoint = `${baseUrl}/chat/completions`;

    const model =
      process.env.OPENROUTER_MODEL ||
      (process.env.OPENROUTER_API_KEY ? 'openrouter/free' : 'gpt-4o-mini');

    const systemPrompt = `You are an AI assistant for JharSankalp, a civic innovation platform for Jharkhand, India.
Analyze the citizen's submitted problem based strictly on the provided information.
Do not assume the problem belongs to Water Management or any specific domain unless the input actually indicates that.
Determine the most relevant domain, severity, impact, innovation opportunities and suitable technologies.
Return ONLY valid JSON matching the requested schema. Do not include markdown code fences or explanatory text.
Keep all string values strictly concise (1-2 sentences each). Limit innovationDirections, technologies, and keywords to at most 3 items each.

Expected JSON Structure:
{
  "summary": "Crisp 1-2 sentence problem summary based strictly on the actual problem",
  "suggestedDomain": "Accurate domain inferred from problem (e.g. Infrastructure, Healthcare, Environment, Agriculture, Education, Mining Safety, Technology & Ethics, Public Services, Urban Development)",
  "suggestedSubdomain": "Specific sub-category (e.g. Road Safety & Potholes, Rural Health Infrastructure, Forest Conservation & Waste)",
  "priority": "Low | Medium | High | Critical",
  "priorityReason": "1-2 sentence justification for this priority level",
  "impactAssessment": "1-2 sentence assessment of community impact and affected residents",
  "reviewRecommendation": "1-2 sentence recommendation for the district innovation review board",
  "innovationDirections": ["direction 1", "direction 2", "direction 3"],
  "technologies": ["technology 1", "technology 2", "technology 3"],
  "keywords": ["keyword 1", "keyword 2", "keyword 3"]
}`;

    const userPrompt = `Problem Title: ${input.title || 'Civic Problem'}
Problem Description: ${input.description}
Location/District: ${input.district || 'Jharkhand'}
Affected Population: ${input.affectedPopulation || 'Not specified'}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://jharsankalp.jharkhand.gov.in',
        'X-Title': 'JharSankalp Civic Innovation Platform',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.1,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      console.error(`External AI provider returned HTTP ${response.status}:`, errText);
      throw new Error(`AI analysis provider returned HTTP ${response.status}`);
    }

    const data = (await response.json()) as any;
    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('AI provider returned empty content');
    }

    const parsed = extractJSON(content);

    if (!parsed) {
      // If provider returned unparseable text (e.g. moderation notice or text explanation),
      // synthesize a structured response directly from the citizen's actual input.
      // NEVER fall back to Water Management!
      const fullText = `${input.title} ${input.description}`.toLowerCase();
      const isTech =
        /ai|artificial intelligence|robot|cyber|tech|algorithm|software|world takeover/i.test(
          fullText,
        );
      const isRoad = /road|pothole|bridge|traffic|highway|accident|transport/i.test(fullText);
      const isHealth = /doctor|hospital|medicine|clinic|health|nurse|medical/i.test(fullText);
      const isEnv = /forest|pollution|dumping|waste|garbage|tree|ecology/i.test(fullText);

      const domain = isTech
        ? 'Technology & Ethics'
        : isRoad
          ? 'Infrastructure'
          : isHealth
            ? 'Healthcare'
            : isEnv
              ? 'Environment'
              : 'General';

      const subdomain = isTech
        ? 'AI Ethics & Public Discourse'
        : isRoad
          ? 'Road Safety & Transportation'
          : isHealth
            ? 'Rural Healthcare Access'
            : isEnv
              ? 'Waste Management & Conservation'
              : 'Civic Assessment';

      const normPriority: 'Low' | 'Medium' | 'High' | 'Critical' = isTech ? 'Low' : 'Medium';

      return {
        summary: `${input.title.trim()}: Analyzed based on submitted citizen description.`,
        suggestedDomain: domain,
        suggestedSubdomain: subdomain,
        priority: normPriority,
        priorityReason: isTech
          ? 'Abstract or conceptual submission requiring localized civic scoping in Jharkhand.'
          : 'Community concern identified from citizen report for district administrative verification.',
        impactAssessment: 'Local impact to be reviewed by the district innovation review board.',
        reviewRecommendation:
          'Review submitted problem statement with citizen to determine local scope and actionability.',
        innovationDirections: [
          'Stakeholder Consultation & Needs Scoping',
          'Civic Problem Contextualization',
        ],
        technologies: ['Public Administration', 'Domain Assessment'],
        keywords: [domain, subdomain, 'Civic Feedback'],
        suggestedCategory: domain,
        suggestedSubcategory: subdomain,
        domain,
        subDomain: subdomain,
        suggestedPriority: (normPriority.toUpperCase() as 'LOW' | 'MEDIUM') || 'MEDIUM',
        analysisSummary: `${input.title.trim()}: Analyzed based on submitted citizen description.`,
        potentialImpactAreas: ['Local public interest and citizen concern'],
        suggestedStakeholders: [`${domain} Department`],
        suggestedApproach: ['Stakeholder Consultation', 'Field Verification'],
        requiredExpertise: ['Domain Assessment'],
        confidence: 0.85,
        needsHumanReview: true,
      };
    }

    const rawPriority = String(
      parsed.priority || parsed.severity || parsed.suggestedPriority || 'Medium',
    ).trim();
    let normalizedPriority: 'Low' | 'Medium' | 'High' | 'Critical' = 'Medium';
    if (/critical/i.test(rawPriority)) normalizedPriority = 'Critical';
    else if (/high/i.test(rawPriority)) normalizedPriority = 'High';
    else if (/low/i.test(rawPriority)) normalizedPriority = 'Low';
    else normalizedPriority = 'Medium';

    const upperPriority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' =
      normalizedPriority === 'Critical'
        ? 'CRITICAL'
        : normalizedPriority === 'High'
          ? 'HIGH'
          : normalizedPriority === 'Low'
            ? 'LOW'
            : 'MEDIUM';

    const summary = String(
      parsed.summary || parsed.problem_summary || parsed.problem_title || input.title,
    ).trim();
    const suggestedDomain = String(
      parsed.suggestedDomain || parsed.suggested_domain || parsed.domain || 'General',
    ).trim();
    const suggestedSubdomain = String(
      parsed.suggestedSubdomain ||
        parsed.suggested_subdomain ||
        parsed.subDomain ||
        parsed.sub_domain ||
        parsed.suggestedSubcategory ||
        'Civic Issue',
    ).trim();
    const priorityReason = String(
      parsed.priorityReason || parsed.priority_reason || parsed.reason || summary,
    ).trim();
    const impactAssessment = String(
      parsed.impactAssessment ||
        parsed.impact_assessment ||
        parsed.impact ||
        'Community impact to be evaluated by district team.',
    ).trim();
    const reviewRecommendation = String(
      parsed.reviewRecommendation ||
        parsed.review_recommendation ||
        parsed.recommendation ||
        'Forward to relevant domain board for priority review.',
    ).trim();

    const innovationDirections: string[] =
      Array.isArray(parsed.innovationDirections) && parsed.innovationDirections.length > 0
        ? parsed.innovationDirections.map((x: any) => String(x).trim())
        : Array.isArray(parsed.innovation_directions) && parsed.innovation_directions.length > 0
          ? parsed.innovation_directions.map((x: any) => String(x).trim())
          : Array.isArray(parsed.innovation_opportunities) &&
              parsed.innovation_opportunities.length > 0
            ? parsed.innovation_opportunities.map((x: any) => String(x).trim())
            : Array.isArray(parsed.suggestedApproach) && parsed.suggestedApproach.length > 0
              ? parsed.suggestedApproach.map((x: any) => String(x).trim())
              : ['Field Inspection & Assessment', 'Stakeholder Review'];

    const technologies: string[] =
      Array.isArray(parsed.technologies) && parsed.technologies.length > 0
        ? parsed.technologies.map((x: any) => String(x).trim())
        : Array.isArray(parsed.suitable_technologies) && parsed.suitable_technologies.length > 0
          ? parsed.suitable_technologies.map((x: any) => String(x).trim())
          : Array.isArray(parsed.requiredExpertise) && parsed.requiredExpertise.length > 0
            ? parsed.requiredExpertise.map((x: any) => String(x).trim())
            : ['Domain Expertise', 'Public Administration'];

    const keywords: string[] =
      Array.isArray(parsed.keywords) && parsed.keywords.length > 0
        ? parsed.keywords.map((x: any) => String(x).trim())
        : Array.isArray(parsed.tags) && parsed.tags.length > 0
          ? parsed.tags.map((x: any) => String(x).trim())
          : [suggestedDomain, suggestedSubdomain];

    return {
      summary,
      suggestedDomain,
      suggestedSubdomain,
      priority: normalizedPriority,
      priorityReason,
      impactAssessment,
      reviewRecommendation,
      innovationDirections,
      technologies,
      keywords,

      // Compatibility fields for existing UI components
      suggestedCategory: suggestedDomain,
      suggestedSubcategory: suggestedSubdomain,
      domain: suggestedDomain,
      subDomain: suggestedSubdomain,
      suggestedPriority: upperPriority,
      analysisSummary: summary,
      potentialImpactAreas: [impactAssessment],
      suggestedStakeholders: Array.isArray(parsed.suggestedStakeholders)
        ? parsed.suggestedStakeholders
        : [`${suggestedDomain} Department`],
      suggestedApproach: innovationDirections,
      requiredExpertise: technologies,
      confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.92,
      needsHumanReview: normalizedPriority === 'Critical' || normalizedPriority === 'High',
    };
  } catch (error: any) {
    console.error('External AI call failed:', error?.message || error);
    throw error;
  }
}
