import HomeLinks from '@/components/HomeLinks/HomeLinks';
import { Title } from '@/components/Title/Title';
import { ELang } from '@/libs/langMessages';

export interface IMathPageProps {
  params: { lang: ELang };
}

export default () => (
  <>
    <Title name="Choose The Language" />
    <HomeLinks />
  </>
);
