'use client';

import { useState } from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import styles from './ExercisePage.module.scss';
import { ELang, EMessageNames, IExerciseParams, getTitleFromMap } from '@/libs/langMessages';
import { getExerciseQuantity } from '@/libs/utils';
import Monitor from '../Monitor/Monitor';
import Keyboard from '../Keyboard/Keyboard';

export type TMinusPlus = '-' | '+' | '>' | '<' | '=';

interface IExerciseComponentProps {
  lang: ELang;
  exerciseParams: IExerciseParams;
  chosenMaxNum: number;
}

const ExercisePage = ({ lang, exerciseParams, chosenMaxNum }: IExerciseComponentProps) => {
  const [exerciseLeft, setExerciseLeft] = useState(getExerciseQuantity(exerciseParams.exercise));
  const [n1, setN1] = useState(1);
  const [n2, setN2] = useState(2);
  const [answer, setAnswer] = useState(3);
  const [minPlus, setMinPlus] = useState<TMinusPlus>('+');

  return (
    <section className={styles.ExercisePage} data-testid="ExercisePage">
      <SectionTitle
        name={`${getTitleFromMap(EMessageNames.LEFT_EXS_NUM_MSG, lang)}: ${exerciseLeft}`}
      />
      <Monitor
        n1={n1}
        n2={n2}
        minusPlus={minPlus}
        answer={answer}
        isDelBtnActive={!!Number(exerciseParams.keyboardKeys[0])}
      />
      <Keyboard
        keyboardKeys={exerciseParams.keyboardKeys}
        enterBtnTitle={getTitleFromMap(EMessageNames.BTN_ENTER, lang)}
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
