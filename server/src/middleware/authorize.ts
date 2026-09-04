import type { Response, NextFunction } from 'express';
import { errors } from './errorHandler.js';
import type { AppRequest } from '../types/request.js';

export const RoleGroups = {
  GOVERNMENT: [
    'GOVERNMENT_OFFICER',
    'DISTRICT_OFFICER',
    'STATE_ADMIN',
    'SUPER_ADMIN',
    'GOVERNMENT',
  ],
  UNIVERSITY: [
    'UNIVERSITY_ADMIN',
    'FACULTY',
    'STUDENT',
    'UNIVERSITY',
  ],
  INDUSTRY: [
    'INDUSTRY',
    'STARTUP',
    'MSME',
    'CSR',
  ],
  CITIZEN: [
    'CITIZEN',
    'COMMUNITY',
  ],
};

/**
 * Middleware: Enforces that the authenticated user possesses one of the required roles or role groups.
 */
export function requireRole(...allowedRolesOrGroups: (string | string[])[]) {
  const allowedRoles = new Set<string>();

  for (const item of allowedRolesOrGroups) {
    if (Array.isArray(item)) {
      item.forEach((r) => allowedRoles.add(r.toUpperCase()));
    } else if (item in RoleGroups) {
      RoleGroups[item as keyof typeof RoleGroups].forEach((r) => allowedRoles.add(r.toUpperCase()));
    } else {
      allowedRoles.add(item.toUpperCase());
    }
  }

  return (req: AppRequest, _res: Response, next: NextFunction): void => {
    if (!req.userRole) {
      return next(errors.unauthorized('Authentication required.'));
    }

    const currentRole = req.userRole.toUpperCase();

    // SUPER_ADMIN has universal access
    if (currentRole === 'SUPER_ADMIN') {
      return next();
    }

    if (!allowedRoles.has(currentRole)) {
      return next(
        errors.forbidden(
          `Access restricted: your current role (${req.userRole}) does not have permission to access this portal or resource.`,
        ),
      );
    }

    next();
  };
}
