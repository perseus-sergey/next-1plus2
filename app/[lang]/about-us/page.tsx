import ArticleWrapper from '@/components/ArticleWrapper';
import { ELang } from '@models/types';
import { ABOUT_PAGE_TEXT, META_ABOUT } from '@/models/about.model';
import { DEFAULT_META_OG, EUrlParams, MAIN_URL } from '@/models/main.model';
import { Metadata } from 'next';

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
    <ArticleWrapper h1Title={lang === ELang.ua ? 'Про "1plus2.fun"' : 'About "1plus2.fun"'}>
      {ABOUT_PAGE_TEXT[lang]}
    </ArticleWrapper>
  );
};

export default Page;
