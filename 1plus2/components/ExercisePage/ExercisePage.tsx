'use client';

import { useEffect, useState } from 'react';
import { ELang } from '@/libs/langMessages';
import { makeExerciseArray } from '@/libs/exercises/math';
import MathLevelProvider from '@/libs/context/MathLevelProvider';
import Computer from '../Computer/Computer';
import { EExerciseCategories, IExerciseParams, categoriesMap } from '@/libs/exercises/math.model';

export interface IExerciseComponentProps {
  lang: ELang;
  chosenMaxNum: number;
  cat: EExerciseCategories;
  urlCurrentCat: EExerciseCategories | undefined;
}

const ExercisePage = (props: IExerciseComponentProps) => {
  const [levelsArray, setLevelsArray] = useState<EExerciseCategories[]>([]);
  const [currentCat, setCurrentCat] = useState(EExerciseCategories['equality']);
  const [exerciseArray, setExerciseArray] = useState<(string | number)[][]>([[]]);
  const [exerciseParams, setExerciseParams] = useState<IExerciseParams>();

  const { urlCurrentCat, cat, chosenMaxNum } = props;

  useEffect(() => {
    const ar = [...categoriesMap.keys()];
    const startInd = ar.findIndex((c) => c === urlCurrentCat);
    const levels = ar.slice(Math.max(startInd, 0));
    console.log('🚀 ~ file: ExercisePage.tsx:29 ~ useEffect ~ levels:', levels);
    const currCat = cat === EExerciseCategories['level'] ? levels[0] : cat;

    setExerciseParams(categoriesMap.get(EExerciseCategories[currCat]));
    setCurrentCat(currCat);
    setLevelsArray(levels);
    setExerciseArray(makeExerciseArray(currCat, chosenMaxNum));
  }, []);

  if (!exerciseArray[0].length || !exerciseArray.length) return <h2>Loading...</h2>;

  return (
    <section data-testid="ExercisePage" style={{ width: '100%' }}>
      {JSON.stringify(exerciseArray)}
      <MathLevelProvider levels={levelsArray}>
        <Computer
          {...props}
          exerciseParams={exerciseParams}
          cat={currentCat}
          exerciseArray={exerciseArray}
        />
      </MathLevelProvider>
    </section>
  );
};

export default ExercisePage;
