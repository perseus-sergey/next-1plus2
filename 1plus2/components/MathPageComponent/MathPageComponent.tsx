'use client';

import { useState } from 'react';
// import styles from './MathPageComponent.module.scss';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import Mission from '../Mission/Mission';
// import MathCategories from '../MathCategories/MathCategories';
// import Monitor from '../Monitor/Monitor';
// import Keyboard from '../Keyboard/Keyboard';
import EndLevelScreen from '../EndLevelScreen/EndLevelScreen';
import { ELang, EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { IMathPageProps } from '@/app/[lang]/layout';

const MathPageComponent = (props: IMathPageProps) => {
  const { lang = ELang.en } = props.params;

  const [titleH1, setTitleH1] = useState(getTitleFromMap(EMessageNames.MISSION_CHOICE, lang));
  const [isMissionSection, setIsMissionSection] = useState(true);
  const [isEndLevelSection, setIsEndLevelSection] = useState(false);

  const levelButtonClicked = () => {
    setTitleH1(getTitleFromMap(EMessageNames.CHOICE_MAX_EXS_NUM, lang));
  };

  return (
    <>
      <SectionTitle name={titleH1} />

      {isMissionSection && <Mission levelButtonClicked={levelButtonClicked} lang={lang} />}
      {isEndLevelSection && <EndLevelScreen lang={lang} />}
    </>
  );
};

export default MathPageComponent;
