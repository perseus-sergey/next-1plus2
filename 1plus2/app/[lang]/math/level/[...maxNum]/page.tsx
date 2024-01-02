import ExercisePage from '@/components/ExercisePage/ExercisePage';
import WrongSegment from '@/components/WrongSegment/WrongSegment';
import { EExerciseCategories, categoriesMap } from '@/libs/exercises/math.model';
import { ELang } from '@/libs/langMessages';

export interface IExercisePageProps {
  params: { lang: ELang; maxNum: string[] };
}

export default ({ params }: IExercisePageProps) => {
  const { lang, maxNum } = params;

  if (!ELang[lang])
    return (
      <WrongSegment wrongMessage="Wrong Language" redirectPath="/" btnTitle="Go to start page" />
    );

  const exerciseParams = categoriesMap.get(EExerciseCategories['level']);

  if (!exerciseParams)
    return (
      <WrongSegment
        wrongMessage="Wrong Category"
        redirectPath={`/${lang}/math/level`}
        btnTitle="Choose Level"
      />
    );

  const chosenMaxNum = +maxNum[0];
  if (
    !chosenMaxNum ||
    chosenMaxNum < exerciseParams.exercise.start ||
    chosenMaxNum > exerciseParams.exercise.max
  )
    return (
      <WrongSegment
        wrongMessage="Wrong Max Number of Exercise"
        redirectPath={`/${lang}/math/level`}
        btnTitle="Choose Level"
      />
    );

  const urlCurrentLevelCat: EExerciseCategories | undefined =
    EExerciseCategories[maxNum[1] as EExerciseCategories];
  if (maxNum[1] && !urlCurrentLevelCat)
    return (
      <WrongSegment
        wrongMessage={`Wrong category: ${maxNum[1]}`}
        redirectPath={`/${lang}/math/level`}
        btnTitle="Choose Level"
      />
    );

  return (
    <ExercisePage
      lang={lang}
      chosenMaxNum={chosenMaxNum}
      cat={EExerciseCategories['level']}
      urlCurrentLevelCat={urlCurrentLevelCat}
    />
  );
};
