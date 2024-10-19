import { ELang } from '@/models/types';
import { ModalWrapper } from './ModalWrapper';

export default ({
  closeModal,
  confirmExit,
  lang,
  confirmBtnTitle,
  modalText,
}: {
  closeModal: () => void;
  confirmExit: () => void;
  lang: ELang;
  confirmBtnTitle: string;
  modalText: string;
}) => (
  <ModalWrapper
    title={lang === 'ua' ? 'Підтвердження дії' : 'Confirmation'}
    closeFn={closeModal}
    lang={lang}
  >
    <p>{modalText}</p>
    <div className="flex justify-end mt-4">
      <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={closeModal}>
        {lang === 'ua' ? 'Відмінити' : 'Cancel'}
      </button>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={confirmExit}>
        {confirmBtnTitle}
      </button>
    </div>
  </ModalWrapper>
);
