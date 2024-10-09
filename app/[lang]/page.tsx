import HomeLinks from '@/components/HomeLinks/HomeLinks';
import { Title } from '@/components/Title/Title';
import { MAIN_PAGE_TEXT } from '@/models/mainMeta.model';
import { ELang } from '@models/types';

export interface IMathPageProps {
  params: { lang: ELang };
}

const MathPage = ({ params }: IMathPageProps) => {
  const { lang } = params;

  return (
    <>
      <Title name={lang === ELang.ua ? 'Вчимо та розважаємось' : 'Learn and Have Fun'} />
      <article className="max-w-screen-sm p-4 space-y-4 bg-slate-900/30 rounded-md text-xl font-inter">
        {MAIN_PAGE_TEXT[lang]}
      </article>
      <HomeLinks lang={lang} />
    </>
  );
};

export default MathPage;
