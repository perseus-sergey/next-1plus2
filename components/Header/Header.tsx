import BreadCrumb from '../BreadCrumb/BreadCrumb';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

export const Header = () => (
  <header className="flex justify-between w-full p-1 sm:p-4">
    <BreadCrumb homeElement={'Home'} isCapitalizeLinks />
    <LanguageSwitcher />
  </header>
);
