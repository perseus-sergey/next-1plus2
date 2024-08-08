import { ELang, EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { Title } from '@/components/Title/Title';
import HomeLinks from '@/components/HomeLinks/HomeLinks';
import Link from 'next/link';
import TextButton from '@/components/TextButton/TextButton';

const Home = () => (
  <>
    <Title name={getTitleFromMap(EMessageNames.TITLE_HOME_PAGE)} />
    <HomeLinks />
    <Link href={`/${ELang['en']}/hangman`}>
      <TextButton isLink>{getTitleFromMap(EMessageNames.HANGMAN, ELang.en)}</TextButton>
    </Link>
  </>
);

export default Home;
