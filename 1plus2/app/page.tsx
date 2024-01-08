import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { Title } from '@/components/Title/Title';
import HomeLinks from '@/components/HomeLinks/HomeLinks';

const Home = () => (
  <>
    <Title name={getTitleFromMap(EMessageNames.TITLE_HOME_PAGE)} />
    <HomeLinks />
  </>
);

export default Home;
