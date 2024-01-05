import Link from 'next/link';
import styles from './page.module.scss';
import { ELang, EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { Title } from '@/components/Title/Title';
import TextButton from '@/components/TextButton/TextButton';

export default function Home() {
  return (
    <main className={styles.main}>
      <Title name={getTitleFromMap(EMessageNames.TITLE_HOME_PAGE)} />
      <div className={styles.links}>
        <Link href={`/${ELang['ua']}/math`}>
          <TextButton>{getTitleFromMap(EMessageNames.BTN_MATH, ELang.ua)}</TextButton>
        </Link>
        <Link href={`/${ELang['en']}/math`}>
          <TextButton>{getTitleFromMap(EMessageNames.BTN_MATH, ELang.en)}</TextButton>
        </Link>
      </div>
    </main>
  );
}
