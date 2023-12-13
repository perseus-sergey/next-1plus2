import Link from 'next/link';
import TextButton from '../TextButton/TextButton';
import style from './Mission.module.css';
import { TLang, getTitleFromMap } from '@/libs/langMessages';

interface MissionProps {
  levelButtonClicked: () => void;
  lang: TLang;
}

const Mission = ({ levelButtonClicked, lang }: MissionProps) => {
  return (
    <section>
      <div className={style.centered}>
        <TextButton id="level" onClick={levelButtonClicked}>
          {getTitleFromMap('btnLevels', lang)}
        </TextButton>
        <Link href={`/${lang}/math/category`}>
          <TextButton>{getTitleFromMap('btnCat', lang)}</TextButton>
        </Link>
      </div>
    </section>
  );
};

export default Mission;
