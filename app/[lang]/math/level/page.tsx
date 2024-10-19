import MathPageMaxNumber from '@/components/MathPageMaxNumber/MathPageMaxNumber';
import { ELang } from '@models/types';
import { DEFAULT_META_OG, ESegments, MAIN_URL } from '@/models/main.model';
import { Metadata } from 'next';
import { EExerciseCategories } from '@/models/math/types';
import { PAGE_DATA } from '@/models/math/level.model';

import levelImg from 'public/img/math-levels_300.jpg';
import ArticleWithImage from '@/components/ArticleWithImage';
import BreadCrumbServer from '@/components/BreadCrumb/BreadCrumbsServer';
import { breadCrumbList } from '@/models/math/breadCrumb.model';
import { categoriesMap } from '@/models/math/math.model';

interface IProps {
  params: { lang: ELang };
}

const BASE_URL = process.env.BASE_URL || MAIN_URL;
const { MATH, MATH_LEVEL } = ESegments;

export const generateMetadata = ({ params: { lang } }: IProps): Metadata => {
  return {
    metadataBase: new URL(BASE_URL),
    ...PAGE_DATA.meta[lang],
    openGraph: {
      ...DEFAULT_META_OG,
      ...PAGE_DATA.meta[lang],
      url: `/${lang}/${MATH}/${MATH_LEVEL}`,
    },
    alternates: {
      canonical: `/${lang}/${MATH}/${MATH_LEVEL}`,
      languages: {
        en: `/${ELang.en}/${MATH}/${MATH_LEVEL}`,
        uk: `/${ELang.ua}/${MATH}/${MATH_LEVEL}`,
      },
    },
  };
};

export default ({ params: { lang } }: IProps) => {
  return (
    <>
      <BreadCrumbServer
        lang={lang}
        breadCrumbList={[
          breadCrumbList.math,
          categoriesMap.get(EExerciseCategories['level'])?.[lang].title || '',
        ]}
      />
      <ArticleWithImage
        titleH1={lang === ELang.ua ? 'Обери рівень складності' : 'Select the difficulty level'}
        imgSrc={levelImg}
        imgAlt={
          lang === ELang.ua
            ? 'Ілюстрація для сторінки рівнів математики зі стрілками, числами та математичними символами, що відображають рівні складності, на темно-синьому фоні.'
            : 'Illustration for the Math Level page with arrows, numbers, and mathematical symbols representing difficulty levels on a dark blue background.'
        }
        innerHtml={PAGE_DATA.text[lang]}
      />
      <MathPageMaxNumber lang={lang} cat={EExerciseCategories.level} />
    </>
  );
};
