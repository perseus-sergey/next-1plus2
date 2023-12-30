import { NUMBER_OF_EXERCISES } from '@/libs/exercises/math';
import TextButton from '../TextButton/TextButton';
import styles from './Monitor.module.scss';
import { TMinusPlus, TUnequalMark } from '@/libs/exercises/math.model';
import { TMathHint } from '@/libs/hooks/useExerciseParams';
import ExercisePart from '../ExercisePart/ExercisePart';
import { EIsRightAnswer } from '../Computer/Computer';
import ColumnExercise from '../ColumnExercise/ColumnExercise';
import { useState } from 'react';

interface MonitorProps {
  exercise: (string | number)[];
  minusPlus: TMinusPlus;
  hint: TMathHint;
  userAnswer: string;
  equalMark: TUnequalMark;
  askElemNumbers: number[];
  arrExsLength: number;
  isRightAnswer: EIsRightAnswer;
  clearBtnHandler?: () => void;
  isColumn: boolean | undefined;
  isInequalCat?: boolean;
  isDelBtnActive?: boolean;
}

const Monitor = ({
  exercise,
  minusPlus,
  hint,
  userAnswer,
  isRightAnswer,
  clearBtnHandler,
  askElemNumbers,
  isColumn,
  equalMark = '=',
  arrExsLength = 10,
  isInequalCat = false,
  isDelBtnActive = true,
}: MonitorProps) => {
  const [exerciseClassNames, setExerciseClassNames] = useState([styles.displayExsButton]);
  const [columnClassName, setColumnClassName] = useState('');

  const { hintN1, hintMinusPlus, hintN2, hintEqual, hintResponse } = hint;
  const n1 = exercise[0];
  const n2 = Math.abs(+exercise[1]);
  const nLast = exercise[exercise.length - 1];

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
          {n1 !== undefined ? (
            <>
              {isColumn && (
                <ColumnExercise
                  clickHandler={columnClick}
                  n1={n1}
                  n2={n2}
                  nLast={nLast}
                  minusPlus={minusPlus}
                  userAnswer={userAnswer}
                  askElemNumbers={askElemNumbers}
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
                <ExercisePart
                  rightValue={n1}
                  hint={hintN1}
                  userAnswer={userAnswer}
                  isQuestionPart={askElemNumbers.includes(0)}
                />
                <ExercisePart
                  rightValue={minusPlus}
                  hint={hintMinusPlus}
                  userAnswer={userAnswer}
                  isQuestionPart={false}
                />
                <ExercisePart
                  rightValue={n2}
                  hint={hintN2}
                  userAnswer={userAnswer}
                  isQuestionPart={askElemNumbers.includes(1)}
                />
                <ExercisePart
                  rightValue={equalMark}
                  hint={hintEqual}
                  userAnswer={userAnswer}
                  isQuestionPart={isInequalCat && askElemNumbers.includes(2)}
                />
                <ExercisePart
                  rightValue={nLast}
                  hint={hintResponse}
                  userAnswer={userAnswer}
                  isQuestionPart={!isInequalCat && askElemNumbers.includes(2)}
                />
              </button>
            </>
          ) : (
            <span>Loading...</span>
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
