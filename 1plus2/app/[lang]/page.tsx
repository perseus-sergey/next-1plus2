import HomeLinksEng from '@/components/HomeLinks/HomeLinksEng';
import HomeLinksUa from '@/components/HomeLinks/HomeLinksUa';
import { Title } from '@/components/Title/Title';
import { ELang } from '@/libs/langMessages';

export interface IMathPageProps {
  params: { lang: ELang };
}

const MathPage = ({ params }: IMathPageProps) => {
  const { lang } = params;

  return (
    <>
      <Title name="" />
      {lang === ELang.en ? <HomeLinksEng /> : <HomeLinksUa />}
    </>
  );
};

export default MathPage;
