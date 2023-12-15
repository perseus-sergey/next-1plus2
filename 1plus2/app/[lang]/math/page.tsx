import MathPageComponent from '@/components/MathPageComponent/MathPageComponent';
import { ELang, EMetaTypes, EPageTitles, metaMap } from '@/libs/langMessages';
import { Metadata } from 'next';

export interface IMathPageProps {
  params: { lang: ELang };
}

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

export default function MathPage(props: IMathPageProps) {
  return <MathPageComponent {...props} />;
}

export const dynamicParams = false;
