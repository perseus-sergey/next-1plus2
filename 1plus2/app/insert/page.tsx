import { wordList } from '@/libs/hangman/words';
import { QueryResult, QueryResultRow, sql } from '@vercel/postgres';

export default async () => {
  // let res: QueryResult<QueryResultRow>;
  // await sql`
  //     CREATE TABLE IF NOT EXISTS words (
  //       id SERIAL PRIMARY KEY,
  //       word VARCHAR(255) NOT NULL,
  //       hint TEXT NOT NULL
  //     );
  //   `;

  // const hint1 = 'fhjd fjkkdsl';
  // const word1 = 'rainforest';
  // const values = wordList.map(({ word, hint }) => `('${word}', '${hint}')`).join(',');

  const { rows } = await sql`
      SELECT hint, word FROM words
      ORDER BY RANDOM()
      LIMIT 1;
    `;
  const { hint, word } = rows[0];
  // res = await sql`
  //   INSERT INTO words (word, hint) VALUES (${hint1}, ${word1});
  // `;
  // res = await sql`
  //   INSERT INTO words (word, hint) VALUES ${values};
  // `;

  // console.log(`🚀 ~ 'Words imported successfully'. Number of inserted rows: ${res.rowCount}`);

  return (
    <>
      <h2>DB Insert Result:</h2>
      {/* <pre>{JSON.stringify(res, null, 2)}</pre> */}
      <p>Hint: {hint}</p>
      <p>Word: {word}</p>
    </>
  );
};

export const dynamic = 'force-dynamic';
