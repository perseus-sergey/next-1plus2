import { NUMBER_OF_EXERCISES } from '@/libs/exercises/math';
import TextButton from '../TextButton/TextButton';
import styles from './Monitor.module.scss';
import { TMinusPlus, TUnequalMark } from '@/libs/exercises/math.model';
import { TMathHint } from '@/libs/hooks/useExerciseParams';
import ExercisePart from '../ExercisePart/ExercisePart';
import { EIsRightAnswer } from '../Computer/Computer';

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
  isRightAnswer: EIsRightAnswer;
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
  isRightAnswer,
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

              <div
                className={
                  isRightAnswer === EIsRightAnswer.BAD
                    ? `${styles.displayExercise} ${styles.badAnswer}`
                    : isRightAnswer === EIsRightAnswer.RIGHT
                      ? `${styles.displayExercise} ${styles.properAnswer}`
                      : `${styles.displayExercise}`
                }
              >
                <ExercisePart
                  rightValue={n1}
                  hint={hintN1}
                  userAnswer={userAnswer}
                  isQuestionPart={askElemNumbers.includes(0)}
                />
                <ExercisePart
                  rightValue={minusPlus}
                  hint={hintMinusPlus}
                  userAnswer={userAnswer}
                  isQuestionPart={!!hintMinusPlus}
                />
                <ExercisePart
                  rightValue={n2}
                  hint={hintN2}
                  userAnswer={userAnswer}
                  isQuestionPart={askElemNumbers.includes(1)}
                />
                <ExercisePart
                  rightValue={equalMark}
                  hint={hintEqual}
                  userAnswer={userAnswer}
                  isQuestionPart={isInequalCat && askElemNumbers.includes(2)}
                />
                <ExercisePart
                  rightValue={rightAnswer}
                  hint={hintResponse}
                  userAnswer={userAnswer}
                  isQuestionPart={!isInequalCat && askElemNumbers.includes(2)}
                />
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
