import HangmanPage from '@/components/HangmanPage/HangmanPage';
import { Title } from '@/components/Title/Title';
import { ELang } from '@/libs/langMessages';

export interface IMathPageProps {
  params: { lang: ELang };
}

export default () => (
  <>
    <Title name="Hangman" />
    <HangmanPage />
  </>
);
