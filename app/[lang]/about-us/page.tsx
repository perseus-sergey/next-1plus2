import { ELang } from '@models/types';
import { ABOUT_PAGE_TEXT, META_ABOUT } from '@/models/about.model';
import { DEFAULT_META_OG, EUrlParams, MAIN_URL } from '@/models/main.model';
import { Metadata } from 'next';
import ArticleWithImage from '@/components/ArticleWithImage';

import aboutImg from 'public/img/about_300.jpg';

interface IProps {
  params: { lang: ELang };
}

const BASE_URL = process.env.BASE_URL || MAIN_URL;

export const generateMetadata = ({ params: { lang } }: IProps): Metadata => {
  return {
    metadataBase: new URL(BASE_URL),
    ...META_ABOUT[lang],
    openGraph: {
      ...DEFAULT_META_OG,
      title: META_ABOUT[lang].title,
      description: META_ABOUT[lang].description,
      url: `/${lang}/${EUrlParams.ABOUT}`,
    },
    alternates: {
      canonical: `/${lang}/${EUrlParams.ABOUT}`,
      languages: {
        en: `/${ELang.en}/${EUrlParams.ABOUT}`,
        uk: `/${ELang.ua}/${EUrlParams.ABOUT}`,
      },
    },
  };
};

const Page = ({ params: { lang } }: IProps) => {
  return (
    <ArticleWithImage
      titleH1={lang === ELang.ua ? 'Про "1plus2.fun"' : 'About "1plus2.fun"'}
      imgSrc={aboutImg}
      imgAlt={
        lang === ELang.ua
          ? 'Ілюстрація для сторінки Про нас з дружніми персонажами, книгами та навчальними символами.'
          : 'Illustration for the About Us page featuring friendly characters, books, and educational symbols.'
      }
      innerHtml={ABOUT_PAGE_TEXT[lang]}
    />
  );
};

export default Page;
