import type { Request } from 'express';

/**
 * Extended Express Request with JharSankalp-specific properties.
 */
export interface AppRequest extends Request {
  requestId?: string;
  userId?: string;
  userRole?: string;
  user?: {
    id: string;
    email: string;
    role: string;
    name?: string;
  };
}
