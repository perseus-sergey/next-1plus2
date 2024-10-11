import HangmanPage from '@/components/HangmanPage/HangmanPage';
import HangmanRules from '@/components/HangmanPage/HangmanRules';
import { Title } from '@/components/Title/Title';
import { META_HANGMAN } from '@/models/hangman.model';
import { DEFAULT_META_OG, EUrlParams, MAIN_URL } from '@/models/main.model';
import { ELang } from '@models/types';
import { Metadata } from 'next';

export interface IProps {
  params: { lang: ELang };
}

const BASE_URL = process.env.BASE_URL || MAIN_URL;

export const generateMetadata = ({ params: { lang } }: IProps): Metadata => {
  return {
    metadataBase: new URL(BASE_URL),
    ...META_HANGMAN[lang],
    openGraph: {
      ...DEFAULT_META_OG,
      title: META_HANGMAN[lang].title,
      description: META_HANGMAN[lang].description,
      url: `/${lang}/${EUrlParams.HANGMAN}`,
    },
    alternates: {
      canonical: `/${lang}/${EUrlParams.HANGMAN}`,
      languages: {
        en: `/${ELang.en}/${EUrlParams.HANGMAN}`,
        uk: `/${ELang.ua}/${EUrlParams.HANGMAN}`,
      },
    },
  };
};

export default ({ params }: IProps) => {
  const { lang } = params;

  return (
    <>
      <div className="flex gap-2">
        <Title name={lang === ELang.ua ? '«Кат»' : '«Hangman»'} />
        <HangmanRules lang={lang} />
      </div>
      <HangmanPage lang={lang} />
    </>
  );
};
