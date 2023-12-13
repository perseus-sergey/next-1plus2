'use client';

import { useState } from 'react';
// import styles from './MathPageComponent.module.css';
import SectionTitle from '../sectionTitle/SectionTitle';
import Mission from '../Mission/Mission';
import MathCategories from '../MathCategories/MathCategories';
import Monitor from '../Monitor/Monitor';
import Keyboard from '../Keyboard/Keyboard';
import EndLevelScreen from '../EndLevelScreen/EndLevelScreen';
import { getTitleFromMap } from '@/libs/langMessages';
import { IMathPageProps } from '@/app/[lang]/math/page';

const MathPageComponent = (props: IMathPageProps) => {
  const { lang = 'en' } = props.params;

  const [titleH1, setTitleH1] = useState(getTitleFromMap('choiceMiss', lang));
  const [isMissionSection, setIsMissionSection] = useState(true);
  const [isResultsSection, setIsResultsSection] = useState(false);
  const [isCategoriesSection, setIsCategoriesSection] = useState(false);
  const [isMonitorSection, setIsMonitorSection] = useState(false);
  const [isKeyboardSection, setIsKeyboardSection] = useState(false);
  const [isEndLevelSection, setIsEndLevelSection] = useState(false);

  // function begin() {
  //   result_sec.innerHTML = '';
  //   hideComputer(true);
  //   mission_sec.hidden = true;

  //   if (arrTest.length) {
  //     choisePrintFunc();
  //   } else {
  //     cat ? choiseMiss() : category();
  //   }
  // }

  const levelButtonClicked = () => {
    setTitleH1(getTitleFromMap('choiceMaxNumOfExs', lang));
  };

  return (
    <>
      <SectionTitle name={titleH1} />
      {isResultsSection && <section id="results" hidden></section>}

      {isMissionSection && <Mission levelButtonClicked={levelButtonClicked} lang={lang} />}

      {/* {isCategoriesSection && <MathCategories lang={lang} />} */}

      {isMonitorSection && <Monitor n1="1" n2="2" answer="3" minusPlus="+" />}

      {isKeyboardSection && <Keyboard />}

      {isEndLevelSection && <EndLevelScreen lang={lang} />}
    </>
  );
};

export default MathPageComponent;
