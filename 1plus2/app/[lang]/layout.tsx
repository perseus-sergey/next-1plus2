import type { Metadata } from 'next';
import { ELang, EMetaTypes, EPageTitles, metaMap } from '@/libs/langMessages';

export interface IMathPageProps {
  params: { lang: ELang };
}

export const generateMetadata = ({ params }: IMathPageProps): Metadata => ({
  title: metaMap.get(EPageTitles.MAIN)?.[EMetaTypes.TITLE][params.lang],
  description: metaMap.get(EPageTitles.MAIN)?.[EMetaTypes.DESCRIPTION][params.lang],
  keywords: metaMap.get(EPageTitles.MAIN)?.[EMetaTypes.KEYWORDS][params.lang],
});

export default ({ children }: { children: React.ReactNode }) => <>{children}</>;
