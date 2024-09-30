import HangmanPage from '@/components/HangmanPage/HangmanPage';
import { ELang } from '@/libs/langMessages';

export interface IMathPageProps {
  params: { lang: ELang };
}

export default ({ params }: IMathPageProps) => {
  const { lang } = params;

  return (
    <>
      <HangmanPage lang={lang} />
    </>
  );
};
