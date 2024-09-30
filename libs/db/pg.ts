'use server';

import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export const poolQuery = async (sql: string) => {
  try {
    const { rows } = await pool.query(sql);

    return rows;
  } catch (error) {
    console.log('🚀 ~ poolQuery ~ error:', error);
    await pool.end();
    return error instanceof Error ? error : new Error('ERROR: poolQuery processing!');
  }
};
