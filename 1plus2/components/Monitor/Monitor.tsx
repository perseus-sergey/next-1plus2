import { NUMBER_OF_EXERCISES } from '@/libs/exercises/math';
import TextButton from '../TextButton/TextButton';
import styles from './Monitor.module.scss';
import { TMinusPlus, TUnequalMark } from '@/libs/exercises/math.model';

interface MonitorProps {
  minusPlus: TMinusPlus;
  n1: string | number | undefined;
  n2: string | number | undefined;
  rightAnswer: string | number | undefined;
  userAnswer: string;
  equalMark: TUnequalMark;
  askElemNumbers: number[];
  arrExsLength: number;
  clearBtnHandler?: () => void;
  isInequalCat?: boolean;
  isDelBtnActive?: boolean;
}

const Monitor = ({
  minusPlus,
  n1,
  n2,
  rightAnswer,
  userAnswer,
  clearBtnHandler,
  askElemNumbers,
  equalMark = '=',
  arrExsLength = 10,
  isInequalCat = false,
  isDelBtnActive = true,
}: MonitorProps) => {
  return (
    <section className={styles.Monitor} data-testid="Monitor">
      <div className={styles.displayWrapper}>
        <div className={styles.display} id="display">
          {n1 !== undefined ? (
            <>
              <table className={styles.columnExs} hidden={false}>
                <tbody>
                  <tr>
                    <td className={styles.minusPlus} rowSpan={2}>
                      {minusPlus}
                    </td>
                    <td>{askElemNumbers.includes(0) ? userAnswer : n1}</td>
                  </tr>
                  <tr>
                    <td>{askElemNumbers.includes(1) ? userAnswer : n2}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>{askElemNumbers.includes(2) ? userAnswer : rightAnswer}</td>
                  </tr>
                </tbody>
              </table>

              <div className={styles.displayExercise}>
                <div className={styles.exsLeft}>{askElemNumbers.includes(0) ? userAnswer : n1}</div>
                <div className={styles.exsMp}>{minusPlus}</div>
                <div className={styles.exsCenter}>
                  {askElemNumbers.includes(1) ? userAnswer : n2}
                </div>
                <div className={styles.exsEqual}>
                  {isInequalCat && askElemNumbers.includes(2) ? userAnswer : equalMark}
                </div>
                <div className={styles.exsRight}>
                  {!isInequalCat && askElemNumbers.includes(2) ? userAnswer : rightAnswer}
                </div>
                {/* <div className={styles.exsEqual}>{equalMark}</div>
                <div className={styles.exsRight}>
                  {askElemNumbers.includes(2) ? userAnswer : rightAnswer}
                </div> */}
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
          <TextButton
            onClick={clearBtnHandler && clearBtnHandler}
            style={{ padding: '0 1rem', color: 'white' }}
          >
            {'<<<'}
          </TextButton>
        )}
      </div>
    </section>
  );
};

export default Monitor;
