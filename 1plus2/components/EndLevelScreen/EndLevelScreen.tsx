import React, { FC } from 'react';
import TextButton from '../TextButton/TextButton';
import styles from './EndLevelScreen.module.css';

interface EndLevelScreenProps {}

const EndLevelScreen: FC<EndLevelScreenProps> = () => (
  <div className={styles.EndLevelScreen} data-testid="EndLevelScreen">
    {/* <div className="end-level" hidden> */}
    <div className="end-level-text"></div>
    <TextButton id="btn_nextLev">Далі</TextButton>
  </div>
);

export default EndLevelScreen;
