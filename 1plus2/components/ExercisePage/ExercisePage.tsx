'use client';

import { useEffect, useState } from 'react';
import { ELang } from '@/libs/langMessages';
import { makeExerciseArray } from '@/libs/exercises/math';
import MathLevelProvider from '@/libs/context/MathLevelProvider';
import Computer from '../Computer/Computer';
import { EExerciseCategories, IExerciseParams, categoriesMap } from '@/libs/exercises/math.model';
import MathExercisesProvider from '@/libs/context/MathExercisesProvider';
import LanguageProvider from '@/libs/context/LangProvider';
import { Loader } from '../loaders/Loader';

export interface IExerciseComponentProps {
  lang: ELang;
  chosenMaxNum: number;
  cat: EExerciseCategories;
  levels?: EExerciseCategories[];
}

const ExercisePage = ({ cat, chosenMaxNum, lang, levels = [] }: IExerciseComponentProps) => {
  const [currentCat, setCurrentCat] = useState(EExerciseCategories['equality']);
  const [exerciseArray, setExerciseArray] = useState<(string | number)[][]>([[]]);
  const [exsParams, setExsParams] = useState<IExerciseParams | undefined>();
  const [isLevel] = useState(cat === EExerciseCategories['level']);

  useEffect(() => {
    const currCat = isLevel ? levels[0] : cat;

    setExsParams(categoriesMap.get(EExerciseCategories[currCat]));
    setCurrentCat(currCat);
    setExerciseArray(makeExerciseArray(currCat, chosenMaxNum));
  }, [cat, chosenMaxNum, isLevel]);

  if (!exerciseArray[0].length || !exerciseArray.length)
    return (
      <h2>
        <Loader />
        Loading...
      </h2>
    );

  return (
    <section data-testid="ExercisePage" style={{ width: '100%' }}>
      <LanguageProvider language={lang}>
        <MathLevelProvider levels={levels} isLevel={isLevel}>
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
