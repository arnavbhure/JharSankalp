// ─────────────────────────────────────────────────────────────
// JharSankalp — Shared Types
// API response contracts and core type interfaces.
// ─────────────────────────────────────────────────────────────

// ── API Response Contract (§30) ──────────────────────────────

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  requestId?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiError;
  requestId?: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// ── Pagination ───────────────────────────────────────────────

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ── Score Breakdown ──────────────────────────────────────────

export interface ScoreDimension {
  name: string;
  value: number;
  weight: number;
  weightedValue: number;
  explanation?: string;
}

export interface ScoreBreakdown {
  overallScore: number;
  dimensions: ScoreDimension[];
  weightsVersion: string;
  algorithmVersion: string;
}

// ── AI Provenance ────────────────────────────────────────────

export interface AIProvenance {
  provider: string;
  model: string;
  promptVersion: string;
  inputVersion: string;
  confidence?: number;
  createdAt: string;
}

// ── Health Check ─────────────────────────────────────────────

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  version: string;
  uptime: number;
  timestamp: string;
  services: {
    database: 'connected' | 'disconnected';
    redis?: 'connected' | 'disconnected';
  };
}
