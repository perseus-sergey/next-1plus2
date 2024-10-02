import { ITranslation } from '@/app/[lang]/repeater/page';
import { BaseButton } from '../TextButton/BaseButton';
import { SeoSVG } from '../Svg/SeoSVG';
import { Title } from '../Title/Title';
import { Dispatch, SetStateAction, useState } from 'react';
import { ModalAddRepeaterTask, ModalDeleteTask } from './ModalAddRepeaterTask';

interface IProps {
  translations: ITranslation[];
  setTranslations: Dispatch<SetStateAction<ITranslation[]>>;
  openModal: (translation: ITranslation) => void;
  openDeleteModal: (id: number) => void;
  startTest: () => void;
}

export const TableTranslations = ({ translations, setTranslations, startTest }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTranslation, setCurrentTranslation] = useState<ITranslation | null>(null);

  const [newEnglish, setNewEnglish] = useState('');
  const [newUkrainian, setNewUkrainian] = useState('');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Модальне вікно для підтвердження видалення
  const [deleteId, setDeleteId] = useState<number | null>(null); // ID рядка, який будемо видаляти

  const openModal = (translation?: ITranslation) => {
    if (translation) {
      setIsEditMode(true);
      setCurrentTranslation(translation);
      setNewEnglish(translation.english);
      setNewUkrainian(translation.ukrainian);
    } else {
      setIsEditMode(false);
      setNewEnglish('');
      setNewUkrainian('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTranslation(null);
  };

  const saveTranslation = () => {
    if (isEditMode && currentTranslation) {
      setTranslations((prev) =>
        prev.map((item) =>
          item.id === currentTranslation.id
            ? { ...item, english: newEnglish, ukrainian: newUkrainian }
            : item
        )
      );
    } else {
      const newId = translations.length ? translations[translations.length - 1].id + 1 : 1;
      setTranslations([
        ...translations,
        { id: newId, english: newEnglish, ukrainian: newUkrainian },
      ]);
    }
    closeModal();
  };

  const openDeleteModal = (id: number) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setTranslations((prev) => prev.filter((item) => item.id !== deleteId));
      closeDeleteModal();
    }
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Title name="Dictionary" className="text-2xl font-bold mb-4" />

      <article className="container min-h-[75vh] mx-auto p-4 text-white flex flex-col items-center">
        <p className="p-4">
          TOTAL: <span className="text-teal-300 text-xl">{translations.length}</span> phrases
        </p>

        {translations.length > 0 && (
          <table className="table-auto w-full text-slate-50">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-stone-400">English</th>
                <th className="px-4 py-2 border border-stone-400">Ukrainian</th>
                <th className="px-4 py-2 border border-stone-400">Delete</th>
              </tr>
            </thead>
            <tbody>
              {translations.map((translation) => (
                <tr key={translation.id}>
                  <td
                    className="px-4 py-2 border border-stone-400 cursor-pointer"
                    onClick={() => openModal(translation)}
                  >
                    {translation.english}
                  </td>
                  <td
                    className="px-4 py-2 border border-stone-400 cursor-pointer"
                    onClick={() => openModal(translation)}
                  >
                    {translation.ukrainian}
                  </td>
                  <td className="px-4 py-2 border border-stone-400 text-center">
                    <BaseButton
                      ariaLabel="Delete item from translation table"
                      className="text-red-500 hover:text-red-400 font-bold text-center p-1 rounded-full bg-yellow-50/70 hover:bg-yellow-50/30"
                      onClick={() => openDeleteModal(translation.id)}
                    >
                      <SeoSVG strokeWidth={0.1}>
                        <path
                          fill="currentColor"
                          d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                        />
                      </SeoSVG>
                    </BaseButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <BaseButton
          ariaLabel="Add item to translation table"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => openModal()}
        >
          + Add Item
        </BaseButton>

        {translations.length > 0 && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={() => startTest()}
          >
            Start Test
          </button>
        )}

        {isModalOpen && (
          <ModalAddRepeaterTask
            isEditMode={isEditMode}
            closeModal={closeModal}
            saveTranslation={saveTranslation}
            newEnglish={newEnglish}
            newUkrainian={newUkrainian}
            setNewEnglish={setNewEnglish}
            setNewUkrainian={setNewUkrainian}
          />
        )}

        {isDeleteModalOpen && (
          <ModalDeleteTask closeDeleteModal={closeDeleteModal} confirmDelete={confirmDelete} />
        )}
      </article>
    </>
  );
};
