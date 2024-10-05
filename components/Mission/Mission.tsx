import Link from 'next/link';
import TextButton from '../TextButton/TextButton';
import { ELang, EMessageNames, getTitleFromMap } from '@/libs/langMessages';

interface MissionProps {
  lang: ELang;
}

const Mission = ({ lang }: MissionProps) => {
  return (
    <div className="flex justify-evenly flex-wrap gap-8 w-full whitespace-nowrap">
      <Link href={`/${lang}/math/level`}>
        <TextButton isLink>{getTitleFromMap(EMessageNames.BTN_LEVELS, lang)}</TextButton>
      </Link>
      <Link href={`/${lang}/math/category`}>
        <TextButton isLink>{getTitleFromMap(EMessageNames.BTN_CAT, lang)}</TextButton>
      </Link>
    </div>
  );
};

export default Mission;
