import MathCategories from '@/components/MathCategories/MathCategories';
import { ELang } from '@models/types';
import { DEFAULT_META_OG, EUrlParams, MAIN_URL } from '@/models/main.model';
import { Metadata } from 'next';
import { MATH_CATEGORY_PAGE_TEXT, META_MATH_CATEGORY } from '@/models/math/mathCategories.model';
import ArticleWithImage from '@/components/ArticleWithImage';

import catImg from 'public/img/math-cats_300.jpg';

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
      <ArticleWithImage
        titleH1={lang === ELang.ua ? 'Обери категорію' : 'Choose the category'}
        imgSrc={catImg}
        imgAlt={
          lang === ELang.ua
            ? 'Ілюстрація для сторінки категорій математики з яскравими математичними символами та геометричними фігурами на темно-синьому фоні.'
            : 'Illustration for the Math Categories page with colorful mathematical symbols and geometric shapes on a dark blue background.'
        }
        innerHtml={MATH_CATEGORY_PAGE_TEXT[lang]}
      />
      <MathCategories lang={lang} />;
    </>
  );
};
