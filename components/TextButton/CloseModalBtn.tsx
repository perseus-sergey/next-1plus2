import { ELang } from '@/models/types';
import { BaseButton } from './BaseButton';

export default ({ closeFn, lang }: { closeFn: () => void; lang: ELang }) => (
  <BaseButton
    ariaLabel={lang === ELang.ua ? 'Закрити модальне вікно' : 'Close the modal window'}
    className="absolute top-2 right-2 text-5xl font-extralight text-slate-400 rotate-45"
    onClick={() => closeFn()}
  >
    +
  </BaseButton>
);
