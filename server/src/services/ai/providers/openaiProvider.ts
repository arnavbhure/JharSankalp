import {
  AnalyzeChallengeInput,
  AnalyzeChallengeResult,
  analyzeChallengeMock,
} from './mockProvider.js';

/**
 * OpenAI / OpenRouter AI Provider.
 * If credentials are configured, can call LLM. Otherwise delegates gracefully to mock provider.
 */
export async function analyzeChallengeOpenAI(
  input: AnalyzeChallengeInput,
): Promise<AnalyzeChallengeResult> {
  const apiKey = process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return analyzeChallengeMock(input);
  }

  try {
    // If external key exists, we can call the OpenRouter/OpenAI endpoint
    const endpoint = process.env.OPENROUTER_API_KEY
      ? 'https://openrouter.ai/api/v1/chat/completions'
      : 'https://api.openai.com/v1/chat/completions';

    const systemPrompt = `You are the JharSankalp Civic Intelligence Engine for the State of Jharkhand, India.
Analyze this civic challenge submitted by a citizen. Return a valid JSON object ONLY with the following structure:
{
  "summary": "Crisp 1-2 sentence problem summary",
  "suggestedDomain": "One of: Water Management, Agriculture, Education, Healthcare, Environment, Mining Safety, Accessibility, Rural Livelihood, Urban Development, Public Services",
  "suggestedSubcategory": "Specific category (e.g. Rural Water Infrastructure)",
  "suggestedPriority": "LOW, MEDIUM, HIGH, or CRITICAL",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "potentialImpactAreas": ["impact1", "impact2", "impact3"],
  "suggestedStakeholders": ["stakeholder1", "stakeholder2", "stakeholder3"],
  "confidence": 0.92
}`;

    const userPrompt = `Title: ${input.title}
Description: ${input.description}
District: ${input.district || 'Jharkhand'}
Affected Population: ${input.affectedPopulation || 500}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        ...(process.env.OPENROUTER_API_KEY
          ? {
              'HTTP-Referer': 'https://jharsankalp.jharkhand.gov.in',
              'X-Title': 'JharSankalp Platform',
            }
          : {}),
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_API_KEY ? 'google/gemini-2.5-flash' : 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      console.warn(
        `External AI provider returned ${response.status}, using deterministic fallback.`,
      );
      return analyzeChallengeMock(input);
    }

    const data = (await response.json()) as any;
    const content = data?.choices?.[0]?.message?.content;
    if (content) {
      const parsed = JSON.parse(content);
      return {
        summary: parsed.summary,
        suggestedDomain: parsed.suggestedDomain,
        suggestedSubcategory: parsed.suggestedSubcategory,
        suggestedPriority: parsed.suggestedPriority,
        keywords: parsed.keywords || [],
        potentialImpactAreas: parsed.potentialImpactAreas || [],
        suggestedStakeholders: parsed.suggestedStakeholders || [],
        confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.92,
        // Compatibility
        domain: parsed.suggestedDomain,
        subDomain: parsed.suggestedSubcategory,
        priorityReason: parsed.summary,
        suggestedApproach: parsed.potentialImpactAreas,
        requiredExpertise: parsed.keywords,
        needsHumanReview: parsed.suggestedPriority === 'CRITICAL',
      };
    }
  } catch (error) {
    console.warn('External AI call failed, falling back to mockProvider:', error);
  }

  return analyzeChallengeMock(input);
}
