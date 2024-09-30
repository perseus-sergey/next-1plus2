import { IExsPart } from '@/libs/exercises/math';
import styles from './ColumnExercise.module.scss';
import React from 'react';
import { useDragProvider } from '@/libs/context/DragProvider';

interface IColumnExerciseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  clickHandler: () => void;
  exerciseParts: IExsPart[];
  userAnswer: string;
}

const ColumnExercise = ({
  clickHandler,
  exerciseParts,
  userAnswer,
  className,
}: IColumnExerciseProps) => {
  const { isOverDropZone } = useDragProvider();

  return (
    <button
      type="button"
      onClick={clickHandler}
      className={className ? `${styles.ColumnExsBtn} ${className}` : styles.ColumnExsBtn}
      data-testid="ColumnExercise"
    >
      <table className={styles.columnTable}>
        <tbody>
          <tr>
            <td className={styles.minusPlus} rowSpan={2}>
              {exerciseParts[1].value}
            </td>
            {exerciseParts[0].isQuestionPart ? (
              <td
                className={`${styles.exsAskPart}${isOverDropZone ? ` ${styles.overDropZone}` : ''}`}
              >
                {userAnswer}
              </td>
            ) : (
              <td>{exerciseParts[0].value}</td>
            )}
          </tr>
          <tr>
            {exerciseParts[2].isQuestionPart ? (
              <td
                className={`${styles.exsAskPart}${isOverDropZone ? ` ${styles.overDropZone}` : ''}`}
              >
                {userAnswer}
              </td>
            ) : (
              <td>{exerciseParts[2].value}</td>
            )}
          </tr>
          <tr>
            {exerciseParts[4].isQuestionPart ? (
              <td
                colSpan={2}
                className={`${styles.exsAskPart}${isOverDropZone ? ` ${styles.overDropZone}` : ''}`}
              >
                {userAnswer}
              </td>
            ) : (
              <td colSpan={2}>{exerciseParts[4].value}</td>
            )}
          </tr>
        </tbody>
      </table>
    </button>
  );
};

export default React.memo(ColumnExercise);
