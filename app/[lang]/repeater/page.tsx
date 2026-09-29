import RepeaterPage from '@/components/Repeater/RepeaterPage';
import { ELang } from '@models/types';
import { DEFAULT_META_OG, ESegments, MAIN_URL } from '@/models/main.model';
import { META_REPEATER } from '@/models/repeater.model';
import { Metadata } from 'next';

interface IProps {
  params: Promise<{ lang: ELang }>;
}

const BASE_URL = process.env.BASE_URL || MAIN_URL;

export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const params = await props.params;

  const { lang } = params;

  return {
    metadataBase: new URL(BASE_URL),
    ...META_REPEATER[lang],
    openGraph: {
      ...DEFAULT_META_OG,
      title: META_REPEATER[lang].title,
      description: META_REPEATER[lang].description,
      url: `/${lang}/${ESegments.REPEATER}`,
    },
    alternates: {
      canonical: `/${lang}/${ESegments.REPEATER}`,
      languages: {
        en: `/${ELang.en}/${ESegments.REPEATER}`,
        uk: `/${ELang.ua}/${ESegments.REPEATER}`,
      },
    },
  };
};

const Page = async (props: IProps) => {
  const params = await props.params;
  const { lang } = params;

  return <RepeaterPage lang={lang} />;
};
export default Page;
