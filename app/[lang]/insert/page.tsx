import { poolQuery } from '@/libs/db/pg';

export default async () => {
  const req = `
  SELECT hint, word FROM words
  ORDER BY RANDOM()
  LIMIT 1;
`;

  const res = await poolQuery<{ word: string; hint: string }[]>(req);
  if (res instanceof Error) return <p>Select error: {res.message}</p>;
  const { hint, word } = res[0];

  return (
    <>
      <h2>DB Select Result:</h2>
      {/* <pre>{JSON.stringify(res, null, 2)}</pre> */}
      <p>Hint: {hint}</p>
      <p>Word: {word}</p>
    </>
  );
};

export const dynamic = 'force-dynamic';
