import { IExsPart, NUMBER_OF_EXERCISES } from '@/libs/exercises/math';
import TextButton from '../TextButton/TextButton';
import styles from './Monitor.module.scss';
import ExercisePart from '../ExercisePart/ExercisePart';
import ColumnExercise from '../ColumnExercise/ColumnExercise';
import React, { DragEvent, useState } from 'react';
import { Loader } from '../loaders/Loader';
import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { useLangProvider } from '@/libs/context/LangProvider';
import { EIsRightAnswer } from '../ExercisePage/ExercisePage';
import { useDragProvider } from '@/libs/context/DragProvider';

interface MonitorProps {
  exerciseParts: IExsPart[];
  userAnswer: string;
  arrExsLength: number;
  isRightAnswer: EIsRightAnswer;
  mistakes: number;
  isColumn: boolean | undefined;
  dropHandler: (value: string, isRemove?: boolean) => void;
  clearBtnHandler?: () => void;
  isDelBtnActive?: boolean;
}

const Monitor = ({
  exerciseParts,
  userAnswer,
  isRightAnswer,
  mistakes,
  dropHandler,
  clearBtnHandler,
  arrExsLength,
  isColumn = false,
  isDelBtnActive = true,
}: MonitorProps) => {
  const [exerciseClassNames, setExerciseClassNames] = useState([styles.displayExsButton]);
  const [columnClassName, setColumnClassName] = useState('');
  const { language } = useLangProvider();
  const { draggedValue, setIsDraggable } = useDragProvider();

  const exerciseClick = () => {
    if (columnClassName === styles.bigColumn) {
      setColumnClassName('');
      setExerciseClassNames(exerciseClassNames.filter((cl) => cl !== styles.smallExercise));
      setIsDraggable(false);
    }
  };

  const columnClick = () => {
    if (!columnClassName) {
      setColumnClassName(styles.bigColumn);
      setExerciseClassNames([...exerciseClassNames, styles.smallExercise]);
      setIsDraggable(true);
    }
  };

  const monitorDropHandler = () => {};

  const monitorDragOver = (e: DragEvent<HTMLElement>) => {
    dropHandler(draggedValue);
    e.stopPropagation();
    e.preventDefault();
  };

  const monitorDragLeave = (e: DragEvent<HTMLElement>) => {
    dropHandler(draggedValue, true);

    e.stopPropagation();
    e.preventDefault();
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
        <div
          className={styles.display}
          onDragEnter={monitorDragOver}
          onDragLeave={monitorDragLeave}
          onDrop={monitorDropHandler}
        >
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
