import { Title } from '@/components/Title/Title';
import Mission from '@/components/Mission/Mission';
import { ELang, EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import { IMathPageProps } from '../page';

export default function MathPage(props: IMathPageProps) {
  const { lang = ELang.en } = props.params;

  return (
    <>
      <Title name={getTitleFromMap(EMessageNames.MISSION_CHOICE, lang)} />
      <Mission lang={lang} />
    </>
  );
}
