'use client';

import { useEffect, useState } from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import styles from './ExercisePage.module.scss';
import { ELang, EMessageNames, IExerciseParams, getTitleFromMap } from '@/libs/langMessages';
import Monitor from '../Monitor/Monitor';
import Keyboard from '../Keyboard/Keyboard';
import { makeExerciseArray } from '@/libs/exercises/math';

export type TMinusPlus = '-' | '+' | '>' | '<' | '=';

interface IExerciseComponentProps {
  lang: ELang;
  exerciseParams: IExerciseParams;
  chosenMaxNum: number;
}

const ExercisePage = ({ lang, exerciseParams, chosenMaxNum }: IExerciseComponentProps) => {
  const [exerciseArray, setExerciseArray] = useState([[0, 0, 0]]);

  useEffect(() => {
    setExerciseArray(makeExerciseArray(chosenMaxNum));
  }, []);

  const enterClickHandler = () => {
    if (!exerciseArray.length) return;
    const [, ...rest] = exerciseArray;
    setExerciseArray(rest);
  };

  if (!lang || !exerciseParams || !chosenMaxNum) return <h2>Loading...</h2>;
  if (!exerciseArray.length) return <h2>EOA</h2>;

  return (
    <section className={styles.ExercisePage} data-testid="ExercisePage">
      <SectionTitle
        name={`${getTitleFromMap(EMessageNames.LEFT_EXS_NUM_MSG, lang)}: ${exerciseArray.length}`}
      />
      <Monitor
        n1={exerciseArray[0][0]}
        n2={Math.abs(exerciseArray[0][1])}
        minusPlus={exerciseArray[0][1] > 0 ? '+' : '-'}
        answer={exerciseArray[0][2]}
        arrExsLength={exerciseArray.length}
        isDelBtnActive={!!Number(exerciseParams.keyboardKeys[0])}
      />
      <Keyboard
        keyboardKeys={exerciseParams.keyboardKeys}
        enterBtnTitle={getTitleFromMap(EMessageNames.BTN_ENTER, lang)}
        enterClickHandler={enterClickHandler}
      />
    </section>
  );
};

export default ExercisePage;

// function clickBtns4Eq() {
//   if (dragged) {
//     dragged = false;
//     return false;
//   }

//   let cont;
//   audioKey.play();
//   if (column_tbl.classList.contains('big_column'))
//     cont =
//       ArrObjResponse[0].textContent == '?'
//         ? this.textContent
//         : this.textContent + ArrObjResponse[0].textContent;
//   else
//     cont =
//       ArrObjResponse[0].textContent == '?'
//         ? this.textContent
//         : ArrObjResponse[0].textContent + this.textContent;
//   for (const objR of ArrObjResponse) {
//     objR.innerHTML = `<div>${cont}</div>`;
//   }
// }

// function makeBtns4Ineq() {
//   setBtn('>');
//   setBtn('<');
//   setBtn('=');

//   function setBtn(show) {
//     const btn = div_key_btns.appendChild(d.createElement('span'));
//     //		btn.id = "index_".i;
//     btn.type = 'button';
//     btn.textContent = show;
//     btn.className = 'key';
//   }
//   const keys = d.querySelectorAll('.key');

//   for (const k of keys) {
//     k.onclick = function () {
//       audioKey.play();
//       for (const objR of ArrObjResponse) {
//         objR.innerHTML = `<div>${k.textContent}</div>`;
//       }
//     };
//   }
//   clear_btn.hidden = true;
//   enter_btn.hidden = false;
// }
