import ExercisePage from '@/components/ExercisePage/ExercisePage';
import { ELang, categoriesMap } from '@/libs/langMessages';

export interface IExercisePageProps {
  params: { lang: ELang; cat: string; maxNum: string };
}

export default ({ params }: IExercisePageProps) => {
  if (!ELang[params.lang]) return <h1>Wrong Language</h1>;

  const exerciseParams = categoriesMap.get(params.cat);
  if (!exerciseParams) return <h1>Wrong Category</h1>;

  const chosenMaxNum = +params.maxNum;
  if (
    !chosenMaxNum ||
    chosenMaxNum < exerciseParams.exercise.start ||
    chosenMaxNum > exerciseParams.exercise.max
  )
    return <h1>Wrong Max Number of Exercise</h1>;

  return (
    <ExercisePage lang={params.lang} exerciseParams={exerciseParams} chosenMaxNum={chosenMaxNum} />
  );
};
