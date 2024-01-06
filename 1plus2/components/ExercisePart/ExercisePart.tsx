import { useEffect, useState } from 'react';
import styles from './ExercisePart.module.scss';

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

  useEffect(() => {
    setPartStyle((arr) => arr.filter((a) => a !== styles.move));
  }, [userAnswer]);

  useEffect(() => {
    setPartStyle((arr) => [...arr, styles.move]);
  }, [rightValue]);

  return (
    <div className={partStyle.join(' ')} data-testid="ExercisePart">
      <div className={isQuestionPart ? `${styles.exsAskPart} ${styles.exsMain}` : styles.exsMain}>
        {isQuestionPart ? userAnswer : rightValue}
      </div>
      {!isQuestionPart && hint ? <div className={styles.exsHint}>{hint}</div> : null}
    </div>
  );
};
export default ExercisePart;
