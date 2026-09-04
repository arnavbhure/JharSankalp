import { create } from 'zustand';
import { UserRole } from '@jharsankalp/shared';
import { apiClient } from '../lib/apiClient';
import { toast } from './toastStore';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole | string;
  district?: string;
  phone?: string;
  organizationId?: string;
  avatarUrl?: string;
  isEmailVerified?: boolean;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  role?: string;
  district?: string;
  phone?: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthenticating: boolean;

  // Actions
  checkAuth: () => Promise<AuthUser | null>;
  login: (email: string, password: string) => Promise<{ requiresVerification?: boolean; email?: string }>;
  signup: (data: SignupData) => Promise<{ requiresVerification: boolean; email: string }>;
  verifyOtp: (email: string, otp: string) => Promise<AuthUser>;
  resendOtp: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
}

/**
 * Real Authentication Store backed by PostgreSQL & HttpOnly JWT Cookies.
 * Source of truth is the backend database.
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start in loading state while checking session
  isAuthenticating: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: Boolean(user),
      isLoading: false,
    }),

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const res = await apiClient.get<{ user: AuthUser }>('/auth/me');
      if (res && res.user) {
        set({ user: res.user, isAuthenticated: true, isLoading: false });
        return res.user;
      }
      set({ user: null, isAuthenticated: false, isLoading: false });
      return null;
    } catch {
      // 401 or network failure — user is not authenticated
      set({ user: null, isAuthenticated: false, isLoading: false });
      return null;
    }
  },

  login: async (email: string, password: string) => {
    set({ isAuthenticating: true });
    try {
      const res = await apiClient.post<{
        user?: AuthUser;
        requiresVerification?: boolean;
        email?: string;
        message?: string;
      }>('/auth/login', { email, password });

      if (res.requiresVerification) {
        set({ isAuthenticating: false });
        return { requiresVerification: true, email: res.email || email };
      }

      if (res.user) {
        set({ user: res.user, isAuthenticated: true, isAuthenticating: false });
        toast.success(`Welcome back, ${res.user.name || 'Innovator'}!`);
        return {};
      }

      set({ isAuthenticating: false });
      return {};
    } catch (error: any) {
      set({ isAuthenticating: false });
      const msg = error.formattedMessage || 'Failed to sign in. Please verify your credentials.';
      toast.error(msg);
      throw error;
    }
  },

  signup: async (data: SignupData) => {
    set({ isAuthenticating: true });
    try {
      const res = await apiClient.post<{
        requiresVerification: boolean;
        email: string;
        message?: string;
      }>('/auth/signup', data);

      set({ isAuthenticating: false });
      toast.info('Verification code dispatched to your email.');
      return res;
    } catch (error: any) {
      set({ isAuthenticating: false });
      const msg = error.formattedMessage || 'Registration failed. Please check your details.';
      toast.error(msg);
      throw error;
    }
  },

  verifyOtp: async (email: string, otp: string) => {
    set({ isAuthenticating: true });
    try {
      const res = await apiClient.post<{
        user: AuthUser;
        message?: string;
      }>('/auth/verify-otp', { email, otp });

      set({ user: res.user, isAuthenticated: true, isAuthenticating: false });
      toast.success(res.message || 'Email verified successfully! Welcome to JharSankalp.');
      return res.user;
    } catch (error: any) {
      set({ isAuthenticating: false });
      const msg = error.formattedMessage || 'Invalid or expired verification code.';
      toast.error(msg);
      throw error;
    }
  },

  resendOtp: async (email: string) => {
    try {
      await apiClient.post<{ message?: string }>('/auth/resend-otp', { email });
      toast.info('A fresh 6-digit verification code has been sent.');
    } catch (error: any) {
      const msg = error.formattedMessage || 'Failed to resend code. Please try again.';
      toast.error(msg);
      throw error;
    }
  },

  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore network errors on logout
    } finally {
      set({ user: null, isAuthenticated: false, isLoading: false });
      toast.info('Signed out successfully.');
    }
  },
}));
