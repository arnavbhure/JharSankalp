import { useAuthStore } from '../stores/authStore';
import { UserRole } from '@jharsankalp/shared';

/**
 * Auth convenience hook for components.
 * Provides current user state and robust role check utilities.
 */
export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    isAuthenticating,
    login,
    signup,
    verifyOtp,
    resendOtp,
    logout,
    checkAuth,
  } = useAuthStore();

  const role = user?.role ? String(user.role).toUpperCase() : '';

  const isCitizen =
    role === UserRole.CITIZEN ||
    role === UserRole.COMMUNITY ||
    role === 'CITIZEN';

  const isGovernment =
    role === UserRole.GOVERNMENT_OFFICER ||
    role === UserRole.DISTRICT_OFFICER ||
    role === UserRole.STATE_ADMIN ||
    role === UserRole.SUPER_ADMIN ||
    role === 'GOVERNMENT' ||
    role === 'ADMIN';

  const isUniversity =
    role === UserRole.UNIVERSITY_ADMIN ||
    role === UserRole.FACULTY ||
    role === UserRole.STUDENT ||
    role === 'UNIVERSITY';

  const isIndustry =
    role === UserRole.INDUSTRY ||
    role === UserRole.STARTUP ||
    role === UserRole.MSME ||
    role === UserRole.CSR ||
    role === 'INDUSTRY';

  const isAdmin = role === UserRole.SUPER_ADMIN || role === 'SUPER_ADMIN' || role === 'ADMIN';

  return {
    user,
    isAuthenticated,
    isLoading,
    isAuthenticating,
    login,
    signup,
    verifyOtp,
    resendOtp,
    logout,
    checkAuth,

    // Role check helpers
    isCitizen,
    isGovernment,
    isUniversity,
    isIndustry,
    isAdmin,
  };
}
