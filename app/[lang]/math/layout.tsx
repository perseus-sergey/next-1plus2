import type { Metadata } from 'next';
import { ELang, EMetaTypes, EPageTitles, metaMap } from '@/libs/langMessages';

export const generateMetadata = ({ params: { lang } }: { params: { lang: ELang } }): Metadata => ({
  title: metaMap.get(EPageTitles.MATH)?.[EMetaTypes.TITLE][lang],
  description: metaMap.get(EPageTitles.MATH)?.[EMetaTypes.DESCRIPTION][lang],
  keywords: metaMap.get(EPageTitles.MATH)?.[EMetaTypes.KEYWORDS][lang],
  alternates: {
    canonical: `${lang}/math`,
  },
});

export function generateStaticParams(): {
  lang: ELang;
}[] {
  return Object.values(ELang).map((slug) => ({ lang: slug }));
}

export default ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const dynamicParams = false;
