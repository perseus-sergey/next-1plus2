import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { Title } from '@/components/Title/Title';
import HomeLinksEng from '@/components/HomeLinks/HomeLinksEng';
// import Link from 'next/link';
// import TextButton from '@/components/TextButton/TextButton';

const Home = () => (
  <>
    <Title name={getTitleFromMap(EMessageNames.TITLE_HOME_PAGE)} />
    <HomeLinksEng />
    {/* <Link href={`/${ELang['en']}/hangman`}>
      <TextButton isLink>{getTitleFromMap(EMessageNames.HANGMAN, ELang.en)}</TextButton>
    </Link> */}
  </>
);

export default Home;
