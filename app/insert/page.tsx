import { poolQuery } from '@/libs/db/pg';
// import { wordList } from '@/libs/hangman/words';

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
  // const hint1 = 'fhjd fjkkdsl';
  // const word1 = 'rainforest';
  // const values = wordList.map(({ word, hint }) => `('${word}', '${hint}')`).join(',');

  const req = `
  SELECT hint, word FROM words
  ORDER BY RANDOM()
  LIMIT 1;
`;

  // Виконання SQL-запиту, просто використовуючи рядок запиту
  const res = await poolQuery(req);
  if (res instanceof Error) return <p>select error</p>;
  // const { rows } = await sql([req]);

  // const { rows } = await sql`;
  //     SELECT hint, word FROM words
  //     ORDER BY RANDOM()
  //     LIMIT 1;
  //   `;
  const { hint, word } = res[0];
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
