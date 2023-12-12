import React, { FC } from 'react';
import TextButton from '../TextButton/TextButton';
import styles from './EndLevelScreen.module.css';

interface EndLevelScreenProps {
  isHidden: boolean;
}

const EndLevelScreen: FC<EndLevelScreenProps> = ({ isHidden = true }) => (
  <div className={styles.EndLevelScreen} data-testid="EndLevelScreen" hidden={isHidden}>
    {/* <div className="end-level" hidden> */}
    <div className="end-level-text"></div>
    <TextButton id="btn_nextLev">Далі</TextButton>
  </div>
);

export default EndLevelScreen;
