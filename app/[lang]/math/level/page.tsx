import ArticleWrapper from '@/components/ArticleWrapper';
import MathPageMaxNumber from '@/components/MathPageMaxNumber/MathPageMaxNumber';
import { ELang } from '@models/types';
import { DEFAULT_META_OG, EUrlParams, MAIN_URL } from '@/models/main.model';
import { Metadata } from 'next';
import { EExerciseCategories } from '@/models/math/types';
import { PAGE_DATA } from '@/models/math/level.model';

interface IProps {
  params: { lang: ELang };
}

const BASE_URL = process.env.BASE_URL || MAIN_URL;

export const generateMetadata = ({ params: { lang } }: IProps): Metadata => {
  return {
    metadataBase: new URL(BASE_URL),
    ...PAGE_DATA.meta[lang],
    openGraph: {
      ...DEFAULT_META_OG,
      ...PAGE_DATA.meta[lang],
      url: `/${lang}/${EUrlParams.MATH}/${EUrlParams.MATH_LEVEL}`,
    },
    alternates: {
      canonical: `/${lang}/${EUrlParams.MATH}/${EUrlParams.MATH_LEVEL}`,
      languages: {
        en: `/${ELang.en}/${EUrlParams.MATH}/${EUrlParams.MATH_LEVEL}`,
        uk: `/${ELang.ua}/${EUrlParams.MATH}/${EUrlParams.MATH_LEVEL}`,
      },
    },
  };
};

export default ({ params: { lang } }: IProps) => {
  return (
    <>
      <ArticleWrapper
        h1Title={lang === ELang.ua ? 'Обери рівень складності' : 'Select the difficulty level'}
      >
        {PAGE_DATA.text[lang]}
      </ArticleWrapper>
      <MathPageMaxNumber lang={lang} cat={EExerciseCategories.level} />;
    </>
  );
};
