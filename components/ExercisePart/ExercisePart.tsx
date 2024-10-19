import { useEffect, useState } from 'react';
import styles from './ExercisePart.module.scss';
import { useDragProvider } from '@/libs/context/DragProvider';

interface IExercisePartProps {
  hint: string | null;
  rightValue: string | number | undefined;
  isQuestionPart?: boolean;
  userAnswer?: string;
}

const ExercisePart = ({
  hint,
  rightValue,
  userAnswer,
  isQuestionPart = false,
}: IExercisePartProps) => {
  const [partStyle, setPartStyle] = useState([styles.exercisePart]);

  const { isOverDropZone } = useDragProvider();

  useEffect(() => {
    setPartStyle((arr) => arr.filter((a) => a !== styles.move));
  }, [userAnswer]);

  useEffect(() => {
    setPartStyle((arr) => [...arr, styles.move]);
  }, [rightValue]);

  useEffect(() => {
    setPartStyle((arr) =>
      isQuestionPart && isOverDropZone
        ? [...arr, styles.overDropZone]
        : arr.filter((a) => a !== styles.overDropZone)
    );
  }, [isOverDropZone]);

  return (
    <div className={partStyle.join(' ')} data-testid="ExercisePart">
      <div className={`${isQuestionPart ? `text-blue-300` : ''}`}>
        {isQuestionPart ? userAnswer : rightValue}
      </div>
      {!isQuestionPart && hint ? (
        <div className="text-cyan-300 text-[0.5em] block whitespace-nowrap">{hint}</div>
      ) : null}
    </div>
  );
};
export default ExercisePart;
