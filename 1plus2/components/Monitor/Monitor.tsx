import { IExsPart, NUMBER_OF_EXERCISES } from '@/libs/exercises/math';
import TextButton from '../TextButton/TextButton';
import styles from './Monitor.module.scss';
import ExercisePart from '../ExercisePart/ExercisePart';
import ColumnExercise from '../ColumnExercise/ColumnExercise';
import React, { useState } from 'react';
import { Loader } from '../loaders/Loader';
import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { useLangProvider } from '@/libs/context/LangProvider';
import { EIsRightAnswer } from '../ExercisePage/ExercisePage';

interface MonitorProps {
  exerciseParts: IExsPart[];
  userAnswer: string;
  arrExsLength: number;
  isRightAnswer: EIsRightAnswer;
  mistakes: number;
  isColumn: boolean | undefined;
  clearBtnHandler?: () => void;
  isDelBtnActive?: boolean;
}

const Monitor = ({
  exerciseParts,
  userAnswer,
  isRightAnswer,
  mistakes,
  clearBtnHandler,
  arrExsLength,
  isColumn = false,
  isDelBtnActive = true,
}: MonitorProps) => {
  const [exerciseClassNames, setExerciseClassNames] = useState([styles.displayExsButton]);
  const [columnClassName, setColumnClassName] = useState('');
  const { language } = useLangProvider();

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
      <div className={styles.monitorHeader}>
        <span className={styles.exsQuant}>{`${getTitleFromMap(
          EMessageNames.LEFT_EXS_NUM_MSG,
          language
        )}: ${arrExsLength}`}</span>
        {!!mistakes && (
          <span className={styles.mistakeQuant}>
            {`${getTitleFromMap(EMessageNames.MISTAKES, language)}: ${mistakes}`}
          </span>
        )}
      </div>
      <div className={styles.displayWrapper}>
        <div className={styles.display} id="display">
          {exerciseParts[0] !== undefined ? (
            <>
              {isColumn && (
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

export default React.memo(Monitor);
