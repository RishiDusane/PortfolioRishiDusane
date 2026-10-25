export function splitSqlStatements(sql) {
  const statements = [];
  let statement = '';
  let quote = null;
  let lineComment = false;
  let blockComment = false;

  for (let index = 0; index < sql.length; index += 1) {
    const character = sql[index];
    const nextCharacter = sql[index + 1];

    if (lineComment) {
      if (character === '\n') {
        lineComment = false;
        statement += character;
      }
      continue;
    }

    if (blockComment) {
      if (character === '*' && nextCharacter === '/') {
        blockComment = false;
        index += 1;
        statement += ' ';
      }
      continue;
    }

    if (quote) {
      statement += character;

      if (character === '\\' && quote !== '`' && nextCharacter !== undefined) {
        statement += nextCharacter;
        index += 1;
      } else if (character === quote) {
        if (nextCharacter === quote) {
          statement += nextCharacter;
          index += 1;
        } else {
          quote = null;
        }
      }

      continue;
    }

    if (character === "'" || character === '"' || character === '`') {
      quote = character;
      statement += character;
    } else if (
      character === '-' &&
      nextCharacter === '-' &&
      (sql[index + 2] === undefined || /\s/.test(sql[index + 2]))
    ) {
      lineComment = true;
      index += 1;
    } else if (character === '#') {
      lineComment = true;
    } else if (character === '/' && nextCharacter === '*') {
      blockComment = true;
      index += 1;
    } else if (character === ';') {
      if (statement.trim()) statements.push(statement.trim());
      statement = '';
    } else {
      statement += character;
    }
  }

  if (quote) throw new SyntaxError('Unterminated quoted value in SQL input.');
  if (blockComment) throw new SyntaxError('Unterminated block comment in SQL input.');

  if (statement.trim()) statements.push(statement.trim());
  return statements;
}
