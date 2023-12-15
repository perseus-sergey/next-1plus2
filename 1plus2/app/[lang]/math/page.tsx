import MathPageComponent from '@/components/MathPageComponent/MathPageComponent';
import { ELang, getMetaFromMap } from '@/libs/langMessages';
import { Metadata } from 'next';

export interface IMathPageProps {
  params: { lang: ELang };
}

export const generateMetadata = ({ params }: IMathPageProps): Metadata => ({
  title: '1plus2 | Math',
  description: getMetaFromMap('pageDescriptionMath', params.lang),
  keywords: getMetaFromMap('pageKeywordsMath', params.lang),
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
