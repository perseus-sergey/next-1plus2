import { Analytics } from '@vercel/analytics/react';
import { GoogleTagManager } from '@next/third-parties/google';
import { Inter, Lobster } from 'next/font/google';

import type { Metadata } from 'next';
import { ELang } from '@models/types';
import FlyingDigits from '@/components/FlyingDigits/FlyingDigits';
import { DEFAULT_META_OG, ESegments, MAIN_URL } from '@/models/main.model';
import { Header } from '@/components/Header/Header';
import { getELangKey } from '@/libs/validSearchParam';
import { DEFAULT_META_DATA } from '@/models/mainMeta.model';

interface IProps {
  children?: React.ReactNode;
  params: Promise<{ lang: string }>;
}

const lobsterFont = Lobster({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  display: 'swap',
  variable: '--font-lobster',
});

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

const BASE_URL = process.env.BASE_URL || MAIN_URL;
const GTM_KEY = process.env.GTM_KEY || '';

export function generateStaticParams() {
  return Object.values(ELang).map((l) => ({ [ESegments.DYNAMIC_LANG]: l }));
}

export const dynamicParams = false;

export const generateMetadata = async (props: IProps): Promise<Metadata> => {
  const params = await props.params;
  const lang = getELangKey(params.lang);

  return {
    metadataBase: new URL(BASE_URL),
    ...DEFAULT_META_DATA[lang],
    openGraph: {
      ...DEFAULT_META_OG,
      title: DEFAULT_META_DATA[lang].title,
      description: DEFAULT_META_DATA[lang].description,
      url: `/${lang}`,
    },
    alternates: { canonical: `/${lang}`, languages: { en: `/${ELang.en}`, uk: `/${ELang.ua}` } },
  };
};

export default async function RootLayout(props: IProps) {
  const params = await props.params;

  const { children } = props;

  const lang = getELangKey(params.lang);

  return (
    <html lang={lang === ELang.ua ? 'uk' : 'en'} className="!scroll-smooth">
      <GoogleTagManager gtmId={GTM_KEY} />
      <body
        className={`${inter.variable} ${lobsterFont.variable} flex flex-col items-center`}
        suppressHydrationWarning={true}
      >
        <Header lang={lang} />

        <main className="max-w-screen-lg w-full flex-1 flex flex-col justify-start items-center p-1 sm:p-4">
          {children}
        </main>

        <FlyingDigits />
        <Analytics />
      </body>
    </html>
  );
}
