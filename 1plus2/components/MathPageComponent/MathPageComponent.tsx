'use client';

import { useState } from 'react';
// import styles from './MathPageComponent.module.scss';
import { Title } from '../Title/Title';
import Mission from '../Mission/Mission';
import EndLevelScreen from '../EndLevelScreen/EndLevelScreen';
import { ELang, EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { IMathPageProps } from '@/app/[lang]/layout';

const MathPageComponent = (props: IMathPageProps) => {
  const { lang = ELang.en } = props.params;

  const [titleH1] = useState(getTitleFromMap(EMessageNames.MISSION_CHOICE, lang));
  const [isMissionSection] = useState(true);
  const [isEndLevelSection] = useState(false);

  return (
    <>
      <Title name={titleH1} />

      {isMissionSection && <Mission lang={lang} />}
      {isEndLevelSection && <EndLevelScreen lang={lang} />}
    </>
  );
};

export default MathPageComponent;
