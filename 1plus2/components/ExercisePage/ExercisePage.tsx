'use client';

import { useEffect, useState } from 'react';
import { ELang } from '@/libs/langMessages';
import { makeExerciseArray } from '@/libs/exercises/math';
// import KeyClickedProvider from '@/libs/context/KeyProvider';
import Computer from '../Computer/Computer';
import { IExerciseParams } from '@/libs/exercises/math.model';

export interface IExerciseComponentProps {
  lang: ELang;
  exerciseParams: IExerciseParams;
  chosenMaxNum: number;
}

const ExercisePage = (props: IExerciseComponentProps) => {
  const [exerciseArray, setExerciseArray] = useState<number[][]>([[]]);

  useEffect(() => {
    setExerciseArray(makeExerciseArray(props.chosenMaxNum));
  }, [props.chosenMaxNum]);

  if (!exerciseArray[0].length) return <h2>Loading...</h2>;

  return (
    <section data-testid="ExercisePage">
      {/* <KeyClickedProvider> */}
      <Computer {...props} exerciseArray={exerciseArray} />
      {/* </KeyClickedProvider> */}
    </section>
  );
};

export default ExercisePage;
