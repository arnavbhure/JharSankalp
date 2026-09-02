import type { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

/**
 * Attaches a unique requestId to every incoming request.
 * Useful for tracing errors, audit logs, and API responses.
 */
export function requestIdMiddleware(req: Request, _res: Response, next: NextFunction): void {
  (req as unknown as Record<string, unknown>).requestId =
    (req.headers['x-request-id'] as string) || uuidv4();
  next();
}
