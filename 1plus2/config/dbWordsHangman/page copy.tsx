import { sql } from '@vercel/postgres';

export default async () => {
  const { rows } = await sql`
      SELECT hint, word FROM words
      ORDER BY RANDOM()
      LIMIT 1;
    `;
  const { hint, word } = rows[0];
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
