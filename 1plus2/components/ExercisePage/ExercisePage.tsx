'use client';

import { useEffect, useState } from 'react';
import { ELang } from '@/libs/langMessages';
import { makeExerciseArray } from '@/libs/exercises/math';
import MathLevelProvider from '@/libs/context/MathLevelProvider';
import Computer from '../Computer/Computer';
import { EExerciseCategories, IExerciseParams, categoriesMap } from '@/libs/exercises/math.model';
import MathExercisesProvider from '@/libs/context/MathExercisesProvider';
import LanguageProvider from '@/libs/context/LangProvider';
import { useRouter } from 'next/navigation';

export interface IExerciseComponentProps {
  lang: ELang;
  chosenMaxNum: number;
  cat: EExerciseCategories;
  urlCurrentLevelCat: EExerciseCategories | undefined;
}

const ExercisePage = ({ urlCurrentLevelCat, cat, chosenMaxNum, lang }: IExerciseComponentProps) => {
  const router = useRouter();

  const [levelsArray, setLevelsArray] = useState<EExerciseCategories[]>([]);
  const [currentCat, setCurrentCat] = useState(EExerciseCategories['equality']);
  const [exerciseArray, setExerciseArray] = useState<(string | number)[][]>([[]]);
  const [exsParams, setExsParams] = useState<IExerciseParams | undefined>();

  useEffect(() => {
    const ar = [...categoriesMap.keys()];
    const startInd = ar.findIndex((c) => c === urlCurrentLevelCat);
    const levels = ar.slice(Math.max(startInd, 0));

    if (cat === EExerciseCategories['level'] && !urlCurrentLevelCat)
      return router.replace(`/${lang}/math/level/${chosenMaxNum}/${levels[0]}`);

    const currCat = cat === EExerciseCategories['level'] ? levels[0] : cat;

    setExsParams(categoriesMap.get(EExerciseCategories[currCat]));
    setCurrentCat(currCat);
    setLevelsArray(levels);
    setExerciseArray(makeExerciseArray(currCat, chosenMaxNum));
  }, []);

  if (!exerciseArray[0].length || !exerciseArray.length) return <h2>Loading...</h2>;

  // TODO: urlCurrentLevelCat?
  return (
    <section data-testid="ExercisePage" style={{ width: '100%' }}>
      {JSON.stringify(exerciseArray)}
      <LanguageProvider language={lang}>
        <MathLevelProvider levels={levelsArray}>
          <MathExercisesProvider
            cat={currentCat}
            chosenMaxNum={chosenMaxNum}
            exercisesArray={exerciseArray}
            exerciseParams={exsParams}
          >
            <Computer />
          </MathExercisesProvider>
        </MathLevelProvider>
      </LanguageProvider>
    </section>
  );
};

export default ExercisePage;
