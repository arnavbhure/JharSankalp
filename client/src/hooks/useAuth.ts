import { useAuthStore } from '../stores/authStore';
import { UserRole } from '@jharsankalp/shared';

/**
 * Auth convenience hook.
 * Phase 1: Returns demo user state.
 * Phase 2: Will integrate with real auth flow.
 */
export function useAuth() {
  const { user, token, isAuthenticated, isLoading, logout, setDemoRole } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    logout,
    setDemoRole,

    // Role check helpers
    isCitizen: user?.role === UserRole.CITIZEN,
    isGovernment:
      user?.role === UserRole.GOVERNMENT_OFFICER ||
      user?.role === UserRole.DISTRICT_OFFICER ||
      user?.role === UserRole.STATE_ADMIN,
    isUniversity:
      user?.role === UserRole.UNIVERSITY_ADMIN ||
      user?.role === UserRole.FACULTY ||
      user?.role === UserRole.STUDENT,
    isIndustry:
      user?.role === UserRole.INDUSTRY ||
      user?.role === UserRole.STARTUP ||
      user?.role === UserRole.MSME,
    isAdmin: user?.role === UserRole.SUPER_ADMIN,
  };
}
