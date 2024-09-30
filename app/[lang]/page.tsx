import HomeLinks from '@/components/HomeLinks/HomeLinks';
import { Title } from '@/components/Title/Title';
import { ELang } from '@/libs/langMessages';

export interface IMathPageProps {
  params: { lang: ELang };
}

const MathPage = ({ params }: IMathPageProps) => {
  const { lang } = params;

  return (
    <>
      <Title name={lang === ELang.ua ? 'Домашня Сторінка' : 'Home Page'} />
      <HomeLinks lang={lang} />
    </>
  );
};

export default MathPage;
