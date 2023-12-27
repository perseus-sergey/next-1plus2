import styles from './ExercisePart.module.scss';

interface IExercisePartProps {
  hint: string | null;
  value: string | number;
}

const ExercisePart = ({ hint, value }: IExercisePartProps) => (
  <div className={styles.exercisePart} data-testid="ExercisePart">
    <div className={styles.exsMain}>{value}</div>
    {hint && <div className={styles.exsHint}>{hint}</div>}
  </div>
);

export default ExercisePart;
