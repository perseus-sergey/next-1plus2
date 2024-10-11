import Mission from '@/components/Mission/Mission';
import { ELang } from '@models/types';
import { DEFAULT_META_OG, EUrlParams, MAIN_URL } from '@/models/main.model';
import { Metadata } from 'next';
import { MATH_PAGE_TEXT, META_MATH } from '@/models/math/mathMeta.model';

import mathImg from 'public/img/math_300.jpg';
import ArticleWithImage from '@/components/ArticleWithImage';

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
      <ArticleWithImage
        titleH1={lang === ELang.ua ? 'Обери завдання' : 'Choose the task'}
        imgSrc={mathImg}
        imgAlt={
          lang === ELang.ua
            ? 'Ілюстрація яскравої математичної сцени з числами, символами та геометричними фігурами.'
            : 'Illustration of a colorful math scene with numbers, symbols, and geometric shapes.'
        }
        innerHtml={MATH_PAGE_TEXT[lang]}
      />

      <Mission lang={lang} />
    </>
  );
}
