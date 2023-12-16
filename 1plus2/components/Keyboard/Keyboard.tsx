import KeyboardButton from '../KeyboardButton/KeyboardButton';
import TextButton from '../TextButton/TextButton';

interface IKeyboardProps {
  keyboardKeys: string[];
  enterBtnTitle: string;
}

const Keyboard = ({ keyboardKeys, enterBtnTitle }: IKeyboardProps) => (
  <section className="keyboard" data-testid="Keyboard">
    <div id="key_btns" className="keyboard-line">
      {keyboardKeys.map((keyboardKey) => (
        <KeyboardButton key={keyboardKey} value={keyboardKey} />
      ))}
    </div>

    <div className="keyboard-line">
      <TextButton>{enterBtnTitle}</TextButton>
    </div>
  </section>
);

export default Keyboard;
