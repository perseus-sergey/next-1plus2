import Link from 'next/link';
import TextButton from '../TextButton/TextButton';
import style from './Mission.module.css';
import { ELang, EMessageNames, getTitleFromMap } from '@/libs/langMessages';

interface MissionProps {
  levelButtonClicked: () => void;
  lang: ELang;
}

const Mission = ({ levelButtonClicked, lang }: MissionProps) => {
  return (
    <section>
      <div className={style.centered}>
        <TextButton id="level" onClick={levelButtonClicked}>
          {getTitleFromMap(EMessageNames.BTN_LEVELS, lang)}
        </TextButton>
        <Link href={`/${lang}/math/category`}>
          <TextButton>{getTitleFromMap(EMessageNames.BTN_CAT, lang)}</TextButton>
        </Link>
      </div>
    </section>
  );
};

export default Mission;
