import KeyboardButton from '../KeyboardButton/KeyboardButton';
import TextButton from '../TextButton/TextButton';

interface IKeyboardProps {
  keyboardKeys: string[];
  enterBtnTitle: string;
  isEnterDisabled: boolean;
  keyboardBtnClickHandler: (value: string) => void;
  enterClickHandler: () => void;
}

const Keyboard = ({
  keyboardKeys,
  enterBtnTitle,
  isEnterDisabled,
  enterClickHandler,
  keyboardBtnClickHandler,
}: IKeyboardProps) => (
  <section className="keyboard" data-testid="Keyboard">
    <div id="key_btns" className="keyboard-line">
      {keyboardKeys.map((keyboardKey) => (
        <KeyboardButton
          key={keyboardKey}
          value={keyboardKey}
          btnClickHandler={keyboardBtnClickHandler}
        />
      ))}
    </div>

    <div className="keyboard-line">
      <TextButton onClick={enterClickHandler} disabled={isEnterDisabled}>
        {enterBtnTitle}
      </TextButton>
    </div>
  </section>
);

export default Keyboard;
