import { ELang } from '@/models/types';
import { ReactNode } from 'react';
import CloseModalBtn from '../TextButton/CloseModalBtn';

export const ModalWrapper = ({
  title,
  children,
  closeFn,
  lang,
}: {
  title: string;
  children: ReactNode;
  closeFn: () => void;
  lang: ELang;
}) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
    <div className="relative max-h-screen max-w-lg overflow-y-auto w-full flex flex-wrap gap-4 bg-white p-6 rounded text-xl text-slate-600">
      <h2 className="w-full text-center text-3xl font-bold mb-4">{title}</h2>
      {children}
      <CloseModalBtn closeFn={closeFn} lang={lang} />
    </div>
  </div>
);
