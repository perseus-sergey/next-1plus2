import ArticleWrapper from '@/components/ArticleWrapper';
import MathCategories from '@/components/MathCategories/MathCategories';
import { ELang } from '@models/types';
import { DEFAULT_META_OG, EUrlParams, MAIN_URL } from '@/models/main.model';
import { Metadata } from 'next';
import { MATH_CATEGORY_PAGE_TEXT, META_MATH_CATEGORY } from '@/models/math/mathCategories.model';

interface IProps {
  params: { lang: ELang };
}

const BASE_URL = process.env.BASE_URL || MAIN_URL;

export const generateMetadata = ({ params: { lang } }: IProps): Metadata => {
  return {
    metadataBase: new URL(BASE_URL),
    ...META_MATH_CATEGORY[lang],
    openGraph: {
      ...DEFAULT_META_OG,
      title: META_MATH_CATEGORY[lang].title,
      description: META_MATH_CATEGORY[lang].description,
      url: `/${lang}/${EUrlParams.MATH}/${EUrlParams.MATH_CATEGORY}`,
    },
    alternates: {
      canonical: `/${lang}/${EUrlParams.MATH}/${EUrlParams.MATH_CATEGORY}`,
      languages: {
        en: `/${ELang.en}/${EUrlParams.MATH}/${EUrlParams.MATH_CATEGORY}`,
        uk: `/${ELang.ua}/${EUrlParams.MATH}/${EUrlParams.MATH_CATEGORY}`,
      },
    },
  };
};

export default ({ params: { lang } }: IProps) => {
  return (
    <>
      <ArticleWrapper h1Title={lang === ELang.ua ? 'Обери категорію' : 'Choose the category'}>
        {MATH_CATEGORY_PAGE_TEXT[lang]}
      </ArticleWrapper>
      <MathCategories lang={lang} />;
    </>
  );
};
