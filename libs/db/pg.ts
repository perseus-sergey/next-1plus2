'use server';

import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const poolQuery = async <T>(sql: string) => {
  try {
    const { rows } = await pool.query(sql);

    return rows as T;
  } catch (error) {
    console.log('PoolQuery ~ error:', error);
    await pool.end();
    return error instanceof Error ? error : new Error('ERROR: poolQuery processing!');
  }
};
