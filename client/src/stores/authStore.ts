import { create } from 'zustand';
import { UserRole } from '@jharsankalp/shared';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organizationId?: string;
  avatarUrl?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: AuthUser, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;

  // Demo: switch role for development
  setDemoRole: (role: UserRole) => void;
}

/**
 * Auth store using Zustand.
 * Phase 1: Stub with demo role switching for layout development.
 * Phase 2 will add real JWT auth.
 */
export const useAuthStore = create<AuthState>((set) => ({
  // Default to a demo citizen user for development
  user: {
    id: '10000000-0000-0000-0000-000000000001',
    email: 'citizen@demo.jharsankalp.in',
    name: 'Rajesh Kumar',
    role: UserRole.CITIZEN,
  },
  token: 'demo-token',
  isAuthenticated: true,
  isLoading: false,

  setUser: (user, token) => set({ user, token, isAuthenticated: true, isLoading: false }),

  logout: () => set({ user: null, token: null, isAuthenticated: false }),

  setLoading: (loading) => set({ isLoading: loading }),

  setDemoRole: (role) =>
    set((state) => ({
      user: state.user ? { ...state.user, role } : null,
    })),
}));
