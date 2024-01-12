import { IExsPart, NUMBER_OF_EXERCISES } from '@/libs/exercises/math';
import TextButton from '../TextButton/TextButton';
import styles from './Monitor.module.scss';
import ExercisePart from '../ExercisePart/ExercisePart';
import ColumnExercise from '../ColumnExercise/ColumnExercise';
import React, { useEffect, useReducer, useRef } from 'react';
import { Loader } from '../loaders/Loader';
import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { useLangProvider } from '@/libs/context/LangProvider';
import { EIsRightAnswer } from '../ExercisePage/ExercisePage';
import { useDragProvider } from '@/libs/context/DragProvider';
import { addRemoveClassName } from '@/libs/utils';

const addSmallExsClassReducer = (oldArr: string[], isAdd: boolean) =>
  addRemoveClassName(oldArr, styles.smallExercise, isAdd);

const addBigColumnClassReducer = (oldArr: string[], isAdd: boolean) =>
  addRemoveClassName(oldArr, styles.bigColumn, isAdd);

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
  const [exsClassNames, addSmallExsClass] = useReducer(addSmallExsClassReducer, [
    styles.displayExsButton,
  ]);
  const [columnClassNames, addBigColumnClass] = useReducer(addBigColumnClassReducer, []);
  const { language } = useLangProvider();
  const { setIsColumn, setDropZoneRect, draggedValue, dropZoneRect } = useDragProvider();

  const reference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (draggedValue === '') return;
    const el = reference.current;
    if (!el) return;
    const rec = el.getBoundingClientRect();
    console.log('🚀 ~ file: Monitor.tsx:55 ~ useEffect ~ rec:', rec.bottom);
    setDropZoneRect(rec);
  }, [setDropZoneRect, draggedValue]);

  const exerciseClick = () => {
    if (columnClassNames.includes(styles.bigColumn)) {
      addBigColumnClass(false);
      addSmallExsClass(false);
      setIsColumn(false);
    }
  };

  const columnClick = () => {
    if (!columnClassNames.includes(styles.bigColumn)) {
      addBigColumnClass(true);
      addSmallExsClass(true);
      setIsColumn(true);
    }
  };

  return (
    <section className={styles.Monitor} data-testid="Monitor">
      {dropZoneRect?.bottom}
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
        <div ref={reference} className={styles.display}>
          {exerciseParts[0] !== undefined ? (
            <>
              {isColumn && (
                <ColumnExercise
                  clickHandler={columnClick}
                  exerciseParts={exerciseParts}
                  userAnswer={userAnswer}
                  className={columnClassNames.join(' ')}
                />
              )}

              <button
                onClick={exerciseClick}
                type="button"
                className={
                  isRightAnswer === EIsRightAnswer.BAD
                    ? [...exsClassNames, styles.badAnswer].join(' ')
                    : isRightAnswer === EIsRightAnswer.RIGHT
                      ? [...exsClassNames, styles.properAnswer].join(' ')
                      : exsClassNames.join(' ')
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
