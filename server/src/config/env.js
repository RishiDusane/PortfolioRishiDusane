import 'dotenv/config';

const required = ['PORT', 'DB_HOST', 'DB_PORT', 'DB_USER', 'DB_NAME', 'CLIENT_ORIGIN'];

for (const key of required) {
  if (!process.env[key]?.trim()) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

if (process.env.DB_PASSWORD === undefined) {
  throw new Error('Missing required environment variable: DB_PASSWORD');
}

const port = Number(process.env.PORT);
const dbPort = Number(process.env.DB_PORT);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535');
}

if (!Number.isInteger(dbPort) || dbPort < 1 || dbPort > 65535) {
  throw new Error('DB_PORT must be an integer between 1 and 65535');
}

export const config = {
  port,
  database: {
    host: process.env.DB_HOST,
    port: dbPort,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  clientOrigins: process.env.CLIENT_ORIGIN.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
};

if (!/^[A-Za-z0-9_]+$/.test(config.database.name)) {
  throw new Error('DB_NAME may contain only letters, numbers, and underscores');
}

if (config.clientOrigins.length === 0) {
  throw new Error('CLIENT_ORIGIN must contain at least one allowed origin');
}
