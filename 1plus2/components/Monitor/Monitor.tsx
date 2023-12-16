import { TMinusPlus } from '../ExercisePage/ExercisePage';
import TextButton from '../TextButton/TextButton';
import styles from './Monitor.module.scss';

interface MonitorProps {
  minusPlus: TMinusPlus;
  n1: number;
  n2: number;
  answer: number;
  isDelBtnActive?: boolean;
}

const Monitor = ({ minusPlus, n1, n2, answer, isDelBtnActive = true }: MonitorProps) => (
  <section className={styles.Monitor} data-testid="Monitor">
    <div className={styles.displayWrapper}>
      <div className={styles.display} id="display">
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
      </div>
    </div>
    <div className={styles.infoBlock}>
      <div className={styles.progressBlock}>
        <div className={styles.progressBar}>progress..</div>
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
