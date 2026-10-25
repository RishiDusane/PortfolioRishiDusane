import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import mysql from 'mysql2/promise';
import { config } from '../src/config/env.js';
import { splitSqlStatements } from './splitSqlStatements.js';

const dbDirectory = fileURLToPath(new URL('../db/', import.meta.url));

async function run() {
  const credentials = {
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    charset: 'utf8mb4',
  };
  const bootstrap = await mysql.createConnection(credentials);

  try {
    await bootstrap.query(
      `CREATE DATABASE IF NOT EXISTS \`${config.database.name}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci`,
    );
  } finally {
    await bootstrap.end();
  }

  const connection = await mysql.createConnection({
    ...credentials,
    database: config.database.name,
  });

  try {
    const schema = await readFile(`${dbDirectory}schema.sql`, 'utf8');
    for (const statement of splitSqlStatements(schema)) {
      await connection.query(statement);
    }

    const seed = await readFile(`${dbDirectory}seed.sql`, 'utf8');
    await connection.beginTransaction();
    try {
      for (const statement of splitSqlStatements(seed)) {
        await connection.query(statement);
      }
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    }
    console.info(`Database "${config.database.name}" schema and seed data are ready.`);
  } finally {
    await connection.end();
  }
}

run().catch((error) => {
  console.error(`Database setup failed: ${error.message}`);
  process.exitCode = 1;
});
