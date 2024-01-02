import styles from './CatComplete.module.scss';
import TextButton from '../TextButton/TextButton';
import { Title } from '../Title/Title';
import { capitalizedFirstChar } from '@/libs/utils';
import { useExercisesProvider } from '@/libs/context/MathExercisesProvider';
import Computer from '../Computer/Computer';
import { useLangProvider } from '@/libs/context/LangProvider';
import { useLevelsProvider } from '@/libs/context/MathLevelProvider';
import { EExerciseCategories, categoriesMap } from '@/libs/exercises/math.model';
import { makeExerciseArray } from '@/libs/exercises/math';

const CatComplete = () => {
  const {
    category,
    setCategory,
    exercises,
    setExercises,
    mistakes,
    setMistakes,
    mistakesStr,
    setMistakesStr,
    chosenMaxNum,
    setExsParams,
  } = useExercisesProvider();

  const { levelsArray, shiftLevelsArray } = useLevelsProvider();

  const { language } = useLangProvider();

  const mistakesLength = mistakes.length;
  // TODO: Add correct links if it is category mission
  // const href = mistakesLength
  //   ? `/${language}/math/level/${chosenMaxNum}/${category}`
  //   : `/${language}/math/level/${chosenMaxNum}/${levelsArray[0]}`;

  // TODO: Add mistake coefficient
  const title = !mistakesLength ? 'BRAVO' : mistakesLength < 3 ? 'GOOD' : 'BAD';
  const btnTitle = !mistakesLength ? 'Continue' : 'Correct mistakes';

  const onBtnClicked = () => {
    if (mistakes.length) {
      setExercises(mistakes);
    } else {
      shiftLevelsArray();
      setCategory(levelsArray[0]);
      setExsParams(categoriesMap.get(EExerciseCategories[levelsArray[0]]));
      setExercises(makeExerciseArray(levelsArray[0], chosenMaxNum));
    }
    setMistakes([]);
    setMistakesStr([]);
  };

  if (exercises.length) return <Computer />;

  return (
    <section className={styles.CatComplete} data-testid="CatComplete">
      mistARR: {JSON.stringify(mistakes)}
      <Title name={title} />
      <p>Category: {capitalizedFirstChar(category)}</p>
      <p>Mistakes: {mistakes.length}</p>
      {mistakesStr.map((mist, i) => (
        <p key={i}>{mist}</p>
      ))}
      {/* <Link href={href}> */}
      <TextButton onClick={onBtnClicked}>{btnTitle}</TextButton>
      {/* </Link> */}
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
