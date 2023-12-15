import type { Metadata } from 'next';
import './globals.css';
import { getMetaFromMap } from '@/libs/langMessages';
import { Lobster } from 'next/font/google';

const lobsterFont = Lobster({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  display: 'swap',
  variable: '--font-lobster',
});

export const metadata: Metadata = {
  title: '1plus2 Fan',
  description: getMetaFromMap('pageDescriptionMain'),
  keywords: getMetaFromMap('pageKeywordsMain'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={lobsterFont.variable}>{children}</body>
    </html>
  );
}
