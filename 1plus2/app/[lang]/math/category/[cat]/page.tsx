import MathPageMaxNumber from '@/components/MathPageMaxNumber/MathPageMaxNumber';
import { ELang } from '@/libs/langMessages';

export interface ICatNamePageProps {
  params: { lang: ELang; cat: string };
}

export default (props: ICatNamePageProps) => {
  return <MathPageMaxNumber {...props} />;
};
