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

const getLevels = (maxNum: number) => {
  switch (true) {
    case maxNum <= 10:
      return [...categoriesMap.keys()].filter(
        (c) =>
          c !== EExerciseCategories['level'] &&
          c !== EExerciseCategories['equal-over-ten'] &&
          c !== EExerciseCategories['equal-five'] &&
          c !== EExerciseCategories['equal-ten']
      );
    case maxNum <= 20:
      return [...categoriesMap.keys()].filter(
        (c) =>
          c !== EExerciseCategories['level'] &&
          c !== EExerciseCategories['equal-over-ten'] &&
          c !== EExerciseCategories['equal-ten']
      );
    default:
      return [...categoriesMap.keys()].filter(
        (c) => c !== EExerciseCategories['level'] && c !== EExerciseCategories['composition']
      );
  }
};

export interface IExerciseComponentProps {
  lang: ELang;
  chosenMaxNum: number;
  cat: EExerciseCategories;
}

const ExercisePage = ({ cat, chosenMaxNum, lang }: IExerciseComponentProps) => {
  const [levelsArray, setLevelsArray] = useState<EExerciseCategories[] | undefined>([]);
  const [currentCat, setCurrentCat] = useState(EExerciseCategories['equality']);
  const [exerciseArray, setExerciseArray] = useState<(string | number)[][]>([[]]);
  const [exsParams, setExsParams] = useState<IExerciseParams | undefined>();
  const [isLevel] = useState(cat === EExerciseCategories['level']);

  useEffect(() => {
    const ar = isLevel ? getLevels(chosenMaxNum) : [];
    const currCat = isLevel ? ar[0] : cat;

    setExsParams(categoriesMap.get(EExerciseCategories[currCat]));
    setCurrentCat(currCat);
    setLevelsArray(ar);
    setExerciseArray(makeExerciseArray(currCat, chosenMaxNum));
  }, []);

  if (!exerciseArray[0].length || !exerciseArray.length)
    return (
      <h2>
        <Loader />
        Loading...
      </h2>
    );

  return (
    <section data-testid="ExercisePage" style={{ width: '100%' }}>
      {/* levelsArray: {JSON.stringify(levelsArray)} */}
      <LanguageProvider language={lang}>
        <MathLevelProvider levels={levelsArray} isLevel={isLevel}>
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
