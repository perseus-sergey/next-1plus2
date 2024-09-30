import ExerciseLayout from '@/components/ExerciseLayout/ExerciseLayout';
import WrongSegment from '@/components/WrongSegment/WrongSegment';
import { EExerciseCategories, categoriesMap } from '@/libs/exercises/math.model';
import { ELang } from '@/libs/langMessages';

export interface IExercisePageProps {
  params: { lang: ELang; cat: EExerciseCategories; maxNum: string };
}

export default ({ params }: IExercisePageProps) => {
  const { lang, cat, maxNum } = params;

  if (!ELang[lang])
    return (
      <WrongSegment wrongMessage="Wrong Language" redirectPath="/" btnTitle="Go to start page" />
    );

  const exerciseParams = categoriesMap.get(cat);

  if (!exerciseParams)
    return (
      <WrongSegment
        wrongMessage="Wrong Category"
        redirectPath={`/${lang}/math/category`}
        btnTitle="Choose category"
      />
    );

  const chosenMaxNum = +maxNum;
  if (
    !chosenMaxNum ||
    chosenMaxNum < exerciseParams.exercise.start ||
    chosenMaxNum > exerciseParams.exercise.max
  )
    return (
      <WrongSegment
        wrongMessage="Wrong Max Number of Exercise"
        redirectPath={`/${lang}/math/category/${cat}`}
        btnTitle="Choose Max Number"
      />
    );

  return <ExerciseLayout lang={lang} chosenMaxNum={chosenMaxNum} cat={cat} />;
};
