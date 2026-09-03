import { ChatOpenAI } from '@langchain/openai';
import { env } from '../../config/env.js';

/**
 * Returns true if a valid OpenRouter or AI API key is configured.
 */
export function isOpenRouterConfigured(): boolean {
  const key = env.OPENROUTER_API_KEY || env.AI_API_KEY;
  return Boolean(key && key.trim().length > 0 && !key.includes('placeholder'));
}

/**
 * Creates and returns a configured ChatOpenAI model targeting OpenRouter.
 */
export function getOpenRouterModel(options?: { temperature?: number; model?: string }): ChatOpenAI {
  const apiKey = env.OPENROUTER_API_KEY || env.AI_API_KEY || 'no-key-provided';
  const modelName = options?.model || env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-001';

  return new ChatOpenAI({
    model: modelName,
    apiKey,
    temperature: options?.temperature ?? 0.2,
    maxRetries: 2,
    timeout: 25000,
    configuration: {
      baseURL: env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': 'https://jharsankalp.jharkhand.gov.in',
        'X-Title': 'JharSankalp Civic Innovation Platform',
      },
    },
  });
}
