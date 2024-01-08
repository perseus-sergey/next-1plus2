import { ELang, EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { Title } from '../Title/Title';
import styles from './EndLevel.module.scss';
import Link from 'next/link';
import TextButton from '../TextButton/TextButton';

const EndLevel = ({ language, maxNumb }: { language: ELang; maxNumb: number }) => (
  <>
    <Title
      className={styles.EndLevelTitle}
      name={`${maxNumb} ${getTitleFromMap(EMessageNames.SHOW_END_LEVEL, language)}`}
    />
    <Link className={styles.endLevelBtn} href={`/${language}/math`}>
      <TextButton>{getTitleFromMap(EMessageNames.CONTINUE, language)}</TextButton>
    </Link>
  </>
);

export default EndLevel;
