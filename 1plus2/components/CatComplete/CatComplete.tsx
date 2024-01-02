import styles from './CatComplete.module.scss';
import { EExerciseCategories } from '@/libs/exercises/math.model';
import { ELang } from '@/libs/langMessages';
import Link from 'next/link';
import TextButton from '../TextButton/TextButton';
import { Title } from '../Title/Title';
import { capitalizedFirstChar } from '@/libs/utils';

interface ICatCompleteProps {
  mistakeArray: (string | number)[][];
  mistakesStr: string[];
  currentCat: EExerciseCategories;
  nextCat: EExerciseCategories;
  lang: ELang;
  chosenMaxNum: number;
}

const CatComplete = ({
  mistakeArray,
  mistakesStr,
  currentCat,
  nextCat,
  lang,
  chosenMaxNum,
}: ICatCompleteProps) => {
  const mistakesLength = mistakeArray.length;
  const href = mistakesLength
    ? `/${lang}/math/level/${chosenMaxNum}/${currentCat}`
    : `/${lang}/math/level/${chosenMaxNum}/${nextCat}`;

  // TODO: Add mistake coefficient
  const title = !mistakesLength ? 'BRAVO' : mistakesLength < 3 ? 'GOOD' : 'BAD';
  const btnTitle = !mistakesLength ? 'Continue' : 'Correct mistakes';

  return (
    <section className={styles.CatComplete} data-testid="CatComplete">
      <Title name={title} />
      <p>Category: {capitalizedFirstChar(currentCat)}</p>
      <p>Mistakes: {mistakeArray.length}</p>
      {mistakesStr.map((mist, i) => (
        <p key={i}>{mist}</p>
      ))}
      <Link href={href}>
        <TextButton>{btnTitle}</TextButton>
      </Link>
    </section>
  );
};

export default CatComplete;
// function showResult (){

// 	var time 	= msToTime(new Date() - dateStartTest);
// 	arrTest = getUnique(arrErr);
// 	result_sec.hidden = false;
// 	header.classList.add('move');

// 	let r = error/numOfExrs;
// 	let res, a, h1Col;
// 	if (r === 0) {
// 		res = msg.bravo;
// 		spn_h1.classList.add("h1_bravo");
// 	}

// 	else if (r <= 0.2) {res = msg.notBad; spn_h1.classList.add("h1_norm")}
// 	else {res = msg.bad; spn_h1.classList.add("h1_bad")}
// 	spn_h1.textContent = res;

// 	next_btn.onclick = function () {
// 		header.classList.remove('move');
// 		result_sec.innerHTML = "";
// 		result_sec.hidden = true;
// 		spn_h1.className = "h1_stand";
// 		error = 0;
// 		arrErr = [];
// 		arrShowErr = [];
// 		(mission == missLev_btn.id) ? missionBegin() : begin();
// 	};

// 	resLeft_div.appendChild(d.createElement("h2")).textContent = msg.results + ":";
// 	let p_time = resLeft_div.appendChild(d.createElement("p"));
// 	p_time.innerHTML = msg.exTime + ": " + "<span>" + time + "</span>";
// 	let p_cat = resLeft_div.appendChild(d.createElement("p"));
// 	p_cat.innerHTML = msg.categ + ": " + "<span>" + d.getElementById(cat).textContent + "</span>";
// 	let p_err = resLeft_div.appendChild(d.createElement("p"));
// 	p_err.innerHTML = msg.mistks + ": " + "<span>" + error + "</span>";

// 	arrShowErr.length ? resRight_div.appendChild(d.createElement("h2")).textContent = msg.mistks + ":" : missArr.shift();
// 	for (let i of arrShowErr) {
// 		let e = resRight_div.appendChild(d.createElement("p"));
// 		e.innerHTML = "<div>" + i + "</div>";
// 	}
// }
