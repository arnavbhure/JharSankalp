import type { ApiResponse } from '@jharsankalp/shared';
import { useAuthStore } from '../stores/authStore';

const API_BASE = '/api/v1';

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

/**
 * Typed API client with auth headers and error handling.
 */
async function request<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { skipAuth, ...fetchOptions } = options;
  const token = useAuthStore.getState().token;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (!skipAuth && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
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
