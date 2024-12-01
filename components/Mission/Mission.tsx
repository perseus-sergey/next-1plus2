import Link from 'next/link';
import TextButton from '../TextButton/TextButton';
import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { ESegments } from '@/models/main.model';
import { ELang } from '@/models/types';

interface MissionProps {
  lang: ELang;
}

const Mission = ({ lang }: MissionProps) => {
  return (
    <div className="m-4 flex justify-evenly flex-wrap gap-8 w-full whitespace-nowrap">
      <Link href={`/${lang}/${ESegments.MATH}/${ESegments.MATH_LEVEL}`}>
        <TextButton isLink>{getTitleFromMap(EMessageNames.BTN_LEVELS, lang)}</TextButton>
      </Link>
      <Link href={`/${lang}/${ESegments.MATH}/${ESegments.MATH_CATEGORY}`}>
        <TextButton isLink>{getTitleFromMap(EMessageNames.BTN_CAT, lang)}</TextButton>
      </Link>
    </div>
  );
};

export default Mission;
