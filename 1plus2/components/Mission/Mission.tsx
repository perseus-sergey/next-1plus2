import Link from 'next/link';
import TextButton from '../TextButton/TextButton';
import style from './Mission.module.scss';
import { ELang, EMessageNames, getTitleFromMap } from '@/libs/langMessages';

interface MissionProps {
  lang: ELang;
}

const Mission = ({ lang }: MissionProps) => {
  return (
    <section>
      <div className={style.centered}>
        <Link href={`/${lang}/math/level`}>
          <TextButton>{getTitleFromMap(EMessageNames.BTN_LEVELS, lang)}</TextButton>
        </Link>
        <Link href={`/${lang}/math/category`}>
          <TextButton>{getTitleFromMap(EMessageNames.BTN_CAT, lang)}</TextButton>
        </Link>
      </div>
    </section>
  );
};

export default Mission;
