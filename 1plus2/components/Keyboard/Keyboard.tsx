import React, { FC } from 'react';
import TextButton from '../TextButton/TextButton';
import styles from './Keyboard.module.css';

interface KeyboardProps {
  isEnterBtnHidden: boolean;
}

const Keyboard: FC<KeyboardProps> = ({ isEnterBtnHidden }) => (
  <section className={styles.Keyboard} data-testid="Keyboard">
    {/* <section className="keyboard"> */}
    <div id="key_btns" className="keyboard-line"></div>

    <div className="keyboard-line">
      <TextButton id="btn_enter" hidden={isEnterBtnHidden}>
        Підтвердити
      </TextButton>
    </div>
  </section>
);

export default Keyboard;
