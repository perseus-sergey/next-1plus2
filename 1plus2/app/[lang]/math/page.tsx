import MathPageComponent from '@/components/MathPageComponent/MathPageComponent';
import { TLang, getTitleFromMap } from '@/libs/langMessages';
import { Metadata } from 'next';

export interface IMathPageProps {
  params: { lang: TLang };
}

export const generateMetadata = ({ params }: IMathPageProps): Metadata => ({
  title: '1plus2 | Math',
  description: getTitleFromMap('pageDescriptionMath', params.lang),
  keywords: getTitleFromMap('pageKeywordsMath', params.lang),
});

export function generateStaticParams(): {
  lang: TLang;
}[] {
  return [{ lang: 'en' }, { lang: 'ua' }];
}

export default function MathPage(props: IMathPageProps) {
  return <MathPageComponent {...props} />;
}

export const dynamicParams = false;
