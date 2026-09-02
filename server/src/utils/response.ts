import type { Response, Request } from 'express';
import type { ApiSuccessResponse, ApiErrorResponse } from '@jharsankalp/shared';

/**
 * Send a standardized success response.
 */
export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode = 200,
  req?: Request,
): void {
  const requestId = req
    ? (req as unknown as Record<string, unknown>).requestId as string
    : undefined;

  const response: ApiSuccessResponse<T> = {
    success: true,
    data,
    requestId,
  };

  res.status(statusCode).json(response);
}

/**
 * Send a standardized error response.
 */
export function sendError(
  res: Response,
  statusCode: number,
  code: string,
  message: string,
  details?: Record<string, unknown>,
  req?: Request,
): void {
  const requestId = req
    ? (req as unknown as Record<string, unknown>).requestId as string
    : undefined;

  const response: ApiErrorResponse = {
    success: false,
    error: { code, message, details },
    requestId,
  };

  res.status(statusCode).json(response);
}
