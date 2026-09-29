import MathCategories from '@/components/MathCategories/MathCategories';
import { ELang } from '@models/types';
import { DEFAULT_META_OG, ESegments, MAIN_URL } from '@/models/main.model';
import { Metadata } from 'next';
import { MATH_CATEGORY_PAGE_TEXT, META_MATH_CATEGORY } from '@/models/math/mathCategories.model';
import ArticleWithImage from '@/components/ArticleWithImage';

import catImg from 'public/img/math-cats_300.jpg';
import BreadCrumbServer from '@/components/BreadCrumb/BreadCrumbsServer';
import { breadCrumbList } from '@/models/math/breadCrumb.model';

interface IProps {
  params: Promise<{ lang: ELang }>;
}

const { MATH, MATH_CATEGORY } = ESegments;
const { en, ua } = ELang;

const BASE_URL = process.env.BASE_URL || MAIN_URL;

export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const params = await props.params;
  const { lang } = params;

  return {
    metadataBase: new URL(BASE_URL),
    ...META_MATH_CATEGORY[lang],
    openGraph: {
      ...DEFAULT_META_OG,
      title: META_MATH_CATEGORY[lang].title,
      description: META_MATH_CATEGORY[lang].description,
      url: `/${lang}/${MATH}/${MATH_CATEGORY}`,
    },
    alternates: {
      canonical: `/${lang}/${MATH}/${MATH_CATEGORY}`,
      languages: { en: `/${en}/${MATH}/${MATH_CATEGORY}`, uk: `/${ua}/${MATH}/${MATH_CATEGORY}` },
    },
  };
};

export default async (props: IProps) => {
  const params = await props.params;

  const { lang } = params;

  return (
    <>
      <BreadCrumbServer
        lang={lang}
        breadCrumbList={[breadCrumbList.math, breadCrumbList.mathCategory.title[lang]]}
      />
      <ArticleWithImage
        titleH1={lang === ua ? 'Обери категорію' : 'Choose the category'}
        imgSrc={catImg}
        imgAlt={
          lang === ua
            ? 'Ілюстрація для сторінки категорій математики з яскравими математичними символами та геометричними фігурами на темно-синьому фоні.'
            : 'Illustration for the Math Categories page with colorful mathematical symbols and geometric shapes on a dark blue background.'
        }
        innerHtml={MATH_CATEGORY_PAGE_TEXT[lang]}
      />
      <MathCategories lang={lang} />
    </>
  );
};
