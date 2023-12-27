import { NUMBER_OF_EXERCISES } from '@/libs/exercises/math';
import TextButton from '../TextButton/TextButton';
import styles from './Monitor.module.scss';
import { TMinusPlus, TUnequalMark } from '@/libs/exercises/math.model';
import { TMathHint } from '@/libs/hooks/useExerciseParams';
import ExercisePart from '../ExercisePart/ExercisePart';

interface MonitorProps {
  minusPlus: TMinusPlus;
  n1: string | number | undefined;
  n2: string | number | undefined;
  hint: TMathHint;
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
  hint,
  rightAnswer,
  userAnswer,
  clearBtnHandler,
  askElemNumbers,
  equalMark = '=',
  arrExsLength = 10,
  isInequalCat = false,
  isDelBtnActive = true,
}: MonitorProps) => {
  const { hintN1, hintMinusPlus, hintN2, hintEqual, hintResponse } = hint;
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
                {askElemNumbers.includes(0) ? (
                  <ExercisePart hint={null} value={userAnswer} />
                ) : (
                  <ExercisePart hint={hintN1} value={n1} />
                )}
                {/* <ExercisePart hint={hintN1} value={askElemNumbers.includes(0) ? userAnswer : n1} /> */}
                {/* <div className={styles.exsLeft}>
                  <div className={styles.exsPart}>
                    {askElemNumbers.includes(0) ? userAnswer : n1}
                  </div>
                  {hintN1 && <div className={styles.exsHint}>{hintN1}</div>}
                </div> */}
                <div className={styles.exsMp}>
                  <div className={styles.exsPart}>{minusPlus}</div>
                  {hintMinusPlus && <div className={styles.exsHint}>{hintMinusPlus}</div>}
                </div>
                <div className={styles.exsCenter}>
                  <div className={styles.exsPart}>
                    {askElemNumbers.includes(1) ? userAnswer : n2}
                  </div>
                  {hintN2 && <div className={styles.exsHint}>{hintN2}</div>}
                </div>
                <div className={styles.exsEqual}>
                  <div className={styles.exsPart}>
                    {isInequalCat && askElemNumbers.includes(2) ? userAnswer : equalMark}
                  </div>
                  {hintEqual && <div className={styles.exsHint}>{hintEqual}</div>}
                </div>
                <div className={styles.exsRight}>
                  <div className={styles.exsPart}>
                    {!isInequalCat && askElemNumbers.includes(2) ? userAnswer : rightAnswer}
                  </div>
                  {hintResponse && <div className={styles.exsHint}>{hintResponse}</div>}
                </div>
              </div>
            </>
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </div>
      {JSON.stringify(hint)}
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
