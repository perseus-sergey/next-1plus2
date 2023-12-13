import MathCategories from '@/components/MathCategories/MathCategories';
import { TLang } from '@/libs/langMessages';

export interface ICatPageProps {
  params: { lang: TLang };
}

export default function CatPage(props: ICatPageProps) {
  return <MathCategories {...props} />;
}
