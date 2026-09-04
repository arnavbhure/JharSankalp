import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';

/**
 * Resolves the backend base URL from environment variables.
 * VITE_BACKEND_URL is the single source of truth for the Express backend.
 */
export function getBackendBaseUrl(): string {
  const raw = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL;

  if (raw && typeof raw === 'string' && raw.trim().length > 0) {
    let clean = raw.trim().replace(/\/+$/, '');
    if (clean.endsWith('/api/v1')) {
      return clean;
    }
    if (clean.endsWith('/api')) {
      return `${clean}/v1`;
    }
    return `${clean}/api/v1`;
  }

  // Startup validation
  if (import.meta.env.PROD) {
    console.error(
      '[JharSankalp Configuration Error]: Missing VITE_BACKEND_URL environment variable! ' +
        'In production, the frontend on Vercel must communicate with the Express backend on Render. ' +
        'Please set VITE_BACKEND_URL in your Vercel Project Settings (e.g. https://<your-render-app>.onrender.com).',
    );
  } else {
    console.info(
      '[JharSankalp API Client]: VITE_BACKEND_URL not set in development, defaulting to http://localhost:4000/api/v1',
    );
  }

  return 'http://localhost:4000/api/v1';
}

export const BACKEND_BASE_URL = getBackendBaseUrl();

/**
 * Normalizes request endpoints to prevent duplicate /api or /api/v1 prefixes
 * and ensure clean paths.
 */
export function normalizeEndpoint(url: string): string {
  if (!url) return '';
  let clean = url.trim();

  // If already absolute URL, don't modify
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean;
  }

  if (!clean.startsWith('/')) {
    clean = `/${clean}`;
  }

  // Strip duplicate /api/v1 or /api prefix if present because baseURL already mounts /api/v1
  if (clean.startsWith('/api/v1/')) {
    clean = clean.slice('/api/v1'.length);
  } else if (clean === '/api/v1') {
    clean = '/';
  } else if (clean.startsWith('/api/')) {
    clean = clean.slice('/api'.length);
  } else if (clean === '/api') {
    clean = '/';
  }

  return clean;
}

/**
 * Centralized Axios instance with HttpOnly cookie support and credentials enabled.
 */
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  withCredentials: true, // Essential for HttpOnly JWT session cookie authentication across origins
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 30000,
});

// Response interceptor: formats error messages and avoids 401 redirect loops
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<any>) => {
    const status = error.response?.status;
    const responseData = error.response?.data;

    let message = 'An unexpected error occurred. Please try again.';

    if (responseData) {
      if (typeof responseData.error === 'object' && responseData.error?.message) {
        message = responseData.error.message;
      } else if (typeof responseData.message === 'string') {
        message = responseData.message;
      } else if (typeof responseData.error === 'string') {
        message = responseData.error;
      }
    } else if (error.message) {
      message = error.message;
    }

    (error as any).formattedMessage = message;

    // 401 handling: We do NOT force a hard window.location redirect here,
    // which would trigger infinite redirect loops for guest users on public pages.
    // Callers and authStore receive the rejected promise with formattedMessage.
    if (status === 401) {
      // Session expired or unauthenticated
    }

    return Promise.reject(error);
  },
);

function unwrapPayload<T>(response: AxiosResponse): T {
  const body = response.data;
  if (body && typeof body === 'object' && 'data' in body && body.success === true) {
    return body.data as T;
  }
  if (body && typeof body === 'object' && 'data' in body && !('success' in body)) {
    return body.data as T;
  }
  return body as T;
}

export interface FetchOptions extends AxiosRequestConfig {
  skipAuth?: boolean;
}

/**
 * Centralized typed API client for JharSankalp.
 * All backend API requests route through this instance using VITE_BACKEND_URL.
 */
export const api = {
  axios: axiosInstance,

  get: async <T = any>(endpoint: string, options?: FetchOptions): Promise<T> => {
    const response = await axiosInstance.get(normalizeEndpoint(endpoint), options);
    return unwrapPayload<T>(response);
  },

  post: async <T = any>(endpoint: string, data?: unknown, options?: FetchOptions): Promise<T> => {
    const response = await axiosInstance.post(normalizeEndpoint(endpoint), data, options);
    return unwrapPayload<T>(response);
  },

  patch: async <T = any>(endpoint: string, data?: unknown, options?: FetchOptions): Promise<T> => {
    const response = await axiosInstance.patch(normalizeEndpoint(endpoint), data, options);
    return unwrapPayload<T>(response);
  },

  put: async <T = any>(endpoint: string, data?: unknown, options?: FetchOptions): Promise<T> => {
    const response = await axiosInstance.put(normalizeEndpoint(endpoint), data, options);
    return unwrapPayload<T>(response);
  },

  delete: async <T = any>(endpoint: string, options?: FetchOptions): Promise<T> => {
    const response = await axiosInstance.delete(normalizeEndpoint(endpoint), options);
    return unwrapPayload<T>(response);
  },
};

export const apiClient = api;
export default api;
