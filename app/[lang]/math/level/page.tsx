import MathPageMaxNumber from '@/components/MathPageMaxNumber/MathPageMaxNumber';
import { EExerciseCategories } from '@/libs/exercises/math.model';
import { ELang } from '@/libs/langMessages';

export interface ILevelPageProps {
  params: { lang: ELang };
}

export default ({ params }: ILevelPageProps) => {
  return <MathPageMaxNumber params={{ ...params, cat: EExerciseCategories['level'] }} />;
};
