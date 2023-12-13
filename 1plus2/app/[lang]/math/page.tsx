import MathPageComponent from '@/components/MathPageComponent/MathPageComponent';
import { TLang } from '@/libs/langMessages';

export async function generateStaticParams(): Promise<
  {
    lang: TLang;
  }[]
> {
  return [{ lang: 'en' }, { lang: 'ua' }];
}

export interface IMathPageProps {
  params: { lang: TLang };
}

export default function MathPage(props: IMathPageProps) {
  return <MathPageComponent {...props} />;
}

export const dynamicParams = false;
