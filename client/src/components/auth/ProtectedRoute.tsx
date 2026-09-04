import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Skeleton } from '../ui/Skeleton';
import { toast } from '../../stores/toastStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  portalName?: string;
}

export function ProtectedRoute({
  children,
  allowedRoles,
  portalName = 'this section',
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show full-page layout skeleton during initial auth restoration
  if (isLoading) {
    return (
      <div className="min-h-[70vh] max-w-7xl mx-auto p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-28 rounded-lg" />
          <Skeleton className="h-28 rounded-lg" />
          <Skeleton className="h-28 rounded-lg" />
          <Skeleton className="h-28 rounded-lg" />
        </div>
        <Skeleton className="h-96 rounded-lg" />
      </div>
    );
  }

  // Not signed in -> redirect to login with saved return path
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role permissions if specified
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = (user.role || '').toUpperCase();
    const isAllowed =
      userRole === 'SUPER_ADMIN' ||
      userRole === 'ADMIN' ||
      allowedRoles.some((r) => r.toUpperCase() === userRole);

    if (!isAllowed) {
      toast.warning(
        `Access restricted: your account (${user.role}) does not have permission to access ${portalName}.`,
      );

      // Redirect to user's authorized dashboard
      if (userRole.includes('GOV') || userRole.includes('OFFICER') || userRole.includes('STATE')) {
        return <Navigate to="/government/dashboard" replace />;
      }
      if (userRole.includes('UNI') || userRole.includes('FACULTY') || userRole.includes('STUDENT')) {
        return <Navigate to="/university/dashboard" replace />;
      }
      if (userRole.includes('IND') || userRole.includes('STARTUP') || userRole.includes('MSME')) {
        return <Navigate to="/industry/dashboard" replace />;
      }
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
