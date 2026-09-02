import app from './app.js';
import { env } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { logger } from './utils/logger.js';

async function main() {
  // Connect to database
  await connectDatabase();

  // Start HTTP server
  const server = app.listen(env.PORT, () => {
    logger.info(`🚀 JharSankalp server running`, {
      port: env.PORT,
      env: env.NODE_ENV,
      aiMode: env.AI_MODE,
    });
    logger.info(`   Health: http://localhost:${env.PORT}/api/v1/health`);
  });

  // ── Graceful Shutdown ────────────────────────────────────

  const shutdown = async (signal: string) => {
    logger.info(`${signal} received — shutting down gracefully`);

    server.close(async () => {
      await disconnectDatabase();
      logger.info('Server closed');
      process.exit(0);
    });

    // Force close after 10s
    setTimeout(() => {
      logger.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10_000);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  // Unhandled rejections
  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled rejection', { reason: String(reason) });
  });
}

main().catch((error) => {
  console.error('Fatal startup error:', error);
  process.exit(1);
});
