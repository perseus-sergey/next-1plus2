import BreadCrumbServer from '@/components/BreadCrumb/BreadCrumbsServer';
import HangmanPage from '@/components/HangmanPage/HangmanPage';
import HangmanRules from '@/components/HangmanPage/HangmanRules';
import { Title } from '@/components/Title/Title';
import { META_HANGMAN } from '@/models/hangman.model';
import { DEFAULT_META_OG, ESegments, MAIN_URL } from '@/models/main.model';
import { ELang } from '@models/types';
import { Metadata } from 'next';

export interface IProps {
  params: Promise<{ lang: ELang }>;
}

const BASE_URL = process.env.BASE_URL || MAIN_URL;

export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const params = await props.params;

  const { lang } = params;

  return {
    metadataBase: new URL(BASE_URL),
    ...META_HANGMAN[lang],
    openGraph: {
      ...DEFAULT_META_OG,
      title: META_HANGMAN[lang].title,
      description: META_HANGMAN[lang].description,
      url: `/${lang}/${ESegments.HANGMAN}`,
    },
    alternates: {
      canonical: `/${lang}/${ESegments.HANGMAN}`,
      languages: {
        en: `/${ELang.en}/${ESegments.HANGMAN}`,
        uk: `/${ELang.ua}/${ESegments.HANGMAN}`,
      },
    },
  };
};

export default async (props: IProps) => {
  const params = await props.params;
  const { lang } = params;
  const title = lang === ELang.ua ? '«Кат»' : '«Hangman»';

  return (
    <>
      <BreadCrumbServer lang={lang} breadCrumbList={[title]} />

      <div className="flex gap-2">
        <Title name={title} />
        <HangmanRules lang={lang} />
      </div>
      <HangmanPage lang={lang} />
    </>
  );
};
