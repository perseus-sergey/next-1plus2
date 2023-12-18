import { useState } from 'react';
import styles from './Computer.module.scss';
import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { IExerciseComponentProps } from '../ExercisePage/ExercisePage';
import { useKeyClickedValue } from '@/libs/context/KeyProvider';
import Monitor from '../Monitor/Monitor';
import Keyboard from '../Keyboard/Keyboard';

export interface IComputerProps extends IExerciseComponentProps {
  exerciseArray: number[][];
}

const Computer = ({ lang, exerciseParams, exerciseArray }: IComputerProps) => {
  const [exercises, setExercises] = useState(exerciseArray);
  const { keyClickedValue } = useKeyClickedValue();

  const enterClickHandler = () => {
    if (!exercises.length) return;
    const [, ...rest] = exercises;
    setExercises(rest);
  };

  if (!lang || !exerciseParams) return <h2>Loading...</h2>;
  if (!exercises.length) return <h2>EOA</h2>;

  return (
    <section className={styles.Computer} data-testid="Computer">
      <Monitor
        n1={exercises[0][0]}
        n2={Math.abs(exercises[0][1])}
        minusPlus={exercises[0][1] > 0 ? '+' : '-'}
        // answer={exercises[0][2]}
        answer={keyClickedValue || '?'}
        arrExsLength={exercises.length}
        isDelBtnActive={!!Number(exerciseParams.keyboardKeys[0])}
      />
      <Keyboard
        keyboardKeys={exerciseParams.keyboardKeys}
        enterBtnTitle={getTitleFromMap(EMessageNames.BTN_ENTER, lang)}
        enterClickHandler={enterClickHandler}
      />
    </section>
  );
};

export default Computer;
