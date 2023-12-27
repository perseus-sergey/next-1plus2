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
}: IExercisePartProps) => (
  <div className={styles.exercisePart} data-testid="ExercisePart">
    <div className={isQuestionPart ? styles.exsAskPart : styles.exsMain}>
      {isQuestionPart ? userAnswer : rightValue}
    </div>
    {!isQuestionPart && hint ? <div className={styles.exsHint}>{hint}</div> : null}
  </div>
);
export default ExercisePart;
