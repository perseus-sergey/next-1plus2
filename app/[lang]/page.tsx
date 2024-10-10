import HomeLinks from '@/components/HomeLinks/HomeLinks';
import { Title } from '@/components/Title/Title';
import { MAIN_PAGE_TEXT } from '@/models/mainMeta.model';
import { ELang } from '@models/types';
import mainImg from 'public/img/1plus2_350.jpg';
import Image from 'next/image';

export interface IMathPageProps {
  params: { lang: ELang };
}

const MathPage = ({ params }: IMathPageProps) => {
  const { lang } = params;

  return (
    <>
      <Title name={lang === ELang.ua ? 'Вчимо та розважаємось' : 'Learn and Have Fun'} />

      <Image
        className="sm:rounded-full sm:border-zinc-300 sm:border-4"
        src={mainImg}
        alt={
          lang === ELang.ua
            ? 'Креативна ілюстрація для головної сторінки сайту, що символізує освіту та навчання з книгами, математичними символами і лампочкою, яка представляє ідеї та знання.'
            : 'A creative illustration for a website homepage, symbolizing education and learning with books, mathematical symbols, and a light bulb representing ideas and knowledge.'
        }
        priority
      />
      <article className="max-w-screen-sm p-4 space-y-4 bg-slate-900/30 rounded-md text-xl font-inter">
        {MAIN_PAGE_TEXT[lang]}
      </article>
      <HomeLinks lang={lang} />
    </>
  );
};

export default MathPage;
