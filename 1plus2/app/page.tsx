import Link from 'next/link';
import styles from './page.module.scss';
import { ELang } from '@/libs/langMessages';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Home Page</h1>
      <div className={styles.links}>
        <Link href={`/${ELang['ua']}/math`}>Математика</Link>
        <Link href={`/${ELang['en']}/math`}>Maths</Link>
      </div>
    </main>
  );
}
