import Image from 'next/image';

import HomeLinks from '@/components/HomeLinks/HomeLinks';
import { Title } from '@/components/Title/Title';
import { MAIN_PAGE_TEXT } from '@/models/mainMeta.model';
import { ELang } from '@models/types';
import mainImg from 'public/img/1plus2_300.jpg';
import { MAIN_PAGE_LANG } from '@/models/mainPage.model';

const { titleH1, imgMainAlt } = MAIN_PAGE_LANG;
export interface IMathPageProps {
  params: { lang: ELang };
}

const Page = ({ params }: IMathPageProps) => {
  const { lang } = params;

  return (
    <>
      <Title name={titleH1[lang]} />

      <Image
        className="sm:rounded-full sm:border-zinc-300 sm:border-4"
        src={mainImg}
        alt={imgMainAlt[lang]}
        priority
      />
      <article className="max-w-screen-sm p-4 my-4 space-y-4 bg-slate-900/30 rounded-md text-xl font-inter">
        {MAIN_PAGE_TEXT[lang]}
      </article>
      <HomeLinks lang={lang} />
    </>
  );
};

export default Page;
