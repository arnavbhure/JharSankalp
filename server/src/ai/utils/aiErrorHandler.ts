import { Response, Request } from 'express';
import { sendError } from '../../utils/response.js';

export interface AiServiceError {
  code: string;
  message: string;
  statusCode: number;
}

export function handleAiError(error: any, res: Response, req: Request): void {
  console.error('[AI Service Error]:', error);

  const rawMessage = error?.message || '';

  // 1. Missing API Key
  if (rawMessage.includes('API key') || rawMessage.includes('apiKey') || rawMessage.includes('401')) {
    sendError(
      res,
      503,
      'AI_AUTHENTICATION_ERROR',
      'AI service authentication is currently unavailable. Please verify the server OPENROUTER_API_KEY.',
      undefined,
      req
    );
    return;
  }

  // 2. Rate Limits
  if (rawMessage.includes('429') || rawMessage.includes('rate limit') || rawMessage.includes('quota')) {
    sendError(
      res,
      429,
      'AI_RATE_LIMITED',
      'The AI analysis service is experiencing high traffic. Please wait a moment and retry.',
      undefined,
      req
    );
    return;
  }

  // 3. Timeout
  if (rawMessage.includes('timeout') || rawMessage.includes('ETIMEDOUT') || rawMessage.includes('ECONNRESET')) {
    sendError(
      res,
      504,
      'AI_TIMEOUT',
      'AI intelligence analysis timed out. Please try again with a shorter description.',
      undefined,
      req
    );
    return;
  }

  // 4. Structured Output Validation Error
  if (rawMessage.includes('validation') || rawMessage.includes('schema') || rawMessage.includes('ZodError')) {
    sendError(
      res,
      502,
      'AI_OUTPUT_VALIDATION_FAILED',
      'AI generated an invalid structured analysis format. Please retry.',
      undefined,
      req
    );
    return;
  }

  // Generic fallback
  sendError(
    res,
    500,
    'AI_ANALYSIS_FAILED',
    'AI challenge analysis is temporarily unavailable.',
    undefined,
    req
  );
}
