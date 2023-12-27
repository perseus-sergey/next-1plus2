import type { Metadata } from 'next';
import './globals.scss';
import { ELang, EMetaTypes, EPageTitles, SITE_BASE_URL, metaMap } from '@/libs/langMessages';
import { Lobster } from 'next/font/google';

const lobsterFont = Lobster({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  display: 'swap',
  variable: '--font-lobster',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_BASE_URL),
  title: metaMap.get(EPageTitles.MAIN)?.[EMetaTypes.TITLE][ELang.en],
  description: metaMap.get(EPageTitles.MAIN)?.[EMetaTypes.DESCRIPTION][ELang.en],
  keywords: metaMap.get(EPageTitles.MAIN)?.[EMetaTypes.KEYWORDS][ELang.en],
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      uk: '/ua',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={lobsterFont.variable}>{children}</body>
    </html>
  );
}
