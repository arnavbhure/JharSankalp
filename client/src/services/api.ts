import type { ApiResponse } from '@jharsankalp/shared';

const API_BASE = '/api/v1';

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

/**
 * Typed API client with auth headers and error handling.
 */
async function request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { skipAuth: _skipAuth, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    credentials: 'include',
    ...fetchOptions,
    headers,
  });

  const json: ApiResponse<T> = await response.json();

  if (!json.success) {
    const error = new Error(json.error.message);
    (error as unknown as Record<string, unknown>).code = json.error.code;
    (error as unknown as Record<string, unknown>).details = json.error.details;
    (error as unknown as Record<string, unknown>).status = response.status;
    throw error;
  }

  return json.data;
}

export const api = {
  get: <T>(endpoint: string, options?: FetchOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, options?: FetchOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: FetchOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, options?: FetchOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};
