import type { Metadata } from 'next';
import './globals.css';
import { getTitleFromMap } from '@/libs/langMessages';

export const metadata: Metadata = {
  title: '1plus2 Fan',
  description: getTitleFromMap('pageDescriptionMain'),
  keywords: getTitleFromMap('pageKeywordsMain'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
