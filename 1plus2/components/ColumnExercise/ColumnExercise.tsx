import { TMinusPlus } from '@/libs/exercises/math.model';
import styles from './ColumnExercise.module.scss';

interface IColumnExerciseProps {
  n1: string | number;
  n2: number;
  nLast: string | number;
  userAnswer: string;
  minusPlus: TMinusPlus;
  askElemNumbers: number[];
}

const ColumnExercise = ({
  n1,
  n2,
  nLast,
  userAnswer,
  minusPlus,
  askElemNumbers,
}: IColumnExerciseProps) => (
  <button type="button" className={styles.ColumnExsBtn} data-testid="ColumnExercise">
    <table className={styles.columnExs}>
      <tbody>
        <tr>
          <td className={styles.minusPlus} rowSpan={2}>
            {minusPlus}
          </td>
          {askElemNumbers.includes(0) ? (
            <td className={styles.exsAskPart}>{userAnswer}</td>
          ) : (
            <td>{n1}</td>
          )}
        </tr>
        <tr>
          {askElemNumbers.includes(1) ? (
            <td className={styles.exsAskPart}>{userAnswer}</td>
          ) : (
            <td>{n2}</td>
          )}
        </tr>
        <tr>
          {askElemNumbers.includes(2) ? (
            <td colSpan={2} className={styles.exsAskPart}>
              {userAnswer}
            </td>
          ) : (
            <td colSpan={2}>{nLast}</td>
          )}
        </tr>
      </tbody>
    </table>
  </button>
);

export default ColumnExercise;
