import React from 'react';

import styles from './ColumnExercise.module.scss';

import { IExsPart } from '@/libs/exercises/math';
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
    <button type="button" onClick={clickHandler} className={className} data-testid="ColumnExercise">
      <table className={styles.columnTable}>
        <tbody>
          <tr>
            <td className="pr-2" rowSpan={2}>
              {exerciseParts[1].value}
            </td>
            {exerciseParts[0].isQuestionPart ? (
              <td className={`text-blue-300 ${isOverDropZone ? ` ${styles.overDropZone}` : ''}`}>
                {userAnswer}
              </td>
            ) : (
              <td>{exerciseParts[0].value}</td>
            )}
          </tr>
          <tr>
            {exerciseParts[2].isQuestionPart ? (
              <td className={`text-blue-300 ${isOverDropZone ? ` ${styles.overDropZone}` : ''}`}>
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
                className={`text-blue-300 ${isOverDropZone ? ` ${styles.overDropZone}` : ''}`}
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
