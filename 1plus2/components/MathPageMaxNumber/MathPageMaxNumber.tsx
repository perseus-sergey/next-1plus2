import { ICatNamePageProps } from '@/app/[lang]/math/category/[cat]/page';
// import styles from './MathPageMaxNumber.module.scss';
import { EMessageNames, categoriesMap, getTitleFromMap } from '@/libs/langMessages';
import KeyboardButton from '../KeyboardButton/KeyboardButton';
import { createMaxNumArray } from '@/libs/utils';
import SectionTitle from '../sectionTitle/SectionTitle';
import { redirect } from 'next/navigation';

const MathPageMaxNumber = ({ params }: ICatNamePageProps) => {
  const catObj = categoriesMap.get(params.cat);

  if (!catObj) return redirect(`/${params.lang}/math/category`);

  return (
    <section className="keyboard" data-testid="MathPageMaxNumber">
      <SectionTitle name={getTitleFromMap(EMessageNames.CHOICE_MAX_EXS_NUM, params.lang)} />

      <div className="keyboard-line">
        {createMaxNumArray(catObj.exercise).map((value) => (
          <KeyboardButton key={value} value={value} />
        ))}
      </div>
    </section>
  );
};

export default MathPageMaxNumber;

// function choiseMaxNumOfExs() {

// 	let i, maxi, step;
// 	switch (cat) {
// 		case composition_btn.id:
// 			i = 5; maxi = 20; step = 1;
// 			break;
// 		default:
// 			i = 10; maxi = 101; step = 10;
// 	}

// 	for (; i < maxi; i += step) {
// 		var btn = div_key_btns.appendChild(d.createElement("span"));

// //		btn.id = "index_".i;
// 		btn.type = "button";
// 		btn.textContent = i;
// 		btn.className = "key";
// 		btn.tabindex = i;
// 	}
// 	let keys = d.querySelectorAll(".key");
// 	for (let k of keys) {
// 		k.onclick = function () {
// 			audioChoisNum.play();
// 			maxNumb = k.textContent;
// 			div_key_btns.innerHTML = "";
// 			start(numOfExrs, k.textContent);
// 		};
// 	}
// }
