import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { splitSqlStatements } from './splitSqlStatements.js';

test('keeps semicolons inside quoted seed values', async () => {
  const seed = await readFile(new URL('../db/seed.sql', import.meta.url), 'utf8');
  const statements = splitSqlStatements(seed);

  assert.equal(statements.length, 16);
  assert.ok(
    statements.some((statement) =>
      statement.includes('role-based access control; added input validation'),
    ),
  );
  assert.ok(
    statements.some((statement) =>
      statement.includes('authorization with JUnit 5 and Mockito; validated APIs'),
    ),
  );
});

test('handles escaped quotes, comments, and statement separators', () => {
  const sql = "INSERT INTO items VALUES ('it''s; fine'); -- ignored ;\nSELECT 1;";

  assert.deepEqual(splitSqlStatements(sql), [
    "INSERT INTO items VALUES ('it''s; fine')",
    'SELECT 1',
  ]);
});

test('rejects an unterminated quoted value', () => {
  assert.throws(() => splitSqlStatements("INSERT INTO items VALUES ('unfinished;"), {
    name: 'SyntaxError',
    message: 'Unterminated quoted value in SQL input.',
  });
});
