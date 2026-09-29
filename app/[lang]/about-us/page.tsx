import { ELang } from '@models/types';
import { ABOUT_PAGE_TEXT, META_ABOUT } from '@/models/about.model';
import { DEFAULT_META_OG, ESegments, MAIN_URL } from '@/models/main.model';
import { Metadata } from 'next';
import ArticleWithImage from '@/components/ArticleWithImage';

import aboutImg from 'public/img/about_300.jpg';
import BreadCrumbServer from '@/components/BreadCrumb/BreadCrumbsServer';
import { breadCrumbList } from '@/models/math/breadCrumb.model';

interface IProps {
  params: Promise<{ lang: ELang }>;
}

const BASE_URL = process.env.BASE_URL || MAIN_URL;

export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const params = await props.params;
  const { lang } = params;

  return {
    metadataBase: new URL(BASE_URL),
    ...META_ABOUT[lang],
    openGraph: {
      ...DEFAULT_META_OG,
      title: META_ABOUT[lang].title,
      description: META_ABOUT[lang].description,
      url: `/${lang}/${ESegments.ABOUT}`,
    },
    alternates: {
      canonical: `/${lang}/${ESegments.ABOUT}`,
      languages: { en: `/${ELang.en}/${ESegments.ABOUT}`, uk: `/${ELang.ua}/${ESegments.ABOUT}` },
    },
  };
};

const Page = async (props: IProps) => {
  const params = await props.params;

  const { lang } = params;

  return (
    <>
      <BreadCrumbServer lang={lang} breadCrumbList={[breadCrumbList.aboutUs.title[lang]]} />

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
    </>
  );
};

export default Page;
