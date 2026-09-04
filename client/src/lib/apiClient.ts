import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

/**
 * Centralized Axios client for JharSankalp.
 * Automatically transmits HttpOnly session cookies (withCredentials: true)
 * and unwraps standardized ApiResponse payloads.
 */
const baseURL = import.meta.env.VITE_API_URL || '/api/v1';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Essential for HttpOnly JWT cookies
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 20000,
});

// Response interceptor: automatically unwraps `data` envelope and handles error contracts
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const responseData = error.response?.data;

    let message = 'An unexpected error occurred. Please try again.';

    if (responseData) {
      if (responseData.error?.message) {
        message = responseData.error.message;
      } else if (responseData.message) {
        message = responseData.message;
      }
    } else if (error.message) {
      message = error.message;
    }

    // 401: Session expired or unauthenticated
    if (status === 401) {
      // If unauthorized on protected routes, caller or authStore will handle state redirect
    }

    // Attach human-readable message to error object
    error.formattedMessage = message;
    return Promise.reject(error);
  },
);

export const apiClient = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.get(url, config);
    // Unpack ApiSuccessResponse { success: true, data: T } if present
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data.data as T;
    }
    return response.data as T;
  },

  post: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.post(url, data, config);
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data.data as T;
    }
    return response.data as T;
  },

  patch: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.patch(url, data, config);
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data.data as T;
    }
    return response.data as T;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.delete(url, config);
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data.data as T;
    }
    return response.data as T;
  },
};

export default apiClient;
