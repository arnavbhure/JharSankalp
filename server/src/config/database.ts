import { PrismaClient } from '@prisma/client';
import { env } from './env.js';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['warn', 'error'],
  });

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export async function connectDatabase(): Promise<boolean> {
  try {
    await prisma.$connect();
    console.log('✅ Database connected');
    return true;
  } catch (error) {
    console.warn('⚠️  Database connection failed — running in degraded mode. Verify DATABASE_URL in .env.');
    return false;
  }
}

export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();
  console.log('📦 Database disconnected');
}
