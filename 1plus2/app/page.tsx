import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { Title } from '@/components/Title/Title';
import HomeLinks from '@/components/HomeLinks/HomeLinks';
import { sql } from '@vercel/postgres';
import { executeQuery } from './mysqldb';

// export type User = {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
// };

interface IChannel {
  id: number;
  title: string;
  cpu: string;
  compress: string;
  logo: string;
  description: string;
  text: string;
  tema: string;
  cat: string;
  frequency: string;
  sat: string;
  beam: string;
  encryption: string;
  lang: string;
  view: string;
  url: string;
  canonical: string;
  programma: string;
  potok: string;
  pars_uppod: string;
  pattern: string;
  tvforsite_net: string;
  simpletv: string;
  jwplayer: string;
  tvforsite_ru: string;
  other_stream: string;
  mark: string;
  aspect: string;
  biss: string;
  country_id: string;
  ip_deny: string;
  telegid_id: string;
  vipiko: string;
  vsetv: string;
  no_googlads: string;
}

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

const res = await executeQuery<IChannel>('SELECT * FROM `tbl_channal` LIMIT 1', []);

console.log('🚀 ~ res:', res);
const Home = async () => (
  <>
    <Title name={getTitleFromMap(EMessageNames.TITLE_HOME_PAGE)} />
    {/* <h2>{res[0].title}</h2> */}
    {/* <h2>{(await getUser('me@site.com')).name}</h2> */}
    <HomeLinks />
  </>
);

export default Home;
