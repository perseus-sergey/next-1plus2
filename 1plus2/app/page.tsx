import { Title } from '@/components/Title/Title';
import { ELang } from '@/libs/langMessages';
import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import HomeLinks from '@/components/HomeLinks/HomeLinks';

const MathPage = () => {
  return (
    <>
      <Title name={getTitleFromMap(EMessageNames.TITLE_HOME_PAGE)} />
      <HomeLinks lang={ELang.en} />
    </>
  );
};

export default MathPage;
