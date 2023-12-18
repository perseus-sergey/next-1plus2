import KeyboardButton from '../KeyboardButton/KeyboardButton';
import TextButton from '../TextButton/TextButton';

interface IKeyboardProps {
  keyboardKeys: string[];
  enterBtnTitle: string;
  enterClickHandler: () => void;
}

const Keyboard = ({ keyboardKeys, enterBtnTitle, enterClickHandler }: IKeyboardProps) => (
  <section className="keyboard" data-testid="Keyboard">
    <div id="key_btns" className="keyboard-line">
      {keyboardKeys.map((keyboardKey) => (
        <KeyboardButton key={keyboardKey} value={keyboardKey} />
      ))}
    </div>

    <div className="keyboard-line">
      <TextButton onClick={enterClickHandler}>{enterBtnTitle}</TextButton>
    </div>
  </section>
);

export default Keyboard;
