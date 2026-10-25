import { app } from './app.js';
import { pool } from './config/database.js';
import { config } from './config/env.js';

const server = app.listen(config.port, () => {
  console.info(`Portfolio API listening on http://localhost:${config.port}`);
});

function shutdown(signal) {
  console.info(`${signal} received; shutting down gracefully.`);
  server.close(async (error) => {
    await pool.end();
    if (error) {
      console.error('HTTP server shutdown failed:', error);
      process.exitCode = 1;
    }
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
