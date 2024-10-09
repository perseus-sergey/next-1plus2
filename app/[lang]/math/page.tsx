import Mission from '@/components/Mission/Mission';
import { ELang } from '@models/types';
import ArticleWrapper from '@/components/ArticleWrapper';
import { DEFAULT_META_OG, EUrlParams, MAIN_URL } from '@/models/main.model';
import { Metadata } from 'next';
import { MATH_PAGE_TEXT, META_MATH } from '@/models/math/mathMeta.model';

interface IProps {
  params: { lang: ELang };
}

const BASE_URL = process.env.BASE_URL || MAIN_URL;

export const generateMetadata = ({ params: { lang } }: IProps): Metadata => {
  return {
    metadataBase: new URL(BASE_URL),
    ...META_MATH[lang],
    openGraph: {
      ...DEFAULT_META_OG,
      title: META_MATH[lang].title,
      description: META_MATH[lang].description,
      url: `/${lang}/${EUrlParams.MATH}`,
    },
    alternates: {
      canonical: `/${lang}/${EUrlParams.MATH}`,
      languages: {
        en: `/${ELang.en}/${EUrlParams.MATH}`,
        uk: `/${ELang.ua}/${EUrlParams.MATH}`,
      },
    },
  };
};

export default function Page({ params: { lang } }: IProps) {
  return (
    <>
      <ArticleWrapper h1Title={lang === ELang.ua ? 'Обери завдання' : 'Choose the task'}>
        {MATH_PAGE_TEXT[lang]}
      </ArticleWrapper>

      <Mission lang={lang} />
    </>
  );
}
