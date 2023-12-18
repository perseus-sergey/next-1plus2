import { NUMBER_OF_EXERCISES } from '@/libs/exercises/math';
import { TMinusPlus } from '../ExercisePage/ExercisePage';
import TextButton from '../TextButton/TextButton';
import styles from './Monitor.module.scss';

interface MonitorProps {
  minusPlus: TMinusPlus;
  n1: number;
  n2: number;
  answer: number;
  arrExsLength: number;
  isDelBtnActive?: boolean;
}

const Monitor = ({
  minusPlus,
  n1,
  n2,
  answer,
  arrExsLength = 10,
  isDelBtnActive = true,
}: MonitorProps) => (
  <section className={styles.Monitor} data-testid="Monitor">
    <div className={styles.displayWrapper}>
      <div className={styles.display} id="display">
        {n1 ? (
          <>
            <table className={styles.columnExs} hidden={false}>
              <tbody>
                <tr>
                  <td className={styles.minusPlus} rowSpan={2}>
                    {minusPlus}
                  </td>
                  <td>{n1}</td>
                </tr>
                <tr>
                  <td>{n2}</td>
                </tr>
                <tr>
                  <td colSpan={2}>{answer}</td>
                </tr>
              </tbody>
            </table>

            <div className={styles.displayExercise}>
              <div className={styles.exsLeft}>{n1}</div>
              <div className={styles.exsMp}>{minusPlus}</div>
              <div className={styles.exsCenter}>{n2}</div>
              <div className={styles.exsEqual}>{'='}</div>
              <div className={styles.exsRight}>{answer}</div>
            </div>
          </>
        ) : (
          <span>Loading...</span>
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
        <TextButton className="cancelButton" style={{ padding: '0 1rem' }}>
          {'<<<'}
        </TextButton>
      )}
    </div>
  </section>
);

export default Monitor;
