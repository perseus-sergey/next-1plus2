'use client';

import { useEffect, useState } from 'react';
import { ELang } from '@/libs/langMessages';
import { makeExerciseArray } from '@/libs/exercises/math';
import MathLevelProvider from '@/libs/context/MathLevelProvider';
import Computer from '../Computer/Computer';
import { EExerciseCategories, IExerciseParams, categoriesMap } from '@/libs/exercises/math.model';
import MathExercisesProvider from '@/libs/context/MathExercisesProvider';
import LanguageProvider from '@/libs/context/LangProvider';

export interface IExerciseComponentProps {
  lang: ELang;
  chosenMaxNum: number;
  cat: EExerciseCategories;
}

const ExercisePage = ({ cat, chosenMaxNum, lang }: IExerciseComponentProps) => {
  const [levelsArray, setLevelsArray] = useState<EExerciseCategories[]>([]);
  const [currentCat, setCurrentCat] = useState(EExerciseCategories['equality']);
  const [exerciseArray, setExerciseArray] = useState<(string | number)[][]>([[]]);
  const [exsParams, setExsParams] = useState<IExerciseParams | undefined>();

  useEffect(() => {
    const ar = [...categoriesMap.keys()];

    const currCat = cat === EExerciseCategories['level'] ? ar[0] : cat;

    setExsParams(categoriesMap.get(EExerciseCategories[currCat]));
    setCurrentCat(currCat);
    setLevelsArray(ar);
    setExerciseArray(makeExerciseArray(currCat, chosenMaxNum));
  }, []);

  if (!exerciseArray[0].length || !exerciseArray.length) return <h2>Loading...</h2>;

  return (
    <section data-testid="ExercisePage" style={{ width: '100%' }}>
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
