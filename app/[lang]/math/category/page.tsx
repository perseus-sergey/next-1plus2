import MathCategories from '@/components/MathCategories/MathCategories';
import { ELang } from '@/libs/langMessages';

export interface ICatPageProps {
  params: { lang: ELang };
}

export default (props: ICatPageProps) => <MathCategories {...props} />;
