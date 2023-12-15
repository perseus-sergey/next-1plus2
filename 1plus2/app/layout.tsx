import type { Metadata } from 'next';
import './globals.css';
import { ELang, EMetaTypes, EPageTitles, metaMap } from '@/libs/langMessages';
import { Lobster } from 'next/font/google';

const lobsterFont = Lobster({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  display: 'swap',
  variable: '--font-lobster',
});

export const metadata: Metadata = {
  title: metaMap.get(EPageTitles.MAIN)?.[EMetaTypes.TITLE][ELang.ENGLISH],
  description: metaMap.get(EPageTitles.MAIN)?.[EMetaTypes.DESCRIPTION][ELang.ENGLISH],
  keywords: metaMap.get(EPageTitles.MAIN)?.[EMetaTypes.KEYWORDS][ELang.ENGLISH],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={lobsterFont.variable}>{children}</body>
    </html>
  );
}
