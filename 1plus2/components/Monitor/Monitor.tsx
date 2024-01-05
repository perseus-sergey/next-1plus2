import { IExsPart, NUMBER_OF_EXERCISES } from '@/libs/exercises/math';
import TextButton from '../TextButton/TextButton';
import styles from './Monitor.module.scss';
import ExercisePart from '../ExercisePart/ExercisePart';
import { EIsRightAnswer } from '../Computer/Computer';
import ColumnExercise from '../ColumnExercise/ColumnExercise';
import { useState } from 'react';
import { useExercisesProvider } from '@/libs/context/MathExercisesProvider';
import { Loader } from '../loaders/Loader';

interface MonitorProps {
  exerciseParts: IExsPart[];
  userAnswer: string;
  arrExsLength: number;
  isRightAnswer: EIsRightAnswer;
  clearBtnHandler?: () => void;
  // isColumn: boolean | undefined;
  isDelBtnActive?: boolean;
}

const Monitor = ({
  exerciseParts,
  userAnswer,
  isRightAnswer,
  clearBtnHandler,
  arrExsLength = 10,
  isDelBtnActive = true,
}: MonitorProps) => {
  const [exerciseClassNames, setExerciseClassNames] = useState([styles.displayExsButton]);
  const [columnClassName, setColumnClassName] = useState('');
  const { exsParams } = useExercisesProvider();

  const exerciseClick = () => {
    if (columnClassName === styles.bigColumn) {
      setColumnClassName('');
      setExerciseClassNames(exerciseClassNames.filter((cl) => cl !== styles.smallExercise));
    }
  };

  const columnClick = () => {
    if (!columnClassName) {
      setColumnClassName(styles.bigColumn);
      setExerciseClassNames([...exerciseClassNames, styles.smallExercise]);
    }
  };

  return (
    <section className={styles.Monitor} data-testid="Monitor">
      <div className={styles.displayWrapper}>
        <div className={styles.display} id="display">
          {exerciseParts[0] !== undefined ? (
            <>
              {exsParams?.isColumn && (
                <ColumnExercise
                  clickHandler={columnClick}
                  exerciseParts={exerciseParts}
                  userAnswer={userAnswer}
                  className={columnClassName}
                />
              )}

              <button
                onClick={exerciseClick}
                type="button"
                className={
                  isRightAnswer === EIsRightAnswer.BAD
                    ? [...exerciseClassNames, styles.badAnswer].join(' ')
                    : isRightAnswer === EIsRightAnswer.RIGHT
                      ? [...exerciseClassNames, styles.properAnswer].join(' ')
                      : exerciseClassNames.join(' ')
                }
              >
                {exerciseParts.map(({ value, hint, isQuestionPart }, indx) => (
                  <ExercisePart
                    key={indx}
                    rightValue={value}
                    hint={hint}
                    userAnswer={userAnswer}
                    isQuestionPart={isQuestionPart}
                  />
                ))}
              </button>
            </>
          ) : (
            <span>
              <Loader /> Loading...
            </span>
          )}
        </div>
      </div>
      <div className={styles.infoBlock}>
        <div className={styles.progressBlock}>
          <div
            className={styles.progressBar}
            style={{ width: `${Math.min((arrExsLength / NUMBER_OF_EXERCISES) * 100, 100)}%` }}
          >
            progress..
          </div>
        </div>
        {isDelBtnActive && (
          <TextButton onClick={clearBtnHandler && clearBtnHandler} className={styles.clearButton}>
            {'<<<'}
          </TextButton>
        )}
      </div>
    </section>
  );
};

export default Monitor;
