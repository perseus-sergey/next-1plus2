import Mission from '@/components/Mission/Mission';
import { ELang } from '@models/types';
import { DEFAULT_META_OG, ESegments, MAIN_URL } from '@/models/main.model';
import { Metadata } from 'next';
import { MATH_PAGE_TEXT, META_MATH } from '@/models/math/mathMeta.model';

import mathImg from 'public/img/math_300.jpg';
import ArticleWithImage from '@/components/ArticleWithImage';
import { getELangKey } from '@/libs/validSearchParam';
import BreadCrumbServer from '@/components/BreadCrumb/BreadCrumbsServer';

interface IProps {
  params: Promise<{ lang: ELang }>;
}

const BASE_URL = process.env.BASE_URL || MAIN_URL;

export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const params = await props.params;
  const lang = getELangKey(params.lang);

  return {
    metadataBase: new URL(BASE_URL),
    ...META_MATH[lang],
    openGraph: {
      ...DEFAULT_META_OG,
      title: META_MATH[lang].title,
      description: META_MATH[lang].description,
      url: `/${lang}/${ESegments.MATH}`,
    },
    alternates: {
      canonical: `/${lang}/${ESegments.MATH}`,
      languages: {
        en: `/${ELang.en}/${ESegments.MATH}`,
        uk: `/${ELang.ua}/${ESegments.MATH}`,
      },
    },
  };
};

export default async function Page(props: IProps) {
  const params = await props.params;
  const lang = getELangKey(params.lang);

  return (
    <>
      <BreadCrumbServer lang={lang} />

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
