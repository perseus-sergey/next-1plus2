import MathPageMaxNumber from '@/components/MathPageMaxNumber/MathPageMaxNumber';
import { EExerciseCategories } from '@/libs/exercises/math.model';
import { ELang } from '@/libs/langMessages';

export interface ICatNamePageProps {
  params: { lang: ELang; cat: EExerciseCategories };
}

export default (props: ICatNamePageProps) => {
  return <MathPageMaxNumber {...props} />;
};
