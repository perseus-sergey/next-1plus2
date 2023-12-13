'use client';

import React, { FC, useState } from 'react';
import styles from './MathPageComponent.module.css';
import SectionTitle from '../sectionTitle/SectionTitle';
import Mission from '../Mission/Mission';
import MathCategories from '../MathCategories/MathCategories';
import Monitor from '../Monitor/Monitor';
import Keyboard from '../Keyboard/Keyboard';
import EndLevelScreen from '../EndLevelScreen/EndLevelScreen';
import { TLang, getTitleFromMap } from '@/libs/langMessages';
import { IMathPageProps } from '@/app/[lang]/math/page';

const MathPageComponent: FC<IMathPageProps> = (props) => {
  const [lang, setLang] = useState<TLang>(props.params.lang || 'en');

  const [isTitleSection, setIsTitleSection] = useState(true);
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

  const catButtonClicked = () => {
    setIsTitleSection(false);
  };

  const levelButtonClicked = () => {
    setIsTitleSection(true);
  };

  return (
    <>
      {isTitleSection && <SectionTitle name={getTitleFromMap('choiceMiss', lang)} />}
      {isResultsSection && <section id="results" hidden></section>}

      {isMissionSection && (
        <Mission catButtonClicked={catButtonClicked} levelButtonClicked={levelButtonClicked} />
      )}

      {isCategoriesSection && <MathCategories />}

      {isMonitorSection && <Monitor n1="1" n2="2" answer="3" minusPlus="+" />}

      {isKeyboardSection && <Keyboard />}

      {isEndLevelSection && <EndLevelScreen />}
    </>
  );
};

export default MathPageComponent;
