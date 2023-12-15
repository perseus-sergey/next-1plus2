import KeyboardButton from '../KeyboardButton/KeyboardButton';
import TextButton from '../TextButton/TextButton';
import { createArray } from '../../libs/utils';

// interface KeyboardProps {}

// function makeBtns4Eq() {
//   for (let i = 1; i < 11; i++) {
//     const btn = div_key_btns.appendChild(d.createElement('span'));
//     //		btn.id = "index_".i;
//     btn.type = 'button';
//     btn.textContent = i % 10;
//     //		btn.className = "num";
//     btn.className = 'key';
//     btn.tabindex = i;
//     //		btn.hidden = false;
//   }
//   const keys = d.querySelectorAll('.key');
//   for (const k of keys) {
//     k.addEventListener('click', clickBtns4Eq);
//   }
//   hideEnterDel(false);
// }

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

const Keyboard = () => (
  <section className="keyboard" data-testid="Keyboard">
    <div id="key_btns" className="keyboard-line">
      {createArray(10).map((_, i) => (
        <KeyboardButton key={i} value={(i + 1) % 10} />
      ))}
    </div>

    <div className="keyboard-line">
      <TextButton id="btn_enter">Підтвердити</TextButton>
    </div>
  </section>
);

export default Keyboard;
