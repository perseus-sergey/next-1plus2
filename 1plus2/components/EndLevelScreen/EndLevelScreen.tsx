import TextButton from '../TextButton/TextButton';
import styles from './EndLevelScreen.module.css';
import { ELang, getTitleFromMap } from '@/libs/langMessages';

interface EndLevelScreenProps {
  lang: ELang;
}

const EndLevelScreen = ({ lang }: EndLevelScreenProps) => (
  <div className={styles.EndLevelScreen} data-testid="EndLevelScreen">
    {/* <div className="end-level" hidden> */}
    <div className="end-level-text"></div>
    <TextButton id="btn_nextLev">{getTitleFromMap('btnEnter', lang)}</TextButton>
  </div>
);

export default EndLevelScreen;
