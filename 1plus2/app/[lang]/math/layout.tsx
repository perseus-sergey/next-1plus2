import type { Metadata } from 'next';
import { ELang, EMetaTypes, EPageTitles, metaMap } from '@/libs/langMessages';
import { IMathPageProps } from '../layout';

export const generateMetadata = ({ params }: IMathPageProps): Metadata => ({
  title: metaMap.get(EPageTitles.MATH)?.[EMetaTypes.TITLE][params.lang],
  description: metaMap.get(EPageTitles.MATH)?.[EMetaTypes.DESCRIPTION][params.lang],
  keywords: metaMap.get(EPageTitles.MATH)?.[EMetaTypes.KEYWORDS][params.lang],
});

export function generateStaticParams(): {
  lang: ELang;
}[] {
  return Object.values(ELang).map((slug) => ({ lang: slug }));
}

export default ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const dynamicParams = false;
