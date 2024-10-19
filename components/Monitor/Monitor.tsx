import React, { useEffect, useRef } from 'react';

import { IExsPart } from '@/libs/exercises/math';
import TextButton from '../TextButton/TextButton';
import styles from './Monitor.module.scss';
import ExercisePart from '../ExercisePart/ExercisePart';
import ColumnExercise from '../ColumnExercise/ColumnExercise';
import { Loader } from '../loaders/Loader';
import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { useLangProvider } from '@/libs/context/LangProvider';
import { EIsRightAnswer } from '../ExercisePage/ExercisePage';
import { useDragProvider } from '@/libs/context/DragProvider';
import { NUMBER_OF_EXERCISES } from '@/models/math/math.model';

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
  const { language } = useLangProvider();
  const { setIsColumn, isColumn: isBigColumn, setDropZoneRect, draggedValue } = useDragProvider();

  const reference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (draggedValue === '') return;
    const el = reference.current;
    if (!el) return;
    setDropZoneRect(el.getBoundingClientRect());
  }, [setDropZoneRect, draggedValue]);

  const exerciseClick = () => {
    setIsColumn(false);
  };

  const columnClick = () => {
    setIsColumn(true);
  };

  return (
    <section className={styles.Monitor} data-testid="Monitor">
      <div
        className="flex justify-between p-1 sm:p-2 sm:text-xl"
        style={{ textShadow: '1px 1px 1px #000000' }}
      >
        <span className="text-blue-100">{`${getTitleFromMap(
          EMessageNames.LEFT_EXS_NUM_MSG,
          language
        )}: ${arrExsLength}`}</span>
        {!!mistakes && (
          <span className="text-red-300">
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
                  className={`
                    ${isBigColumn ? 'text-4xl font-bold ml-8' : 'text-xs font-normal m-0'} 
                    ${isRightAnswer === EIsRightAnswer.BAD ? 'text-red-400' : isRightAnswer === EIsRightAnswer.RIGHT ? 'text-green-200' : ''}
                    duration-300 border-none outline-none bg-none px-2 sm:px-8`}
                />
              )}

              <button
                onClick={exerciseClick}
                type="button"
                className={`
                ${isBigColumn ? 'text-xs font-normal' : 'text-4xl font-bold'} 
                ${isRightAnswer === EIsRightAnswer.BAD ? 'text-red-400' : isRightAnswer === EIsRightAnswer.RIGHT ? 'text-green-200' : ''} 
                flex gap-2 sm:gap-4 pl-4 border-none outline-none bg-none duration-300`}
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
