import EndLevelScreen from '@/components/EndLevelScreen/EndLevelScreen';
import Keyboard from '@/components/Keyboard/Keyboard';
import MathCategories from '@/components/MathCategories/MathCategories';
import Monitor from '@/components/Monitor/Monitor';
import SectionTitle from '@/components/sectionTitle/SectionTitle';
import Mission from '../../components/Mission/Mission';
import styles from './math.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <SectionTitle name="Обери завдання" />
      <section id="results" hidden></section>

      <Mission />

      <MathCategories isHidden={true} />

      <Monitor isHidden={false} isDelButtonHidden={false} n1="1" n2="2" answer="3" minusPlus="+" />

      <Keyboard isEnterBtnHidden={true} />

      <EndLevelScreen isHidden={true} />
    </main>
  );
}
