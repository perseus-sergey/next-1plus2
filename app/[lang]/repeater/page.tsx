import RepeaterPage from '@/components/Repeater/RepeaterPage';
import { ELang } from '@models/types';
import { DEFAULT_META_OG, EUrlParams, MAIN_URL } from '@/models/main.model';
import { META_REPEATER } from '@/models/repeater.model';
import { Metadata } from 'next';

interface IProps {
  params: { lang: ELang };
}

const BASE_URL = process.env.BASE_URL || MAIN_URL;

export const generateMetadata = ({ params: { lang } }: IProps): Metadata => {
  return {
    metadataBase: new URL(BASE_URL),
    ...META_REPEATER[lang],
    openGraph: {
      ...DEFAULT_META_OG,
      title: META_REPEATER[lang].title,
      description: META_REPEATER[lang].description,
      url: `/${lang}/${EUrlParams.REPEATER}`,
    },
    alternates: {
      canonical: `/${lang}/${EUrlParams.REPEATER}`,
      languages: {
        en: `/${ELang.en}/${EUrlParams.REPEATER}`,
        uk: `/${ELang.ua}/${EUrlParams.REPEATER}`,
      },
    },
  };
};

const Page = ({ params: { lang } }: IProps) => {
  return <RepeaterPage lang={lang} />;
};

export default Page;
