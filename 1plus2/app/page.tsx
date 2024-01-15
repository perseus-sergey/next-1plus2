import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { Title } from '@/components/Title/Title';
import HomeLinks from '@/components/HomeLinks/HomeLinks';
import { sql } from '@vercel/postgres';

// export type User = {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
// };

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export async function getUser(email: string) {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

const Home = async () => (
  <>
    <Title name={getTitleFromMap(EMessageNames.TITLE_HOME_PAGE)} />
    <h2>{(await getUser('me@site.com')).name}</h2>
    <HomeLinks />
  </>
);

export default Home;
