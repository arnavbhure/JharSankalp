import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

// Deterministically locate .env files relative to this config file and cwd
const currentFileDir = path.dirname(fileURLToPath(import.meta.url));
const serverRootDir = path.resolve(currentFileDir, '..', '..');
const repoRootDir = path.resolve(serverRootDir, '..');

const candidateEnvFiles = [
  path.resolve(repoRootDir, '.env'),
  path.resolve(serverRootDir, '.env'),
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), 'server', '.env'),
  path.resolve(process.cwd(), '..', '.env'),
];

// Load all existing .env files without breaking, so values are merged
for (const envPath of candidateEnvFiles) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
}

const envSchema = z.object({
  NODE_ENV: z
    .preprocess((val) => {
      if (typeof val === 'string') {
        const lower = val.toLowerCase().trim();
        if (lower === 'prod') return 'production';
        if (lower === 'dev') return 'development';
        return lower;
      }
      return val;
    }, z.enum(['development', 'production', 'test']))
    .default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  JWT_SECRET: z.string().min(8, 'JWT_SECRET must be at least 8 characters'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  AI_MODE: z.enum(['mock', 'live', 'hybrid']).default('mock'),
  AI_PROVIDER: z.string().default('openrouter'),
  AI_API_KEY: z.string().optional(),
  AI_MODEL: z.string().default('google/gemini-2.0-flash-001'),
  OPENROUTER_API_KEY: z.string().optional(),
  OPENROUTER_MODEL: z.string().default('google/gemini-2.0-flash-001'),
  OPENROUTER_BASE_URL: z.string().default('https://openrouter.ai/api/v1'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  LOG_LEVEL: z
    .preprocess((val) => {
      if (typeof val === 'string') {
        const lower = val.toLowerCase().trim();
        if (lower === 'production' || lower === 'prod') return 'info';
        if (lower === 'verbose' || lower === 'trace') return 'debug';
        if (['debug', 'info', 'warn', 'error'].includes(lower)) return lower;
        return 'info';
      }
      return val;
    }, z.enum(['debug', 'info', 'warn', 'error']))
    .default('debug'),
  MAX_FILE_SIZE_MB: z.coerce.number().default(50),
  UPLOAD_DIR: z.string().default('./uploads'),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000),
  RATE_LIMIT_MAX: z.coerce.number().default(100),
});

function loadEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Environment validation failed:');
    for (const issue of result.error.issues) {
      console.error(`   ${issue.path.join('.')}: ${issue.message}`);
    }
    process.exit(1);
  }

  return result.data;
}

export const env = loadEnv();
export type Env = z.infer<typeof envSchema>;
