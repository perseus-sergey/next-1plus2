import mysql from 'mysql2/promise';

export const executeQuery = async <T>(query: string, data: string[]): Promise<T[] | Error> => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      // host: '127.0.0.1',
      user: 'root',
      database: 'lara_installsat',
      port: 8889,
      password: 'root',
    });
    const [result] = await connection.execute(query, data);
    await connection.end();
    return result as T[];
  } catch (err) {
    console.log(err);
    return err as Error;
  }
};
