import { poolQuery } from '../db/pg';

interface IHangmanLesson {
  word: string;
  hint: string;
}

export const fetchRandomWord = async (lang: string) => {
  const columnWord = lang === 'ua' ? 'word_ua' : 'word';
  const columnHint = lang === 'ua' ? 'hint_ua' : 'hint';

  const res = await poolQuery<IHangmanLesson[]>(`
      SELECT ${columnHint} AS hint, ${columnWord} AS word
      FROM words
      ORDER BY RANDOM()
      LIMIT 1;
    `);

  return res instanceof Error ? null : res[0];
};
