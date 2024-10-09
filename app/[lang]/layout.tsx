import type { Metadata } from 'next';
import { ELang } from '@models/types';
import { Inter, Lobster } from 'next/font/google';
import FlyingDigits from '@/components/FlyingDigits/FlyingDigits';
import { DEFAULT_META_OG, EUrlParams, MAIN_URL } from '@/models/main.model';
import { Header } from '@/components/Header/Header';
import { getELangKey } from '@/libs/validSearchParam';
import { DEFAULT_META_DATA } from '@/models/mainMeta.model';

interface IProps {
  children?: React.ReactNode;
  params: { lang: ELang };
}

const lobsterFont = Lobster({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  display: 'swap',
  variable: '--font-lobster',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const BASE_URL = process.env.BASE_URL || MAIN_URL;

export function generateStaticParams() {
  return Object.values(ELang).map((l) => ({ [EUrlParams.LANG]: l }));
}

export const dynamicParams = false;

export const generateMetadata = ({ params }: IProps): Metadata => {
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
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: `/${ELang.en}`,
        uk: `/${ELang.ua}`,
      },
    },
  };
};

export default function RootLayout({ children, params }: IProps) {
  const lang = getELangKey(params.lang);

  return (
    <html lang={lang === ELang.ua ? 'uk' : 'en'} className="!scroll-smooth">
      <body
        className={`${inter.variable} ${lobsterFont.variable} flex flex-col items-center`}
        suppressHydrationWarning={true}
      >
        <Header />

        <main className="max-w-screen-lg flex-1 flex flex-col justify-around items-center p-1 sm:p-4">
          {children}
        </main>

        <FlyingDigits />
      </body>
    </html>
  );
}
