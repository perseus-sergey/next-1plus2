import { useRef, useState } from 'react';
import styles from './Computer.module.scss';
import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { IExerciseComponentProps } from '../ExercisePage/ExercisePage';
import Keyboard from '../Keyboard/Keyboard';
import { Title } from '../Title/Title';
import { arrayShift, sleep } from '@/libs/utils';
import { ESoundPaths } from '@/libs/ESoundPaths';
import {
  EExerciseCategories,
  QUESTION_MARK,
  keyboardInEqualKeys,
} from '@/libs/exercises/math.model';
import Monitor from '../Monitor/Monitor';
import { useExerciseParams } from '@/libs/hooks/useExerciseParams';

export interface IComputerProps extends IExerciseComponentProps {
  exerciseArray: (string | number)[][];
}

export enum EIsRightAnswer {
  'NOT',
  'RIGHT',
  'BAD',
}

const Computer = ({ lang, exerciseParams, exerciseArray, cat }: IComputerProps) => {
  const [exercises, setExercises] = useState(exerciseArray);
  const [isEnterDisabled, setIsEnterDisabled] = useState(false);
  const [badAnswers, setBadAnswers] = useState<(string | number)[][]>([]);
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [isRightAnswer, setIsRightAnswer] = useState(EIsRightAnswer.NOT);
  const [answerElementValue, setAnswerElementValue] = useState(QUESTION_MARK);

  const [minusPlus, askElemNumbers, hint] = useExerciseParams(cat, exercises);

  const audioDel = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_DEL) : undefined
  );

  const audioKey = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_KEY) : undefined
  );

  const audioRightAnsw = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_RIGHT_ANSWER) : undefined
  );

  const audioWrongAnsw = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_WRONG_ANSWER) : undefined
  );

  const enterClickHandler = () => {
    if (!exercises.length || answerElementValue === QUESTION_MARK) return;
    setIsEnterDisabled(true);
    checkAnswer();
  };

  const clearBtnHandler = () => {
    if (answerElementValue === QUESTION_MARK) return;
    setAnswerElementValue(QUESTION_MARK);
    audioDel.current?.play();
  };

  const checkAnswer = async () => {
    const properAnswer = isNaN(+exercises[0][askElemNumbers[0]])
      ? exercises[0][askElemNumbers[0]]
      : Math.abs(+exercises[0][askElemNumbers[0]]);
    const isRightAnswer = answerElementValue === `${properAnswer}`;
    isRightAnswer ? rightAnswer() : badAnswer();

    await sleep();

    isRightAnswer
      ? setExercises(arrayShift(exercises))
      : setExercises([...exercises, exercises[0]]);

    setIsRightAnswer(EIsRightAnswer.NOT);
    setAnswerElementValue(QUESTION_MARK);
    setIsEnterDisabled(false);
  };

  const rightAnswer = () => {
    audioRightAnsw.current?.play();
    setIsRightAnswer(EIsRightAnswer.RIGHT);
  };

  const badAnswer = () => {
    const [n1, n2] = exercises[0];
    audioWrongAnsw.current?.play();
    setBadAnswers([...badAnswers, exercises[0]]);
    // TODO: change for each cat
    setMistakes([...mistakes, `${n1} ${minusPlus} ${n2} ${'='} ${answerElementValue}`]);
    setIsRightAnswer(EIsRightAnswer.BAD);
  };

  // function makeShow(n1, n2) {
  //   // spn_mp.innerHTML = mp_td.innerHTML = n2 < 0 ? "<div>-</div>" : "<div>+</div>";

  //   if (cat == equalOverTen_btn.id) {
  //     showHintOverTen(n1, n2);
  //   } else {
  //     spn_left.innerHTML = showHint(n1);
  //     spn_centr.innerHTML = showHint(Math.abs(n2));
  //   }
  //   //	show = `${showHint(n1)}${mp}${showHint(Math.abs(n2))}`;
  //   // return n1 + n2;
  // }

  // function showHint(num) {
  //   const wholeN = num - (num % 10);
  //   const restN = num % 10;
  //   return num > 10 && restN
  //     ? `<div>${num}<span class="hint">(${wholeN} + ${restN})</span></div>`
  //     : `<div>${num}</div>`;
  // }

  // function preparPrint(objResp) {
  //   setBigColumnExs(false);
  //   if (!isHiddenColumn) {
  //     div_exs.addEventListener('click', clickDivExs);
  //     column_tbl.addEventListener('click', clickColTbl);
  //   }
  //   return true;
  // }

  // function printExsSeqns() {
  //   column_tbl.hidden = true;
  // }

  // const printExercise = () => {
  //   preparePrint([EMathExsElementNames['rightStr'], EMathExsElementNames['downColumn']]);
  // };

  // function printExs1() {
  //   if (!preparePrint([spn_right, ans_td])) return;
  //   column_tbl.hidden =
  //     !isHiddenColumn && (arrTest[0][0] > 9 || Math.abs(arrTest[0][1]) > 9) ? false : true;
  //   equal = arrTest[0][2];
  // }

  // async function checkExs (printFun = printExs1) {
  //   let response = ArrObjResponse[0].textContent;
  //   for (let objR of ArrObjResponse){
  //     objR.className = "";
  //   }
  //   printFun();
  // }

  // function addError (){
  //   error++;
  //   error_spn.textContent = `${msg.mistks}: ${error}`;
  // //	progressbar_span.textContent = `${arrTest.length}(${error})`;
  //   circles_ul.classList.add('bad_li');
  //   arrShowErr.push(spn_left.innerHTML + spn_mp.innerHTML + spn_centr.innerHTML + spn_eq.innerHTML + spn_right.innerHTML);
  // }

  const keyboardBtnClickHandler = (value: string) => {
    audioKey.current?.play();
    setAnswerElementValue(
      answerElementValue === QUESTION_MARK || keyboardInEqualKeys.includes(answerElementValue)
        ? value
        : `${answerElementValue}${value}`
    );
  };

  if (!lang || !exerciseParams) return <h2>Loading...</h2>;
  if (!exercises.length) return <h2>{JSON.stringify(mistakes)}</h2>;

  return (
    <>
      <Title
        name={`${getTitleFromMap(EMessageNames.LEFT_EXS_NUM_MSG, lang)}: ${exercises.length}`}
      />
      {JSON.stringify(exercises)}
      <section className={styles.Computer} data-testid="Computer">
        <Monitor
          n1={exercises[0][0]}
          n2={Math.abs(+exercises[0][1])}
          hint={hint}
          minusPlus={minusPlus}
          userAnswer={answerElementValue}
          rightAnswer={exercises[0][exercises[0].length - 1]}
          askElemNumbers={askElemNumbers}
          equalMark={exerciseParams.equalMark}
          arrExsLength={exercises.length}
          isRightAnswer={isRightAnswer}
          isDelBtnActive={!!Number(exerciseParams.keyboardKeys[0])}
          isInequalCat={cat === EExerciseCategories['inequality']}
          clearBtnHandler={clearBtnHandler}
        />
        <Keyboard
          keyboardBtnClickHandler={keyboardBtnClickHandler}
          keyboardKeys={exerciseParams.keyboardKeys}
          enterBtnTitle={getTitleFromMap(EMessageNames.BTN_ENTER, lang)}
          enterClickHandler={enterClickHandler}
          isEnterDisabled={isEnterDisabled}
        />
      </section>
    </>
  );
};

export default Computer;
