import type { ApiErrorResponse } from '@jharsankalp/shared';
import type { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.js';

// ── Custom Application Error ─────────────────────────────────

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: Record<string, unknown>;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number,
    code: string,
    details?: Record<string, unknown>,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// ── Common Error Factories ───────────────────────────────────

export const errors = {
  notFound: (entity: string, id?: string) =>
    new AppError(
      id ? `${entity} with id '${id}' not found` : `${entity} not found`,
      404,
      `${entity.toUpperCase().replace(/\s/g, '_')}_NOT_FOUND`,
    ),

  unauthorized: (message = 'Authentication required') => new AppError(message, 401, 'UNAUTHORIZED'),

  forbidden: (message = 'You do not have permission to perform this action') =>
    new AppError(message, 403, 'FORBIDDEN'),

  validation: (message: string, details?: Record<string, unknown>) =>
    new AppError(message, 400, 'VALIDATION_ERROR', details),

  conflict: (message: string) => new AppError(message, 409, 'CONFLICT'),

  businessRule: (message: string, code: string) => new AppError(message, 422, code),

  rateLimit: () => new AppError('Too many requests, please try again later', 429, 'RATE_LIMITED'),

  internal: (message = 'An unexpected error occurred') =>
    new AppError(message, 500, 'INTERNAL_ERROR'),

  serviceUnavailable: (service: string) =>
    new AppError(`${service} is currently unavailable`, 503, 'SERVICE_UNAVAILABLE'),
};

// ── Helper to get requestId from req ────────────────────────

function getRequestId(req: Request): string | undefined {
  return (req as unknown as Record<string, unknown>).requestId as string | undefined;
}

// ── Global Error Handler Middleware ──────────────────────────

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
  const requestId = getRequestId(req);

  if (err instanceof AppError) {
    const response: ApiErrorResponse = {
      success: false,
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
      },
      requestId,
    };
    res.status(err.statusCode).json(response);
    return;
  }

  // Intercept Prisma database errors to prevent internal schema disclosure
  const errCode = (err as any).code;
  if (typeof errCode === 'string' && errCode.startsWith('P2')) {
    if (errCode === 'P2002') {
      res.status(409).json({
        success: false,
        error: {
          code: 'CONFLICT',
          message: 'A record with matching unique details already exists.',
        },
        requestId,
      });
      return;
    }

    if (errCode === 'P2025') {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'The requested record was not found or has been removed.',
        },
        requestId,
      });
      return;
    }

    if (errCode === 'P2003') {
      res.status(400).json({
        success: false,
        error: {
          code: 'FOREIGN_KEY_VIOLATION',
          message: 'Referenced related record does not exist.',
        },
        requestId,
      });
      return;
    }
  }

  // Log unexpected errors securely
  console.error('Unhandled error:', {
    name: err.name,
    message: err.message,
    stack: env.NODE_ENV === 'development' ? err.stack : undefined,
    requestId,
    path: req.path,
    method: req.method,
  });

  const response: ApiErrorResponse = {
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message:
        env.NODE_ENV === 'production'
          ? 'An unexpected server error occurred. Please try again later.'
          : err.message,
    },
    requestId,
  };

  res.status(500).json(response);
}

// ── 404 Handler ──────────────────────────────────────────────

export function notFoundHandler(req: Request, res: Response): void {
  const requestId = getRequestId(req);

  const response: ApiErrorResponse = {
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
    },
    requestId,
  };

  res.status(404).json(response);
}
