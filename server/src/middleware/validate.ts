import type { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { AppError } from './errorHandler.js';

interface ValidationSchemas {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

/**
 * Express middleware factory for Zod-based request validation.
 * Validates body, query, and/or params against provided schemas.
 */
export function validate(schemas: ValidationSchemas) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      if (schemas.query) {
        req.query = schemas.query.parse(req.query) as Record<string, string>;
      }
      if (schemas.params) {
        req.params = schemas.params.parse(req.params) as Record<string, string>;
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details: Record<string, string[]> = {};
        for (const issue of error.issues) {
          const path = issue.path.join('.');
          if (!details[path]) {
            details[path] = [];
          }
          details[path].push(issue.message);
        }

        next(
          new AppError('Validation failed', 400, 'VALIDATION_ERROR', {
            fields: details,
          }),
        );
        return;
      }
      next(error);
    }
  };
}
