import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';

// Look for .env in current working directory first, then parent
const candidates = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '../.env'),
];
for (const candidate of candidates) {
  if (fs.existsSync(candidate)) {
    dotenv.config({ path: candidate });
    break;
  }
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  JWT_SECRET: z.string().min(8, 'JWT_SECRET must be at least 8 characters'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  AI_MODE: z.enum(['mock', 'live', 'hybrid']).default('mock'),
  AI_PROVIDER: z.string().default('openai'),
  AI_API_KEY: z.string().optional(),
  AI_MODEL: z.string().default('gpt-4o'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('debug'),
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
