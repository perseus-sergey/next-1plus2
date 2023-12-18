import { useEffect, useState } from 'react';
import styles from './Computer.module.scss';
import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { IExerciseComponentProps } from '../ExercisePage/ExercisePage';
import Monitor, { TMinusPlus } from '../Monitor/Monitor';
import Keyboard from '../Keyboard/Keyboard';
import SectionTitle from '../SectionTitle/SectionTitle';
import { arrayShift, sleep } from '@/libs/utils';
import { audioKey, audioRightAnsw, audioWrongAnsw } from '@/libs/sound';

export interface IComputerProps extends IExerciseComponentProps {
  exerciseArray: number[][];
}

const Computer = ({ lang, exerciseParams, exerciseArray }: IComputerProps) => {
  const [exercises, setExercises] = useState(exerciseArray);
  const [isEnterDisabled, setIsEnterDisabled] = useState(false);
  const [n1, setN1] = useState(0);
  const [n2, setN2] = useState(0);
  const [minusPlus, setMinusPlus] = useState<TMinusPlus>('+');
  const [badAnswers, setBadAnswers] = useState<number[][]>([]);
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [compClassNames, setCompClassNames] = useState([styles.Computer]);
  const [answerElementValue, setAnswerElementValue] = useState('?');

  useEffect(() => {
    if (!exercises.length) return;

    setN1(exercises[0][0]);
    setN2(Math.abs(exercises[0][1]));
    setMinusPlus(exercises[0][1] > 0 ? '+' : '-');
  }, [exercises]);

  const enterClickHandler = () => {
    if (!exercises.length) return;
    setIsEnterDisabled(true);
    checkAnswer();
  };

  const checkAnswer = async () => {
    const isRightAnswer = +answerElementValue === exercises[0][2];
    isRightAnswer ? rightAnswer() : badAnswer();

    await sleep();

    isRightAnswer
      ? setExercises(arrayShift(exercises))
      : setExercises([...exercises, exercises[0]]);

    setCompClassNames([styles.Computer]);
    setAnswerElementValue('?');
    setIsEnterDisabled(false);
  };

  const rightAnswer = () => {
    audioRightAnsw.play();
    setCompClassNames([...compClassNames, styles.properAnswer]);
  };

  const badAnswer = () => {
    audioWrongAnsw.play();
    setBadAnswers([...badAnswers, exercises[0]]);
    setMistakes([...mistakes, `${n1} ${minusPlus} ${n2} ${'='} ${answerElementValue}`]);
    setCompClassNames([...compClassNames, styles.badAnswer]);
  };

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
    audioKey.play();
    setAnswerElementValue(answerElementValue === '?' ? value : `${answerElementValue}${value}`);

    // function clickBtns4Eq () {
    //   if (dragged) {dragged = false; return false};

    //   for (let objR of ArrObjResponse){
    //     objR.innerHTML = `<div>${cont}</div>`;
    //   }
    // }
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
          answer={answerElementValue}
          arrExsLength={exercises.length}
          isDelBtnActive={!!Number(exerciseParams.keyboardKeys[0])}
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
