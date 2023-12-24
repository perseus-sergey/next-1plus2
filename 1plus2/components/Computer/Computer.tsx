import { useEffect, useRef, useState } from 'react';
import styles from './Computer.module.scss';
import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { IExerciseComponentProps } from '../ExercisePage/ExercisePage';
import Keyboard from '../Keyboard/Keyboard';
import SectionTitle from '../SectionTitle/SectionTitle';
import { arrayShift, sleep } from '@/libs/utils';
import { ESoundPaths } from '@/libs/ESoundPaths';
import {
  EExerciseCategories,
  QUESTION_MARK,
  TMinusPlus,
  keyboardInEqualKeys,
} from '@/libs/exercises/math.model';
import Monitor from '../Monitor/Monitor';

type TMapCatParts = Map<
  EExerciseCategories,
  {
    askPartPositions: number[];
    minusPlus: TMinusPlus;
  }
>;

export interface IComputerProps extends IExerciseComponentProps {
  exerciseArray: (string | number)[][];
}

const Computer = ({ lang, exerciseParams, exerciseArray, cat }: IComputerProps) => {
  const [exercises, setExercises] = useState(exerciseArray);
  const [isEnterDisabled, setIsEnterDisabled] = useState(false);
  const [n1, setN1] = useState<string | number>();
  const [n2, setN2] = useState<string | number>();
  const [minusPlus, setMinusPlus] = useState<TMinusPlus>('+');
  const [askElemNumbers, setAskElemNumbers] = useState<number[]>([2]);
  const [badAnswers, setBadAnswers] = useState<(string | number)[][]>([]);
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [compClassNames, setCompClassNames] = useState([styles.Computer]);
  const [answerElementValue, setAnswerElementValue] = useState(QUESTION_MARK);

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

  const getMinusPlus = (): TMinusPlus => (exercises.length && +exercises[0][1] > 0 ? '+' : '-');

  const mapCatParts: TMapCatParts = new Map([
    [EExerciseCategories['equality'], { askPartPositions: [2], minusPlus: getMinusPlus() }],
    [
      EExerciseCategories['sequence'],
      { askPartPositions: [Math.floor(Math.random() * 3)], minusPlus: '' },
    ],
    [
      EExerciseCategories['pairs'],
      { askPartPositions: Math.floor(Math.random() * 2) ? [2] : [0, 1], minusPlus: '+' },
    ],
    [
      EExerciseCategories['link-equality'],
      { askPartPositions: Math.floor(Math.random() * 2) ? [1] : [0], minusPlus: getMinusPlus() },
    ],
    [
      EExerciseCategories['inequality'],
      {
        askPartPositions: [2],
        minusPlus: n1 === '' ? '' : getMinusPlus(),
      },
    ],
    [EExerciseCategories['equal-ten'], { askPartPositions: [2], minusPlus: getMinusPlus() }],
    [EExerciseCategories['composition'], { askPartPositions: [2], minusPlus: getMinusPlus() }],
    [EExerciseCategories['equal-five'], { askPartPositions: [2], minusPlus: getMinusPlus() }],
    [EExerciseCategories['equal-over-ten'], { askPartPositions: [2], minusPlus: getMinusPlus() }],
  ]);

  useEffect(() => {
    if (!exercises.length) return;

    setN1(exercises[0][0]);
    setN2(Math.abs(+exercises[0][1]));
    const catPart = mapCatParts.get(EExerciseCategories[cat]);
    if (!catPart) return;
    setMinusPlus(catPart.minusPlus);
    setAskElemNumbers(catPart.askPartPositions);
  }, [exercises, cat]);

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
    const isRightAnswer = answerElementValue === `${exercises[0][askElemNumbers[0]]}`;
    isRightAnswer ? rightAnswer() : badAnswer();

    await sleep();

    isRightAnswer
      ? setExercises(arrayShift(exercises))
      : setExercises([...exercises, exercises[0]]);

    setCompClassNames([styles.Computer]);
    setAnswerElementValue(QUESTION_MARK);
    setIsEnterDisabled(false);
  };

  const rightAnswer = () => {
    audioRightAnsw.current?.play();
    setCompClassNames([...compClassNames, styles.properAnswer]);
  };

  const badAnswer = () => {
    audioWrongAnsw.current?.play();
    setBadAnswers([...badAnswers, exercises[0]]);
    setMistakes([...mistakes, `${n1} ${minusPlus} ${n2} ${'='} ${answerElementValue}`]);
    setCompClassNames([...compClassNames, styles.badAnswer]);
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
      <SectionTitle
        name={`${getTitleFromMap(EMessageNames.LEFT_EXS_NUM_MSG, lang)}: ${exercises.length}`}
      />
      <section className={compClassNames.join(' ')} data-testid="Computer">
        <Monitor
          n1={n1}
          n2={n2}
          minusPlus={minusPlus}
          userAnswer={answerElementValue}
          rightAnswer={exercises[0][exercises[0].length - 1]}
          askElemNumbers={askElemNumbers}
          equalMark={exerciseParams.equalMark}
          arrExsLength={exercises.length}
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
